# INTENT

## Goal
Build a fully runnable, self-contained Ktor service that demonstrates a production-like Kotlin <-> Branchline integration for price-ingest processing, with Branchline contracts as the only source of truth.

## Scope
- Independent Gradle project located at `ktor-service/`.
- Input contract mirrored from `price-repo` Kafka DTO (`ProductPriceKafkaDto`).
- Contract ownership model: `Branchline First`.
- Build-time codegen:
  - extract contracts from `src/main/resources/branchline/*.bl`,
  - generate Kotlin DTOs with KotlinPoet from extracted contracts.
- Branchline is responsible for deterministic transformation logic:
  - validation planning,
  - outbound message composition,
  - batch decision mode.
- Kotlin is responsible for side effects and mutable state:
  - in-memory persistence,
  - mutation ordering/idempotency,
  - outbox accumulation,
  - HTTP API exposure.

## Non-goals
- No PostgreSQL/Kafka runtime integration.
- No modifications to `branchline-public` root modules.
- No `/development` documentation updates for this independent project.
- No manual duplicate bridge DTO contract definitions in Kotlin.

## Fully working definition
A successful implementation must provide:
1. Passing tests for transform behavior, codegen behavior, mutation semantics, mapping, and HTTP flows.
2. Deterministic build with `./gradlew build` including `extractBranchlineContracts` and `generateBranchlineDtos`.
3. Runtime strict input/output contract enforcement driven by generated current API contract artifacts.
4. Runnable local service via `./gradlew run` inside `ktor-service/`.
