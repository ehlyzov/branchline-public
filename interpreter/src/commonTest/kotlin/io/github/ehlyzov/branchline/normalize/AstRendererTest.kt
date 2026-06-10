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
                    acc += item
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
                    acc += item
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

    @Test
    public fun normalizationCorpusBaselineIsGoldenAndIdempotent() {
        val fixtures = normalizationCorpusFixtures()
        assertTrue(fixtures.size >= 20, "normalization corpus must contain at least 20 fixtures")

        fixtures.forEach { fixture ->
            val once = normalize(fixture.source)
                ?: error("fixture '${fixture.id}' did not produce normalized source")
            assertEquals(fixture.expected, once, "golden mismatch for fixture '${fixture.id}'")

            val twice = normalize(once)
                ?: error("fixture '${fixture.id}' normalized output did not re-normalize")
            assertEquals(once, twice, "normalization is not idempotent for fixture '${fixture.id}'")
        }
    }

    @Test
    public fun normalizationCorpusRewritesSafeSelfAppendToPlusAssign() {
        val fixture = normalizationCorpusFixtures().single { it.id == "safe-self-append-rewrites-to-plus-assign" }
        val normalized = normalize(fixture.source)
        assertEquals(fixture.expected, normalized)
        assertTrue(normalized!!.contains("items += input.next"))
        assertTrue(!normalized.contains("SET items = APPEND(items, input.next)"))
    }

    @Test
    public fun unsafeSelfAppendFormsDoNotRewrite() {
        val fixtures = normalizationCorpusFixtures().filter { it.id.startsWith("unsafe-self-append-") }
        assertEquals(5, fixtures.size)

        fixtures.forEach { fixture ->
            val normalized = normalize(fixture.source)
                ?: error("fixture '${fixture.id}' did not produce normalized source")
            assertEquals(fixture.expected, normalized, "golden mismatch for fixture '${fixture.id}'")
            assertTrue(normalized.contains("SET "), "fixture '${fixture.id}' should keep SET")
            assertTrue(normalized.contains("APPEND("), "fixture '${fixture.id}' should keep APPEND call")
            assertTrue(!normalized.contains(" += "), "fixture '${fixture.id}' must not rewrite to +=")
            assertEquals(normalized, normalize(normalized), "fixture '${fixture.id}' is not idempotent")
        }
    }

    private data class NormalizationFixture(
        val id: String,
        val source: String,
        val expected: String,
    )

    private fun normalizationCorpusFixtures(): List<NormalizationFixture> = listOf(
        fixture(
            id = "input-alias-row",
            source = """
                TRANSFORM Main {
                    LET name = row.name
                    OUTPUT { name: name }
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET name = input.name
                    OUTPUT { name: name }
                }
            """,
        ),
        fixture(
            id = "semicolon-free-output",
            source = """
                TRANSFORM Main {
                    LET a = 1;
                    LET b = 2;
                    OUTPUT { sum: a + b };
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET a = 1
                    LET b = 2
                    OUTPUT { sum: a + b }
                }
            """,
        ),
        fixture(
            id = "for-normalizes-to-for-each",
            source = """
                TRANSFORM Main {
                    LET values = []
                    FOR item IN input.items {
                        values += item
                    }
                    OUTPUT { values: values }
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET values = []
                    FOR EACH item IN input.items {
                        values += item
                    }
                    OUTPUT { values: values }
                }
            """,
        ),
        fixture(
            id = "for-each-where",
            source = """
                TRANSFORM Main {
                    LET values = []
                    FOR EACH item IN input.items WHERE item.enabled {
                        values += item.id
                    }
                    OUTPUT { values: values }
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET values = []
                    FOR EACH item IN input.items WHERE item.enabled {
                        values += item.id
                    }
                    OUTPUT { values: values }
                }
            """,
        ),
        fixture(
            id = "plus-assign-local",
            source = """
                TRANSFORM Main {
                    LET total = 0
                    total += input.delta
                    OUTPUT { total: total }
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET total = 0
                    total += input.delta
                    OUTPUT { total: total }
                }
            """,
        ),
        fixture(
            id = "plus-assign-path",
            source = """
                TRANSFORM Main {
                    LET state = { items: [] }
                    state.items += input.item
                    OUTPUT state
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET state = { items: [] }
                    state.items += input.item
                    OUTPUT state
                }
            """,
        ),
        fixture(
            id = "set-local",
            source = """
                TRANSFORM Main {
                    LET status = "draft"
                    SET status = input.status ?? "draft"
                    OUTPUT { status: status }
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET status = "draft"
                    SET status = input.status ?? "draft"
                    OUTPUT { status: status }
                }
            """,
        ),
        fixture(
            id = "set-path",
            source = """
                TRANSFORM Main {
                    LET user = { profile: { name: "unknown" } }
                    SET user.profile.name = input.name
                    OUTPUT user
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET user = { profile: { name: "unknown" } }
                    SET user.profile.name = input.name
                    OUTPUT user
                }
            """,
        ),
        fixture(
            id = "safe-self-append-rewrites-to-plus-assign",
            source = """
                TRANSFORM Main {
                    LET items = []
                    SET items = APPEND(items, input.next)
                    OUTPUT { items: items }
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET items = []
                    items += input.next
                    OUTPUT { items: items }
                }
            """,
        ),
        fixture(
            id = "unsafe-self-append-path-target",
            source = """
                TRANSFORM Main {
                    LET state = { items: [] }
                    SET state.items = APPEND(state.items, input.next)
                    OUTPUT state
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET state = { items: [] }
                    SET state.items = APPEND(state.items, input.next)
                    OUTPUT state
                }
            """,
        ),
        fixture(
            id = "unsafe-self-append-dynamic-target",
            source = """
                TRANSFORM Main {
                    LET state = { key: [] }
                    SET state[input.key] = APPEND(state[input.key], input.next)
                    OUTPUT state
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET state = { key: [] }
                    SET state[input.key] = APPEND(state[input.key], input.next)
                    OUTPUT state
                }
            """,
        ),
        fixture(
            id = "unsafe-self-append-alias-ambiguity",
            source = """
                TRANSFORM Main {
                    LET items = []
                    SET items = APPEND(row.items, input.next)
                    OUTPUT { items: items }
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET items = []
                    SET items = APPEND(input.items, input.next)
                    OUTPUT { items: items }
                }
            """,
        ),
        fixture(
            id = "unsafe-self-append-unknown-callee",
            source = """
                FUNC append(xs, item) = APPEND(xs, item)

                TRANSFORM Main {
                    LET items = []
                    SET items = append(items, input.next)
                    OUTPUT { items: items }
                }
            """,
            expected = """
                FUNC append(xs, item) = APPEND(xs, item)

                TRANSFORM Main {
                    LET items = []
                    SET items = append(items, input.next)
                    OUTPUT { items: items }
                }
            """,
        ),
        fixture(
            id = "unsafe-self-append-different-identifier",
            source = """
                TRANSFORM Main {
                    LET items = []
                    LET other = []
                    SET items = APPEND(other, input.next)
                    OUTPUT { items: items }
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET items = []
                    LET other = []
                    SET items = APPEND(other, input.next)
                    OUTPUT { items: items }
                }
            """,
        ),
        fixture(
            id = "case-layout",
            source = """
                TRANSFORM Main {
                    LET status = CASE {
                        WHEN input.failed > 0 THEN "failing"
                        WHEN input.total == 0 THEN "empty"
                        ELSE "passing"
                    }
                    OUTPUT { status: status }
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET status = CASE {
                    WHEN input.failed > 0 THEN "failing"
                    WHEN input.total == 0 THEN "empty"
                    ELSE "passing"
                }
                    OUTPUT { status: status }
                }
            """,
        ),
        fixture(
            id = "array-comprehension",
            source = """
                TRANSFORM Main {
                    LET names = [item.name FOR EACH item IN input.items WHERE item.enabled]
                    OUTPUT { names: names }
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET names = [item.name FOR EACH item IN input.items WHERE item.enabled]
                    OUTPUT { names: names }
                }
            """,
        ),
        fixture(
            id = "lambda-map",
            source = """
                TRANSFORM Main {
                    LET doubled = MAP(input.values, (value) -> value * 2)
                    OUTPUT { doubled: doubled }
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET doubled = MAP(input.values, (value) -> value * 2)
                    OUTPUT { doubled: doubled }
                }
            """,
        ),
        fixture(
            id = "try-catch-expression",
            source = """
                TRANSFORM Main {
                    LET total = TRY SUM(input.items) CATCH (err) => 0
                    OUTPUT { total: total }
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET total = TRY SUM(input.items) CATCH (err) -> 0
                    OUTPUT { total: total }
                }
            """,
        ),
        fixture(
            id = "function-expression-body",
            source = """
                FUNC double(x) = x * 2

                TRANSFORM Main {
                    OUTPUT { value: double(input.value) }
                }
            """,
            expected = """
                FUNC double(x) = x * 2

                TRANSFORM Main {
                    OUTPUT { value: double(input.value) }
                }
            """,
        ),
        fixture(
            id = "type-enum",
            source = """
                TYPE Status = enum { passing, failing }

                TRANSFORM Main {
                    OUTPUT { status: input.status }
                }
            """,
            expected = """
                TYPE Status = enum { passing, failing }

                TRANSFORM Main {
                    OUTPUT { status: input.status }
                }
            """,
        ),
        fixture(
            id = "modify-object",
            source = """
                TRANSFORM Main {
                    LET user = { name: input.name }
                    MODIFY user { role: input.role, active: true }
                    OUTPUT user
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET user = { name: input.name }
                    MODIFY user { role: input.role, active: true }
                    OUTPUT user
                }
            """,
        ),
        fixture(
            id = "computed-property",
            source = """
                TRANSFORM Main {
                    OUTPUT { [input.key]: input.value }
                }
            """,
            expected = """
                TRANSFORM Main {
                    OUTPUT { [input.key]: input.value }
                }
            """,
        ),
        fixture(
            id = "dynamic-access",
            source = """
                TRANSFORM Main {
                    LET metric = input.metrics[input.key]
                    OUTPUT { metric: metric }
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET metric = input.metrics[input.key]
                    OUTPUT { metric: metric }
                }
            """,
        ),
        fixture(
            id = "if-else-expression",
            source = """
                TRANSFORM Main {
                    LET label = IF input.ok THEN "ok" ELSE "bad"
                    OUTPUT { label: label }
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET label = IF input.ok THEN "ok" ELSE "bad"
                    OUTPUT { label: label }
                }
            """,
        ),
        fixture(
            id = "coalesce-chain",
            source = """
                TRANSFORM Main {
                    LET name = input.displayName ?? input.name ?? "unknown"
                    OUTPUT { name: name }
                }
            """,
            expected = """
                TRANSFORM Main {
                    LET name = input.displayName ?? input.name ?? "unknown"
                    OUTPUT { name: name }
                }
            """,
        ),
        fixture(
            id = "long-object",
            source = """
                TRANSFORM Main {
                    OUTPUT {
                        alpha: input.alpha,
                        beta: input.beta,
                        gamma: input.gamma,
                        delta: input.delta,
                        epsilon: input.epsilon,
                        zeta: input.zeta
                    }
                }
            """,
            expected = """
                TRANSFORM Main {
                    OUTPUT {
                    alpha: input.alpha,
                    beta: input.beta,
                    gamma: input.gamma,
                    delta: input.delta,
                    epsilon: input.epsilon,
                    zeta: input.zeta
                }
                }
            """,
        ),
    )

    private fun fixture(
        id: String,
        source: String,
        expected: String,
    ): NormalizationFixture = NormalizationFixture(
        id = id,
        source = source.trimIndent(),
        expected = expected.trimIndent() + "\n",
    )
}
