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

1. **COMMIT A DESIGN DIRECTION BEFORE SPECIFYING ANYTHING.** State it in the doc (for marketing/landing: the one-line design read + dial values). Blocks the reflex of jumping straight to a default aesthetic — the root cause of templated output.
2. **LOCK ONE SYSTEM PER PAGE.** One accent with meaning, one radius language, one theme, one type scale — committed up front and held across every section. Blocks mid-page drift, the most common way multi-section work falls apart.
3. **RUN THE MECHANICAL ANTI-SLOP SCAN BEFORE DELIVERY.** The scan list lives at the bottom of `references/anti-slop-tells.md` — load it and run it item by item on the final artifact. "I kept the tells in mind while designing" is not running the scan.
4. **VERIFY RENDERED OUTPUT BEFORE CLAIMING IT WORKS.** Open the mockup/built page and look at it (screenshot tooling when available; the screenshot-review skill (critique mode) for visual-bug claims). Run the squint and text-mask tests from `references/page-composition.md`; fix the highest-impact defect, re-render, repeat until nothing material remains. A ticked checklist is not verification; only the rendered page is.
5. **HONOR REDUCED-MOTION AND WCAG AA.** Spec the `prefers-reduced-motion` variant explicitly and meet AA contrast for text, controls, and focus states — `references/accessibility.md` is the contract. Blocks "polish later" deferral; later never comes.

## Philosophy

Precision with intentional personality. **Craft is in the choice, not the complexity** — a flat interface with perfect spacing and typography beats a shadow-heavy interface with sloppy details. Every interface should look designed by a team that obsesses over 1-pixel differences: not stripped, *crafted*, for its specific context. Developer tool → precision and density. Collaborative product → warmth and space. Financial product → trust and sophistication.

## Defaults, Not Dogma

Reference files encode strong defaults, not law. Deviate when product context, platform conventions, or user requirements justify it — and state the reason in the design doc. For the high-value bans (serif-by-default, AI-purple, banned display serifs), the reason must cite a brand-specific fact (brand names the font, genuine heritage/publication context), not a self-generated adjective. Existing project conventions (tokens, fonts, icon set, motion style, component library) beat skill defaults: extend them, don't replace them.

## When Requirements Compete

Protect in this order — never sacrifice a higher item for a lower one:

1. Supplied facts, content, formulas, units, and task constraints.
2. The project's stack, conventions, and established design system.
3. Clarity of the user's primary job and the evidence that supports it.
4. The committed direction and locked visual system.
5. A composition specific to this material over any template — generic or house.
6. Micro-polish, motion, and detail refinement.

## Scale to Scope

- New product, page, or feature: full workflow below.
- Small change: edit the affected component or state within the existing design system.
- Preserve relevant accessibility and interaction behavior.
- Check the rendered result when layout, appearance, or interaction can change.
- A small edit needs no design document, mockup, direction statement, or micro-polish note.
- Use only references needed for the affected behavior.

## Reference Index

- `references/design-direction.md` — personality, color foundation, layout approach, typography, named aesthetic recipes (incl. Editorial minimalism).
- `references/page-composition.md` — user-job framing, two reading speeds, rejecting the category-default layout, focal hierarchy, pacing, perceptual tests, feels-wrong diagnosis. Load when composing any full page or screen.
- `references/data-and-evidence.md` — tables, stat/KPI displays, honest chart encoding in layout, calculators and interactive tools. Load for dashboards, reports, comparisons, pricing, or any data-heavy surface.
- `references/craft-foundations.md` — spacing, padding, radius, depth, surface treatment rules.
- `references/components-typography-icons.md` — control treatment, type hierarchy, data formatting, icons, editorial-minimal components.
- `references/interaction-visual-clarity.md` — motion, contrast, color usage, navigation context, dark mode, anti-patterns.
- `references/accessibility.md` — ARIA patterns for the custom UI this skill builds, focus, forms, reduced-motion, contrast, touch targets. Load when building/speccing any custom interactive component.
- `references/marketing-and-landing.md` — landing pages, portfolios, marketing sites: design read, dials, hero/section discipline, motion choreography, imagery. Load for any hero-led scrolling page.
- `references/premium-treatments.md` — double-bezel, button-in-button CTA, hover kinetics, fluid-island nav, grain. Load for premium/agency reads (VAR ≥ 7).
- `references/redesign.md` — mode detection, audit-first, preservation rules, modernisation levers. Load when redesigning an existing site/page.
- `references/design-systems.md` — real system vs aesthetic decision, honesty rule, install commands. Load when the brief names a design system.
- `references/mobile-app-screens.md` — platform mode, safe areas, flow logic, readability floor. Load for any mobile app work.
- `references/anti-slop-tells.md` — AI-generated-design tells, banned as defaults, plus the mechanical pre-delivery scan (Gate 3). Load for the final pass on every mockup and for placeholder content.
- `references/production-implementation.md` — stack defaults, design-system package map, motion code skeletons, dark-mode tokens, performance gate. Load only in build mode.
- `references/design-doc-template.md` — the Markdown design-doc structure. Load when producing the doc.

## Output

Two modes — pick by what the user asked for:

- **Design (default)**: implementation-ready UX documentation (per `references/design-doc-template.md`) plus self-contained HTML mockup(s) for layout-level work. Mockups are throwaway design artifacts, not production code.
- **Build**: when asked to implement for real, write production frontend code following `references/production-implementation.md` — after the direction, craft, and anti-slop passes. A heavyweight design doc is optional in build mode; the design read, dial values, and key decisions still get stated.

## Full Design Workflow

1. **Gather inputs** — goals, users, platforms, constraints, content requirements. Identify existing design system/tokens/components (theme configs, CSS vars, Storybook). Missing input that changes meaning (data, claims, brand facts) → ask once, grouped; otherwise label the unknown honestly and proceed.
2. **Commit direction** (Gate 1) — use `references/design-direction.md`. For marketing/landing, state the design read; if it genuinely diverges from the brief, ask exactly one clarifying question.
3. **Define structure** — frame the user's job and order sections by user need (`references/page-composition.md`); information architecture, key flows, primary tasks.
4. **Compose layout** — name the category-reflex layout and reject it unless the material earns it; for layout-level work compare two materially different composition hypotheses (`references/page-composition.md`); then regions, grid, responsive behavior, navigation and hierarchy.
5. **Specify interactions** — states, transitions, feedback; loading/empty/error/validation.
6. **Specify visual system** — color roles, type scale, spacing, tokens (Gate 2 locks it).
7. **Micro-polish pass** — concentric radius math, optical alignment, text wrapping, tabular numbers, hit areas, image outlines, motion behavior. Implementation-ready specs, not vibes.
8. **Accessibility** — keyboard, focus order, contrast, ARIA where needed (Gate 5).
9. **Deliver** — design doc + mockup(s); run Gates 3 and 4 on the artifact.

## HTML Design Mockups

For layout-level work, output design option(s) as a self-contained HTML file alongside the doc:

- One file, zero dependencies: inline CSS, no build step, no CDN links, opens via double-click.
- When exploring direction, render 2-3 labeled options in one file for side-by-side comparison.
- Use the spec's real values (spacing, type scale, color tokens, radii) so the mockup proves the visual system.
- Show key states where practical (hover, empty, error); cover each target breakpoint.
- Placeholder content is part of the design: realistic names, believable brands, organic numbers, plain functional copy (rules in `references/anti-slop-tells.md`).
- Multi-section/multi-screen mockups hold one brand world (Gate 2).
- No frameworks, no JS beyond trivial toggles.

### Generated Design Reference Images (optional)
When an image-generation tool is available and the user wants visual comps: one horizontal image per page section, one image per app screen — never a single collage. Keep palette, typography, treatment consistent across the set; label each ("Section 3 of 8: Pricing"). Composition rules from `marketing-and-landing.md` / `mobile-app-screens.md` apply.

## Quality Bar

For small edits, report the change and relevant checks without a separate design artifact.
For full design work, before handoff: requirements captured; direction stated with rationale; layout hierarchy per breakpoint; components and states listed; existing tokens reused or gaps confirmed; micro-polish specs cover what the task touches; accessibility documented; Gates 3-5 run on the final artifact; rationale given wherever a reference default was overridden.
