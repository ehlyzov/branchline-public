package io.github.ehlyzov.branchline.benchmarks

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
import io.github.ehlyzov.branchline.FuncDecl
import io.github.ehlyzov.branchline.Lexer
import io.github.ehlyzov.branchline.Parser
import io.github.ehlyzov.branchline.TransformDecl
import io.github.ehlyzov.branchline.ir.Exec
import io.github.ehlyzov.branchline.ir.ToIR
import io.github.ehlyzov.branchline.std.StdLib
import java.util.concurrent.TimeUnit

@State(Scope.Benchmark)
@BenchmarkMode(Mode.SampleTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
public open class InterpreterTransformBenchmark {
    @Param("small", "medium", "large")
    public lateinit var dataset: String

    private lateinit var input: Map<String, Any?>
    private lateinit var env: MutableMap<String, Any?>
    private lateinit var pathExec: Exec
    private lateinit var arrayExec: Exec
    private lateinit var transformExec: Exec
    private lateinit var nestedPathSetExec: Exec
    private lateinit var deepNestedSetExec: Exec
    private lateinit var nestedAppendToExec: Exec
    private lateinit var stdlibCascadeAppendExec: Exec

    @Setup(Level.Trial)
    public fun setup() {
        val size = datasetSizeFromParam(dataset)
        input = BenchDatasets.buildInput(size)
        pathExec = buildExec(PATH_TRANSFORM)
        arrayExec = buildExec(ARRAY_COMP_TRANSFORM)
        transformExec = buildExec(TYPICAL_TRANSFORM)
        nestedPathSetExec = buildExec(NESTED_PATH_SET)
        deepNestedSetExec = buildExec(DEEP_NESTED_SET)
        nestedAppendToExec = buildExec(NESTED_APPEND_TO)
        stdlibCascadeAppendExec = buildExec(STDLIB_CASCADE_APPEND)
    }

    @Setup(Level.Invocation)
    public fun resetEnv() {
        env = BenchDatasets.buildEnv(input)
    }

    @Benchmark
    public fun pathExpressions(bh: Blackhole) {
        bh.consume(pathExec.run(env))
    }

    @Benchmark
    public fun arrayComprehensions(bh: Blackhole) {
        bh.consume(arrayExec.run(env))
    }

    @Benchmark
    public fun typicalTransform(bh: Blackhole) {
        bh.consume(transformExec.run(env))
    }

    /**
     * T1.3 probe: single-segment SET inside FOR EACH. Each iteration triggers
     * one withUpdated + bubbleUp of depth 1. Scales linearly with order count.
     */
    @Benchmark
    public fun nestedPathSetInLoop(bh: Blackhole) {
        bh.consume(nestedPathSetExec.run(env))
    }

    /**
     * T1.3 probe: multi-segment SET inside nested FOR EACH. Each inner-loop
     * iteration triggers withReplaced(items[]) + withUpdated(order) +
     * withReplaced(orders[]) + ... walking the bubbleUp chain to the root.
     * Quadratic-shaped allocation if copy is not amortized.
     */
    @Benchmark
    public fun deepNestedSet(bh: Blackhole) {
        bh.consume(deepNestedSetExec.run(env))
    }

    /**
     * T1.3 probe: APPEND TO into a nested-path list inside a FOR EACH. Each
     * iteration re-clones the basket map AND the basket.items list. Classical
     * O(n^2) shape if path-update copy dominates.
     */
    @Benchmark
    public fun nestedAppendTo(bh: Blackhole) {
        bh.consume(nestedAppendToExec.run(env))
    }

    /**
     * T1.3 control: stdlib REDUCE+APPEND copy chain. Bypasses bubbleUp/SET
     * machinery entirely; isolates the stdlib-only portion of the persistent-
     * update cost so the previous three benchmarks can be attributed correctly.
     */
    @Benchmark
    public fun stdlibCascadeAppend(bh: Blackhole) {
        bh.consume(stdlibCascadeAppendExec.run(env))
    }
}

private val PATH_TRANSFORM = """
    TRANSFORM T {
        LET firstSku = input.orders[0].items[0].sku;
        LET firstQty = input.orders[0].items[0].qty;
        LET secondSku = input.orders[0].items[1].sku;
        OUTPUT {
            customer: input.customer.name,
            firstSku: firstSku,
            firstQty: firstQty,
            secondSku: secondSku,
        }
    }
""".trimIndent()

private val ARRAY_COMP_TRANSFORM = """
    TRANSFORM T {
        LET expensive = [o.id FOR EACH o IN input.orders WHERE o.total > 150];
        LET skus = [i.sku FOR EACH i IN input.orders[0].items];
        OUTPUT {
            expensive: expensive,
            skus: skus,
        }
    }
""".trimIndent()

private val TYPICAL_TRANSFORM = """
    TRANSFORM T {
        LET total = 0;
        FOR EACH order IN input.orders {
            SET total = total + order.total;
        }
        OUTPUT {
            orderCount: LENGTH(input.orders),
            total: total,
        }
    }
""".trimIndent()

// T1.3 probes: SET/APPEND on container-typed paths.

private val NESTED_PATH_SET = """
    TRANSFORM T {
        FOR EACH order IN input.orders {
            SET order.tax = order.total * 0.1;
        }
        OUTPUT {
            orderCount: LENGTH(input.orders),
        }
    }
""".trimIndent()

private val DEEP_NESTED_SET = """
    TRANSFORM T {
        FOR EACH order IN input.orders {
            FOR EACH item IN order.items {
                SET item.price = item.price + 1;
            }
        }
        OUTPUT {
            orderCount: LENGTH(input.orders),
        }
    }
""".trimIndent()

private val NESTED_APPEND_TO = """
    TRANSFORM T {
        LET basket = { items: [] };
        FOR EACH order IN input.orders {
            APPEND TO basket.items order.id;
        }
        OUTPUT {
            count: LENGTH(basket.items),
        }
    }
""".trimIndent()

private val STDLIB_CASCADE_APPEND = """
    TRANSFORM T {
        LET acc = REDUCE(input.orders, [], (a, order) -> APPEND(a, order.id));
        OUTPUT {
            count: LENGTH(acc),
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

private fun buildExec(program: String): Exec {
    val hostFns = StdLib.fns
    val tokens = Lexer(program).lex()
    val parsed = Parser(tokens, program).parse()
    val funcs = parsed.decls.filterIsInstance<FuncDecl>().associateBy { it.name }
    val transforms = parsed.decls.filterIsInstance<TransformDecl>()
    val transform = transforms.single()
    val ir = ToIR(funcs, hostFns).compile(transform.body.statements)
    return Exec(
        ir = ir,
        hostFns = hostFns,
        hostFnMeta = StdLib.meta,
        funcs = funcs,
    )
}
