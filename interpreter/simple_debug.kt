package v2.test

import v2.*

fun main() {
    println("Testing just the await token:")
    val simpleAwait = "await flags.enabled"
    val tokens = Lexer(simpleAwait).lex()
    tokens.forEach { println("${it.type}: '${it.lexeme}'") }
    
    println("\nTesting the full IF statement:")
    val ifWithAwait = "IF await flags.enabled THEN { OUTPUT null; }"
    val tokens2 = Lexer(ifWithAwait).lex()
    tokens2.forEach { println("${it.type}: '${it.lexeme}'") }
}
