package v2.std

import java.math.BigDecimal
import java.math.BigInteger
import java.util.LinkedHashMap
import kotlin.toBigDecimal

internal fun asIndex(x: Any?): Int = when (x) {
    is Int -> x
    is Long -> {
        require(x in 0..Int.MAX_VALUE.toLong()) { "Index $x out of bounds" }
        x.toInt()
    }
    is BigInteger -> {
        require(x.signum() >= 0 && x <= BigInteger.valueOf(Int.MAX_VALUE.toLong())) { "Index $x out of bounds" }
        x.toInt()
    }
    else -> error("Index must be integer for list")
}

internal fun asObjectKey(x: Any?): Any = when (x) {
    is String -> x
    is Int -> {
        require(x >= 0) { "Object key must be non-negative" }
        x
    }
    is Long -> {
        require(x >= 0) { "Object key must be non-negative" }
        x
    }
    is BigInteger -> {
        require(x.signum() >= 0) { "Object key must be non-negative" }
        x
    }
    else -> error("Object key must be string or non-negative integer")
}

internal fun clonePut(map: Map<*, *>, key: Any, value: Any?): java.util.LinkedHashMap<Any, Any?> =
    LinkedHashMap<Any, Any?>(map.size + if (map.containsKey(key)) 0 else 1).apply {
        for ((k, v) in map) this[k!!] = v
        this[key] = value
    }

internal fun cloneDelete(map: Map<*, *>, key: Any): LinkedHashMap<Any, Any?> =
    LinkedHashMap<Any, Any?>(map.size).apply { for ((k, v) in map) if (k != key) this[k!!] = v }

internal fun toBigDecimalSafe(n: Number): BigDecimal = when (n) {
    is BigDecimal -> n
    is BigInteger -> n.toBigDecimal()
    is Long -> BigDecimal.valueOf(n)
    is Int -> BigDecimal.valueOf(n.toLong())
    is Double -> BigDecimal.valueOf(n)
    else -> BigDecimal(n.toString())
}

internal fun compareAny(a: Any?, b: Any?): Int = when {
    a is Number && b is Number -> toBigDecimalSafe(a).compareTo(toBigDecimalSafe(b))
    a is String && b is String -> a.compareTo(b)
    a is Boolean && b is Boolean -> a.compareTo(b)
    else -> a.toString().compareTo(b.toString())
}
