package v2.ir

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import v2.testutils.buildRunnerUnchecked

private fun execBody(body: String) = buildRunnerUnchecked(body)

class AbortRuntimeTest {

    @Test fun `abort with object returns it`() {
        val f = execBody(
            """
            TRY fail
            CATCH(e) RETRY 1 TIMES -> ABORT {err:"failed"} ;
            OUTPUT { res:"ok" }             // не выполнится
        """
        )
        assertEquals(mapOf("err" to "failed"), f(emptyMap()))
    }

    @Test fun `plain abort throws`() {
        val f = execBody(
            """
            ABORT ;
            OUTPUT { res:"never" }
        """
        )
        assertThrows<IllegalStateException> { f(emptyMap()) }
    }
}
