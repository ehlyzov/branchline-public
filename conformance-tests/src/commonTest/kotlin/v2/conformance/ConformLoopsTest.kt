package v2.conformance

import kotlin.test.Test
import kotlin.test.assertEquals
import v2.*
import v2.ir.*

private fun tk(t: TokenType) = Token(t, t.name, 1, 1)

class ConformLoopsTest {

    @Test
    fun foreach_with_where_and_output() {
        // FOR EACH it IN row.items WHERE it.qty > 2 { OUTPUT { sku: it.sku } }
        val iterable = AccessExpr(
            IdentifierExpr("row", tk(TokenType.IDENTIFIER)),
            listOf(AccessSeg.Dynamic(StringExpr("items", tk(TokenType.STRING)))),
            tk(TokenType.DOT)
        )
        val where = BinaryExpr(
            left = AccessExpr(
                IdentifierExpr("it", tk(TokenType.IDENTIFIER)),
                listOf(AccessSeg.Dynamic(StringExpr("qty", tk(TokenType.STRING)))),
                tk(TokenType.DOT)
            ),
            token = tk(TokenType.GT),
            right = NumberLiteral(I32(2), tk(TokenType.NUMBER))
        )
        val outBody = IROutput(
            listOf(LiteralProperty(
                ObjKey.Name("sku"),
                AccessExpr(
                    IdentifierExpr("it", tk(TokenType.IDENTIFIER)),
                    listOf(AccessSeg.Dynamic(StringExpr("sku", tk(TokenType.STRING)))),
                    tk(TokenType.DOT)
                )
            ))
        )
        val forEach = IRForEach(
            varName = "it",
            iterable = iterable,
            where = where,
            body = listOf(outBody)
        )

        val ir = listOf(forEach)
        val runner = buildRunnerFromIRMP(ir)
        val inRow = mapOf(
            "items" to listOf(
                mapOf("sku" to "A", "qty" to 1),
                mapOf("sku" to "B", "qty" to 5)
            )
        )
        val out = runner(inRow)
        assertEquals(mapOf("sku" to "B"), out)
    }
}

