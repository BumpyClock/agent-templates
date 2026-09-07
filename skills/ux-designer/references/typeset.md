# Typography Baseline

This reference owns typography defaults for new designs and refinements. Preserve established project tokens, font families, platform conventions, and user settings.

Apply aesthetic recipes only when they suit the chosen direction. Preserve readability and accessibility across all treatments.

---

## Visitor mode

- **Persuade + Experience:** display type may carry the voice. Use decisive contrast and responsive scale when the composition benefits.
- **Operate + Read:** stability, scanability, and measure come first. A single well-tuned family and fixed role scale are often right.
- **Native:** follow platform conventions for text scaling and accessibility behavior.

Preserve confirmed families and improve their use unless the user requests a new identity.

## Assess the Affected Typography

Select the questions relevant to the change or an unresolved concern. Inspect the affected output through [Critique](critique.md).

- **Authority and fit:** Which faces, weights, and roles are established? Do they fit the product and selected world, or are they unexamined defaults? Is every family necessary?
- **Hierarchy:** Can heading, body, label, metadata, and data roles be distinguished at a glance? Are adjacent sizes or weights too close to carry different jobs?
- **Scale and consistency:** Is there a deliberate role scale, or a collection of arbitrary values? Do repeated roles stay identical across screens and states?
- **Reading:** Does body copy stay within a comfortable 45–75 character measure? Are line height, paragraph rhythm, contrast, and tracking tuned to the actual face, width, language, and surface?
- **Stress:** What happens with long headings, localization expansion, zoom, narrow containers, missing weights, and font fallback?
- **Delivery:** Are only used assets loaded? Do fallback metrics, loading strategy, and variable-font settings avoid invisible text and disruptive reflow?

When relevant to the change, inspect dynamic or arbitrary font values.

## Set the system

Before a typography system change, identify the relevant constraints:

- the roles the interface needs;
- the intended contrast between those roles;
- the reading measure and density;
- which existing faces and weights are authoritative;
- any performance, localization, or accessibility constraints.

Use the fewest roles and families that make the hierarchy unmistakable. Combine size, weight, space, and tone deliberately instead of asking size alone to do all the work. Role names and tokens should describe purpose rather than values.

## Apply

- Keep body copy comfortably readable and zoomable. Without an established scale, use `1rem` as the ordinary web body baseline. For dense roles, follow project tokens and platform conventions.
- Use 45–75ch as an initial prose measure. Adjust the measure for the content, language, and rendered result. For wider lines, consider more line height.
- For light text on dark surfaces, adjust line height, tracking, or weight only when the rendered text needs compensation.
- Tune line height to the face, width, language, and contrast, not a universal ratio.
- Keep repeated roles consistent across screens and states. Preserve size, weight, and numeric treatment for equivalent peers. Before you reduce type size, adjust layout or revise copy within the authorized scope.
- Load only used font assets and weights. Provide metric-compatible fallbacks and avoid blocking text.
- Let marketing display type respond to available space when useful; keep dense product and reading surfaces spatially predictable.
- Preserve browser zoom, user font settings, Dynamic Type, and platform text scaling.
- Use paragraph spacing or first-line indentation as the primary paragraph rhythm; combining both usually double-marks the boundary.

Do not make type decorative at the expense of comprehension, or introduce a second family without a clear role it alone can perform.

## Numeric Text

- Keep the established text font for ordinary numbers.
- For numeric columns, counters, timers, prices, or scores, use tabular numerals when alignment or stable digit width helps.
- Use monospace for code, IDs, or other text when fixed character widths serve the task.
- For phone numbers, ZIP codes, or version strings, use tabular numerals only when alignment helps.

## Text Wrap and Font Rasterization

- For headings and short blocks, consider balanced text wrap where even line lengths help.
- For short or medium paragraphs, consider pretty text wrap where it improves line breaks.
- Preserve code blocks and preformatted text. For long copy, use special text wrap only when the rendered result shows a benefit.
- In typography specifications, state the intended line breaks and text wrap behavior where these affect comprehension.
- If font rasterization needs adjustment, compare supported settings at the application root rather than per component.
- Preserve platform rasterization defaults unless the rendered result supports a change.

## Verify

Select the criteria affected by the change. Follow [Critique](critique.md) for output evidence, repeat checks, and verification limits.

- Primary, secondary, body, and metadata roles are recognizable without reading the copy.
- Long text remains comfortable across relevant widths and languages.
- The typography belongs to the product and its established world.
- Loading does not create disruptive reflow or invisible text.
- Zoom, text scaling, focus, contrast, and reduced viewport paths remain usable.
