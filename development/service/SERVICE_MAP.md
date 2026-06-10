# Service Map

## Purpose

Branchline is an experimental Kotlin Multiplatform data transformation language and toolchain for converting JSON-like and XML-like inputs into deterministic structured outputs. The repository contains the language interpreter, VM pipeline, CLI wrappers, conformance tests, documentation site, playground bundle, and benchmark tooling.

## Runtime Entrypoints

- `cli/src/jvmMain/kotlin/io/github/ehlyzov/branchline/cli/BlJvmMain.kt`: JVM `bl` CLI entrypoint.
- `cli/src/jvmMain/kotlin/io/github/ehlyzov/branchline/cli/BlcJvmMain.kt`: JVM compiler CLI entrypoint.
- `cli/src/jvmMain/kotlin/io/github/ehlyzov/branchline/cli/BlvmJvmMain.kt`: JVM VM CLI entrypoint.
- `cli/src/jsMain/kotlin/io/github/ehlyzov/branchline/cli/BlJsMain.kt`: Node CLI entrypoint.
- `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/BranchlineFacade.kt`: common interpreter facade.
- `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/playground/PlaygroundFacade.kt`: playground-facing interpreter facade.
- `vm/src/commonMain/kotlin/io/github/ehlyzov/branchline/vm/VMLoop.kt`: VM loop used by the root `run` task through `:vm:runVmLoop`.

## Top-Level Module Map

- `interpreter/`: lexer, parser, AST, semantic analysis, contracts, IR conversion, common runtime, stdlib modules, JSON/XML/CBOR handling, tracing, and platform-specific I/O.
- `vm/`: bytecode model, compiler, bytecode I/O, VM execution, VM integration, and VM trace metadata.
- `cli/`: JVM and Node CLIs, runtime selection, JSON/XML interop, contract diffing, shared input loading, and output formatting.
- `conformance-tests/`: cross-platform behavior tests; `conformance-tests/src/commonTest` is the canonical parity surface.
- `test-fixtures/`: shared fixtures used by tests.
- `examples/`: example programs and fixtures.
- `playground/`: Vite/React playground source, Monaco language registration, worker integration, and example catalog.
- `docs/`: Diplodoc source plus generated playground assets under `docs/assets/`.
- `interpreter-benchmarks/`, `vm-benchmarks/`, `jsonata-benchmarks/`, `perf/`: benchmark tasks, scripts, data, and workflow notes.
- `development/`: proposals, implementation records, and planning notes. Planned repository changes must be recorded here first.

## Key Boundaries And Invariants

- Kotlin common source sets carry most language behavior; JVM and JS source sets should stay thin and platform-specific.
- Parser, semantic analyzer, contract inference, interpreter, VM, CLI, docs, and playground examples form one language surface. Syntax or semantics changes usually cross several of these boundaries.
- `conformance-tests/src/commonTest` is the source of truth for cross-runtime behavior.
- Prefer desugaring over adding VM or interpreter complexity when the syntax can be lowered cleanly.
- Canonical grammar for syntax changes lives at `interpreter/src/jvmTest/resources/io/github/ehlyzov/branchline/ebnf.txt`.
- Playground keyword support lives at `playground/src/branchline-language.ts`.
- Generated documentation assets in `docs/assets/` are rebuildable outputs of `./gradlew playgroundBuildAssets`.

## Critical Integrations Visible From The Repo

- Gradle Kotlin Multiplatform builds JVM, JS browser, and JS Node outputs.
- CI uses GitHub Actions in `.github/workflows/tests.yml` with Java 23, Node 18, Chrome, Gradle, and Branchline scripts that summarize JUnit XML.
- CLI release workflows publish JVM jar, Node tarball, and library artifacts through `.github/workflows/publish-cli-maven.yml`, `.github/workflows/publish-cli-node.yml`, and `.github/workflows/release-artifacts.yml`.
- Playground and docs build through `playground/package.json`, Vite, and the root `docsBuild`/`playgroundBuildAssets` Gradle tasks.
- Benchmark reporting uses `.github/scripts/*.bl`, benchmark modules, and `perf/` guidance.

## Dangerous Zones And Legacy Hotspots

- Contract inference and validation: `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/contract/` and `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/sema/`.
- Numeric, JSON, XML, CBOR, and set serialization: `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/runtime/`, `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/json/`, `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/xml/`, `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/cbor/`, and CLI interop files.
- JVM/JS parity: multiplatform source-set splits in `interpreter/`, `vm/`, `cli/`, and shared `conformance-tests/src/commonTest`.
- CLI packaging: `cli/build.gradle`, `cli/js-package/`, and the `prepareJsCliPackage`/`packageJsCli` tasks.
- Playground asset path: `playground/` source and generated `docs/assets/` must remain aligned.
- CI test summarization depends on the Branchline CLI jar and `.github/scripts/junit-summary.bl`.

## Generated Overlays

- `development/service/generated/change-surface.json`: rebuildable path/module/change-surface overlay.
- `development/service/generated/hotspots.md`: rebuildable human hotspot summary.
- `development/service/generated/health-report.json`: rebuildable contour audit snapshot.

Regenerate overlays with `bin/refresh_contour.sh` after topology, entrypoint, verification, or hotspot changes.

## Review Triggers

Update this file when repository topology, runtime entrypoints, integration boundaries, workflow shape, dangerous zones, or language-surface ownership changes.

Update `development/service/VERIFY.md` when build, test, lint, local-run, CI, or required evidence expectations change.
