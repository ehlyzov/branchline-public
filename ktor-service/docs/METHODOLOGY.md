# BRANCHLINE-FIRST SERVICE METHODOLOGY

## Purpose
This methodology standardizes how to:
1. Build new Branchline-first services.
2. Integrate Branchline into existing services safely.

## Core principles
1. Branchline contracts are the source of truth for transform boundaries.
2. External API contracts remain explicit host-language boundary DTOs.
3. Side effects stay in host code (DB, Kafka, HTTP, retries, transactions).
4. Strict contract enforcement runs before and after transform execution.
5. DTOs and contract metadata are generated at build time from Branchline contracts.
6. Contract evolution is versioned and gated in CI.

## Part A: Building a new Branchline-first service

### Step 1: Design transforms around responsibilities
1. Split into focused transforms:
   - validation/planning,
   - outbound composition,
   - batch/routing decisions.
2. Keep signatures as concrete as possible.
3. Avoid wildcard/object-open fallback unless truly dynamic.
4. Model null behavior intentionally with optional fields.

### Step 2: Set up build pipeline
1. `extractBranchlineContracts` from `src/main/resources/branchline/*.bl`.
2. Generate `contracts.json`.
3. Generate typed DTOs from contracts (KotlinPoet).
4. Make `compileKotlin` depend on code generation tasks.
5. Add CI drift gate for generated sources/contracts.

### Step 3: Implement runtime facade
1. Compile and cache transforms on startup.
2. Expose one runtime API (`run(transformName, payload)`).
3. Enforce strict input/output contracts via `ContractEnforcer`.
4. Map contract violations to deterministic service errors.

### Step 4: Implement bridge mapping
1. `Boundary DTO -> Generated Input DTO -> Map`.
2. `Map -> Generated Output DTO -> Domain Output`.
3. Keep domain types explicit and side-effect orchestration in host code.

### Step 5: Add test pyramid
1. Unit:
   - codegen/type mapping behavior,
   - mapper correctness,
   - domain mutation/status logic.
2. Contract:
   - valid payload passes strict mode,
   - malformed payload fails predictably.
3. Integration:
   - happy path, stale, duplicate, batch mode, rejected validation.
4. Performance:
   - fixed baseline scenarios,
   - regression thresholds for throughput/p95/p99.

### Step 6: Define release gates
1. `./gradlew build` must regenerate and compile cleanly.
2. Contract diff classification (MAJOR/MINOR/PATCH) must pass policy.
3. Integration and perf thresholds must pass before rollout.

## Part B: Integrating Branchline into an existing service

### Step 1: Select first migration slice
1. Choose a deterministic transform-heavy flow.
2. Avoid high-coupling critical path as first candidate.
3. Freeze current behavior with fixtures/tests first.

### Step 2: Introduce contracts and transforms
1. Model existing flow with explicit Branchline signatures.
2. Generate DTOs and wire facade in parallel with legacy path.
3. Keep legacy output as reference for parity checks.

### Step 3: Run shadow mode
1. Execute legacy and Branchline paths for same input.
2. Compare outputs and error classes.
3. Log mismatch categories and frequency.
4. Exit shadow mode only when mismatch budget is acceptable.

### Step 4: Progressive rollout
1. Add feature flag per endpoint/tenant/traffic slice.
2. Roll out incrementally: `1% -> 10% -> 50% -> 100%`.
3. Rollback triggers:
   - contract violation spike,
   - semantic mismatch spike,
   - p95/p99 regression over threshold.

### Step 5: Decommission legacy transform logic
1. Remove dead legacy branch after stabilization window.
2. Keep compatibility fixtures as regression tests.

## API and contract versioning policy

## Version dimensions
1. External API version (`/api/v1`, `/api/v2`).
2. Internal transform contract artifact version.
3. Branchline runtime/tooling version.

## Contract SemVer
1. MAJOR:
   - removed/renamed fields,
   - incompatible type change,
   - optional -> required,
   - incompatible enum narrowing.
2. MINOR:
   - optional field additions,
   - compatible metadata/domain additions.
3. PATCH:
   - no shape/type compatibility impact.

## CI detection stages
1. Parse/extract stage:
   - catches invalid `.bl` syntax and extraction failures.
2. Compile stage:
   - catches generated DTO mismatch with bridge/service code.
3. Contract diff stage:
   - catches unapproved MAJOR changes early.
4. Compatibility stage:
   - catches semantic regressions on fixed fixtures.
5. Integration/perf stage:
   - catches operational and latency regressions.
6. Canary stage:
   - catches production-only edge cases before full rollout.

## Maximizing type-output benefit
1. Prefer concrete types in signatures over wildcard forms.
2. Keep transform inputs minimal for decision-only transforms.
3. Use enum/domain constraints where possible.
4. Treat `JsonNode` fallback as exceptional, not default.
5. Review generated DTO diff in every contract-changing PR.

## Definition of Done checklist
1. Branchline signatures are explicit and reviewed.
2. Generated contracts and DTOs are up to date.
3. Strict input/output enforcement is enabled in runtime.
4. Unit/contract/integration tests pass.
5. Perf baseline comparison recorded.
6. Versioning classification and CI gates pass.
