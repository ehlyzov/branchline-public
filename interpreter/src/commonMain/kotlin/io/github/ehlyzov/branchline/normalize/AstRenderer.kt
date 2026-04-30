package io.github.ehlyzov.branchline.normalize

import io.github.ehlyzov.branchline.AbortStmt
import io.github.ehlyzov.branchline.AccessExpr
import io.github.ehlyzov.branchline.AccessSeg
import io.github.ehlyzov.branchline.AdapterSpec
import io.github.ehlyzov.branchline.AppendToStmt
import io.github.ehlyzov.branchline.AppendToVarStmt
import io.github.ehlyzov.branchline.ArrayCompExpr
import io.github.ehlyzov.branchline.ArrayExpr
import io.github.ehlyzov.branchline.ArrayTypeRef
import io.github.ehlyzov.branchline.BinaryExpr
import io.github.ehlyzov.branchline.BlockBody
import io.github.ehlyzov.branchline.BoolExpr
import io.github.ehlyzov.branchline.COMPAT_INPUT_ALIASES
import io.github.ehlyzov.branchline.CallExpr
import io.github.ehlyzov.branchline.CaseExpr
import io.github.ehlyzov.branchline.CodeBlock
import io.github.ehlyzov.branchline.ComputedProperty
import io.github.ehlyzov.branchline.Connection
import io.github.ehlyzov.branchline.DEFAULT_INPUT_ALIAS
import io.github.ehlyzov.branchline.Dec
import io.github.ehlyzov.branchline.EnumTypeRef
import io.github.ehlyzov.branchline.Expr
import io.github.ehlyzov.branchline.ExprBody
import io.github.ehlyzov.branchline.ExprStmt
import io.github.ehlyzov.branchline.F64
import io.github.ehlyzov.branchline.ForEachStmt
import io.github.ehlyzov.branchline.FuncBody
import io.github.ehlyzov.branchline.FuncDecl
import io.github.ehlyzov.branchline.GraphBody
import io.github.ehlyzov.branchline.GraphOutput
import io.github.ehlyzov.branchline.I32
import io.github.ehlyzov.branchline.I64
import io.github.ehlyzov.branchline.IBig
import io.github.ehlyzov.branchline.IdentifierExpr
import io.github.ehlyzov.branchline.IfElseExpr
import io.github.ehlyzov.branchline.IfStmt
import io.github.ehlyzov.branchline.InvokeExpr
import io.github.ehlyzov.branchline.LambdaExpr
import io.github.ehlyzov.branchline.LetStmt
import io.github.ehlyzov.branchline.LiteralProperty
import io.github.ehlyzov.branchline.ModifyStmt
import io.github.ehlyzov.branchline.NamedTypeRef
import io.github.ehlyzov.branchline.NodeDecl
import io.github.ehlyzov.branchline.NullLiteral
import io.github.ehlyzov.branchline.NumValue
import io.github.ehlyzov.branchline.NumberLiteral
import io.github.ehlyzov.branchline.ObjKey
import io.github.ehlyzov.branchline.ObjectExpr
import io.github.ehlyzov.branchline.OutputDecl
import io.github.ehlyzov.branchline.OutputStmt
import io.github.ehlyzov.branchline.PrimitiveType
import io.github.ehlyzov.branchline.PrimitiveTypeRef
import io.github.ehlyzov.branchline.Program
import io.github.ehlyzov.branchline.Property
import io.github.ehlyzov.branchline.RecordTypeRef
import io.github.ehlyzov.branchline.ReturnStmt
import io.github.ehlyzov.branchline.SetStmt
import io.github.ehlyzov.branchline.SetTypeRef
import io.github.ehlyzov.branchline.SetVarStmt
import io.github.ehlyzov.branchline.SharedDecl
import io.github.ehlyzov.branchline.SharedStateAwaitExpr
import io.github.ehlyzov.branchline.SharedWriteStmt
import io.github.ehlyzov.branchline.Stmt
import io.github.ehlyzov.branchline.StringExpr
import io.github.ehlyzov.branchline.TokenType
import io.github.ehlyzov.branchline.TransformBody
import io.github.ehlyzov.branchline.TransformDecl
import io.github.ehlyzov.branchline.TransformOptions
import io.github.ehlyzov.branchline.TransformSignature
import io.github.ehlyzov.branchline.TryCatchExpr
import io.github.ehlyzov.branchline.TryCatchStmt
import io.github.ehlyzov.branchline.TypeDecl
import io.github.ehlyzov.branchline.TypeKind
import io.github.ehlyzov.branchline.TypeRef
import io.github.ehlyzov.branchline.UnaryExpr
import io.github.ehlyzov.branchline.UnionTypeRef
import io.github.ehlyzov.branchline.runtime.bignum.toPlainString

/**
 * Marker thrown by [AstRenderer] when it encounters an AST node it cannot canonicalize.
 * The facade wraps this into a structured `normalization_unsupported_node` diagnostic.
 */
public class UnsupportedNodeException(
    public val nodeKind: String,
    public val detail: String,
) : RuntimeException("Cannot canonicalize node '$nodeKind': $detail")

public object AstRenderer {
    private const val INDENT = "    "
    private const val LINE_BUDGET = 80

    public fun renderProgram(program: Program): String {
        val sb = StringBuilder()
        program.decls.forEachIndexed { index, decl ->
            if (index > 0) sb.append("\n\n")
            when (decl) {
                is TransformDecl -> renderTransform(sb, decl)
                is FuncDecl -> renderFunc(sb, decl)
                is TypeDecl -> renderTypeDecl(sb, decl)
                is OutputDecl -> throw UnsupportedNodeException(
                    "OutputDecl",
                    "Top-level OUTPUT declarations are not supported.",
                )
                is SharedDecl -> throw UnsupportedNodeException(
                    "SharedDecl",
                    "SHARED declarations are not supported in the canonical subset.",
                )
            }
        }
        if (sb.isNotEmpty() && sb.last() != '\n') sb.append('\n')
        return sb.toString()
    }

    private fun renderTransform(sb: StringBuilder, decl: TransformDecl) {
        sb.append("TRANSFORM")
        if (decl.name != null) {
            sb.append(' ').append(decl.name)
        }
        renderSignature(sb, decl.params, decl.signature)
        renderTransformOptions(sb, decl.options)
        sb.append(" {")
        renderTransformBody(sb, decl.body, indent = 1)
        sb.append("}")
    }

    private fun renderSignature(
        sb: StringBuilder,
        params: List<String>,
        signature: TransformSignature?,
    ) {
        if (signature == null) return
        sb.append('(')
        when (params.size) {
            0 -> Unit
            1 -> {
                sb.append(params.first()).append(": ")
                sb.append(renderType(signature.input ?: anyType()))
            }
            else -> {
                val record = signature.input as? RecordTypeRef
                if (record != null && record.fields.size == params.size) {
                    record.fields.forEachIndexed { i, field ->
                        if (i > 0) sb.append(", ")
                        sb.append(field.name).append(": ").append(renderType(field.type))
                    }
                } else {
                    params.forEachIndexed { i, name ->
                        if (i > 0) sb.append(", ")
                        sb.append(name).append(": ").append(renderType(signature.input ?: anyType()))
                    }
                }
            }
        }
        sb.append(')')
        sb.append(" -> ")
        sb.append(renderType(signature.output ?: anyType()))
    }

    private fun renderTransformOptions(sb: StringBuilder, options: TransformOptions) {
        if (isDefaultOptions(options)) return
        sb.append(" OPTIONS {")
        val parts = mutableListOf<String>()
        options.inputAdapter?.let { parts += "input: { adapter: ${renderAdapter(it)} }" }
        options.outputAdapter?.let { parts += "output: { adapter: ${renderAdapter(it)} }" }
        if (options.shared.isNotEmpty()) {
            throw UnsupportedNodeException(
                "TransformOptions.shared",
                "Transform-level SHARED options are not supported in the canonical subset.",
            )
        }
        sb.append(' ')
        sb.append(parts.joinToString(", "))
        sb.append(" }")
    }

    private fun isDefaultOptions(options: TransformOptions): Boolean {
        return options.inputAdapter == null &&
            options.outputAdapter == null &&
            options.shared.isEmpty()
    }

    private fun renderAdapter(adapter: AdapterSpec): String {
        val args = adapter.args.joinToString(", ") { renderExpr(it) }
        return if (adapter.args.isEmpty()) adapter.name else "${adapter.name}($args)"
    }

    private fun renderTransformBody(sb: StringBuilder, body: TransformBody, indent: Int) {
        when (body) {
            is CodeBlock -> {
                if (body.statements.isEmpty()) {
                    sb.append('\n')
                    return
                }
                sb.append('\n')
                renderStatements(sb, body.statements, indent)
                sb.append('\n')
            }
            is GraphBody -> throw UnsupportedNodeException(
                "GraphBody",
                "Graph transforms are not supported in the canonical subset.",
            )
        }
    }

    private fun renderFunc(sb: StringBuilder, decl: FuncDecl) {
        sb.append("FUNC ").append(decl.name).append('(')
        sb.append(decl.params.joinToString(", "))
        sb.append(')')
        when (val body = decl.body) {
            is ExprBody -> {
                sb.append(" = ")
                sb.append(renderExpr(body.expr))
            }
            is BlockBody -> {
                sb.append(" {")
                if (body.block.statements.isNotEmpty()) {
                    sb.append('\n')
                    renderStatements(sb, body.block.statements, indent = 1)
                    sb.append('\n')
                }
                sb.append('}')
            }
        }
    }

    private fun renderTypeDecl(sb: StringBuilder, decl: TypeDecl) {
        sb.append("TYPE ").append(decl.name).append(" = ")
        when (decl.kind) {
            TypeKind.ENUM -> {
                sb.append("enum { ")
                sb.append(decl.defs.joinToString(", "))
                sb.append(" }")
            }
            TypeKind.UNION -> {
                sb.append("union ")
                sb.append(decl.defs.joinToString(" | "))
            }
        }
    }

    private fun renderStatements(sb: StringBuilder, statements: List<Stmt>, indent: Int) {
        statements.forEachIndexed { i, stmt ->
            if (i > 0) sb.append('\n')
            sb.append(indentString(indent))
            renderStatement(sb, stmt, indent)
        }
    }

    private fun renderStatement(sb: StringBuilder, stmt: Stmt, indent: Int) {
        when (stmt) {
            is LetStmt -> {
                sb.append("LET ").append(stmt.name).append(" = ")
                appendExprBreaking(sb, stmt.expr, indent)
            }
            is SetStmt -> {
                sb.append("SET ")
                sb.append(renderExpr(stmt.target))
                sb.append(" = ")
                appendExprBreaking(sb, stmt.value, indent)
            }
            is SetVarStmt -> {
                sb.append("SET ").append(stmt.name).append(" = ")
                appendExprBreaking(sb, stmt.value, indent)
            }
            is AppendToStmt -> {
                sb.append("APPEND TO ")
                sb.append(renderExpr(stmt.target))
                sb.append(' ')
                appendExprBreaking(sb, stmt.value, indent)
                stmt.init?.let {
                    sb.append(" INIT ")
                    appendExprBreaking(sb, it, indent)
                }
            }
            is AppendToVarStmt -> {
                sb.append("APPEND TO ").append(stmt.name).append(' ')
                appendExprBreaking(sb, stmt.value, indent)
                stmt.init?.let {
                    sb.append(" INIT ")
                    appendExprBreaking(sb, it, indent)
                }
            }
            is ModifyStmt -> renderModify(sb, stmt, indent)
            is OutputStmt -> {
                sb.append("OUTPUT ")
                appendExprBreaking(sb, stmt.template, indent)
            }
            is IfStmt -> renderIfStmt(sb, stmt, indent)
            is ForEachStmt -> renderForEach(sb, stmt, indent)
            is TryCatchStmt -> renderTryCatchStmt(sb, stmt, indent)
            is CodeBlock -> {
                sb.append('{')
                if (stmt.statements.isNotEmpty()) {
                    sb.append('\n')
                    renderStatements(sb, stmt.statements, indent + 1)
                    sb.append('\n').append(indentString(indent))
                }
                sb.append('}')
            }
            is ReturnStmt -> {
                sb.append("RETURN")
                stmt.value?.let {
                    sb.append(' ')
                    appendExprBreaking(sb, it, indent)
                }
            }
            is AbortStmt -> {
                sb.append("ABORT")
                stmt.value?.let {
                    sb.append(' ')
                    appendExprBreaking(sb, it, indent)
                }
            }
            is ExprStmt -> appendExprBreaking(sb, stmt.expr, indent)
            is SharedWriteStmt -> throw UnsupportedNodeException(
                "SharedWriteStmt",
                "Shared writes are not supported in the canonical subset.",
            )
            is NodeDecl -> throw UnsupportedNodeException(
                "NodeDecl",
                "Graph node declarations are not supported in the canonical subset.",
            )
            is Connection -> throw UnsupportedNodeException(
                "Connection",
                "Graph connections are not supported in the canonical subset.",
            )
            is GraphOutput -> throw UnsupportedNodeException(
                "GraphOutput",
                "Graph outputs are not supported in the canonical subset.",
            )
        }
    }

    private fun renderModify(sb: StringBuilder, stmt: ModifyStmt, indent: Int) {
        sb.append("MODIFY ").append(renderExpr(stmt.target)).append(" {")
        if (stmt.updates.isEmpty()) {
            sb.append('}')
            return
        }
        val singleLine = stmt.updates.joinToString(", ") { renderProperty(it) }
        val candidate = " $singleLine }"
        if (candidate.length <= LINE_BUDGET && !candidate.contains('\n')) {
            sb.append(candidate)
            return
        }
        sb.append('\n')
        val inner = indentString(indent + 1)
        stmt.updates.forEachIndexed { i, prop ->
            if (i > 0) sb.append(",\n")
            sb.append(inner).append(renderProperty(prop))
        }
        sb.append('\n').append(indentString(indent)).append('}')
    }

    private fun renderIfStmt(sb: StringBuilder, stmt: IfStmt, indent: Int) {
        sb.append("IF ").append(renderExpr(stmt.condition)).append(" THEN ")
        renderBlock(sb, stmt.thenBlock.statements, indent)
        stmt.elseBlock?.let {
            sb.append(" ELSE ")
            renderBlock(sb, it.statements, indent)
        }
    }

    private fun renderForEach(sb: StringBuilder, stmt: ForEachStmt, indent: Int) {
        sb.append("FOR EACH ").append(stmt.varName).append(" IN ")
        sb.append(renderExpr(stmt.iterable))
        stmt.where?.let {
            sb.append(" WHERE ").append(renderExpr(it))
        }
        sb.append(' ')
        renderBlock(sb, stmt.body.statements, indent)
    }

    private fun renderTryCatchStmt(sb: StringBuilder, stmt: TryCatchStmt, indent: Int) {
        sb.append("TRY ").append(renderExpr(stmt.tryExpr))
        sb.append(" CATCH (").append(stmt.exceptionName).append(')')
        if (stmt.retry != null) {
            sb.append(" RETRY ").append(stmt.retry).append(" TIMES")
            stmt.backoff?.let { sb.append(" BACKOFF ").append(quoteString(it)) }
        }
        sb.append(" -> ")
        val fallbackAbort = stmt.fallbackAbort
        val fallbackExpr = stmt.fallbackExpr
        when {
            fallbackAbort != null -> {
                sb.append("ABORT")
                fallbackAbort.value?.let {
                    sb.append(' ').append(renderExpr(it))
                }
            }
            fallbackExpr != null -> sb.append(renderExpr(fallbackExpr))
            else -> throw UnsupportedNodeException(
                "TryCatchStmt",
                "TRY/CATCH statement requires a fallback expression or ABORT clause.",
            )
        }
    }

    private fun renderBlock(sb: StringBuilder, statements: List<Stmt>, indent: Int) {
        sb.append('{')
        if (statements.isEmpty()) {
            sb.append('}')
            return
        }
        sb.append('\n')
        renderStatements(sb, statements, indent + 1)
        sb.append('\n').append(indentString(indent)).append('}')
    }

    private fun renderProperty(prop: Property): String {
        return when (prop) {
            is LiteralProperty -> "${renderObjKey(prop.key)}: ${renderExpr(prop.value)}"
            is ComputedProperty -> "[${renderExpr(prop.keyExpr)}]: ${renderExpr(prop.value)}"
        }
    }

    private fun renderObjKey(key: ObjKey): String = when (key) {
        is ObjKey.Name -> if (isSafeIdentifier(key.v)) key.v else quoteString(key.v)
        is I32 -> key.v.toString()
        is I64 -> key.v.toString()
        is IBig -> key.v.toString()
    }

    private fun renderExpr(expr: Expr): String = renderExprAt(expr, parentPrec = 0, position = ChildPos.NONE)

    private enum class ChildPos { NONE, LEFT, RIGHT }

    private fun renderExprAt(expr: Expr, parentPrec: Int, position: ChildPos): String {
        val raw = renderExprRaw(expr)
        val needParens = needsParens(expr, parentPrec, position)
        return if (needParens) "($raw)" else raw
    }

    private fun renderExprRaw(expr: Expr): String = when (expr) {
        is IdentifierExpr -> rewriteIdentifier(expr.name)
        is StringExpr -> quoteString(expr.value)
        is NumberLiteral -> renderNumber(expr.value)
        is NullLiteral -> "null"
        is BoolExpr -> if (expr.value) "true" else "false"
        is AccessExpr -> renderAccess(expr)
        is ObjectExpr -> renderObjectExpr(expr)
        is CallExpr -> "${expr.callee.name}(${expr.args.joinToString(", ") { renderExpr(it) }})"
        is InvokeExpr -> {
            val targetText = renderExprAt(expr.target, parentPrec = POSTFIX_PREC, position = ChildPos.LEFT)
            "$targetText(${expr.args.joinToString(", ") { renderExpr(it) }})"
        }
        is BinaryExpr -> renderBinary(expr)
        is UnaryExpr -> renderUnary(expr)
        is LambdaExpr -> renderLambda(expr)
        is ArrayExpr -> renderArrayExpr(expr)
        is ArrayCompExpr -> renderComprehension(expr)
        is IfElseExpr -> {
            val cond = renderExpr(expr.condition)
            val thenE = renderExpr(expr.thenBranch)
            val elseE = renderExpr(expr.elseBranch)
            "IF $cond THEN $thenE ELSE $elseE"
        }
        is CaseExpr -> renderCase(expr)
        is TryCatchExpr -> {
            val tryText = renderExpr(expr.tryExpr)
            val fallback = renderExpr(expr.fallbackExpr)
            val retryPart = if (expr.retry != null) {
                val backoff = expr.backoff?.let { " BACKOFF ${quoteString(it)}" } ?: ""
                " RETRY ${expr.retry} TIMES$backoff"
            } else ""
            "TRY $tryText CATCH (${expr.exceptionName})$retryPart -> $fallback"
        }
        is SharedStateAwaitExpr -> throw UnsupportedNodeException(
            "SharedStateAwaitExpr",
            "AWAIT on shared state is not supported in the canonical subset.",
        )
    }

    private fun rewriteIdentifier(name: String): String {
        return if (name in COMPAT_INPUT_ALIASES) DEFAULT_INPUT_ALIAS else name
    }

    private fun renderAccess(expr: AccessExpr): String {
        val sb = StringBuilder()
        sb.append(renderExprAt(expr.base, parentPrec = POSTFIX_PREC, position = ChildPos.LEFT))
        expr.segs.forEach { seg ->
            when (seg) {
                is AccessSeg.Static -> when (val key = seg.key) {
                    is ObjKey.Name -> if (isSafeIdentifier(key.v)) {
                        sb.append('.').append(key.v)
                    } else {
                        sb.append('[').append(quoteString(key.v)).append(']')
                    }
                    is I32 -> sb.append('.').append(key.v)
                    is I64 -> sb.append('.').append(key.v)
                    is IBig -> sb.append('.').append(key.v.toString())
                }
                is AccessSeg.Dynamic -> {
                    sb.append('[').append(renderExpr(seg.keyExpr)).append(']')
                }
            }
        }
        return sb.toString()
    }

    private fun renderObjectExpr(expr: ObjectExpr): String {
        if (expr.fields.isEmpty()) return "{}"
        val parts = expr.fields.map { renderProperty(it) }
        val singleLine = "{ ${parts.joinToString(", ")} }"
        return if (singleLine.length <= LINE_BUDGET && !parts.any { it.contains('\n') }) {
            singleLine
        } else {
            buildBracketedMultiline("{", "}", parts)
        }
    }

    private fun renderArrayExpr(expr: ArrayExpr): String {
        if (expr.elements.isEmpty()) return "[]"
        val parts = expr.elements.map { renderExpr(it) }
        val singleLine = "[${parts.joinToString(", ")}]"
        return if (singleLine.length <= LINE_BUDGET && !parts.any { it.contains('\n') }) {
            singleLine
        } else {
            buildBracketedMultiline("[", "]", parts)
        }
    }

    private fun buildBracketedMultiline(
        open: String,
        close: String,
        items: List<String>,
    ): String {
        val sb = StringBuilder()
        sb.append(open)
        sb.append('\n')
        items.forEachIndexed { i, item ->
            if (i > 0) sb.append(",\n")
            sb.append(reindent(item, INDENT))
        }
        sb.append('\n').append(close)
        return sb.toString()
    }

    private fun reindent(text: String, prefix: String): String =
        text.lineSequence().joinToString("\n") { line -> prefix + line }

    private fun renderComprehension(expr: ArrayCompExpr): String {
        val mapText = renderExpr(expr.mapExpr)
        val iterText = renderExpr(expr.iterable)
        val whereText = expr.where?.let { " WHERE ${renderExpr(it)}" } ?: ""
        return "[$mapText FOR EACH ${expr.varName} IN $iterText$whereText]"
    }

    private fun renderCase(expr: CaseExpr): String {
        val sb = StringBuilder()
        sb.append("CASE {\n")
        expr.whens.forEach { branch ->
            sb.append(INDENT)
                .append("WHEN ")
                .append(renderExpr(branch.condition))
                .append(" THEN ")
                .append(renderExpr(branch.result))
                .append('\n')
        }
        sb.append(INDENT).append("ELSE ").append(renderExpr(expr.elseBranch)).append('\n')
        sb.append('}')
        return sb.toString()
    }

    private fun renderLambda(expr: LambdaExpr): String {
        val params = expr.params.joinToString(", ")
        val bodyText = when (val body = expr.body) {
            is ExprBody -> renderExpr(body.expr)
            is BlockBody -> {
                val sb = StringBuilder()
                sb.append('{')
                if (body.block.statements.isNotEmpty()) {
                    sb.append('\n')
                    renderStatements(sb, body.block.statements, indent = 1)
                    sb.append('\n')
                }
                sb.append('}')
                sb.toString()
            }
        }
        return "($params) -> $bodyText"
    }

    private fun renderBinary(expr: BinaryExpr): String {
        val opText = operatorLexeme(expr.token.type)
        val prec = binaryPrec(expr.token.type)
        val left = renderExprAt(expr.left, parentPrec = prec, position = ChildPos.LEFT)
        val right = renderExprAt(expr.right, parentPrec = prec, position = ChildPos.RIGHT)
        return "$left $opText $right"
    }

    private fun renderUnary(expr: UnaryExpr): String {
        return when (expr.token.type) {
            TokenType.MINUS -> "-${renderExprAt(expr.expr, parentPrec = UNARY_PREC, position = ChildPos.NONE)}"
            TokenType.BANG -> "!${renderExprAt(expr.expr, parentPrec = UNARY_PREC, position = ChildPos.NONE)}"
            TokenType.AWAIT -> throw UnsupportedNodeException(
                "UnaryExpr.AWAIT",
                "AWAIT is not supported in the canonical subset.",
            )
            TokenType.SUSPEND -> throw UnsupportedNodeException(
                "UnaryExpr.SUSPEND",
                "SUSPEND is not supported in the canonical subset.",
            )
            else -> throw UnsupportedNodeException(
                "UnaryExpr.${expr.token.type}",
                "Unknown unary operator '${expr.token.lexeme}'.",
            )
        }
    }

    private fun operatorLexeme(type: TokenType): String = when (type) {
        TokenType.COALESCE -> "??"
        TokenType.OR -> "||"
        TokenType.AND -> "&&"
        TokenType.EQ -> "=="
        TokenType.NEQ -> "!="
        TokenType.LT -> "<"
        TokenType.LE -> "<="
        TokenType.GT -> ">"
        TokenType.GE -> ">="
        TokenType.CONCAT -> "++"
        TokenType.PLUS -> "+"
        TokenType.MINUS -> "-"
        TokenType.STAR -> "*"
        TokenType.SLASH -> "/"
        TokenType.SLASH_SLASH -> "//"
        TokenType.PERCENT -> "%"
        else -> throw UnsupportedNodeException(
            "BinaryExpr.${type}",
            "Unknown binary operator.",
        )
    }

    private fun appendExprBreaking(sb: StringBuilder, expr: Expr, indent: Int) {
        sb.append(renderExpr(expr))
    }

    private fun needsParens(expr: Expr, parentPrec: Int, position: ChildPos): Boolean {
        if (parentPrec == 0) return false
        val childPrec = exprPrec(expr)
        if (childPrec > parentPrec) return false
        if (childPrec < parentPrec) return true
        // equal precedence
        return position == ChildPos.RIGHT
    }

    private fun exprPrec(expr: Expr): Int = when (expr) {
        is IfElseExpr -> IF_EXPR_PREC
        is BinaryExpr -> binaryPrec(expr.token.type)
        is UnaryExpr -> UNARY_PREC
        else -> POSTFIX_PREC
    }

    private fun binaryPrec(type: TokenType): Int = when (type) {
        TokenType.COALESCE -> 1
        TokenType.OR -> 2
        TokenType.AND -> 3
        TokenType.EQ, TokenType.NEQ -> 4
        TokenType.LT, TokenType.LE, TokenType.GT, TokenType.GE -> 5
        TokenType.CONCAT -> 6
        TokenType.PLUS, TokenType.MINUS -> 7
        TokenType.STAR, TokenType.SLASH, TokenType.SLASH_SLASH, TokenType.PERCENT -> 8
        else -> POSTFIX_PREC
    }

    private fun renderType(typeRef: TypeRef): String {
        return when (typeRef) {
            is PrimitiveTypeRef -> when (typeRef.kind) {
                PrimitiveType.TEXT -> "Text"
                PrimitiveType.BYTES -> "Bytes"
                PrimitiveType.NUMBER -> "Number"
                PrimitiveType.BOOLEAN -> "Boolean"
                PrimitiveType.NULL -> "Null"
                PrimitiveType.ANY -> "_"
                PrimitiveType.ANY_NULLABLE -> "_?"
            }
            is ArrayTypeRef -> "[${renderType(typeRef.elementType)}]"
            is SetTypeRef -> "Set<${renderType(typeRef.elementType)}>"
            is RecordTypeRef -> {
                val parts = typeRef.fields.joinToString(", ") {
                    val q = if (it.optional) "?" else ""
                    "${it.name}$q: ${renderType(it.type)}"
                }
                "{ $parts }"
            }
            is UnionTypeRef -> {
                // canonicalize "T | Null" -> "T?"
                val nonNull = typeRef.members.filterNot { it is PrimitiveTypeRef && it.kind == PrimitiveType.NULL }
                val hasNull = typeRef.members.any { it is PrimitiveTypeRef && it.kind == PrimitiveType.NULL }
                if (hasNull && nonNull.size == 1) {
                    "${renderType(nonNull.single())}?"
                } else {
                    typeRef.members.joinToString(" | ") { renderType(it) }
                }
            }
            is EnumTypeRef -> "enum { ${typeRef.values.joinToString(", ")} }"
            is NamedTypeRef -> typeRef.name
        }
    }

    private fun anyType(): TypeRef = PrimitiveTypeRef(
        PrimitiveType.ANY,
        token = io.github.ehlyzov.branchline.Token(TokenType.IDENTIFIER, "_", 0, 0),
    )

    private fun renderNumber(value: NumValue): String = when (value) {
        is I32 -> value.v.toString()
        is I64 -> value.v.toString()
        is IBig -> value.v.toString()
        is F64 -> {
            val d = value.v
            if (d.isFinite() && d == d.toLong().toDouble()) "${d.toLong()}.0" else d.toString()
        }
        is Dec -> value.v.toPlainString()
    }

    private fun quoteString(value: String): String {
        val sb = StringBuilder()
        sb.append('"')
        value.forEach { ch ->
            when (ch) {
                '\\' -> sb.append("\\\\")
                '"' -> sb.append("\\\"")
                '\n' -> sb.append("\\n")
                '\r' -> sb.append("\\r")
                '\t' -> sb.append("\\t")
                else -> sb.append(ch)
            }
        }
        sb.append('"')
        return sb.toString()
    }

    private fun isSafeIdentifier(name: String): Boolean {
        if (name.isEmpty()) return false
        val first = name[0]
        if (!(first.isLetter() || first == '_')) return false
        return name.all { it.isLetterOrDigit() || it == '_' }
    }

    private fun indentString(level: Int): String = INDENT.repeat(level)

    private const val IF_EXPR_PREC: Int = 0
    private const val UNARY_PREC: Int = 9
    private const val POSTFIX_PREC: Int = 100
}
