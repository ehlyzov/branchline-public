package com.example.ktorservice.bridge

import com.example.ktorservice.domain.PriceChangeAckMessage
import com.example.ktorservice.domain.PriceUpdatedEvent
import com.example.ktorservice.domain.ProductPriceKafkaDto
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import java.math.BigDecimal
import java.time.OffsetDateTime
import java.util.UUID
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class MapperTest {

    private val mapper = BranchlinePayloadMapper()
    private val objectMapper = jacksonObjectMapper()

    @Test
    fun `dto to generated validate input preserves contract fields`() {
        val dto = ProductPriceKafkaDto(
            transactionId = "tx-1",
            warehouseId = UUID.randomUUID(),
            skuId = UUID.randomUUID(),
            price = BigDecimal("123.45"),
            effectiveTime = OffsetDateTime.parse("2026-02-26T00:00:00Z"),
            source = "mp",
            needAck = true,
        )

        val payload = mapper.toValidateAndPlanInput(dto)

        assertEquals(dto.transactionId, payload.transactionId)
        assertEquals(dto.warehouseId.toString(), payload.warehouseId)
        assertEquals(dto.skuId.toString(), payload.skuId)
        assertEquals("123.45", payload.price)
        assertEquals(dto.effectiveTime.toString(), payload.effectiveTime)
        assertEquals(dto.source, payload.source)
        assertEquals(dto.needAck, payload.needAck)
    }

    @Test
    fun `generated compose output maps to outbound dto types`() {
        val output = mapper.toComposeOutboundOutput(
            mapOf(
                "ack" to mapOf(
                    "transactionId" to "tx-1",
                    "status" to "REJECTED",
                    "reason" to "VALIDATION_FAILED",
                    "errors" to listOf("bad"),
                ),
                "event" to mapOf(
                    "transactionId" to "tx-1",
                    "warehouseId" to UUID.randomUUID().toString(),
                    "skuId" to UUID.randomUUID().toString(),
                    "productId" to UUID.randomUUID().toString(),
                    "price" to BigDecimal("10.00"),
                    "effectiveTime" to "2026-02-26T00:00:00Z",
                    "storedAt" to "2026-02-26T00:00:01Z",
                    "eventId" to "e1",
                    "source" to "mp",
                ),
            ),
        )

        val ack = mapper.toAck(output)
        val event = mapper.toUpdatedEvent(output)

        assertNotNull(ack)
        assertNotNull(event)
        assertEquals(PriceChangeAckMessage.AckStatus.REJECTED, ack.status)
        assertEquals("tx-1", event.transactionId)
        assertEquals(PriceUpdatedEvent::class, event::class)
    }

    @Test
    fun `detect batch input contains only transaction identifiers`() {
        val first = ProductPriceKafkaDto(
            transactionId = "tx-b1",
            warehouseId = UUID.randomUUID(),
            skuId = UUID.randomUUID(),
            price = BigDecimal("10.00"),
            effectiveTime = OffsetDateTime.parse("2026-02-26T00:00:00Z"),
            source = "mp",
            needAck = false,
        )
        val second = first.copy(transactionId = "tx-b2")

        val payloadMap: Map<String, Any?> = objectMapper.convertValue(
            mapper.toDetectBatchModeInput(listOf(first, second)),
            objectMapper.typeFactory.constructMapType(Map::class.java, String::class.java, Any::class.java),
        ) as Map<String, Any?>
        val items = payloadMap["items"] as List<*>
        assertEquals(2, items.size)
        assertTrue(items.all { item ->
            val row = item as Map<*, *>
            row.keys == setOf("transactionId")
        })
    }
}
