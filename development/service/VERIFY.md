# Verification Contract

## Fastest Local Setup Path

- Use the repository wrapper: `./gradlew`.
- Java is required for Gradle/Kotlin tasks. CI uses Java 23; the Gradle build config requests Java 21 toolchains for Kotlin compilation.
- Node 18+ is required for playground assets and JS CLI packaging.
- Browser tests require Chrome through `CHROME_BIN`; without it, interpreter JS browser tests are disabled by build logic.

## Narrow Verification Path

- Interpreter JVM behavior: `./gradlew :interpreter:jvmTest`.
- Interpreter JS behavior: `./gradlew :interpreter:jsTest`.
- VM JVM behavior: `./gradlew :vm:jvmTest`.
- VM JS behavior: `./gradlew :vm:jsTest`.
- Cross-runtime conformance JVM: `./gradlew :conformance-tests:jvmTest`.
- Cross-runtime conformance JS: `./gradlew :conformance-tests:jsTest`.
- CLI JVM/Node surface: `./gradlew :cli:jvmTest :cli:jsNodeTest`.
- Playground assets: `./gradlew playgroundBuildAssets`.
- Contour integrity: `bin/audit_contour.sh`.

Choose the narrow path that matches the touched surface and report the exact command output status.

## Full Local Verification Path

- Full clean build: `./gradlew clean build`.
- Documentation plus playground asset build: `./gradlew docsBuild`.
- Benchmark tasks are not part of the default full local verification path; use them only when performance-sensitive code changed.

## CI-Only Checks

- GitHub Actions in `.github/workflows/tests.yml` run CLI jar build plus interpreter, VM, conformance, and CLI jobs.
- CI configures Java 23, Node 18, Chrome, Gradle cache, JUnit summary scripts, and status badges.
- Release and publish workflows are under `.github/workflows/` and should be checked when artifact packaging or publishing changes.

## Risk-Triggered Extra Checks

- Syntax changes: update `interpreter/src/jvmTest/resources/io/github/ehlyzov/branchline/ebnf.txt`, parser tests, conformance tests, language docs, playground keywords, and playground examples.
- Contract changes: run relevant interpreter tests, conformance tests, CLI contract tests, and update contract docs/examples.
- JSON/XML/CBOR/numeric changes: run targeted conformance tests plus CLI interop tests.
- CLI packaging changes: run `./gradlew :cli:blShadowJar :cli:packageJsCli :cli:jvmTest :cli:jsNodeTest`.
- Playground changes: run `./gradlew playgroundBuildAssets` and inspect the playground locally when UI behavior is affected.
- Performance-sensitive interpreter or VM changes: run the relevant benchmark task and record the dataset and command used.

## Required Change Evidence

Every non-trivial change should report:

- whether a contour trigger fired, and if not, why not;
- changed surface summary;
- commands run;
- what was not verified locally;
- risk notes for language behavior, runtime parity, packaging, generated assets, or CI.

## What Cannot Be Verified Locally

- GitHub badge update behavior from `.github/workflows/tests.yml`.
- Package publishing credentials and GitHub Packages release behavior.
- Repository-specific GitHub Pages deployment behavior unless the workflow is run in GitHub Actions.
