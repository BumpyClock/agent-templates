# Standards baseline

Apply this baseline to changed code in the fixed-point diff. Use unchanged code only as evidence.

## Review contract

Strict means higher standards, not longer finding lists. Report high-leverage, high-confidence problems. Working behavior and passing tests do not excuse structural regressions.

For each finding, provide:

- Changed file, line, or symbol.
- Concrete evidence from the diff.
- Failure mode or maintenance cost.
- Smallest safe fix.
- Confidence and blocking status.

Documented repo standards can define hard violations. Fowler smells remain judgment calls. Nuclear findings block approval only when evidence is strong and the structural cost is unjustified.

## Nuclear maintainability baseline

### Structural simplification

- Hunt for reframings that delete branches, helpers, modes, layers, or other concepts.
- Delete complexity instead of moving it between functions or files.
- Prefer direct code over thin wrappers, identity abstractions, pass-throughs, or generic mechanisms that add no boundary.
- Accept an abstraction only when it removes more complexity than it adds or moves logic to its canonical owner.
- Preserve useful ownership boundaries. Do not flatten code into one file or function.

### Ownership and branching

- Put logic in its canonical owner.
- Flag feature logic in shared infrastructure, logic in the wrong layer, duplicate canonical helpers, and API leaks.
- Flag ad hoc conditionals, scattered special cases, one-off flags, Boolean mode combinations, and nullable modes in busy flows.
- Reframe state so special cases become the default flow when that change removes branches.
- Use a typed model or dispatcher for condition chains only when it reduces total complexity.

### File health

Treat file size as a signal, not a hard limit. Use the repo norm, with approximately 500 LOC as fallback.

Request decomposition only when size combines with mixed responsibilities or a clear architectural seam. A large cohesive file can pass.

### Types and contracts

Flag cast churn, internal `any` or `unknown` spread, unnecessary optionality, ad hoc shapes, and weak boundary contracts. Casts and `unknown` can be valid at external boundaries when validation contains them.

### Orchestration

Flag avoidable sequential async work, partial-update flows, and business logic mixed with orchestration. Prefer atomic related updates. Parallelize application work only when parallelism simplifies orchestration.

### Preferred fixes

Prefer fixes in this order when applicable:

1. Delete unnecessary indirection.
2. Reframe state so branches disappear.
3. Move logic to canonical owner.
4. Reuse canonical helper.
5. Collapse duplicate branches.
6. Extract focused helper only when complexity drops.
7. Split a file at a clear responsibility seam.
8. Separate orchestration from business logic.
9. Make related updates atomic.

## Approval bar

Return `Disposition: needs work` when any high-confidence, unjustified condition remains:

- Diff skips a clear structural simplification.
- File growth exposes mixed responsibilities or a clear decomposition seam.
- Ad hoc branching tangles an existing flow.
- Feature checks scatter through shared code.
- Wrapper, cast, or optionality churn makes design more indirect.
- Logic duplicates a canonical helper or lives in the wrong layer.
- Diff skips an obvious ownership-based decomposition.
- Modularity or readability regresses despite passing tests.

Return `Disposition: approve` when no blocking Standards finding remains. Keep lower-confidence concerns advisory.

## Fowler smell baseline

A documented repo standard overrides a conflicting heuristic. Treat each smell as a labeled judgment call, not a hard violation.

- **Mysterious Name** — name does not reveal purpose. Rename it. If no honest name exists, inspect design.
- **Duplicated Code** — same logic shape appears in multiple changed locations. Extract or reuse shared behavior.
- **Feature Envy** — method uses another object's data more than its own. Move behavior toward data owner.
- **Data Clumps** — same fields or parameters travel together. Bundle them when one domain type reduces repetition.
- **Primitive Obsession** — primitive or string represents a domain concept. Add a focused type when it strengthens invariants.
- **Repeated Switches** — same switch or conditional cascade recurs. Centralize dispatch or use polymorphism when simpler.
- **Shotgun Surgery** — one logical change requires scattered edits. Gather coupled behavior under one owner.
- **Divergent Change** — one module changes for unrelated reasons. Split at responsibility boundary.
- **Speculative Generality** — abstraction, parameter, or hook supports no current requirement. Delete or inline it.
- **Message Chains** — caller depends on a long navigation chain. Hide navigation behind the owning object.
- **Middle Man** — function or class mostly delegates. Remove it unless it enforces a boundary.
- **Refused Bequest** — subtype ignores most inherited behavior. Replace inheritance with composition.

## Focus lenses

`all` applies every lens. A selected focus adds depth but does not disable nuclear or Fowler baselines.

- **Architecture** — boundaries, ownership, coupling, layering, and API leaks.
- **Complexity** — hard control flow, oversized mixed-purpose files, needless abstractions, and smaller equivalent designs.
- **Time complexity** — repeated scans, lookups, sorts, allocations, I/O, or recomputation on hot paths. State current complexity, bottleneck, alternative, and space or readability cost.
- **Duplication** — exact and near-duplicate logic, branches, helpers, and modules.
- **Dead code** — unused files, stale abstractions, removable paths, and speculative flexibility.
- **Legacy code** — compatibility bridges, old patterns, hard-coded values, and orphan flows.
- **Tests** — missing regression coverage, weak assertions, and risky untested behavior.
- **Errors** — silent failures, swallowed exceptions, partial updates, and weak reporting.
- **Types** — weak invariants, leaky models, unnecessary optionality, casts, and silent fallbacks.
- **Comments** — stale, misleading, redundant, or missing rationale.
- **Docs** — setup, API, contributor, or behavior documentation drift caused by the diff.
- **Dependencies** — unused, outdated, overlapping, or avoidable dependencies.

Do not force an optimization when asymptotic gain or measured value is poor.

## Deletion-first tags

Use a tag when it states the preferred remedy:

- `delete:` remove dead code, unused flexibility, or speculative behavior. Replacement: nothing.
- `stdlib:` replace custom code with a named standard-library API.
- `native:` replace custom code or dependency with a named platform, framework, database, browser, or OS feature.
- `yagni:` remove abstraction, configuration, or layer with one implementation and no demonstrated need.
- `shrink:` preserve behavior with fewer concepts or lines. Show concise replacement when useful.

Deletion and simplification beat new abstraction. Existing platform features and dependencies beat new custom machinery when they fit.
