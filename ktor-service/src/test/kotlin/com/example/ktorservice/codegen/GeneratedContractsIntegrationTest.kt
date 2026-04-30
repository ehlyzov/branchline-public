package com.example.ktorservice.codegen

import com.example.ktorservice.generated.contracts.GeneratedContractsIndex
import com.example.ktorservice.runtime.GeneratedContractsRegistry
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class GeneratedContractsIntegrationTest {
    @Test
    fun `generated contracts registry aligns with generated dto index`() {
        val contracts = GeneratedContractsRegistry.loadFromResources()

        assertTrue(contracts.isNotEmpty())
        assertEquals(GeneratedContractsIndex.transforms, contracts.keys.toSet())
        assertEquals(GeneratedContractsIndex.transforms, GeneratedContractsIndex.inputDtoByTransform.keys)
        assertEquals(GeneratedContractsIndex.transforms, GeneratedContractsIndex.outputDtoByTransform.keys)
    }
}
