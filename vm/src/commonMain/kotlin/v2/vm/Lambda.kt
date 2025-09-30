package v2.vm

data class LambdaTemplate(
    val params: List<String>,
    val bytecode: Bytecode
)

data class LambdaValue(
    val params: List<String>,
    val bytecode: Bytecode,
    val captured: Map<String, Any?>
)

