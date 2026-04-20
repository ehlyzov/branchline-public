package com.example.ktorservice.codegen

import java.nio.file.Path
import kotlin.io.path.writeText

fun main(args: Array<String>) {
    require(args.size == 2) {
        "Usage: ExtractContractsMain <scriptsDir> <outputFile>"
    }

    val scriptsDir = Path.of(args[0])
    val outputFile = Path.of(args[1])

    val contracts = ContractExtractionService().extractFromScriptsDir(scriptsDir)
    val encoded = ContractsJsonCodec.encode(contracts)

    outputFile.parent?.toFile()?.mkdirs()
    outputFile.writeText(encoded)
}
