package com.example.ktorservice.bridge

import com.example.ktorservice.runtime.BranchlineRuntimeFacade
import com.example.ktorservice.runtime.ContractViolationException
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

class BranchlineRuntimeFacadeTest {
    private val facade = BranchlineRuntimeFacade.fromResources()

    @Test
    fun `validate and plan accepts valid payload`() {
        val payload = validPayload(transactionId = "tx-1", price = "10.55")

        val result = facade.run("ValidateAndPlan", payload)

        assertEquals(true, result["accepted"])
        assertEquals("MUTATION", result["outcome"])
        assertEquals("10.55", result["price"])
    }

    @Test
    fun `validate and plan rejects invalid business payload`() {
        val payload = validPayload(transactionId = "tx-2", price = "-1.00")

        val result = facade.run("ValidateAndPlan", payload)

        assertEquals(false, result["accepted"])
        assertEquals("VALIDATION_FAILED", result["reason"])
        assertTrue((result["errors"] as List<*>).isNotEmpty())
    }

    @Test
    fun `detect batch mode falls back when transaction ids are not unique`() {
        val payload = mapOf(
            "items" to listOf(
                mapOf("transactionId" to "tx-dup"),
                mapOf("transactionId" to "tx-dup"),
            ),
        )

        val result = facade.run("DetectBatchMode", payload)

        assertEquals("SEQUENTIAL_FALLBACK", result["mode"])
        assertEquals(2, result["total"])
        assertEquals(1, result["uniqueTransactions"])
    }

    @Test
    fun `compose outbound builds ack and event maps`() {
        val payload = mapOf(
            "transactionId" to "tx-3",
            "needAck" to true,
            "accepted" to true,
            "reason" to null,
            "errors" to emptyList<String>(),
            "mutationStatus" to "CREATED",
            "warehouseId" to "11111111-1111-1111-1111-111111111111",
            "skuId" to "22222222-2222-2222-2222-222222222222",
            "productId" to "22222222-2222-2222-2222-222222222222",
            "price" to "10.55",
            "effectiveTime" to "2026-01-01T10:00:00Z",
            "storedAt" to "2026-01-01T10:00:05Z",
            "eventId" to "evt-1",
            "source" to "erp",
        )

        val result = facade.run("ComposeOutbound", payload)

        val ack = result["ack"] as Map<*, *>
        val event = result["event"] as Map<*, *>
        assertEquals("ACCEPTED", ack["status"])
        assertEquals("tx-3", event["transactionId"])
        assertEquals("evt-1", event["eventId"])
    }

    @Test
    fun `strict input contract rejects malformed payload`() {
        val malformed = mapOf(
            "transactionId" to "tx-4",
            "warehouseId" to "11111111-1111-1111-1111-111111111111",
            "skuId" to "22222222-2222-2222-2222-222222222222",
            "price" to "1.00",
            "effectiveTime" to "2026-01-01T10:00:00Z",
            "source" to "erp",
            "needAck" to "yes",
        )

        val ex = assertFailsWith<ContractViolationException> {
            facade.run("ValidateAndPlan", malformed)
        }

        assertTrue(ex.message?.contains("needAck") == true)
    }

    private fun validPayload(
        transactionId: String,
        price: String = "10.00",
    ): Map<String, Any?> = mapOf(
        "transactionId" to transactionId,
        "warehouseId" to "11111111-1111-1111-1111-111111111111",
        "skuId" to "22222222-2222-2222-2222-222222222222",
        "price" to price,
        "effectiveTime" to "2026-01-01T10:00:00Z",
        "source" to "erp",
        "needAck" to true,
    )
}
