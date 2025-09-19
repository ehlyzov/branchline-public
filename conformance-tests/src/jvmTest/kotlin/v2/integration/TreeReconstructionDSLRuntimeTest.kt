package v2.integration

import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import v2.*
import v2.ir.Exec
import v2.ir.ToIR
import v2.ir.TransformRegistry
import v2.ir.makeEval
import v2.std.DefaultSharedStore
import v2.std.SharedResourceKind

class TreeReconstructionDSLRuntimeTest {

    @Test
    fun `runs tree reconstruction transform with SharedStore awaits`() {
        // Minimal runnable DSL adapted from language/examples TreeReconstructionExample.kt
        // Note: The SET to shared store is handled in the test harness after OUTPUT,
        // because write operations to SHARED are not yet supported by Exec.
        val dsl = """
            SHARED nodeParents SINGLE;

            TRANSFORM TreeReconstruction { stream } {
                LET message = row;
                LET treeId = message.treeId;
                LET fromId = message.fromId;
                LET toId = message.toId;

                IF fromId != "root" THEN {
                    LET parentKey = treeId + ":" + fromId;
                    LET parentInfo = AWAIT nodeParents.parentKey;

                    LET childLevel = parentInfo.level + 1;
                    LET childColor = IF childLevel % 2 == 1 THEN "RED" ELSE "BLACK";

                    OUTPUT {
                        "type": "node_created",
                        treeId: treeId,
                        nodeId: toId,
                        parentId: fromId,
                        level: childLevel,
                        color: childColor
                    };
                } ELSE {
                    OUTPUT {
                        "type": "root_created",
                        treeId: treeId,
                        nodeId: toId,
                        parentId: fromId,
                        level: 1,
                        color: "RED"
                    };
                }
            }
        """.trimIndent()

        val tokens = Lexer(dsl).lex()
        val program = Parser(tokens, dsl).parse()
        val transform = program.decls.filterIsInstance<TransformDecl>().single { it.name == "TreeReconstruction" }

        val funcs = program.decls.filterIsInstance<FuncDecl>().associateBy { it.name }
        val hostFns = v2.std.StdLib.fns
        val transforms = program.decls.filterIsInstance<TransformDecl>().associateBy { it.name ?: "" }

        val ir = ToIR(funcs, hostFns).compile(transform.body.statements)
        val registry = TransformRegistry(funcs, hostFns, transforms)

        val sharedStore = DefaultSharedStore().apply {
            addResource("nodeParents", SharedResourceKind.SINGLE)
        }

        val eval = makeEval(hostFns, funcs, registry, sharedStore = sharedStore)
        val exec = Exec(ir, eval)

        // Define a small tree; shuffle simulates out-of-order arrival
        data class Edge(val treeId: String, val fromId: String, val toId: String)
        val edges = listOf(
            Edge("t1", "root", "n1"),
            Edge("t1", "n1", "n2"),
        ).shuffled()

        // Run concurrently so children can await parents
        val results = runBlocking {
            edges.map { e ->
                async {
                    val out = exec.run(mutableMapOf(
                        "row" to mapOf(
                            "treeId" to e.treeId,
                            "fromId" to e.fromId,
                            "toId" to e.toId
                        )
                    )) as Map<*, *>

                    // After producing output, register this node for children
                    val level = out["level"] as Int
                    val key = "parentKey"
                    sharedStore.setOnce("nodeParents", key, mapOf(
                        "nodeId" to e.toId,
                        "level" to level,
                        "treeId" to e.treeId,
                        "parentId" to e.fromId
                    ))
                    out
                }
            }.awaitAll()
        }

        // Verify results
        assertEquals(edges.size, results.size)
        results.forEach { r ->
            val level = r["level"] as Int
            val color = r["color"] as String
            val expectedColor = if (level % 2 == 1) "RED" else "BLACK"
            assertEquals(expectedColor, color)
        }
    }
}
