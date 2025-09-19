package v2.ir

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import v2.testutils.buildRunnerFromProgram

private fun buildExec(src: String): (Map<String, Any?>) -> Any? = buildRunnerFromProgram(src)

class StreamCompilerTest {

    @Test fun `row passes through let output`() {
        val bl = """
            SOURCE row;
            TRANSFORM Sum { stream } {
                LET total = row.a + row.b ;
                OUTPUT { total : total }
            }
        """.trimIndent()

        val exec = buildExec(bl)
        val out = exec(mapOf("a" to 2, "b" to 3))
        assertEquals(mapOf("total" to 5), out)
    }
}
