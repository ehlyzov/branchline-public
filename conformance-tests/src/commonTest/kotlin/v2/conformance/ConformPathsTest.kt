package v2.conformance

import kotlin.test.Test
import kotlin.test.assertEquals
import v2.*
import v2.ir.*

private fun t(t: TokenType) = Token(t, t.name, 1, 1)

class ConformPathsTest {

    @Test
    fun set_and_append_inside_object() {
        // LET obj = {}
        val letObj = IRLet(
            name = "obj",
            expr = ObjectExpr(emptyList(), t(TokenType.LEFT_BRACE))
        )
        // SET obj.x = 1
        val setX = IRSet(
            target = AccessExpr(
                IdentifierExpr("obj", t(TokenType.IDENTIFIER)),
                listOf(AccessSeg.Static(ObjKey.Name("x"))),
                t(TokenType.DOT)
            ),
            value = NumberLiteral(I32(1), t(TokenType.NUMBER))
        )
        // APPEND TO obj.items 2 INIT []
        val appendItems = IRAppendTo(
            target = AccessExpr(
                IdentifierExpr("obj", t(TokenType.IDENTIFIER)),
                listOf(AccessSeg.Static(ObjKey.Name("items"))),
                t(TokenType.DOT)
            ),
            value = NumberLiteral(I32(2), t(TokenType.NUMBER)),
            init = ArrayExpr(emptyList(), t(TokenType.LEFT_BRACKET))
        )
        // OUTPUT { obj: obj }
        val out = IROutput(listOf(
            LiteralProperty(
                ObjKey.Name("obj"),
                IdentifierExpr("obj", t(TokenType.IDENTIFIER))
            )
        ))

        val ir = listOf(letObj, setX, appendItems, out)
        val runner = buildRunnerFromIRMP(ir)
        val result = runner(emptyMap()) as Map<String, Any?>
        assertEquals(mapOf("x" to 1, "items" to listOf(2)), result["obj"])
    }

    @Test
    fun modify_root_object() {
        // LET o = { a:1, b:2 }
        val let = IRLet(
            name = "o",
            expr = ObjectExpr(
                listOf(
                    LiteralProperty(ObjKey.Name("a"), NumberLiteral(I32(1), t(TokenType.NUMBER))),
                    LiteralProperty(ObjKey.Name("b"), NumberLiteral(I32(2), t(TokenType.NUMBER))),
                ), t(TokenType.LEFT_BRACE)
            )
        )
        // MODIFY o { b:3, c:4 }
        val modify = IRModify(
            target = AccessExpr(IdentifierExpr("o", t(TokenType.IDENTIFIER)), emptyList(), t(TokenType.DOT)),
            updates = listOf(
                LiteralProperty(ObjKey.Name("b"), NumberLiteral(I32(3), t(TokenType.NUMBER))),
                LiteralProperty(ObjKey.Name("c"), NumberLiteral(I32(4), t(TokenType.NUMBER))),
            )
        )
        val out = IROutput(listOf(LiteralProperty(ObjKey.Name("o"), IdentifierExpr("o", t(TokenType.IDENTIFIER)))))

        val ir = listOf(let, modify, out)
        val runner = buildRunnerFromIRMP(ir)
        val result = runner(emptyMap()) as Map<String, Any?>
        assertEquals(mapOf("a" to 1, "b" to 3, "c" to 4), result["o"])
    }
}

