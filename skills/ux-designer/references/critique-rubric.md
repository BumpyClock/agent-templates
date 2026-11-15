This is a check on the built result, not an intention. Run them together in each batched look at the render, not as separate screenshot trips; the checks share one render or contact sheet for critiquing animations.

Complete the assessment with evidence, concrete effects on the task, and explicit verification limits.

## The floor

- **Contrast:** body and placeholder text ≥4.5:1, large text ≥3:1. On colored surfaces tint secondary text from that hue or the foreground; never gray. 
- **Depth:** shadows carry an offset and a soft blur. A zero-offset colored halo is decoration. 
- **Spacing:** tight groups, generous separation, more space above a heading than below it. Read the computed values. 
- **Type:** body measure 65–75ch, display max 6rem, tracking floor -0.04em, balanced headings, obvious scale and weight steps. Run the real copy at every breakpoint and fix what overflows. 
- **Motion:** one authored moment, not scattered effects and not one identical entrance on every section. Exponential ease-out from an already-visible default. Reach past transform and opacity: blur, backdrop-filter, clip-path, mask, and shadow belong to the palette when they stay smooth. 
- **States:** hover, disabled, loading, error, empty. Plus real content, working controls, responsive composition, keyboard focus. 
- **Browser surfaces:** the parts you did not draw still carry the design. Text selection, the caret, custom scrollbars, focus rings, underline offset, and the numerals in tabular data all ship with browser defaults that belong to no design system. Theme them from the palette. This is the cheapest signal that a page was built rather than assembled, and the one models skip most reliably. 
- **Copy:** the product's own language. Controls name their action; errors name the problem and the recovery. 
- **Coverage:** every brief requirement present and findable within seconds. 

## Refuse

These are the category's defaults, not bans: the brief's own words can earn any of them. Reaching for one when the axis is free means you were not deciding; recognizing that means rewriting the element, not softening it.

Page scaffolds:

- Same-size cards of icon plus heading plus text as the page structure. Cards are the lazy container; nested cards are always wrong. 
- The hero-metric template: big number, small label, supporting stats, accent. 
- A kicker or eyebrow above a heading. This one is a ban, not a default: no brief earns it back. The heading carries its own weight; delete the label and let the heading speak. 
- Section numbers (01 / 02 / 03) unless the sequence itself carries information the reader needs. 
- A modal for a task that needs neither interruption nor protected focus. 
- Fade in animation on every scroll. 

Surface habits:

- Gradient text. Emphasis comes from weight or size. 
- Glass and blur as decoration rather than as a specific effect. 
- A colored `border-left` or `border-right` above 1px on cards, list items, callouts, or alerts. 
- Hard offset shadows (`box-shadow: 4px 4px 0`) outside a world that is actually neobrutalist. The zero-blur block shadow is a costume, not a depth system; a world that did not choose it never earns it as a default. 
- Sparklines, progress rings, and soft-shadowed rounded rectangles standing in for content. 
- Monospace as a costume for "technical" rather than for code, data, or measurement. 
- A system display face (Impact, Arial Black, the platform sans) as the display voice of an own-world page. Source and self-host a face whose character matches the approved lettering; the closest installed font is a failure, not a fallback. 
- Unicode glyphs or emoji standing in for an icon system. Icons are drawn, from a real library or authored SVG, in one consistent stroke and weight. <!-- rule:skill-ban-glyph-icons -->
- Geometric masks standing in for organic contours. A circle, polygon, or radial-gradient cutout approximating a photographic subject's edge is the cheap version of the effect and reads worse than omitting it. Derive an alpha matte from the actual image, or produce a cut-out asset. 
- Light or dark picked by category. Pick it from the use scene: who, where, under what ambient light. 

-- 

## Core criteria

**Design specificity:** Is the composition, interaction, and visual language grounded in this product, or could an unrelated product use it unchanged? Make this judgment before seeing detector output.

**Holistic design:** hierarchy, IA, emotional fit, discoverability, composition, typography, color, accessibility, states, copy, and edge cases. read relevant files from `references/`

**Cognitive load:** consult the Cognitive Load Assessment in critique-rubric.md; report checklist failures and decision points with >4 visible options.

**Emotional journey:** peak-end rule, emotional valleys, reassurance at high-stakes moments.

**Nielsen heuristics:** consult the Heuristics Scoring Guide in critique-rubric.md; score all 10 heuristics 0-4, marking any heuristic the mode-applicability rule allows as n/a instead of forcing a number.


## Cognitive load

Classify each problem as intrinsic (structure it), extraneous (eliminate it), or germane (support it).

**Checklist**: 8 items, count the failures.
1. Single focus: primary task free of competing elements
2. Chunking: ≤4 items per group
3. Grouping: related items visually grouped
4. Visual hierarchy: the most important thing is obvious at once
5. One thing at a time: one decision before the next
6. Minimal choices: ≤4 visible options per decision point
7. Working memory: nothing to remember from a previous screen
8. Progressive disclosure: complexity appears only when needed

Failures: 0–1 = low, 2–3 = moderate (address soon), 4+ = high (critical fix).

**Working memory rule** (Cowan, 2001): count the options, actions, or facts in play at each decision point. ≤4 is fine; 5–7 needs grouping or progressive disclosure; 8+ is overloaded.

Limits by surface:
- Action buttons: 1 primary, 1–2 secondary, the rest in a menu
- Navigation: ≤5 top-level items
- Docs sidebars: ≤4 siblings per level
- Long-form articles: one reading path, related links in one block at the end
- Gallery and portfolio indexes: one decision per screen (which piece to open)

**Named violations** (use these names in findings): Wall of Options, Memory Bridge, Hidden Navigation, Jargon Barrier, Visual Noise Floor, Inconsistent Pattern, Multi-Task Demand, Context Switch.

## Nielsen's heuristic scores
Score each of Nielsen's 10 heuristics 0–4:
1. Visibility of system status
2. Match between system and real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognize, diagnose, and recover from errors
10. Help and documentation

Scale: 0 = absent or broken; 1 = rare; 2 = partial (main flows covered, major gaps); 3 = good, minor gaps; 4 = excellent throughout. A 4 means excellent, not "good enough."

## Optional Structured Scores

Use numeric scores only when the user requests a structured assessment. Otherwise, report evidence-backed findings without scores.
Score each assessed heuristic independently on the scale below. A score describes the inspected task and states, not the entire product.

| Score | Meaning |
|---|---|
| 0 | Observed defects prevent the assessed task. |
| 1 | Observed defects create major task difficulty. |
| 2 | Observed defects create material friction, but the task remains possible. |
| 3 | The assessed task works with minor friction. |
| 4 | No material issue was observed within the assessed scope. |

- Mark a heuristic `n/a` only when it does not apply to the assessed task, and explain why.
- Mark relevant behavior `unverified` when the evidence is insufficient, and state what remains unknown.
- For partial evidence, limit the score to inspected states and list unverified states separately.
- Support each score with observations rather than the presence or absence of example features.
- Omit aggregate scores unless the user requests them.
- For a requested total, exclude `n/a` and `unverified` heuristics from both the total and maximum.
- Report all exclusions and partial coverage beside any requested total.
- Compare scores only when task, scope, evidence, and criteria are comparable.
- Do not convert scores into release approval, redesign mandates, or claims of complete usability.

No score cancels an observed defect. Report consequential defects individually, regardless of other scores.
