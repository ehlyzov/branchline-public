package v2.std

import java.util.LinkedHashMap
import java.util.ServiceLoader

typealias StdFn = (List<Any?>) -> Any?

class StdRegistry internal constructor() {
    private val map = LinkedHashMap<String, StdFn>()
    fun fn(name: String, impl: StdFn) {
        require(name.isNotBlank()) { "Std fn name must be non-blank" }
        require(map.putIfAbsent(name, impl) == null) { "Std fn '$name' already defined" }
    }
    internal fun build(): Map<String, StdFn> = map.toMap()
}

interface StdModule { fun register(r: StdRegistry) }

object StdLib {
    val fns: Map<String, StdFn> by lazy {
        val reg = StdRegistry()
        ServiceLoader.load(StdModule::class.java).forEach { it.register(reg) }
        reg.build()
    }
    val names: Set<String> get() = fns.keys
}

