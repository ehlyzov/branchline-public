package v2.ir

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import v2.testutils.buildRunner

private fun exec(body: String) = buildRunner(body)

class NestedForEachTest {

    @Test fun `two-level for each flattens`() {
        val f = exec(
            """
            FOR EACH outer IN row.orders {
                FOR EACH item IN outer.lines {
                    OUTPUT { id : outer.id , sku : item.sku }
                }
            }
        """
        )

        val input = mapOf(
            "orders" to listOf(
                mapOf(
                    "id" to 1,
                    "lines" to listOf(
                        mapOf("sku" to "A"), mapOf("sku" to "B")
                    )
                ),
                mapOf(
                    "id" to 2,
                    "lines" to listOf(
                        mapOf("sku" to "C")
                    )
                )
            )
        )

        val expect = listOf(
            mapOf("id" to 1, "sku" to "A"),
            mapOf("id" to 1, "sku" to "B"),
            mapOf("id" to 2, "sku" to "C")
        )
        assertEquals(expect, f(input))
    }
}
