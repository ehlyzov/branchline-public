package v2.testutils

import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.MethodSource

/**
 * Meta-annotation to run a test for all available [v2.ExecutionEngine]s.
 */
@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
@ParameterizedTest
@MethodSource("v2.testutils.Engines#all")
annotation class EngineTest
