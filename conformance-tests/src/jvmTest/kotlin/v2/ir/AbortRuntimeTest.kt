package v2.ir

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.assertThrows
import v2.ExecutionEngine
import v2.testutils.EngineTest
import v2.testutils.buildRunnerUnchecked

private fun execBody(body: String, engine: ExecutionEngine) = buildRunnerUnchecked(body, engine = engine)

class AbortRuntimeTest {

    @EngineTest
    fun `abort with object returns it`(engine: ExecutionEngine) {
        val f = execBody(
            """
            TRY fail
            CATCH(e) RETRY 1 TIMES -> ABORT {err:"failed"} ;
            OUTPUT { res:"ok" }
            """.trimIndent(),
            engine,
        )
        assertEquals(mapOf("err" to "failed"), f(emptyMap()))
    }

    @EngineTest
    fun `plain abort throws`(engine: ExecutionEngine) {
        val f = execBody(
            """
            ABORT ;
            OUTPUT { res:"never" }
            """.trimIndent(),
            engine,
        )
        assertThrows<IllegalStateException> { f(emptyMap()) }
    }
}
