package v2.conformance

import kotlin.test.Test
import kotlin.test.assertEquals
import v2.*
import v2.ir.IROutput
import v2.ir.buildRunnerFromIRMP

private fun tok(t: TokenType) = Token(t, t.name, 1, 1)

class ConformBasicsTest {

    @Test
    fun arithmetic_addition() {
        val expr = BinaryExpr(
            NumberLiteral(I32(1), tok(TokenType.PLUS)),
            tok(TokenType.PLUS),
            NumberLiteral(I32(2), tok(TokenType.PLUS))
        )
        val fields = listOf(LiteralProperty(ObjKey.Name("v"), expr))
        val ir = listOf(IROutput(fields))
        val runner = buildRunnerFromIRMP(ir)
        val out = runner(emptyMap())
        assertEquals(mapOf("v" to 3), out)
    }

    @Test
    fun if_else_expression() {
        val expr = IfElseExpr(
            BoolExpr(true, tok(TokenType.TRUE)),
            NumberLiteral(I32(1), tok(TokenType.RETURN)),
            NumberLiteral(I32(2), tok(TokenType.RETURN)),
            tok(TokenType.IF)
        )
        val fields = listOf(LiteralProperty(ObjKey.Name("v"), expr))
        val ir = listOf(IROutput(fields))
        val runner = buildRunnerFromIRMP(ir)
        val out = runner(emptyMap())
        assertEquals(mapOf("v" to 1), out)
    }

    @Test
    fun array_comprehension() {
        val iterable = AccessExpr(
            IdentifierExpr("row", tok(TokenType.IDENTIFIER)),
            listOf(AccessSeg.Dynamic(StringExpr("items", tok(TokenType.STRING)))),
            tok(TokenType.LEFT_BRACE)
        )
        val comp = ArrayCompExpr(
            varName = "x",
            iterable = iterable,
            mapExpr = IdentifierExpr("x", tok(TokenType.IDENTIFIER)),
            where = null,
            token = tok(TokenType.LEFT_BRACKET)
        )
        val fields = listOf(LiteralProperty(ObjKey.Name("arr"), comp))
        val ir = listOf(IROutput(fields))
        val runner = buildRunnerFromIRMP(ir)
        val out = runner(mapOf("items" to listOf(1, 2, 3)))
        assertEquals(mapOf("arr" to listOf(1, 2, 3)), out)
    }
}

