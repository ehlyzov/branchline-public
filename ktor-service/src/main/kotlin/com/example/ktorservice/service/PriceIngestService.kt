package com.example.ktorservice.service

import com.example.ktorservice.api.BatchPriceChangeResponse
import com.example.ktorservice.api.PriceChangeResponse
import com.example.ktorservice.bridge.BranchlinePayloadMapper
import com.example.ktorservice.domain.InMemoryHistoryStore
import com.example.ktorservice.domain.InMemoryOutbox
import com.example.ktorservice.domain.InMemoryPriceStore
import com.example.ktorservice.domain.PriceHistoryRecord
import com.example.ktorservice.domain.PriceMutationEngine
import com.example.ktorservice.domain.PriceMutationResult
import com.example.ktorservice.domain.PriceMutationStatus
import com.example.ktorservice.domain.PriceSnapshot
import com.example.ktorservice.domain.PriceUpdatedEvent
import com.example.ktorservice.domain.ProcessedTransactionStore
import com.example.ktorservice.domain.ProductPriceKafkaDto
import com.example.ktorservice.runtime.BranchlineRuntimeFacade
import java.time.Clock
import java.time.OffsetDateTime
import java.util.UUID

class PriceIngestService(
    private val runtimeFacade: BranchlineRuntimeFacade,
    private val mapper: BranchlinePayloadMapper,
    private val mutationEngine: PriceMutationEngine,
    private val priceStore: InMemoryPriceStore,
    private val historyStore: InMemoryHistoryStore,
    private val outbox: InMemoryOutbox,
    private val processedTransactions: ProcessedTransactionStore,
    private val clock: Clock,
) {
    fun process(dto: ProductPriceKafkaDto): PriceChangeResponse {
        val plan = mapper.toValidateAndPlanOutput(
            runtimeFacade.run("ValidateAndPlan", mapper.toValidateAndPlanInput(dto)),
        )
        val planAccepted = plan.accepted
        val planErrors = plan.errors

        if (!planAccepted) {
            return composeAndPersist(
                dto = dto,
                accepted = false,
                reason = "VALIDATION_FAILED",
                errors = planErrors,
                mutationStatus = "VALIDATION_FAILED",
                mutation = null,
            )
        }

        if (processedTransactions.contains(dto.transactionId)) {
            return composeAndPersist(
                dto = dto,
                accepted = true,
                reason = null,
                errors = emptyList(),
                mutationStatus = PriceMutationStatus.DUPLICATE.name,
                mutation = null,
            )
        }

        val mutation = mutationEngine.apply(dto)
        val accepted = mutation.status != PriceMutationStatus.STALE
        val reason = if (accepted) {
            null
        } else {
            "STALE_RECORD"
        }

        val response = composeAndPersist(
            dto = dto,
            accepted = accepted,
            reason = reason,
            errors = emptyList(),
            mutationStatus = mutation.status.name,
            mutation = mutation,
        )

        when (mutation.status) {
            PriceMutationStatus.CREATED,
            PriceMutationStatus.UPDATED,
            -> {
                processedTransactions.add(dto.transactionId)
                historyStore.append(
                    PriceHistoryRecord(
                        transactionId = dto.transactionId,
                        productId = mutation.price.productId,
                        warehouseId = mutation.price.warehouseId,
                        skuId = mutation.price.skuId,
                        price = mutation.price.price,
                        effectiveTime = mutation.price.effectiveTime,
                        storedAt = mutation.price.updatedAt,
                        status = mutation.status,
                        source = mutation.price.source,
                    ),
                )
            }

            PriceMutationStatus.DUPLICATE,
            PriceMutationStatus.STALE,
            -> Unit
        }

        return response
    }

    fun processBatch(dtos: List<ProductPriceKafkaDto>): BatchPriceChangeResponse {
        val modePayload = runtimeFacade.run(
            "DetectBatchMode",
            mapper.toDetectBatchModeInput(dtos),
        )
        val mode = mapper.toDetectBatchModeOutput(modePayload).mode
        val results = dtos.map(::process)
        return BatchPriceChangeResponse(mode = mode, results = results)
    }

    fun prices(): List<PriceSnapshot> = priceStore.snapshots()

    fun history(): List<PriceHistoryRecord> = historyStore.all()

    fun ackOutbox() = outbox.acks()

    fun eventOutbox(): List<PriceUpdatedEvent> = outbox.events()

    private fun composeAndPersist(
        dto: ProductPriceKafkaDto,
        accepted: Boolean,
        reason: String?,
        errors: List<String>,
        mutationStatus: String,
        mutation: PriceMutationResult?,
    ): PriceChangeResponse {
        val storedAt = mutation?.price?.updatedAt ?: OffsetDateTime.now(clock)
        val composeInput = mapper.toComposeOutboundInput(
            dto = dto,
            accepted = accepted,
            reason = reason,
            errors = errors,
            mutationStatus = mutationStatus,
            mutation = mutation,
            eventId = generateEventId(),
            storedAt = storedAt,
        )

        val composed = mapper.toComposeOutboundOutput(
            runtimeFacade.run("ComposeOutbound", composeInput),
        )
        val ack = mapper.toAck(composed)
        val event = mapper.toUpdatedEvent(composed)

        if (ack != null) {
            outbox.pushAck(ack)
        }
        if (event != null) {
            outbox.pushEvent(event)
        }

        return PriceChangeResponse(
            transactionId = dto.transactionId,
            accepted = accepted,
            mutationStatus = mutationStatus,
            reason = reason,
            errors = errors,
            ack = ack,
            event = event,
        )
    }

    private fun generateEventId(): String = UUID.randomUUID().toString().replace("-", "")
}
