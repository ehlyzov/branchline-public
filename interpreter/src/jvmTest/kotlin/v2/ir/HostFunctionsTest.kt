package v2

import v2.testutils.compileProgramAndRun
import java.security.MessageDigest
import java.util.UUID
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals
import kotlin.time.Clock
import kotlin.time.ExperimentalTime

/**
 * Unit tests that exercise invocation of *host functions* from Branchline DSL scripts.
 *
 * Host functions are ordinary Kotlin lambdas registered in the [hostFns] map and supplied to
 * [compileStream]. They allow DSL code to call platform helpers such as `uuid()` or `md5()`
 * without re‑implementing them in the DSL itself.
 */
class HostFunctionsTest {

    @OptIn(ExperimentalTime::class)
    private val hostFns: Map<String, (List<Any?>) -> Any?> = mapOf(
        "uuid" to { args ->
            require(args.isEmpty())
            UUID.randomUUID().toString()
        },

        "now" to { args ->
            require(args.isEmpty())
            Clock.System.now().toString()
        },

        "md5" to { args ->
            val bytes = args.single().toString().toByteArray()
            MessageDigest.getInstance("MD5")
                .digest(bytes)
                .joinToString("") { "%02x".format(it) }
        },

        "concat" to { args ->
            args.joinToString(separator = "") { it.toString() }
        }
    )

    /** Compiles the single TRANSFORM declared in [code] and runs it on one input [row]. */
    private fun exec(code: String, row: Map<String, Any?> = emptyMap()): Any? =
        compileProgramAndRun(code.trimIndent(), row, extraFns = hostFns)

    @Test
    fun uuid_is_unique_per_call() {
        val src = """
            TRANSFORM { stream } {
                LET id = uuid();
                OUTPUT { id:id };
            }
        """.trimIndent()

        val out1 = exec(src) as Map<*, *>
        val out2 = exec(src) as Map<*, *>
        assertNotEquals(out1["id"], out2["id"], "uuid() should yield different strings")
    }

    @Test
    fun concat_joins_all_arguments() {
        val src = """
            TRANSFORM { stream } {
                OUTPUT { v: concat("a", "b", "c") };
            }
        """.trimIndent()

        val out = exec(src) as Map<*, *>
        assertEquals("abc", out["v"])
    }

    @Test
    fun md5_returns_expected_hash() {
        val src = """
            TRANSFORM { stream } {
                OUTPUT { h: md5("hello") };
            }
        """.trimIndent()

        val out = exec(src) as Map<*, *>
        assertEquals("5d41402abc4b2a76b9719d911017c592", out["h"])
    }

    @Test
    fun host_func_can_use_input_row_values() {
        val src = """
            TRANSFORM { stream } {
                OUTPUT { v: concat(row.a, "-", row.b) };
            }
        """.trimIndent()

        val out = exec(src, mapOf("a" to "X", "b" to "Y")) as Map<*, *>
        assertEquals("X-Y", out["v"])
    }
}
