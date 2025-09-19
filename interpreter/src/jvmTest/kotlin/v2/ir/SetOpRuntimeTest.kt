package v2.ir

import org.junit.jupiter.api.assertThrows
import v2.testutils.compileAndRun
import kotlin.test.Test
import kotlin.test.assertEquals

class SetOpRuntimeTest {

    @Test
    fun `SET object insert and replace`() {
        val out = compileAndRun(
            """
        LET o = { a: 1 };
        SET o.b = 2;
        SET o.a = 3;
        OUTPUT o;
    """
        )
        assertEquals(mapOf("a" to 3, "b" to 2), out)
    }

    @Test
    fun `SET list replace only`() {
        val out = compileAndRun(
            """
        LET xs = [1,2,3];
        SET xs[1] = 42;
        OUTPUT { xs: xs }
    """
        )
        assertEquals(mapOf("xs" to listOf(1, 42, 3)), out)
    }

    @Test
    fun `SET dynamic path`() {
        val out = compileAndRun(
            """
        LET k = "x";
        LET o = {};
        SET o.[k] = 10;
        OUTPUT o;
    """
        )
        assertEquals(mapOf("x" to 10), out)
    }

    @Test
    fun `SET into nested`() {
        val out = compileAndRun(
            """
        LET o = { a: { b: [0,0] } };
        SET o.a.b[1] = 7;
        OUTPUT o;
    """
        )
        assertEquals(mapOf("a" to mapOf("b" to listOf(0, 7))), out)
    }

    @Test
    fun `SET fails on missing mid path`() {
        assertThrows<IllegalStateException> {
            compileAndRun(
                """
            LET o = {};
            SET o.a.b = 1;    // 'a' отсутствует — ошибка
            OUTPUT o;
        """
            )
        }
    }
}
