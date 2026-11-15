# HTML design mockups

When an HTML mockup is the chosen deliverable, use these constraints:

- Deliver one HTML file that opens by double-click, without a build step or server. Inline the CSS and JavaScript. Load an external resource only when the design depends on it, such as the product's web font, and make sure the page still renders when that resource fails to load.
- When comparing options, label them and keep them in one file for comparison.
- Use the specified spacing, type scale, color tokens, and radii. When iterating on an existing design, reproduce the affected surface faithfully enough to judge the proposed changes.
- Where practical, show key states and transitions interactively, including hover, empty, and error states, and cover each target breakpoint.
- Use content the user supplied for the mockup. Otherwise, use mock data and label it as specified in `data-and-evidence.md`.
- Keep the visual system consistent across sections and screens within each design option.
- Use plain HTML, CSS, and JavaScript so the file opens without tooling. Use only the JavaScript needed to demonstrate the selected flows and states.
- Report the file path.
