package v2.testutils

import v2.ExecutionEngine
import java.util.stream.Stream

/**
 * Utility method sources for parameterizing tests over available execution engines.
 */
object Engines {
    @JvmStatic
    fun all(): Stream<ExecutionEngine> = Stream.of(*ExecutionEngine.values())
}
