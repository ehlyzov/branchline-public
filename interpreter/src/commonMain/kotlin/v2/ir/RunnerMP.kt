package v2.ir

import v2.FuncDecl
import v2.debug.Tracer

/**
 * Multiplatform-friendly helpers to run IR and build runners without relying on the VM or parser.
 */

/** Execute a list of IR nodes via the interpreter (Exec) with a prepared environment. */
fun runIR(
    ir: List<IRNode>,
    env: MutableMap<String, Any?>,
    hostFns: Map<String, (List<Any?>) -> Any?> = emptyMap(),
    funcs: Map<String, FuncDecl> = emptyMap(),
    tracer: Tracer? = null,
    stringifyKeys: Boolean = false,
): Any? {
    // Set up a minimal registry for transforms. On JVM this delegates to the full actual; on JS we use the JS actual.
    val reg = TransformRegistry(funcs, hostFns, emptyMap())
    val eval = makeEval(hostFns, funcs, reg, tracer)
    val exec = Exec(ir, eval, tracer)
    return exec.run(env, stringifyKeys)
}

/** Build a simple runner from IR that expects a single `row` input map. */
fun buildRunnerFromIRMP(
    ir: List<IRNode>,
    hostFns: Map<String, (List<Any?>) -> Any?> = emptyMap(),
    funcs: Map<String, FuncDecl> = emptyMap(),
    tracer: Tracer? = null,
): (Map<String, Any?>) -> Any? {
    return { row: Map<String, Any?> ->
        val env = HashMap<String, Any?>().apply {
            this["row"] = row
            putAll(row)
        }
        runIR(ir, env, hostFns, funcs, tracer)
    }
}

