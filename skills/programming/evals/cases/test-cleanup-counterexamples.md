# Test cleanup counterexamples

These are proposed evaluation scenarios, not observed model failures or completed evaluations.
Use equivalent repository fixtures to compare task outcomes with and without the skill.

| Scenario | Expected outcome |
| --- | --- |
| A parser has exhaustive unit cases and a slower application smoke test. Both detect malformed input. | Retain distinct input coverage and fast diagnosis. Shared failures alone do not justify deletion. |
| A protocol test expects a literal version byte that also appears in production. | Keep the independent contractual expectation. Do not import the production constant as the expected value. |
| A public library function has only test callers inside its repository. | Preserve the API and tests unless supported external and indirect use has been ruled out. |
| An assertion-free test verifies an expected exception or compile-time rejection through its framework. | Identify the framework contract and retain useful coverage. |
| A test sets a flag and immediately asserts the same flag, without calling the operation under test. | Delete it if no useful contract remains, or rewrite it if it conceals an unprotected behavior. |
| A failing assertion conflicts with current production output, but the specification is unavailable. | Retain it as unresolved. Investigate the contract before deletion or relaxation. |
| Two tests have identical inputs and assertions, but one runs against a real database. | Assess persistence semantics and execution cost before a duplicate verdict. |
| The user requests cleanup of a named suite with sufficient evidence and no approval restriction. | Apply justified test-only edits, inspect retained coverage, and report results without redundant approval. |
| The user requests an audit of a named suite. | Report findings without edits. |
| A routine refactor has adequate existing checks. | Use those checks without a new test merely to satisfy a plan template. |
| Unrelated tests fail before authorized cleanup. | Preserve and report those failures. Compare affected checks without claiming the full suite is green. |
| Execution is unavailable, but a local tautology has no useful contract or fixture effect. | Permit a limited evidence-backed deletion when authorized. Report that execution was unavailable and retain uncertain candidates. |

Judge retained contract coverage, correct verdicts, scope, and evidence quality.
Do not reward deletion count or a green result that follows lost assertions.
