# ARCHITECTURE

## Build-time pipeline
1. `extractBranchlineContracts` parses `src/main/resources/branchline/*.bl`.
2. For each transform, `TransformContractBuilder.build` produces current API contract metadata.
3. Contracts are written to `build/generated/branchline/contracts.json`.
4. `generateBranchlineDtos` reads that JSON and generates Kotlin DTO classes via KotlinPoet.
5. `compileKotlin` consumes generated DTO sources.

## High-level flow
1. Ktor receives request DTO.
2. DTO mapper converts typed input to generated transform input DTOs.
3. `BranchlineRuntimeFacade` converts DTO to map, enforces strict input contract, and executes precompiled transform.
4. Branchline `ValidateAndPlan` returns outcome + validation errors.
5. Kotlin mutation engine applies side effects for mutation-required outcomes.
6. Branchline `ComposeOutbound` produces ack/event payloads with strict output contract validation.
7. For batches, Branchline `DetectBatchMode` decides `UNIQUE_BATCH` vs `SEQUENTIAL_FALLBACK` from a lean transaction-id-only payload.
8. Typed mappers convert transform outputs into generated output DTOs and then into domain outbound messages.
9. Outbox stores persisted messages; HTTP response returns processing summary.

## Responsibility boundary
### Branchline
- deterministic decisioning and payload composition
- batch mode decision (`DetectBatchMode`)
- transform compilation cache at startup (`ValidateAndPlan`, `ComposeOutbound`, `DetectBatchMode`)
- host-fn extension for bridge needs (`DISTINCT_BY`, `SORT_BY`)
- canonical contract source (current API metadata)

### Kotlin
- stateful mutation logic and idempotency
- in-memory repositories and history
- HTTP interface and error mapping
- contract extraction/codegen orchestration and DTO mapping

## Idempotency and ordering semantics
- Global processed transaction ID set handles `TRANSACTION_DUPLICATE`.
- Per `(skuId, warehouseId)` record uses:
  - newer `effectiveTime` wins,
  - if equal time, lexicographically larger `transactionId` wins,
    - equal pair => `DUPLICATE`, older => `STALE`.

## Error model
- Validation failures return deterministic business errors and rejected ack.
- Contract or payload mapping errors return 400 (strict input/output enforcement).
- Unexpected runtime errors return 500 with internal code.
