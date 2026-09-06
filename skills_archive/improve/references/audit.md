# Audit

Use this route for codebase audits, focused reviews, and improvement roadmaps.

## Scope

Use the requested subsystem, category, or change set.
For a branch audit, identify the base before comparison.
Distinguish introduced defects from pre-existing issues.

For a broad request, prioritize relevant change history and consequential boundaries.
Use quick scope for a few high-confidence findings.
Use deep scope for wider coverage, with explicit exclusions.
Choose depth from the task rather than a fixed number of agents or categories.

## Evidence

Read the relevant categories in [Audit playbook](audit-playbook.md) when they resolve a specific audit question.
Its category catalog and finding format are references, not mandatory output.
Run static tools when their results can answer the question.
A documentation audit does not require a build, coverage report, or repository map.

For each finding, establish:

- Source location and the observed behavior or instruction.
- Concrete failure scenario or maintenance cost.
- Confidence, expected benefit, effort, and change risk.
- The smallest useful correction.

Check callers, tests, and documented intent before a defect claim.
Attempt a focused reproduction for consequential correctness defects.
Label an unconfirmed diagnosis as an investigation.
Quantify performance claims or state the measurement gap.
Validate external facts against authoritative sources when those facts are uncertain or current.

Use independent review when consequence or a required acceptance gate justifies it.
Separate context can help independent audit questions, but delegation is optional.

## Optional evidence tools

For numerous or delegated citations, use the evidence validator to detect mismatched quotes.
A few directly inspected citations do not require a JSON report.

The input shape is:

```json
{"findings":[{"id":"stable-id","title":"Finding title","evidence":[{"path":"relative/path","startLine":1,"endLine":1,"quote":"Exact source text"}]}]}
```

Run from the repository under audit with the actual validator path:

```sh
node <improve-skill>/scripts/validate-evidence.mjs --repo . --findings <scratch-file.json>
```

Resolve rejected citations against source before presentation.
Matching text establishes citation accuracy, not the truth of a conclusion.

Collect baseline metrics only for requested longitudinal comparisons or claims that require those measurements.
Keep scratch reports outside the repository unless a report file is part of the requested deliverable.

## Report

Rank findings by expected benefit, confidence, effort, and change risk.
Use a table only when it helps comparison.
Group repeated instances of one cause.
Separate optional product directions from defects.

State coverage limits and the recommended next scope.
Do not create plans or request implementation approval unless the task needs that transition.
