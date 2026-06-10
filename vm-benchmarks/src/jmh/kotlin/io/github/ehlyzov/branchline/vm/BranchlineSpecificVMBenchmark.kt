package io.github.ehlyzov.branchline.vm

import io.github.ehlyzov.branchline.FuncDecl
import io.github.ehlyzov.branchline.Lexer
import io.github.ehlyzov.branchline.Parser
import io.github.ehlyzov.branchline.TransformDecl
import io.github.ehlyzov.branchline.cli.BranchlineProgram
import io.github.ehlyzov.branchline.cli.parseXmlInput
import io.github.ehlyzov.branchline.ir.ToIR
import io.github.ehlyzov.branchline.std.StdLib
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
public open class BranchlineSpecificVMBenchmark {
    @Param("small", "medium", "large")
    public lateinit var dataset: String

    private lateinit var input: Map<String, Any?>
    private lateinit var env: MutableMap<String, Any?>
    private lateinit var xmlProgram: BranchlineProgram
    private lateinit var xmlTransform: TransformDecl
    private lateinit var xmlVmExec: VMExec
    private lateinit var canonicalMutationBytecode: Bytecode
    private lateinit var legacySelfAppendBytecode: Bytecode
    private lateinit var vm: VM

    @Setup(Level.Trial)
    public fun setup() {
        val size = datasetSizeFromParam(dataset)
        input = BenchDatasets.buildInput(size)
        xmlProgram = BranchlineProgram(XML_TO_JSON_ORDER_PROGRAM)
        xmlTransform = xmlProgram.selectTransform("XmlToJsonOrder")
        xmlVmExec = xmlProgram.prepareVmExec(xmlTransform, xmlProgram.compileBytecode(xmlTransform))
        val hostFns = StdLib.fns
        val funcs: Map<String, FuncDecl> = emptyMap()
        vm = VM(hostFns, funcs)
        canonicalMutationBytecode = compileBytecode(CANONICAL_PLUS_ASSIGN_PROGRAM, hostFns, funcs)
        legacySelfAppendBytecode = compileBytecode(LEGACY_SELF_APPEND_PROGRAM, hostFns, funcs)
    }

    @Setup(Level.Invocation)
    public fun resetEnv() {
        env = BenchDatasets.buildEnv(input)
    }

    /** Branchline-specific case id: xml-to-json-order. */
    @Benchmark
    public fun xmlToJsonOrderVm(bh: Blackhole) {
        val parsed = parseXmlInput(XML_ORDER_INPUT)
        val xmlEnv = xmlProgram.buildEnv(xmlTransform, parsed)
        bh.consume(xmlVmExec.run(xmlEnv, stringifyKeys = true))
    }

    /** Branchline-specific case id: canonical-mutation-style. */
    @Benchmark
    public fun canonicalMutationStylePlusAssignVm(bh: Blackhole) {
        bh.consume(vm.execute(canonicalMutationBytecode, env))
    }

    /** Branchline-specific case id: canonical-mutation-style. */
    @Benchmark
    public fun canonicalMutationStyleLegacySelfAppendVm(bh: Blackhole) {
        bh.consume(vm.execute(legacySelfAppendBytecode, env))
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

private fun datasetSizeFromParam(param: String): DatasetSize {
    return when (param.lowercase()) {
        "small" -> DatasetSize.SMALL
        "medium" -> DatasetSize.MEDIUM
        "large" -> DatasetSize.LARGE
        else -> error("Unknown dataset size: $param")
    }
}

private fun compileBytecode(
    program: String,
    hostFns: Map<String, (List<Any?>) -> Any?>,
    funcs: Map<String, FuncDecl>,
): Bytecode {
    val tokens = Lexer(program).lex()
    val parsed = Parser(tokens, program).parse()
    val transform = parsed.decls.filterIsInstance<TransformDecl>().single()
    val ir = ToIR(funcs, hostFns).compile(transform.body.statements)
    return Compiler(funcs, hostFns).compile(ir)
}
