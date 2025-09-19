package v2.ir

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import v2.testutils.buildRunner
import v2.testutils.buildRunnerFromProgram

/* вспомогалка: собираем трансформу-лямбду */
private fun buildExec(body: String): (Map<String, Any?>) -> Any? = buildRunner(body)

class StreamCompilerExtraTest {

    /* 1. строковые литералы и конкатенация */
    @Test fun `string concat`() {
        val exec = buildExec(
            """
            LET msg = "Hello, " ;
            OUTPUT { greet : msg + row.name }      // BinaryExpr + String
        """
        )
        val out = exec(mapOf("name" to "Bob"))
        assertEquals(mapOf("greet" to "Hello, Bob"), out)
    }

    /* 2. приоритет * выше +  */
    @Test fun `precedence mul before plus`() {
        val exec = buildExec(
            """
            LET result = 2 + 5 * 8 ;               // = 42
            OUTPUT { r : result }
        """
        )
        assertEquals(mapOf("r" to 42), exec(emptyMap()))
    }

    /* 3. глубокие PathExpr row.obj.nested */
    @Test fun `deep path`() {
        val exec = buildExec(
            """
            OUTPUT { city : row.customer.address.city }
        """
        )
        val inRow = mapOf(
            "customer" to mapOf(
                "address" to mapOf("city" to "Paris")
            )
        )
        assertEquals(mapOf("city" to "Paris"), exec(inRow))
    }

    /* 4. LET может использовать ранее объявленный LET */
    @Test fun `let depends on let`() {
        val exec = buildExec(
            """
            LET a = 2 ;
            LET b = a * 5 ;
            OUTPUT { b : b }
        """
        )
        assertEquals(mapOf("b" to 10), exec(emptyMap()))
    }

    /* 5. ошибка, если OUTPUT отсутствует */
    @Test fun `no output throws`() {
        val src = """
            SOURCE row;
            TRANSFORM T { stream } { LET x = 1; }
        """
        val exec = buildRunnerFromProgram(src)
        assertThrows<IllegalStateException> { exec(emptyMap()) }
    }
}
