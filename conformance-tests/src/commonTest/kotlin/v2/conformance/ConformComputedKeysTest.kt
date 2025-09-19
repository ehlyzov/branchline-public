package v2.conformance

import kotlin.test.Test
import kotlin.test.assertEquals
import v2.*
import v2.ir.IROutput
import v2.ir.buildRunnerFromIRMP

private fun t(t: TokenType) = Token(t, t.name, 1, 1)

class ConformComputedKeysTest {
    @Test
    fun computed_string_key_in_object() {
        val keyExpr = AccessExpr(
            IdentifierExpr("row", t(TokenType.IDENTIFIER)),
            listOf(AccessSeg.Dynamic(StringExpr("key", t(TokenType.STRING)))),
            t(TokenType.DOT)
        )
        val obj = ObjectExpr(
            listOf(
                ComputedProperty(keyExpr, NumberLiteral(I32(1), t(TokenType.NUMBER)))
            ),
            t(TokenType.LEFT_BRACE)
        )
        val ir = listOf(IROutput(listOf(LiteralProperty(ObjKey.Name("obj"), obj))))
        val runner = buildRunnerFromIRMP(ir)
        val out = runner(mapOf("key" to "a")) as Map<String, Any?>
        assertEquals(mapOf("a" to 1), out["obj"])
    }
}

