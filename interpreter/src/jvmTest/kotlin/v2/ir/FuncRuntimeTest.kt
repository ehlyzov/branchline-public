package v2.ir

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import v2.testutils.buildRunnerFromProgram

/* ----------------------------------------------------------------
   helper: компилируем текст, собираем карту функций,
   возвращаем executor-лямбду  Map<String,Any?> -> Any?
---------------------------------------------------------------- */
private fun execOf(src: String): (Map<String, Any?>) -> Any? = buildRunnerFromProgram(src)

class FuncRuntimeTest {

    /* 1. простая функция-сложение */
    @Test fun `simple add`() {
        val exec =
            execOf(
                """
            SOURCE row;
            FUNC add(a,b) = a + b ;
            TRANSFORM T { stream } {
                LET s = add(row.x , row.y);
                OUTPUT { sum : s }
            }
                """.trimIndent()
            )

        assertEquals(
            mapOf("sum" to 7),
            exec(mapOf("x" to 3, "y" to 4))
        )
    }

    /* 2. функция вызывает другую функцию */
    @Test fun `nested calls`() {
        val exec =
            execOf(
                """
            SOURCE row;
            FUNC double(n) = n * 2 ;
            FUNC plus1(n)  = n + 1 ;
            TRANSFORM T { stream } {
                LET r = plus1( double(row.v) );   // (v*2)+1
                OUTPUT { res : r }
            }
                """.trimIndent()
            )

        assertEquals(
            mapOf("res" to 9),
            exec(mapOf("v" to 4))
        )
    }

    /* 3. рекурсивный вызов (факториал 3) */
    @Test fun `recursive func`() {
        val exec =
            execOf(
                """
            SOURCE row;
            FUNC fact(n) {
                IF n == 0 THEN { RETURN 1 ; }
                ELSE { RETURN n * fact(n - 1) ; } 
            }
            TRANSFORM T { stream } {
                OUTPUT { f : fact(row.n) }
            }
                """.trimIndent()
            )

        assertEquals(
            mapOf("f" to 6),
            exec(mapOf("n" to 3))
        )
    }

    /* 4. обращение к неопределённой функции даёт ошибку рантайма */
    @Test fun `undefined function throws`() {
        val exec =
            execOf(
                """
            SOURCE row;
            TRANSFORM T { stream } {
                OUTPUT { x : foo(1) }
            }
                """.trimIndent()
            )

        assertThrows<IllegalStateException> { exec(emptyMap()) }
    }
}
