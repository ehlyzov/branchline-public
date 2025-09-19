package v2.ir

import v2.testutils.compileAndRun
import kotlin.test.Test
import kotlin.test.assertEquals

class EdgesTest {
    @Test
    fun appendTo_with_grouped_value() {
        val out = compileAndRun(
            """
        LET acc = { errs: [] };
        LET k = "X";
        APPEND TO acc.errs ("missing: " + k) INIT [];
        OUTPUT acc;
        """
        )
        assertEquals(listOf("missing: X"), (out as Map<*, *>)["errs"])
    }

    @Test fun appendTo_on_indexed_lvalue_and_grouped_value() {
        val out = compileAndRun(
            """
        LET o = { a: { b: [] } };
        APPEND TO o.a.b (1 + 2) INIT [];
        OUTPUT o;
        """
        )
        assertEquals(listOf(3), ((out as Map<*, *>)["a"] as Map<*, *>)["b"])
    }

    @Test fun grouping_inside_call_arg_with_coalesce() {
        val out = compileAndRun(
            """
        LET pick = (a,b,c) -> c;
        LET a = null; 
        LET b = 7;
        OUTPUT { res: pick(1,2,(a ?? b)) };
        """
        )
        assertEquals(mapOf("res" to 7), out)
    }
}
