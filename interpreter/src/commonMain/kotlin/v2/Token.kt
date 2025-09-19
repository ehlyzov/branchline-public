package v2

/** A token with positional metadata (line & column for diagnostics). */
data class Token(
    val type: TokenType,
    val lexeme: String,
    val line: Int,
    val column: Int
)

