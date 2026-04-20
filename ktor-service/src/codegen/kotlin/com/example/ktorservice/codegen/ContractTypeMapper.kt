package com.example.ktorservice.codegen

import com.squareup.kotlinpoet.AnnotationSpec
import com.squareup.kotlinpoet.BOOLEAN
import com.squareup.kotlinpoet.BYTE_ARRAY
import com.squareup.kotlinpoet.ClassName
import com.squareup.kotlinpoet.FunSpec
import com.squareup.kotlinpoet.LIST
import com.squareup.kotlinpoet.ParameterSpec
import com.squareup.kotlinpoet.ParameterizedTypeName.Companion.parameterizedBy
import com.squareup.kotlinpoet.PropertySpec
import com.squareup.kotlinpoet.STRING
import com.squareup.kotlinpoet.TypeName
import com.squareup.kotlinpoet.TypeSpec
import io.github.ehlyzov.branchline.contract.NodeKind
import io.github.ehlyzov.branchline.contract.Node

data class GeneratedDtoSpec(
    val rootClassName: ClassName,
    val typeSpecs: List<TypeSpec>,
)

class ContractTypeMapper(
    private val packageName: String,
) {
    private val bigDecimalType = ClassName("java.math", "BigDecimal")
    private val jsonNodeType = ClassName("com.fasterxml.jackson.databind", "JsonNode")
    private val jsonPropertyType = ClassName("com.fasterxml.jackson.annotation", "JsonProperty")
    private val jsonIgnorePropertiesType = ClassName("com.fasterxml.jackson.annotation", "JsonIgnoreProperties")

    private val kotlinKeywords = setOf(
        "as", "break", "class", "continue", "do", "else", "false", "for", "fun", "if",
        "in", "interface", "is", "null", "object", "package", "return", "super", "this",
        "throw", "true", "try", "typealias", "val", "var", "when", "while",
    )

    private lateinit var usedClassNames: LinkedHashSet<String>

    fun createRootDto(transformName: String, suffix: String, node: Node): GeneratedDtoSpec {
        usedClassNames = linkedSetOf()
        val rootSimpleName = sanitizeTypeName(transformName) + suffix
        val rootClassName = ClassName(packageName, nextAvailableClassSimpleName(rootSimpleName))
        val collector = mutableListOf<TypeSpec>()

        if (node.kind == NodeKind.OBJECT) {
            generateObjectClass(rootClassName, node, collector)
        } else {
            generateWrapperClass(rootClassName, node, collector)
        }

        return GeneratedDtoSpec(rootClassName = rootClassName, typeSpecs = collector)
    }

    private fun generateWrapperClass(
        className: ClassName,
        node: Node,
        collector: MutableList<TypeSpec>,
    ) {
        usedClassNames += className.simpleName
        val constructor = FunSpec.constructorBuilder()
        val valueType = resolveNodeType(node, className.simpleName + "Value", collector)
        val parameter = ParameterSpec.builder("value", valueType).build()
        constructor.addParameter(parameter)

        val typeSpec = TypeSpec.classBuilder(className)
            .primaryConstructor(constructor.build())
            .addProperty(
                PropertySpec.builder("value", valueType)
                    .initializer("value")
                    .build(),
            )
            .build()
        collector += typeSpec
    }

    private fun generateObjectClass(
        className: ClassName,
        node: Node,
        collector: MutableList<TypeSpec>,
    ) {
        usedClassNames += className.simpleName
        val constructor = FunSpec.constructorBuilder()
        val classBuilder = TypeSpec.classBuilder(className)
            .addAnnotation(
                AnnotationSpec.builder(jsonIgnorePropertiesType)
                    .addMember("ignoreUnknown = true")
                    .build(),
            )

        for ((rawFieldName, childNode) in node.children) {
            val propertyName = sanitizePropertyName(rawFieldName)
            val nestedSimpleName = nextAvailableClassSimpleName(
                className.simpleName + sanitizeTypeName(rawFieldName),
            )
            var typeName = resolveNodeType(childNode, nestedSimpleName, collector)
            if (!childNode.required) {
                typeName = typeName.copy(nullable = true)
            }
            val parameterBuilder = ParameterSpec.builder(propertyName, typeName)
                .addAnnotation(
                    AnnotationSpec.builder(jsonPropertyType)
                        .useSiteTarget(AnnotationSpec.UseSiteTarget.PARAM)
                        .addMember("%S", rawFieldName)
                        .build(),
                )
            if (!childNode.required) {
                parameterBuilder.defaultValue("null")
            }
            val parameter = parameterBuilder.build()
            constructor.addParameter(parameter)
            classBuilder.addProperty(
                PropertySpec.builder(propertyName, typeName)
                    .initializer(propertyName)
                    .build(),
            )
        }

        classBuilder.primaryConstructor(constructor.build())
        collector += classBuilder.build()
    }

    private fun resolveNodeType(
        node: Node,
        suggestedClassSimpleName: String,
        collector: MutableList<TypeSpec>,
    ): TypeName {
        return when (node.kind) {
            NodeKind.TEXT -> STRING
            NodeKind.NUMBER -> bigDecimalType
            NodeKind.BOOLEAN -> BOOLEAN
            NodeKind.BYTES -> BYTE_ARRAY
            NodeKind.ARRAY -> resolveArrayType(node, suggestedClassSimpleName, collector)
            NodeKind.OBJECT -> resolveObjectType(node, suggestedClassSimpleName, collector)
            NodeKind.UNION -> resolveUnionType(node)
            NodeKind.ANY,
            NodeKind.NEVER,
            NodeKind.SET,
            -> jsonNodeType
            NodeKind.NULL -> jsonNodeType.copy(nullable = true)
        }
    }

    private fun resolveUnionType(node: Node): TypeName {
        val hasNullOption = node.options.any { option -> option.kind == NodeKind.NULL }
        return if (hasNullOption) {
            jsonNodeType.copy(nullable = true)
        } else {
            jsonNodeType
        }
    }

    private fun resolveArrayType(
        node: Node,
        suggestedClassSimpleName: String,
        collector: MutableList<TypeSpec>,
    ): TypeName {
        val elementNode = node.element ?: return LIST.parameterizedBy(jsonNodeType)
        var elementType = resolveNodeType(elementNode, suggestedClassSimpleName + "Item", collector)
        if (!elementNode.required) {
            elementType = elementType.copy(nullable = true)
        }
        return LIST.parameterizedBy(elementType)
    }

    private fun resolveObjectType(
        node: Node,
        suggestedClassSimpleName: String,
        collector: MutableList<TypeSpec>,
    ): TypeName {
        if (node.open) {
            return jsonNodeType
        }
        val classSimpleName = nextAvailableClassSimpleName(suggestedClassSimpleName)
        val className = ClassName(packageName, classSimpleName)
        generateObjectClass(className, node, collector)
        return className
    }

    private fun sanitizeTypeName(raw: String): String {
        val segments = splitAlphaNumeric(raw)
        if (segments.isEmpty()) return "GeneratedType"
        val result = StringBuilder()
        for (segment in segments) {
            result.append(segment.replaceFirstChar { if (it.isLowerCase()) it.titlecase() else it.toString() })
        }
        val candidate = result.toString()
        return if (candidate.firstOrNull()?.isDigit() == true) "Type$candidate" else candidate
    }

    private fun sanitizePropertyName(raw: String): String {
        val typeName = sanitizeTypeName(raw)
        if (typeName.isEmpty()) return "value"
        val candidate = typeName.replaceFirstChar { it.lowercase() }
        val noLeadingDigit = if (candidate.firstOrNull()?.isDigit() == true) "value$candidate" else candidate
        return if (kotlinKeywords.contains(noLeadingDigit)) "${noLeadingDigit}Field" else noLeadingDigit
    }

    private fun splitAlphaNumeric(raw: String): List<String> {
        val buffer = StringBuilder()
        val segments = mutableListOf<String>()
        for (char in raw) {
            if (char.isLetterOrDigit()) {
                buffer.append(char)
            } else if (buffer.isNotEmpty()) {
                segments += buffer.toString()
                buffer.clear()
            }
        }
        if (buffer.isNotEmpty()) {
            segments += buffer.toString()
        }
        return segments
    }

    private fun nextAvailableClassSimpleName(base: String): String {
        var candidate = base
        var idx = 2
        while (usedClassNames.contains(candidate)) {
            candidate = "$base$idx"
            idx += 1
        }
        usedClassNames += candidate
        return candidate
    }
}
