package io.github.ehlyzov.branchline.cli

import io.github.ehlyzov.branchline.json.JsonNumberMode
import kotlin.test.Test
import kotlin.test.assertEquals

class ConversionLossAuditTest {
    @Test
    fun jsonOutputWarningsAuditNestedValuesOnceInWarningOrder() {
        val nested = CountingMap(
            listOf(
                "z" to byteArrayOf(1, 2, 3),
                "a" to 9_007_199_254_740_993L,
            ),
        )
        val output = mapOf(
            "outer" to listOf(
                mapOf("stable" to true),
                nested,
            ),
        )

        val warnings = collectOutputConversionWarnings(
            value = output,
            format = OutputFormat.JSON_CANONICAL,
            jsonNumberMode = JsonNumberMode.EXTENDED,
        )

        assertEquals(
            listOf(
                WARN_JSON_BYTES_AS_BASE64,
                WARN_JSON_EXTENDED_PRECISION,
                WARN_JSON_CANONICAL_KEY_REORDER,
            ),
            warnings,
        )
        assertEquals(1, nested.valueIterations)
    }
}

private class CountingMap(
    entries: List<Pair<String, Any?>>,
) : Map<String, Any?> {
    private val backing = linkedMapOf<String, Any?>().apply {
        for ((key, value) in entries) {
            this[key] = value
        }
    }

    var valueIterations: Int = 0
        private set

    override val entries: Set<Map.Entry<String, Any?>>
        get() = backing.entries
    override val keys: Set<String>
        get() = backing.keys
    override val size: Int
        get() = backing.size
    override val values: Collection<Any?>
        get() = object : AbstractCollection<Any?>() {
            override val size: Int
                get() = backing.size

            override fun iterator(): Iterator<Any?> {
                valueIterations += 1
                return backing.values.iterator()
            }
        }

    override fun containsKey(key: String): Boolean = backing.containsKey(key)

    override fun containsValue(value: Any?): Boolean = backing.containsValue(value)

    override fun get(key: String): Any? = backing[key]

    override fun isEmpty(): Boolean = backing.isEmpty()
}
