package com.example.ktorservice.codegen

import io.github.ehlyzov.branchline.Lexer
import io.github.ehlyzov.branchline.Parser
import io.github.ehlyzov.branchline.ParseException
import io.github.ehlyzov.branchline.TransformDecl
import io.github.ehlyzov.branchline.TypeDecl
import io.github.ehlyzov.branchline.contract.TransformContractBuilder
import io.github.ehlyzov.branchline.contract.TransformContract
import io.github.ehlyzov.branchline.sema.SemanticAnalyzer
import io.github.ehlyzov.branchline.sema.TypeResolver
import io.github.ehlyzov.branchline.std.StdLib
import java.nio.file.Files
import java.nio.file.Path
import kotlin.io.path.isRegularFile
import kotlin.io.path.name
import kotlin.io.path.readText

class ContractExtractionService {
    private val hostFnNames: Set<String> = StdLib.fns.keys + setOf("DISTINCT_BY", "SORT_BY")

    fun extractFromScriptsDir(scriptsDir: Path): LinkedHashMap<String, TransformContract> {
        require(Files.exists(scriptsDir)) { "Branchline scripts dir does not exist: $scriptsDir" }
        val contracts = LinkedHashMap<String, TransformContract>()
        val scriptFiles = listScripts(scriptsDir)
        for (scriptFile in scriptFiles) {
            extractFromSingleScript(scriptFile, contracts)
        }
        return contracts
    }

    private fun extractFromSingleScript(
        scriptFile: Path,
        output: LinkedHashMap<String, TransformContract>,
    ) {
        val source = scriptFile.readText()
        val tokens = Lexer(source).lex()
        val program = try {
            Parser(tokens, source).parse()
        } catch (ex: ParseException) {
            throw IllegalArgumentException("Failed to parse $scriptFile: ${ex.message}", ex)
        }

        SemanticAnalyzer(hostFnNames).analyze(program)
        val typeDecls = program.decls.filterIsInstance<TypeDecl>()
        val typeResolver = TypeResolver(typeDecls)
        val contractBuilder = TransformContractBuilder(typeResolver, hostFnNames)
        val transforms = program.decls.filterIsInstance<TransformDecl>().sortedBy { it.name ?: "" }

        for (transform in transforms) {
            val name = transform.name ?: continue
            check(!output.containsKey(name)) {
                "Duplicate transform name '$name' across scripts; cannot build deterministic contracts index"
            }
            output[name] = contractBuilder.build(transform)
        }
    }

    private fun listScripts(scriptsDir: Path): List<Path> {
        val result = mutableListOf<Path>()
        Files.walk(scriptsDir).use { paths ->
            paths
                .filter { it.isRegularFile() }
                .filter { it.name.endsWith(".bl") }
                .forEach { result.add(it) }
        }
        return result.sortedBy { it.toAbsolutePath().toString() }
    }
}
