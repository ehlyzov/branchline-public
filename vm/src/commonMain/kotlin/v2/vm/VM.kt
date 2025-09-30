package v2.vm

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*
import v2.*
import v2.ir.*
import v2.debug.CollectingTracer
import v2.debug.Debug
import v2.debug.TraceEvent
import v2.debug.Tracer
import v2.runtime.bignum.BLBigDec
import v2.runtime.bignum.BLBigInt
import v2.runtime.bignum.blBigDecOfDouble
import v2.runtime.bignum.blBigDecOfLong
import v2.runtime.bignum.blBigIntOfLong
import v2.runtime.bignum.signum
import v2.runtime.bignum.toBLBigDec
import v2.runtime.bignum.toBLBigInt
import v2.runtime.bignum.toPlainString
import v2.runtime.bignum.plus
import v2.runtime.bignum.minus
import v2.runtime.bignum.times
import v2.runtime.bignum.div
import v2.runtime.bignum.rem
import v2.runtime.bignum.unaryMinus
import v2.runtime.bignum.compareTo
import v2.runtime.bignum.toInt
import v2.runtime.isBigDec
import v2.runtime.isBigInt

/**
 * Stack-based Virtual Machine for Branchline DSL
 *
 * This VM executes bytecode generated from Branchline IR nodes, providing
 * efficient stack-based execution with support for:
 * - Arithmetic and logical operations
 * - Object/array manipulation
 * - Control flow (jumps, conditionals, loops)
 * - Function calls and returns
 * - Exception handling
 * - Debug tracing
 */
class VM(
    private val hostFns: Map<String, (List<Any?>) -> Any?> = emptyMap(),
    private val funcs: Map<String, FuncDecl> = emptyMap(),
    private val tracer: Tracer? = null,
) {
    // Constants defined in companion below

    // Execution state
    private val stack = ArrayDeque<Any?>(256)
    private val callStack = ArrayDeque<CallFrame>(64)
    private var pc = 0 // Program counter
    private lateinit var bytecode: Bytecode
    private var environment = mutableMapOf<String, Any?>()
    private var locals: Array<Any?> = arrayOf()
    private val funcBytecode = HashMap<String, Bytecode>()
    private var lastSuspension: Any? = null
    private val hostByIndex = ArrayList<((List<Any?>) -> Any?)?>()
    // Track which bytecode the host index table was prepared for
    private var hostIndexPreparedFor: Bytecode? = null
    private val outputs = ArrayList<Map<Any, Any?>>()
    private var enterEvents: Map<Int, List<IRNode>> = emptyMap()
    private var exitEvents: Map<Int, List<IRNode>> = emptyMap()
    private var pathWrites: Map<Int, PathWriteMeta> = emptyMap()
    private var activePc: Int = -1
    private val pathScratch = ArrayList<Any>(8)

    // Exception handling
    private val tryStack = ArrayDeque<TryFrame>()
    private var lastException: Throwable? = null

    // Loop handling
    private val loopStack = ArrayDeque<LoopState>()

    // Debugging
    private inline fun currentTracer(): Tracer? = tracer ?: Debug.tracer

    private inline fun <T> tracedCall(
        kind: String,
        name: String?,
        args: List<Any?>,
        crossinline block: () -> T,
    ): T {
        val t = currentTracer()
        if (t?.opts?.includeCalls == true) t.on(TraceEvent.Call(kind, name, args))
        return try {
            val r = block()
            if (t?.opts?.includeCalls == true) t.on(TraceEvent.Return(kind, name, r))
            r
        } catch (ex: Throwable) {
            t?.on(TraceEvent.Error("call $kind ${name ?: "<lambda>"}", ex))
            throw ex
        }
    }

    private fun loadTraceMetadata(bytecode: Bytecode) {
        val meta = bytecode.traceMetadata
        enterEvents = meta.enterEvents
        exitEvents = meta.exitEvents
        pathWrites = meta.pathWrites
        activePc = -1
    }

    /**
     * Execute bytecode with the given environment
     */
    init {
        for ((name, decl) in funcs) {
            funcBytecode[name] = compileFunctionBytecode(decl)
        }
    }

    fun execute(bytecode: Bytecode, env: MutableMap<String, Any?> = mutableMapOf()): Any? {
        this.bytecode = bytecode
        this.environment = env
        this.pc = 0
        loadTraceMetadata(bytecode)

        stack.clear()
        callStack.clear()
        tryStack.clear()
        lastSuspension = null
        locals = arrayOf()
        initHostIndexTable()
        outputs.clear()

        return try {
            val r = run()
            if (outputs.isNotEmpty()) normalizeOutputs() else r
        } catch (e: VMException.Abort) {
            val v = e.value
            if (v is Map<*, *> && v["__suspended"] == true) v else if (outputs.isNotEmpty()) normalizeOutputs() else v
        } finally {
            (currentTracer() as? AutoCloseable)?.close()
        }
    }

    // ----- Incremental execution API (for pause/resume) -----

    /** Prepare VM for incremental execution without running. */
    fun begin(bytecode: Bytecode, env: MutableMap<String, Any?> = mutableMapOf()) {
        this.bytecode = bytecode
        this.environment = env
        this.pc = 0
        loadTraceMetadata(bytecode)
        stack.clear()
        callStack.clear()
        tryStack.clear()
        lastSuspension = null
        locals = arrayOf()
        initHostIndexTable()
    }

    /**
     * Run up to maxSteps instructions (or to completion). Returns true if finished.
     */
    fun step(maxSteps: Int = Int.MAX_VALUE): Boolean {
        return try {
            run(limit = maxSteps)
            pc >= bytecode.size()
        } catch (e: VMException.Abort) {
            val v = e.value
            // Distinguish suspension vs. normal return
            if (v is Map<*, *> && v["__suspended"] == true) {
                lastSuspension = v
                false
            } else {
                // Treat as normal return: set result on stack and mark finished
                stack.clear()
                if (v != null) stack.push(v)
                pc = bytecode.size()
                true
            }
        } finally {
            if (pc >= bytecode.size()) (currentTracer() as? AutoCloseable)?.close()
        }
    }

    /**
     * Resume execution until the program either finishes or suspends.
     * Returns true if finished, false if suspended.
     */
    fun resume(): Boolean = step(Int.MAX_VALUE)

    /** Current result if finished, else null. */
    fun resultOrNull(): Any? = if (pc >= bytecode.size()) if (stack.isEmpty()) null else stack.peek() else null

    /**
     * Main execution loop
     */
    private fun run(limit: Int = Int.MAX_VALUE, targetCallDepth: Int = -1): Any? {
        var steps = 0
        while (steps < limit) {
            val currentBytecode = bytecode
            val size = currentBytecode.size()
            if (pc < 0) pc = 0
            if (pc >= size) break
            val currentPc = pc
            emitEnterEventsAt(currentPc)

            val instruction = currentBytecode.getInstruction(currentPc)
            val tracer = currentTracer()
            val opName = instruction::class.simpleName ?: "?"
            if (tracer is CollectingTracer) {
                val opcode = when (instruction) {
                    Instruction.OUTPUT_1, Instruction.OUTPUT_2 -> Opcode.OUTPUT
                    is Instruction.LOAD_LOCAL -> Opcode.LOAD_LOCAL
                    is Instruction.STORE_LOCAL -> Opcode.STORE_LOCAL
                    else -> try { Opcode.valueOf(opName) } catch (_: Exception) { null }
                }
                if (opcode != null) {
                    val key = opcode.name
                    tracer.instructionCounts[key] = (tracer.instructionCounts[key] ?: 0L) + 1
                }
            }

            if (tracer?.opts?.step == true) {
                tracer.on(TraceEvent.Call("STEP", opName, emptyList()))
            }

            var executed = false
            activePc = currentPc
            try {
                executeInstruction(instruction)
                executed = true
                if (tracer?.opts?.step == true) {
                    tracer.on(TraceEvent.Return("STEP", opName, peekOrNull()))
                }
            } catch (e: Exception) {
                if (tracer?.opts?.step == true) {
                    tracer.on(TraceEvent.Error("VM step ${instruction::class.simpleName}", e))
                }
                val handled = handleException(e)
                if (!handled) {
                    if (e !is VMException.Abort) {
                        emitCallError(e)
                    }
                    throw e
                }
            } finally {
                activePc = -1
            }

            if (executed) {
                emitExitEventsAt(currentPc)
            }

            pc++
            if (pc >= bytecode.size() && callStack.isNotEmpty()) {
                returnFromFunction(null)
                continue
            }
            if (targetCallDepth >= 0 && callStack.size <= targetCallDepth) {
                break
            }
            steps++
        }
        return if (stack.isEmpty()) null else stack.peek()
    }

    /**
     * Execute a single instruction
     */
    private fun executeInstruction(instruction: Instruction) {
        when (instruction) {
            // Stack Operations
            is Instruction.PUSH -> {
                val v = instruction.value
                if (v is LambdaTemplate) {
                    // Capture environment by reference to avoid costly copies
                    // when creating closures. This relies on the assumption that
                    // callers won't mutate the environment in a way that breaks
                    // closure semantics between creation and invocation.
                    push(LambdaValue(v.params, v.bytecode, environment))
                } else {
                    push(v)
                }
            }
            is Instruction.DUP -> push(peek())
            is Instruction.POP -> pop()
            is Instruction.SWAP -> {
                val a = pop()
                val b = pop()
                push(a)
                push(b)
            }

            // Variable Operations
            is Instruction.LOAD_VAR -> {
                val value = environment[instruction.name]
                    ?: throw VMException.VariableNotFound(instruction.name)
                push(value)
                emitVarRead(instruction.name, value)
            }

            is Instruction.STORE_VAR -> storeVar(instruction.name)

            is Instruction.LOAD_SCOPE -> {
                val value = environment[instruction.name]
                push(value)
            }
            is Instruction.LOAD_LOCAL -> {
                val idx = instruction.index
                val v = if (idx >= 0 && idx < locals.size) locals[idx] else null
                push(v)
            }
            is Instruction.STORE_LOCAL -> {
                val value = pop()
                val idx = instruction.index
                ensureLocals(idx + 1)
                locals[idx] = value
            }

            // Arithmetic Operations
            is Instruction.ADD -> binaryArithmetic { l, r -> addNumbers(l, r) }
            is Instruction.SUB -> binaryArithmetic { l, r -> subtractNumbers(l, r) }
            is Instruction.MUL -> binaryArithmetic { l, r -> multiplyNumbers(l, r) }
            is Instruction.DIV -> binaryArithmetic { l, r -> divideNumbers(l, r) }
            is Instruction.MOD -> binaryArithmetic { l, r -> moduloNumbers(l, r) }
            is Instruction.NEG -> unaryArithmetic { negateNumber(it) }

            // Comparison Operations
            is Instruction.EQ -> binaryComparison { l, r -> l == r }
            is Instruction.NEQ -> binaryComparison { l, r -> l != r }
            is Instruction.LT -> binaryComparison { l, r -> compareValues(l, r) < 0 }
            is Instruction.LE -> binaryComparison { l, r -> compareValues(l, r) <= 0 }
            is Instruction.GT -> binaryComparison { l, r -> compareValues(l, r) > 0 }
            is Instruction.GE -> binaryComparison { l, r -> compareValues(l, r) >= 0 }

            // Logical Operations
            is Instruction.AND -> {
                val right = pop()
                val left = pop()
                push(if (!left.asBool()) false else right.asBool())
            }
            is Instruction.OR -> {
                val right = pop()
                val left = pop()
                push(if (left.asBool()) true else right.asBool())
            }
            is Instruction.NOT -> push(!pop().asBool())
            is Instruction.COALESCE -> {
                val right = pop()
                val left = pop()
                push(left ?: right)
            }

            // Object/Array Operations
            is Instruction.MAKE_OBJECT -> makeObject(instruction.fieldCount)
            is Instruction.MAKE_ARRAY -> makeArray(instruction.elementCount)
            is Instruction.ACCESS_STATIC -> accessStatic(instruction.key)
            is Instruction.ACCESS_DYNAMIC -> accessDynamic()
            is Instruction.SET_STATIC -> setStatic(instruction.key)
            is Instruction.SET_DYNAMIC -> setDynamic()
            is Instruction.APPEND -> appendToArray()
            is Instruction.CONCAT -> concatenateArrays()

            // Control Flow
            is Instruction.JUMP -> pc = instruction.address - 1 // -1 because pc++ at end
            is Instruction.JUMP_IF_TRUE -> {
                if (pop().asBool()) pc = instruction.address - 1
            }
            is Instruction.JUMP_IF_FALSE -> {
                if (!pop().asBool()) pc = instruction.address - 1
            }
            is Instruction.JUMP_IF_NULL -> {
                if (pop() == null) pc = instruction.address - 1
            }

            // Function Calls
            is Instruction.CALL -> callFunction(instruction.name, instruction.argCount)
            is Instruction.CALL_HOST -> callHostIndexed(instruction.index, instruction.name, instruction.argCount)
            is Instruction.CALL_FN -> callUserFunction(instruction.name, instruction.argCount)
            is Instruction.CALL_LAMBDA -> callLambda(instruction.argCount)
            is Instruction.RETURN -> {
                if (callStack.isNotEmpty()) returnFromFunction(null) else handleReturn(null)
            }
            is Instruction.RETURN_VALUE -> {
                val v = pop()
                if (callStack.isNotEmpty()) returnFromFunction(v) else handleReturn(v)
            }

            // Special Operations
            is Instruction.OUTPUT -> createOutput(instruction.fieldCount)
            Instruction.OUTPUT_1 -> createOutput1()
            Instruction.OUTPUT_2 -> createOutput2()
            is Instruction.MODIFY -> modifyObject(instruction.updateCount)
            is Instruction.INIT_FOREACH -> initForEach(instruction.varName, instruction.jumpToEnd)
            is Instruction.NEXT_FOREACH -> nextForEach(instruction.jumpToStart, instruction.jumpToEnd)
            is Instruction.TRY_START -> startTry(instruction.catchAddress)
            is Instruction.TRY_END -> endTry()
            is Instruction.CATCH -> handleCatch(instruction.exceptionVar, instruction.retryCount)
            is Instruction.ABORT -> throw VMException.Abort(if (stack.isEmpty()) null else pop())

            // Debug Operations
            is Instruction.TRACE -> emitTrace(instruction.event)
            is Instruction.BREAKPOINT -> emitBreakpoint(instruction.info)
            is Instruction.NOP -> Unit
            is Instruction.LINE -> emitLineNumber(instruction.lineNumber)
            is Instruction.SUSPEND -> {
                val snap = buildSnapshotJson(pc + 1)
                throw VMException.Abort(mapOf("__suspended" to true, "snapshot" to snap))
            }
        }
    }

    /**
     * Table-driven execution path using opcode + operand arrays.
     * This is the hot path; avoid constructing Instruction objects.
     */
    private fun executeOpcode(op: Opcode) {
        when (op) {
            // Stack Operations
            Opcode.PUSH -> {
                val v = bytecode.getConstOperand(pc)
                if (v is LambdaTemplate) {
                    push(LambdaValue(v.params, v.bytecode, environment))
                } else {
                    push(v)
                }
            }
            Opcode.DUP -> push(peek())
            Opcode.POP -> pop()
            Opcode.SWAP -> {
                val a = pop()
                val b = pop()
                push(a)
                push(b)
            }

            // Variable Operations
            Opcode.LOAD_VAR -> {
                val name = bytecode.getStringOperand(pc)
                val value = environment[name] ?: throw VMException.VariableNotFound(name)
                push(value)
                emitVarRead(name, value)
            }
            Opcode.STORE_VAR -> storeVar(bytecode.getStringOperand(pc))
            Opcode.LOAD_SCOPE -> {
                val name = bytecode.getStringOperand(pc)
                val value = environment[name]
                push(value)
            }
            Opcode.LOAD_LOCAL -> {
                val idx = bytecode.getIntOperand(pc)
                val v = if (idx >= 0 && idx < locals.size) locals[idx] else null
                push(v)
            }
            Opcode.STORE_LOCAL -> {
                val idx = bytecode.getIntOperand(pc)
                val value = pop()
                ensureLocals(idx + 1)
                locals[idx] = value
            }

            // Arithmetic Operations
            Opcode.ADD -> binaryArithmetic { l, r -> addNumbers(l, r) }
            Opcode.SUB -> binaryArithmetic { l, r -> subtractNumbers(l, r) }
            Opcode.MUL -> binaryArithmetic { l, r -> multiplyNumbers(l, r) }
            Opcode.DIV -> binaryArithmetic { l, r -> divideNumbers(l, r) }
            Opcode.MOD -> binaryArithmetic { l, r -> moduloNumbers(l, r) }
            Opcode.NEG -> unaryArithmetic { negateNumber(it) }

            // Comparison Operations
            Opcode.EQ -> binaryComparison { l, r -> l == r }
            Opcode.NEQ -> binaryComparison { l, r -> l != r }
            Opcode.LT -> binaryComparison { l, r -> compareValues(l, r) < 0 }
            Opcode.LE -> binaryComparison { l, r -> compareValues(l, r) <= 0 }
            Opcode.GT -> binaryComparison { l, r -> compareValues(l, r) > 0 }
            Opcode.GE -> binaryComparison { l, r -> compareValues(l, r) >= 0 }

            // Logical Operations
            Opcode.AND -> {
                val right = pop()
                val left = pop()
                push(if (!left.asBool()) false else right.asBool())
            }
            Opcode.OR -> {
                val right = pop()
                val left = pop()
                push(if (left.asBool()) true else right.asBool())
            }
            Opcode.NOT -> push(!pop().asBool())
            Opcode.COALESCE -> {
                val right = pop()
                val left = pop()
                push(left ?: right)
            }

            // Object/Array Operations
            Opcode.MAKE_OBJECT -> makeObject(bytecode.getIntOperand(pc, 0))
            Opcode.MAKE_ARRAY -> makeArray(bytecode.getIntOperand(pc, 0))
            Opcode.ACCESS_STATIC -> accessStatic(bytecode.getObjKeyOperand(pc))
            Opcode.ACCESS_DYNAMIC -> accessDynamic()
            Opcode.SET_STATIC -> setStatic(bytecode.getObjKeyOperand(pc))
            Opcode.SET_DYNAMIC -> setDynamic()
            Opcode.APPEND -> appendToArray()
            Opcode.CONCAT -> concatenateArrays()

            // Control Flow
            Opcode.JUMP -> pc = bytecode.getIntOperand(pc) - 1
            Opcode.JUMP_IF_TRUE -> { if (pop().asBool()) pc = bytecode.getIntOperand(pc) - 1 }
            Opcode.JUMP_IF_FALSE -> { if (!pop().asBool()) pc = bytecode.getIntOperand(pc) - 1 }
            Opcode.JUMP_IF_NULL -> { if (pop() == null) pc = bytecode.getIntOperand(pc) - 1 }

            // Function Calls
            Opcode.CALL -> {
                val name = bytecode.getStringOperand(pc)
                val argc = bytecode.getIntOperand(pc, 1)
                callFunction(name, argc)
            }
            Opcode.CALL_HOST -> {
                val index = bytecode.getIntOperand(pc)
                val name = bytecode.getStringOperand(pc, 1)
                val argc = bytecode.getIntOperand(pc, 2)
                callHostIndexed(index, name, argc)
            }
            Opcode.CALL_FN -> {
                val name = bytecode.getStringOperand(pc)
                val argc = bytecode.getIntOperand(pc, 1)
                callUserFunction(name, argc)
            }
            Opcode.CALL_LAMBDA -> callLambda(bytecode.getIntOperand(pc))
            Opcode.RETURN -> { if (callStack.isNotEmpty()) returnFromFunction(null) else handleReturn(null) }
            Opcode.RETURN_VALUE -> {
                val v = pop()
                if (callStack.isNotEmpty()) returnFromFunction(v) else handleReturn(v)
            }

            // Special Operations
            Opcode.OUTPUT -> {
                val n = bytecode.getIntOperand(pc)
                when (n) {
                    1 -> createOutput1()
                    2 -> createOutput2()
                    else -> createOutput(n)
                }
            }
            Opcode.MODIFY -> modifyObject(bytecode.getIntOperand(pc, 0))
            Opcode.INIT_FOREACH -> initForEach(bytecode.getStringOperand(pc, 0), bytecode.getIntOperand(pc, 0))
            Opcode.NEXT_FOREACH -> nextForEach(bytecode.getIntOperand(pc, 0), bytecode.getIntOperand(pc, 1))
            Opcode.TRY_START -> startTry(bytecode.getIntOperand(pc, 0))
            Opcode.TRY_END -> endTry()
            Opcode.CATCH -> handleCatch(bytecode.getStringOperand(pc, 0), bytecode.getIntOperand(pc, 0))
            Opcode.ABORT -> throw VMException.Abort(if (stack.isEmpty()) null else pop())

            // Debug Operations
            Opcode.TRACE -> emitTrace(bytecode.getStringOperand(pc, 0))
            Opcode.BREAKPOINT -> emitBreakpoint(bytecode.getStringOperand(pc, 0))
            Opcode.LINE -> emitLineNumber(bytecode.getIntOperand(pc, 0))
            Opcode.NOP -> Unit
            Opcode.SUSPEND -> {
                val snap = buildSnapshotJson(pc + 1)
                throw VMException.Abort(mapOf("__suspended" to true, "snapshot" to snap))
            }
        }
    }

    // === Stack Management ===

    private fun push(value: Any?) {
        if (stack.size >= MAX_STACK_SIZE) {
            throw VMException.StackOverflow()
        }
        stack.push(value)
    }

    private fun pop(): Any? {
        if (stack.isEmpty()) {
            throw VMException.StackUnderflow()
        }
        return stack.pop()
    }

    private fun peek(): Any? {
        if (stack.isEmpty()) {
            throw VMException.StackUnderflow()
        }
        return stack.peek()
    }

    private fun peekOrNull(): Any? = if (stack.isEmpty()) null else stack.peek()

    // === Helper Functions ===

    private fun Any?.asBool(): Boolean = when (this) {
        null -> false
        is Boolean -> this
        is Number -> this.toDouble() != 0.0
        else -> true
    }

    private fun isNumeric(value: Any?): Boolean =
        value is Number || isBigInt(value) || isBigDec(value)

    internal fun addNumbers(l: Any?, r: Any?): Any {
        return when {
            l is String || r is String -> l.toString() + r.toString()
            isNumeric(l) && isNumeric(r) -> {
                val left = l
                val right = r
                when {
                    isBigInt(left) || isBigInt(right) -> toBLBigInt(left) + toBLBigInt(right)
                    isBigDec(left) || isBigDec(right) -> toBLBigDec(left) + toBLBigDec(right)
                    left is Double || right is Double -> (left as Number).toDouble() + (right as Number).toDouble()
                    left is Float || right is Float -> (left as Number).toFloat() + (right as Number).toFloat()
                    left is Long || right is Long -> (left as Number).toLong() + (right as Number).toLong()
                    else -> (left as Number).toInt() + (right as Number).toInt()
                }
            }
            else -> throw VMException.TypeMismatch(
                "number or string",
                "$l + $r"
            )
        }
    }

    internal fun subtractNumbers(l: Any?, r: Any?): Any {
        if (!isNumeric(l) || !isNumeric(r)) {
            throw VMException.TypeMismatch("number", "${l} - ${r}")
        }
        val left = l
        val right = r
        return when {
            isBigInt(left) || isBigInt(right) -> toBLBigInt(left) - toBLBigInt(right)
            isBigDec(left) || isBigDec(right) -> toBLBigDec(left) - toBLBigDec(right)
            left is Double || right is Double -> (left as Number).toDouble() - (right as Number).toDouble()
            left is Float || right is Float -> (left as Number).toFloat() - (right as Number).toFloat()
            left is Long || right is Long -> (left as Number).toLong() - (right as Number).toLong()
            else -> (left as Number).toInt() - (right as Number).toInt()
        }
    }

    internal fun multiplyNumbers(l: Any?, r: Any?): Any {
        if (!isNumeric(l) || !isNumeric(r)) {
            throw VMException.TypeMismatch("number", "${l} * ${r}")
        }
        val left = l
        val right = r
        return when {
            isBigInt(left) || isBigInt(right) -> toBLBigInt(left) * toBLBigInt(right)
            isBigDec(left) || isBigDec(right) -> toBLBigDec(left) * toBLBigDec(right)
            left is Double || right is Double -> (left as Number).toDouble() * (right as Number).toDouble()
            left is Float || right is Float -> (left as Number).toFloat() * (right as Number).toFloat()
            left is Long || right is Long -> (left as Number).toLong() * (right as Number).toLong()
            else -> (left as Number).toInt() * (right as Number).toInt()
        }
    }

    internal fun divideNumbers(l: Any?, r: Any?): Any {
        if (!isNumeric(l) || !isNumeric(r)) {
            throw VMException.TypeMismatch("number", "${l} / ${r}")
        }
        val left = l
        val right = r
        if (right is Number && right.toDouble() == 0.0) {
            throw VMException.DivisionByZero()
        }
        return when {
            isBigInt(left) || isBigInt(right) -> toBLBigInt(left) / toBLBigInt(right)
            isBigDec(left) || isBigDec(right) -> toBLBigDec(left) / toBLBigDec(right)
            else -> (left as Number).toDouble() / (right as Number).toDouble()
        }
    }

    private fun moduloNumbers(l: Any?, r: Any?): Any {
        if (!isNumeric(l) || !isNumeric(r)) {
            throw VMException.TypeMismatch("number", "${l} % ${r}")
        }
        val left = l
        val right = r
        if (right is Number && right.toDouble() == 0.0) {
            throw VMException.DivisionByZero()
        }
        return when {
            isBigInt(left) || isBigInt(right) -> toBLBigInt(left) % toBLBigInt(right)
            isBigDec(left) || isBigDec(right) -> toBLBigDec(left) % toBLBigDec(right)
            left is Double || right is Double -> (left as Number).toDouble() % (right as Number).toDouble()
            left is Float || right is Float -> (left as Number).toFloat() % (right as Number).toFloat()
            left is Long || right is Long -> (left as Number).toLong() % (right as Number).toLong()
            else -> (left as Number).toInt() % (right as Number).toInt()
        }
    }

    private fun negateNumber(value: Any?): Any {
        if (!isNumeric(value)) {
            throw VMException.TypeMismatch("number", value?.let { it::class.simpleName } ?: "null")
        }
        val v = value
        return when {
            isBigInt(v) -> -(v as BLBigInt)
            isBigDec(v) -> -(v as BLBigDec)
            v is Double -> -v
            v is Float -> -v
            v is Long -> -v
            v is Int -> -v
            else -> -(v as Number).toInt()
        }
    }

    private fun toBLBigInt(n: Any?): BLBigInt = when {
        isBigInt(n) -> n as BLBigInt
        isBigDec(n) -> (n as BLBigDec).toBLBigInt()
        n is Long -> blBigIntOfLong(n)
        n is Int -> blBigIntOfLong(n.toLong())
        n is Number -> blBigIntOfLong(n.toLong())
        else -> error("Expected numeric, got ${n?.let { it::class.simpleName } ?: "null"}")
    }

    private fun toBLBigDec(n: Any?): BLBigDec = when {
        isBigDec(n) -> n as BLBigDec
        isBigInt(n) -> (n as BLBigInt).toBLBigDec()
        n is Double -> blBigDecOfDouble(n)
        n is Float -> blBigDecOfDouble(n.toDouble())
        n is Long -> blBigDecOfLong(n)
        n is Int -> blBigDecOfLong(n.toLong())
        n is Number -> blBigDecOfDouble(n.toDouble())
        else -> error("Expected numeric, got ${n?.let { it::class.simpleName } ?: "null"}")
    }

    internal fun compareValues(left: Any?, right: Any?): Int {
        return when {
            isNumeric(left) && isNumeric(right) -> toBLBigDec(left).compareTo(toBLBigDec(right))
            else -> left.toString().compareTo(right.toString())
        }
    }

    // === Binary Operations Helpers ===

    private inline fun binaryArithmetic(op: (Any?, Any?) -> Any) {
        val right = pop()
        val left = pop()
        push(op(left, right))
    }

    private inline fun binaryComparison(op: (Any?, Any?) -> Boolean) {
        val right = pop()
        val left = pop()
        push(op(left, right))
    }

    private inline fun unaryArithmetic(op: (Any?) -> Any) {
        val value = pop()
        push(op(value))
    }

    // === Complex Operations ===

    private fun makeObject(fieldCount: Int) {
        val obj = LinkedHashMap<Any, Any?>(fieldCount)
        repeat(fieldCount) {
            val key = pop()
            val value = pop()
            obj[key!!] = value
        }
        push(obj)
    }

    private fun makeArray(elementCount: Int) {
        val array = ArrayList<Any?>(elementCount)
        val elements = Array(elementCount) { pop() }
        // Reverse because we popped in reverse order
        for (i in elements.indices.reversed()) {
            array.add(elements[i])
        }
        push(array)
    }

    private fun accessStatic(key: ObjKey) {
        val container = pop()
        val result = when (container) {
            is Map<*, *> -> container[unwrapKey(key)]
            is List<*> -> {
                val index = staticIndex(key)
                if (index < 0 || index >= container.size) {
                    throw VMException.IndexOutOfBounds(index, container.size)
                }
                container[index]
            }
            else -> throw VMException.TypeMismatch("object or array", container?.let { it::class.simpleName } ?: "null")
        }
        push(result)
    }

    private fun accessDynamic() {
        val key = pop()
        val result = when (val container = pop()) {
            is Map<*, *> -> container[key]
            is List<*> -> {
                val index = when (key) {
                    is Int -> key
                    is Long -> {
                        if (key < 0 || key > Int.MAX_VALUE) {
                            throw VMException.IndexOutOfBounds(key.toInt(), container.size)
                        }
                        key.toInt()
                    }
                    else -> throw VMException.TypeMismatch("integer", key?.let { it::class.simpleName } ?: "null")
                }
                if (index < 0 || index >= container.size) {
                    throw VMException.IndexOutOfBounds(index, container.size)
                }
                container[index]
            }
            else -> throw VMException.TypeMismatch("object or array", container?.let { it::class.simpleName } ?: "null")
        }
        push(result)
    }

    // Additional helper functions would continue here...
    // For brevity, I'll implement the key remaining methods

    private fun unwrapKey(key: ObjKey): Any = when (key) {
        is ObjKey.Name -> key.v
        is I32 -> key.v
        is I64 -> key.v
        is IBig -> key.v
    }

    private fun staticIndex(key: ObjKey): Int = when (key) {
        is ObjKey.Name -> throw VMException.TypeMismatch("integer index", "name")
        is I32 -> key.v
        is I64 -> {
            if (key.v < 0 || key.v > Int.MAX_VALUE) {
                throw VMException.IndexOutOfBounds(key.v.toInt(), 0)
            }
            key.v.toInt()
        }
        is IBig -> {
            if (key.v.signum() < 0 || key.v > blBigIntOfLong(Int.MAX_VALUE.toLong())) {
                throw VMException.IndexOutOfBounds(0, 0)
            }
            key.v.toInt()
        }
    }

    // Placeholder implementations for remaining complex operations
    private fun setStatic(key: ObjKey) {
        val value = pop()
        val container = pop()
        when (container) {
            is Map<*, *> -> {
                val out = LinkedHashMap<Any, Any?>(container.size + if (!container.containsKey(unwrapKey(key))) 1 else 0)
                for ((k, v) in container) out[k!!] = v
                out[unwrapKey(key)] = value
                push(out)
            }
            is List<*> -> {
                val idx = staticIndex(key)
                if (idx < 0 || idx >= container.size) {
                    throw VMException.IndexOutOfBounds(idx, container.size)
                }
                val out = ArrayList<Any?>(container.size)
                for ((i, v) in container.withIndex()) {
                    out.add(if (i == idx) value else v)
                }
                push(out)
            }
            else -> throw VMException.TypeMismatch(
                "object or array",
                container?.let { it::class.simpleName } ?: "null"
            )
        }
    }
    private fun setDynamic() {
        val value = pop()
        val key = pop()
        when (val container = pop()) {
            is Map<*, *> -> {
                val out = LinkedHashMap<Any, Any?>(container.size + if (!container.containsKey(key)) 1 else 0)
                for ((k, v) in container) out[k!!] = v
                out[key!!] = value
                push(out)
            }
            is List<*> -> {
                val idx = when (key) {
                    is Int -> key
                    is Long -> {
                        if (key < 0 || key > Int.MAX_VALUE) throw VMException.IndexOutOfBounds(key.toInt(), container.size)
                        key.toInt()
                    }
                    else -> throw VMException.TypeMismatch("integer", key?.let { it::class.simpleName } ?: "null")
                }
                if (idx < 0 || idx >= container.size) throw VMException.IndexOutOfBounds(idx, container.size)
                val out = ArrayList<Any?>(container.size)
                for ((i, v) in container.withIndex()) out.add(if (i == idx) value else v)
                push(out)
            }
            else -> throw VMException.TypeMismatch(
                "object or array",
                container?.let { it::class.simpleName } ?: "null"
            )
        }
    }
    private fun appendToArray() {
        val elem = pop()
        val arr = pop()
        val out = ArrayList<Any?>()
        when (arr) {
            null -> out.add(elem)
            is List<*> -> out.addAll(arr)
            else -> throw VMException.TypeMismatch("array", arr::class.simpleName ?: "null")
        }
        if (arr is List<*>) out.add(elem)
        push(out)
    }
    private fun concatenateArrays() {
        val right = pop()
        val left = pop()
        if (left !is List<*> || right !is List<*>) {
            throw VMException.TypeMismatch(
                "array",
                "${left} + ${right}"
            )
        }
        val out = ArrayList<Any?>(left.size + right.size)
        out.addAll(left)
        out.addAll(right)
        push(out)
    }
    private enum class CallMode { SCHEDULED, IMMEDIATE }

    private fun compileFunctionBytecode(func: FuncDecl): Bytecode {
        val ir: List<IRNode> = when (val body = func.body) {
            is ExprBody -> listOf(IRReturn(body.expr))
            is BlockBody -> ToIR(funcs, hostFns).compile(body.block.statements)
        }
        Compiler.enforceFuncBody(ir)
        return Compiler(funcs, hostFns, useLocals = false).compile(ir)
    }

    private fun createCallEnvironment(params: List<String>, args: List<Any?>, captured: Map<String, Any?> = emptyMap()): OverlayEnv {
        val env = OverlayEnv(captured)
        for ((index, param) in params.withIndex()) {
            env[param] = args.getOrNull(index)
        }
        return env
    }

    private fun startFunctionCall(
        kind: String,
        name: String?,
        args: List<Any?>,
        env: OverlayEnv,
        functionBytecode: Bytecode,
        returnAddress: Int,
        mode: CallMode,
    ) {
        if (callStack.size >= MAX_CALL_DEPTH) {
            throw VMException.StackOverflow()
        }
        val tracer = currentTracer()
        val includeTrace = tracer?.opts?.includeCalls == true
        if (includeTrace) {
            tracer.on(TraceEvent.Call(kind, name, args))
        }
        callStack.push(
            CallFrame(
                returnAddress = returnAddress,
                environment = HashMap(environment),
                outerBytecode = bytecode,
                stackSize = stack.size,
                locals = locals,
                traceKind = if (includeTrace) kind else null,
                traceName = if (includeTrace) name else null,
                emitTraceReturn = includeTrace,
            ),
        )
        environment = env
        locals = arrayOf()
        bytecode = functionBytecode
        loadTraceMetadata(functionBytecode)
        initHostIndexTable()
        pc = if (mode == CallMode.IMMEDIATE) 0 else -1
    }

    private fun emitCallError(e: Exception) {
        val frame = callStack.peek() ?: return
        if (!frame.emitTraceReturn || frame.traceKind == null) return
        val tracer = currentTracer()
        val name = frame.traceName ?: "<lambda>"
        tracer?.on(TraceEvent.Error("call ${frame.traceKind} $name", e))
    }

    private fun callFunction(name: String, argCount: Int) {
        val args = ArrayList<Any?>(argCount)
        repeat(argCount) { args.add(pop()) }

        environment[name]?.let { value ->
            if (value is LambdaValue) {
                val env = createCallEnvironment(value.params, args, value.captured)
                startFunctionCall("LAMBDA", name, args, env, value.bytecode, pc + 1, CallMode.SCHEDULED)
                return
            }
        }

        hostFns[name]?.let { fn ->
            val hostArgs = args.map { arg ->
                if (arg is LambdaValue) {
                    { callArgs: List<Any?> -> invokeLambda(arg, callArgs) } as (List<Any?>) -> Any?
                } else {
                    arg
                }
            }
            val result = tracedCall("HOST", name, hostArgs) { fn(hostArgs) }
            push(result)
            return
        }

        // User-defined function declared in program
        funcs[name]?.let { fd ->
            val bc = funcBytecode[name] ?: compileFunctionBytecode(fd).also { funcBytecode[name] = it }
            val env = createCallEnvironment(fd.params, args)
            startFunctionCall("FUNC", name, args, env, bc, pc + 1, CallMode.SCHEDULED)
            return
        }

        throw VMException.VariableNotFound(name)
    }



    private fun callUserFunction(name: String, argCount: Int) {
        val args = ArrayList<Any?>(argCount)
        repeat(argCount) { args.add(pop()) }
        val func = funcs[name] ?: throw VMException.VariableNotFound(name)
        val bc = funcBytecode[name] ?: compileFunctionBytecode(func).also { funcBytecode[name] = it }
        val env = createCallEnvironment(func.params, args)
        startFunctionCall("FUNC", name, args, env, bc, pc + 1, CallMode.SCHEDULED)
    }

    private fun callLambda(argCount: Int) {
        val args = ArrayList<Any?>(argCount)
        repeat(argCount) { args.add(pop()) }
        val fn = pop()
        if (fn !is LambdaValue) {
            throw VMException.TypeMismatch("lambda", fn?.let { it::class.simpleName })
        }
        val env = createCallEnvironment(fn.params, args, fn.captured)
        startFunctionCall("LAMBDA", null, args, env, fn.bytecode, pc + 1, CallMode.SCHEDULED)
    }

    private fun callHostIndexed(index: Int, name: String, argCount: Int) {
        val args = ArrayList<Any?>(argCount)
        repeat(argCount) { args.add(pop()) }
        val fn = hostByIndex.getOrNull(index) ?: hostFns[name]?.also { ensureHostIndex(index, it) }
        ?: throw VMException.VariableNotFound(name)
        val hostArgs = args.map { arg ->
            if (arg is LambdaValue) {
                { callArgs: List<Any?> -> invokeLambda(arg, callArgs) } as (List<Any?>) -> Any?
            } else {
                arg
            }
        }
        val result = tracedCall("HOST", name, hostArgs) { fn(hostArgs) }
        push(result)
    }

    private fun ensureHostIndex(index: Int, fn: (List<Any?>) -> Any?) {
        while (hostByIndex.size <= index) hostByIndex.add(null)
        hostByIndex[index] = fn
    }

    private fun initHostIndexTable() {
        // Pre-resolve host indices from bytecode once per bytecode instance
        if (!::bytecode.isInitialized) return
        if (hostIndexPreparedFor === bytecode) return

        // Bytecode changed: rebuild host index table to avoid stale mappings
        hostByIndex.clear()
        for (i in 0 until bytecode.size()) {
            val op = Opcode.values()[bytecode.getOpcode(i)]
            if (op == Opcode.CALL_HOST) {
                val idx = bytecode.getIntOperand(i, 0)
                val name = bytecode.getStringOperand(i, 0)
                val fn = hostFns[name]
                if (fn != null) ensureHostIndex(idx, fn)
            }
        }
        hostIndexPreparedFor = bytecode
    }

    private class OverlayEnv(private val parent: Map<String, Any?>) : AbstractMutableMap<String, Any?>() {
        private val locals = HashMap<String, Any?>()
        override val entries: MutableSet<MutableMap.MutableEntry<String, Any?>>
            get() {
                val combined = LinkedHashMap<String, Any?>(parent.size + locals.size)
                combined.putAll(parent)
                combined.putAll(locals)
                return combined.entries
            }
        override fun put(key: String, value: Any?): Any? = locals.put(key, value)
        override fun get(key: String): Any? = locals[key] ?: parent[key]
    }

    private fun invokeLambda(lambda: LambdaValue, args: List<Any?>): Any? {
        val depthBefore = callStack.size
        val env = createCallEnvironment(lambda.params, args, lambda.captured)
        val returnAddress = pc
        startFunctionCall("LAMBDA", null, args, env, lambda.bytecode, returnAddress, CallMode.IMMEDIATE)
        run(targetCallDepth = depthBefore)
        return if (stack.isEmpty()) null else pop()
    }

    private fun handleReturn(value: Any?): Nothing {
        throw VMException.Abort(value)
    }

    private fun returnFromFunction(value: Any?) {
        // Restore previous frame
        val frame = callStack.pop()
        val outBc = frame.outerBytecode
        val retPc = frame.returnAddress
        val tracer = currentTracer()
        if (frame.emitTraceReturn && frame.traceKind != null) {
            tracer?.on(TraceEvent.Return(frame.traceKind, frame.traceName, value))
        }
        val outerEnv = frame.environment
        // Restore stack depth to the pre-call size, then push return value
        while (stack.size > frame.stackSize) pop()
        while (stack.size < frame.stackSize) push(null)
        push(value)
        // Restore environment and bytecode
        this.environment = HashMap(outerEnv)
        this.bytecode = outBc
        loadTraceMetadata(outBc)
        initHostIndexTable()
        this.locals = frame.locals
        // Resume at instruction after CALL_FN
        this.pc = retPc - 1
    }
    private fun createOutput(fieldCount: Int) {
        if (fieldCount == 0) {
            // Expression-output: the value is already on stack; keep as-is.
            return
        }
        val obj = LinkedHashMap<Any, Any?>(fieldCount)
        repeat(fieldCount) {
            val value = pop()
            val key = pop()
            obj[key!!] = value
        }
        push(obj)
        @Suppress("UNCHECKED_CAST")
        val output = obj as Map<Any, Any?>
        outputs.add(output)
        emitOutputEvent(output)
    }
    private fun createOutput1() {
        val value = pop()
        val key = pop()
        val obj = LinkedHashMap<Any, Any?>(1)
        obj[key!!] = value
        push(obj)
        @Suppress("UNCHECKED_CAST")
        val output = obj as Map<Any, Any?>
        outputs.add(output)
        emitOutputEvent(output)
    }
    private fun createOutput2() {
        val v2 = pop()
        val k2 = pop()
        val v1 = pop()
        val k1 = pop()
        val obj = LinkedHashMap<Any, Any?>(2)
        obj[k1!!] = v1
        obj[k2!!] = v2
        push(obj)
        @Suppress("UNCHECKED_CAST")
        val output = obj as Map<Any, Any?>
        outputs.add(output)
        emitOutputEvent(output)
    }

    private fun normalizeOutputs(): Any? = when (outputs.size) {
        0 -> null
        1 -> outputs[0]
        else -> outputs.toList()
    }
    private fun modifyObject(updateCount: Int) {
        val target = pop()
        if (target !is Map<*, *>) {
            throw VMException.TypeMismatch("object", target?.let { it::class.simpleName } ?: "null")
        }
        val out = LinkedHashMap<Any, Any?>(target.size + updateCount)
        for ((k, v) in target) out[k!!] = v
        repeat(updateCount) {
            val key = pop()
            val value = pop()
            out[key!!] = value
        }
        push(out)
    }
    private fun initForEach(varName: String, jumpToEnd: Int) {
        val iterable = pop()
        val list: List<Any?> = when (iterable) {
            is List<*> -> iterable as List<Any?>
            is Iterable<*> -> (iterable as Iterable<Any?>).toList()
            is Sequence<*> -> (iterable as Sequence<Any?>).toList()
            else -> throw VMException.TypeMismatch("iterable", iterable?.let { it::class.simpleName } ?: "null")
        }

        if (list.isEmpty()) {
            pc = jumpToEnd - 1
            return
        }

        val outerExists = environment.containsKey(varName)
        val outerValue = environment[varName]
        loopStack.push(LoopState(varName, list, 0, outerExists, outerValue))
        environment[varName] = list[0]
    }
    private fun nextForEach(jumpToStart: Int, jumpToEnd: Int) {
        val state = loopStack.peek() ?: run { pc = jumpToEnd - 1; return }
        val nextIdx = state.idx + 1
        if (nextIdx < state.list.size) {
            state.idx = nextIdx
            environment[state.varName] = state.list[nextIdx]
            pc = jumpToStart - 1
        } else {
            if (state.hadOuter) environment[state.varName] = state.outerValue else environment.remove(state.varName)
            loopStack.pop()
            pc = jumpToEnd - 1
        }
    }
    private fun startTry(catchAddress: Int) {
        // Record start (next instruction) and current stack size for unwinding
        val startAt = pc + 1
        tryStack.push(TryFrame(catchAddress = catchAddress, stackSize = stack.size, startAddress = startAt, attempts = 0))
    }
    private fun endTry() {
        if (tryStack.isNotEmpty()) tryStack.pop()
    }
    private fun handleCatch(exceptionVar: String, retryCount: Int) {
        val frame = tryStack.peek() ?: return
        // Expose exception to environment if requested
        environment[exceptionVar] = lastException?.message ?: lastException?.toString()
        if (frame.attempts < retryCount) {
            frame.attempts += 1
            // Reset stack to pre-try size
            while (stack.size > frame.stackSize) stack.pop()
            // Jump back to start of try block
            pc = frame.startAddress - 1
            lastException = null
            return
        }
        // Exhausted retries: proceed to fallback. Pop the frame.
        tryStack.pop()
        lastException = null
    }

    // Minimal exception handling: let VMException propagate to tests/caller.
    // Returns false to indicate the VM should rethrow the exception.
    private fun handleException(e: Exception): Boolean {
        // Propagate suspension out of TRY to the caller for snapshot handoff
        if (e is VMException.Abort) {
            val v = e.value
            if (v is Map<*, *> && v["__suspended"] == true) return false
        }
        val frame = tryStack.peek() ?: return false
        // Unwind to the stack size captured at TRY_START
        while (stack.size > frame.stackSize) stack.pop()
        lastException = e
        pc = frame.catchAddress - 1
        return true
    }

    // ----- Snapshot (serialize/deserialize VM state for pause/resume) -----
    // Snapshot format via kotlinx.serialization
    @Serializable
    data class Snapshot(
        val bytecode: SerializedBytecode,
        val pc: Int,
        val env: Map<String, SerializedValue>,
        val stack: List<SerializedValue>,
        val locals: List<SerializedValue> = emptyList(),
        val calls: List<SerializedCall> = emptyList(),
        val trys: List<SerializedTry> = emptyList(),
        val loops: List<SerializedLoop> = emptyList(),
    )

    @Serializable
    data class SerializedBytecode(
        val instructions: List<SerializedInstruction>
    )

    @Serializable
    data class SerializedInstruction(
        val op: String,
        val s: String? = null,
        val i: Int? = null,
        val n: Int? = null,
        val key: String? = null,
        val value: SerializedValue? = null
    )

    @Serializable
    data class SerializedValue(
        val t: String, // null, bool, str, i64, f64, obj, arr
        val s: String? = null,
        val b: Boolean? = null,
        val arr: List<SerializedValue>? = null,
        val obj: Map<String, SerializedValue>? = null
    )

    @Serializable
    data class SerializedCall(
        val returnPc: Int,
        val env: Map<String, SerializedValue>,
        val outer: SerializedBytecode,
        val stackSize: Int,
        val locals: List<SerializedValue> = emptyList(),
        val traceKind: String? = null,
        val traceName: String? = null,
        val emitTraceReturn: Boolean = false,
    )

    @Serializable
    data class SerializedTry(val catchPc: Int, val stackSize: Int, val startPc: Int, val attempts: Int)

    @Serializable
    data class SerializedLoop(
        val varName: String,
        val list: List<SerializedValue>,
        val idx: Int,
        val hadOuter: Boolean,
        val outer: SerializedValue?,
    )

    /** Convert current VM state to JSON string. */
    fun snapshotJson(): String {
        val snap = Snapshot(
            serializeBytecode(bytecode),
            pc,
            environment.mapValues { (_, v) -> serializeValue(v) },
            stack.toList().map { serializeValue(it) },
            locals = locals.take(locals.size).map { serializeValue(it) },
            calls = callStack.map { c ->
                SerializedCall(
                    c.returnAddress,
                    c.environment.mapValues { (_, v) -> serializeValue(v) },
                    serializeBytecode(c.outerBytecode),
                    c.stackSize,
                    locals = c.locals.map { serializeValue(it) },
                    traceKind = c.traceKind,
                    traceName = c.traceName,
                    emitTraceReturn = c.emitTraceReturn,
                )
            },
            trys = tryStack.map { t -> SerializedTry(t.catchAddress, t.stackSize, t.startAddress, t.attempts) },
            loops = loopStack.map { l ->
                SerializedLoop(
                    l.varName,
                    l.list.map { serializeValue(it) },
                    l.idx,
                    l.hadOuter,
                    l.outerValue?.let { serializeValue(it) },
                )
            },
        )
        return Json.encodeToString(Snapshot.serializer(), snap)
    }

    private fun buildSnapshotJson(pcAt: Int): String {
        val snap = Snapshot(
            serializeBytecode(bytecode),
            pcAt,
            environment.mapValues { (_, v) -> serializeValue(v) },
            stack.toList().map { serializeValue(it) },
            locals = locals.take(locals.size).map { serializeValue(it) },
            calls = callStack.map { c ->
                SerializedCall(
                    c.returnAddress,
                    c.environment.mapValues { (_, v) -> serializeValue(v) },
                    serializeBytecode(c.outerBytecode),
                    c.stackSize,
                    locals = c.locals.map { serializeValue(it) },
                    traceKind = c.traceKind,
                    traceName = c.traceName,
                    emitTraceReturn = c.emitTraceReturn,
                )
            },
            trys = tryStack.map { t -> SerializedTry(t.catchAddress, t.stackSize, t.startAddress, t.attempts) },
            loops = loopStack.map { l ->
                SerializedLoop(
                    l.varName,
                    l.list.map { serializeValue(it) },
                    l.idx,
                    l.hadOuter,
                    l.outerValue?.let { serializeValue(it) },
                )
            },
        )
        return Json.encodeToString(Snapshot.serializer(), snap)
    }

    fun suspendedSnapshotOrNull(): String? =
        (lastSuspension as? Map<*, *>)?.get("snapshot") as? String

    companion object {
        private const val MAX_STACK_SIZE = 10000
        private const val MAX_CALL_DEPTH = 500

        /** Restore a VM from a JSON snapshot. Provide hostFns/funcs for runtime. */
        fun restoreFromSnapshot(
            snapshotJson: String,
            hostFns: Map<String, (List<Any?>) -> Any?> = emptyMap(),
            funcs: Map<String, FuncDecl> = emptyMap(),
            tracer: Tracer? = null,
        ): VM {
            val snap = Json.decodeFromString(Snapshot.serializer(), snapshotJson)
            val vm = VM(hostFns, funcs, tracer)
            val bc = deserializeBytecode(snap.bytecode)
            val env = snap.env.mapValues { (_, v) -> deserializeValue(v) }.toMutableMap()
            vm.begin(bc, env)
            vm.pc = snap.pc
            // Rebuild operand stack
            vm.stack.clear()
            for (v in snap.stack) vm.stack.push(deserializeValue(v))
            // Restore locals
            vm.locals = arrayOf()
            if (snap.locals.isNotEmpty()) {
                vm.ensureLocals(snap.locals.size)
                for ((i, sv) in snap.locals.withIndex()) vm.locals[i] = deserializeValue(sv)
            }
            // Restore call stack
            vm.callStack.clear()
            for (c in snap.calls) {
                val cenv = HashMap(c.env.mapValues { (_, v) -> deserializeValue(v) })
                val outer = deserializeBytecode(c.outer)
                val localsArray = Array(c.locals.size) { idx -> deserializeValue(c.locals[idx]) }
                vm.callStack.push(
                    CallFrame(
                        c.returnPc,
                        cenv,
                        outer,
                        c.stackSize,
                        localsArray,
                        c.traceKind,
                        c.traceName,
                        c.emitTraceReturn,
                    ),
                )
            }
            // Restore try stack
            vm.tryStack.clear()
            for (t in snap.trys) vm.tryStack.push(TryFrame(t.catchPc, t.stackSize, t.startPc, t.attempts))
            // Restore loop stack
            vm.loopStack.clear()
            for (l in snap.loops) {
                val li = l.list.map { deserializeValue(it) }
                val outer = l.outer?.let { deserializeValue(it) }
                vm.loopStack.push(LoopState(l.varName, li, l.idx, l.hadOuter, outer))
            }
            return vm
        }

        /** Pretty-print snapshot JSON to demonstrate its structure and bytecode. */
        fun prettySnapshot(snapshotJson: String): String {
            val snap = Json.decodeFromString(Snapshot.serializer(), snapshotJson)
            val b = StringBuilder()
            b.appendLine("VM Snapshot")
            b.appendLine("- pc: ${snap.pc}")
            b.appendLine("- env:")
            for ((k, v) in snap.env) b.appendLine(
                "    $k = ${v.t}${v.s?.let { "($it)" } ?: v.b?.toString()?.let { "($it)" } ?: ""}"
            )
            b.appendLine("- stack (top last):")
            for ((idx, v) in snap.stack.withIndex()) b.appendLine(
                "    #$idx = ${v.t}${v.s?.let { "($it)" } ?: v.b?.toString()?.let { "($it)" } ?: ""}"
            )
            b.appendLine("- bytecode:")
            snap.bytecode.instructions.forEachIndexed { idx, ins ->
                val valStr = ins.value?.let { v -> "value=${deserializeValue(v)}" }
                val args = listOfNotNull(
                    ins.op,
                    ins.s?.let { "s=$it" },
                    ins.i?.let { "i=$it" },
                    ins.n?.let { "n=$it" },
                    ins.key?.let { "key=$it" },
                    valStr,
                ).joinToString(" ")
                val idxStr = idx.toString().padStart(4, '0')
                b.appendLine("    $idxStr: $args")
            }
            return b.toString()
        }

        private fun unwrapKeyConst(key: ObjKey): Any = when (key) {
            is ObjKey.Name -> key.v
            is I32 -> key.v
            is I64 -> key.v
            is IBig -> key.v
        }

        private fun serializeBytecode(b: Bytecode): SerializedBytecode =
            SerializedBytecode(b.instructions.map { serializeInstruction(it) })

        private fun deserializeBytecode(s: SerializedBytecode): Bytecode =
            Bytecode.fromInstructions(s.instructions.map { deserializeInstruction(it) })

        private fun serializeInstruction(i: Instruction): SerializedInstruction = when (i) {
            is Instruction.PUSH -> SerializedInstruction("PUSH", value = serializeValue(i.value))
            Instruction.DUP -> SerializedInstruction("DUP")
            Instruction.POP -> SerializedInstruction("POP")
            Instruction.SWAP -> SerializedInstruction("SWAP")
            is Instruction.LOAD_VAR -> SerializedInstruction("LOAD_VAR", s = i.name)
            is Instruction.STORE_VAR -> SerializedInstruction("STORE_VAR", s = i.name)
            is Instruction.LOAD_SCOPE -> SerializedInstruction("LOAD_SCOPE", s = i.name)
            is Instruction.LOAD_LOCAL -> SerializedInstruction("LOAD_LOCAL", i = i.index)
            is Instruction.STORE_LOCAL -> SerializedInstruction("STORE_LOCAL", i = i.index)
            Instruction.ADD -> SerializedInstruction("ADD")
            Instruction.SUB -> SerializedInstruction("SUB")
            Instruction.MUL -> SerializedInstruction("MUL")
            Instruction.DIV -> SerializedInstruction("DIV")
            Instruction.MOD -> SerializedInstruction("MOD")
            Instruction.NEG -> SerializedInstruction("NEG")
            Instruction.EQ -> SerializedInstruction("EQ")
            Instruction.NEQ -> SerializedInstruction("NEQ")
            Instruction.LT -> SerializedInstruction("LT")
            Instruction.LE -> SerializedInstruction("LE")
            Instruction.GT -> SerializedInstruction("GT")
            Instruction.GE -> SerializedInstruction("GE")
            Instruction.AND -> SerializedInstruction("AND")
            Instruction.OR -> SerializedInstruction("OR")
            Instruction.NOT -> SerializedInstruction("NOT")
            Instruction.COALESCE -> SerializedInstruction("COALESCE")
            is Instruction.MAKE_OBJECT -> SerializedInstruction("MAKE_OBJECT", n = i.fieldCount)
            is Instruction.MAKE_ARRAY -> SerializedInstruction("MAKE_ARRAY", n = i.elementCount)
            is Instruction.ACCESS_STATIC -> SerializedInstruction(
                "ACCESS_STATIC",
                key = unwrapKeyConst(i.key).toString()
            )
            Instruction.ACCESS_DYNAMIC -> SerializedInstruction("ACCESS_DYNAMIC")
            is Instruction.SET_STATIC -> SerializedInstruction("SET_STATIC", key = unwrapKeyConst(i.key).toString())
            Instruction.SET_DYNAMIC -> SerializedInstruction("SET_DYNAMIC")
            Instruction.APPEND -> SerializedInstruction("APPEND")
            Instruction.CONCAT -> SerializedInstruction("CONCAT")
            is Instruction.JUMP -> SerializedInstruction("JUMP", i = i.address)
            is Instruction.JUMP_IF_TRUE -> SerializedInstruction("JUMP_IF_TRUE", i = i.address)
            is Instruction.JUMP_IF_FALSE -> SerializedInstruction("JUMP_IF_FALSE", i = i.address)
            is Instruction.JUMP_IF_NULL -> SerializedInstruction("JUMP_IF_NULL", i = i.address)
            is Instruction.CALL -> SerializedInstruction("CALL", s = i.name, n = i.argCount)
            is Instruction.CALL_HOST -> SerializedInstruction("CALL_HOST", s = i.name, i = i.index, n = i.argCount)
            is Instruction.CALL_FN -> SerializedInstruction("CALL_FN", s = i.name, n = i.argCount)
            is Instruction.CALL_LAMBDA -> SerializedInstruction("CALL_LAMBDA", n = i.argCount)
            Instruction.RETURN -> SerializedInstruction("RETURN")
            Instruction.RETURN_VALUE -> SerializedInstruction("RETURN_VALUE")
            is Instruction.OUTPUT -> SerializedInstruction("OUTPUT", n = i.fieldCount)
            Instruction.OUTPUT_1 -> SerializedInstruction("OUTPUT_1")
            Instruction.OUTPUT_2 -> SerializedInstruction("OUTPUT_2")
            is Instruction.MODIFY -> SerializedInstruction("MODIFY", n = i.updateCount)
            is Instruction.INIT_FOREACH -> SerializedInstruction("INIT_FOREACH", s = i.varName, i = i.jumpToEnd)
            is Instruction.NEXT_FOREACH -> SerializedInstruction("NEXT_FOREACH", i = i.jumpToStart, n = i.jumpToEnd)
            is Instruction.TRY_START -> SerializedInstruction("TRY_START", i = i.catchAddress)
            Instruction.TRY_END -> SerializedInstruction("TRY_END")
            is Instruction.CATCH -> SerializedInstruction("CATCH", s = i.exceptionVar, n = i.retryCount)
            Instruction.ABORT -> SerializedInstruction("ABORT")
            is Instruction.TRACE -> SerializedInstruction("TRACE", s = i.event)
            is Instruction.BREAKPOINT -> SerializedInstruction("BREAKPOINT", s = i.info)
            is Instruction.LINE -> SerializedInstruction("LINE", i = i.lineNumber)
            Instruction.SUSPEND -> SerializedInstruction("SUSPEND")
            else -> throw IllegalArgumentException("Unsupported instruction for serialization: $i")
        }

        private fun deserializeInstruction(s: SerializedInstruction): Instruction = when (s.op) {
            "PUSH" -> Instruction.PUSH(deserializeValue(s.value!!))
            "DUP" -> Instruction.DUP
            "POP" -> Instruction.POP
            "SWAP" -> Instruction.SWAP
            "LOAD_VAR" -> Instruction.LOAD_VAR(s.s!!)
            "STORE_VAR" -> Instruction.STORE_VAR(s.s!!)
            "LOAD_SCOPE" -> Instruction.LOAD_SCOPE(s.s!!)
            "LOAD_LOCAL" -> Instruction.LOAD_LOCAL(s.i!!)
            "STORE_LOCAL" -> Instruction.STORE_LOCAL(s.i!!)
            "ADD" -> Instruction.ADD
            "SUB" -> Instruction.SUB
            "MUL" -> Instruction.MUL
            "DIV" -> Instruction.DIV
            "MOD" -> Instruction.MOD
            "NEG" -> Instruction.NEG
            "EQ" -> Instruction.EQ
            "NEQ" -> Instruction.NEQ
            "LT" -> Instruction.LT
            "LE" -> Instruction.LE
            "GT" -> Instruction.GT
            "GE" -> Instruction.GE
            "AND" -> Instruction.AND
            "OR" -> Instruction.OR
            "NOT" -> Instruction.NOT
            "COALESCE" -> Instruction.COALESCE
            "MAKE_OBJECT" -> Instruction.MAKE_OBJECT(s.n!!)
            "MAKE_ARRAY" -> Instruction.MAKE_ARRAY(s.n!!)
            "ACCESS_STATIC" -> Instruction.ACCESS_STATIC(ObjKey.Name(s.key!!))
            "ACCESS_DYNAMIC" -> Instruction.ACCESS_DYNAMIC
            "SET_STATIC" -> Instruction.SET_STATIC(ObjKey.Name(s.key!!))
            "SET_DYNAMIC" -> Instruction.SET_DYNAMIC
            "APPEND" -> Instruction.APPEND
            "CONCAT" -> Instruction.CONCAT
            "JUMP" -> Instruction.JUMP(s.i!!)
            "JUMP_IF_TRUE" -> Instruction.JUMP_IF_TRUE(s.i!!)
            "JUMP_IF_FALSE" -> Instruction.JUMP_IF_FALSE(s.i!!)
            "JUMP_IF_NULL" -> Instruction.JUMP_IF_NULL(s.i!!)
            "CALL" -> Instruction.CALL(s.s!!, s.n!!)
            "CALL_HOST" -> Instruction.CALL_HOST(s.i!!, s.s!!, s.n!!)
            "CALL_FN" -> Instruction.CALL_FN(s.s!!, s.n!!)
            "CALL_LAMBDA" -> Instruction.CALL_LAMBDA(s.n!!)
            "RETURN" -> Instruction.RETURN
            "RETURN_VALUE" -> Instruction.RETURN_VALUE
            "OUTPUT" -> Instruction.OUTPUT(s.n!!)
            "OUTPUT_1" -> Instruction.OUTPUT_1
            "OUTPUT_2" -> Instruction.OUTPUT_2
            "MODIFY" -> Instruction.MODIFY(s.n!!)
            "INIT_FOREACH" -> Instruction.INIT_FOREACH(s.s!!, s.i!!)
            "NEXT_FOREACH" -> Instruction.NEXT_FOREACH(s.i!!, s.n!!)
            "TRY_START" -> Instruction.TRY_START(s.i!!)
            "TRY_END" -> Instruction.TRY_END
            "CATCH" -> Instruction.CATCH(s.s!!, s.n!!)
            "ABORT" -> Instruction.ABORT
            "TRACE" -> Instruction.TRACE(s.s!!)
            "BREAKPOINT" -> Instruction.BREAKPOINT(s.s!!)
            "LINE" -> Instruction.LINE(s.i!!)
            "SUSPEND" -> Instruction.SUSPEND
            else -> throw IllegalArgumentException("Unknown op ${s.op}")
        }

        private fun serializeValue(v: Any?): SerializedValue = when (v) {
            null -> SerializedValue("null")
            is Boolean -> SerializedValue("bool", b = v)
            is String -> SerializedValue("str", s = v)
            is Int, is Long -> SerializedValue("i64", s = v.toString())
            is Double, is Float -> SerializedValue("f64", s = v.toString())
            is BLBigInt -> SerializedValue("i64", s = v.toString())
            is BLBigDec -> SerializedValue("f64", s = v.toPlainString())
            is List<*> -> SerializedValue("arr", arr = v.map { serializeValue(it) })
            is Array<*> -> SerializedValue("arr", arr = v.map { serializeValue(it) })
            is Map<*, *> -> {
                // Stringify keys for portability
                val m = LinkedHashMap<String, SerializedValue>()
                for ((k, vv) in v) m[k.toString()] = serializeValue(vv)
                SerializedValue("obj", obj = m)
            }
            else -> SerializedValue("str", s = v.toString()) // Fallback
        }

        private fun deserializeValue(v: SerializedValue): Any? = when (v.t) {
            "null" -> null
            "bool" -> v.b
            "str" -> v.s
            "i64" -> v.s!!.toLong()
            "f64" -> v.s!!.toDouble()
            "arr" -> v.arr!!.map { deserializeValue(it) }
            "obj" -> v.obj!!.mapValues { (_, vv) -> deserializeValue(vv) }
            else -> v.s
        }
    }

    // Debug/Trace helpers
    private fun emitTrace(event: String) {
        // currentTracer()?.on(VMTraceEvent.VMTrace(event))
    }

    private fun emitBreakpoint(info: String) {
        // currentTracer()?.on(VMTraceEvent.VMBreakpoint(info))
    }

    private fun emitLineNumber(lineNumber: Int) {
        // currentTracer()?.on(VMTraceEvent.VMLine(lineNumber))
    }

    private fun storeVar(name: String) {
        val value = pop()
        val old = environment[name]
        environment[name] = value
        emitVarWrite(name, old, value)
        emitPathWriteIfNeeded(activePc, name, old, value)
    }

    private fun emitEnterEventsAt(pc: Int) {
        val events = enterEvents[pc] ?: return
        val tracer = currentTracer() ?: return
        if (!tracer.opts.step) return
        for (node in events) tracer.on(TraceEvent.Enter(node))
    }

    private fun emitExitEventsAt(pc: Int) {
        val events = exitEvents[pc] ?: return
        val tracer = currentTracer() ?: return
        if (!tracer.opts.step) return
        for (node in events) tracer.on(TraceEvent.Exit(node))
    }

    private fun emitPathWriteIfNeeded(pc: Int, storeName: String, oldRoot: Any?, newRoot: Any?) {
        if (pc < 0) return
        val meta = pathWrites[pc] ?: return
        if (meta.root != storeName) return
        val tracer = currentTracer() ?: return
        val path: List<Any> = meta.displayPath?.let { ArrayList(it) } ?: resolvePath(meta, oldRoot, newRoot)
        val oldValue = if (meta.directValues) oldRoot else readAtPath(oldRoot, path)
        val newValue = if (meta.directValues) newRoot else readAtPath(newRoot, path)
        tracer.on(TraceEvent.PathWrite(meta.op.name, meta.root, path, oldValue, newValue))
    }

    private fun resolvePath(meta: PathWriteMeta, oldRoot: Any?, newRoot: Any?): List<Any> {
        if (meta.segments.isEmpty()) return emptyList()
        pathScratch.clear()
        var currentOld: Any? = oldRoot
        var currentNew: Any? = newRoot
        for (segment in meta.segments) {
            val key: Any = when (segment) {
                is PathSegmentMeta.Static -> unwrapKey(segment.key)
                is PathSegmentMeta.Dynamic -> {
                    val raw = environment[segment.tempName]
                    val container = when {
                        currentOld is Map<*, *> || currentOld is List<*> -> currentOld
                        currentNew is Map<*, *> || currentNew is List<*> -> currentNew
                        else -> null
                    }
                    when (container) {
                        is Map<*, *> -> normalizeMapKey(raw)
                        is List<*> -> normalizeListIndex(raw, container.size)
                        else -> raw ?: error("Dynamic path segment '${segment.tempName}' resolved to null")
                    }
                }
            }
            pathScratch.add(key)
            currentOld = childValue(currentOld, key)
            currentNew = childValue(currentNew, key)
        }
        val resolved = ArrayList<Any>(pathScratch)
        pathScratch.clear()
        return resolved
    }

    private fun readAtPath(root: Any?, path: List<Any>): Any? {
        if (path.isEmpty()) return root
        var current: Any? = root
        for (segment in path) {
            current = childValue(current, segment)
        }
        return current
    }

    private fun childValue(container: Any?, key: Any): Any? {
        return when (container) {
            is Map<*, *> -> container[key]
            is List<*> -> {
                val idx = when (key) {
                    is Int -> key
                    is Long -> {
                        if (key < 0L || key > Int.MAX_VALUE.toLong()) return null
                        key.toInt()
                    }
                    is BLBigInt -> {
                        if (key.signum() < 0 || key > blBigIntOfLong(Int.MAX_VALUE.toLong())) return null
                        key.toInt()
                    }
                    else -> return null
                }
                if (idx < 0 || idx >= container.size) return null
                container[idx]
            }
            else -> null
        }
    }

    private fun normalizeMapKey(value: Any?): Any {
        return when (value) {
            is String -> value
            is Int -> {
                require(value >= 0) { "Object key must be non-negative" }
                value
            }
            is Long -> {
                require(value >= 0L) { "Object key must be non-negative" }
                value
            }
            else -> if (isBigInt(value)) {
                val bi = value as BLBigInt
                require(bi.signum() >= 0) { "Object key must be non-negative" }
                bi
            } else {
                value ?: error("Object key must be string or non-negative integer")
            }
        }
    }

    private fun normalizeListIndex(value: Any?, size: Int): Int {
        return when (value) {
            is Int -> {
                require(value in 0 until size) { "Index $value out of bounds 0..${size - 1}" }
                value
            }
            is Long -> {
                require(value in 0..Int.MAX_VALUE.toLong()) { "Index $value out of bounds" }
                val idx = value.toInt()
                require(idx in 0 until size) { "Index $idx out of bounds 0..${size - 1}" }
                idx
            }
            else -> if (isBigInt(value)) {
                val bi = value as BLBigInt
                require(bi.signum() >= 0 && bi <= blBigIntOfLong(Int.MAX_VALUE.toLong())) { "Index $bi out of bounds" }
                val idx = bi.toInt()
                require(idx in 0 until size) { "Index $idx out of bounds 0..${size - 1}" }
                idx
            } else {
                error("List index must be integer")
            }
        }
    }

    private fun emitOutputEvent(obj: Map<Any, Any?>) {
        currentTracer()?.on(TraceEvent.Output(obj))
    }

    private fun emitVarRead(name: String, value: Any?) {
        currentTracer()?.let { tracer ->
            if (tracer.opts.watch.isEmpty() || name in tracer.opts.watch) {
                tracer.on(TraceEvent.Read(name, value))
            }
        }
    }

    private fun emitVarWrite(name: String, old: Any?, new: Any?) {
        currentTracer()?.let { tracer ->
            if (tracer.opts.step || name in tracer.opts.watch) {
                tracer.on(TraceEvent.Let(name, old, new))
            }
        }
    }

    private fun ensureLocals(size: Int) {
        if (locals.size >= size) return
        val grow = if (locals.size == 0) 4 else locals.size * 2
        val newSize = maxOf(4, maxOf(size, grow))
        locals = locals.copyOf(newSize)
    }
}

/**
 * Call frame for function calls
 */
private data class CallFrame(
    val returnAddress: Int,
    val environment: MutableMap<String, Any?>,
    val outerBytecode: Bytecode,
    val stackSize: Int,
    val locals: Array<Any?>,
    val traceKind: String?,
    val traceName: String?,
    val emitTraceReturn: Boolean,
)


/**
 * Exception handling frame
 */
private data class TryFrame(
    val catchAddress: Int,
    val stackSize: Int,
    val startAddress: Int,
    var attempts: Int,
)

/** Loop state for FOR EACH constructs */
private data class LoopState(
    val varName: String,
    val list: List<Any?>,
    var idx: Int,
    val hadOuter: Boolean,
    val outerValue: Any?
)

/**
 * Extended TraceEvent types for VM
 */
sealed class VMTraceEvent {
    data class VMStep(val pc: Int, val instruction: Instruction, val stackTop: Any?) : VMTraceEvent()
    data class VMTrace(val event: String) : VMTraceEvent()
    data class VMBreakpoint(val info: String) : VMTraceEvent()
    data class VMLine(val lineNumber: Int) : VMTraceEvent()
}
