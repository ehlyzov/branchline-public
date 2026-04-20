package com.example.ktorservice.domain

import com.fasterxml.jackson.annotation.JsonInclude
import java.math.BigDecimal
import java.time.OffsetDateTime
import java.util.UUID

data class ProductPriceKafkaDto(
    val transactionId: String,
    val warehouseId: UUID,
    val skuId: UUID,
    val price: BigDecimal,
    val effectiveTime: OffsetDateTime,
    val source: String,
    val needAck: Boolean = false,
)

@JsonInclude(JsonInclude.Include.NON_EMPTY)
data class PriceChangeAckMessage(
    val transactionId: String,
    val status: AckStatus,
    val reason: AckReason? = null,
    val errors: List<String> = emptyList(),
) {
    enum class AckStatus {
        ACCEPTED,
        REJECTED,
    }

    enum class AckReason {
        VALIDATION_FAILED,
        STALE_RECORD,
    }
}

data class PriceUpdatedEvent(
    val transactionId: String,
    val warehouseId: UUID,
    val skuId: UUID,
    val productId: UUID,
    val price: BigDecimal,
    val effectiveTime: OffsetDateTime,
    val storedAt: OffsetDateTime,
    val eventId: String,
    val source: String,
)

enum class PriceMutationStatus {
    CREATED,
    UPDATED,
    DUPLICATE,
    STALE,
}

data class PriceSnapshot(
    val id: UUID,
    val productId: UUID,
    val warehouseId: UUID,
    val skuId: UUID,
    val price: BigDecimal,
    val createdAt: OffsetDateTime,
    val updatedAt: OffsetDateTime,
    val transactionId: String,
    val effectiveTime: OffsetDateTime,
    val source: String,
)

data class PriceMutationResult(
    val status: PriceMutationStatus,
    val price: PriceSnapshot,
)

data class PriceHistoryRecord(
    val transactionId: String,
    val productId: UUID,
    val warehouseId: UUID,
    val skuId: UUID,
    val price: BigDecimal,
    val effectiveTime: OffsetDateTime,
    val storedAt: OffsetDateTime,
    val status: PriceMutationStatus,
    val source: String,
)
