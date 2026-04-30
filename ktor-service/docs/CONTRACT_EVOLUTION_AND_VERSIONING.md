# CONTRACT EVOLUTION AND VERSIONING PROPOSAL

## Context
This document answers two practical questions:
1. What to change in Branchline contracts to improve scenarios like current load tests.
2. How to version API/contracts so breaking issues are detected before production.

Date: 2026-02-27

## Observed weak points in current contracts
1. Output root nodes are marked `open=true` in extracted contract metadata even for explicit signatures (adapter behavior), reducing precision for downstream tooling.
2. Contract type system still lacks first-class nullable precision for all explicit scalar/object shapes in a way that avoids wildcard fallbacks universally.

## Implemented in `ktor-service` (no Branchline core changes)
1. `reason` wildcard removed in service contracts:
   - `reason?: string` in [validate_and_plan.bl](/Users/eugene/repo/research/branchline-public/ktor-service/src/main/resources/branchline/validate_and_plan.bl:14)
   - `reason?: string` in [compose_outbound.bl](/Users/eugene/repo/research/branchline-public/ktor-service/src/main/resources/branchline/compose_outbound.bl:6)
2. `DetectBatchMode` input narrowed to required field only:
   - `items: [{ transactionId: string }]` in [batch_mode.bl](/Users/eugene/repo/research/branchline-public/ktor-service/src/main/resources/branchline/batch_mode.bl:3)
3. Resulting generated DTOs now expose typed `String?` for `reason` and leaner batch item DTO shape.

## Part 1: Contract changes for measurable benefit

### A. Changes possible now (without Branchline core changes)
1. Replace wildcard optional `reason?: _` with `reason?: string` in both transforms.
   - Status: Implemented in `ktor-service`.
   - Expected effect:
     - generated DTO fields become `String?` instead of `JsonNode?`,
     - fewer conversions in Kotlin bridge,
     - lower maintenance risk and stronger compile-time checks.
2. Narrow `DetectBatchMode` input to only required data.
   - Status: Implemented in `ktor-service` via `items: [{ transactionId: string }]`.
   - Expected effect:
     - lower request payload size in batch scenario,
     - cheaper contract validation and conversion,
     - direct improvement for `/api/v1/price-change/batch` throughput/latency.
3. Keep null-like fields optional (`field?`) rather than nullable wildcard where possible.
   - This matches current runtime behavior where `NULL` fields may be omitted.

### B. Changes requiring Branchline core evolution
1. Add first-class nullable type syntax for all types (`T?` / `T | null` in type grammar).
   - Benefit: avoid wildcard (`_?`) workaround that degrades to `ANY`.
2. Preserve explicit output closure through the legacy-to-current contract adapter chain.
   - Today output root openness is over-approximated, reducing type precision for codegen.
3. Promote enum/domain info from explicit signatures to contract nodes generically (not only status heuristics).
   - Example target fields:
     - `outcome`, `mutationStatus`, `mode`, `ack.status`, `ack.reason`.
4. Add scalar domains for `uuid`, `offsetDateTime`, and decimal constraints (scale/range) in contract metadata.
   - Then codegen can emit stronger types and validators with less manual code.

## Expected payoff
1. Maintainability:
   - less manual mapper/validator branching,
   - fewer runtime surprises due to stronger generated DTO types.
2. Performance:
   - major gain candidate: narrower `DetectBatchMode` payload,
   - moderate gain: fewer `JsonNode` conversions for reason fields.
3. Safety:
   - stricter compile-time drift detection when `.bl` changes.

## Part 2: API and contract versioning proposal

## Version dimensions
1. External API version (HTTP): `/api/v1`, `/api/v2`.
2. Transform contract version (internal): semantic version attached to extracted contract artifact.
3. Branchline runtime/tooling version: pinned in Gradle properties.

## Compatibility policy (SemVer for transform contracts)
1. MAJOR (breaking):
   - remove/rename fields,
   - change field type incompatibly (`string` -> `number`),
   - tighten requiredness (`optional -> required`),
   - narrow enum set incompatibly.
2. MINOR (backward-compatible):
   - add optional fields,
   - add enum values that consumers explicitly tolerate,
   - add new transform metadata/obligations without breaking existing payloads.
3. PATCH:
   - no contract shape change; logic/perf fixes only.

## Release and detection pipeline
1. Authoring stage (developer machine):
   - edit `.bl`,
   - run `extractBranchlineContracts generateBranchlineDtos`.
   - Failure signal: parse/type/contract extraction error.
2. Compile stage (CI):
   - compile with generated DTOs.
   - Failure signal: mapper/service compile errors due changed DTO types/fields.
3. Contract diff stage (CI required):
   - compare new `contracts.json` against previous release baseline.
   - classify change as MAJOR/MINOR/PATCH automatically.
   - Failure signal: unapproved MAJOR change.
4. Compatibility tests stage:
   - replay previous version payload fixtures against new runtime.
   - Failure signal: contract violations or changed semantics on protected flows.
5. Integration/load stage:
   - run existing Ktor integration tests and load test.
   - Failure signal: regression thresholds (e.g., p95/p99, throughput) breached.
6. Pre-prod/canary stage:
   - enable new contract version behind route/feature flag,
   - dual-run comparison for selected traffic.
   - Failure signal: increased 4xx contract violations, output mismatch ratio.
7. Production rollout:
   - gradual traffic increase,
   - monitor contract error metrics and rollback triggers.

## Where problems are detected earliest
1. Schema incompatibility: contract diff stage.
2. Kotlin bridge breakage: compile stage (generated DTO mismatch).
3. Behavioral regressions: compatibility/integration stage.
4. Performance regressions: load stage.
5. Real traffic edge cases: canary stage.

## Practical adoption plan
1. Start with A1+A2 immediately (high impact, low risk).
2. Introduce mandatory contract-diff gate in CI.
3. Add canary dual-run before any MAJOR contract rollout.
4. Plan Branchline core enhancements from section B as separate roadmap items.
