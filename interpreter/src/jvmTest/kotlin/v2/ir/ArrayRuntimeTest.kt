package v2.ir

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import v2.testutils.buildRunner

private fun exec(body: String) = buildRunner(body)

class ArrayRuntimeTest {

    @Test fun `array literal`() {
        val f = exec("OUTPUT { arr : [1, 2, row.x] }")
        assertEquals(mapOf("arr" to listOf(1, 2, 3)), f(mapOf("x" to 3)))
    }

    @Test fun `array comprehension`() {
        val f = exec(
            "OUTPUT { qties : [ item.qty FOR EACH item IN row.items ] }"
        )
        val inRow = mapOf(
            "items" to listOf(
                mapOf("sku" to "A", "qty" to 2),
                mapOf("sku" to "B", "qty" to 5)
            )
        )
        assertEquals(mapOf("qties" to listOf(2, 5)), f(inRow))
    }

    @Test fun `empty array literal`() {
        val f = exec("OUTPUT { arr : [] }")
        assertEquals(mapOf("arr" to emptyList<Any?>()), f(emptyMap()))
    }

    @Test fun `heterogeneous array literal`() {
        val f = exec("""OUTPUT { arr : ["a", 1, TRUE] }""")
        assertEquals(mapOf("arr" to listOf("a", 1, true)), f(emptyMap()))
    }

    @Test fun `array of object literals`() {
        val f = exec("""OUTPUT { arr : [ {a:1}, {b:2} ] }""")
        assertEquals(
            mapOf("arr" to listOf(mapOf("a" to 1), mapOf("b" to 2))),
            f(emptyMap())
        )
    }

    @Test fun `nested array literal`() {
        val f = exec("""OUTPUT { arr : [ [1,2], [3] ] }""")
        assertEquals(
            mapOf("arr" to listOf(listOf(1, 2), listOf(3))),
            f(emptyMap())
        )
    }

    @Test fun `array literal in LET and reuse`() {
        val f = exec(
            """
            LET xs = [1,2,3];
            OUTPUT { arr : xs }
            """.trimIndent()
        )
        assertEquals(mapOf("arr" to listOf(1, 2, 3)), f(emptyMap()))
    }

    @Test fun `comprehension with arithmetic and outer LET`() {
        val f = exec(
            """
            LET base = 10;
            OUTPUT { sums : [ base + n FOR EACH n IN row.nums ] }
            """.trimIndent()
        )
        val inRow = mapOf("nums" to listOf(1, 2))
        assertEquals(mapOf("sums" to listOf(11, 12)), f(inRow))
    }

    @Test fun `comprehension mapping to objects`() {
        val f = exec(
            """
            OUTPUT { items : [
                { sku: item.sku, qty: item.qty * 2 }
                FOR EACH item IN row.items
            ] }
            """.trimIndent()
        )
        val inRow = mapOf(
            "items" to listOf(
                mapOf("sku" to "A", "qty" to 2),
                mapOf("sku" to "B", "qty" to 5)
            )
        )
        assertEquals(
            mapOf(
                "items" to listOf(
                    mapOf("sku" to "A", "qty" to 4),
                    mapOf("sku" to "B", "qty" to 10)
                )
            ),
            f(inRow)
        )
    }

    @Test fun `array comprehension with WHERE`() {
        val f = exec(
            """
        OUTPUT { q: [ it.qty FOR EACH it IN row.items WHERE it.qty > 2 ] }
            """.trimIndent()
        )
        val inRow = mapOf(
            "items" to listOf(
                mapOf("sku" to "A", "qty" to 1),
                mapOf("sku" to "B", "qty" to 5)
            )
        )
        assertEquals(mapOf("q" to listOf(5)), f(inRow))
    }

    @Test fun `comprehension with computed property in object`() {
        val f = exec(
            """
            OUTPUT { arr : [
                { [ item.sku ] : item.qty }
                FOR EACH item IN row.items
            ] }
            """.trimIndent()
        )
        val inRow = mapOf(
            "items" to listOf(
                mapOf("sku" to "A", "qty" to 2),
                mapOf("sku" to "B", "qty" to 5)
            )
        )
        assertEquals(
            mapOf(
                "arr" to listOf(
                    mapOf("A" to 2),
                    mapOf("B" to 5)
                )
            ),
            f(inRow)
        )
    }

    @Test fun `comprehension over empty list`() {
        val f = exec("""OUTPUT { xs : [ x FOR EACH x IN row.list ] }""")
        assertEquals(mapOf("xs" to emptyList<Any?>()), f(mapOf("list" to emptyList<Any?>())))
    }

    @Test fun `comprehension source is not a list - error`() {
        val f = exec("""OUTPUT { xs : [ x FOR EACH x IN row.notList ] }""")
        assertThrows<IllegalStateException> {
            f(mapOf("notList" to 42))
        }
    }

    @Test fun `nested comprehension - clone matrix`() {
        val f = exec(
            """
            OUTPUT { matrix :
              [ [ y FOR EACH y IN xs ] FOR EACH xs IN row.matrix ]
            }
            """.trimIndent()
        )
        val inRow = mapOf(
            "matrix" to listOf(
                listOf(1, 2),
                listOf(3)
            )
        )
        assertEquals(
            mapOf(
                "matrix" to listOf(
                    listOf(1, 2),
                    listOf(3)
                )
            ),
            f(inRow)
        )
    }

    @Test fun `nested comprehension with arithmetic inside inner`() {
        val f = exec(
            """
            OUTPUT { matrix :
              [ [ y * 10 FOR EACH y IN xs ] FOR EACH xs IN row.matrix ]
            }
            """.trimIndent()
        )
        val inRow = mapOf(
            "matrix" to listOf(
                listOf(1, 2),
                listOf(3)
            )
        )
        assertEquals(
            mapOf(
                "matrix" to listOf(
                    listOf(10, 20),
                    listOf(30)
                )
            ),
            f(inRow)
        )
    }
}
