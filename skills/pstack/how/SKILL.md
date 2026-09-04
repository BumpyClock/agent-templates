---
name: how
description: "Use for \"how does X work\", code walkthroughs before changing something, and placement / ownership / layering questions (\"where should this live\", \"which package owns this\", \"is this the right layer\"). Explains subsystem architecture, runtime flow, onboarding mental models. Can critique architecture."
---

# How

Explore the codebase to answer "how does X work?" questions. Produce clear architectural explanations at the level of a senior engineer onboarding onto a subsystem. Enough to build a working mental model, not annotated source code.

## Investigation contract

Treat an explanation or recommendation request as read-only.
Use relevant source, history, and documented decisions to support the answer.
Distinguish observed behavior, documented intent, and inferred rationale.
State unresolved uncertainty without a speculative code change.
Do not create a prototype, commit, or pull request unless the task authorizes it.

Two modes:

1. **Explain** (default). Explore the codebase and produce a clear explanation
2. **Critique.** Explain first, then assess architectural issues. Use independent reviewers when their separate perspectives justify the cost.

## Explain Mode

### Step 1. Understand the Question and Assess Complexity

Parse what the user is asking about:

- "How does the rate limiter work?", a subsystem
- "How do we handle billing for on-demand usage?", a feature flow
- "How is the auth service structured?", an architectural overview
- "Walk me through what happens when a user submits a form", a runtime trace

Identify the scope. If ambiguous, state your best-guess interpretation before exploring. Don't ask. Let the user redirect if you're off.

**Assess complexity to decide the approach:**

- **Simple** (a single module, a small utility, a narrow question like "how does function X work"): skip explorer agents; the explainer explores and explains in a single pass. Go to Step 2b.
- **Complex** (a subsystem spanning multiple files/services, a cross-cutting feature, a full architectural overview): use Step 2a only for independent research that warrants separate contexts. Otherwise use Step 2b.

Prefer direct inspection for a small scope or a single continuous call chain.

### Step 2a. Explore (complex questions only)

Choose independent research questions with explicit boundaries so explorers do not duplicate work. Example split for "how does the rate limiter work?":

- Explorer 1: data model and state management
- Explorer 2: request path and enforcement
- Explorer 3: configuration and metrics infrastructure

Choose the number of explorers from the independent questions and their context needs, not a fixed quota.

Spawn all explorers in a single message:

- `subagent_type`: `generalPurpose`
- `model`: your configured how-explorer model, or the harness default
- `readonly`: `true`

Each explorer gets the same base prompt from `references/explorer-prompt.md` plus a specific exploration angle naming its slice. Each explorer should:
- Start broad: Glob for relevant directories, Grep for key types/interfaces/class names
- Follow the thread: from an entry point, trace the call chain (callers, callees, data flow, type definitions)
- Read the actual code, don't guess from file names
- Stop when it can describe the full path from input to output (or trigger to effect) without hand-waving any step
- Note things that are surprising, non-obvious, or that a newcomer would get wrong

Each explorer returns structured findings: components found, flow traced, files read, anything non-obvious. Overlap between explorers is fine; the explainer reconciles.

Then proceed to Step 3.

### Step 2b. Direct Explain (simple questions)

Inspect the relevant source directly and answer the question.
Use only the output sections that help explain the result.
A narrow question does not need a delegated explainer or a complete architecture report.

Proceed to Step 4.

### Step 3. Synthesize (complex questions only)

Synthesize the findings after the independent research is complete.
Resolve contradictions against source evidence before the final answer.
Use a separate explainer only when the volume of findings justifies another context.
For that case, use `references/explainer-prompt.md` with the original question and bounded research results.

### Step 4. Present

Present the supported answer, relevant source locations, and unresolved limits.
For a decision request, give a recommendation with its tradeoffs.
Retain responsibility for the evidence even when an agent supplied it.

### Output Format

Follow this structure, adapted to the question. Not every section is needed for every question.

**Overview.** 1-2 paragraphs. What it is, what it does, why it exists. Enough to decide whether to keep reading.

**Key Concepts.** The important types, services, or abstractions. Brief definition of each. Not exhaustive, just the ones needed to understand the rest.

**How It Works.** The core of the explanation. Walk through the flow: what triggers it, what happens step by step, where data goes, the decision points. Prose, not pseudocode. Reference specific files and functions so the reader can go look, but don't dump code blocks unless a snippet is genuinely necessary.

**Where Things Live.** A brief map of the relevant files/directories. Not every file, just the ones needed to start working in this area.

**Gotchas.** Non-obvious or surprising things that would trip someone up. Historical context that explains why something looks weird. Known sharp edges.

## Critique Mode

Triggered when the user asks for architectural issues, problems, or improvements, not just understanding.

### Step 1. Explain First

Run the full explain flow above (Steps 1-4). You must understand the architecture before critiquing it.

### Step 2. Assess the architecture

Apply `references/critique-rubric.md` to the question and its evidence.
Use independent critics only when distinct perspectives or substantial separate context justify them.
Assess a small scope directly.
When critics are useful, choose their number from the questions rather than require a fixed panel.

For each critic:
- `subagent_type`: `generalPurpose`
- `model`: a distinct strong model per critic when available. The lead should escalate any critic when the architecture warrants deeper analysis.
- `readonly`: `true`

Read `references/critic-prompt.md` for the prompt template. Each critic gets:
1. The explanation from Step 1 (so they don't re-explore)
2. The relevant file paths (so they can read the actual code)
3. The architectural critique rubric from `references/critique-rubric.md`

### Step 3. Lead Judgment

Same framework as the interrogate skill. You're a pragmatic lead, not an aggregator.

Categorize findings:
- **Act on.** Architectural problems worth fixing now
- **Consider.** Real concerns, but the cost/benefit is unclear
- **Noted.** Valid observations, low priority
- **Dismissed.** Wrong, missing context, or style preference

Present the explanation first (from Step 1), then the critique verdict below it. The explanation should stand on its own; someone who just wants to understand the system shouldn't wade through critique.
