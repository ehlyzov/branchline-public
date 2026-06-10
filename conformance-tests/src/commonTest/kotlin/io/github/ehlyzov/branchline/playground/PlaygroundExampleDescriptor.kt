package io.github.ehlyzov.branchline.playground

import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import io.github.ehlyzov.branchline.json.JsonNumberMode
import io.github.ehlyzov.branchline.json.toJsonElement
import kotlin.math.abs

internal data class PlaygroundExampleDescriptor(
    val id: String?,
    val category: String?,
    val tags: List<String>,
    val aiSubset: String?,
    val expectedOutput: JsonElement?,
    val contractExpectation: JsonElement?,
    val diagnosticExpectation: JsonElement?,
)

internal val MigratedPlaygroundExampleIds: Set<String> = setOf(
    "hello-transform",
    "contract-empty-array-append",
    "junit-badge-summary",
    "contract-nullable-precision",
    "contract-literal-brackets-static",
    "order-shipment",
    "customer-profile",
    "stdlib-core-put-delete",
    "stdlib-hof-overview",
    "stdlib-debug-explain",
    "xml-output-ordering",
    "json-canonical-output",
    "transform-options",
    "shared-memory-read",
    "pipeline-health-gating",
    "contract-input-seeded-wildcard-output",
    "stdlib-core-walk",
)

internal fun playgroundExampleDescriptor(example: JsonObject): PlaygroundExampleDescriptor =
    PlaygroundExampleDescriptor(
        id = example.stringField("id"),
        category = example.stringField("category"),
        tags = example["tags"]?.stringArrayField().orEmpty(),
        aiSubset = example.stringField("aiSubset"),
        expectedOutput = example["expectedOutput"],
        contractExpectation = example["contractExpectation"],
        diagnosticExpectation = example["diagnosticExpectation"],
    )

internal fun validateMigratedPlaygroundExampleDescriptor(
    exampleId: String,
    descriptor: PlaygroundExampleDescriptor,
): List<String> {
    if (exampleId !in MigratedPlaygroundExampleIds) return emptyList()

    val failures = mutableListOf<String>()
    if (descriptor.id != exampleId) {
        failures += "id must match filename '$exampleId'"
    }
    if (descriptor.category.isNullOrBlank()) {
        failures += "category is required"
    } else if (!descriptor.category.matches(MetadataTokenRegex)) {
        failures += "category '${descriptor.category}' must use lowercase kebab-case"
    }
    if (descriptor.tags.isEmpty()) {
        failures += "tags must contain at least one tag"
    }
    descriptor.tags.forEach { tag ->
        if (!tag.matches(MetadataTokenRegex)) {
            failures += "tag '$tag' must use lowercase kebab-case"
        }
    }
    if (descriptor.tags.distinct().size != descriptor.tags.size) {
        failures += "tags must be unique"
    }
    val aiSubset = descriptor.aiSubset
    if (aiSubset != null && aiSubset !in AiSubsetValues) {
        failures += "aiSubset '$aiSubset' must be one of ${AiSubsetValues.joinToString()}"
    }
    return failures
}

internal fun countPlaygroundExampleExpectations(descriptors: Iterable<PlaygroundExampleDescriptor>): Int =
    descriptors.count { descriptor ->
        descriptor.expectedOutput != null ||
            descriptor.contractExpectation != null ||
            descriptor.diagnosticExpectation != null
    }

internal fun assertMinimumPlaygroundExampleExpectations(
    descriptors: Iterable<PlaygroundExampleDescriptor>,
    minimum: Int = 10,
) {
    val actual = countPlaygroundExampleExpectations(descriptors)
    check(actual >= minimum) {
        "Playground migrated examples must define at least $minimum expectation fields; found $actual"
    }
}

internal fun nonCanonicalAiCompatibleExampleWarnings(
    exampleId: String,
    descriptor: PlaygroundExampleDescriptor,
    source: String,
    normalizedSource: String?,
): List<String> {
    if (descriptor.aiSubset != "compatible") return emptyList()

    val reason = when {
        normalizedSource == null -> "ai-compatible-normalized-source-unavailable"
        source.canonicalSourceText() != normalizedSource.canonicalSourceText() ->
            "ai-compatible-source-differs-from-normalized-source"
        else -> return emptyList()
    }
    return listOf("PLAYGROUND_EXAMPLE_WARNING id=$exampleId reason=$reason")
}

internal fun assertExpectedPlaygroundOutput(
    exampleId: String,
    expected: JsonElement?,
    actual: Any?,
) {
    if (expected == null) return
    val actualElement = toJsonElement(actual, JsonNumberMode.SAFE)
    assertJsonEquals("$exampleId.expectedOutput", expected, actualElement)
}

internal fun assertPlaygroundExpectationSubset(
    exampleId: String,
    field: String,
    expected: JsonElement?,
    actual: JsonElement,
) {
    if (expected == null) return
    assertJsonContains("$exampleId.$field", expected, actual)
}

private val MetadataTokenRegex = Regex("[a-z0-9]+(?:-[a-z0-9]+)*")
private val AiSubsetValues = setOf("compatible", "incompatible", "unknown")
private const val NumberTolerance = 0.000000001

private fun JsonObject.stringField(name: String): String? =
    (this[name] as? JsonPrimitive)?.contentOrNull

private fun JsonElement.stringArrayField(): List<String> =
    (this as? JsonArray)?.jsonArray?.mapNotNull { (it as? JsonPrimitive)?.contentOrNull }.orEmpty()

private fun assertJsonContains(path: String, expected: JsonElement, actual: JsonElement) {
    when (expected) {
        is JsonObject -> {
            val actualObject = actual as? JsonObject
                ?: error("$path expected object subset but actual was ${actual.kindName()}: $actual")
            expected.forEach { (key, expectedValue) ->
                val actualValue = actualObject[key]
                    ?: error("$path.$key expected value $expectedValue but field was missing")
                assertJsonContains("$path.$key", expectedValue, actualValue)
            }
        }

        is JsonArray -> {
            val actualArray = actual as? JsonArray
                ?: error("$path expected array subset but actual was ${actual.kindName()}: $actual")
            if (actualArray.size < expected.size) {
                error("$path expected at least ${expected.size} array entries but actual had ${actualArray.size}")
            }
            expected.forEachIndexed { index, expectedValue ->
                assertJsonContains("$path[$index]", expectedValue, actualArray[index])
            }
        }

        else -> assertJsonEquals(path, expected, actual)
    }
}

private fun assertJsonEquals(path: String, expected: JsonElement, actual: JsonElement) {
    when {
        expected is JsonObject && actual is JsonObject -> {
            val expectedKeys = expected.keys
            val actualKeys = actual.keys
            if (expectedKeys != actualKeys) {
                error("$path expected object keys $expectedKeys but actual keys were $actualKeys")
            }
            expected.forEach { (key, expectedValue) ->
                assertJsonEquals("$path.$key", expectedValue, actual.getValue(key))
            }
        }

        expected is JsonArray && actual is JsonArray -> {
            if (expected.size != actual.size) {
                error("$path expected array size ${expected.size} but actual size was ${actual.size}")
            }
            expected.forEachIndexed { index, expectedValue ->
                assertJsonEquals("$path[$index]", expectedValue, actual[index])
            }
        }

        expected is JsonPrimitive && actual is JsonPrimitive && expected.isJsonNumber() && actual.isJsonNumber() -> {
            val expectedNumber = expected.doubleOrNull
            val actualNumber = actual.doubleOrNull
            if (
                expectedNumber == null ||
                actualNumber == null ||
                abs(expectedNumber - actualNumber) > NumberTolerance
            ) {
                error("$path expected $expected but actual was $actual")
            }
        }

        expected != actual -> error("$path expected $expected but actual was $actual")
    }
}

private fun JsonElement.kindName(): String = when (this) {
    JsonNull -> "null"
    is JsonArray -> "array"
    is JsonObject -> "object"
    is JsonPrimitive -> "primitive"
}

private fun JsonPrimitive.isJsonNumber(): Boolean =
    !isString && doubleOrNull != null

private fun String.canonicalSourceText(): String =
    replace("\r\n", "\n").trim()
