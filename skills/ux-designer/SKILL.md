---
name: ux-designer
description: "Design or implement interfaces, layouts, and interactions. Use for UI work, including animation changes. Motion audits and roadmaps use improve-animations."
context: fork
---

# UX Designer

Design precise, crafted UX for consumer apps, enterprise software, SaaS dashboards, admin interfaces, web apps, marketing pages — and CLI/TUI, which benefits from the same principles. Treat UX as end-to-end experience, not just visuals.

## Full Design Gates

Apply these gates to new pages, screens, or a requested full redesign.
For a small edit, use the scope rule below instead.

1. **Choose a design direction.** Base it on the product, users, and existing visual system.
2. **LOCK ONE SYSTEM PER PAGE.** One primary brand accent, one radius language, one theme, one type scale — committed up front and held across every section. Blocks mid-page drift, the most common way multi-section work falls apart.
3. **Verify the actual output.** Run the project and inspect the relevant interface, as described in `references/critique.md`. Choose tools appropriate to the platform and behavior. Fix material defects within scope. Repeat affected checks after changes or unresolved failures. Report any unavailable checks.
4. **Honor reduced motion and WCAG AA.** Provide an explicit reduced-motion variant. Apply `references/accessibility.md` to text, controls, focus states, and interactions.

## Philosophy

Precision with intentional personality. **Craft is in the choice, not the complexity** — a flat interface with perfect spacing and typography beats a shadow-heavy interface with unnecessary details. Every interface should look *crafted*, for its specific context. Developer tool → precision and density. Collaborative product → warmth and space. Financial product → trust and sophistication.

## Defaults, Not Dogma

Reference files provide defaults, not requirements. Adapt them to product context, platform conventions, and user requirements. Preserve existing project conventions for tokens, fonts, icons, motion, and components.

Use [Layout](references/layout.md) as the structural baseline. Use [Typeset](references/typeset.md) as the typography baseline. Use [Animate](references/animate.md) as the motion baseline. Follow [Accessibility](references/accessibility.md#reduced-motion) for reduced-motion behavior.

Treat visual treatments as optional choices, subject to project conventions and accessibility constraints.

Use [Quieter](references/quieter.md) and [Bolder](references/bolder.md) as recipes to refine a design or establish an initial direction. If the direction is uncertain, ask the user or present both options before you commit to one.

## When Requirements Compete

Protect in this order — never sacrifice a higher item for a lower one:

1. Supplied facts, content, formulas, units, and task constraints.
2. The project's stack, conventions, and established design system.
3. Clarity of the user's primary job and the evidence that supports it.
4. The committed direction and locked visual system.
5. A structure that serves the task and content, whether familiar or distinctive.
6. Micro-polish, motion, and detail refinement.

## Scale to Scope

- New product, page, or feature: full workflow below.
- Small change: edit the affected component or state within the existing design system.
- Preserve relevant accessibility and interaction behavior.
- A small edit needs no design document, mockup, direction statement, or micro-polish note.
- Use only references needed for the affected behavior.

## Deliverable

Deliver the output the user requests. For implementation tasks, modify production code. Create separate design documents or mockups only when requested or needed to resolve a design choice.

## Reference Index
Read these when necessary:

- `references/design-direction.md` — personality, color foundation, layout approach, typography, named aesthetic recipes (incl. Editorial minimalism).
- `references/layout.md` — structural baseline and adaptation. Read to establish, repair, or refine layout.
- `references/page-composition.md` — shared page hierarchy, evidence, and optional composition exploration. Read for detailed full-page structure or unresolved hierarchy problems.
- `references/data-and-evidence.md` — data accuracy, mock-data labels, tables, charts, and calculators. Read for data-heavy surfaces or placeholder content.
- `references/craft-foundations.md` — spacing, padding, radius, depth, surface treatment rules.
- `references/typeset.md` — typography baseline, numeric text, and font behavior. Read to establish or refine text hierarchy, readability, or font delivery.
- `references/components-typography-icons.md` — controls, icons, and editorial-minimal components. Typography rules reside in `references/typeset.md`.
- `references/animate.md` — motion baseline, runtime choices, and performance constraints. Read to create or revise motion.
- `references/interaction-visual-clarity.md` — optional interaction presets, contrast, color usage, navigation context, dark mode, and visual anti-patterns.
- `references/accessibility.md` — controls, focus, forms, reduced motion, contrast, and touch targets. Read when the task affects these behaviors.
- `references/critique.md` — actual-output inspection across web, native, and terminal interfaces. Read for design critiques or visual verification.
- `references/redesign.md` — mode detection, audit-first, preservation rules, modernisation levers. Load when redesigning an existing site/page.

### Task-Specific Refinement

Select references by the requested outcome. Do not run every refinement pass by default.

- `references/clarify.md` — interface copy. Read to revise unclear labels, instructions, or state messages.
- `references/bolder.md` — optional recipe for stronger emphasis, as a refinement or an initial direction.
- `references/quieter.md` — optional recipe for less visual intensity, as a refinement or an initial direction.
- `references/delight.md` — product-specific personality to add expressive details or feedback.
- `references/optimize.md` — performance diagnosis and improvement. Read to investigate or improve interface performance.
- `references/polish.md` — final refinement. Read for a requested polish pass on an existing interface.

## Full Design Workflow

1. **Gather inputs** — goals, users, platforms, constraints, content requirements. Identify existing design system/tokens/components (theme configs, CSS vars, Storybook). Missing input that changes meaning (data, claims, brand facts) → ask once, grouped; otherwise label the unknown honestly and proceed.
2. **Choose direction** (Gate 1) — use `references/design-direction.md`.
3. **Define structure.** Use `references/layout.md` to define the user task, content order, and key flows.
4. **Compose layout.** Define regions, grid, responsive behavior, navigation, and hierarchy. When alternative structures could improve the task, use `references/page-composition.md` to compare them.
5. **Specify interactions** — states, transitions, feedback; loading/empty/error/validation.
6. **Specify visual system** — color roles, type scale, spacing, tokens (Gate 2 locks it).
7. **Micro-polish pass** — concentric radius math, optical alignment, text wrapping, tabular numbers, hit areas, image outlines, motion behavior. Implementation-ready specs, not vibes.
8. **Accessibility** — keyboard, focus order, contrast, ARIA where needed (Gate 4).
9. **Deliver the requested output.** Verify the artifact against Gates 3 and 4.

## HTML Design Mockups

When an HTML mockup is the chosen deliverable, use these constraints:

- One file, zero dependencies: inline CSS, no build step, no CDN links, opens via double-click.
- When exploring direction, render 2-3 labeled options in one file for side-by-side comparison.
- Use the spec's real values (spacing, type scale, color tokens, radii) so the mockup proves the visual system.
- Show key states where practical (hover, empty, error); cover each target breakpoint.
- Label fictional content and mock data clearly, as specified in `references/data-and-evidence.md`.
- Multi-section/multi-screen mockups hold one brand world (Gate 2).
- No frameworks, no JS beyond trivial toggles.

### Generated Design Reference Images (optional)
When the user requests visual comps, use an available image-generation tool. Create one image per page section or app screen. Keep palette, typography, and surface treatment consistent across the set. Label each image by section or screen. Apply the structural baseline from `references/layout.md`.
