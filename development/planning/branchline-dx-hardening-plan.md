---
status: Proposed
depends_on: ['planning/branchline-dx-implementation-plan']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-05-05
changelog:
  - date: 2026-05-29
    change: "Closed H3 by pinning diagnostic base-field serialization and documenting additive optional payload policy."
  - date: 2026-05-29
    change: "Closed H1/H2/H5 for the completed T5/T6 slices: facade envelope boundary, normalization rewrite invariants, and inspect JSON leak guards."
  - date: 2026-05-05
    change: "Added hardening plan for Branchline DX implementation tasks."
---
# Branchline DX и AI-friendly DSL — план усиления архитектуры, безопасности и поддерживаемости

## Метаданные

- **Цель:** не меняя планируемого функционала T0..T18, усилить инвариантами, защитами и observability новые canonical subset, diagnostics, examples, CLI JSON и playground workbench surfaces.
- **Источники:** [implementation plan](branchline-dx-implementation-plan.md), [overview](../product/branchline-dx/overview.md), [scenarios](../product/branchline-dx/scenarios), [SERVICE_MAP](../service/SERVICE_MAP.md), [VERIFY](../service/VERIFY.md).
- **Worker:** тот же single-instance worker.
- **Запуск:** после соответствующих T-задач или сразу после них; H-задачи не меняют scope T-задач.

## Конвенции выполнения

1. Не добавляй новую функциональность; укрепляй уже добавленное.
2. Каждая H-задача зависит от конкретной T-задачи.
3. Не правь главный implementation plan.
4. Если invariant уже выполнен, добавь `### Note: already enforced at <file>:<line>` и закрывай задачу.
5. Используй `./gradlew`.
6. Перед изменениями запускай `git status -sb`; не редактируй чужие dirty files.
7. Обновляй `development/INDEX.md` и service contour только при реальном trigger.

## Известные пробелы покрытия (план усиления НЕ закрывает)

- Pen-test или security review внешнего сервиса: playground остаётся local/static bundle.
- TLS/localhost binding: в MVP не вводится HTTP server.
- Formal contract verification/proof system.
- Multi-user RBAC и token management: не применимо без backend service.
- Container sandboxing для seed scripts.
- Retention/cleanup policy для внешних telemetry/log stores: новые stores не вводятся.
- Full CI workflow redesign and release hardening.

## Список задач

## H1. Архитектура: facade envelope boundary

- **Status:** - [x]
- **Goal:** Зафиксировать, что CLI/playground не зависят от parser/interpreter internals и читают только public facade envelope.
- **Sources:** [T6](branchline-dx-implementation-plan.md), [S03](../product/branchline-dx/scenarios/03-inspect-first-cli.md).
- **Depends on:** T6
- **Read first:**
  - `BranchlineFacade.kt`
  - `BranchlineCli.kt`
  - `PlaygroundFacade.kt`
- **Modify:**
  - tests around CLI/playground adapters
  - docs comments only if they clarify boundary
- **Steps:**
  1. Add tests or assertions proving CLI JSON uses facade result, not re-parsed internals.
  2. Check playground adapter after T11 follows same boundary.
  3. Document boundary in development record if missing.
- **Verify:**
  ```bash
  ./gradlew :cli:jvmTest :interpreter:jsTest
  ```
- **DoD:**
  - Downstream surfaces consume stable facade model.
  - No duplicate inspect assembly remains in CLI/playground.

### Note: enforced at `cli/src/jvmTest/kotlin/io/github/ehlyzov/branchline/cli/CliIntegrationTest.kt:447`

CLI JSON output is compared directly against `BranchlineFacade.inspect(...).inspectJson()`, pinning the CLI to the public facade envelope instead of independently assembling inspect JSON. `PlaygroundFacade` does not yet expose the T11 inspect panes or duplicate inspect envelope assembly; T11 must consume the same facade boundary when that adapter is introduced.

---

## H2. Архитектура: normalization rule invariants

- **Status:** - [x]
- **Goal:** Protect normalization from changing semantics, especially for mutation rewrites.
- **Sources:** [T5](branchline-dx-implementation-plan.md), [S02](../product/branchline-dx/scenarios/02-friendly-mutation-operations.md).
- **Depends on:** T5
- **Read first:**
  - `AstRenderer.kt`
  - normalization tests from T5
- **Modify:**
  - normalization tests
  - `development/ai/ai-friendly-dsl.md`
- **Steps:**
  1. Add negative tests for unsafe self-append rewrites: path target, dynamic target, alias ambiguity.
  2. Add idempotence tests: normalized source normalizes to same text.
  3. Document rewrite guard conditions.
- **Verify:**
  ```bash
  ./gradlew :interpreter:jvmTest :interpreter:jsTest
  ```
- **DoD:**
  - Unsafe rewrites are rejected or deferred.
  - Idempotence is pinned.

### Note: enforced at `interpreter/src/commonTest/kotlin/io/github/ehlyzov/branchline/normalize/AstRendererTest.kt:226`

Normalization now has explicit negative fixtures for unsafe self-append rewrites: path target, dynamic target, and alias ambiguity. These fixtures keep `SET ... = APPEND(...)`, reject accidental `+=` rewrites, and re-run idempotence checks.

---

## H3. Архитектура: diagnostics model additive evolution

- **Status:** - [x]
- **Goal:** Ensure diagnostic payload fields evolve additively and do not break old consumers.
- **Sources:** [T7](branchline-dx-implementation-plan.md), [S04](../product/branchline-dx/scenarios/04-repair-oriented-diagnostics.md).
- **Depends on:** T7
- **Read first:**
  - diagnostics model from T7
  - CLI JSON tests
- **Modify:**
  - diagnostics serialization tests
  - docs page from T2
- **Steps:**
  1. Add serialization compatibility tests for base diagnostic fields.
  2. Add docs note: new optional payload fields are additive.
  3. Check unknown fields are tolerated by documented consumers where applicable.
- **Verify:**
  ```bash
  ./gradlew :interpreter:jvmTest :cli:jvmTest
  ```
- **DoD:**
  - Existing `code/message/severity/span` contract remains stable.
  - Optional payload policy is documented.

### Note: enforced at `interpreter/src/commonTest/kotlin/io/github/ehlyzov/branchline/BranchlineFacadeTest.kt:211`

Diagnostic envelope tests preserve the base `code/message/severity/span` fields while adding `category` and optional `payload`. The public AI canonical subset docs now state that diagnostic payload fields are additive and optional.

---

## H4. Архитектура: VM/interpreter mutation parity guard

- **Status:** - [x]
- **Goal:** Prevent friendly mutation changes from improving interpreter while leaving VM behavior behind.
- **Sources:** [T3](branchline-dx-implementation-plan.md), [T8](branchline-dx-implementation-plan.md), [SERVICE_MAP](../service/SERVICE_MAP.md).
- **Depends on:** T8
- **Read first:**
  - `vm/src/commonMain/kotlin/io/github/ehlyzov/branchline/vm`
  - `conformance-tests/src/jvmTest/kotlin/io/github/ehlyzov/branchline/ir/PlusAssignRuntimeTest.kt`
  - `conformance-tests/src/jvmTest/kotlin/io/github/ehlyzov/branchline/ir/SetOpRuntimeTest.kt`
- **Modify:**
  - parity/conformance tests only
- **Steps:**
  1. Add or confirm tests run both `ExecutionEngine.INTERPRETER` and `ExecutionEngine.VM`.
  2. Add mutation diagnostics parity note if VM cannot expose same diagnostics yet.
  3. Record any VM limitation in knowledge-gaps.
- **Verify:**
  ```bash
  ./gradlew :vm:jvmTest :conformance-tests:jvmTest
  ```
- **DoD:**
  - Mutation semantics parity is pinned.
  - Any diagnostics parity gap is explicit.

---

## H5. Безопасность: inspect JSON no path or secret leak

- **Status:** - [ ]
- **Goal:** Ensure machine JSON does not leak local filesystem paths, environment values or raw secrets.
- **Sources:** [T6](branchline-dx-implementation-plan.md), [S03](../product/branchline-dx/scenarios/03-inspect-first-cli.md).
- **Depends on:** T6
- **Read first:**
  - CLI JSON renderer
  - diagnostics payload model
- **Modify:**
  - CLI/facade tests
- **Steps:**
  1. Add fixture with script path containing user directory and verify JSON omits it unless explicitly requested.
  2. Add fixture with string literal resembling secret and verify diagnostics do not echo unrelated full source.
  3. Document snippet policy if snippets are added later.
- **Verify:**
  ```bash
  ./gradlew :cli:jvmTest :interpreter:jvmTest
  ```
- **DoD:**
  - Machine JSON exposes spans/payloads without local path leakage.
  - No environment variables enter diagnostics.

### Note: enforced at `cli/src/jvmTest/kotlin/io/github/ehlyzov/branchline/cli/CliIntegrationTest.kt:479`

Inspect JSON parse-error output is tested against local path leakage, user-home leakage, unrelated secret-string leakage, and sampled environment value leakage. Current diagnostics expose structured spans and messages without embedding filesystem paths or full source snippets.

---

## H6. Безопасность: playground payload limits

- **Status:** - [ ]
- **Goal:** Verify and pin the payload/stale-result guards implemented by T11/T17; do not introduce new UI behavior here.
- **Sources:** [T11](branchline-dx-implementation-plan.md), [S07](../product/branchline-dx/scenarios/07-playground-ai-workbench.md).
- **Depends on:** T11, T17
- **Read first:**
  - `playground/src/playground.tsx`
  - `PlaygroundFacade.kt`
- **Modify:**
  - playground tests or verification notes
  - tests if available
- **Steps:**
  1. Confirm T11/T17 already define local source/input threshold behavior and stale-result handling.
  2. Add tests for threshold/stale-result behavior if test infrastructure exists.
  3. If missing, mark this task as `ASK:` and send it back to T11/T17 scope instead of adding new behavior here.
- **Verify:**
  ```bash
  ./gradlew playgroundBuildAssets
  ```
- **DoD:**
  - Large input/source and stale result behavior are tested or explicitly sent back to implementation scope.
  - H6 does not add new user-facing states.

---

## H7. Безопасность: example metadata validation against unsafe paths

- **Status:** - [ ]
- **Goal:** Verify example metadata validation uses conservative ids/tags/categories and does not add filesystem-addressing fields.
- **Sources:** [T9](branchline-dx-implementation-plan.md), [S06](../product/branchline-dx/scenarios/06-example-metadata-and-retrieval.md).
- **Depends on:** T9
- **Read first:**
  - example descriptor schema/tests
  - `playground/examples/*.json`
- **Modify:**
  - example validation tests
- **Steps:**
  1. Validate `id` and category/tag values with conservative regex.
  2. Assert the T9 schema has no path-like fields; if future link fields are added, require a separate product task.
  3. Keep existing example program/input unrestricted except JSON validity.
- **Verify:**
  ```bash
  ./gradlew :conformance-tests:jvmTest --tests io.github.ehlyzov.branchline.playground.PlaygroundExamplesJvmTest
  ```
- **DoD:**
  - Metadata cannot address arbitrary local files because schema has no filesystem path fields.
  - Invalid id/tag fails with clear message.

---

## H8. Безопасность: diagnostics hint safety

- **Status:** - [ ]
- **Goal:** Ensure repair hints do not suggest unsafe shared-state, filesystem, or host-call behavior.
- **Sources:** [T7](branchline-dx-implementation-plan.md), [T8](branchline-dx-implementation-plan.md).
- **Depends on:** T8
- **Read first:**
  - diagnostics taxonomy/hints
  - AI subset blocker logic
- **Modify:**
  - diagnostics tests
- **Steps:**
  1. Add tests for unsupported `SHARED`, `AWAIT`, `SUSPEND` hints.
  2. Ensure mutation hints suggest local `+=`/`SET`, not shared writes.
  3. If a diagnostics safety checklist already exists from T7, add this invariant there; otherwise record the invariant in test names only.
- **Verify:**
  ```bash
  ./gradlew :interpreter:jvmTest
  ```
- **DoD:**
  - Hints never recommend constructs outside AI canonical subset for canonical repair.
  - Unsupported-subset diagnostics remain blockers.

---

## H9. Поддерживаемость: development index and status invariant

- **Status:** - [ ]
- **Goal:** Keep `development/INDEX.md` and AI/product/planning docs statuses synchronized.
- **Sources:** [T1](branchline-dx-implementation-plan.md), [T15](branchline-dx-implementation-plan.md).
- **Depends on:** T15
- **Read first:**
  - `development/INDEX.md`
  - all new branchline-dx docs
- **Modify:**
  - `development/INDEX.md`
  - front matter of branchline-dx docs if needed
- **Steps:**
  1. Add index entries for product overview, implementation plan, hardening plan and gap file.
  2. Ensure statuses match actual implementation state.
  3. Add changelog entries with exact date.
- **Verify:**
  ```bash
  ruby -e 'Dir["development/**/*.md"].each { |f| next unless File.read(f).start_with?("---"); YAML.load(File.read(f).split(/^---$/)[1]) }; puts "front matter ok"' -ryaml
  ```
- **DoD:**
  - Index can guide future agents to all branchline-dx artifacts.
  - Status names align with repository conventions.

---

## H10. Поддерживаемость: no orphan TODO or undocumented gaps

- **Status:** - [ ]
- **Goal:** Ensure deferred choices are recorded in knowledge gaps or development docs, not hidden in orphan TODOs.
- **Sources:** [T13](branchline-dx-implementation-plan.md), [S08](../product/branchline-dx/scenarios/08-ci-quality-gates.md).
- **Depends on:** T13
- **Read first:**
  - `development/service/knowledge-gaps.yaml`
  - changed files from T-tasks
- **Modify:**
  - `development/service/knowledge-gaps.yaml` only for durable unresolved facts
  - relevant development docs
- **Steps:**
  1. Search changed files for `TODO`, `FIXME`, `TBD`.
  2. Either remove, add owner/context, or record durable unresolved fact.
  3. Do not edit unrelated user TODOs.
- **Verify:**
  ```bash
  rg -n "TODO|FIXME|TBD" development interpreter cli playground docs conformance-tests || true
  ```
- **DoD:**
  - New TODOs from this program have owner/context or are removed.
  - Durable unknowns are recorded.

---

## H11. Поддерживаемость: docs/assets generation hygiene

- **Status:** - [ ]
- **Goal:** Prevent hand-edited generated asset churn when playground/docs change.
- **Sources:** [T11](branchline-dx-implementation-plan.md), [T12](branchline-dx-implementation-plan.md), [VERIFY](../service/VERIFY.md).
- **Depends on:** T12
- **Read first:**
  - `development/service/VERIFY.md`
  - `docs/assets/`
  - playground build tasks
- **Modify:**
  - verification notes/tests only
- **Steps:**
  1. Confirm generated assets change only after `./gradlew playgroundBuildAssets`.
  2. Record generated asset verification evidence.
  3. If assets are not committed by policy for the task, document that explicitly.
- **Verify:**
  ```bash
  ./gradlew playgroundBuildAssets
  ```
- **DoD:**
  - Generated asset changes are intentional and reproducible.
  - Final notes distinguish source docs from generated assets.

---

## H12. Поддерживаемость: branchline-dx final verification bundle

- **Status:** - [ ]
- **Goal:** Produce one final evidence bundle for maintainers: commands, surfaces, gaps and residual risks.
- **Sources:** [T15](branchline-dx-implementation-plan.md), [VERIFY](../service/VERIFY.md).
- **Depends on:** T15
- **Read first:**
  - implementation plan statuses
  - hardening plan statuses
  - gap yaml
- **Modify:**
  - `development/planning/branchline-dx-gap.yaml`
  - optional final notes section in `development/ai/ai-friendly-dsl.md`
- **Steps:**
  1. Refresh gap YAML final statuses.
  2. Add verification evidence summary.
  3. Record residual risks: VM diagnostics parity, playground latency, docs generated assets, CI-only checks.
- **Verify:**
  ```bash
  bin/audit_contour.sh
  ```
- **DoD:**
  - Maintainer can see what passed, what remains, and which risks are intentional.
  - Hardening did not introduce new product functionality.

---
