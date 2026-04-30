package io.github.ehlyzov.branchline

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

public class BranchlineFacadeTest {
    @Test
    public fun inspectReturnsContractsAndFeatureSummary() {
        val program = """
            TRANSFORM Main {
                LET greeting = "Hello, " + input.name;
                OUTPUT { greeting: greeting }
            }
        """.trimIndent()

        val result = BranchlineFacade.inspect(
            BranchlineInspectRequest(
                programText = program,
                includeWitness = true,
            )
        )

        assertTrue(result.success)
        assertTrue(result.diagnostics.isEmpty())
        assertEquals(1, result.transforms.size)
        assertEquals("Main", result.transforms.single().name)
        assertEquals("inferred", result.transforms.single().contractSource)
        assertNotNull(result.transforms.single().inferredContract)
        assertNotNull(result.transforms.single().mergedContract)
        assertNotNull(result.transforms.single().witness)
        assertTrue(result.featureUsage.features.contains("let"))
        assertTrue(result.featureUsage.features.contains("output"))
        assertEquals(BranchlineSubsetCompatibility.COMPATIBLE, result.subsetCompatibility)
        assertNull(result.normalizedSource)
    }

    @Test
    public fun inspectMarksSharedProgramsAsIncompatibleWithAiSubset() {
        val program = """
            SHARED cache SINGLE

            TRANSFORM Main {
                LET value = AWAIT cache.user;
                OUTPUT { value: value }
            }
        """.trimIndent()

        val result = BranchlineFacade.inspect(
            BranchlineInspectRequest(programText = program)
        )

        assertTrue(result.success)
        assertEquals(BranchlineSubsetCompatibility.INCOMPATIBLE, result.subsetCompatibility)
        val unsupported = result.diagnostics.filter { it.code == "unsupported_in_ai_subset" }
        assertTrue(unsupported.isNotEmpty())
        assertTrue(unsupported.any { it.message.contains("SHARED") })
        assertTrue(unsupported.any { it.message.contains("AWAIT") })
    }

    @Test
    public fun inspectSelectsNamedTransform() {
        val program = """
            TRANSFORM First {
                OUTPUT { value: input.first }
            }

            TRANSFORM Second {
                OUTPUT { value: input.second }
            }
        """.trimIndent()

        val result = BranchlineFacade.inspect(
            BranchlineInspectRequest(
                programText = program,
                transformName = "Second",
            )
        )

        assertTrue(result.success)
        assertEquals(listOf("Second"), result.transforms.map { it.name })
    }

    @Test
    public fun inspectReportsParseDiagnosticsWithSpanAndCode() {
        val result = BranchlineFacade.inspect(
            BranchlineInspectRequest(
                programText = "TRANSFORM Main { OUTPUT { greeting: } }",
            )
        )

        assertTrue(!result.success)
        assertEquals(1, result.diagnostics.size)
        val diagnostic = result.diagnostics.single()
        assertEquals("parse_error", diagnostic.code)
        assertEquals(BranchlineDiagnosticSeverity.ERROR, diagnostic.severity)
        assertNotNull(diagnostic.span)
        assertTrue(diagnostic.message.isNotBlank())
    }

    @Test
    public fun inspectReportsSemanticDiagnosticsWithSpanAndCode() {
        val result = BranchlineFacade.inspect(
            BranchlineInspectRequest(
                programText = """
                    TRANSFORM Main {
                        OUTPUT { greeting: unknownName }
                    }
                """.trimIndent(),
            )
        )

        assertTrue(!result.success)
        assertEquals(1, result.diagnostics.size)
        val diagnostic = result.diagnostics.single()
        assertEquals("semantic_error", diagnostic.code)
        assertEquals(BranchlineDiagnosticSeverity.ERROR, diagnostic.severity)
        assertNotNull(diagnostic.span)
        assertTrue(diagnostic.message.contains("unknownName"))
    }

    @Test
    public fun inspectIncludesDebugMetadataOnlyWhenRequested() {
        val program = """
            TRANSFORM Main {
                OUTPUT { greeting: "hi " + input.name }
            }
        """.trimIndent()

        val standard = BranchlineFacade.inspect(
            BranchlineInspectRequest(programText = program)
        )
        val debug = BranchlineFacade.inspect(
            BranchlineInspectRequest(
                programText = program,
                includeDebugMetadata = true,
            )
        )

        assertTrue(standard.success)
        assertTrue(debug.success)

        val standardOutputRoot = standard.transforms.single().mergedContract
            .jsonObject["output"]!!.jsonObject["root"]!!.jsonObject
        val debugOutputRoot = debug.transforms.single().mergedContract
            .jsonObject["output"]!!.jsonObject["root"]!!.jsonObject

        assertTrue(!standardOutputRoot.containsKey("origin"))
        assertEquals("OUTPUT", debugOutputRoot["origin"]?.jsonPrimitive?.content)
    }

    @Test
    public fun inspectCanRenderCanonicalJsonPayloadForCli() {
        val result = BranchlineFacade.inspect(
            BranchlineInspectRequest(
                programText = """
                    TRANSFORM Main {
                        OUTPUT { greeting: "hi " + input.name }
                    }
                """.trimIndent(),
                includeWitness = true,
            )
        )

        assertTrue(result.success)
        val payload = Json.parseToJsonElement(result.contractsJson()).jsonObject
        assertEquals("Main", payload["name"]?.jsonPrimitive?.content)
        val witness = payload["witness"]?.jsonObject
        assertNotNull(witness)
        assertTrue(witness["input"] != null)
        assertTrue(witness["output"] != null)
    }

    @Test
    public fun inspectRendersMultipleTransformsPayloadWhenSelectionIsBroad() {
        val result = BranchlineFacade.inspect(
            BranchlineInspectRequest(
                programText = """
                    TRANSFORM First { OUTPUT { value: input.first } }
                    TRANSFORM Second { OUTPUT { value: input.second } }
                """.trimIndent(),
            )
        )

        assertTrue(result.success)
        val payload = Json.parseToJsonElement(result.contractsJson()).jsonObject
        val transforms = payload["transforms"]?.jsonArray
        assertNotNull(transforms)
        assertEquals(2, transforms.size)
    }
}
