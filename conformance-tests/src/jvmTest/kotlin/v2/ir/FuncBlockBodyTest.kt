package v2.ir

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.assertThrows
import v2.ExecutionEngine
import v2.testutils.EngineTest
import v2.testutils.buildRunnerFromProgram

private fun exec(src: String, engine: ExecutionEngine): (Map<String, Any?>) -> Any? =
    buildRunnerFromProgram(src, engine = engine)

class FuncBlockBodyTest {

    @EngineTest
    fun `factorial via block body`(engine: ExecutionEngine) {
        val bl = """
            SOURCE row;
            FUNC fact(n) {
                IF n == 0 THEN { RETURN 1 ; }
                RETURN n * fact(n - 1) ;
            }
            TRANSFORM T { stream } {
                OUTPUT { f : fact(row.n) }
            }
        """.trimIndent()

        assertEquals(mapOf("f" to 6), exec(bl, engine)(mapOf("n" to 3)))
    }

    @EngineTest
    fun `return optional`(engine: ExecutionEngine) {
        val bl = """
            SOURCE row;
            FUNC maybe(x) { IF x ?? false THEN { RETURN "yes" ; } }
            TRANSFORM T { stream } { OUTPUT { v : maybe(row.flag) } }
        """.trimIndent()
        assertEquals(mapOf("v" to "yes"), exec(bl, engine)(mapOf("flag" to true)))
        assertEquals(mapOf("v" to null), exec(bl, engine)(mapOf("flag" to false)))
    }

    @EngineTest
    fun `output inside func forbidden`(engine: ExecutionEngine) {
        val bad = """
            SOURCE row;
            FUNC wrong() { OUTPUT {x:1} }
            TRANSFORM T { stream } { OUTPUT { v: wrong() } }
        """.trimIndent()
        assertThrows<IllegalStateException> { exec(bad, engine)(emptyMap()) }
    }
}
