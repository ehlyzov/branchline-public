package v2.ir

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.assertThrows
import v2.ExecutionEngine
import v2.testutils.EngineTest
import v2.testutils.buildRunnerFromProgram

private fun execOf(src: String, engine: ExecutionEngine): (Map<String, Any?>) -> Any? =
    buildRunnerFromProgram(src, engine = engine)

class FuncRuntimeTest {

    @EngineTest
    fun `simple add`(engine: ExecutionEngine) {
        val exec = execOf(
            """
            SOURCE row;
            FUNC add(a,b) = a + b ;
            TRANSFORM T { stream } {
                LET s = add(row.x , row.y);
                OUTPUT { sum : s }
            }
            """.trimIndent(),
            engine,
        )
        assertEquals(mapOf("sum" to 7), exec(mapOf("x" to 3, "y" to 4)))
    }

    @EngineTest
    fun `nested calls`(engine: ExecutionEngine) {
        val exec = execOf(
            """
            SOURCE row;
            FUNC double(n) = n * 2 ;
            FUNC plus1(n)  = n + 1 ;
            TRANSFORM T { stream } {
                LET r = plus1( double(row.v) );
                OUTPUT { res : r }
            }
            """.trimIndent(),
            engine,
        )
        assertEquals(mapOf("res" to 9), exec(mapOf("v" to 4)))
    }

    @EngineTest
    fun `recursive func`(engine: ExecutionEngine) {
        val exec = execOf(
            """
            SOURCE row;
            FUNC fact(n) {
                IF n == 0 THEN { RETURN 1 ; }
                ELSE { RETURN n * fact(n - 1) ; }
            }
            TRANSFORM T { stream } {
                OUTPUT { f : fact(row.n) }
            }
            """.trimIndent(),
            engine,
        )
        assertEquals(mapOf("f" to 6), exec(mapOf("n" to 3)))
    }

    @EngineTest
    fun `undefined function throws`(engine: ExecutionEngine) {
        val exec = execOf(
            """
            SOURCE row;
            TRANSFORM T { stream } {
                OUTPUT { x : foo(1) }
            }
            """.trimIndent(),
            engine,
        )
        assertThrows<IllegalStateException> { exec(emptyMap()) }
    }
}
