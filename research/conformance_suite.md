**1. Separate unit tests from conformance tests**

* Keep low‑level implementation tests (e.g. parser checks, bytecode encoding, VM stack overflow, compiler heuristics) in their respective modules (`:interpreter`, `:vm`, `:compiler`).
* Move high‑level semantic tests—anything that asserts the result of a Branchline program—to a dedicated `:conformance-tests` module.

**2. Module layout**

* `:interpreter`: houses IR types, parser, interpreter and its own unit tests.
* `:vm`: contains bytecode types and VM runtime, with its own unit tests.
* `:compiler`: contains IR→bytecode translation.
* `:test-fixtures`: shared helpers (script parsing, mocking host calls, random program generators, golden input/output).
* `:conformance-tests`: holds specification‑level tests that run on both engines.

**3. Use a single parameterized mechanism**
Branchline already defines a meta‑annotation `@EngineTest` that wraps `@ParameterizedTest` with `MethodSource("v2.testutils.Engines#all")`. Each test annotated with `@EngineTest` will automatically run against both `ExecutionEngine` values (interpreter and VM). Avoid creating another annotation with the same functionality—just reuse this one and ensure it’s applied only once per test method.

**4. Create a simple runner interface**
If you prefer an explicit interface instead of the annotation, define a `ProgramRunner` with methods to run IR and to run bytecode. Provide concrete implementations for the interpreter and the VM. Parameterize your tests over a list of `ProgramRunner`s so you don’t have to write duplicate code.

**5. Organize conformance tests by feature**
Group the tests in `:conformance-tests` by language feature:

1. Expressions and arithmetic (numbers, booleans, comparisons) – adapt the basic arithmetic tests.
2. Variables and scope (let‑bindings, updates, closures) – reuse variable tests.
3. Collections (arrays and objects) – cover creation and access of nested structures.
4. Control flow (if/else, loops, short‑circuit) – include existing jump tests.
5. Functions and lambdas – add tests once the VM’s function table is in place.
6. Error handling (try/catch, division by zero) – ensure both engines report errors consistently.
7. Host functions – verify built‑ins behave the same under both engines.
8. Suspensions and snapshots – add when the VM supports suspending execution.

**6. Golden programs and property tests**
For bytecode‑only scenarios, store pre‑compiled programs and their expected outputs under `src/test/resources` in the conformance module. Add property‑based tests that generate random IR snippets and compare interpreter and VM results to catch edge cases.

**7. Steps to migrate existing tests**

1. Review each current test: if it checks behaviour rather than VM internals, migrate it to `:conformance-tests` and annotate it with `@EngineTest`.
2. Refactor tests to build IR via the parser or IR builder rather than manually crafting VM instruction lists.
3. Extract common helper functions to `:test-fixtures`.
4. Ensure build scripts include the new module and dependencies.

**8. CI integration and maintenance**
Add a job to run `./gradlew :conformance-tests:test` alongside existing unit tests. Require that any semantic change be accompanied by a conformance test update. Avoid duplicate test methods or annotations by reusing the existing `@EngineTest` meta‑annotation consistently.
Conformance Suite Plan (KMP)

Goals
- Keep VM JVM-only; provide a portable interpreter on both JVM and JS.
- Validate language semantics at IR level so tests run cross-platform without the parser.
- Reuse existing JVM tests unchanged; add a lightweight common/JS suite for interpreter parity.

Scope and Levels
- Core IR semantics (common on JVM+JS):
  - Arithmetic and comparisons with I32/I64/BLBigInt/BLBigDec
  - Objects/arrays construction, SET/APPEND/MODIFY paths
  - IF/ELSE, FOR EACH, TRY/CATCH/RETRY, RETURN, ABORT, EXPR output
  - Host calls (basic signatures); advanced JVM-only hosts tested separately
  - Provenance/tracing hooks via Debug tracer (where applicable)
- VM/JIT-specific (JVM-only):
  - Bytecode encoding/decoding, operand offsets
  - CALL/CALL_FN suspend/resume and snapshot/restore
  - Specialized OUTPUT_* and CALL_HOST index table

Architecture (KMP)
- VM split:
  - Move v2.vm.VM.kt to jvmMain; leave Instruction/Opcode/Bytecode in commonMain.
  - Keep Integration/VMExec JVM-only.
- Interpreter runner (common):
  - runIR(ir, env, hostFns, funcs, tracer?, stringifyKeys=false) using Exec
  - buildRunnerFromIRMP(ir, hostFns, funcs) -> (row) -> Any? (sets env["row"])
- Transform registry (JS):
  - Implement actual TransformRegistry for JS by compiling TransformDecl bodies to IR and running via Exec.
  - Allows simple transform chaining on JS without the VM.
- Availability flags:
  - isVMAvailable(): Boolean — true on JVM, false on JS (optional helper for callers).

Test Strategy
- Common IR tests (commonTest):
  - Build IR directly; assert normalized outputs.
  - Numeric parity, control-flow, path updates, host calls (simple stubs).
- JS tests (jsTest):
  - Reuse common IR tests; add a JS smoke test using buildRunnerFromIRMP.
- JVM tests (jvmTest):
  - Keep existing suites; optional parallel run of selected cases via interpreter-only to cross-check parity.

Milestones
1) Implement JS TransformRegistry actual (Exec-backed)
2) Add runIR/buildRunnerFromIRMP common APIs
3) Keep VM in commonMain but plan to extract it into a separate KMP module (no code changes) to enable future Wasm target without coupling. Do not move to jvmMain.
4) Add initial IR-based conformance tests to commonTest/jsTest
5) Iterate to cover numeric and control-flow edge cases

Out of Scope (for now)
- Parser in JS; source → AST happens on JVM. Cross-platform tests operate at IR level.
- Advanced host integrations (JVM libraries) — JVM-only conformance.
