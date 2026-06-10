package io.github.ehlyzov.branchline.benchmarks

import io.github.ehlyzov.branchline.BranchlineFacade
import io.github.ehlyzov.branchline.BranchlineInspectRequest
import io.github.ehlyzov.branchline.FuncDecl
import io.github.ehlyzov.branchline.Lexer
import io.github.ehlyzov.branchline.Parser
import io.github.ehlyzov.branchline.TransformDecl
import io.github.ehlyzov.branchline.cli.BranchlineProgram
import io.github.ehlyzov.branchline.cli.InputFormat
import io.github.ehlyzov.branchline.cli.OutputFormat
import io.github.ehlyzov.branchline.cli.collectInputConversionWarnings
import io.github.ehlyzov.branchline.cli.collectOutputConversionWarnings
import io.github.ehlyzov.branchline.cli.parseXmlInput
import io.github.ehlyzov.branchline.contract.ContractValidationMode
import io.github.ehlyzov.branchline.ir.Exec
import io.github.ehlyzov.branchline.ir.ToIR
import io.github.ehlyzov.branchline.json.JsonNumberMode
import io.github.ehlyzov.branchline.std.StdLib
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import org.openjdk.jmh.annotations.Benchmark
import org.openjdk.jmh.annotations.BenchmarkMode
import org.openjdk.jmh.annotations.Level
import org.openjdk.jmh.annotations.Mode
import org.openjdk.jmh.annotations.OutputTimeUnit
import org.openjdk.jmh.annotations.Param
import org.openjdk.jmh.annotations.Scope
import org.openjdk.jmh.annotations.Setup
import org.openjdk.jmh.annotations.State
import org.openjdk.jmh.infra.Blackhole
import java.util.concurrent.TimeUnit

@State(Scope.Benchmark)
@BenchmarkMode(Mode.SampleTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
public open class BranchlineSpecificBenchmark {
    @Param("small", "medium", "large")
    public lateinit var dataset: String

    private lateinit var input: Map<String, Any?>
    private lateinit var env: MutableMap<String, Any?>
    private lateinit var xmlProgram: BranchlineProgram
    private lateinit var xmlTransform: TransformDecl
    private lateinit var canonicalMutationExec: Exec
    private lateinit var legacySelfAppendExec: Exec

    @Setup(Level.Trial)
    public fun setup() {
        val size = datasetSizeFromParam(dataset)
        input = BenchDatasets.buildInput(size)
        xmlProgram = BranchlineProgram(XML_TO_JSON_ORDER_PROGRAM)
        xmlTransform = xmlProgram.selectTransform("XmlToJsonOrder")
        canonicalMutationExec = buildExec(CANONICAL_PLUS_ASSIGN_PROGRAM)
        legacySelfAppendExec = buildExec(LEGACY_SELF_APPEND_PROGRAM)
    }

    @Setup(Level.Invocation)
    public fun resetEnv() {
        env = BenchDatasets.buildEnv(input)
    }

    /** Branchline-specific case id: xml-to-json-order. */
    @Benchmark
    public fun xmlToJsonOrder(bh: Blackhole) {
        val parsed = parseXmlInput(XML_ORDER_INPUT)
        bh.consume(xmlProgram.executeWithContracts(xmlTransform, parsed, ContractValidationMode.OFF))
    }

    /** Branchline-specific case id: contract-infer-and-diff. */
    @Benchmark
    public fun contractInferAndDiff(bh: Blackhole) {
        val oldContract = BranchlineFacade.inspect(
            BranchlineInspectRequest(
                programText = CONTRACT_BASELINE_PROGRAM,
                transformName = "NormalizeOrder",
                includeWitness = true,
            )
        ).transforms.single().mergedContract
        val newContract = BranchlineFacade.inspect(
            BranchlineInspectRequest(
                programText = CONTRACT_CANDIDATE_PROGRAM,
                transformName = "NormalizeOrder",
                includeWitness = true,
            )
        ).transforms.single().mergedContract
        bh.consume(contractDiffReport(oldContract, newContract))
    }

    /** Branchline-specific case id: inspect-normalize-loop. */
    @Benchmark
    public fun inspectNormalizeLoop(bh: Blackhole) {
        val inspected = BranchlineFacade.inspect(
            BranchlineInspectRequest(
                programText = INSPECT_NORMALIZE_PROGRAM,
                transformName = "NormalizeOrder",
                includeDebugMetadata = true,
                includeWitness = true,
                includeNormalizedSource = true,
            )
        )
        bh.consume(inspected.inspectJson(pretty = false))
    }

    /** Branchline-specific case id: conversion-loss-audit. */
    @Benchmark
    public fun conversionLossAudit(bh: Blackhole) {
        val parsed = parseXmlInput(CONVERSION_LOSS_XML_INPUT)
        val inputWarnings = collectInputConversionWarnings(
            rawText = CONVERSION_LOSS_XML_INPUT,
            format = InputFormat.XML,
            parsed = parsed,
        )
        val outputWarnings = collectOutputConversionWarnings(
            value = CONVERSION_LOSS_OUTPUT_VALUE,
            format = OutputFormat.XML_COMPACT,
            jsonNumberMode = JsonNumberMode.SAFE,
        )
        bh.consume(inputWarnings + outputWarnings)
    }

    /** Branchline-specific case id: canonical-mutation-style. */
    @Benchmark
    public fun canonicalMutationStylePlusAssign(bh: Blackhole) {
        bh.consume(canonicalMutationExec.run(env))
    }

    /** Branchline-specific case id: canonical-mutation-style. */
    @Benchmark
    public fun canonicalMutationStyleLegacySelfAppend(bh: Blackhole) {
        bh.consume(legacySelfAppendExec.run(env))
    }
}

private val XML_ORDER_INPUT = """
    <order id="A-100" channel="web">
      <customer id="C-7">
        <name>Ada Lovelace</name>
      </customer>
      <line sku="SKU-1"><qty>2</qty></line>
      <line sku="SKU-2"><qty>1</qty></line>
      <line sku="SKU-3"><qty>5</qty></line>
      <note priority="high">ship before noon</note>
    </order>
""".trimIndent()

private val XML_TO_JSON_ORDER_PROGRAM = """
    TRANSFORM XmlToJsonOrder {
        LET order = input.order
        LET lines = order.line
        OUTPUT {
            orderId: order["@id"],
            channel: order["@channel"],
            customerId: order.customer["@id"],
            customerName: order.customer.name["${'$'}"],
            skus: [line["@sku"] FOR EACH line IN lines],
            quantities: [line.qty["${'$'}"] FOR EACH line IN lines],
            note: order.note["${'$'}"],
            notePriority: order.note["@priority"]
        }
    }
""".trimIndent()

private val INSPECT_NORMALIZE_PROGRAM = """
    TYPE OrderStatus = enum { open, paid, held }

    TRANSFORM NormalizeOrder(input: { id: string, status: OrderStatus?, lines: [any] }) -> {
        id: string,
        status: OrderStatus,
        skuCount: number,
        tags: [string]
    } {
        LET status = input.status ?? "open"
        LET tags = []
        FOR EACH line IN input.lines {
            tags += line.sku
        }
        OUTPUT {
            id: input.id,
            status: status,
            skuCount: LENGTH(tags),
            tags: tags
        }
    }
""".trimIndent()

private val CONTRACT_BASELINE_PROGRAM = INSPECT_NORMALIZE_PROGRAM

private val CONTRACT_CANDIDATE_PROGRAM = """
    TYPE OrderStatus = enum { open, paid, held, cancelled }

    TRANSFORM NormalizeOrder(input: { id: string, status: OrderStatus?, lines: [any], region: string? }) -> {
        id: string,
        status: OrderStatus,
        skuCount: number,
        tags: [string],
        region: string
    } {
        LET status = input.status ?? "open"
        LET tags = []
        FOR EACH line IN input.lines {
            tags += line.sku
        }
        OUTPUT {
            id: input.id,
            status: status,
            skuCount: LENGTH(tags),
            tags: tags,
            region: input.region ?? "global"
        }
    }
""".trimIndent()

private val CONVERSION_LOSS_XML_INPUT = """
    <?xml version="1.0"?>
    <?branchline audit?>
    <doc>
      <!-- dropped comment -->
      before<section id="intro">Intro</section>after
    </doc>
""".trimIndent()

private val CONVERSION_LOSS_OUTPUT_VALUE: Map<String, Any?> = linkedMapOf(
    "doc" to linkedMapOf(
        "${'$'}1" to "before",
        "section" to linkedMapOf(
            "@id" to "intro",
            "${'$'}" to "Intro",
        ),
        "${'$'}2" to "after",
    ),
)

private val CANONICAL_PLUS_ASSIGN_PROGRAM = """
    TRANSFORM CanonicalMutation {
        LET ids = []
        FOR EACH order IN input.orders {
            ids += order.id
        }
        OUTPUT {
            count: LENGTH(ids)
        }
    }
""".trimIndent()

private val LEGACY_SELF_APPEND_PROGRAM = """
    TRANSFORM LegacySelfAppend {
        LET ids = []
        FOR EACH order IN input.orders {
            SET ids = APPEND(ids, order.id)
        }
        OUTPUT {
            count: LENGTH(ids)
        }
    }
""".trimIndent()

private fun contractDiffReport(oldContract: JsonObject, newContract: JsonObject): Map<String, Any?> {
    val oldPaths = collectJsonPaths(oldContract)
    val newPaths = collectJsonPaths(newContract)
    return linkedMapOf(
        "removed" to (oldPaths - newPaths).sorted(),
        "added" to (newPaths - oldPaths).sorted(),
        "unchangedCount" to oldPaths.intersect(newPaths).size,
    )
}

private fun collectJsonPaths(element: JsonElement, prefix: String = ""): Set<String> {
    if (element !is JsonObject) return if (prefix.isBlank()) emptySet() else setOf(prefix)
    val paths = linkedSetOf<String>()
    for ((key, value) in element) {
        val child = if (prefix.isBlank()) key else "$prefix.$key"
        paths += child
        paths += collectJsonPaths(value, child)
    }
    return paths
}

private fun datasetSizeFromParam(param: String): DatasetSize {
    return when (param.lowercase()) {
        "small" -> DatasetSize.SMALL
        "medium" -> DatasetSize.MEDIUM
        "large" -> DatasetSize.LARGE
        else -> error("Unknown dataset size: $param")
    }
}

private fun buildExec(program: String): Exec {
    val hostFns = StdLib.fns
    val tokens = Lexer(program).lex()
    val parsed = Parser(tokens, program).parse()
    val funcs = parsed.decls.filterIsInstance<FuncDecl>().associateBy { it.name }
    val transform = parsed.decls.filterIsInstance<TransformDecl>().single()
    val ir = ToIR(funcs, hostFns).compile(transform.body.statements)
    return Exec(
        ir = ir,
        hostFns = hostFns,
        hostFnMeta = StdLib.meta,
        funcs = funcs,
    )
}
