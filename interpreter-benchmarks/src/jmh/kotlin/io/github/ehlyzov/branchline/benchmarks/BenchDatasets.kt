package io.github.ehlyzov.branchline.benchmarks

import io.github.ehlyzov.branchline.COMPAT_INPUT_ALIASES
import io.github.ehlyzov.branchline.DEFAULT_INPUT_ALIAS
import kotlinx.collections.immutable.persistentListOf
import kotlinx.collections.immutable.persistentMapOf
import kotlinx.collections.immutable.toPersistentList
import kotlinx.collections.immutable.toPersistentMap

public enum class DatasetSize(
    public val orders: Int,
    public val itemsPerOrder: Int,
) {
    SMALL(10, 5),
    MEDIUM(100, 10),
    LARGE(500, 25),
}

public object BenchDatasets {
    public fun buildInput(size: DatasetSize): Map<String, Any?> {
        val orders = buildOrders(size.orders, size.itemsPerOrder)
        return linkedMapOf(
            "customer" to linkedMapOf(
                "name" to "Customer-${size.name.lowercase()}",
                "segment" to "B2B",
            ),
            "orders" to orders,
        )
    }

    public fun buildEnv(input: Map<String, Any?>): MutableMap<String, Any?> {
        return HashMap<String, Any?>().apply {
            this[DEFAULT_INPUT_ALIAS] = input
            putAll(input)
            for (alias in COMPAT_INPUT_ALIASES) {
                this[alias] = input
            }
        }
    }

    /**
     * Recursively convert a Map/List tree into kotlinx persistent collections.
     * Used by read-overhead probes so the same Branchline transform can run
     * over hash-backed and persistent-backed inputs without code changes.
     */
    public fun toPersistent(value: Any?): Any? = when (value) {
        is Map<*, *> -> {
            val converted = LinkedHashMap<Any?, Any?>(value.size)
            for ((k, v) in value) converted[k] = toPersistent(v)
            converted.toPersistentMap()
        }
        is List<*> -> {
            val converted = ArrayList<Any?>(value.size)
            for (item in value) converted.add(toPersistent(item))
            converted.toPersistentList()
        }
        else -> value
    }

    @Suppress("UNCHECKED_CAST")
    public fun toPersistentInput(input: Map<String, Any?>): Map<String, Any?> =
        toPersistent(input) as Map<String, Any?>
}

private fun buildOrders(orderCount: Int, itemsPerOrder: Int): List<Map<String, Any?>> {
    val orders = ArrayList<Map<String, Any?>>(orderCount)
    for (orderIndex in 0 until orderCount) {
        orders.add(buildOrder(orderIndex, itemsPerOrder))
    }
    return orders
}

private fun buildOrder(orderIndex: Int, itemsPerOrder: Int): Map<String, Any?> {
    val items = ArrayList<Map<String, Any?>>(itemsPerOrder)
    for (itemIndex in 0 until itemsPerOrder) {
        items.add(buildItem(orderIndex, itemIndex))
    }
    return linkedMapOf(
        "id" to orderIndex,
        "total" to (50 + (orderIndex % 250)),
        "status" to if (orderIndex % 2 == 0) "OPEN" else "PAID",
        "items" to items,
    )
}

private fun buildItem(orderIndex: Int, itemIndex: Int): Map<String, Any?> {
    return linkedMapOf(
        "sku" to "SKU-$orderIndex-$itemIndex",
        "qty" to (1 + (itemIndex % 5)),
        "price" to (10 + (itemIndex % 25)),
    )
}
