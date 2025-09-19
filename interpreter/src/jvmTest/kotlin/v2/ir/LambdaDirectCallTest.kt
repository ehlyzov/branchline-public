package v2.ir

import v2.testutils.compileAndRun
import kotlin.test.Test
import kotlin.test.assertEquals

class LambdaDirectCallTest {

    @Test
    fun call_lambda_var_expr_body() {
        val out = compileAndRun(
            """
            LET f = (x,y) -> x + y;
            LET s = f(2,3);
            OUTPUT {s:s}
            """.trimIndent()
        )
        assertEquals(mapOf("s" to 5), out)
    }

    @Test
    fun call_lambda_var_block_body() {
        val out = compileAndRun(
            """
            LET f = (x) -> { 
                LET y = x * 2;
                RETURN y + 1;
            };
            LET s = f(10);
            OUTPUT { s: s }
            """.trimIndent()
        )
        assertEquals(mapOf("s" to 21), out)
    }

    @Test
    fun zero_arg_lambda() {
        val out = compileAndRun(
            """
            LET f = () -> 42;
            OUTPUT { y: f() }
            """.trimIndent()
        )
        assertEquals(mapOf("y" to 42), out)
    }

    @Test
    fun closure_capture() {
        val out = compileAndRun(
            """
            LET k = 10;
            LET f = (x) -> x + k;
            OUTPUT { y: f(5) }
            """.trimIndent()
        )
        assertEquals(mapOf("y" to 15), out)
    }

    @Test
    fun hof_works() {
        val out = compileAndRun(
            """
            LET ys = MAP([1,2,3], (x) -> x + 1);
            OUTPUT { ys: ys }
            """.trimIndent()
        )
        assertEquals(mapOf("ys" to listOf(2, 3, 4)), out)
    }
}
