package io.github.ehlyzov.branchline.ir

public class Env(
    private val locals: MutableMap<String, Any?> = LinkedHashMap(),
    private val parent: Env? = null,
) {
    public fun get(name: String): Any? {
        var current: Env? = this
        while (current != null) {
            val v = current.locals.getOrElse(name) { MISSING }
            if (v !== MISSING) return v
            current = current.parent
        }
        return null
    }

    public fun getLocal(name: String): Any? = locals[name]

    public fun contains(name: String): Boolean {
        var current: Env? = this
        while (current != null) {
            if (current.locals.containsKey(name)) return true
            current = current.parent
        }
        return false
    }

    public fun resolveScope(name: String): Env? {
        var current: Env? = this
        while (current != null) {
            if (current.locals.containsKey(name)) return current
            current = current.parent
        }
        return null
    }

    public fun setLocal(name: String, value: Any?) {
        locals[name] = value
    }

    public fun setExisting(name: String, value: Any?): Boolean {
        val scope = resolveScope(name) ?: return false
        scope.locals[name] = value
        return true
    }

    public fun setOrDefine(name: String, value: Any?) {
        if (!setExisting(name, value)) {
            locals[name] = value
        }
    }

    public fun removeLocal(name: String) {
        locals.remove(name)
    }

    private companion object {
        private val MISSING: Any = Any()
    }
}
