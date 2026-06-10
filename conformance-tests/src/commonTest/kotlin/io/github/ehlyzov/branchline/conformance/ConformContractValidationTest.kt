package io.github.ehlyzov.branchline.conformance

import io.github.ehlyzov.branchline.contract.AccessPath
import io.github.ehlyzov.branchline.contract.AccessSegment
import io.github.ehlyzov.branchline.contract.ConstraintExpr
import io.github.ehlyzov.branchline.contract.ContractEnforcer
import io.github.ehlyzov.branchline.contract.ContractObligation
import io.github.ehlyzov.branchline.contract.ContractValidationMode
import io.github.ehlyzov.branchline.contract.ContractViolationException
import io.github.ehlyzov.branchline.contract.ContractViolationKind
import io.github.ehlyzov.branchline.contract.GuaranteeSchema
import io.github.ehlyzov.branchline.contract.Node
import io.github.ehlyzov.branchline.contract.NodeKind
import io.github.ehlyzov.branchline.contract.RequirementSchema
import io.github.ehlyzov.branchline.contract.ValueDomain
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

class ConformContractValidationTest {

    @Test
    fun warn_mode_reports_missing_required_fields() {
        val requirement = RequirementSchema(
            root = Node(
                required = true,
                kind = NodeKind.OBJECT,
                open = true,
                children = linkedMapOf(
                    "id" to Node(required = true, kind = NodeKind.NUMBER),
                ),
            ),
            obligations = emptyList(),
            opaqueRegions = emptyList(),
        )
        val violations = ContractEnforcer.enforceInput(ContractValidationMode.WARN, requirement, emptyMap<String, Any?>())
        assertTrue(violations.isNotEmpty())
        assertEquals(ContractViolationKind.MISSING_REQUIRED_PATH, violations.first().kind)
    }

    @Test
    fun warn_mode_reports_missing_required_any_of_group() {
        val requirement = RequirementSchema(
            root = Node(
                required = true,
                kind = NodeKind.OBJECT,
                open = true,
                children = linkedMapOf(
                    "testsuites" to Node(required = false, kind = NodeKind.ANY),
                    "testsuite" to Node(required = false, kind = NodeKind.ANY),
                ),
            ),
            obligations = listOf(
                ContractObligation(
                    expr = ConstraintExpr.OneOf(
                        listOf(
                            ConstraintExpr.PathNonNull(AccessPath(listOf(AccessSegment.Field("testsuites")))),
                            ConstraintExpr.PathNonNull(AccessPath(listOf(AccessSegment.Field("testsuite")))),
                        ),
                    ),
                    ruleId = "required-any-of",
                ),
            ),
            opaqueRegions = emptyList(),
        )
        val violations = ContractEnforcer.enforceInput(ContractValidationMode.WARN, requirement, emptyMap<String, Any?>())
        assertEquals(1, violations.size)
        assertEquals(ContractViolationKind.MISSING_CONDITIONAL_GROUP, violations.first().kind)
    }

    @Test
    fun strict_mode_throws_when_required_any_of_group_is_missing() {
        val requirement = RequirementSchema(
            root = Node(
                required = true,
                kind = NodeKind.OBJECT,
                open = true,
                children = linkedMapOf(
                    "testsuites" to Node(required = false, kind = NodeKind.ANY),
                    "testsuite" to Node(required = false, kind = NodeKind.ANY),
                ),
            ),
            obligations = listOf(
                ContractObligation(
                    expr = ConstraintExpr.OneOf(
                        listOf(
                            ConstraintExpr.PathNonNull(AccessPath(listOf(AccessSegment.Field("testsuites")))),
                            ConstraintExpr.PathNonNull(AccessPath(listOf(AccessSegment.Field("testsuite")))),
                        ),
                    ),
                    ruleId = "required-any-of",
                ),
            ),
            opaqueRegions = emptyList(),
        )
        assertFailsWith<ContractViolationException> {
            ContractEnforcer.enforceInput(ContractValidationMode.STRICT, requirement, emptyMap<String, Any?>())
        }
    }

    @Test
    fun required_any_of_group_accepts_present_non_null_alternative() {
        val requirement = RequirementSchema(
            root = Node(
                required = true,
                kind = NodeKind.OBJECT,
                open = true,
                children = linkedMapOf(
                    "testsuites" to Node(required = false, kind = NodeKind.ANY),
                    "testsuite" to Node(required = false, kind = NodeKind.ANY),
                ),
            ),
            obligations = listOf(
                ContractObligation(
                    expr = ConstraintExpr.OneOf(
                        listOf(
                            ConstraintExpr.PathNonNull(AccessPath(listOf(AccessSegment.Field("testsuites")))),
                            ConstraintExpr.PathNonNull(AccessPath(listOf(AccessSegment.Field("testsuite")))),
                        ),
                    ),
                    ruleId = "required-any-of",
                ),
            ),
            opaqueRegions = emptyList(),
        )
        val violations = ContractEnforcer.enforceInput(
            ContractValidationMode.WARN,
            requirement,
            mapOf("testsuites" to mapOf("name" to "suite")),
        )
        assertTrue(violations.isEmpty())
    }

    @Test
    fun strict_mode_throws_on_type_mismatch() {
        val guarantee = GuaranteeSchema(
            root = Node(
                required = true,
                kind = NodeKind.OBJECT,
                open = false,
                children = linkedMapOf(
                    "status" to Node(required = true, kind = NodeKind.TEXT),
                ),
            ),
            obligations = emptyList(),
            mayEmitNull = false,
            opaqueRegions = emptyList(),
        )
        assertFailsWith<ContractViolationException> {
            ContractEnforcer.enforceOutput(
                ContractValidationMode.STRICT,
                guarantee,
                mapOf("status" to 123),
            )
        }
    }

    @Test
    fun validates_list_of_outputs() {
        val guarantee = GuaranteeSchema(
            root = Node(
                required = true,
                kind = NodeKind.ARRAY,
                element = Node(
                    required = true,
                    kind = NodeKind.OBJECT,
                    open = false,
                    children = linkedMapOf(
                        "ok" to Node(required = true, kind = NodeKind.BOOLEAN),
                    ),
                ),
            ),
            obligations = emptyList(),
            mayEmitNull = false,
            opaqueRegions = emptyList(),
        )
        val payload = listOf(
            mapOf("ok" to true),
            mapOf("ok" to false),
        )
        val violations = ContractEnforcer.enforceOutput(ContractValidationMode.WARN, guarantee, payload)
        assertTrue(violations.isEmpty())
    }

    @Test
    fun repeated_path_constraints_reuse_stringified_key_lookup_during_one_validation() {
        val key = CountingKey("1")
        val path = AccessPath(listOf(AccessSegment.Field("1")))
        val requirement = RequirementSchema(
            root = Node(required = true, kind = NodeKind.ANY),
            obligations = listOf(
                ContractObligation(
                    expr = ConstraintExpr.PathNonNull(path),
                    ruleId = "key-present",
                ),
                ContractObligation(
                    expr = ConstraintExpr.DomainConstraint(path, ValueDomain.Regex("[A-Z]{3}-\\d{2}")),
                    ruleId = "key-regex-a",
                ),
                ContractObligation(
                    expr = ConstraintExpr.DomainConstraint(path, ValueDomain.Regex("[A-Z]{3}-\\d{2}")),
                    ruleId = "key-regex-b",
                ),
            ),
            opaqueRegions = emptyList(),
        )
        val payload = linkedMapOf<Any?, Any?>(key to "ABC-12")

        val violations = ContractEnforcer.enforceInput(ContractValidationMode.WARN, requirement, payload)

        assertTrue(violations.isEmpty())
        assertTrue(
            key.toStringCalls <= 1,
            "stringified map-key lookup should be reused within one validation; calls=${key.toStringCalls}",
        )
    }

    @Test
    fun cached_validation_preserves_stringified_key_forall_and_regex_domain_behavior() {
        val numericFirst = linkedMapOf<Any?, Any?>(
            7 to "numeric-first",
            "7" to "string-second",
        )
        val stringFirst = linkedMapOf<Any?, Any?>(
            "7" to "string-first",
            7 to "numeric-second",
        )
        assertTrue(
            ContractEnforcer.enforceInput(
                ContractValidationMode.WARN,
                enumRequirement("7", "numeric-first"),
                numericFirst,
            ).isEmpty(),
        )
        assertTrue(
            ContractEnforcer.enforceInput(
                ContractValidationMode.WARN,
                enumRequirement("7", "string-first"),
                stringFirst,
            ).isEmpty(),
        )

        val forAllRequirement = RequirementSchema(
            root = Node(required = true, kind = NodeKind.ANY),
            obligations = listOf(
                ContractObligation(
                    expr = ConstraintExpr.ForAll(
                        path = AccessPath(listOf(AccessSegment.Field("items"))),
                        requiredFields = listOf("id"),
                        fieldDomains = linkedMapOf(
                            "kind" to ValueDomain.EnumText(listOf("alpha", "beta")),
                            "code" to ValueDomain.Regex("[A-Z]{2}-\\d{2}"),
                        ),
                        requireAnyOf = listOf(listOf("primary", "secondary")),
                    ),
                    ruleId = "items-forall",
                ),
            ),
            opaqueRegions = emptyList(),
        )
        val valid = mapOf(
            "items" to listOf(
                mapOf(
                    "id" to 1,
                    "kind" to "alpha",
                    "code" to "AB-12",
                    "secondary" to "fallback",
                ),
            ),
        )
        val invalidRegex = mapOf(
            "items" to listOf(
                mapOf(
                    "id" to 1,
                    "kind" to "alpha",
                    "code" to "bad",
                    "primary" to "main",
                ),
            ),
        )

        assertTrue(ContractEnforcer.enforceInput(ContractValidationMode.WARN, forAllRequirement, valid).isEmpty())
        val violations = ContractEnforcer.enforceInput(ContractValidationMode.WARN, forAllRequirement, invalidRegex)
        assertEquals(1, violations.size)
        assertEquals(ContractViolationKind.MISSING_CONDITIONAL_GROUP, violations.single().kind)
        assertEquals("items-forall", violations.single().ruleId)
    }

    private fun enumRequirement(path: String, expected: String): RequirementSchema = RequirementSchema(
        root = Node(required = true, kind = NodeKind.ANY),
        obligations = listOf(
            ContractObligation(
                expr = ConstraintExpr.DomainConstraint(
                    path = AccessPath(listOf(AccessSegment.Field(path))),
                    domain = ValueDomain.EnumText(listOf(expected)),
                ),
                ruleId = "stringified-key-domain",
            ),
        ),
        opaqueRegions = emptyList(),
    )

    private class CountingKey(private val label: String) {
        var toStringCalls: Int = 0
            private set

        override fun toString(): String {
            toStringCalls += 1
            return label
        }
    }
}
