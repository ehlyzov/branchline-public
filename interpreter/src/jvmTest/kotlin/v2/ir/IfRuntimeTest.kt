package v2.ir

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import v2.testutils.compileAndRun
import v2.testutils.buildRunner

private fun exec(body: String) = buildRunner(body)

/* ------------------------------------------------------------- */
class IfRuntimeTest {

    @Test
    fun `if else chooses branch`() {
        val f = exec(
            """
            IF row.x > 0 THEN {
                OUTPUT { res : "pos" }
            } ELSE {
                OUTPUT { res : "neg" }
            }
        """
        )
        assertEquals(mapOf("res" to "pos"), f(mapOf("x" to 3)))
        assertEquals(mapOf("res" to "neg"), f(mapOf("x" to -1)))
    }

    @Test
    fun `if without else may skip output`() {
        val f = exec(
            """
            IF row.flag THEN {
                OUTPUT { ok : true }
            }
        """
        )
        assertEquals(mapOf("ok" to true), f(mapOf("flag" to true)))

        // flag=false  –  ни одного OUTPUT → IllegalStateException
        assertThrows<IllegalStateException> { f(mapOf("flag" to false)) }
    }

    @Test
    fun `nested if inside loop`() {
        val f = exec(
            """
            FOR EACH n IN row.nums {
                IF n % 2 == 0 THEN {
                    OUTPUT { even : n }
                } ELSE {
                    OUTPUT { odd  : n }
                }
            }
        """
        )
        val out = f(mapOf("nums" to listOf(1, 2)))
        assertEquals(
            listOf(mapOf("odd" to 1), mapOf("even" to 2)),
            out
        )
    }

    @Test fun if_expr_returns_value_in_let() {
        val out = compileAndRun(
            """
              LET a = null; 
              LET b = 7;
              LET x = IF a == null THEN b ELSE a;
              OUTPUT { x: x };
            """.trimIndent()
        ) as Map<*, *>
        assertEquals(7, out["x"])
    }

    @Test fun if_body_side_effects_are_kept() {
        val out = compileAndRun(
            """
              LET acc = { ok: true, errs: [] };
              IF true THEN {
                SET acc.ok = false;
                APPEND TO acc.errs "e1" INIT [];
              } ELSE { /* no-op */ }
              OUTPUT { ok: acc.ok, errs: acc.errs };
            """.trimIndent()
        ) as Map<*, *>
        assertEquals(false, out["ok"])
        assertEquals(listOf("e1"), out["errs"])
    }
}
