# Principle counterexamples

These are proposed cases, not observed model results.
Use equivalent repository states and task contracts under the comparison method in [the evaluation guide](../README.md).
Assess the final artifact and execution cost rather than whether the agent names a principle.

| Principle | Task and expected outcome | Counterexample and expected restraint |
| --- | --- | --- |
| Model the Domain | Add a task lifecycle whose flags admit contradictory states. Express valid states and transitions in one representation. | Change one local label branch. Preserve clear local code rather than add a registry or state machine. |
| Type System Discipline | Separate interchangeable account and invoice identifiers where a mix-up causes a defect. | Sum an empty collection. Preserve the valid zero result instead of require a non-empty collection type. |
| Boundary Discipline | Parse an external payload into the application model. Remove redundant syntax checks only where the parser's guarantee persists. | Revoke access after initial authentication. Preserve the current authorization check despite the valid identifier type. |
| Make Operations Idempotent | Retry one logical request after the effect succeeds but the acknowledgment fails. Avoid a duplicate effect or report an uncertain outcome. | Submit two distinct purchases with equal payloads. Preserve both intentional operations. |
| Separate Before Serializing Shared State | Give independent status producers separate owned records when no cross-record atomic snapshot is required. | Maintain an atomic balance invariant or extend one coherent test suite. Preserve shared ownership and structural coordination rather than fragment the artifact. |
| Minimize Reader Load | Remove a pass-through that exposes duplicate contracts without a useful boundary. | Preserve a one-caller platform adapter or public API whose interface hides a real dependency. |
| Exhaust the Design Space | Compare viable designs for an uncertain, consequential state ownership decision. Use evidence that distinguishes them. | Extend an established mechanical pattern. Avoid invented alternatives, mandatory prototypes, and agent fan-out. |
| Build the Lever | Apply a uniform API transformation across many eligible consumers without changes outside the contract. | Correct a local expression with adequate existing coverage. Avoid a new script whose maintenance exceeds its value. |
| Encode Lessons in Structure | Use an existing enforcement mechanism for a recurrent invariant violation with a precise failure condition. | Correct an isolated, context-specific preference. Avoid a repository-wide lint or cleanup without evidence of a recurring defect. |
| Subtract Before You Add | Remove an obsolete internal alias before another consumer adopts it. | Correct a local defect. Leave unrelated legacy cleanup outside the task. |
| Redesign from First Principles | Replace repeated feature exceptions with one contract that fits the new requirement. | Extend an adequate local design. Avoid a rewrite without a material benefit. |
| Migrate Callers Then Delete Legacy APIs | Replace an internal API and migrate its complete consumer set before retirement. | Preserve an externally supported API whose callers are absent from the local repository. |
| Fix Root Causes | Correct the owner of an invalid transition rather than hide its output. | Diagnose an inaccessible incident from source and logs. Report limits rather than force a local reproduction or invent a fix. |
| Experience First | Reduce caller effort and clarify failure recovery in an API change. | Preserve security, accessibility, and the user's stated priorities despite a more visually attractive alternative. |
| Foundational Thinking | Establish the required event contract before dependent producers and consumers diverge. | Implement a small feature without a speculative framework or unrelated infrastructure. |
| Guard the Context Window | Reduce a large capture to relevant evidence with exact source pointers. | Inspect a short local file directly rather than delegate solely to avoid a small read. |

Record correctness, completeness, unrelated changes, relevant evidence, tool calls, and cost when available.
Include the model, repository state, and actual outcomes in any result report.
