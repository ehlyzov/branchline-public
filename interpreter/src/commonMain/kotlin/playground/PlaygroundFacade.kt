package playground

import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.longOrNull
import v2.Dec
import v2.FuncDecl
import v2.IBig
import v2.I32
import v2.I64
import v2.Lexer
import v2.ParseException
import v2.Parser
import v2.TransformDecl
import v2.ir.Exec
import v2.ir.ToIR
import v2.ir.TransformRegistry
import v2.ir.makeEval
import v2.runtime.bignum.BLBigDec
import v2.runtime.bignum.BLBigInt
import v2.sema.SemanticAnalyzer
import kotlin.collections.buildMap
import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

@OptIn(ExperimentalJsExport::class)
@JsExport
object PlaygroundFacade {
    private val prettyJson = Json { prettyPrint = true }
    private val compactJson = Json {}

    fun run(program: String, inputJson: String): PlaygroundResult {
        return try {
            val tokens = Lexer(program).lex()
            val parsed = Parser(tokens, program).parse()

            val transforms = parsed.decls.filterIsInstance<TransformDecl>()
            val transform = transforms.find { it.name.equals("PLAYGROUND", ignoreCase = true) }
                ?: transforms.firstOrNull()
                ?: return PlaygroundResult(
                    success = false,
                    outputJson = null,
                    errorMessage = "Program must declare at least one TRANSFORM block.",
                    line = null,
                    column = null
                )

            val hostFns = emptyMap<String, (List<Any?>) -> Any?>()
            val funcs: Map<String, FuncDecl> = parsed.decls
                .filterIsInstance<FuncDecl>()
                .associateBy { it.name }

            SemanticAnalyzer(hostFns.keys).analyze(parsed)

            val ir = ToIR(funcs, hostFns).compile(transform.body.statements)
            val registry = TransformRegistry(
                funcs,
                hostFns,
                transforms.mapNotNull { decl -> decl.name?.let { it to decl } }.toMap()
            )
            val eval = makeEval(hostFns, funcs, registry)
            val exec = Exec(ir, eval)

            val row = parseInput(inputJson)
            val env = HashMap<String, Any?>().apply {
                this["row"] = row
                putAll(row)
            }
            val result = exec.run(env, stringifyKeys = true)
            val jsonElement = toJsonElement(result)
            val output = prettyJson.encodeToString(jsonElement)

            PlaygroundResult(
                success = true,
                outputJson = output,
                errorMessage = null,
                line = null,
                column = null
            )
        } catch (ex: ParseException) {
            PlaygroundResult(
                success = false,
                outputJson = null,
                errorMessage = ex.message ?: "Parser error",
                line = ex.token.line,
                column = ex.token.column
            )
        } catch (ex: v2.sema.SemanticException) {
            PlaygroundResult(
                success = false,
                outputJson = null,
                errorMessage = ex.message ?: "Semantic error",
                line = ex.token.line,
                column = ex.token.column
            )
        } catch (ex: Throwable) {
            PlaygroundResult(
                success = false,
                outputJson = null,
                errorMessage = ex.message ?: ex.toString(),
                line = null,
                column = null
            )
        }
    }

    private fun parseInput(inputJson: String): Map<String, Any?> {
        if (inputJson.isBlank()) return emptyMap()
        val element = compactJson.parseToJsonElement(inputJson)
        val parsed = fromJsonElement(element)
        return (parsed as? Map<String, Any?>)
            ?: error("Input JSON must be an object at the top level.")
    }

    private fun fromJsonElement(element: JsonElement): Any? = when (element) {
        is JsonNull -> null
        is JsonPrimitive -> fromPrimitive(element)
        is JsonObject -> LinkedHashMap<String, Any?>().apply {
            for ((k, v) in element) {
                this[k] = fromJsonElement(v)
            }
        }
        is JsonArray -> ArrayList<Any?>(element.size).apply {
            element.forEach { add(fromJsonElement(it)) }
        }
    }

    private fun fromPrimitive(primitive: JsonPrimitive): Any? {
        primitive.booleanOrNull?.let { return it }
        primitive.longOrNull?.let { return it }
        primitive.doubleOrNull?.let { return it }
        return primitive.content
    }

    private fun toJsonElement(value: Any?): JsonElement = when (value) {
        null -> JsonNull
        is JsonElement -> value
        is String -> JsonPrimitive(value)
        is Boolean -> JsonPrimitive(value)
        is Byte -> JsonPrimitive(value)
        is Short -> JsonPrimitive(value)
        is Int -> JsonPrimitive(value)
        is Long -> JsonPrimitive(value)
        is Float -> JsonPrimitive(value)
        is Double -> JsonPrimitive(value)
        is BLBigInt -> JsonPrimitive(value.toString())
        is BLBigDec -> JsonPrimitive(value.toString())
        is I32 -> JsonPrimitive(value.v)
        is I64 -> JsonPrimitive(value.v)
        is IBig -> JsonPrimitive(value.v.toString())
        is Dec -> JsonPrimitive(value.v.toString())
        is Map<*, *> -> JsonObject(buildMap {
            value.entries.forEach { (k, v) ->
                val key = k?.toString() ?: "null"
                put(key, toJsonElement(v))
            }
        })
        is Iterable<*> -> JsonArray(value.map { toJsonElement(it) })
        is Array<*> -> JsonArray(value.map { toJsonElement(it) })
        is Sequence<*> -> JsonArray(value.map { toJsonElement(it) }.toList())
        else -> JsonPrimitive(value.toString())
    }
}

@OptIn(ExperimentalJsExport::class)
@JsExport
data class PlaygroundResult(
    val success: Boolean,
    val outputJson: String?,
    val errorMessage: String?,
    val line: Int?,
    val column: Int?
)
