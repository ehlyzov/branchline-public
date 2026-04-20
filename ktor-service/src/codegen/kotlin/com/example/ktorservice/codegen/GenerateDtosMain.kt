package com.example.ktorservice.codegen

import java.nio.file.Path
import kotlin.io.path.readText

fun main(args: Array<String>) {
    require(args.size == 3) {
        "Usage: GenerateDtosMain <contractsJsonFile> <outputDir> <packageName>"
    }

    val contractsFile = Path.of(args[0])
    val outputDir = Path.of(args[1])
    val packageName = args[2]

    val contracts = ContractsJsonCodec.decode(contractsFile.readText())
    KotlinPoetDtoGenerator().generate(
        contracts = contracts,
        outputDir = outputDir,
        packageName = packageName,
    )
}
