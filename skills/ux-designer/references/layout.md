# Layout Baseline

Use this structural baseline for new designs and refinements. Preserve established project and platform conventions.

For full pages, apply the shared [job and hierarchy guidance](page-composition.md#frame-the-job-first).
When alternative structures could improve the task, use [Page Composition](page-composition.md#choose-a-composition) to compare them.
Do not require a distinctive layout when a familiar structure serves the task.

---

## Visitor mode

- **Persuade + Experience:** composition may be asymmetric, fluid, or intentionally disruptive when the selected world earns it.
- **Operate + Read:** predictable structure, stable density, and navigable linearity are affordances.
- **Native:** follow platform conventions for navigation, insets, adaptation, and touch targets.

Preserve the established visual world. Change the identity only when the user requests it.

## Assess the Affected Layout

Select the questions relevant to the change or an unresolved concern. Inspect the affected output through [Critique](critique.md).

- **Reading order:** Apply the squint test. With detail blurred, can you still identify the primary element, the secondary element, and the major groups in order?
- **Grouping:** Are related items close and distinct groups separated, or are containers compensating for weak proximity?
- **Rhythm:** Do tight and generous intervals create a deliberate cadence, or is one spacing value repeated until everything has equal weight?
- **Structure:** Does the topology match the content and task? Are repeated cards, columns, or sections genuinely equivalent, or merely a framework default?
- **Density:** Does the amount of information per region fit use frequency, decision complexity, and visitor mode?
- **Adaptation:** At narrow, intermediate, wide, zoomed, and localized states, what reorders, collapses, wraps, scrolls, or remains fixed? Does DOM and focus order still agree with the visual order?
- **Extremes:** Do long content, empty states, overlays, sticky elements, safe areas, and small touch targets expose structural failures?

When relevant to the change, inspect arbitrary spacing, overflow, stacking, and container behavior.

## Set the spatial thesis

Before a structural change, identify the relevant relationships:

- the primary reading or task path;
- what belongs together and what must separate;
- which element leads and which supports;
- the intended density and spacing rhythm;
- how the structure changes across containers, viewports, input modes, and content extremes.

Choose the simplest structural model that expresses those relationships. Use layout primitives according to the relationships they control, and name reusable spacing and container roles semantically.

## Apply

- Group by meaning. Use proximity before adding containers or decoration.
- Create rhythm through deliberate contrast between tight and generous intervals.
- Use a documented spacing scale rather than one-off values. A 4-unit base usually provides the useful middle steps that an 8-only scale misses.
- Let hierarchy follow product priority, not framework defaults.
- Keep distinct content visually distinct without turning every group into an isolated component.
- Make responsive behavior structural: reorder, collapse, reflow, or reveal based on what remains important.
- Prefer container-aware components when the same component appears in different contexts.
- Use `gap` for sibling rhythm when it expresses the relationship more directly than child margins.
- Keep touch targets usable even when their visible marks are small.
- Use depth only when it clarifies state or hierarchy.
- Make optical corrections only after inspecting the rendered result.

Variation is not a goal by itself. Repetition should support recognition; break it only when content or priority changes.

## Verify

Select the criteria affected by the change. Follow [Critique](critique.md) for output evidence, repeat checks, and verification limits.

- The squint test still reveals the primary, secondary, and major groups in order.
- The reading and task path remains clear at representative sizes affected by the change.
- Related content groups naturally; unrelated content does not blur together.
- Tight and generous spacing create intentional rhythm instead of monotonous repetition.
- Density matches use frequency and content complexity.
- Long text, empty states, localization, zoom, and dynamic content do not break the structure.
- Keyboard, touch, and assistive-technology order agree with the visual order.
