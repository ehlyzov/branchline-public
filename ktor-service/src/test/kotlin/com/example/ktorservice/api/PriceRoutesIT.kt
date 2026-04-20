package com.example.ktorservice.api

import com.example.ktorservice.ApplicationConfig
import com.example.ktorservice.module
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.http.contentType
import io.ktor.client.statement.bodyAsText
import io.ktor.server.testing.testApplication
import java.math.BigDecimal
import java.time.Clock
import java.time.Instant
import java.time.ZoneOffset
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull

class PriceRoutesIT {
    private val objectMapper: ObjectMapper = jacksonObjectMapper().registerModule(JavaTimeModule())
    private val fixedClock = Clock.fixed(Instant.parse("2026-01-01T10:00:00Z"), ZoneOffset.UTC)

    @Test
    fun `happy path create then update`() = testApplication {
        application {
            module(ApplicationConfig(clock = fixedClock))
        }

        val createResponse = client.post("/api/v1/price-change") {
            contentType(ContentType.Application.Json)
            setBody(dtoJson(transactionId = "tx-1", price = "10.00", effectiveTime = "2026-01-01T10:00:00Z"))
        }
        assertEquals(HttpStatusCode.OK, createResponse.status)
        val createPayload: Map<String, Any?> = objectMapper.readValue(createResponse.bodyAsText())
        assertEquals("CREATED", createPayload["mutationStatus"])
        assertEquals(true, createPayload["accepted"])

        val updateResponse = client.post("/api/v1/price-change") {
            contentType(ContentType.Application.Json)
            setBody(dtoJson(transactionId = "tx-2", price = "11.00", effectiveTime = "2026-01-01T10:01:00Z"))
        }
        assertEquals(HttpStatusCode.OK, updateResponse.status)
        val updatePayload: Map<String, Any?> = objectMapper.readValue(updateResponse.bodyAsText())
        assertEquals("UPDATED", updatePayload["mutationStatus"])

        val prices: List<Map<String, Any?>> = objectMapper.readValue(client.get("/api/v1/prices").bodyAsText())
        assertEquals(1, prices.size)
        assertEquals(0, BigDecimal("11.00").compareTo(BigDecimal(prices.first()["price"].toString())))

        val history: List<Map<String, Any?>> = objectMapper.readValue(client.get("/api/v1/history").bodyAsText())
        assertEquals(2, history.size)

        val acks: List<Map<String, Any?>> = objectMapper.readValue(client.get("/api/v1/outbox/acks").bodyAsText())
        assertEquals(2, acks.size)

        val events: List<Map<String, Any?>> = objectMapper.readValue(client.get("/api/v1/outbox/events").bodyAsText())
        assertEquals(2, events.size)
    }

    @Test
    fun `invalid payload produces rejected ack with validation reason`() = testApplication {
        application {
            module(ApplicationConfig(clock = fixedClock))
        }

        val response = client.post("/api/v1/price-change") {
            contentType(ContentType.Application.Json)
            setBody(dtoJson(transactionId = "tx-invalid", price = "-1.00", effectiveTime = "2026-01-01T10:00:00Z"))
        }

        assertEquals(HttpStatusCode.OK, response.status)
        val payload: Map<String, Any?> = objectMapper.readValue(response.bodyAsText())
        assertEquals(false, payload["accepted"])
        val ack = payload["ack"] as Map<*, *>
        assertEquals("REJECTED", ack["status"])
        assertEquals("VALIDATION_FAILED", ack["reason"])

        val events: List<Map<String, Any?>> = objectMapper.readValue(client.get("/api/v1/outbox/events").bodyAsText())
        assertEquals(0, events.size)
    }

    @Test
    fun `stale payload is rejected with stale reason`() = testApplication {
        application {
            module(ApplicationConfig(clock = fixedClock))
        }

        client.post("/api/v1/price-change") {
            contentType(ContentType.Application.Json)
            setBody(dtoJson(transactionId = "tx-fresh", price = "10.00", effectiveTime = "2026-01-01T10:10:00Z"))
        }

        val staleResponse = client.post("/api/v1/price-change") {
            contentType(ContentType.Application.Json)
            setBody(dtoJson(transactionId = "tx-stale", price = "11.00", effectiveTime = "2026-01-01T10:00:00Z"))
        }

        val payload: Map<String, Any?> = objectMapper.readValue(staleResponse.bodyAsText())
        assertEquals(false, payload["accepted"])
        assertEquals("STALE", payload["mutationStatus"])
        val ack = payload["ack"] as Map<*, *>
        assertEquals("STALE_RECORD", ack["reason"])

        val events: List<Map<String, Any?>> = objectMapper.readValue(client.get("/api/v1/outbox/events").bodyAsText())
        assertEquals(1, events.size)
    }

    @Test
    fun `duplicate transaction id returns accepted ack only`() = testApplication {
        application {
            module(ApplicationConfig(clock = fixedClock))
        }

        client.post("/api/v1/price-change") {
            contentType(ContentType.Application.Json)
            setBody(dtoJson(transactionId = "tx-dupe", price = "10.00", effectiveTime = "2026-01-01T10:00:00Z"))
        }

        val duplicateResponse = client.post("/api/v1/price-change") {
            contentType(ContentType.Application.Json)
            setBody(dtoJson(transactionId = "tx-dupe", price = "99.00", effectiveTime = "2026-01-01T10:05:00Z"))
        }

        val payload: Map<String, Any?> = objectMapper.readValue(duplicateResponse.bodyAsText())
        assertEquals(true, payload["accepted"])
        assertEquals("DUPLICATE", payload["mutationStatus"])
        assertNotNull(payload["ack"])
        assertNull(payload["event"])

        val events: List<Map<String, Any?>> = objectMapper.readValue(client.get("/api/v1/outbox/events").bodyAsText())
        assertEquals(1, events.size)
    }

    @Test
    fun `batch endpoint switches mode`() = testApplication {
        application {
            module(ApplicationConfig(clock = fixedClock))
        }

        val uniqueBatch = client.post("/api/v1/price-change/batch") {
            contentType(ContentType.Application.Json)
            setBody(
                """
                {
                  "items": [
                    ${dtoJson(transactionId = "tx-b1", price = "10.00", effectiveTime = "2026-01-01T10:00:00Z")},
                    ${dtoJson(transactionId = "tx-b2", price = "11.00", effectiveTime = "2026-01-01T10:01:00Z")}
                  ]
                }
                """.trimIndent(),
            )
        }
        val uniquePayload: Map<String, Any?> = objectMapper.readValue(uniqueBatch.bodyAsText())
        assertEquals("UNIQUE_BATCH", uniquePayload["mode"])

        val fallbackBatch = client.post("/api/v1/price-change/batch") {
            contentType(ContentType.Application.Json)
            setBody(
                """
                {
                  "items": [
                    ${dtoJson(transactionId = "tx-f1", price = "10.00", effectiveTime = "2026-01-01T10:00:00Z")},
                    ${dtoJson(transactionId = "tx-f1", price = "11.00", effectiveTime = "2026-01-01T10:02:00Z")}
                  ]
                }
                """.trimIndent(),
            )
        }
        val fallbackPayload: Map<String, Any?> = objectMapper.readValue(fallbackBatch.bodyAsText())
        assertEquals("SEQUENTIAL_FALLBACK", fallbackPayload["mode"])
    }

    private fun dtoJson(
        transactionId: String,
        price: String,
        effectiveTime: String,
    ): String {
        val payload = mapOf(
            "transactionId" to transactionId,
            "warehouseId" to "11111111-1111-1111-1111-111111111111",
            "skuId" to "22222222-2222-2222-2222-222222222222",
            "price" to BigDecimal(price),
            "effectiveTime" to effectiveTime,
            "source" to "erp",
            "needAck" to true,
        )
        return objectMapper.writeValueAsString(payload)
    }
}
