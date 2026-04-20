package com.example.ktorservice.codegen

import io.github.ehlyzov.branchline.contract.NodeKind
import io.github.ehlyzov.branchline.contract.Node
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class ContractTypeMapperTest {
    @Test
    fun `maps primitive and optional object fields`() {
        val mapper = ContractTypeMapper("com.example.generated")
        val root = Node(
            required = true,
            kind = NodeKind.OBJECT,
            open = false,
            children = linkedMapOf(
                "name" to Node(required = true, kind = NodeKind.TEXT),
                "amount" to Node(required = false, kind = NodeKind.NUMBER),
                "meta" to Node(required = true, kind = NodeKind.OBJECT, open = true),
            ),
        )

        val spec = mapper.createRootDto("Sample", "InputDto", root)
        val rootType = spec.typeSpecs.firstOrNull { it.name == "SampleInputDto" }
        assertNotNull(rootType)

        val ctor = rootType.primaryConstructor
        assertNotNull(ctor)

        val amount = ctor.parameters.firstOrNull { it.name == "amount" }
        assertNotNull(amount)
        assertTrue(amount.type.isNullable)

        val meta = ctor.parameters.firstOrNull { it.name == "meta" }
        assertNotNull(meta)
        assertEquals("com.fasterxml.jackson.databind.JsonNode", meta.type.toString())
    }

    @Test
    fun `maps union with null to nullable JsonNode`() {
        val mapper = ContractTypeMapper("com.example.generated")
        val unionNode = Node(
            required = true,
            kind = NodeKind.UNION,
            options = listOf(
                Node(required = true, kind = NodeKind.TEXT),
                Node(required = true, kind = NodeKind.NULL),
            ),
        )
        val root = Node(
            required = true,
            kind = NodeKind.OBJECT,
            open = false,
            children = linkedMapOf(
                "choice" to unionNode,
            ),
        )

        val spec = mapper.createRootDto("Union", "OutputDto", root)
        val rootType = spec.typeSpecs.firstOrNull { it.name == "UnionOutputDto" }
        assertNotNull(rootType)
        val ctor = rootType.primaryConstructor
        assertNotNull(ctor)

        val choice = ctor.parameters.firstOrNull { it.name == "choice" }
        assertNotNull(choice)
        assertTrue(choice.type.isNullable)
        assertEquals("com.fasterxml.jackson.databind.JsonNode?", choice.type.toString())
    }
}
