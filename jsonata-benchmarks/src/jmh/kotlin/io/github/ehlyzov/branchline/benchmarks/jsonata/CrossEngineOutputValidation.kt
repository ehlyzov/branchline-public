package io.github.ehlyzov.branchline.benchmarks.jsonata

import com.fasterxml.jackson.databind.JsonNode
import java.math.BigDecimal
import java.math.BigInteger
import java.util.TreeMap
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull

internal data class OutputValidationKey(
    val engineId: String,
    val caseId: String,
)

internal data class OutputValidationDecision(
    val validationState: String,
    val comparable: Boolean,
    val phase: String,
    val reason: String,
    val notes: String = "",
) {
    val disabledReason: String?
        get() = if (comparable) null else reason.ifBlank { validationState }
}

private const val NON_COMPARABLE_NOTE: String = "excluded from throughput comparison"

internal object CrossEngineOutputValidator {
    private val engineIds: List<String> = listOf(
        ENGINE_KOTLIN,
        ENGINE_BRANCHLINE_INTERPRETER,
        ENGINE_BRANCHLINE_VM,
        ENGINE_DASHJOIN,
        ENGINE_IBM,
    )

    fun validate(
        cases: List<CrossEngineCase>,
        timeoutMs: Long?,
    ): Map<OutputValidationKey, OutputValidationDecision> {
        val decisions = LinkedHashMap<OutputValidationKey, OutputValidationDecision>()
        val timeoutRunner = if (timeoutMs == null) null else BenchmarkTimeoutRunner(timeoutMs)
        try {
            for (case in cases) {
                validateCase(case, timeoutRunner, decisions)
            }
        } finally {
            timeoutRunner?.close()
        }
        return decisions
    }

    private fun validateCase(
        case: CrossEngineCase,
        timeoutRunner: BenchmarkTimeoutRunner?,
        decisions: MutableMap<OutputValidationKey, OutputValidationDecision>,
    ) {
        val inputs = try {
            buildValidationInputs(case)
        } catch (ex: Throwable) {
            for (engineId in engineIds) {
                recordFailure(decisions, engineId, case.id, "input", ex)
            }
            return
        }

        val outputs = LinkedHashMap<String, NormalizedJsonValue>()
        for (engineId in engineIds) {
            val key = OutputValidationKey(engineId, case.id)
            val loadError = case.loadError
            if (loadError != null) {
                BenchmarkErrorReporter.recordMessage(engineId, case.id, "load-case", loadError)
                decisions[key] = nonComparableDecision("load_error", "load-case", loadError)
                continue
            }
            val expectedFailure = case.expectedFailures[engineId]
            if (expectedFailure != null) {
                val message = "Expected failure: $expectedFailure"
                BenchmarkErrorReporter.recordMessage(engineId, case.id, "expected-failure", message)
                decisions[key] = nonComparableDecision("expected_failure", "expected-failure", message)
                continue
            }
            when (val result = evaluateForValidation(case, inputs, engineId, timeoutRunner)) {
                is ValidationEvaluation.Failure -> {
                    BenchmarkErrorReporter.recordMessage(engineId, case.id, result.phase, result.message)
                    decisions[key] = nonComparableDecision(result.validationState, result.phase, result.message)
                }

                is ValidationEvaluation.Success -> outputs[engineId] = result.value
            }
        }

        if (outputs.isEmpty()) return
        val referenceEntry = outputs.entries.firstOrNull { it.key == ENGINE_KOTLIN } ?: outputs.entries.first()
        if (outputs.size < 2) {
            val message = "Fewer than two valid engine outputs are available for comparison."
            for (engineId in outputs.keys) {
                decisions[OutputValidationKey(engineId, case.id)] = nonComparableDecision(
                    "not_comparable",
                    "validate",
                    message,
                )
            }
            return
        }
        val referenceMatchCount = outputs.values.count { it == referenceEntry.value }
        for ((engineId, actual) in outputs) {
            val key = OutputValidationKey(engineId, case.id)
            if (actual != referenceEntry.value) {
                val message = buildMismatchMessage(referenceEntry.key, referenceEntry.value, actual)
                BenchmarkErrorReporter.recordMessage(engineId, case.id, "validate", message)
                decisions[key] = nonComparableDecision("semantic_mismatch", "validate", message)
            } else if (referenceMatchCount < 2) {
                decisions[key] = nonComparableDecision(
                    "not_comparable",
                    "validate",
                    "No second engine output matched the validation reference.",
                )
            } else {
                decisions.putIfAbsent(key, validDecision())
            }
        }
    }

    private fun evaluateForValidation(
        case: CrossEngineCase,
        inputs: CrossEngineInput,
        engineId: String,
        timeoutRunner: BenchmarkTimeoutRunner?,
    ): ValidationEvaluation {
        val runner = when (engineId) {
            ENGINE_KOTLIN -> compileKotlin(case)
            ENGINE_BRANCHLINE_INTERPRETER, ENGINE_BRANCHLINE_VM -> compileBranchline(case, engineId)
            ENGINE_DASHJOIN, ENGINE_IBM -> compileJsonata(case, engineId)
            else -> error("Unknown engine: $engineId")
        }
        if (runner is ValidationRunner.Failure) {
            return ValidationEvaluation.Failure(runner.validationState, runner.phase, runner.message)
        }
        val compiled = runner as ValidationRunner.Success
        val raw = try {
            val block = {
                compiled.execute(validationInput(inputs, engineId))
            }
            if (timeoutRunner == null) block() else timeoutRunner.run(block)
        } catch (ex: Throwable) {
            return ValidationEvaluation.Failure(
                "evaluation_error",
                "evaluate",
                ex.message ?: ex::class.simpleName ?: "validation failed",
            )
        }
        return when (val normalized = NormalizedJsonValue.from(raw)) {
            is NormalizedJsonResult.Failure -> ValidationEvaluation.Failure(
                "evaluation_error",
                "normalize",
                normalized.message,
            )

            is NormalizedJsonResult.Success -> ValidationEvaluation.Success(normalized.value)
        }
    }

    private fun compileKotlin(case: CrossEngineCase): ValidationRunner {
        val evalId = case.kotlinEvalId
            ?: return ValidationRunner.Failure("compile_error", "compile", "Missing kotlin eval for ${case.id}.")
        val evaluator = try {
            KotlinEvaluators.resolve(evalId)
        } catch (ex: Throwable) {
            return ValidationRunner.Failure("compile_error", "compile", ex.message ?: ex::class.simpleName ?: "compile failed")
        }
        return ValidationRunner.Success { input -> evaluator(input) }
    }

    private fun compileBranchline(case: CrossEngineCase, engineId: String): ValidationRunner {
        val program = case.branchlineProgram
            ?: return ValidationRunner.Failure("compile_error", "compile", "Missing Branchline analog for ${case.id}.")
        val runner = try {
            if (engineId == ENGINE_BRANCHLINE_INTERPRETER) {
                BranchlineCompiler.compileInterpreter(program)
            } else {
                BranchlineCompiler.compileVm(program)
            }
        } catch (ex: Throwable) {
            return ValidationRunner.Failure("compile_error", "compile", ex.message ?: ex::class.simpleName ?: "compile failed")
        }
        return ValidationRunner.Success(runner)
    }

    private fun compileJsonata(case: CrossEngineCase, engineId: String): ValidationRunner {
        val engine = try {
            JsonataEngines.require(engineId)
        } catch (ex: Throwable) {
            return ValidationRunner.Failure("engine_error", "engine", ex.message ?: ex::class.simpleName ?: "engine unavailable")
        }
        val compiled = try {
            engine.compile(case.jsonataExpression)
        } catch (ex: Throwable) {
            val cause = unwrapInvocationTargetForValidation(ex)
            return ValidationRunner.Failure("compile_error", "compile", cause.message ?: cause::class.simpleName ?: "compile failed")
        }
        return ValidationRunner.Success { input -> engine.evaluate(compiled, input) }
    }

    private fun validationInput(inputs: CrossEngineInput, engineId: String): Any? {
        return when (engineId) {
            ENGINE_KOTLIN -> inputs.kotlinInput
            ENGINE_BRANCHLINE_INTERPRETER, ENGINE_BRANCHLINE_VM -> inputs.branchlineInput
            ENGINE_DASHJOIN -> inputs.dashjoinInput
            ENGINE_IBM -> inputs.ibmInput
            else -> error("Unknown engine: $engineId")
        }
    }

    private fun buildMismatchMessage(
        referenceEngineId: String,
        reference: NormalizedJsonValue,
        actual: NormalizedJsonValue,
    ): String {
        return "Semantic output validation failed; reference=$referenceEngineId expected=${reference.preview()} actual=${actual.preview()}"
    }

    private fun recordFailure(
        decisions: MutableMap<OutputValidationKey, OutputValidationDecision>,
        engineId: String,
        caseId: String,
        phase: String,
        ex: Throwable,
    ) {
        BenchmarkErrorReporter.record(engineId, caseId, phase, ex)
        decisions[OutputValidationKey(engineId, caseId)] = OutputValidationDecision(
            validationState = "input_error",
            comparable = false,
            phase = phase,
            reason = ex.message ?: ex::class.simpleName ?: "validation failed",
            notes = NON_COMPARABLE_NOTE,
        )
    }

    private fun validDecision(): OutputValidationDecision {
        return OutputValidationDecision(
            validationState = "valid",
            comparable = true,
            phase = "validate",
            reason = "",
            notes = "",
        )
    }

    private fun nonComparableDecision(
        validationState: String,
        phase: String,
        reason: String,
        notes: String = NON_COMPARABLE_NOTE,
    ): OutputValidationDecision {
        return OutputValidationDecision(
            validationState = validationState,
            comparable = false,
            phase = phase,
            reason = reason,
            notes = notes,
        )
    }
}

private fun buildValidationInputs(case: CrossEngineCase): CrossEngineInput {
    val kotlinInput = JsonataInputs.parseKotlinValue(case.inputJson)
    return CrossEngineInput(
        kotlinInput = kotlinInput,
        branchlineInput = kotlinInput,
        dashjoinInput = kotlinInput,
        ibmInput = JsonataInputs.parseJsonNode(case.inputJson),
    )
}

private sealed interface ValidationRunner {
    data class Success(val execute: (Any?) -> Any?) : ValidationRunner
    data class Failure(val validationState: String, val phase: String, val message: String) : ValidationRunner
}

private sealed interface ValidationEvaluation {
    data class Success(val value: NormalizedJsonValue) : ValidationEvaluation
    data class Failure(val validationState: String, val phase: String, val message: String) : ValidationEvaluation
}

private sealed interface NormalizedJsonResult {
    data class Success(val value: NormalizedJsonValue) : NormalizedJsonResult
    data class Failure(val message: String) : NormalizedJsonResult
}

private sealed class NormalizedJsonValue {
    object NullValue : NormalizedJsonValue()
    data class BooleanValue(val value: Boolean) : NormalizedJsonValue()
    data class NumberValue(val value: BigDecimal) : NormalizedJsonValue()
    data class StringValue(val value: String) : NormalizedJsonValue()
    data class ArrayValue(val values: List<NormalizedJsonValue>) : NormalizedJsonValue()
    data class ObjectValue(val fields: Map<String, NormalizedJsonValue>) : NormalizedJsonValue()

    fun preview(): String {
        val rendered = render()
        return if (rendered.length <= 240) rendered else rendered.take(237) + "..."
    }

    private fun render(): String = when (this) {
        NullValue -> "null"
        is BooleanValue -> value.toString()
        is NumberValue -> value.toPlainString()
        is StringValue -> "\"" + value.replace("\\", "\\\\").replace("\"", "\\\"") + "\""
        is ArrayValue -> values.joinToString(prefix = "[", postfix = "]") { it.render() }
        is ObjectValue -> fields.entries.joinToString(prefix = "{", postfix = "}") { (key, value) ->
            "\"" + key.replace("\\", "\\\\").replace("\"", "\\\"") + "\":" + value.render()
        }
    }

    companion object {
        fun from(value: Any?): NormalizedJsonResult {
            return try {
                NormalizedJsonResult.Success(fromAny(value))
            } catch (ex: IllegalArgumentException) {
                NormalizedJsonResult.Failure(ex.message ?: "value is not JSON-comparable")
            }
        }

        private fun fromAny(value: Any?): NormalizedJsonValue = when (value) {
            null -> NullValue
            is JsonElement -> fromJsonElement(value)
            is JsonNode -> fromJsonNode(value)
            is Map<*, *> -> ObjectValue(
                value.entries.associateTo(TreeMap()) { (key, entryValue) ->
                    (key as? String ?: key.toString()) to fromAny(entryValue)
                },
            )

            is Iterable<*> -> ArrayValue(value.map { fromAny(it) })
            is Array<*> -> ArrayValue(value.map { fromAny(it) })
            is Boolean -> BooleanValue(value)
            is Number -> NumberValue(normalizeNumber(value))
            is String -> StringValue(value)
            else -> StringValue(value.toString())
        }

        private fun fromJsonElement(element: JsonElement): NormalizedJsonValue = when (element) {
            is JsonNull -> NullValue
            is JsonObject -> ObjectValue(
                element.entries.associateTo(TreeMap()) { (key, entryValue) ->
                    key to fromJsonElement(entryValue)
                },
            )

            is JsonArray -> ArrayValue(element.map { fromJsonElement(it) })
            is JsonPrimitive -> fromJsonPrimitive(element)
        }

        private fun fromJsonPrimitive(primitive: JsonPrimitive): NormalizedJsonValue {
            if (primitive.toString().startsWith("\"")) return StringValue(primitive.content)
            primitive.booleanOrNull?.let { return BooleanValue(it) }
            return NumberValue(parseFiniteDecimal(primitive.content))
        }

        private fun fromJsonNode(node: JsonNode): NormalizedJsonValue {
            if (node.isMissingNode) {
                throw IllegalArgumentException("JSONata produced an undefined/missing JSON node.")
            }
            if (node.isNull) return NullValue
            if (node.isBoolean) return BooleanValue(node.booleanValue())
            if (node.isNumber) return NumberValue(parseFiniteDecimal(node.decimalValue().toPlainString()))
            if (node.isTextual) return StringValue(node.textValue())
            if (node.isArray) {
                val values = ArrayList<NormalizedJsonValue>(node.size())
                val elements = node.elements()
                while (elements.hasNext()) {
                    values.add(fromJsonNode(elements.next()))
                }
                return ArrayValue(values)
            }
            if (node.isObject) {
                val fields = TreeMap<String, NormalizedJsonValue>()
                val iterator = node.fields()
                while (iterator.hasNext()) {
                    val entry = iterator.next()
                    fields[entry.key] = fromJsonNode(entry.value)
                }
                return ObjectValue(fields)
            }
            throw IllegalArgumentException("Unsupported JSON node type: ${node.nodeType}.")
        }

        private fun normalizeNumber(value: Number): BigDecimal = when (value) {
            is BigDecimal -> normalizeDecimal(value)
            is BigInteger -> normalizeDecimal(value.toBigDecimal())
            is Byte, is Short, is Int, is Long -> normalizeDecimal(BigDecimal.valueOf(value.toLong()))
            is Float -> normalizeFloating(value.toDouble())
            is Double -> normalizeFloating(value)
            else -> parseFiniteDecimal(value.toString())
        }

        private fun normalizeFloating(value: Double): BigDecimal {
            require(value.isFinite()) { "JSON number must be finite." }
            return normalizeDecimal(BigDecimal.valueOf(value))
        }

        private fun parseFiniteDecimal(value: String): BigDecimal {
            val parsed = value.toBigDecimalOrNull()
                ?: throw IllegalArgumentException("Invalid JSON number: $value.")
            return normalizeDecimal(parsed)
        }

        private fun normalizeDecimal(value: BigDecimal): BigDecimal {
            val normalized = value.stripTrailingZeros()
            return if (normalized.signum() == 0) BigDecimal.ZERO else normalized
        }
    }
}

private fun unwrapInvocationTargetForValidation(ex: Throwable): Throwable {
    return if (ex is java.lang.reflect.InvocationTargetException && ex.targetException != null) {
        ex.targetException
    } else {
        ex
    }
}
