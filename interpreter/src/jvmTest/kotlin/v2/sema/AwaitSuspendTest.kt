package v2.sema

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import v2.Lexer
import v2.Parser

// helper to compile+analyze
private fun semaOK(src: String) =
    SemanticAnalyzer().analyze(Parser(Lexer(src).lex()).parse())

class AwaitSuspendTest {

    /* 1. await разрешён в stream */
    @Test fun `await allowed in stream`() {
        val code = """
            FUNC httpGet(u) = 42;          // заглушка
            TRANSFORM S { stream } {
                LET r = await httpGet("x");
                OUTPUT r;
            }
        """
        semaOK(code) // не бросает
    }

    /* 2. suspend разрешён в buffer */
    @Test fun `suspend allowed in buffer`() {
        val code = """
            FUNC waitFor(t) = 1;
            TRANSFORM B { buffer } {
                LET x = suspend waitFor("ok");
                OUTPUT x;
            }
        """
        semaOK(code)
    }

    /* 3. suspend запрещён в stream */
    @Test fun `suspend forbidden in stream`() {
        val code = """
            FUNC waitFor(t) = 1;
            TRANSFORM Bad { stream } {
                LET x = suspend waitFor("late");
                OUTPUT x;
            }
        """
        assertThrows<SemanticException> { semaOK(code) }
    }
}
