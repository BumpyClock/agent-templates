---
name: ux-designer
description: "Design or implement interfaces, layouts, and interactions. Use for UI work, including animation changes. Motion audits and roadmaps use improve-animations."
context: fork
---

## Core idea

> "When we align the interface to the way we think and move, something magical happens — it stops feeling like a computer and starts feeling like a seamless extension of us."

A fluid interface responds immediately and supports continuous, interruptible motion where it helps users understand and control the interaction.

Design the end-to-end experience for its context. A developer tool may need precision and density; a collaborative product may benefit from warmth and space. Base choices on the project's users, subject matter, and real content.

For a new visual direction or requested rebrand, choose a distinctive palette, typography, and layout that fit the brief. Take aesthetic risks when justified. Within an established product, preserve its identity and familiar interactions unless the request calls for changing them.

## Design foundations: the eight principles

(*Principles of Great Design*, WWDC 2026). Use these as the names you reason with:

1. **Purpose.** Make with intention; decide what *not* to build. Every feature asks for the user's time, attention, and trust — spend that budget only where it pays off. Users don't need to understand the underlying tech or logic, they need to get their tasks done.
2. **Agency.** Keep people in control: offer choices, don't force a single path. Back it with forgiveness — easy undo for slips, a confirmation dialog only for genuinely destructive, irreversible actions (use sparingly; overusing it trains people to click through).
3. **Responsibility.** Act in the user's interest. Privacy: ask at the right moment, only for what's needed, transparently. Safety: anticipate misuse and harm — especially with AI (an allergy-aware recipe app must not suggest a harmful ingredient). Add previews, confirmations, disclaimers; cut a feature whose risk outweighs its value.
4. **Familiarity.** Build on what people already know. Use metaphors that are neither too literal nor too abstract (a trash can means delete), and honor their physics. Be consistent: things that look the same must behave the same and live in the same place (close is always top-left on macOS) so people can predict what happens next. Only break a familiar pattern if you can prove it's better — then test it, don't assume.
5. **Flexibility.** Design for different contexts, devices, and the full range of abilities. Adapt to the platform (iPhone = quick touch; desktop = deep workflows with precise pointer control) and to the situation. Design inclusively (age, language, expertise, accessibility). When no single layout fits everyone, let people personalize — rearrange controls, hide what they don't use.
6. **Simplicity — not minimalism.** Strip the unnecessary so the core purpose shines; burying everything in one place looks minimal but isn't simple. Be concise (plain language, no jargon, fewer steps) and clear (use hierarchy — order, spacing, contrast — so the most important thing is the most obvious). Every element earns its place; sometimes *adding* context simplifies (a video scrubber that shows time remaining). Show the common path first, advanced options one level deeper. Great design is about intentionality, start with a blank slate and only add elements that will be needed, cleaning up after is not the same as only adding what is necessary.
7. **Craft.** Uncompromising attention to detail builds trust. Beautiful typography, colors that adapt to light/dark, clear iconography, and responsive animations that give immediate, natural feedback. Nothing is random — every spacing, timing, and alignment value is a deliberate choice you can defend. Jittery scroll, misaligned icons, and layouts that break on rotation read as carelessness. Craft needs iteration and longevity — keep evolving the design as features and hardware change.
8. **Delight.** The result of getting the other seven right, not confetti tacked on top. Decide the emotion you want people to feel (calm, confident, excited) and reinforce it in every decision.

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
- Cut taglines, helper text and secondary labels. If a screen needs them to make sense, fix the layout.


## Reference index
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
- `references/clarify.md` — interface copy. Read to revise unclear labels, instructions, or state messages.
- `references/bolder.md` — optional recipe for stronger emphasis, as a refinement or an initial direction.
- `references/quieter.md` — optional recipe for less visual intensity, as a refinement or an initial direction.
- `references/delight.md` — product-specific personality to add expressive details or feedback.
- `references/optimize.md` — performance diagnosis and improvement. Read to investigate or improve interface performance.
- `references/polish.md` — final refinement. Read for a requested polish pass on an existing interface.
- `references/animation-vocabulary.md` — glossary for interpreting motion descriptions and naming effects.
- `references/full-design-workflow.md` — iterative end-to-end design workflow for new products, pages, screens, and full redesigns.
- `references/html-design-mockups.md` — constraints for self-contained HTML design mockups.

## Generated design reference images

When visual direction remains unresolved, an available image-generation tool can help explore ideas. Use it when it will be worthwhile. Send mock data to prevent data leakage. Generate images for the sections or screens needed to evaluate the choice, and label them accordingly. Keep palette, typography, and surface treatment consistent within each option. Follow the layout baseline; treat generated images as visual references, not proof of interaction behavior or accessibility.
