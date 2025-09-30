package v2.debug

import kotlin.concurrent.Volatile
import kotlin.collections.LinkedHashSet
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
        val kind: String, // "SET" | "APPEND" | "MODIFY" | "LET"
        val reads: MutableList<TraceEvent.Read> = mutableListOf(),
        val callStack: ArrayDeque<TraceEvent.Call> = ArrayDeque(), // стек для match Call/Return
        val calc: MutableList<CalcStep> = mutableListOf(), // завершённые HOST-вызовы
        val letName: String? = null,
        val expr: Expr? = null,
    )

    private val capStack = ArrayDeque<CaptureFrame>()

    // Track LET evaluation dependencies and calc
    private val letCapStack = ArrayDeque<CaptureFrame>()
    private val depsByVar = mutableMapOf<String, List<Pair<String, Any?>>>()
    private val depsCalcByVar = mutableMapOf<String, List<CalcStep>>()
    private val exprByVar = mutableMapOf<String, Expr>()
    private val requestedExplains = LinkedHashSet<String>()

    data class ProvStep(
        val op: String,
        val path: List<Any>,
        val inputs: List<Pair<String, Any?>>,
        val delta: Any?,
        val old: Any?,
        val new: Any?,
        val calc: List<CalcStep> = emptyList(),
        val debug: List<String> = emptyList(),
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

    private fun renderLetDebug(
        expr: Expr?,
        inputs: List<Pair<String, Any?>>,
        result: Any?
    ): List<String> {
        if (expr == null) return emptyList()
        val valueLookup = LinkedHashMap<String, Any?>()
        for ((k, v) in inputs) valueLookup[k] = v
        val rendered = renderExprForDebug(expr, valueLookup)
        if (rendered.isBlank()) return emptyList()
        val rhs = formatDebugValue(result)
        return listOf("$rendered -> $rhs")
    }

    private fun renderExprForDebug(expr: Expr, values: Map<String, Any?>): String = when (expr) {
        is v2.NumberLiteral -> expr.token.lexeme
        is v2.StringExpr -> formatDebugValue(expr.value)
        is v2.BoolExpr -> expr.value.toString()
        is v2.NullLiteral -> "null"
        is v2.IdentifierExpr -> {
            val value = lookupValueForDebug(expr.name, values)
            value?.let { formatDebugValue(it) } ?: expr.name
        }
        is v2.AccessExpr -> {
            val path = renderAccessPath(expr)
            val value = path?.let { lookupValueForDebug(it, values) }
            value?.let { formatDebugValue(it) } ?: path ?: "<access>"
        }
        is v2.BinaryExpr -> {
            val op = expr.token.lexeme
            val left = renderExprForDebug(expr.left, values)
            val right = renderExprForDebug(expr.right, values)
            "($left $op $right)"
        }
        is v2.UnaryExpr -> {
            val op = expr.token.lexeme
            val inner = renderExprForDebug(expr.expr, values)
            "($op $inner)"
        }
        is v2.CallExpr -> {
            val args = expr.args.joinToString(" ") { renderExprForDebug(it, values) }
            "(${expr.callee.name}${if (args.isNotEmpty()) " $args" else ""})"
        }
        is v2.InvokeExpr -> {
            val target = renderExprForDebug(expr.target, values)
            val args = expr.args.joinToString(" ") { renderExprForDebug(it, values) }
            "(invoke $target${if (args.isNotEmpty()) " $args" else ""})"
        }
        is v2.ArrayExpr -> expr.elements.joinToString(prefix = "[", postfix = "]") { renderExprForDebug(it, values) }
        is v2.ObjectExpr -> "{…}"
        is v2.ArrayCompExpr -> "[for ${expr.varName} in ${renderExprForDebug(expr.iterable, values)} …]"
        is v2.IfElseExpr -> {
            val cond = renderExprForDebug(expr.condition, values)
            val thenBranch = renderExprForDebug(expr.thenBranch, values)
            val elseBranch = renderExprForDebug(expr.elseBranch, values)
            "(if $cond $thenBranch $elseBranch)"
        }
        is v2.LambdaExpr -> "<lambda>"
        else -> expr::class.simpleName ?: "<expr>"
    }

    private fun renderAccessPath(expr: v2.AccessExpr): String? {
        val base = when (val b = expr.base) {
            is v2.IdentifierExpr -> b.name
            is v2.AccessExpr -> renderAccessPath(b)
            else -> renderExprForDebug(b, emptyMap())
        } ?: return null
        val sb = StringBuilder(base)
        for (seg in expr.segs) {
            when (seg) {
                is v2.AccessSeg.Static -> when (val key = seg.key) {
                    is v2.ObjKey.Name -> sb.append('.').append(key.v)
                    is v2.I32 -> sb.append('[').append(key.v).append(']')
                    is v2.I64 -> sb.append('[').append(key.v).append(']')
                    is v2.IBig -> sb.append('[').append(key.v).append(']')
                }
                is v2.AccessSeg.Dynamic -> {
                    val keyStr = renderExprForDebug(seg.keyExpr, emptyMap())
                    val simple = keyStr.all { it.isLetterOrDigit() || it == '_' }
                    if (simple) sb.append('.').append(keyStr) else sb.append('[').append(keyStr).append(']')
                }
            }
        }
        return sb.toString()
    }

    private fun lookupValueForDebug(name: String, values: Map<String, Any?>): Any? {
        values[name]?.let { return it }
        val event = lastByVar[name]
        return when (event) {
            is TraceEvent.Let -> event.new
            is TraceEvent.PathWrite -> event.new
            else -> null
        }
    }

    private fun formatDebugValue(value: Any?): String = when (value) {
        is String -> "\"$value\""
        else -> short(value)
    }

    private fun popCaptureFor(node: IRNode) {
        when (node) {
            is IRSet, is IRAppendTo, is IRModify -> if (capStack.isNotEmpty()) capStack.removeLast()
            else -> Unit
        }
    }

    private fun currentCaptureOrNull(): CaptureFrame? = capStack.lastOrNull()

    private fun flattenInputs(baseInputs: List<Pair<String, Any?>>): Pair<List<Pair<String, Any?>>, List<CalcStep>> {
        if (baseInputs.isEmpty()) return emptyList<Pair<String, Any?>>() to emptyList()
        val flattened = ArrayList<Pair<String, Any?>>()
        val calc = ArrayList<CalcStep>()
        val seen = LinkedHashSet<String>()
        val queue = ArrayDeque<Pair<String, Any?>>()
        baseInputs.forEach { queue.addLast(it) }
        while (queue.isNotEmpty()) {
            val (name, value) = queue.removeFirst()
            if (!seen.add(name)) continue
            val deps = depsByVar[name]
            if (deps != null && deps.isNotEmpty()) {
                queue.addAll(deps)
                depsCalcByVar[name]?.let { calc.addAll(it) }
            } else {
                flattened += name to value
            }
        }
        return flattened to calc
    }

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
                    letCapStack.addLast(
                        CaptureFrame(
                            kind = "LET",
                            letName = event.node.name,
                            expr = event.node.expr
                        )
                    )
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
                val (flattenedInputs, flattenedCalc) = flattenInputs(baseInputs)
                val calcForStep = mutableListOf<CalcStep>().apply {
                    if (cap != null) addAll(cap.calc)
                    addAll(flattenedCalc)
                }
                val step = ProvStep(
                    op = event.op,
                    path = event.path,
                    inputs = flattenedInputs,
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
                val frame = letCapStack.toList().asReversed().firstOrNull { it.letName == event.name }
                    ?: letCapStack.lastOrNull()
                val reads = frame?.reads ?: emptyList()
                depsByVar[event.name] = reads.map { it.name to it.value }
                depsCalcByVar[event.name] = frame?.calc?.toList() ?: emptyList()
                frame?.expr?.let { exprByVar[event.name] = it }
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
        val rawSteps = provByRoot[name] ?: emptyList()
        val steps = if (rawSteps.isNotEmpty()) rawSteps else buildLetProvenance(name)
        if (steps.isEmpty() && name !in lastByVar) return null
        val finalValue = when (val ev = lastByVar[name]) {
            is TraceEvent.Let -> ev.new
            is TraceEvent.Return -> ev.value
            is TraceEvent.PathWrite -> ev.new
            else -> null
        }
        val stepsOut = steps.map { it.toMap() }
        return mapOf("var" to name, "final" to finalValue, "steps" to stepsOut)
    }

    /** Ключи, по которым есть шаги provenance. */
    fun provenanceKeys(): Set<String> {
        val keys = LinkedHashSet<String>()
        keys.addAll(provByRoot.keys)
        for ((name, event) in lastByVar) {
            when (event) {
                is TraceEvent.Let,
                is TraceEvent.PathWrite -> keys.add(name)
                else -> Unit
            }
        }
        return keys
    }

    fun requestedProvenanceKeys(): Set<String> = requestedExplains

    fun noteExplainRequest(name: String) {
        requestedExplains.add(name)
    }

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
            val topLabel = top.toString()
            val header = if (topLabel == name) name else "$name.$topLabel"
            sb.append("• ").append(header).append('\n')
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
                val debugLines = (s["debug"] as? List<*>)?.filterIsInstance<String>() ?: emptyList()
                val inputPairs = canonicalizeInputPairs(s["inputs"] as List<Map<String, Any?>>)
                if (inputPairs.isNotEmpty() && debugLines.isEmpty()) {
                    sb.append("    inputs: ")
                        .append(inputPairs.joinToString(", ") { (n, v) -> "$n=${short(v)}" })
                        .append('\n')
                }

                @Suppress("UNCHECKED_CAST")
                val calc = s["calc"] as? List<Map<String, Any?>> ?: emptyList()
                if (debugLines.isNotEmpty() || calc.isNotEmpty()) {
                    sb.append("    calc:\n")
                    for (line in debugLines) {
                        sb.append("      ").append(line).append('\n')
                    }
                    for (c in calc) {
                        val kind = c["kind"] as? String
                        val name = c["name"] as String?

                        @Suppress("UNCHECKED_CAST")
                        val args = (c["args"] as List<Any?>).joinToString(", ") { short(it) }
                        val value = short(c["value"])
                        sb.append("      ")
                            .append(name ?: kind ?: "<calc>")
                            .append('(')
                            .append(args)
                            .append(") = ")
                            .append(value)
                            .append('\n')
                    }
                }
            }
        }
        return sb.toString().trimEnd()
    }

    private fun buildLetProvenance(name: String): List<ProvStep> {
        val letEvent = lastByVar[name] as? TraceEvent.Let ?: return emptyList()
        val baseInputs = depsByVar[name] ?: emptyList()
        val (flattenedInputs, flattenedCalc) = flattenInputs(baseInputs)
        val calc = mutableListOf<CalcStep>().apply {
            addAll(flattenedCalc)
            depsCalcByVar[name]?.let { addAll(it) }
        }
        val debugInputs = if (flattenedInputs.isNotEmpty()) flattenedInputs else baseInputs
        val debugLines = renderLetDebug(exprByVar[name], debugInputs, letEvent.new)
        return listOf(
            ProvStep(
                op = "LET",
                path = listOf(name),
                inputs = flattenedInputs,
                delta = letEvent.new,
                old = letEvent.old,
                new = letEvent.new,
                calc = calc,
                debug = debugLines,
            )
        )
    }

    private fun ProvStep.toMap(): Map<String, Any?> = mapOf(
        "op" to op,
        "path" to path,
        "inputs" to inputs.map { (n, v) -> mapOf("name" to n, "value" to v) },
        "delta" to delta,
        "old" to old,
        "new" to new,
        "calc" to calc.map { c ->
            mapOf("kind" to c.kind, "name" to c.name, "args" to c.args, "value" to c.value)
        },
        "debug" to debug,
    )

    private fun short(v: Any?): String = when (v) {
        null -> "null"
        is v2.runtime.bignum.BLBigDec -> v.toPlainString()
        is Number -> v.toString()
        is Pair<*, *> -> {
            val second = short(v.second)
            "${v.first}=$second"
        }
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
        c.noteExplainRequest(name)
        return c.explainProvenance(name)
    }

    fun explainOutput(output: Any?): Map<String, Any?>? {
        val c = tracer as? CollectingTracer ?: return null
        val keys = when (output) {
            is Map<*, *> -> output.keys.mapNotNull { it?.toString() }
            is List<*> -> output.indices.map { it.toString() }
            else -> c.provenanceKeys().toList()
        }
        val results = LinkedHashMap<String, Any?>()
        for (key in keys) {
            c.noteExplainRequest(key)
            val explanation = c.explainProvenance(key)
            if (explanation != null) {
                results[key] = explanation
            }
        }
        return if (results.isEmpty()) null else results
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
