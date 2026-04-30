package com.example.ktorservice.contract

import com.example.ktorservice.runtime.BranchlineRuntimeFacade
import com.example.ktorservice.runtime.ContractViolationException
import kotlin.test.Test
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

class ContractValidationTest {
    private val facade = BranchlineRuntimeFacade.fromResources()

    @Test
    fun `valid payload passes strict input contract`() {
        facade.run(
            "ValidateAndPlan",
            mapOf(
                "transactionId" to "tx-1",
                "warehouseId" to "11111111-1111-1111-1111-111111111111",
                "skuId" to "22222222-2222-2222-2222-222222222222",
                "price" to "10.00",
                "effectiveTime" to "2026-01-01T10:00:00Z",
                "source" to "erp",
                "needAck" to true,
            ),
        )
    }

    @Test
    fun `malformed payload fails with deterministic contract error`() {
        val ex = assertFailsWith<ContractViolationException> {
            facade.run(
                "ValidateAndPlan",
                mapOf(
                    "transactionId" to "tx-1",
                    "warehouseId" to "11111111-1111-1111-1111-111111111111",
                    "skuId" to "22222222-2222-2222-2222-222222222222",
                    "price" to "10.00",
                    "effectiveTime" to "2026-01-01T10:00:00Z",
                    "source" to "erp",
                    "needAck" to "true",
                ),
            )
        }

        assertTrue(ex.message?.contains("needAck") == true)
    }
}
