---
name: ux-designer
description: "Design or implement interfaces, layouts, and interactions. Use for UI work, including animation changes. Motion audits and roadmaps use improve-animations."
---

## Core idea

> "When we align the interface to the way we think and move, something magical happens — it stops feeling like a computer and starts feeling like a seamless extension of us."

A fluid interface responds immediately and supports continuous, interruptible motion where it helps users understand and control the interaction.

Design the end-to-end experience for its context. A developer tool may need precision and density; a collaborative product may benefit from warmth and space. Base choices on the project's users, subject matter, and real content.

For a new visual direction or requested rebrand, choose a distinctive palette, typography, and layout that fit the brief. Take aesthetic risks when justified. Within an established product, preserve its identity and familiar interactions unless the request calls for changing them.

## Design foundations: the eight principles

(*Principles of Great Design*, WWDC 2026). Use these as the names you reason with:

1. **Purpose.** Decide what *not* to build. Every feature spends the user's time, attention, and trust. Users need to get their tasks done, not to understand the underlying tech.
2. **Agency.** Keep people in control: offer choices, don't force a single path. Prefer easy undo. Use a confirmation dialog only for destructive, irreversible actions, because overuse trains people to click through.
3. **Responsibility.** Act in the user's interest. Ask for private data at the right moment, only for what is needed. Anticipate misuse and harm, especially with AI (an allergy-aware recipe app must not suggest a harmful ingredient). Cut a feature whose risk outweighs its value.
4. **Familiarity.** Build on what people already know. Things that look the same must behave the same and live in the same place (close is top-left on macOS). Break a familiar pattern only when you can show it is better.
5. **Flexibility.** Adapt to the platform (iPhone = quick touch; desktop = deep workflows with precise pointer control) and to the range of abilities, languages, and expertise. When no single layout fits everyone, let people personalize.
6. **Simplicity — not minimalism.** Burying everything in one place looks minimal but isn't simple. Make the most important thing the most obvious through order, spacing, and contrast. Sometimes *adding* context simplifies (a video scrubber that shows time remaining). Show the common path first, advanced options one level deeper. Start from a blank slate and add only what is needed; cleaning up afterward is not the same.
7. **Craft.** Every spacing, timing, and alignment value is a deliberate choice you can defend. Jittery scroll, misaligned icons, and layouts that break on rotation read as carelessness.
8. **Delight.** The result of getting the other seven right, not confetti on top. Decide the emotion people should feel (calm, confident, excited) and reinforce it in every decision.

Tactical rules that serve these:

- **Feedback comes in four kinds:** status, completion, warning, error. Confirm meaningful actions, expose ongoing status, warn before problems, validate inline (not on submit).
- **Wayfinding.** Every screen should answer: Where am I? Where can I go? What's there? How do I get out? Never trap the user.
- **Grouping & mapping.** Proximity implies relationship; place a control near what it affects and arrange controls to mirror what they change. Use proximity and mapping to reinforce clear labels, not replace them.
- **Direct, specific labels beat safe generic ones.** Name nav items for their contents ("Progress", "Library"), not vague umbrellas ("Home"). Specificity creates predictability.

## Defaults and constraints

Reference files provide design defaults to adapt to the product and platform. Accessibility requirements, including reduced-motion behavior, still apply; they are not optional aesthetic preferences.

Preserve factual accuracy, supplied formulas and units, required content, and explicit task constraints. If these conflict or appear incorrect, resolve the issue with the user rather than silently changing them.

For design tradeoffs, prefer this order. Depart from it when a concrete benefit justifies the change within the task's constraints:
1. The project's stack, conventions, and established design system.
2. Clarity of the user's primary task and the evidence that supports it.
3. The chosen direction and visual system.
4. A structure that serves the task and content, whether familiar or distinctive.
5. Motion and detail refinement.

## Scale to scope
- Feature within an established surface: inherit its visual system and resolve only the affected structure, states, and interactions unless the request changes the broader direction.
- Small change: edit the affected component or state within the existing design system.
- Preserve relevant accessibility and interaction behavior.
- A small edit needs no design document, mockup, direction statement, or micro-polish note.
- Use only references needed for the affected behavior.
- Cut taglines, helper text, and secondary labels that repeat the heading or control. Keep text that answers a question the layout cannot answer. `references/clarify.md` owns interface copy.


## Reference index
Read a reference only when its condition applies:

- `references/full-design-workflow.md` — end-to-end workflow. Read for a new product or page, or a requested full redesign, where no existing surface sets the structure. Skip it for a feature inside an established surface.
- `references/design-direction.md` — personality, color foundation, typeface categories, and the Editorial minimalism recipe. Read to choose a new visual direction or rebrand.
- `references/generic-patterns.md` — built-result floor and generic template patterns to avoid by default. Read before building a new page or visual direction, and when a critique checks for generic design.
- `references/layout.md` — structural baseline and adaptation. Read to establish, repair, or refine layout.
- `references/page-composition.md` — page hierarchy, evidence, and composition exploration. Read for full-page structure or unresolved hierarchy problems.
- `references/data-and-evidence.md` — data accuracy, mock-data labels, tables, charts, calculators, and stat displays. Read for data-heavy surfaces or placeholder content.
- `references/craft-foundations.md` — spacing scale, padding, radius, depth, and surface treatment. Read to set or change those values.
- `references/typeset.md` — typography baseline, numeric text, and font behavior. Read to establish or refine text hierarchy, readability, or font delivery.
- `references/components-icons.md` — control treatment, icons, hit areas, and Editorial minimalism components. Read to design or restyle controls or icons.
- `references/animate.md` — motion baseline, gesture and spring behavior, runtime choices, and performance constraints. Read to create or revise motion, including drag, swipe, and gesture release.
- `references/interaction-visual-clarity.md` — optional motion recipes, contrast roles, color roles, navigation context, and visual anti-patterns. Read to choose a motion recipe or to check a design against the anti-patterns.
- `references/animation-vocabulary.md` — motion glossary. Read when the user describes motion loosely or asks what an effect is called.
- `references/overdrive.md` — technically ambitious web techniques such as View Transitions, scroll-driven animation, WebGL, and workers. Read only when the user asks for an ambitious effect or the brief needs one.
- `references/accessibility.md` — control patterns, focus, forms, reduced motion, contrast, and touch targets. Read when the task affects these behaviors.
- `references/clarify.md` — interface copy. Read to write or revise labels, form text, errors, helper text, or empty, loading, and success states.
- `references/critique.md` — inspection of the actual output across web, native, and terminal interfaces. Read for a design critique or visual verification. Other references use it as their verification step.
- `references/redesign.md` — mode detection, audit, preservation rules, and modernisation levers. Read to redesign an existing site or page.
- `references/bolder.md` — optional recipe for stronger emphasis. Read when the user asks for a bolder result or emphasis is weak.
- `references/quieter.md` — optional recipe for less visual intensity. Read when the user asks for a calmer result or elements compete.
- `references/delight.md` — product-specific personality. Read when the user asks for personality, or to design first-use, completion, waiting, or recovery moments.
- `references/optimize.md` — web performance diagnosis and improvement. Read to investigate or improve interface performance.
- `references/polish.md` — final refinement. Read for a requested polish pass on an existing interface.
- `references/html-design-mockups.md` — constraints for self-contained HTML mockups. Read when the deliverable is a standalone HTML mockup or an option comparison.

## Finish

When the brief leaves a design choice open, take the option that the brief and product evidence best support, and report it as an assumption. Ask first only when a wrong choice would waste substantial work or change something outside the requested scope.

Report in proportion to the change. A small edit needs one or two lines. For larger work, report:

- what changed, with file paths;
- assumptions you made;
- open decisions, each with your recommendation;
- checks you could not perform.

## Generated design reference images

When visual direction remains unresolved, an available image-generation tool can help explore ideas. Use it when it will be worthwhile. Send mock data to prevent data leakage. Generate images for the sections or screens needed to evaluate the choice, and label them accordingly. Keep palette, typography, and surface treatment consistent within each option. Follow the layout baseline; treat generated images as visual references, not proof of interaction behavior or accessibility.

use image-generation tool or `higgsfield` via `mcp-cli`

## Design references
you can get reference images of other apps if needed using `mobbin` via `mcp-cli`
