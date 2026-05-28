package io.github.ehlyzov.branchline.ir

import io.github.ehlyzov.branchline.BranchlineDiagnosticCategory
import io.github.ehlyzov.branchline.ExecutionEngine
import io.github.ehlyzov.branchline.testutils.EngineTest
import io.github.ehlyzov.branchline.testutils.compileAndRun
import io.github.ehlyzov.branchline.testutils.compileAndRunUnchecked
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import kotlin.test.assertEquals

class PlusAssignRuntimeTest {

    @EngineTest
    fun `plus assign appends one item to list variable`(engine: ExecutionEngine) {
        val out = compileAndRun(
            """
                LET xs = [];
                FOR EACH n IN [1, 2, 3] {
                    xs += n;
                }
                OUTPUT { xs: xs };
            """.trimIndent(),
            engine = engine,
        )
        assertEquals(mapOf("xs" to listOf(1, 2, 3)), out)
    }

    @EngineTest
    fun `plus assign appends one item to nested list path`(engine: ExecutionEngine) {
        val out = compileAndRun(
            """
                LET o = { items: [] };
                FOR EACH n IN [1, 2] {
                    o.items += { value: n };
                }
                OUTPUT o;
            """.trimIndent(),
            engine = engine,
        )
        assertEquals(
            mapOf("items" to listOf(mapOf("value" to 1), mapOf("value" to 2))),
            out,
        )
    }

    @EngineTest
    fun `plus assign adds numeric accumulator`(engine: ExecutionEngine) {
        val out = compileAndRun(
            """
                LET total = 0;
                FOR EACH n IN [1, 2, 3] {
                    total += n;
                }
                OUTPUT { total: total };
            """.trimIndent(),
            engine = engine,
        )
        assertEquals(mapOf("total" to 6), out)
    }

    @EngineTest
    fun `plus assign does not auto create missing path`(engine: ExecutionEngine) {
        assertThrows<Exception> {
            compileAndRun(
                """
                    LET o = {};
                    o.items += 1;
                    OUTPUT o;
                """.trimIndent(),
                engine = engine,
            )
        }
    }

    @EngineTest
    fun `append to statement is not accepted`(engine: ExecutionEngine) {
        assertThrows<Exception> {
            compileAndRun(
                """
                    LET xs = [];
                    APPEND TO xs 1;
                    OUTPUT { xs: xs };
                """.trimIndent(),
                engine = engine,
            )
        }
    }

    @Test
    fun `plus assign missing target has structured runtime diagnostic`() {
        val ex = assertThrows<BranchlineRuntimeDiagnosticException> {
            compileAndRunUnchecked(
                """
                    xs += 1;
                    OUTPUT {};
                """.trimIndent(),
                engine = ExecutionEngine.INTERPRETER,
            )
        }
        assertEquals("mutation_target_missing", ex.diagnostic.code)
        assertEquals(BranchlineDiagnosticCategory.RUNTIME, ex.diagnostic.category)
        assertEquals("+=", ex.diagnostic.payload?.operation)
        assertEquals("xs", ex.diagnostic.payload?.targetPath)
        assertEquals("missing", ex.diagnostic.payload?.actualKind)
    }

    @Test
    fun `plus assign wrong target kind has structured runtime diagnostic`() {
        val ex = assertThrows<BranchlineRuntimeDiagnosticException> {
            compileAndRunUnchecked(
                """
                    LET xs = {};
                    xs += 1;
                    OUTPUT {};
                """.trimIndent(),
                engine = ExecutionEngine.INTERPRETER,
            )
        }
        assertEquals("mutation_plus_assign_wrong_kind", ex.diagnostic.code)
        assertEquals("+=", ex.diagnostic.payload?.operation)
        assertEquals("object", ex.diagnostic.payload?.actualKind)
    }

    @Test
    fun `plus assign missing mid path has structured runtime diagnostic`() {
        val ex = assertThrows<BranchlineRuntimeDiagnosticException> {
            compileAndRunUnchecked(
                """
                    LET o = {};
                    o.a.b += 1;
                    OUTPUT {};
                """.trimIndent(),
                engine = ExecutionEngine.INTERPRETER,
            )
        }
        assertEquals("mutation_path_missing", ex.diagnostic.code)
        assertEquals("+=", ex.diagnostic.payload?.operation)
        assertEquals("missing", ex.diagnostic.payload?.actualKind)
    }

    @Test
    fun `plus assign wrong path parent has structured runtime diagnostic`() {
        val ex = assertThrows<BranchlineRuntimeDiagnosticException> {
            compileAndRunUnchecked(
                """
                    LET o = 1;
                    o.a += 1;
                    OUTPUT {};
                """.trimIndent(),
                engine = ExecutionEngine.INTERPRETER,
            )
        }
        assertEquals("mutation_target_wrong_kind", ex.diagnostic.code)
        assertEquals("+=", ex.diagnostic.payload?.operation)
        assertEquals("number", ex.diagnostic.payload?.actualKind)
    }
}
