# CONTRACTS

## Inbound contract (price-repo parity)
The HTTP ingest contract mirrors `ProductPriceKafkaDto`:
- `transactionId: String` (required)
- `warehouseId: UUID` (required)
- `skuId: UUID` (required)
- `price: BigDecimal` (required)
- `effectiveTime: OffsetDateTime` (required)
- `source: String` (required)
- `needAck: Boolean` (optional, default `false`)

## Source of truth and generated artifacts
- Source of truth: Branchline transform signatures/contracts (`*.bl`, current API).
- Build output:
  - `build/generated/branchline/contracts.json`
  - `build/generated/source/branchlineContracts/kotlin/com/example/ktorservice/generated/contracts/*.kt`
- Generated index: `GeneratedContractsIndex` (transform -> generated metadata maps).

## Node mapping rules (`Node -> Kotlin`)
- `TEXT -> String`
- `NUMBER -> BigDecimal`
- `BOOLEAN -> Boolean`
- `BYTES -> ByteArray`
- `ARRAY(element) -> List<T>`
- `OBJECT(children) -> class`
- `required=false -> nullable field with default null`
- `UNION/ANY/NEVER/open nested object -> JsonNode` fallback

## Runtime enforcement
- Pre-transform input: strict via `ContractEnforcer`.
- Post-transform output: strict via `ContractEnforcer`.
- Same `contracts.json` is used for both code generation and runtime enforcement.

## Outbound domain contracts
### Ack
- `transactionId: String`
- `status: ACCEPTED | REJECTED`
- `reason: VALIDATION_FAILED | STALE_RECORD | null`
- `errors: List<String>`

### Updated event
- `transactionId: String`
- `warehouseId: UUID`
- `skuId: UUID`
- `productId: UUID`
- `price: BigDecimal`
- `effectiveTime: OffsetDateTime`
- `storedAt: OffsetDateTime`
- `eventId: String`
- `source: String`

## Validation rules
- `transactionId` must be non-blank
- `source` must be non-blank
- `price >= 0`
- `price` scale <= 2 (after trailing zero normalization)

## Transform contracts
- `ValidateAndPlan`:
  - input: strict mirror map of `ProductPriceKafkaDto`
  - output: `{ accepted, outcome, reason?, errors, ...normalized inbound fields }`
- `ComposeOutbound`:
  - input: mutation + ack planning payload (`reason?` optional)
  - output: `{ ack?: PriceChangeAckMessage, event?: PriceUpdatedEvent }`
- `DetectBatchMode`:
  - input: `{ items: [{ transactionId: string }] }`
  - output: `{ mode, total, uniqueTransactions }`

## Null and optional semantics
- Branchline runtime may omit fields whose value evaluates to `NULL`.
- Therefore fields with optional-null business semantics are declared as optional (`field?`) in transform signatures.
- This keeps strict enforcement compatible with actual emitted payload shapes.
