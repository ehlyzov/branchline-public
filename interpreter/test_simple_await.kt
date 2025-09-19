import v2.*

fun main() {
    // Test 1: Simple await expression (this should work since another test passes)
    println("=== Test 1: Simple await ===")
    try {
        val tokens1 = Lexer("await flags.enabled").lex()
        println("Tokens: ${tokens1.map { "${it.type}:${it.lexeme}" }}")
        
        // Test just parsing the expression directly
        val parser1 = Parser(tokens1)
        val dummy1 = parser1.parseExpression() // This would need to be made public or internal
        println("Test 1: SUCCESS - parsed as ${dummy1::class.simpleName}")
    } catch (e: Exception) {
        println("Test 1: FAILED - ${e.message}")
    }

    // Test 2: Await in IF condition
    println("\n=== Test 2: IF with await ===")
    try {
        val program2 = """
            SHARED flags SINGLE;
            TRANSFORM test { stream } {
                IF await flags.enabled THEN {
                    OUTPUT { status: "enabled" };
                };
            }
        """.trimIndent()
        val tokens2 = Lexer(program2).lex()
        println("Program tokens count: ${tokens2.size}")
        val parser2 = Parser(tokens2, program2)
        val parsed2 = parser2.parse()
        println("Test 2: SUCCESS - parsed full program")
    } catch (e: Exception) {
        println("Test 2: FAILED - ${e.message}")
        e.printStackTrace()
    }
}
