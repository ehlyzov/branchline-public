package v2.ir

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import v2.testutils.buildRunnerUnchecked

private fun buildExec(body: String): (Map<String, Any?>) -> Any? = buildRunnerUnchecked(body)

class AwaitSuspendRuntimeTest {

    @Test fun `await passes through`() {
        val exec = buildExec(
            """
            OUTPUT { id : await row["id"] }
        """
        )
        assertEquals(mapOf("id" to 42), exec(mapOf("id" to 42)))
    }

    @Test fun `suspend throws unsupported`() {
        val exec = buildExec(
            """
            OUTPUT { x : suspend row.id }
        """
        )
        assertThrows<UnsupportedOperationException> {
            exec(mapOf("id" to 1))
        }
    }
}
