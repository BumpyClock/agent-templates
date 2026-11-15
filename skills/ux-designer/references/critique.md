# Critique the Actual Output

Use this reference for a requested design critique or visual verification of an implemented interface.
For an explicit comprehensive critique or structured usability assessment, read [Critique Rubric](critique-rubric.md).
Routine verification of an affected component does not require the detailed rubric.

## Access the Product

Run the project through its normal workflow. Open the relevant screen, state, or flow in the actual product.
Choose the right tool that provides the clearest evidence for the target platform.

- For web interfaces, use a browser and inspect the rendered page.
- For native apps, use the app on a device, simulator, or desktop.
- For terminal interfaces, use an interactive terminal and inspect its output and controls.
- For static visual details, capture and inspect screenshots at relevant sizes.
- For motion or transient states, record video and inspect relevant frames or use sequential captures.

Use only the methods needed to assess the requested work. No particular browser, detector, capture tool, or agent count is required.
If execution is unavailable, use supplied captures or other accessible output. State what you could not verify.
Source inspection can explain a defect, but it cannot prove the appearance or behavior of the actual product.
use `6.1-terra-high` via `codex` for computer-use where necessary.

## Assess the Experience

Exercise the primary user task and the states affected by the work. Inspect relevant golden path, error, empty, focus, and recovery states.
Match the depth of assessment to the scope and risk of the change.
Non-exhaustive list to start from:
- Does the experience match the use case?
- Can we simplify? is there information that is currently present that should not be here?
  - Should it be on this screen? 
    - if so , where can it be consolidated under so that it is discoverable.
    - If not, is it implicit info? should it exist elsewhere in the experience? If the answer is yes, recommend removal and/or destination if it already does not exist.
- Assess hierarchy, readability, composition, and fit with the product context.
- Information density:
  - Is the information presented on the screen required and necessary.
  - Do we need to show this information, is some of it inferred by the product state. Eg: a connected badge is unnecessary when the user implictly understands that product only works when connected to the server.
- Check whether controls communicate their purpose, state, and result.
- Check interaction continuity and feedback across transitions, not just individual frames.
- Apply [Accessibility](accessibility.md) to relevant input methods, focus behavior, contrast, and reduced motion.
- Use [Layout](layout.md) for structural assessment, including its shared page-hierarchy guidance.
  - Think about:
    - Spacing
    - containers
    - typography
    - use of color
- Visual polish: 
  - Are there visual bugs or nits?
  - Are we deviating from the existing design system and design tokens? 
  - Are there things that you can derive from the content that would enhance this experience? Consider if that would be net positive to the experience or net negative. 
- Animations:
  - Are we using animations where necessary? read [Animate](animate.md) and [Animation vocabulary](animation-vocabulary.md)
- Any signs of AI slop design? must kill. 

Distinguish observed defects from aesthetic preferences and unverified concerns. Base each finding on a specific element, state, or interaction.
Do not infer user frustration or abandonment without evidence. Describe the observed obstacle instead.

## Complete the Task

For a review-only request, report findings without changes to the product.
For an implementation request, fix material defects within the requested scope and inspect the affected output again.
Repeat checks only after changes, failures, or unresolved concerns justify them.

Do not claim interaction, accessibility, or motion correctness from a static screenshot alone.
Stop temporary processes that you started solely for inspection, unless the user asks to keep them active.

## Report the Findings

Report the inspected target, relevant states, material findings, and verification limits. Order findings by user impact, not rubric order.
Include strengths or minor observations only when they help the user decide what to preserve or change.
Do not impose counts for findings, strengths, personas, or questions.

For each finding, identify the affected element, observed evidence, user impact, and concrete correction.
Include screenshots or frame references when they clarify a finding. Omit unsupported claims and empty report sections.
For animations show the relevant part of a contact sheet that traces the animation frame by frame.

Ask a question only when an unresolved choice about intent, priority, scope, or constraints materially changes the next action.

Recommend corrections within the requested scope. Name a command only when it exists and directly supports the correction.
