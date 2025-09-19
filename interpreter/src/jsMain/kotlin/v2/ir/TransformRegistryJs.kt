package v2.ir

import v2.FuncDecl
import v2.TransformDecl

actual class TransformRegistry actual constructor(
    private val funcs: Map<String, FuncDecl>,
    private val hostFns: Map<String, (List<Any?>) -> Any?>,
    private val transforms: Map<String, TransformDecl>,
) {
    private val cache = mutableMapOf<String, (Map<String, Any?>) -> Any?>()

    actual fun get(name: String): (Map<String, Any?>) -> Any? =
        cache.getOrPut(name) {
            val decl = transforms[name]
                ?: error("Transform '$name' not found")
            // Compile TransformDecl body to IR and execute via Exec (interpreter-only)
            val ir = ToIR(funcs, hostFns).compile(decl.body.statements)
            val reg: TransformRegistry = this
            val evalFn: (v2.Expr, MutableMap<String, Any?>) -> Any? = makeEval(hostFns, funcs, reg)
            val executor = Exec(ir, evalFn)
            val runner: (Map<String, Any?>) -> Any? = { input: Map<String, Any?> ->
                val env = HashMap<String, Any?>().apply {
                    this["row"] = input
                    putAll(input)
                }
                val produced = executor.run(env)
                produced ?: error("No OUTPUT")
            }
            runner
        }

    actual fun getOrNull(name: String): ((Map<String, Any?>) -> Any?)? =
        if (transforms.containsKey(name)) get(name) else null

    actual fun exists(name: String): Boolean = transforms.containsKey(name)
}
