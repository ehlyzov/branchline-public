package v2.std

class StdArraysModule : StdModule {
    override fun register(r: StdRegistry) {
        r.fn("DISTINCT", ::fnDISTINCT)
        r.fn("FLATTEN", ::fnFLATTEN)
        r.fn("SORT", ::fnSORT)
        r.fn("RANGE", ::fnRANGE)
        r.fn("ZIP", ::fnZIP)
    }
}

private fun fnDISTINCT(args: List<Any?>): Any {
    require(args.size == 1) { "DISTINCT(list)" }
    val src = args[0] as? List<*> ?: error("DISTINCT: arg must be list")
    val seen = LinkedHashSet<Any?>()
    src.forEach { if (!seen.contains(it)) seen.add(it) }
    return seen.toList()
}

private fun fnFLATTEN(args: List<Any?>): Any {
    require(args.size == 1) { "FLATTEN(listOfLists)" }
    val src = args[0] as? List<*> ?: error("FLATTEN: arg must be list")
    val out = ArrayList<Any?>()
    src.forEach { e -> if (e is List<*>) out.addAll(e) else out.add(e) }
    return out
}

private fun fnSORT(args: List<Any?>): Any {
    require(args.size == 1) { "SORT(list)" }
    val src = args[0] as? List<*> ?: error("SORT: arg must be list")
    return src.sortedWith { a, b -> compareAny(a, b) }
}

private fun fnRANGE(args: List<Any?>): Any {
    require(args.size in 1..3) { "RANGE(n) | RANGE(start, end[, step])" }
    val (start, end, step) = when (args.size) {
        1 -> Triple(0, asIndex(args[0]) - 1, 1)
        2 -> Triple(asIndex(args[0]), asIndex(args[1]), 1)
        else -> Triple(asIndex(args[0]), asIndex(args[1]), asIndex(args[2]).coerceAtLeast(1))
    }
    val out = ArrayList<Int>()
    if (step <= 0) error("RANGE: step must be > 0")
    var i = start
    if (start <= end) {
        while (i <= end) {
            out.add(i)
            i += step
        }
    } else {
        while (i >= end) {
            out.add(i)
            i -= step
        }
    }
    return out
}

private fun fnZIP(args: List<Any?>): Any {
    require(args.size == 2) { "ZIP(a, b)" }
    val a = args[0] as? List<*> ?: error("ZIP: first arg must be list")
    val b = args[1] as? List<*> ?: error("ZIP: second arg must be list")
    val n = minOf(a.size, b.size)
    return (0 until n).map { i -> listOf(a[i], b[i]) }
}
