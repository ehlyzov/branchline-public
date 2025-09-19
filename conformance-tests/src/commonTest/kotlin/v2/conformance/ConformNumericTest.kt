package v2.conformance

import kotlin.test.Test
import kotlin.test.assertEquals
import v2.*
import v2.ir.IROutput
import v2.ir.buildRunnerFromIRMP

private fun tk(t: TokenType) = Token(t, t.name, 1, 1)

class ConformNumericTest {

    private fun makeOut(expr: Expr): (Map<String, Any?>) -> Any? {
        val fields = listOf(LiteralProperty(ObjKey.Name("v"), expr))
        val ir = listOf(IROutput(fields))
        return buildRunnerFromIRMP(ir)
    }

    @Test
    fun add_ints() {
        val expr = BinaryExpr(NumberLiteral(I32(2), tk(TokenType.NUMBER)), tk(TokenType.PLUS), NumberLiteral(I32(3), tk(TokenType.NUMBER)))
        val run = makeOut(expr)
        assertEquals(mapOf("v" to 5), run(emptyMap()))
    }

    @Test
    fun sub_ints() {
        val expr = BinaryExpr(NumberLiteral(I32(9), tk(TokenType.NUMBER)), tk(TokenType.MINUS), NumberLiteral(I32(4), tk(TokenType.NUMBER)))
        val run = makeOut(expr)
        assertEquals(mapOf("v" to 5), run(emptyMap()))
    }

    @Test
    fun mul_ints() {
        val expr = BinaryExpr(NumberLiteral(I32(6), tk(TokenType.NUMBER)), tk(TokenType.STAR), NumberLiteral(I32(7), tk(TokenType.NUMBER)))
        val run = makeOut(expr)
        assertEquals(mapOf("v" to 42), run(emptyMap()))
    }

    @Test
    fun div_even_returns_int() {
        val expr = BinaryExpr(NumberLiteral(I32(6), tk(TokenType.NUMBER)), tk(TokenType.SLASH), NumberLiteral(I32(3), tk(TokenType.NUMBER)))
        val run = makeOut(expr)
        assertEquals(mapOf("v" to 2), run(emptyMap()))
    }

    @Test
    fun mod_ints() {
        val expr = BinaryExpr(NumberLiteral(I32(7), tk(TokenType.NUMBER)), tk(TokenType.PERCENT), NumberLiteral(I32(3), tk(TokenType.NUMBER)))
        val run = makeOut(expr)
        assertEquals(mapOf("v" to 1), run(emptyMap()))
    }
}

