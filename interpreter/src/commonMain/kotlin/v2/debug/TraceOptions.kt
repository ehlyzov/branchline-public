package v2.debug

import kotlin.concurrent.Volatile
import v2.runtime.bignum.toPlainString
import v2.Expr
import v2.Token
import v2.ir.IRAppendTo
import v2.ir.IRLet
import v2.ir.IRModify
import v2.ir.IRNode
import v2.ir.IRSet
import kotlin.time.Duration
import kotlin.time.TimeSource

data class TraceOptions(
    val step: Boolean = false, // per-node events
    val watch: Set<String> = emptySet(), // names to watch (env keys)
    val captureValues: Boolean = true,
    val maxEvents: Int = 100_000,
    val includeEval: Boolean = true,
    val includeCalls: Boolean = true,
)

data class CalcStep(
    val kind: String, // "HOST"
    val name: String?, // имя хост-функции
    val args: List<Any?>, // фактические аргументы
    val value: Any? // возвращённое значение
)

sealed interface TraceEvent {
    data class Enter(val node: IRNode) : TraceEvent
    data class Exit(val node: IRNode) : TraceEvent
    data class Let(
        val name: String,
        val old: Any?,
        val new: Any?,
    ) : TraceEvent

    data class PathWrite(
        val op: String, // "SET" | "APPEND" | "MODIFY"
        val root: String, // env root name
        val path: List<Any>, // normalized path segments
        val old: Any?,
        val new: Any?,
    ) : TraceEvent

    data class Output(val obj: Map<Any, Any?>) : TraceEvent

    // Calls (Eval + Exec)
    data class Call(
        val kind: String, // "FUNC" | "LAMBDA" | "HOST" | "FNVAR" | "CALL" | "LOG"
        val name: String?, // null for anonymous/lambda
        val args: List<Any?>,
        val site: Token? = null, // optional source site for correlation
    ) : TraceEvent

    data class Return(
        val kind: String,
        val name: String?,
        val value: Any?,
        val site: Token? = null,
    ) : TraceEvent

    data class Read(
        val name: String,
        val value: Any?,
    ) : TraceEvent

    data class EvalEnter(
        val expr: Expr,
        val site: Token? = null,
    ) : TraceEvent

    data class EvalExit(
        val expr: Expr,
        val value: Any?,
        val site: Token? = null,
    ) : TraceEvent

    data class Error(
        val message: String,
        val throwable: Throwable,
    ) : TraceEvent
}

interface Tracer {
    val opts: TraceOptions
    fun on(event: TraceEvent)
    fun shouldBreak(): Boolean = false // for stepping/breakpoints
}

class CollectingTracer(override val opts: TraceOptions = TraceOptions()) : Tracer {
    data class Timed(val at: Duration, val event: TraceEvent)

    val instructionCounts: MutableMap<String, Long> = mutableMapOf()

    private data class CaptureFrame(
        val kind: String, // "SET" | "APPEND" | "MODIFY"
        val reads: MutableList<TraceEvent.Read> = mutableListOf(),
        val callStack: ArrayDeque<TraceEvent.Call> = ArrayDeque(), // стек для match Call/Return
        val calc: MutableList<CalcStep> = mutableListOf() // завершённые HOST-вызовы
    )

    private val capStack = ArrayDeque<CaptureFrame>()

    // Track LET evaluation dependencies and calc
    private val letCapStack = ArrayDeque<CaptureFrame>()
    private val depsByVar = mutableMapOf<String, List<Pair<String, Any?>>>()
    private val depsCalcByVar = mutableMapOf<String, List<CalcStep>>()

    data class ProvStep(
        val op: String,
        val path: List<Any>,
        val inputs: List<Pair<String, Any?>>,
        val delta: Any?,
        val old: Any?,
        val new: Any?,
        val calc: List<CalcStep> = emptyList()
    )

    // varName -> список шагов происхождения (в порядке появления)
    private val provByRoot = LinkedHashMap<String, MutableList<ProvStep>>()

    private fun pushCaptureFor(node: IRNode) {
        val kind = when (node) {
            is IRSet -> "SET"
            is IRAppendTo -> "APPEND"
            is IRModify -> "MODIFY"
            else -> return
        }
        capStack.addLast(CaptureFrame(kind))
    }

    private fun popCaptureFor(node: IRNode) {
        when (node) {
            is IRSet, is IRAppendTo, is IRModify -> if (capStack.isNotEmpty()) capStack.removeLast()
            else -> Unit
        }
    }

    private fun currentCaptureOrNull(): CaptureFrame? = capStack.lastOrNull()

    private fun computeDelta(op: String, old: Any?, new: Any?): Any? {
        return when (op) {
            "APPEND" -> when {
                new is List<*> && old is List<*> &&
                        new.size == old.size + 1 && new.take(old.size) == old -> new.lastOrNull()

                new is List<*> && old == null -> new.lastOrNull()
                else -> null
            }

            "SET" -> new
            "MODIFY" -> null // множественные поля; можно вернуть new, но «дельта» неочевидна
            else -> null
        }
    }

    private fun canonicalizeInputPairs(inputs: List<Map<String, Any?>>): List<Pair<String, Any?>> {
        val pairs = inputs.mapNotNull { m ->
            val n = m["name"] as? String ?: return@mapNotNull null
            val v = m["value"]
            n to v
        }

        // 1) дедуп по имени (берём последнее вхождение)
        val lastByName = LinkedHashMap<String, Any?>()
        for ((n, v) in pairs) lastByName[n] = v

        // 2) разделяем на dotted и базовые
        val dotted = lastByName.keys.filter { it.contains('.') || it.contains('[') }.toSet()
        val result = ArrayList<Pair<String, Any?>>()

        // dotted — всегда оставляем
        for (n in dotted.sorted()) result += n to lastByName[n]

        // базу — только если нет dotted с этим префиксом
        for ((n, v) in lastByName) {
            if ('.' !in n && '[' !in n) {
                val hasDotted = dotted.any { it.startsWith("$n.") || it.startsWith("$n[") }
                if (!hasDotted) result += n to v
            }
        }

        // финальная сортировка по имени для стабильности
        return result.sortedBy { it.first }
    }

    // ---------- прежнее содержимое ----------
    private var compiledWatchExprs: Map<String, Expr> = emptyMap()
    private var compiledBreaks: Map<String, Expr> = emptyMap()

    @Volatile
    private var plan: TracePlan? = null

    fun attach(plan: TracePlan, compile: (String) -> Expr) {
        this.plan = plan
        compiledWatchExprs = plan.watchExprs.associate { it.name to compile(it.exprDsl) }
        compiledBreaks = plan.breakWhen.associate { it.name to compile(it.exprDsl) }
    }

    // Called by Eval at safe checkpoints:
    fun onCheckpoint(eval: (Expr, MutableMap<String, Any?>) -> Any?, env: MutableMap<String, Any?>) {
        val p = plan ?: return
        for (v in p.watchVars) on(TraceEvent.Read(v, env[v]))
        for ((name, ex) in compiledWatchExprs) {
            val v = eval(ex, env)
            on(TraceEvent.Read(name, v))
        }
        for ((name, ex) in compiledBreaks) {
            val v = eval(ex, env)
            if ((v as? Boolean) == true) on(TraceEvent.Call("CHECKPOINT", name, emptyList()))
        }
    }

    private val start = TimeSource.Monotonic.markNow()
    val events = mutableListOf<Timed>()

    private val lastByVar = mutableMapOf<String, TraceEvent>() // LET or Return or PathWrite for that name

    override fun on(event: TraceEvent) {
        val at = start.elapsedNow()
        if (events.size < opts.maxEvents) events += Timed(at, event)

        when (event) {
            is TraceEvent.Enter -> {
                // открыть кадр захвата для write-узла
                pushCaptureFor(event.node)
                // начать сбор зависимостей для LET
                if (event.node is IRLet) {
                    letCapStack.addLast(CaptureFrame("LET"))
                }
            }

            is TraceEvent.Exit -> {
                // закрыть кадр захвата для write-узла
                popCaptureFor(event.node)
                // завершить сбор зависимостей для LET
                if (event.node is IRLet && letCapStack.isNotEmpty()) {
                    letCapStack.removeLast()
                }
            }

            is TraceEvent.Read -> {
                // если мы сейчас внутри write-узла — записываем входы
                currentCaptureOrNull()?.reads?.add(event)
                // если мы в контексте вычисления LET — записать зависимости
                letCapStack.lastOrNull()?.reads?.add(event)
            }

            is TraceEvent.PathWrite -> {
                lastByVar[event.root] = event
                // собрать шаг provenance, если есть активный кадр
                val cap = currentCaptureOrNull()
                val baseInputs = cap?.reads?.map { it.name to it.value } ?: emptyList()
                val inputs = mutableListOf<Pair<String, Any?>>()
                val calcForStep = mutableListOf<CalcStep>()
                if (cap != null) calcForStep.addAll(cap.calc)
                for ((n, v) in baseInputs) {
                    val deps = depsByVar[n]
                    val calc = depsCalcByVar[n]
                    if (deps != null && deps.isNotEmpty()) {
                        inputs.addAll(deps)
                        if (calc != null && calc.isNotEmpty()) calcForStep.addAll(calc)
                    } else {
                        inputs.add(n to v)
                    }
                }
                val step = ProvStep(
                    op = event.op,
                    path = event.path,
                    inputs = inputs,
                    delta = computeDelta(event.op, event.old, event.new),
                    old = event.old,
                    new = event.new,
                    calc = calcForStep
                )
                provByRoot.getOrPut(event.root) { mutableListOf() }.add(step)
            }

            is TraceEvent.Let -> {
                lastByVar[event.name] = event
                // зафиксировать зависимости и calc для переменной
                val cap = letCapStack.lastOrNull()
                val reads = cap?.reads ?: emptyList()
                depsByVar[event.name] = reads.map { it.name to it.value }
                depsCalcByVar[event.name] = cap?.calc?.toList() ?: emptyList()
            }

            is TraceEvent.Return -> {
                if (event.kind == "HOST") {
                    val cap = currentCaptureOrNull()
                    if (cap != null) {
                        val idx = cap.callStack.indexOfFirst { it.kind == event.kind && it.name == event.name }
                        val call = if (idx >= 0) cap.callStack.removeAt(idx) else null
                        if (call != null) {
                            cap.calc += CalcStep(event.kind, event.name, call.args, event.value)
                        }
                    }
                    // also capture HOST calc inside LET evaluation
                    val lcap = letCapStack.lastOrNull()
                    if (lcap != null) {
                        val idx = lcap.callStack.indexOfFirst { it.kind == event.kind && it.name == event.name }
                        val call = if (idx >= 0) lcap.callStack.removeAt(idx) else null
                        if (call != null) {
                            lcap.calc += CalcStep(event.kind, event.name, call.args, event.value)
                        }
                    }
                }
                if (event.name != null) lastByVar[event.name!!] = event
            }

            is TraceEvent.Call -> {
                // фиксируем только HOST-вызовы и только внутри write-кадра
                if (event.kind == "HOST") {
                    currentCaptureOrNull()?.callStack?.addLast(event)
                    letCapStack.lastOrNull()?.callStack?.addLast(event)
                }
            }

            else -> Unit
        }
    }

    /**
     * Подробное объяснение происхождения переменной. Возвращает карту
     * вида: { "var": "acc", "final": <последнее значение/срез>,
     * "steps": [ { op, path, inputs, delta, old, new }, ... ] }
     */
    fun explainProvenance(name: String): Map<String, Any?>? {
        val steps = provByRoot[name] ?: emptyList()
        if (steps.isEmpty() && name !in lastByVar) return null
        val finalValue = when (val ev = lastByVar[name]) {
            is TraceEvent.Let -> ev.new
            is TraceEvent.Return -> ev.value
            is TraceEvent.PathWrite -> ev.new
            else -> null
        }
        val stepsOut = steps.map { s ->
            mapOf(
                "op" to s.op,
                "path" to s.path,
                "inputs" to s.inputs.map { (n, v) -> mapOf("name" to n, "value" to v) },
                "delta" to s.delta,
                "old" to s.old,
                "new" to s.new,
                "calc" to s.calc.map { c ->
                    mapOf("kind" to c.kind, "name" to c.name, "args" to c.args, "value" to c.value)
                },
            )
        }
        return mapOf("var" to name, "final" to finalValue, "steps" to stepsOut)
    }

    /** Ключи, по которым есть шаги provenance. */
    fun provenanceKeys(): Set<String> = provByRoot.keys

    /** Короткая «человеческая» версия. */
    fun humanize(name: String): String {
        val prov = explainProvenance(name) ?: return "EXPLAIN($name): происхождение не найдено."

        @Suppress("UNCHECKED_CAST")
        val steps = prov["steps"] as List<Map<String, Any?>>
        if (steps.isEmpty()) return "EXPLAIN($name): нет событий записи."

        // сгруппировать по верхнему сегменту пути
        val byTop = LinkedHashMap<Any, MutableList<Map<String, Any?>>>(8)
        for (st in steps) {
            val path = st["path"] as List<*>
            val top = path.firstOrNull() ?: "<root>"
            byTop.getOrPut(top) { mutableListOf() }.add(st)
        }

        val sb = StringBuilder()
        for ((top, lst) in byTop) {
            if (sb.isNotEmpty()) sb.append('\n')
            sb.append("• ").append(name).append('.').append(top.toString()).append('\n')
            for (s in lst) {
                val op = s["op"] as String
                sb.append("  → ").append(op)
                when (op) {
                    "APPEND" -> {
                        val d = s["delta"]
                        sb.append("(delta=").append(short(d)).append(')').append('\n')
                    }
                    "SET" -> {
                        val v = s["new"]
                        sb.append("(value=").append(short(v)).append(')').append('\n')
                    }
                    "MODIFY" -> sb.append('\n')
                    else -> sb.append('\n')
                }
                val inputPairs = canonicalizeInputPairs(s["inputs"] as List<Map<String, Any?>>)
                if (inputPairs.isNotEmpty()) {
                    sb.append("    inputs: ")
                        .append(inputPairs.joinToString(", ") { (n, v) -> "$n=${short(v)}" })
                        .append('\n')
                }

                @Suppress("UNCHECKED_CAST")
                val calc = s["calc"] as? List<Map<String, Any?>> ?: emptyList()
                if (calc.isNotEmpty()) {
                    sb.append("    calc:\n")
                    for (c in calc) {
                        val name = c["name"] as String?

                        @Suppress("UNCHECKED_CAST")
                        val args = (c["args"] as List<Any?>).joinToString(", ") { short(it) }
                        val value = short(c["value"])
                        sb.append(
                            "      "
                        ).append(name ?: "<host>").append('(').append(args).append(") = ").append(value).append('\n')
                    }
                }
            }
        }
        return sb.toString().trimEnd()
    }

    private fun short(v: Any?): String = when (v) {
        null -> "null"
        is v2.runtime.bignum.BLBigDec -> v.toPlainString()
        is Number -> v.toString()
        is Map<*, *> -> (v["id"] ?: v["name"] ?: "object").toString()
        is List<*> -> "list(${v.size})"
        else -> v.toString()
    }
}

object Debug {
    @Volatile
    var tracer: Tracer? = null

    fun explain(name: String): Any? {
        val c = tracer as? CollectingTracer ?: return null
        return c.explainProvenance(name)
    }
}

data class WatchExpr(val name: String, val exprDsl: String)
data class TracePlan(
    val watchVars: Set<String> = emptySet(),
    val watchPaths: Set<String> = emptySet(), // e.g. "orders[*].amount"
    val watchExprs: List<WatchExpr> = emptyList(),
    val breakWhen: List<WatchExpr> = emptyList(),
    val includeCalls: Boolean = true,
    val includeEval: Boolean = false, // off by default to reduce noise
    val clipDepth: Int = 2,
    val clipLen: Int = 200,
    val sampleEvery: Int = 1,
    val maxEvents: Int = 100_000,
)
