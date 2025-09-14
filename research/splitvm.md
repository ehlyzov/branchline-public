# Task: Split Interpreter & VM, Add Dual Execution Paths, and Unify Conformance Tests

## Objective

Decouple the **Interpreter** from the **VM** so that:

* The **Interpreter** can run **IR directly** (public REPL, fast iteration).
* The **VM** runs **bytecode** produced from IR (portable, debuggable, snapshot-able).
* A **single conformance test suite** validates both execution engines.

## Scope (what changes)

* Introduce strict module boundaries and a minimal runtime SPI shared by both engines.
* Extract/confirm a tiny **IR → Bytecode** compiler API.
* Provide a façade API (and CLI flag) letting the user choose **Interpreter** or **VM**.
* Port and parameterize tests to run against both engines.
* Preserve current performance (interpreter ≈ 4× VM) while laying groundwork for VM speedups.

---

## Deliverables

1. **New/updated Gradle modules**

    * `:interpreter` — IR types + interpreter; no dependency on `:vm`.
    * `:vm` — bytecode model + VM loop; no dependency on IR/interpreter.
    * `:compiler` — IR → bytecode only; depends on IR types, outputs VM bytecode program.
    * `:conformance-tests` — shared spec tests; run against both engines.
    * `:test-fixtures` — shared test utilities, golden data, sample programs.

2. **Public APIs (stable surface)**

    * **runtime-api** (can be a small package inside `:interpreter` shared with others):

      ```kotlin
      typealias Value = Any?
 
      interface Host {
        fun call(name: String, args: List<Value>): Value
        fun nowMillis(): Long
        companion object { val NOOP = object : Host {
          override fun call(name: String, args: List<Value>) = Unit
          override fun nowMillis() = 0L
        } }
      }
      ```
    * **Interpreter API**

      ```kotlin
      data class IrProgram(val entry: String, val units: List<IrUnit>)
      interface IrEngine {
        fun eval(ir: IrProgram, host: Host = Host.NOOP, args: List<Value> = emptyList()): Result<Value>
      }
      ```
    * **VM API**

      ```kotlin
      data class BytecodeProgram(val constants: List<Value>, val code: ByteArray)
      interface VmEngine {
        fun run(program: BytecodeProgram, host: Host = Host.NOOP, args: List<Value> = emptyList()): Result<Value>
      }
      ```
    * **Compiler API (IR → Bytecode)**

      ```kotlin
      interface IrToBytecode { fun compile(ir: IrProgram): BytecodeProgram }
      ```
    * **Execution façade**

      ```kotlin
      enum class EngineKind { INTERPRETER, VM }
      class Engine(
        private val ir: IrEngine,
        private val vm: VmEngine,
        private val compiler: IrToBytecode
      ) {
        fun runIR(irProgram: IrProgram, host: Host = Host.NOOP, args: List<Value> = emptyList()) =
          ir.eval(irProgram, host, args)
        fun runIRviaVM(irProgram: IrProgram, host: Host = Host.NOOP, args: List<Value> = emptyList()) =
          vm.run(compiler.compile(irProgram), host, args)
        fun runBytecode(bc: BytecodeProgram, host: Host = Host.NOOP, args: List<Value> = emptyList()) =
          vm.run(bc, host, args)
      }
      ```

3. **Conformance test runner SPI**

   ```kotlin
   interface ProgramRunner {
     val name: String
     fun runIR(ir: IrProgram, args: List<Value> = emptyList()): Value
     fun runBytecode(bc: BytecodeProgram, args: List<Value> = emptyList()): Value
   }

   class InterpreterRunner(private val engine: IrEngine) : ProgramRunner {
     override val name = "Interpreter"
     override fun runIR(ir: IrProgram, args: List<Value>) =
       engine.eval(ir, Host.NOOP, args).getOrThrow()
     override fun runBytecode(bc: BytecodeProgram, args: List<Value>) =
       error("Interpreter runner does not accept bytecode")
   }

   class VmRunner(private val engine: VmEngine) : ProgramRunner {
     override val name = "VM"
     override fun runIR(ir: IrProgram, args: List<Value>) =
       error("VM runner requires bytecode")
     override fun runBytecode(bc: BytecodeProgram, args: List<Value>) =
       engine.run(bc, Host.NOOP, args).getOrThrow()
   }
   ```

4. **CLI/Config** to pick the engine (`--engine=interpreter|vm`) and an API param in public entry points.

5. **CI updates**

    * Separate jobs:

        * `:interpreter:test`
        * `:vm:test`
        * `:conformance-tests:test`
    * Optional JMH jobs to track IR vs VM performance.

6. **Docs**

    * Updated root README and per-module READMEs.
    * Migration notes and engine selection guide.

---

## Non-Goals (out of scope for this task)

* Major VM optimizations (they can land after the split).
* AOT packaging or bytecode format migration tooling beyond a simple versioned codec.
* New language features (focus is on decoupling and parity).

---

## Implementation Plan

### A. Cut the boundaries

* Move all VM code (`Opcode`, VM loop, bytecode model) into `:vm`.
* Ensure `:vm` has **no** imports of IR/AST/interpreter packages.
* Keep interpreter IR and evaluator in `:interpreter` with **no** VM imports.

### B. Extract IR → Bytecode compiler

* If it currently sits inside VM packages, move to `:compiler`.
* Ensure `:compiler` depends on IR types and produces `BytecodeProgram` (VM API), but does not depend on VM internals.

### C. Runtime SPI consolidation

* Create/confirm the `Host` and `Value` abstractions in a shared place.
* Migrate built-ins to go through `Host.call(name, args)` or an indexed table (no reflection).

### D. Conformance tests

* Introduce `ProgramRunner` SPI + two runners.
* Port high-level semantic tests to `:conformance-tests`.
* Keep low-level unit tests in their respective modules.
* Add differential tests: `IR → Interpreter` vs `IR → Compiler → VM` (normalized outputs).

### E. Engine façade + CLI

* Add the `Engine` façade and wire the current entry points to it.
* Provide a CLI flag `--engine` with default = `interpreter`.

### F. Build/CI

* Update `settings.gradle.kts` to include modules.
* Root `build.gradle.kts`: common JUnit 5 platform, Kotlin JVM settings.
* GitHub Actions (or equivalent) to run all three test tasks.

### G. Documentation & examples

* Minimal examples:

    * Run IR directly (REPL/CLI).
    * Compile IR to bytecode and execute on VM.
* Architecture diagram and module dependency rules.

---

## Acceptance Criteria

* **Correctness parity**

    * All conformance tests pass on both engines.
    * Differential tests show identical observable results (values, side effects, error kinds/messages within spec tolerances).

* **Isolation**

    * `:interpreter` has zero imports from `:vm` or `:compiler`.
    * `:vm` has zero imports from `:interpreter` or IR packages.
    * `:compiler` depends on IR and VM **APIs only**, not VM implementation.

* **Ergonomics**

    * Public API exposes both execution paths.
    * CLI supports `--engine=interpreter|vm`.

* **CI**

    * Dedicated jobs green for `:interpreter:test`, `:vm:test`, `:conformance-tests:test`.

* **Docs**

    * README updated with usage and engine selection.
    * CONTRIBUTING note describing where to add tests and how to regenerate goldens.

---

## Risks & Mitigations

* **Semantic drift**
  Mitigate with one TCK, differential tests, and declaring the interpreter as the semantic oracle.

* **Double implementation of intrinsics**
  Mitigate by factoring a shared `Host`/stdlib layer and a single intrinsic dispatch table.

* **Bytecode churn**
  Mitigate by versioning the `BytecodeProgram` format and documenting changes; keep a tiny loader upgrade hook.

* **Debug parity**
  Align error/trace formats via a shared Debug/Trace SPI; include IR span → PC mapping in compiler.

---

## Follow-ups (post-split, separate tasks)

* Add VM peephole passes (remove `PUSH/POP` pairs, fold constants).
* Introduce specialized ops (`ADD_I64`, `OUTPUT_1/2`, small-literal builders).
* Inline caches for `ACCESS_STATIC/SET_STATIC` and hot host calls.
* Snapshot completeness tests across try/catch, lambdas, and loops.
* Performance dashboards in CI (ns/op, alloc/op) for IR vs VM.

---

## Developer Checklist

* [ ] Create/adjust modules: `:interpreter`, `:vm`, `:compiler`, `:conformance-tests`, `:test-fixtures`.
* [ ] Move VM code and strip IR/interpreter dependencies.
* [ ] Extract `IrToBytecode` interface and implementation in `:compiler`.
* [ ] Implement `IrEngine`, `VmEngine`, and `Engine` façade.
* [ ] Add `ProgramRunner` SPI + `InterpreterRunner` + `VmRunner`.
* [ ] Port conformance tests and enable parameterized runs.
* [ ] Add CLI flag and verify both modes on sample programs.
* [ ] Update CI pipelines and READMEs.
* [ ] Verify acceptance criteria and close the task.
