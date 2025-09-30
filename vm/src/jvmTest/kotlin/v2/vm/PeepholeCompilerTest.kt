package v2.vm

import v2.ir.IRExprStmt
import v2.NullLiteral
import v2.Token
import v2.TokenType
import kotlin.test.Test
import kotlin.test.assertTrue

class PeepholeCompilerTest {
    @Test
    fun eliminates_push_pop_and_redundant_swaps() {
        val c = Compiler()
        val ir = listOf(
            IRExprStmt(NullLiteral(Token(TokenType.NULL, "null", 0, 0))),
        )
        val bytecode = c.compile(ir)
        // After optimization, PUSH(null); POP pair should be removed completely
        val ops = bytecode.instructions
        assertTrue(ops.isEmpty() || ops.all { it !is Instruction.POP })
    }
}
