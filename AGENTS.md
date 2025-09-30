# Repository Guidelines

## Project Structure & Module Organization
The repository centers on Kotlin/JVM components. Domain logic lives in `language/`, platform adapters in `platform/`, and internal integrations in `platform-private/`. Execution pipelines reside under `interpreter/` and `vm/`, while shared fixtures sit in `test-fixtures/`. Docs live in `docs/` (source) and `docs-compiled/` (compiled). Experimental work belongs in `research/` and `playground/`. Add new modules beneath these roots and register them in `settings.gradle`.

## Build, Test, and Development Commands
Initialize the Gradle wrapper once with `gradle wrapper`, then rely exclusively on `./gradlew`. Use `./gradlew build` for a full compile plus static analysis, and `./gradlew test` to execute the Kotlin/JUnit suite (append `--info` when triaging flakes). Run `./gradlew detekt` before submitting style-sensitive work, and prefer scoped tasks such as `./gradlew :compiler:run` or `./gradlew :language:compileKotlin` for module iterations. Never invoke a system Gradle binary.

## Coding Style & Naming Conventions
Follow standard Kotlin conventions with four-space indents, explicit visibility, and trailing commas where allowed. Import only what you use—wildcard imports are prohibited. Local functions are disallowed; lift helpers to private top-level declarations or companion objects for clarity. Favor descriptive names such as `parseResult` or `JvmRuntimeConfig`, prefer immutable data in public APIs, and rely on Kotlin collection extensions. Keep Detekt adjustments documented in `detekt.yml` when rules change.

## Testing Guidelines
Tests live beside sources in each module’s `src/test/kotlin`. Name unit tests with the `*Test` suffix and integration scenarios with `*IT`. Use JUnit 5 and Kotlin test utilities; place shared fixtures in `test-fixtures/`. Run `./gradlew test` locally before every push; fix or quarantine failures with clear TODO annotations. When addressing bugs, add focused regression coverage and cross-link supporting notes in `docs/`.

## Commit & Pull Request Guidelines
Write commits in imperative present tense (e.g., `Add parser guard`). Group related changes, keep messages concise, and explain rationale in the body. Pull requests should summarize scope with inline file references (`language/parser/...`) and list the commands executed (e.g., `./gradlew test`). Link Jira tickets, issues, or RFCs when available, and include screenshots for any UI-affecting assets. Confirm wrapper-based builds in the description and note any follow-up tasks explicitly.

## Agent Workflow Tips
Respect any pre-existing worktree changes and avoid reverting edits you did not author. Prefer readable, well-commented solutions over clever tricks. When uncertain about follow-up actions, leave TODOs with handles and file references to keep work traceable.
