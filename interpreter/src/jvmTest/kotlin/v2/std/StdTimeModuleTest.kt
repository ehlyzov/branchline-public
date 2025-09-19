package v2.std

import v2.testutils.compileAndRun
import java.time.Instant
import kotlin.test.*

class StdTimeModuleTest {
    @Test
    fun now_returns_iso_timestamp() {
        val out = compileAndRun("""OUTPUT { t: NOW() }""")

        @Suppress("UNCHECKED_CAST")
        val t = (out as Map<String, Any?>)["t"] as String
        // parse should succeed if ISO-8601
        val parsed = Instant.parse(t)
        assertEquals(parsed.toString(), t)
    }

    @Test
    fun now_throws_on_arguments() {
        val ex = assertFailsWith<IllegalArgumentException> {
            compileAndRun(
                """
                LET t = NOW("bad") ;
                OUTPUT { t: t }
                """.trimIndent()
            )
        }
        assertTrue(ex.message?.contains("NOW()") == true)
    }
}
