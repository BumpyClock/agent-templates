---
name: unslop
description: Edit substantial prose to remove AI-style filler and repetition. Use for explicit style review or prose revision.
---

# Unslop

Edit text to remove AI patterns and add human voice.

Use `AGENTS.md` for shared prose rules. Keep these additional edits within those rules.

## Process

1. Scan for the patterns below.
2. Rewrite. Preserve meaning, match intended tone.
3. Add soul (see next section).
4. Self-audit: "What makes this obviously AI generated?" Fix remaining tells.

## Adding soul

Removing patterns is half the job. Sterile, voiceless writing is just as obvious.

- **Have opinions.** React to facts instead of neutrally listing pros and cons.
- **Vary rhythm.** Vary sentence length within the applicable limits.
- **Acknowledge complexity.** "Impressive but also kind of unsettling" beats "impressive."
- **Use "I" when it fits.** First person isn't unprofessional.
- **Avoid mechanical symmetry.** Use a natural structure rather than identical sentence and paragraph shapes.

## Patterns to detect and fix

### Content

1. **Puffery.** "pivotal moment", "testament to", "evolving landscape", "setting the stage for", "indelible mark", "deeply rooted". Cut puffery, state what happened.
2. **Name-dropping.** Listing media outlets without context. Pick one, say what was said.
3. **Promotional language.** "nestled", "vibrant", "breathtaking", "groundbreaking", "renowned", "stunning", "must-visit". Use neutral descriptions.
4. **Vague attributions.** "Experts believe", "Industry reports suggest", "Some critics argue". Name the source or delete.
5. **Cutoff disclaimers.** "While specific details are limited..." Find sources or remove.
6. **Formulaic challenges.** "Despite challenges... continues to thrive." Replace with specific facts.

### Language

7. **"Not just X, but Y."** State the point directly instead.
8. **Rule of three.** Forcing ideas into groups of three. Use the natural number.
9. **False ranges.** "from X to Y" where X and Y aren't on a meaningful scale. List topics directly.

### Style

10. **Em dash overuse.** Avoid em dashes entirely. Use periods or commas only (no parentheses, no en dashes, no hyphen-as-dash substitutes). Em dashes are an AI tell, and reaching for parentheses instead just trades one tell for another. If a thought needs separation, end the sentence or use a comma.
11. **Colon overuse.** Colons are fine before a list or example. Not as mid-sentence connectors. "If you're coming from traditional automation: instead of registering event handlers, you describe conditions" adds nothing with the colon. Rewrite to let the point stand on its own without comparison framing. "Describing when the scheduler should fire works best as plain English." Same meaning, no crutch punctuation.
12. **Boldface overuse.** Don't bold every proper noun or acronym.
13. **Inline-header lists.** The tell is a bold label and colon that restates the line: "**Performance:** Performance improved...". Convert those to prose. A bold lead-in that ends in a period, names the item, and is followed by genuinely new detail ("**Schema in TypeScript.** Tables live in one file.") is fine, not a tell.
14. **Title case headings.** Use sentence case.
15. **Decorative emojis.** Remove from headings and bullets.
16. **Curly quotes.** Replace with straight quotes.
