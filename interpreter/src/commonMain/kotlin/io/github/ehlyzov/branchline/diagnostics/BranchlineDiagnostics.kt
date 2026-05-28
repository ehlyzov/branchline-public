package io.github.ehlyzov.branchline

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement

@Serializable
public enum class BranchlineDiagnosticSeverity {
    ERROR,
    WARNING,
}

@Serializable
public enum class BranchlineDiagnosticCategory(public val id: String) {
    SYNTAX("syntax"),
    SEMANTIC("semantic"),
    CONTRACT("contract"),
    RUNTIME("runtime"),
    UNSUPPORTED_SUBSET("unsupported-subset"),
    NORMALIZATION("normalization"),
    UNKNOWN("unknown"),
}

@Serializable
public data class BranchlineSourceSpan(
    val startLine: Int,
    val startColumn: Int,
    val endLine: Int,
    val endColumn: Int,
)

@Serializable
public data class BranchlineDiagnosticPayload(
    val operation: String? = null,
    val targetPath: String? = null,
    val expectedKind: String? = null,
    val actualKind: String? = null,
    val expected: JsonElement? = null,
    val actual: JsonElement? = null,
    val hint: String? = null,
)

@Serializable
public data class BranchlineDiagnostic(
    val code: String,
    val message: String,
    val severity: BranchlineDiagnosticSeverity,
    val span: BranchlineSourceSpan? = null,
    val category: BranchlineDiagnosticCategory = BranchlineDiagnosticCategory.UNKNOWN,
    val payload: BranchlineDiagnosticPayload? = null,
)
