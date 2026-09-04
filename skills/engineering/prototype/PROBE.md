# Behavioral probe

Use a throwaway script or minimal runnable example to resolve a concrete behavior, API, or timing question.
For a human-operated state-model demonstration, use [LOGIC.md](LOGIC.md).
For a visual design decision, use [UI.md](UI.md).

## Workflow

1. State the question and the observations that would distinguish plausible answers. Separate observable behavior from product preference.
2. Select the smallest representative environment. Name relevant versions, inputs, dependencies, and any difference from the real target.
3. Create an isolated probe with existing tools. Limit side effects and output to the question.
4. Run the probe and inspect the result. Repeat comparable trials when variation affects the conclusion.
5. Report the answer, evidence, command, artifact path, and limits. Mark the result inconclusive when the probe cannot distinguish the alternatives.

Use assertions when they detect the behavior at issue.
For timing comparisons, preserve equivalent workloads and account for startup effects, caching, and run-to-run variation.
For an API question, exercise the relevant implementation rather than a mock that assumes the answer.

## Limits

Keep synthetic examples representative of the property under study.
A fast toy workload does not establish a production performance bound.
A standalone script cannot settle a framework lifecycle question unless it reproduces the relevant lifecycle.

Use memory or explicitly disposable local data by default.
Obtain authorization before external writes, paid calls, production access, or changes to shared state.
Preserve secrets and unrelated data outside the output.
Follow the [prototype scope and completion rules](SKILL.md) for artifact retention and implementation authority.
