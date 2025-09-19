package v2.ir

import org.junit.jupiter.api.assertThrows
import v2.testutils.compileAndRun
import kotlin.test.Test
import kotlin.test.assertEquals

class AppendToOpRuntimeTest {
    @Test
    fun `append to missing key with INIT seed`() {
        val out = compileAndRun(
            """
                LET o = {};
                APPEND TO o.x 1 INIT [0];
                OUTPUT o;
            """
        )
        assertEquals(mapOf("x" to listOf(0, 1)), out)
    }

    @Test
    fun `append to existing null with INIT`() {
        val out =
            compileAndRun(
                """
                    LET o = { x: null };
                    APPEND TO o.x 7 INIT [1,2];
                    OUTPUT o;
                """
            )
        assertEquals(mapOf("x" to listOf(1, 2, 7)), out)
    }

    @Test
    fun `append ignores INIT when list exists`() {
        val out =
            compileAndRun(
                """
                    LET o = { x: [10] };
                    APPEND TO o.x 11 INIT [0,0];
                    OUTPUT o;
                """
            )
        assertEquals(mapOf("x" to listOf(10, 11)), out)
    }

    @Test
    fun `append to non-list even with INIT - error`() {
        assertThrows<IllegalStateException> {
            compileAndRun(
                """
                    LET o = { x: {a:1} };
                    APPEND TO o.x 2 INIT [];
                    OUTPUT o;
                """
            )
        }
    }
}
