package v2.ir

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import v2.testutils.buildRunnerUnchecked

private fun execBody(body: String) = buildRunnerUnchecked(body)

class TryCatchRuntimeTest {

    @Test fun `try succeeds no fallback`() {
        val f =
            execBody(
                """
            TRY row.ok
            CATCH(e) RETRY 2 TIMES -> {err:"failed"}
            OUTPUT { res : "done" }
        """
            )
        assertEquals(mapOf("res" to "done"), f(mapOf("ok" to 1)))
    }

    @Test fun `try fails then fallback object`() {
        val f = execBody(
            """
            TRY fail
            CATCH(e) RETRY 2 TIMES -> {err:"failed"}
        """
        )
        assertEquals(mapOf("err" to "failed"), f(emptyMap()))
    }

    @Test fun `retry counter works`() {
        val f = execBody(
            """
            TRY fail
            CATCH(e) RETRY 0 TIMES -> {err:"no retry"}
        """
        )
        assertEquals(mapOf("err" to "no retry"), f(emptyMap()))
    }
}
