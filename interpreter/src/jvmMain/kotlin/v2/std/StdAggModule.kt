package v2.std

import java.math.BigDecimal

class StdAggModule : StdModule {
    override fun register(r: StdRegistry) {
        r.fn("LENGTH", ::fnLENGTH)
        r.fn("COUNT", ::fnLENGTH)
        r.fn("SUM", ::fnSUM)
        r.fn("AVG", ::fnAVG)
        r.fn("MIN", ::fnMIN)
        r.fn("MAX", ::fnMAX)
    }
}

private fun fnLENGTH(args: List<Any?>): Any {
    require(args.size == 1) { "LENGTH(x)" }
    return when (val v = args[0]) {
        is String -> v.length
        is List<*> -> v.size
        is Map<*, *> -> v.size
        null -> 0
        else -> error("LENGTH: unsupported type ${v::class.simpleName}")
    }
}

private fun fnSUM(args: List<Any?>): Any {
    require(args.size == 1) { "SUM(listOfNumbers)" }
    val xs = args[0] as? List<*> ?: error("SUM: arg must be list")
    var acc = BigDecimal.ZERO
    xs.forEach {
        require(it is Number) { "SUM: all elements must be numbers" }
        acc = acc.add(toBigDecimalSafe(it))
    }
    return acc
}

private fun fnAVG(args: List<Any?>): Any? {
    require(args.size == 1) { "AVG(listOfNumbers)" }
    val xs = args[0] as? List<*> ?: error("AVG: arg must be list")
    if (xs.isEmpty()) return null
    var acc = BigDecimal.ZERO
    xs.forEach {
        require(it is Number) { "AVG: all elements must be numbers" }
        acc = acc.add(toBigDecimalSafe(it))
    }
    return acc.divide(BigDecimal.valueOf(xs.size.toLong()))
}

private fun fnMIN(args: List<Any?>): Any? {
    require(args.size == 1) { "MIN(list)" }
    val xs = args[0] as? List<*> ?: error("MIN: arg must be list")
    if (xs.isEmpty()) return null
    return xs.minWithOrNull { a, b -> compareAny(a, b) }
}

private fun fnMAX(args: List<Any?>): Any? {
    require(args.size == 1) { "MAX(list)" }
    val xs = args[0] as? List<*> ?: error("MAX: arg must be list")
    if (xs.isEmpty()) return null
    return xs.maxWithOrNull { a, b -> compareAny(a, b) }
}
