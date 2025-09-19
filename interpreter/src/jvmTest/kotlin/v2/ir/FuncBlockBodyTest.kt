// src/test/kotlin/v3/ir/FuncBlockBodyTest.kt
package v2.ir

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import v2.testutils.buildRunnerFromProgram

private fun exec(src: String): (Map<String, Any?>) -> Any? = buildRunnerFromProgram(src)

class FuncBlockBodyTest {

    @Test fun `factorial via block body`() {
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

        assertEquals(mapOf("f" to 6), exec(bl)(mapOf("n" to 3)))
    }

    @Test fun `return optional`() {
        val bl = """
            SOURCE row;
            FUNC maybe(x) { IF x ?? false THEN { RETURN "yes" ; } }
            TRANSFORM T { stream } { OUTPUT { v : maybe(row.flag) } }
        """
        assertEquals(mapOf("v" to "yes"), exec(bl)(mapOf("flag" to true)))
        assertEquals(mapOf("v" to null), exec(bl)(mapOf("flag" to false)))
    }

    @Test fun `output inside func forbidden`() {
        val bad = """
            SOURCE row;
            FUNC wrong() { OUTPUT {x:1} }          // не допускаем
            TRANSFORM T { stream } { OUTPUT { v: wrong() } }
        """
        assertThrows<IllegalStateException> { exec(bad)(emptyMap()) }
    }
}
