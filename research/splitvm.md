# VM/Interpreter Split — Progress Report

## Current Shape
- `compileStream` lives in the VM module and accepts an `ExecutionEngine` enum. On the JVM it can return either an interpreter-backed runner or a `VMExec` that compiles IR to bytecode before execution. Both paths still seed the environment with a cloned `row` map.【F:vm/src/commonMain/kotlin/v2/ir/StreamCompiler.kt†L31-L74】【F:interpreter/src/commonMain/kotlin/v2/ExecutionEngine.kt†L1-L7】
- The `compiler` module now only exposes thin placeholders that direct callers to the relocated implementations inside `vm`/`interpreter`, confirming the code move but also highlighting that we still need a stable public API surface for downstream consumers.【F:compiler/src/commonMain/kotlin/v2/ir/StreamCompiler.kt†L1-L3】【F:compiler/src/commonMain/kotlin/v2/ir/TransformRegistry.kt†L1-L3】【F:compiler/src/commonMain/kotlin/v2/vm/Compiler.kt†L1-L3】
- `VMExec` acts as an adapter: it compiles IR lazily, caches bytecode, and falls back to the interpreter whenever compilation or execution fails. This makes the split safe, but it also means the interpreter remains a hard dependency of VM execution today.【F:vm/src/commonMain/kotlin/v2/vm/Integration.kt†L28-L90】

## Gaps Before a Clean Split
1. **Shared IR utilities.** VM compilation still reaches into interpreter internals (`IRNode`, `Exec`, `TransformRegistry`). Extract the shared pieces into a neutral module so the VM can depend on stable interfaces instead of the interpreter implementation classes.【F:vm/src/commonMain/kotlin/v2/ir/StreamCompiler.kt†L31-L63】
2. **Environment contract.** Runners continue to mirror the entire input into `row`. Defining a platform-level environment builder (with the planned `in` alias) will keep future DSL changes from leaking into the VM layer.【F:vm/src/commonMain/kotlin/v2/ir/StreamCompiler.kt†L63-L74】
3. **Compilation surface.** Provide a public façade (in the `compiler` module) that hides the VM/interpreter wiring. Right now callers are expected to jump straight into `compileStream`, `VMExec`, or test fixtures, which is not sustainable for external consumers.【F:compiler/src/commonMain/kotlin/v2/ir/StreamCompiler.kt†L1-L3】【F:vm/src/commonMain/kotlin/v2/vm/Integration.kt†L28-L90】
4. **Fallback pruning.** Audit the remaining `NotImplementedError` fallbacks in `VMExec` and promote the missing instructions or runtime hooks to first-class features. Once the VM covers all shipped IR nodes we can demote the interpreter fallback to a debug option.

## Suggested Next Steps
- Formalize the public compiler API (e.g., `BranchlineCompiler.compile(transform, engine = …)`) inside the `compiler` module and have it delegate to the VM/interpreter internals.
- Move shared IR builders, tracing hooks, and host-function registries into common source sets so both interpreter and VM can depend on them without cyclic references.
- Introduce an environment builder in the future `platform` module that the VM/interpreter runners consume, aligning the execution contract across engines.
