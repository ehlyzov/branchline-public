// src/test/kotlin/v2/ir/DotBracketNumericKeyTest.kt
package v2.ir

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import v2.testutils.compileAndRun

private fun run(body: String, row: Map<String, Any?> = emptyMap()): Any? =
    compileAndRun(body, row)

class DotBracketNumericKeyTest {

    @Test fun `dot bracket with explicit path inside - numeric key in object literal`() {
        val out = run(
            """
            LET template = { value : 10 };
            LET count = { 10 : "test" };
            OUTPUT { res : count.[template.value] }
            """.trimIndent()
        )
        assertEquals(mapOf("res" to "test"), out)
    }

    @Test fun `numeric key must be non-negative integer - reject decimal`() {
        val ex = assertThrows<RuntimeException> {
            run("""LET bad = { 3.14 : 1 }; OUTPUT bad""")
        }
        assertTrue(ex.message!!.contains("Numeric field key"))
    }

    @Test fun `numeric key must be non-negative integer - reject negative`() {
        val ex = assertThrows<RuntimeException> {
            run("""LET bad = { -1 : 1 }; OUTPUT bad""")
        }
        assertTrue(ex.message!!.contains("Numeric field key"))
        assertTrue(ex.message!!.contains("non-negative"))
    }
}
