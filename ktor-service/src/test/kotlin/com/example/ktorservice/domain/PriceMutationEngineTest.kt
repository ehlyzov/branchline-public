package com.example.ktorservice.domain

import com.example.ktorservice.domain.ProductPriceKafkaDto
import java.math.BigDecimal
import java.time.Clock
import java.time.Instant
import java.time.OffsetDateTime
import java.time.ZoneOffset
import java.util.UUID
import kotlin.test.Test
import kotlin.test.assertEquals

class PriceMutationEngineTest {
    private val warehouseId = UUID.fromString("11111111-1111-1111-1111-111111111111")
    private val skuId = UUID.fromString("22222222-2222-2222-2222-222222222222")
    private val clock = Clock.fixed(Instant.parse("2026-01-01T10:00:00Z"), ZoneOffset.UTC)

    @Test
    fun `creates first snapshot`() {
        val store = InMemoryPriceStore()
        val engine = PriceMutationEngine(store, clock)

        val result = engine.apply(dto(transactionId = "tx-1", price = "10.00", effective = "2026-01-01T10:00:00Z"))

        assertEquals(PriceMutationStatus.CREATED, result.status)
        assertEquals(BigDecimal("10.00"), result.price.price)
        assertEquals(1, store.snapshots().size)
    }

    @Test
    fun `updates when incoming record is newer`() {
        val store = InMemoryPriceStore()
        val engine = PriceMutationEngine(store, clock)
        engine.apply(dto(transactionId = "tx-1", price = "10.00", effective = "2026-01-01T10:00:00Z"))

        val result = engine.apply(dto(transactionId = "tx-2", price = "11.00", effective = "2026-01-01T10:01:00Z"))

        assertEquals(PriceMutationStatus.UPDATED, result.status)
        assertEquals(BigDecimal("11.00"), result.price.price)
    }

    @Test
    fun `marks stale when incoming effective time is older`() {
        val store = InMemoryPriceStore()
        val engine = PriceMutationEngine(store, clock)
        engine.apply(dto(transactionId = "tx-1", price = "10.00", effective = "2026-01-01T10:01:00Z"))

        val result = engine.apply(dto(transactionId = "tx-2", price = "11.00", effective = "2026-01-01T10:00:00Z"))

        assertEquals(PriceMutationStatus.STALE, result.status)
        assertEquals(BigDecimal("10.00"), result.price.price)
    }

    @Test
    fun `marks duplicate when transaction and effective time are the same`() {
        val store = InMemoryPriceStore()
        val engine = PriceMutationEngine(store, clock)
        engine.apply(dto(transactionId = "tx-1", price = "10.00", effective = "2026-01-01T10:00:00Z"))

        val result = engine.apply(dto(transactionId = "tx-1", price = "12.00", effective = "2026-01-01T10:00:00Z"))

        assertEquals(PriceMutationStatus.DUPLICATE, result.status)
        assertEquals(BigDecimal("10.00"), result.price.price)
    }

    private fun dto(
        transactionId: String,
        price: String,
        effective: String,
    ): ProductPriceKafkaDto = ProductPriceKafkaDto(
        transactionId = transactionId,
        warehouseId = warehouseId,
        skuId = skuId,
        price = BigDecimal(price),
        effectiveTime = OffsetDateTime.parse(effective),
        source = "erp",
        needAck = true,
    )
}
