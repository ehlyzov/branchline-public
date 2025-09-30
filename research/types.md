# Transform Contracts Implementation Plan

## Goals
- Allow `TRANSFORM` definitions to omit the `{ stream }` clause while defaulting the mode to `STREAM`.
- Support optional type annotations (`AUTO -> AUTO` by default) that describe input/output schemas.
- Synthesize schema requirements and guarantees automatically when authors rely on the `AUTO` default.

## Step-by-Step Plan

1. **Document Grammar Changes**
   - Update the language reference and EBNF fixtures to show that the mode block is optional and defaults to `{ stream }`.
   - Describe the new optional `: InputType -> OutputType` signature syntax and clarify that both sides default to `AUTO` when omitted.

2. **Parser Adjustments**
   - Modify `Parser.parseTransform` to treat the mode block as optional and return `Mode.STREAM` when absent.
   - Extend the parser to recognize an optional signature following the parameter list: `: TypeRef -> TypeRef`.
   - Capture signature metadata in a new `TransformSignature` data class attached to `TransformDecl`.
   - Ensure diagnostics cover malformed mode blocks and signature syntax errors.

3. **AST & Data Model Updates**
   - Add `signature: TransformSignature?` to `TransformDecl`, storing resolved token spans for later error reporting.
   - Introduce contract model types (`TransformContract`, `SchemaRequirement`, `SchemaGuarantee`, `FieldConstraint`, `FieldShape`, `ValueShape`, etc.) in a shared module accessible to the semantic analyzer and runtime.

4. **Semantic Analysis Enhancements**
   - Resolve `TypeRef` identifiers in `TransformSignature`, producing typed schemas when available.
   - When signatures are explicit, validate that referenced schema types exist and align with the transform parameters.
   - Prepare semantic context objects to carry either the explicit contract or a placeholder indicating inference is required.

5. **Schema Inference Pass**
   - Implement a `TransformShapeSynthesizer` that walks the transform AST/IR collecting:
     - Input requirements from parameter-rooted access expressions.
     - Output guarantees from `Set`, `Modify`, `AppendTo`, and `Output` statements.
     - Control-flow merges that downgrade required fields to optional when necessary.
     - Dynamic accesses recorded separately for conservative downstream handling.
   - Produce a complete `TransformContract` for every transform, marking the source as `INFERRED` when no signature is present.

6. **Runtime & Registry Integration**
   - Extend the runtime transform descriptor to store the resolved `TransformContract` alongside compiled bodies.
   - Ensure execution paths (interpreter, VM) receive the contract for tooling and validation purposes.

7. **Validation Between Signatures and Inference**
   - When both an explicit signature and inference are available, compare them and surface semantic errors on mismatch.
   - Allow the explicit contract to bypass inference when validation succeeds.

8. **Testing Strategy**
   - **Parser Tests:** Add cases for transforms without mode blocks, with explicit signatures, and with malformed signatures.
   - **Semantic Tests:** Verify mode defaults, signature resolution, and error diagnostics for missing types.
   - **Inference Unit Tests:** Feed representative transforms into the synthesizer and assert inferred requirements/guarantees.
   - **Integration Tests:** Compile transforms through the full pipeline (interpreter and VM) and confirm contracts propagate to runtime descriptors.
   - **Documentation Tests:** Regenerate docs/fixtures to ensure examples reflect the optional mode and signature syntax.

9. **Tooling & Serialization**
   - If contracts are serialized (e.g., for IDE support), update serialization schemas and adapters to include the new contract fields.
   - Provide temporary feature flags if gradual rollout is required for downstream consumers.

10. **Follow-up Tasks**
    - Coordinate with documentation and developer tooling teams to expose inferred contracts in editor extensions.
    - Monitor performance impact of inference and cache results where necessary.
