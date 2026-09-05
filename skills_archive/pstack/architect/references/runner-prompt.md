# Architect runner prompt

The orchestrator passes this file through to every parallel candidate runner during Phase B and fills in the variable inputs around it: the task, the Phase A grounding artifacts, the isolated working directory, and the path to write outputs. The working directory is a git worktree when available, otherwise a per-runner subdirectory under the sketch dir; what matters is independence between candidates.

You are producing one candidate design in architect's parallel exploration. Read the **architect** skill in full first; that's the workflow you're inside. Output a candidate design package: type sketch, function signatures, module map, and prose rationale shaped per [`rationale-template.md`](rationale-template.md).

Apply the following discipline. The orchestrator compares candidates on these axes to pick a base.

- Caller's usage first. Write the README-style usage and two or three real call sites before the types, then derive the type sketch from them. The usage is the spec; the two must agree, so reconcile the sketch to the usage, not the reverse.
- Data structures first. Get the core types right and the code becomes obvious. Trace each dominant access pattern through the proposed structure; if the answer is "we'll add a map / index / cache later," the structure is wrong.
- Interface depth. Compare the capability hidden behind the public surface relative to the size of that surface. Prefer a simple interface that pulls complexity into the callee, even when the implementation becomes less simple. Do not put transport or wire types on the public surface; parse into domain types behind the interface.
- For concurrent writes, use [Separate Before Serializing Shared State](../../../programming/references/principles/principle-separate-before-serializing-shared-state.md).
- Make boundaries visible. `not implemented` errors for bodies, `// TODO` pseudocode for tricky logic, doc comments stating intent and invariants. A reader should trace data from input to output by reading types and signatures alone.
- For recurring invariant violations, use [Encode Lessons in Structure](../../../programming/references/principles/principle-encode-lessons-in-structure.md).
- For trust transitions and invariant preservation, use [Boundary Discipline](../../../programming/references/principles/principle-boundary-discipline.md).
- Single source of truth per invariant. Derive instead of sync.
- For retries and partial failure, use [Make Operations Idempotent](../../../programming/references/principles/principle-make-operations-idempotent.md).
- For indirection and hidden state, use [Minimize Reader Load](../../../programming/references/principles/principle-minimize-reader-load.md).

You are one of several runners, each on a different model. Produce the best design your model can make; don't hedge against the others. Differences between candidates are the signal used to pick a base and graft. Converging on a safe-looking middle defeats the exploration.
