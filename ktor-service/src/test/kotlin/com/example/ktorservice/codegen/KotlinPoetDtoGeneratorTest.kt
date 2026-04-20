package com.example.ktorservice.codegen

import io.github.ehlyzov.branchline.contract.ContractSource
import io.github.ehlyzov.branchline.contract.GuaranteeSchema
import io.github.ehlyzov.branchline.contract.NodeKind
import io.github.ehlyzov.branchline.contract.Node
import io.github.ehlyzov.branchline.contract.RequirementSchema
import io.github.ehlyzov.branchline.contract.TransformContract
import java.nio.file.Files
import kotlin.io.path.readText
import kotlin.test.Test
import kotlin.test.assertTrue

class KotlinPoetDtoGeneratorTest {
    @Test
    fun `generates stable dto files for simple contract`() {
        val generator = KotlinPoetDtoGenerator()
        val outputDir = Files.createTempDirectory("kotlinpoet-dto-test")

        val contracts = linkedMapOf(
            "Simple" to simpleContract(),
        )

        generator.generate(
            contracts = contracts,
            outputDir = outputDir,
            packageName = "com.example.generated",
        )

        val dtoFile = outputDir.resolve("com/example/generated/SimpleContractsDtos.kt")
        val indexFile = outputDir.resolve("com/example/generated/GeneratedContractsIndex.kt")

        assertTrue(Files.exists(dtoFile))
        assertTrue(Files.exists(indexFile))

        val dtoText = dtoFile.readText()
        val indexText = indexFile.readText()

        assertTrue(dtoText.contains("class SimpleInputDto"))
        assertTrue(dtoText.contains("class SimpleOutputDto"))
        assertTrue(indexText.contains("object GeneratedContractsIndex"))
        assertTrue(indexText.contains("\"Simple\""))
    }

    private fun simpleContract(): TransformContract {
        val inputRoot = Node(
            required = true,
            kind = NodeKind.OBJECT,
            open = false,
            children = linkedMapOf(
                "name" to Node(required = true, kind = NodeKind.TEXT),
            ),
        )
        val outputRoot = Node(
            required = true,
            kind = NodeKind.OBJECT,
            open = false,
            children = linkedMapOf(
                "ok" to Node(required = true, kind = NodeKind.BOOLEAN),
            ),
        )

        return TransformContract(
            input = RequirementSchema(
                root = inputRoot,
                obligations = emptyList(),
                opaqueRegions = emptyList(),
            ),
            output = GuaranteeSchema(
                root = outputRoot,
                obligations = emptyList(),
                mayEmitNull = false,
                opaqueRegions = emptyList(),
            ),
            source = ContractSource.INFERRED,
        )
    }
}
