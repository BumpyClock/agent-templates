Polish is refinement, never concealed redesign. Preserve the incumbent visual world, content, behavior, and everything outside scope. If the concept itself is wrong, say so and recommend [Redesign](redesign.md) or [Bolder](bolder.md) instead of smuggling in a replacement.

## 1. Establish the system

Read relevant design documents when available. Inspect representative tokens, shared components, patterns, and adjacent flows within scope.
If no formal system exists, use coherent project conventions.

Classify each drift before fixing it:

- **missing token:** the system needs a reusable value;
- **one-off implementation:** an existing shared component or pattern should replace it;
- **conceptual mismatch:** the flow, information architecture, or hierarchy differs from comparable product areas;
- **local defect:** the implementation is simply incomplete or inconsistent.

Fix the cause at the narrowest correct level. When a binding system principle cannot be inferred, follow the closest comparable product area and list the assumption in the report.

## 2. Gather the evidence

Inspect the affected feature with the platform-appropriate methods in [Critique](critique.md). Select representative sizes and states based on scope and risk. Determine:

- whether the affected behavior works;
- the quality bar, inferred from the project and the request. Assume production quality unless the user says otherwise;
- known constraints or deliberately unfinished work;
- the states, content lengths, roles, and input methods users will actually encounter.

If a prior critique exists, use its relevant findings as one input. Check whether subsequent changes affect that evidence.

## 3. Triage

Separate functional defects from cosmetic ones and fix in this order:

1. broken or blocked tasks, data loss, misleading state, and inaccessible paths;
2. missing loading, empty, error, success, disabled, and permission states;
3. flow, hierarchy, responsive, and design-system drift;
4. visual and motion inconsistencies;
5. code and asset cleanup.

## 4. Polish the affected area

Apply these criteria only where the requested work can affect them.

### Flow and hierarchy

- Match neighboring mental models, terminology, disclosure, routing, save behavior, and optimistic or pessimistic patterns.
- Make the primary task and current state obvious without flattening every element to equal weight.
- Ensure arrival, transition, empty, and recovery paths connect instead of behaving as isolated screens.

### Layout and type

- Align to the project's grid and spacing scale; fix optical as well as mathematical alignment.
- Group related content tightly and separate distinct groups generously.
- Keep same-role typography consistent; test measure, wrapping, localization expansion, zoom, and font loading.
- Check representative viewport sizes that can expose layout regressions from the change.

### Color, imagery, and icons

- Use semantic tokens and stable color meanings across themes.
- Verify text, control, and focus contrast in affected states.
- Keep icon families, stroke/weight, sizing, and optical alignment coherent.
- Prevent image layout shift; use correct aspect ratios, responsive sources, and useful alt text.

### Interaction and state

- Give each affected control the states its behavior can enter. A submit button needs loading and error states. A plain link does not.
- Preserve visible keyboard focus, logical tab order, labels, and touch targets, per [Accessibility](accessibility.md).
- Keep motion coherent, interruptible, and performant. Do not add animation merely to make polish visible.
- Check content extremes and permission-dependent states when the change can affect them.

### Content and code

- Keep terminology, capitalization, punctuation, and factual copy consistent. Do not change factual claims. Flag a suspected error in the report.
- In files you changed, remove debug output, dead code, unused imports, obsolete styles, and duplication that this work created or touched.
- Replace custom implementations with shared components where the system owns the pattern.
- Promote genuinely reusable values to tokens; do not create a system abstraction for one local exception.

## 5. Verify and finish

Inspect the affected output after changes, as specified in [Critique](critique.md). Reuse valid evidence for unchanged behavior.
Broaden checks only when a failure or unresolved concern justifies additional coverage.
Check agreement with applicable project conventions, available design documents, and the user's scope.

Inspect the source diff for accidental changes and temporary artifacts introduced by this work.
Report the completed scope and verification limits. Do not require completion of unrelated feature work.
