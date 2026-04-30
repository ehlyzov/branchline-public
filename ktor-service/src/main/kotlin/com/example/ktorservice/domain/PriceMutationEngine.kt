package com.example.ktorservice.domain

import java.time.Clock
import java.time.OffsetDateTime
import java.util.UUID

class PriceMutationEngine(
    private val store: InMemoryPriceStore,
    private val clock: Clock,
) {
    fun apply(dto: ProductPriceKafkaDto): PriceMutationResult {
        val existing = store.get(dto.skuId, dto.warehouseId)
        val storedAt = OffsetDateTime.now(clock)
        if (existing == null) {
            val created = PriceSnapshot(
                id = UUID.randomUUID(),
                productId = dto.skuId,
                warehouseId = dto.warehouseId,
                skuId = dto.skuId,
                price = dto.price,
                createdAt = storedAt,
                updatedAt = storedAt,
                transactionId = dto.transactionId,
                effectiveTime = dto.effectiveTime,
                source = dto.source,
            )
            store.save(created)
            return PriceMutationResult(
                status = PriceMutationStatus.CREATED,
                price = created,
            )
        }

        val status = classify(existing, dto)
        val snapshot = when (status) {
            PriceMutationStatus.CREATED -> error("CREATED status cannot be produced when snapshot exists")
            PriceMutationStatus.UPDATED -> {
                val updated = existing.copy(
                    price = dto.price,
                    updatedAt = storedAt,
                    transactionId = dto.transactionId,
                    effectiveTime = dto.effectiveTime,
                    source = dto.source,
                )
                store.save(updated)
            }

            PriceMutationStatus.DUPLICATE,
            PriceMutationStatus.STALE,
            -> existing
        }

        return PriceMutationResult(status = status, price = snapshot)
    }

    private fun classify(existing: PriceSnapshot, incoming: ProductPriceKafkaDto): PriceMutationStatus {
        return when {
            incoming.effectiveTime > existing.effectiveTime -> PriceMutationStatus.UPDATED
            incoming.effectiveTime == existing.effectiveTime && incoming.transactionId > existing.transactionId ->
                PriceMutationStatus.UPDATED

            incoming.effectiveTime == existing.effectiveTime && incoming.transactionId == existing.transactionId ->
                PriceMutationStatus.DUPLICATE

            else -> PriceMutationStatus.STALE
        }
    }
}
