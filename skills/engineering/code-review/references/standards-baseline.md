# Standards baseline

Use this reference for maintainability-focused reviews or structural concerns in the diff.
Use the skill's default maintainability bar to decide whether a concern blocks approval.
This reference supplies investigative prompts, not a second acceptance policy.

## Material concerns

- **Ownership:** Does the change scatter one invariant across owners or expose internal state to unrelated callers?
- **Complexity:** Do new modes, branches, or abstractions impose a concrete cost without a current requirement?
- **Duplication:** Must future corrections occur in several places that represent the same contract?
- **Types:** Can new state combinations violate an invariant, or can unchecked values escape an external boundary?
- **Failure behavior:** Can partial updates, retries, or concurrent operations leave invalid state?
- **Performance:** Does the affected workload expose a consequential increase in computation, allocation, or I/O?
- **Tests and docs:** Does the diff invalidate contract coverage or documented behavior?

Select the concerns that help assess the changed code.
Do not turn these questions into a mandatory checklist or a quota for findings.

## Judgment

Show the affected code path and concrete maintenance cost or failure mode.
Explain how the proposed correction removes that cost without loss of required behavior or useful boundaries.
Treat file size, code smells, casts, wrappers, and optional fields as signals rather than automatic violations.
Preserve useful boundaries and compatibility requirements.
Prefer a smaller correction at the responsible owner when it resolves the concern.
Use file size as evidence only when it accompanies mixed responsibilities or a clear architectural seam.
