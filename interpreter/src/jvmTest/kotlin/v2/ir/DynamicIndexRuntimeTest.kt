package v2.ir

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import v2.testutils.compileAndRun

private fun run(body: String, row: Map<String, Any?> = emptyMap()): Any? =
    v2.testutils.compileAndRun(body, row)

class DynamicIndexRuntimeTest {

    @Test fun `template dot bracket with variable key`() {
        val out =
            run(
                """
            LET value = "field";
            LET template = { [value] : 10 };
            OUTPUT { res : template.[value] }
                """.trimIndent()
            )
        assertEquals(mapOf("res" to 10), out)
    }

    @Test fun `dot bracket with explicit path inside`() {
        val out =
            run(
                """
            LET template = { value : 10 };
            LET count = { 10 : "test" };
            OUTPUT { res : count.[template.value] }
                """.trimIndent()
            )
        assertEquals(mapOf("res" to "test"), out)
    }

    @Test fun `dot bracket forbids nested brackets inside path`() {
        val ex = assertThrows(RuntimeException::class.java) {
            run(
                """
                LET value = "field";
                LET template = { [value] : 10 };
                LET count = { 10 : "test" };
                // BAD: вложенные [] внутри .[ ... ]
                OUTPUT count.[template.[value]]
                """.trimIndent()
            )
        }
        assertTrue(
            ex.message!!.contains("Expect name or index inside '.['") ||
                ex.message!!.contains("Expect ']' after .[")
        )
    }

    @Test fun `array index with brackets`() {
        val out = run(
            """OUTPUT { second : row.items[1] }""",
            mapOf("items" to listOf("a", "b", "c"))
        )
        assertEquals(mapOf("second" to "b"), out)
    }

    @Test fun `array dot-number path`() {
        val out = run(
            """OUTPUT { v : row.items.2 }""",
            mapOf("items" to listOf(10, 20, 30))
        )
        assertEquals(mapOf("v" to 30), out)
    }

    @Test fun `array index out of bounds`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            run("""OUTPUT row.items[5]""", mapOf("items" to listOf(1, 2)))
        }
        assertTrue(ex.message!!.contains("out of bounds"))
    }

    @Test fun `object index by string expr`() {
        val out =
            run(
                """
            LET k = "b";
            OUTPUT { val : row.obj[k] }
                """.trimIndent(),
                mapOf("obj" to mapOf("a" to 1, "b" to 2))
            )
        assertEquals(mapOf("val" to 2), out)
    }
}
