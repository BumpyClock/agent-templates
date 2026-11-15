# Redesign Protocol

Read when: redesigning an existing site or page (not a greenfield build).

Detect the mode first, because a wrong mode produces a wrong redesign. Audit before you change anything, then apply the smallest set of levers that satisfies the brief. This file owns mode and preservation. [Full design workflow](full-design-workflow.md) owns the build sequence for a full redesign.

## Detect the mode (first action)
- **Preserve** — modernize within the existing brand. Extract brand tokens and retain established interaction patterns. Use levers 1-4. Choose this mode when IA, content, and discovery paths are sound and the brief does not require structural change.
- **Overhaul** — replace the visual language and repair structure while preserving content. Keep the information density appropriate to existing user tasks. Choose this mode when the debt is structural: broken IA, no design system, or broken mobile.
- **Rebrand** — replace the visual language while preserving product truth, required functionality, confirmed content, and protected downstream contracts unless the user explicitly changes them. Choose this mode when the brand itself is changing.

If the brief does not state the mode, choose Preserve, the most reversible mode. Do the audit, and state the assumption at the top of the report with what would change under the other modes.

## Audit before touching
Establish the current state before you propose changes. Record it in the report. Do not create an audit file unless the user asks:
- **Brand tokens** — primary/accent colors, type stack, logo treatment, radii. Extract these *before* applying any palette/type default; a brand that is already purple stays purple.
- **Information architecture** — page tree, primary nav, conversion paths.
- **Content blocks** — what exists, what's doing work, what's filler.
- **Keep vs retire** — preserve useful signature interactions, recognizable identity, and copy voice. Identify broken layouts, dead links, and performance defects.
- **Existing visual behavior** — identify layout variation, motion purpose, and information density before changes.
- **SEO baseline for indexable web surfaces** — ranking pages when ranking data is available, meta titles, structured data, and social cards.

## What never changes silently
Keep these unchanged unless the brief explicitly changes them. Each one can break SEO, analytics, autofill, recognition, or muscle memory. If a change seems needed, keep the current value and propose the change in the report:
- URL structure / route slugs, anchor IDs
- Primary nav labels
- Form field names or order
- Brand logo or wordmark
- Existing legal / consent / cookie copy
- Identifiers that downstream tracking depends on

Do not regress existing accessibility behavior: focus states, alt text, keyboard navigation, and contrast.

## Modernisation levers (priority order)
Prefer lower-risk levers first, and skip levers the brief does not need. Stop when the brief is satisfied. Earlier levers usually give more visual lift per unit of risk.
1. **Typography refresh.**
2. **Spacing & rhythm** — section padding, vertical rhythm.
3. **Color recalibration** — recalibrate saturation, unify neutrals, keep the brand accent.
4. **Motion layer** — refine feedback and state transitions where they help the user, per [Animate](animate.md) and [Reduced Motion](accessibility.md#reduced-motion).
5. **Hero & key-section recomposition** — restructure top-of-funnel.
6. **Full block replacement** — only when a block is unsalvageable.

## Verify and report
Inspect the result through [Critique](critique.md). Report the mode, the preserved contracts, the levers applied, and any proposed change to the protected list.
