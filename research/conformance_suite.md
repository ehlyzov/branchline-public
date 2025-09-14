Here’s a concise plan for setting up a unified conformance test suite to verify that the interpreter and VM produce the same results. This response is delivered directly in chat (no file) and avoids introducing duplicate annotations like `@EngineTest`.

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

By following these steps, you’ll have a single, reliable conformance suite that verifies semantic parity between the interpreter and VM without duplicating engine‑specific annotations or code.
