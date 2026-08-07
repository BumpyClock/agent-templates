# Data and Evidence

Read when: designing tables, stat/KPI displays, comparisons, charts-in-layout, calculators, or any data-heavy or report-like surface. Where a dedicated dataviz skill is available it owns chart internals (chart types, palettes, axes); this file covers how evidence sits in the layout and stays honest.

## Never Invent Data
Placeholder-content rules live in `anti-slop-tells.md`. For supplied data: preserve facts, units, periods, formulas, and qualifiers exactly. Distinguish observation, derivation, projection, and recommendation. Omit the unknown or label it honestly — never fabricate certainty, urgency, sources, or precision.

## Choose Geometry Before Components
Map the data's meaning to a visual variable before reaching for a component:
- Magnitude or rank → position or length on a common scale.
- Change over time → horizontal order, aligned position.
- Composition of a whole → proportion.
- Threshold or range → distance from a boundary.
- Process or dependency → connection and sequence.
- Qualitative alternatives → aligned rows or deliberately contrasted columns.

Tables for precise lookup; prose for a single conclusion; charts only when the relationship is faster to see than to read. Don't default to bars because numbers exist.

## Honest Encoding
- Zero baseline for length encodings; a clearly labeled range or delta view when the delta is the story.
- Never exaggerate small differences with cropped bars, or bury them in near-identical totals — show the exact delta on the same basis.
- Every peer bar shares one scale and its length encodes its value; otherwise use aligned text. A bar track is never a divider or ornament.
- Prefer direct labels over legends; reserve a clear lane so nothing crosses a label.
- Captions state what to notice and what the data does not establish.
- The decisive series or exception gets the strongest emphasis in both themes; support recedes without becoming illegible.

## Tables Are Evidence
- Semantic `<table>` with caption, head, body. Tables own the full evidence width of their section by default — never strand one in a narrow track beside prose to fill a split. Introduction above the table, not beside it.
- Header alignment matches its column's cells: text left, numbers right — including totals and placeholders. Never center a header over right-aligned values.
- Consistent units and precision across peers; no fake precision.
- Reorder columns around the lookup task before shrinking, wrapping, or truncating anything.
- Compact density only for genuinely dense lookup. Highlight a row only when the data supports the emphasis.
- Tabular numerals for aligned numeric columns (`components-typography-icons.md`).

## Stat and KPI Displays
- One evidence home per claim — don't repeat the same number as hero stat, chart annotation, and summary card at equal weight.
- Peers share role, size, weight, and numeric treatment; never resize one stat because its string is longer or its value larger.
- A row of interchangeable metric boxes is a default, not a design: if one relationship matters most, compose it; if the metrics are true peers, keep them visually equal and few.

## Calculators and Interactive Tools
Interaction is evidence, not decoration — a tool earns its place by letting users test the assumptions that change the outcome.
- One canonical state model: variables, formulas, units, ranges, increments, defaults, display precision. One control owns each variable; fixed parameters are not controls.
- Pre-render the default result. Update dependent outputs atomically from full-precision state, then format for display.
- Preserve invalid entries and the last valid result — never silently clamp, reset, or default.
- If using the tool is the primary job, it leads the layout: don't precede it with a static recap of the same answer or bury it under orientation copy.
- Native controls, visible labels, clear units, visible focus, one concise live status (a11y contract: `accessibility.md`).
