package v2.debug

import v2.vm.*
import kotlin.test.Test
import kotlin.test.assertEquals

class TraceReportInstructionTest {
    @Test
    fun instructions_per_row() {
        val tracer = CollectingTracer()
        val vm = VM(tracer = tracer)
        val bytecode = Bytecode.fromInstructions(
            listOf(
                Instruction.PUSH("v"),
                Instruction.PUSH("k"),
                Instruction.OUTPUT(1)
            )
        )
        vm.execute(bytecode)
        val rep = TraceReport.from(tracer)
        assertEquals(2L, rep.instructions[Opcode.PUSH])
        assertEquals(1L, rep.instructions[Opcode.OUTPUT])
        assertEquals(3.0, TraceReport.instructionsPerRow(rep), 0.0)
    }
}
