package com.example.ktorservice.runtime

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import io.github.ehlyzov.branchline.COMPAT_INPUT_ALIASES
import io.github.ehlyzov.branchline.DEFAULT_INPUT_ALIAS
import io.github.ehlyzov.branchline.FuncDecl
import io.github.ehlyzov.branchline.Lexer
import io.github.ehlyzov.branchline.ParseException
import io.github.ehlyzov.branchline.Parser
import io.github.ehlyzov.branchline.TransformDecl
import io.github.ehlyzov.branchline.contract.ContractCoercion
import io.github.ehlyzov.branchline.contract.ContractEnforcer
import io.github.ehlyzov.branchline.contract.ContractValidationMode
import io.github.ehlyzov.branchline.contract.TransformContract
import io.github.ehlyzov.branchline.contract.ContractViolationException as BranchlineContractViolationException
import io.github.ehlyzov.branchline.ir.Exec
import io.github.ehlyzov.branchline.ir.IRNode
import io.github.ehlyzov.branchline.ir.ToIR
import io.github.ehlyzov.branchline.sema.SemanticAnalyzer
import io.github.ehlyzov.branchline.std.StdLib
import java.util.Locale

class BranchlineRuntimeFacade private constructor(
    private val transforms: Map<String, CompiledTransform>,
    private val contracts: Map<String, TransformContract>,
    private val hostFns: Map<String, (List<Any?>) -> Any?>,
) {
    private val hostFnMeta = StdLib.meta
    private val objectMapper: ObjectMapper = jacksonObjectMapper()
        .registerKotlinModule()
        .registerModule(JavaTimeModule())
        .setSerializationInclusion(JsonInclude.Include.NON_NULL)

    fun run(transformName: String, payload: Any): Map<String, Any?> {
        val compiled = transforms[transformName]
            ?: throw TransformExecutionException("Transform '$transformName' is not compiled")
        val contract = contracts[transformName]
            ?: throw TransformExecutionException("Contract for transform '$transformName' was not found")

        val inputMap = toMap(payload)
        val coercedInput = ContractCoercion.coerceInputBytes(contract.input, inputMap)

        enforceInputStrict(transformName, contract, coercedInput)

        val env = HashMap<String, Any?>(coercedInput.size + COMPAT_INPUT_ALIASES.size + 1).apply {
            this[DEFAULT_INPUT_ALIAS] = coercedInput
            putAll(coercedInput)
            for (alias in COMPAT_INPUT_ALIASES) {
                this[alias] = coercedInput
            }
        }

        val output = try {
            Exec(
                ir = compiled.ir,
                hostFns = hostFns,
                hostFnMeta = hostFnMeta,
                funcs = compiled.funcs,
                source = compiled.source,
                runtimeContextEnabled = true,
            ).run(env, stringifyKeys = true)
        } catch (ex: Exception) {
            throw TransformExecutionException("Transform '$transformName' failed: ${ex.message}")
        }

        enforceOutputStrict(transformName, contract, output)

        return toStringKeyMap(output)
            ?: throw TransformExecutionException("Transform '$transformName' must return object")
    }

    private fun enforceInputStrict(
        transformName: String,
        contract: TransformContract,
        payload: Map<String, Any?>,
    ) {
        try {
            ContractEnforcer.enforceInput(
                mode = ContractValidationMode.STRICT,
                requirement = contract.input,
                value = payload,
            )
        } catch (ex: BranchlineContractViolationException) {
            throw ContractViolationException(
                message = "Input contract violation for '$transformName': ${ex.message}",
                cause = ex,
            )
        }
    }

    private fun enforceOutputStrict(
        transformName: String,
        contract: TransformContract,
        output: Any?,
    ) {
        try {
            ContractEnforcer.enforceOutput(
                mode = ContractValidationMode.STRICT,
                guarantee = contract.output,
                value = output,
            )
        } catch (ex: BranchlineContractViolationException) {
            throw ContractViolationException(
                message = "Output contract violation for '$transformName': ${ex.message}",
                cause = ex,
            )
        }
    }

    private fun toMap(value: Any): Map<String, Any?> {
        val mapValue = when (value) {
            is Map<*, *> -> value
            else -> objectMapper.convertValue(value, mapTypeRef)
        }
        return mapValue.entries.associate { (key, mapValueItem) -> key.toString() to mapValueItem }
    }

    private fun toStringKeyMap(value: Any?): Map<String, Any?>? {
        val map = value as? Map<*, *> ?: return null
        return map.entries.associate { (key, mapValue) -> key.toString() to mapValue }
    }

    companion object {
        private val resources = mapOf(
            "ValidateAndPlan" to "branchline/validate_and_plan.bl",
            "ComposeOutbound" to "branchline/compose_outbound.bl",
            "DetectBatchMode" to "branchline/batch_mode.bl",
        )

        private val mapTypeRef = object : TypeReference<Map<String, Any?>>() {}

        fun fromResources(): BranchlineRuntimeFacade {
            val customHostFns = mapOf(
                "DISTINCT_BY" to ::distinctBy,
                "SORT_BY" to ::sortBy,
            )
            val hostFns = StdLib.fns + customHostFns
            val compiled = resources.mapValues { (transformName, resourcePath) ->
                compileTransform(
                    transformName = transformName,
                    source = loadResource(resourcePath),
                    hostFns = hostFns,
                )
            }
            val contracts = GeneratedContractsRegistry.loadFromResources()
            return BranchlineRuntimeFacade(
                transforms = compiled,
                contracts = contracts,
                hostFns = hostFns,
            )
        }

        private fun compileTransform(
            transformName: String,
            source: String,
            hostFns: Map<String, (List<Any?>) -> Any?>,
        ): CompiledTransform {
            val tokens = Lexer(source).lex()
            val program = try {
                Parser(tokens, source).parse()
            } catch (ex: ParseException) {
                throw TransformExecutionException("Transform '$transformName' parse error: ${ex.message}")
            }

            SemanticAnalyzer(hostFns.keys).analyze(program)
            val funcs = program.decls.filterIsInstance<FuncDecl>().associateBy { it.name }
            val transform = program.decls
                .filterIsInstance<TransformDecl>()
                .firstOrNull { it.name == transformName }
                ?: throw TransformExecutionException("Transform '$transformName' was not found in script")
            val ir = ToIR(funcs, hostFns).compile(transform.body.statements)
            return CompiledTransform(
                name = transformName,
                source = source,
                funcs = funcs,
                ir = ir,
            )
        }

        private fun loadResource(path: String): String {
            val stream = Thread.currentThread().contextClassLoader.getResourceAsStream(path)
                ?: throw TransformExecutionException("Resource '$path' is missing")
            return stream.bufferedReader().use { it.readText() }
        }

        private fun distinctBy(args: List<Any?>): Any? {
            require(args.size == 2) { "DISTINCT_BY(list, key)" }
            val items = args[0] as? List<*> ?: error("DISTINCT_BY: first arg must be list")
            val key = args[1] as? String ?: error("DISTINCT_BY: second arg must be string")
            val seen = LinkedHashSet<Any?>()
            val out = ArrayList<Any?>(items.size)
            for (item in items) {
                val map = item as? Map<*, *> ?: continue
                val fieldValue = map[key]
                if (seen.add(fieldValue)) {
                    out += map
                }
            }
            return out
        }

        private fun sortBy(args: List<Any?>): Any? {
            require(args.size == 2) { "SORT_BY(list, key)" }
            val items = args[0] as? List<*> ?: error("SORT_BY: first arg must be list")
            val key = args[1] as? String ?: error("SORT_BY: second arg must be string")
            return items.sortedWith { left, right ->
                val leftMap = left as? Map<*, *>
                val rightMap = right as? Map<*, *>
                val a = leftMap?.get(key)?.toString()?.lowercase(Locale.US) ?: ""
                val b = rightMap?.get(key)?.toString()?.lowercase(Locale.US) ?: ""
                a.compareTo(b)
            }
        }
    }

    private data class CompiledTransform(
        val name: String,
        val source: String,
        val funcs: Map<String, FuncDecl>,
        val ir: List<IRNode>,
    )
}
