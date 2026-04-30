package io.github.ehlyzov.branchline.normalize

import io.github.ehlyzov.branchline.BranchlineFacade
import io.github.ehlyzov.branchline.BranchlineInspectRequest
import io.github.ehlyzov.branchline.BranchlineSubsetCompatibility
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

public class AstRendererTest {
    private fun normalize(source: String): String? = BranchlineFacade.inspect(
        BranchlineInspectRequest(
            programText = source,
            includeNormalizedSource = true,
        )
    ).normalizedSource

    @Test
    public fun rowAliasNormalizesToInput() {
        val withRow = normalize(
            """
            TRANSFORM Main {
                LET name = row.name
                OUTPUT { name: name }
            }
            """.trimIndent()
        )
        val withInput = normalize(
            """
            TRANSFORM Main {
                LET name = input.name
                OUTPUT { name: name }
            }
            """.trimIndent()
        )
        assertNotNull(withRow)
        assertNotNull(withInput)
        assertEquals(withInput, withRow)
        assertTrue(withRow.contains("input.name"))
        assertTrue(!withRow.contains("row.name"))
    }

    @Test
    public fun forAndForEachShareNormalizedForm() {
        val forEach = normalize(
            """
            TRANSFORM Main {
                LET acc = []
                FOR EACH item IN input.items {
                    APPEND TO acc item
                }
                OUTPUT { items: acc }
            }
            """.trimIndent()
        )
        val plainFor = normalize(
            """
            TRANSFORM Main {
                LET acc = []
                FOR item IN input.items {
                    APPEND TO acc item
                }
                OUTPUT { items: acc }
            }
            """.trimIndent()
        )
        assertNotNull(forEach)
        assertEquals(forEach, plainFor)
        assertTrue(forEach.contains("FOR EACH item IN"))
    }

    @Test
    public fun semicolonAndSemicolonFreeNormalizeIdentically() {
        val withSemis = normalize(
            """
            TRANSFORM Main {
                LET a = 1;
                LET b = 2;
                OUTPUT { sum: a + b }
            }
            """.trimIndent()
        )
        val withoutSemis = normalize(
            """
            TRANSFORM Main {
                LET a = 1
                LET b = 2
                OUTPUT { sum: a + b }
            }
            """.trimIndent()
        )
        assertNotNull(withSemis)
        assertEquals(withSemis, withoutSemis)
        assertTrue(!withSemis.contains(";"))
    }

    @Test
    public fun normalizationIsIdempotent() {
        val source = """
            TRANSFORM Main {
                LET greeting = "Hello, " + input.name
                OUTPUT { greeting: greeting, count: 42 }
            }
        """.trimIndent()
        val once = normalize(source)
        assertNotNull(once)
        val twice = normalize(once)
        assertEquals(once, twice)
    }

    @Test
    public fun incompatibleProgramsHaveNoNormalizedSource() {
        val sharedProgram = """
            SHARED cache SINGLE

            TRANSFORM Main {
                LET value = AWAIT cache.user
                OUTPUT { value: value }
            }
        """.trimIndent()
        val result = BranchlineFacade.inspect(
            BranchlineInspectRequest(
                programText = sharedProgram,
                includeNormalizedSource = true,
            )
        )
        assertEquals(BranchlineSubsetCompatibility.INCOMPATIBLE, result.subsetCompatibility)
        assertNull(result.normalizedSource)
    }

    @Test
    public fun normalizedSourceIsOmittedByDefault() {
        val program = """
            TRANSFORM Main {
                OUTPUT { greeting: "hi" }
            }
        """.trimIndent()
        val result = BranchlineFacade.inspect(
            BranchlineInspectRequest(programText = program)
        )
        assertNull(result.normalizedSource)
    }

    @Test
    public fun normalizedSourceMatchesGoldenForCommonProgram() {
        val source = """
            TRANSFORM Main {
                LET total = input.a + input.b
                OUTPUT { sum: total }
            }
        """.trimIndent()
        val expected = """
            TRANSFORM Main {
                LET total = input.a + input.b
                OUTPUT { sum: total }
            }

        """.trimIndent() + "\n"
        val actual = normalize(source)
        assertEquals(expected.trimEnd() + "\n", actual)
    }

    @Test
    public fun normalizedCaseExpressionIsDeterministic() {
        val source = """
            TRANSFORM Main {
                LET status = CASE {
                    WHEN input.failed > 0 THEN "failing"
                    WHEN input.total == 0 THEN "empty"
                    ELSE "passing"
                }
                OUTPUT { status: status }
            }
        """.trimIndent()
        val once = normalize(source)
        assertNotNull(once)
        val twice = normalize(once)
        assertEquals(once, twice)
        assertTrue(once.contains("CASE {"))
        assertTrue(once.contains("WHEN input.failed > 0 THEN \"failing\""))
        assertTrue(once.contains("ELSE \"passing\""))
    }

    @Test
    public fun longObjectLiteralBreaksAcrossLines() {
        val source = """
            TRANSFORM Main {
                OUTPUT {
                    a: input.a, b: input.b, c: input.c, d: input.d, e: input.e, f: input.f
                }
            }
        """.trimIndent()
        val once = normalize(source)
        assertNotNull(once)
        val twice = normalize(once)
        assertEquals(once, twice)
    }
}
