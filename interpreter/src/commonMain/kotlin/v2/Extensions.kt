package v2

fun <E>ArrayDeque<E>.peek() = firstOrNull()
fun <E>ArrayDeque<E>.push(x: E) = addFirst(x)
fun <E>ArrayDeque<E>.pop() = removeFirst()