package io.github.ehlyzov.branchline.cli

import io.github.ehlyzov.branchline.BranchlineFacade
import io.github.ehlyzov.branchline.BranchlineInspectRequest
import java.io.ByteArrayOutputStream
import java.io.PrintStream
import java.nio.charset.StandardCharsets
import java.nio.file.Files
import java.nio.file.Path
import kotlin.io.path.readText
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

public class CliIntegrationTest {
    @Test
    fun blRunsFixtureAndEmitsExpectedOutput() {
        val scriptPath = fixturePath("hello.bl")
        val inputPath = fixturePath("input.json")
        val expected = parseJsonInput(fixturePath("expected.json").readText())

        val result = runCli(
            args = listOf(
                scriptPath.toString(),
                "--input",
                inputPath.toString(),
                "--output-format",
                "json-compact",
            ),
        )

        assertEquals(ExitCode.SUCCESS.code, result.exitCode)
        val output = parseJsonInput(result.stdout)
        assertEquals(expected, output)
    }

    @Test
    fun blcCompilesArtifactFromFixture() {
        val scriptPath = fixturePath("hello.bl")
        val outputPath = Files.createTempFile("branchline-cli", ".blc")
        try {
            val result = runCli(
                args = listOf(
                    scriptPath.toString(),
                    "--output",
                    outputPath.toString(),
                    "--output-format",
                    "json-compact",
                ),
                defaultCommand = CliCommand.COMPILE,
            )

            assertEquals(ExitCode.SUCCESS.code, result.exitCode)
            val artifactRaw = Files.readString(outputPath, StandardCharsets.UTF_8)
            val artifact = ArtifactCodec.decode(artifactRaw)
            val expectedScript = scriptPath.readText().trim()
            assertEquals("Hello", artifact.transform)
            assertEquals(expectedScript, artifact.script.trim())
        } finally {
            Files.deleteIfExists(outputPath)
        }
    }

    @Test
    fun blvmExecutesCompiledArtifact() {
        val scriptPath = fixturePath("hello.bl")
        val inputPath = fixturePath("input.json")
        val expected = parseJsonInput(fixturePath("expected.json").readText())
        val outputPath = Files.createTempFile("branchline-cli", ".blc")
        try {
            val compileResult = runCli(
                args = listOf(
                    scriptPath.toString(),
                    "--output",
                    outputPath.toString(),
                ),
                defaultCommand = CliCommand.COMPILE,
            )
            assertEquals(ExitCode.SUCCESS.code, compileResult.exitCode)

            val execResult = runCli(
                args = listOf(
                    outputPath.toString(),
                    "--input",
                    inputPath.toString(),
                    "--output-format",
                    "json-compact",
                ),
                defaultCommand = CliCommand.EXECUTE,
            )

            assertEquals(ExitCode.SUCCESS.code, execResult.exitCode)
            val output = parseJsonInput(execResult.stdout)
            assertEquals(expected, output)
        } finally {
            Files.deleteIfExists(outputPath)
        }
    }

    @Test
    fun errorFormatJsonIncludesExitCode() {
        val result = runCli(
            args = listOf(
                "--error-format",
                "json",
            ),
        )

        assertEquals(ExitCode.USAGE.code, result.exitCode)
        val errorJson = Json.parseToJsonElement(result.stderr).jsonObject
        val error = errorJson["error"]?.jsonObject
        requireNotNull(error)
        assertEquals("usage", error["kind"]?.jsonPrimitive?.content)
        assertEquals(
            ExitCode.USAGE.code.toString(),
            error["exitCode"]?.jsonPrimitive?.content,
        )
    }

    @Test
    fun errorFormatJsonIncludesMutationRuntimeDiagnostic() {
        val script = """
            TRANSFORM Main {
                LET xs = {}
                xs += 1
                OUTPUT xs
            }
        """.trimIndent()
        val scriptPath = Files.createTempFile("branchline-runtime-diagnostic", ".bl")
        Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

        val result = runCli(
            args = listOf(
                "--error-format",
                "json",
                scriptPath.toString(),
            ),
        )

        assertEquals(ExitCode.RUNTIME.code, result.exitCode)
        val error = Json.parseToJsonElement(result.stderr).jsonObject["error"]?.jsonObject
            ?: error("missing error")
        val diagnostic = error["diagnostic"]?.jsonObject ?: error("missing diagnostic")
        assertEquals("mutation_plus_assign_wrong_kind", diagnostic["code"]?.jsonPrimitive?.content)
        assertEquals("runtime", diagnostic["category"]?.jsonPrimitive?.content)
        assertEquals("+=", diagnostic["payload"]?.jsonObject?.get("operation")?.jsonPrimitive?.content)
        assertEquals("object", diagnostic["payload"]?.jsonObject?.get("actualKind")?.jsonPrimitive?.content)
    }

    @Test
    fun inspectContractsJsonUsesLatestCanonicalShape() {
        val script = """
            TRANSFORM Main {
                OUTPUT { greeting: "hi " + input.name }
            }
        """.trimIndent()
        val scriptPath = Files.createTempFile("branchline-inspect", ".bl")
        Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

        val result = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts-json",
            ),
        )

        assertEquals(ExitCode.SUCCESS.code, result.exitCode)
        val payload = Json.parseToJsonElement(result.stdout).jsonObject
        assertEquals("true", payload["success"]?.jsonPrimitive?.content)
        assertEquals("COMPATIBLE", payload["subsetCompatibility"]?.jsonPrimitive?.content)
        assertTrue(payload["diagnostics"]?.jsonArray?.isEmpty() == true)
        assertTrue(payload["warnings"]?.jsonArray?.isEmpty() == true)
        assertTrue(payload["featureUsage"]?.jsonObject?.containsKey("features") == true)
        assertTrue(payload["transforms"]?.jsonArray?.isNotEmpty() == true)
        assertTrue(payload.containsKey("normalizedSource"))
        assertEquals(JsonNull, payload["normalizedSource"])
        assertTrue(!payload.containsKey("version"))
        assertTrue(payload.containsKey("input"))
        assertTrue(payload.containsKey("output"))
    }

    @Test
    fun inspectContractsJsonRejectsUnknownLegacyOption() {
        val script = """
            TRANSFORM Main {
                OUTPUT { greeting: "hi " + input.name }
            }
        """.trimIndent()
        val scriptPath = Files.createTempFile("branchline-inspect", ".bl")
        Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

        val result = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts-json",
                "--contracts-legacy",
            ),
        )

        assertEquals(ExitCode.USAGE.code, result.exitCode)
        assertTrue(result.stderr.contains("Unknown option '--contracts-legacy'"))
    }

    @Test
    fun inspectContractsJsonRejectsDeprecatedVersionSwitch() {
        val script = """
            TRANSFORM Main {
                OUTPUT { greeting: "hi " + input.name }
            }
        """.trimIndent()
        val scriptPath = Files.createTempFile("branchline-inspect", ".bl")
        Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

        val result = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts-json",
                "--contracts-json-version",
                "legacy",
            ),
        )

        assertEquals(ExitCode.USAGE.code, result.exitCode)
        assertTrue(result.stderr.contains("Unknown option '--contracts-json-version'"))
    }

    @Test
    fun inspectContractsJsonWitnessIncludesInputAndOutput() {
        val script = """
            TRANSFORM Main {
                OUTPUT { greeting: "hi " + input.name }
            }
        """.trimIndent()
        val scriptPath = Files.createTempFile("branchline-inspect", ".bl")
        Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

        val result = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts-json",
                "--contracts-witness",
            ),
        )

        assertEquals(ExitCode.SUCCESS.code, result.exitCode)
        val payload = Json.parseToJsonElement(result.stdout).jsonObject
        val witness = payload["witness"]?.jsonObject ?: error("missing witness")
        assertTrue(witness.containsKey("input"))
        assertTrue(witness.containsKey("output"))
    }

    @Test
    fun inspectContractsJsonShowsOriginOnlyInDebugMode() {
        val script = """
            TRANSFORM Main {
                OUTPUT { greeting: "hi " + input.name }
            }
        """.trimIndent()
        val scriptPath = Files.createTempFile("branchline-inspect", ".bl")
        Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

        val standard = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts-json",
            ),
        )
        val debug = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts-json",
                "--contracts-debug",
            ),
        )

        assertEquals(ExitCode.SUCCESS.code, standard.exitCode)
        assertEquals(ExitCode.SUCCESS.code, debug.exitCode)

        val standardPayload = Json.parseToJsonElement(standard.stdout).jsonObject
        val debugPayload = Json.parseToJsonElement(debug.stdout).jsonObject
        val standardOutputRoot = standardPayload["output"]?.jsonObject?.get("root")?.jsonObject
            ?: error("missing standard output root")
        val debugOutputRoot = debugPayload["output"]?.jsonObject?.get("root")?.jsonObject
            ?: error("missing debug output root")

        assertTrue(!standardOutputRoot.containsKey("origin"))
        assertEquals("OUTPUT", debugOutputRoot["origin"]?.jsonPrimitive?.content)
        assertTrue(!standardOutputRoot.containsKey("evidence"))
        assertTrue(!debugOutputRoot.containsKey("evidence"))
    }

    @Test
    fun inspectTextShowsSubsetCompatibilityAndFeatureUsage() {
        val script = """
            TRANSFORM Main {
                LET greeting = "hi " + input.name;
                OUTPUT { greeting: greeting }
            }
        """.trimIndent()
        val scriptPath = Files.createTempFile("branchline-inspect-text", ".bl")
        Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

        val result = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts",
            ),
        )

        assertEquals(ExitCode.SUCCESS.code, result.exitCode)
        assertTrue(result.stdout.contains("Subset compatibility: COMPATIBLE"))
        assertTrue(result.stdout.contains("Feature usage:"))
        assertTrue(result.stdout.contains("let"))
        assertTrue(result.stdout.contains("output"))
    }

    @Test
    fun inspectNormalizedTextIncludesNormalizedSourceForCompatibleProgram() {
        val script = """
            TRANSFORM Main {
                LET greeting = "hi " + row.name;
                OUTPUT { greeting: greeting }
            }
        """.trimIndent()
        val scriptPath = Files.createTempFile("branchline-inspect-norm", ".bl")
        Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

        val result = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts",
                "--normalized",
            ),
        )

        assertEquals(ExitCode.SUCCESS.code, result.exitCode)
        assertTrue(result.stdout.contains("Normalized source:"))
        assertTrue(result.stdout.contains("input.name"))
        assertTrue(!result.stdout.contains("row.name"))
        assertTrue(!result.stdout.contains(";"))
    }

    @Test
    fun inspectNormalizedJsonAddsNormalizedSourceField() {
        val script = """
            TRANSFORM Main {
                OUTPUT { greeting: "hi " + input.name }
            }
        """.trimIndent()
        val scriptPath = Files.createTempFile("branchline-inspect-norm-json", ".bl")
        Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

        val result = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts-json",
                "--normalized",
            ),
        )

        assertEquals(ExitCode.SUCCESS.code, result.exitCode)
        val payload = Json.parseToJsonElement(result.stdout).jsonObject
        assertEquals("true", payload["success"]?.jsonPrimitive?.content)
        assertEquals("COMPATIBLE", payload["subsetCompatibility"]?.jsonPrimitive?.content)
        assertTrue(payload["transforms"]?.jsonArray?.isNotEmpty() == true)
        assertTrue(payload.containsKey("input"))
        assertTrue(payload.containsKey("output"))
        val normalized = payload["normalizedSource"]?.jsonPrimitive?.content
            ?: error("missing normalizedSource")
        assertTrue(normalized.contains("TRANSFORM Main"))
        assertTrue(normalized.contains("OUTPUT"))
    }

    @Test
    fun inspectContractsJsonWithoutNormalizedFlagUsesNullNormalizedSource() {
        val script = """
            TRANSFORM Main {
                OUTPUT { greeting: "hi " + input.name }
            }
        """.trimIndent()
        val scriptPath = Files.createTempFile("branchline-inspect-norm-omit", ".bl")
        Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

        val result = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts-json",
            ),
        )

        assertEquals(ExitCode.SUCCESS.code, result.exitCode)
        val payload = Json.parseToJsonElement(result.stdout).jsonObject
        assertTrue(payload.containsKey("normalizedSource"))
        assertEquals(JsonNull, payload["normalizedSource"])
    }

    @Test
    fun inspectContractsJsonEnvelopeReportsIncompatibleSubset() {
        val script = """
            SHARED cache SINGLE

            TRANSFORM Main {
                LET value = AWAIT cache.user
                OUTPUT { value: value }
            }
        """.trimIndent()
        val scriptPath = Files.createTempFile("branchline-inspect-envelope-incompat", ".bl")
        Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

        val result = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts-json",
                "--normalized",
            ),
        )

        assertEquals(ExitCode.SUCCESS.code, result.exitCode)
        val payload = Json.parseToJsonElement(result.stdout).jsonObject
        assertEquals("true", payload["success"]?.jsonPrimitive?.content)
        assertEquals("INCOMPATIBLE", payload["subsetCompatibility"]?.jsonPrimitive?.content)
        assertEquals(JsonNull, payload["normalizedSource"])
        val diagnostics = payload["diagnostics"]?.jsonArray ?: error("missing diagnostics")
        assertTrue(diagnostics.isNotEmpty())
        assertTrue(
            diagnostics.any {
                it.jsonObject["code"]?.jsonPrimitive?.content == "unsupported_in_ai_subset"
            },
        )
    }

    @Test
    fun inspectContractsJsonEnvelopeReportsParseErrors() {
        val script = """
            TRANSFORM Main {
                OUTPUT {
            }
        """.trimIndent()
        val scriptPath = Files.createTempFile("branchline-inspect-envelope-parse", ".bl")
        Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

        val result = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts-json",
                "--normalized",
            ),
        )

        assertEquals(ExitCode.RUNTIME.code, result.exitCode)
        val payload = Json.parseToJsonElement(result.stdout).jsonObject
        assertEquals("false", payload["success"]?.jsonPrimitive?.content)
        assertEquals("UNKNOWN", payload["subsetCompatibility"]?.jsonPrimitive?.content)
        assertEquals(JsonNull, payload["normalizedSource"])
        assertTrue(payload["transforms"]?.jsonArray?.isEmpty() == true)
        val diagnostic = payload["diagnostics"]?.jsonArray?.firstOrNull()?.jsonObject
            ?: error("missing parse diagnostic")
        assertEquals("parse_error", diagnostic["code"]?.jsonPrimitive?.content)
        assertEquals("syntax", diagnostic["category"]?.jsonPrimitive?.content)
        assertEquals("parse", diagnostic["payload"]?.jsonObject?.get("operation")?.jsonPrimitive?.content)
    }

    @Test
    fun inspectContractsJsonMatchesFacadeEnvelope() {
        val script = """
            TRANSFORM Main {
                LET greeting = "hi " + row.name
                OUTPUT { greeting: greeting }
            }
        """.trimIndent()
        val scriptPath = Files.createTempFile("branchline-inspect-facade-envelope", ".bl")
        Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

        val result = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts-json",
                "--normalized",
            ),
        )

        assertEquals(ExitCode.SUCCESS.code, result.exitCode)
        val cliPayload = Json.parseToJsonElement(result.stdout)
        val facadePayload = Json.parseToJsonElement(
            BranchlineFacade.inspect(
                BranchlineInspectRequest(
                    programText = script,
                    includeNormalizedSource = true,
                ),
            ).inspectJson(),
        )
        assertEquals(facadePayload, cliPayload)
    }

    @Test
    fun inspectContractsJsonDoesNotLeakLocalPathOrUnrelatedSecrets() {
        val userHome = System.getProperty("user.home")
        val secret = "sk_live_should_not_leak_123456"
        val script = """
            TRANSFORM Main {
                LET token = "$secret"
                OUTPUT {
            }
        """.trimIndent()
        val dir = Files.createTempDirectory(Path.of(userHome), "branchline-inspect-secret-path-")
        val scriptPath = dir.resolve("program-with-secret.bl")
        try {
            Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

            val result = runCli(
                args = listOf(
                    "inspect",
                    scriptPath.toString(),
                    "--contracts-json",
                    "--normalized",
                ),
            )

            assertEquals(ExitCode.RUNTIME.code, result.exitCode)
            val payload = Json.parseToJsonElement(result.stdout).jsonObject
            assertEquals("false", payload["success"]?.jsonPrimitive?.content)
            assertTrue(!result.stdout.contains(scriptPath.toString()))
            assertTrue(!result.stdout.contains(userHome))
            assertTrue(!result.stdout.contains(secret))
            System.getenv().values
                .filter { it.length >= 12 }
                .take(10)
                .forEach { envValue ->
                    assertTrue(!result.stdout.contains(envValue))
                }
        } finally {
            Files.deleteIfExists(scriptPath)
            Files.deleteIfExists(dir)
        }
    }

    @Test
    fun inspectNormalizedOnIncompatibleProgramOmitsNormalizedSection() {
        val script = """
            SHARED cache SINGLE

            TRANSFORM Main {
                LET value = AWAIT cache.user;
                OUTPUT { value: value }
            }
        """.trimIndent()
        val scriptPath = Files.createTempFile("branchline-inspect-norm-incompat", ".bl")
        Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

        val result = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts",
                "--normalized",
            ),
        )

        assertEquals(ExitCode.SUCCESS.code, result.exitCode)
        assertTrue(result.stdout.contains("Subset compatibility: INCOMPATIBLE"))
        assertTrue(result.stdout.contains("AI subset blockers:"))
        assertTrue(!result.stdout.contains("Normalized source:"))
    }

    @Test
    fun inspectTextShowsBlockingAiSubsetDiagnostics() {
        val script = """
            SHARED cache SINGLE

            TRANSFORM Main {
                LET value = AWAIT cache.user;
                OUTPUT { value: value }
            }
        """.trimIndent()
        val scriptPath = Files.createTempFile("branchline-inspect-shared", ".bl")
        Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

        val result = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts",
            ),
        )

        assertEquals(ExitCode.SUCCESS.code, result.exitCode)
        assertTrue(result.stdout.contains("Subset compatibility: INCOMPATIBLE"))
        assertTrue(result.stdout.contains("AI subset blockers:"))
        assertTrue(result.stdout.contains("SHARED"))
        assertTrue(result.stdout.contains("AWAIT"))
    }

    @Test
    fun inspectContractsJsonHidesObligationInferenceMetadataWithoutDebug() {
        val script = """
            TRANSFORM Main {
                LET root = input.testsuites ?? input.testsuite ?? {};
                OUTPUT { status: root["@name"] ?? "missing" }
            }
        """.trimIndent()
        val scriptPath = Files.createTempFile("branchline-inspect", ".bl")
        Files.writeString(scriptPath, script, StandardCharsets.UTF_8)

        val standard = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts-json",
            ),
        )
        val debug = runCli(
            args = listOf(
                "inspect",
                scriptPath.toString(),
                "--contracts-json",
                "--contracts-debug",
            ),
        )

        assertEquals(ExitCode.SUCCESS.code, standard.exitCode)
        assertEquals(ExitCode.SUCCESS.code, debug.exitCode)

        val standardPayload = Json.parseToJsonElement(standard.stdout).jsonObject
        val debugPayload = Json.parseToJsonElement(debug.stdout).jsonObject

        val standardInputObligation = standardPayload["input"]?.jsonObject
            ?.get("obligations")?.jsonArray?.firstOrNull()?.jsonObject
            ?: error("missing standard obligation")
        val debugInputObligation = debugPayload["input"]?.jsonObject
            ?.get("obligations")?.jsonArray?.firstOrNull()?.jsonObject
            ?: error("missing debug obligation")

        assertTrue(!standardInputObligation.containsKey("confidence"))
        assertTrue(!standardInputObligation.containsKey("ruleId"))
        assertTrue(!standardInputObligation.containsKey("heuristic"))
        assertTrue(debugInputObligation.containsKey("confidence"))
        assertTrue(debugInputObligation.containsKey("ruleId"))
        assertTrue(debugInputObligation.containsKey("heuristic"))
    }

    private fun runCli(args: List<String>, defaultCommand: CliCommand? = null): CliRunResult {
        val stdoutStream = ByteArrayOutputStream()
        val stderrStream = ByteArrayOutputStream()
        val originalOut = System.out
        val originalErr = System.err
        try {
            System.setOut(PrintStream(stdoutStream, true, StandardCharsets.UTF_8))
            System.setErr(PrintStream(stderrStream, true, StandardCharsets.UTF_8))
            val exitCode = BranchlineCli.run(args, PlatformKind.JVM, defaultCommand)
            return CliRunResult(
                exitCode = exitCode,
                stdout = stdoutStream.toString(StandardCharsets.UTF_8),
                stderr = stderrStream.toString(StandardCharsets.UTF_8),
            )
        } finally {
            System.setOut(originalOut)
            System.setErr(originalErr)
        }
    }

    private fun fixturePath(name: String): Path {
        val url = requireNotNull(javaClass.getResource("/fixtures/cli/$name"))
        return Path.of(url.toURI())
    }

    private data class CliRunResult(
        val exitCode: Int,
        val stdout: String,
        val stderr: String,
    )
}
