# DECISIONS

## D-001: Independent project boundary
- Date: 2026-02-26
- Context: Example must not affect the root multi-module build.
- Decision: Keep `ktor-service/` as a standalone Gradle project with its own wrapper.
- Consequences: Zero coupling to root `settings.gradle`; separate lifecycle commands.
- Alternatives considered: Root module inclusion; nested folder in existing `examples` module.

## D-002: Input contract parity at HTTP boundary
- Date: 2026-02-26
- Context: Requirement says input contract must match `price-repo`.
- Decision: Public ingest DTO matches `ProductPriceKafkaDto` field-by-field and type-by-type.
- Consequences: Contract parity is explicit and testable.
- Alternatives considered: Relaxed/normalized input schema.

## D-003: Branchline/Kotlin responsibility split
- Date: 2026-02-26
- Context: Need realistic bridge without external infrastructure.
- Decision: Branchline performs pure decisions/composition; Kotlin performs all side effects.
- Consequences: Clear ownership and easier observability/testing.
- Alternatives considered: Push all logic into Branchline or all into Kotlin.

## D-004: Infra level
- Date: 2026-02-26
- Context: Example must be runnable with minimal setup.
- Decision: Self-contained in-memory stores and outbox.
- Consequences: Fast local run, no Docker dependency.
- Alternatives considered: Postgres only; Postgres + Kafka.

## D-005: Branchline dependency source
- Date: 2026-02-26
- Context: Example should consume released artifacts.
- Decision: GitHub Packages (`maven.pkg.github.com/ehlyzov/branchline`) with token credentials.
- Consequences: Requires `GITHUB_ACTOR` and `GITHUB_TOKEN` (or Gradle props) for dependency resolution.
- Alternatives considered: includeBuild composite, local jars.

## D-006: Version policy
- Date: 2026-02-26
- Context: Need reproducibility and controlled upgrades.
- Decision: Pinned default version with explicit property override.
- Consequences: Predictable builds with optional manual upgrades.
- Alternatives considered: always-latest floating version.

## D-007: Local dependency fallback for credential-less development
- Date: 2026-02-26
- Context: GitHub Packages require credentials; local contributors may not have tokens.
- Decision: Keep GitHub Packages as default, and add optional `-Pbranchline.useLocal=true` composite build substitution to local `:interpreter`.
- Consequences: Default behavior remains package-based, while local development/testing can run without secrets.
- Alternatives considered: mandatory credentials only; checked-in binary jars.

## D-008: Contract source-of-truth strategy
- Date: 2026-02-27
- Context: Manual duplication between `.bl` contracts and Kotlin DTO classes causes drift risk.
- Decision: Branchline contracts (current API) are the single source of truth for bridge DTO structure.
- Consequences: Kotlin bridge types must be generated from contract artifacts; manual bridge contract DTOs are removed from hot path.
- Alternatives considered: Kotlin-first DTOs with manual map converters.

## D-009: DTO generation lifecycle
- Date: 2026-02-27
- Context: Need reproducible generation without runtime startup overhead.
- Decision: Build-time generation via Gradle tasks:
  - `extractBranchlineContracts`
  - `generateBranchlineDtos`
- Consequences: `compileKotlin` depends on generated DTOs; `build` is deterministic.
- Alternatives considered: runtime generation; checked-in generated sources.

## D-010: Complex node fallback typing
- Date: 2026-02-27
- Context: Contract nodes like `UNION/ANY/NEVER/open object` are not safely representable as strict Kotlin scalar/object types.
- Decision: Map complex nodes to `JsonNode` in generated DTOs.
- Consequences: No unsafe over-typing; mapper layer performs explicit conversion where domain types are required.
- Alternatives considered: sealed hierarchies per union; full polymorphic serialization model.

## D-011: Root object generation policy
- Date: 2026-02-27
- Context: Open root objects from contracts still expose stable known fields needed by service code.
- Decision: Generate root DTO class for `OBJECT` nodes even when `open=true`; keep fallback behavior for nested open objects.
- Consequences: Service can rely on typed root fields (`accepted`, `mode`, `ack`, `event`) while preserving open-object tolerance.
- Alternatives considered: mapping open root object to `JsonNode` wrapper.

## D-012: Contract tightening without Branchline core changes
- Date: 2026-02-27
- Context: Needed practical benefits immediately while keeping Branchline core untouched.
- Decision:
  - typed `reason` fields as `string?` instead of wildcard `_`,
  - narrowed `DetectBatchMode` input to transaction-id-only item shape.
- Consequences:
  - generated DTOs became more specific (`String?` vs `JsonNode?`),
  - batch transform input became smaller and cheaper to validate/map.
- Alternatives considered:
  - keep wildcard fields and full DTO batch payload until core type upgrades are implemented.
