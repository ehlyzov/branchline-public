import v2.*

fun main() {
    val program = """
        SHARED flags SINGLE;
        TRANSFORM test { stream } {
            IF await flags.enabled THEN {
                OUTPUT { status: "enabled" };
            };
        }
    """.trimIndent()

    println("Input program:")
    println(program)
    println()

    // Tokenize
    val tokens = Lexer(program).lex()
    println("Tokens:")
    tokens.forEachIndexed { i, token ->
        println("$i: ${token.type} '${token.lexeme}' at ${token.line}:${token.column}")
    }
    println()

    // Parse
    try {
        val parser = Parser(tokens, program)
        val parsed = parser.parse()
        println("Successfully parsed!")
        println(parsed)
    } catch (e: ParseException) {
        println("Parse error: ${e.message}")
        e.printStackTrace()
    }
}
