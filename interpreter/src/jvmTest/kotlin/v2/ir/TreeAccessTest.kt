package v2.ir

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import v2.testutils.compileAndRun

private fun run(body: String, row: Map<String, Any?> = emptyMap()): Any? =
    compileAndRun(body, row)

class TreeAccessTest {

    // -------- базовый доступ --------

    @Test fun `dot field access - nested`() {
        val out = run(
            """OUTPUT { v : row.user.name }""",
            mapOf("user" to mapOf("name" to "Ann"))
        )
        assertEquals(mapOf("v" to "Ann"), out)
    }

    @Test fun `bracket index into array`() {
        val out = run(
            """OUTPUT { second : row.items[1] }""",
            mapOf("items" to listOf("a", "b", "c"))
        )
        assertEquals(mapOf("second" to "b"), out)
    }

    @Test fun `dot-number path into array`() {
        val out = run(
            """OUTPUT { v : row.items.2 }""",
            mapOf("items" to listOf(10, 20, 30))
        )
        assertEquals(mapOf("v" to 30), out)
    }

    @Test fun `array index out of bounds by bracket throws`() {
        val ex = assertThrows<IllegalArgumentException> {
            run("""OUTPUT row.items[5]""", mapOf("items" to listOf(1, 2)))
        }
        assertTrue(ex.message!!.contains("out of bounds"))
    }

    // -------- computed keys и .[ path ] --------

    @Test fun `computed property in object literal`() {
        val out =
            run(
                """
            LET k = "x";
            LET o = { [k] : 42 };
            OUTPUT { v : o.x }
                """.trimIndent()
            )
        assertEquals(mapOf("v" to 42), out)
    }

    @Test fun `dot bracket with explicit path inside - numeric key`() {
        val out =
            run(
                """
            LET template = { value : 10 };
            LET count    = { 10 : "test" };
            OUTPUT { res : count.[template.value] }
                """.trimIndent()
            )
        assertEquals(mapOf("res" to "test"), out)
    }

    // -------- поведение NULL и No OUTPUT --------

    @Test fun `object index missing key wrapped yields null field`() {
        val out = run(
            """OUTPUT { v : row.obj[1] }""",
            mapOf("obj" to mapOf("a" to 1))
        )
        assertEquals(mapOf("v" to null), out)
    }

    @Test fun `object index missing key with bare OUTPUT triggers No OUTPUT`() {
        val ex = assertThrows<IllegalStateException> {
            run("""OUTPUT row.obj[1]""", mapOf("obj" to mapOf("a" to 1)))
        }
        assertTrue(ex.message!!.contains("No OUTPUT"))
    }

    // -------- KEYS --------

    @Test fun `KEYS on array returns indices`() {
        val out = run(
            """OUTPUT { k : KEYS(row.xs) }""",
            mapOf("xs" to listOf(10, 20, 30))
        )
        assertEquals(mapOf("k" to listOf(0, 1, 2)), out)
    }

    @Test fun `KEYS on object returns fields in insertion order`() {
        val out = run(
            """OUTPUT { k : KEYS(row.obj) }""",
            mapOf("obj" to linkedMapOf("a" to 1, "b" to 2))
        )
        assertEquals(mapOf("k" to listOf("a", "b")), out)
    }

    // -------- PUT (добавление/замена) --------

    @Test fun `PUT inserts new field into object by string key`() {
        val out =
            run(
                """
            LET obj = { a: 1 };
            OUTPUT { obj : PUT(obj, "b", 2) }
                """.trimIndent()
            )
        assertEquals(mapOf("obj" to mapOf("a" to 1, "b" to 2)), out)
    }

    @Test fun `PUT replaces existing field`() {
        val out =
            run(
                """
            LET obj = { a: 1, b: 2 };
            OUTPUT { obj : PUT(obj, "b", 3) }
                """.trimIndent()
            )
        assertEquals(mapOf("obj" to mapOf("a" to 1, "b" to 3)), out)
    }

    @Test fun `PUT with numeric object key coerces to string`() {
        val out =
            run(
                """
            LET obj = { 10 : "x" };
            OUTPUT { obj2 : PUT(obj, 20, "y") }
                """.trimIndent()
            )
        assertEquals(mapOf("obj2" to mapOf(10 to "x", 20 to "y")), out)
    }

    @Test fun `PUT into array replaces by index`() {
        val out = run(
            """OUTPUT { xs : PUT(row.xs, 1, 99) }""",
            mapOf("xs" to listOf(10, 20, 30))
        )
        assertEquals(mapOf("xs" to listOf(10, 99, 30)), out)
    }

    @Test fun `PUT into array appends when index equals size`() {
        val out = run(
            """OUTPUT { xs : PUT(row.xs, 3, 40) }""",
            mapOf("xs" to listOf(10, 20, 30))
        )
        assertEquals(mapOf("xs" to listOf(10, 20, 30, 40)), out)
    }

    @Test fun `PUT into array out of bounds`() {
        val ex = assertThrows<RuntimeException> {
            run("""OUTPUT PUT(row.xs, 5, 99)""", mapOf("xs" to listOf(1, 2)))
        }
        assertTrue(ex.message!!.contains("out of bounds"))
    }

    // -------- DELETE --------

    @Test fun `DELETE object by string key`() {
        val out = run(
            """OUTPUT { obj : DELETE(row.obj, "b") }""",
            mapOf("obj" to linkedMapOf("a" to 1, "b" to 2, "c" to 3))
        )
        assertEquals(mapOf("obj" to mapOf("a" to 1, "c" to 3)), out)
    }

    @Test fun `DELETE object by numeric key coerced`() {
        val out =
            run(
                """
            LET m = { 10 : "x", 20 : "y" };
            OUTPUT { obj : DELETE(m, 10) }
                """.trimIndent()
            )
        assertEquals(mapOf("obj" to mapOf(20 to "y")), out)
    }

    @Test fun `DELETE array by index`() {
        val out = run(
            """OUTPUT { xs : DELETE(row.xs, 1) }""",
            mapOf("xs" to listOf(10, 20, 30))
        )
        assertEquals(mapOf("xs" to listOf(10, 30)), out)
    }
}
