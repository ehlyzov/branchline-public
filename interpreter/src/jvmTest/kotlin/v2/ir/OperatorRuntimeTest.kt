package v2.ir

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import v2.testutils.buildRunner

private fun execBody(body: String) = buildRunner(body)

class OperatorRuntimeTest {

    @Test fun `equality numbers`() {
        val e = execBody("OUTPUT { ok : row.x == row.y }")
        assertEquals(mapOf("ok" to true), e(mapOf("x" to 5, "y" to 5)))
        assertEquals(mapOf("ok" to false), e(mapOf("x" to 5, "y" to 6)))
    }

    @Test fun `less greater`() {
        val e = execBody("OUTPUT { lt : row.a < 10 , ge : row.a >= 10 }")
        assertEquals(mapOf("lt" to true, "ge" to false), e(mapOf("a" to 3)))
    }

    @Test fun `logical and or`() {
        val e = execBody("OUTPUT { ok : row.a > 0 && row.b < 10 || false }")
        assertEquals(
            mapOf("ok" to true),
            e(mapOf("a" to 1, "b" to 5))
        )
    }

    @Test fun `coalesce operator`() {
        val e = execBody("OUTPUT { v : row.opt ?? 42 }")
        assertEquals(mapOf("v" to 42), e(emptyMap()))
        assertEquals(mapOf("v" to 99), e(mapOf("opt" to 99)))
    }

    @Test fun `unary not`() {
        val e = execBody("OUTPUT { flag : !row.on }")
        assertEquals(mapOf("flag" to true), e(mapOf("on" to false)))
        assertEquals(mapOf("flag" to false), e(mapOf("on" to true)))
    }
}
