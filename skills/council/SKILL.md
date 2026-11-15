---
name: council
description: Trigger this if the user says 'council'.
---

# Council

Before an audit, address outstanding PR comments, fix known issues, and run
relevant checks. Give council the updated implementation; do not defer known
fixes until reviews return. If the user wants to discard the implementation
and explore new ideas, skip fixes to code being replaced.

Bring in three delegates to help with the user's request, usually for review
or feedback. Use one strong model from each of three different providers, at
high reasoning effort. If the user's instructions name council members, use
those. Otherwise pick the latest flagship model from each provider, for
example opus (claude), 6.1-sol (codex), and muse-wonder-full-1.0 (muse), Gemini Pro (antigravity).

In T3 Code, use `orchestrator_capabilities` to resolve the models, then
`delegate_task` to start one delegate per model in parallel. Elsewhere, use
the harness's subagent tools or cli's for these providers directly. If you cannot reach three providers, or a named member is unavailable, report it instead of substituting.

- Give each delegate the request and relevant context. For review or feedback, keep their work read-only. Collect their responses and summarize the useful findings, disagreements, and recommended next steps.
  - For a code review, ask each delegate for a score out of 10.
  - Count each full review pass as one round.
  - For a ux review invoke the `ux-designer` skill and read it's critique guidance.
  - A fresh review after fixes starts a new round. 
  - For consistency each round give delegates the same rubric to score against. 
  - When you have the results from all the delegates, check their findings against the code and decide what to fix and what is incorrect , invalid expansion of scope, or an unnecessary nitpick. Do not edit files while a delegate is still reviewing the same checkout.
- Summarize scores after each round
- If a delegate gives no score, write `no score`. Do not invent one.
- If the PR is open, edit the description. Do not post a comment for this.
- If there is no PR, put the same results in the final reply only.
- If you agree with their recommendations, make the changes and request a fresh
review after. Continue this process until all delegates are satisfied with the
outcome or a maximum of 5 rounds. In your last response show the scores for each round.
- Do not let repeated reviews result in scope creep. It is your job to fight to
keep scope limited.

- If the work ends in a pull request, put the results in the PR description.
Put this section before the model and harness line at the end in a <details> <summary> </summary> </details> block:
```markdown
<details>
  <summary>Council review</summary>
  <h2>Rounds:2</h2>
| Delegate | Round 1 | Round 2 |
| --- | --- | --- |
| Claude Opus | 7/10 | 9/10 |
| GPT Sol | 8/10 | 10/10 |
| Gemini Pro | 7/10 | 9/10 |
...
</details>

```
