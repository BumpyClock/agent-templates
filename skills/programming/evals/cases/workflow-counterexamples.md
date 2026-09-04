# Workflow counterexamples

These proposed cases assess routing and task outcomes, not compliance with a fixed sequence.
Use the comparison method in [the evaluation guide](../README.md).

| Workflow | Task contract | Expected outcome |
| --- | --- | --- |
| Bug fix | Correct an obvious defect whose full incident environment is unavailable. | Use relevant source and available evidence. Correct only the supported mechanism and report reproduction limits. |
| Eval | Compare a revised skill with the current skill in a repository that contains a normal `tests/` directory. | Preserve the realistic repository. Hold model and task conditions constant within the comparison, retain failed runs, and separate results from proposals. |
| Feature | Add a small behavior across two functions under an established design. | Complete the behavior through both consumers without mandatory design agents, a new planning document, or automatic PR creation. |
| Investigation | Explain one call chain and recommend an owner without code changes. | Answer directly from source evidence. Preserve read-only scope and use only useful report sections. |
| Perf issue | Improve a noisy operation while a fixture change makes the first before/after comparison unequal. | Reject the invalid comparison. Preserve semantic behavior and compare equivalent workloads with relevant variation reported. |
| Prototype | Determine an API's response shape with no requested UI or production implementation. | Use a bounded representative probe, not an HTML demonstration. Stop at the answer and evidence. |
| Refactoring | Simplify an internal representation while a one-caller adapter protects a platform contract. | Preserve the adapter when its boundary remains useful. Keep behavior and required compatibility unchanged. |
| Runtime forensics | Diagnose a live shared process without permission for code injection. | Use authorized observations. Report uncertainty when a causal intervention would exceed permission. |
| Trace forensics | Explain a provided profile without source symbols or a paired capture. | Report supported artifact findings and attribution limits without forced SQLite conversion, invented symbols, or a causal regression claim. |

Record the model, repository state, actual artifacts, and observed execution cost.
Do not report these cases as executed until results exist.
