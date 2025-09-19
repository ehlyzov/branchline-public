package v2.conformance

import kotlin.test.Test
import kotlin.test.assertEquals
import v2.*
import v2.ir.*

private fun tok(t: TokenType) = Token(t, t.name, 1, 1)

class ConformHostFnsTest {

    @Test
    fun call_host_function() {
        val host = mapOf(
            "ADD1" to { args: List<Any?> -> ((args[0] as? Int) ?: (args[0] as Number).toInt()) + 1 }
        )
        val call = CallExpr(IdentifierExpr("ADD1", tok(TokenType.IDENTIFIER)), listOf(NumberLiteral(I32(41), tok(TokenType.NUMBER))), tok(TokenType.CALL))
        val out = IROutput(listOf(LiteralProperty(ObjKey.Name("v"), call)))
        val ir = listOf(out)
        val runner = buildRunnerFromIRMP(ir, hostFns = host)
        val res = runner(emptyMap())
        assertEquals(mapOf("v" to 42), res)
    }
}

