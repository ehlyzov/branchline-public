package v2.ir

import v2.FuncDecl
import v2.Mode
import v2.TransformDecl

actual class TransformRegistry actual constructor(
    private val funcs: Map<String, FuncDecl>,
    private val hostFns: Map<String, (List<Any?>) -> Any?>,
    private val transforms: Map<String, TransformDecl>,
) {
    private val cache = mutableMapOf<String, (Map<String, Any?>) -> Any?>()

    actual fun get(name: String): (Map<String, Any?>) -> Any? =
        cache.getOrPut(name) {
            val decl = transforms[name] ?: error("Transform '$name' not found")
            require(decl.mode == Mode.STREAM) { "Only stream mode yet" }
            val ir = ToIR(funcs, hostFns).compile(decl.body.statements)
            val evalFn = makeEval(hostFns, funcs, this)
            val exec = Exec(ir, evalFn)
            val runner: (Map<String, Any?>) -> Any? = { input: Map<String, Any?> ->
                val env = HashMap<String, Any?>().apply {
                    this["row"] = input
                    putAll(input)
                }
                val produced = exec.run(env)
                produced ?: error("No OUTPUT")
            }
            runner
        }

    actual fun getOrNull(name: String): ((Map<String, Any?>) -> Any?)? =
        if (transforms.containsKey(name)) get(name) else null

    actual fun exists(name: String): Boolean = transforms.containsKey(name)
}
