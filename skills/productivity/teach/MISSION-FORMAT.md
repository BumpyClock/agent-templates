# MISSION.md Format

`MISSION.md` lives at the workspace root. It captures the _reason_ the user is learning this topic. Every teaching decision — what to teach next, which resources to surface, which exercises to design — should trace back to this document.

## Template

```md
# Mission: {Topic}

## Why
{1-3 sentences. The user's stated learning goal and its real-world purpose when known. If the purpose is unknown and does not affect the next lesson, record the stated goal rather than inventing a rationale.}

## Success looks like
- {A specific, observable thing the user will be able to do}
- {Another specific thing}
- {…}

## Constraints
- {Time, budget, prior commitments, learning preferences, anything that bounds the approach}

## Out of scope
- {Adjacent topics the user explicitly does not want to chase right now — protects the zone of proximal development}
```

## Rules

- **Keep the mission coherent.** Separate unrelated courses when needed rather than silently replacing an established course's goal.
- **Concrete over abstract.** "Run a half marathon by October" beats "get fitter." "Ship a Rust CLI to my team" beats "learn Rust."
- **Clarify when it matters.** Ask about missing context only when it changes the next lesson or course scope. A clear topic-level goal is sufficient to begin.
- **Follow the user's goal.** Update the mission when the user changes that goal. Ask before inferring a different mission on their behalf.
- **Keep it short.** If `MISSION.md` runs past a screen, it has stopped being a compass and started being a plan.
