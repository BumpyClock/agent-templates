# Design It Twice

When the user wants to explore alternative interfaces for a chosen deepening candidate, compare viable designs against the task's constraints. Based on "Design It Twice" (Ousterhout): the first idea need not be the best.

Uses the vocabulary in [SKILL.md](SKILL.md) — **module**, **interface**, **seam**, **adapter**, **leverage**.

## Process

### 1. Frame the problem space

Establish the problem space for the chosen candidate:

- The constraints any new interface would need to satisfy
- The dependencies it would rely on, and which category they fall into (see [DEEPENING.md](DEEPENING.md))
- The criteria that would distinguish a better interface

Use a sketch when it makes a material constraint easier to assess.

### 2. Develop useful alternatives

Develop alternatives directly when the evidence fits one context. Delegate independent, substantial design questions only when separate context or expertise is expected to outweigh coordination cost.
Choose the number of alternatives from useful trade-offs, not an agent or variant quota.

Consider distinct constraints only when they serve the task:

- Minimize what callers need to know while preserving the required behavior.
- Support demonstrated variation without exposing internal details.
- Make the most common caller's use case straightforward.
- Place ports and adapters where cross-seam contracts justify them.

For delegated work, provide a bounded technical brief with owned paths, coupling details, constraints, and a completion condition. Reuse relevant project vocabulary and the terms in [SKILL.md](SKILL.md).

Each design states:

1. Interface (types, methods, params — plus invariants, ordering, error modes)
2. Usage example showing how callers use it
3. What the implementation hides behind the seam
4. Dependency strategy and adapters (see [DEEPENING.md](DEEPENING.md))
5. Trade-offs — where leverage is high, where it's thin

### 3. Present and compare

Compare the designs by **depth** (leverage at the interface), **locality** (where change concentrates), and **seam placement**.

Recommend the strongest design and explain why; combine elements only when the hybrid satisfies the same constraints.
Stop exploring when the evidence supports a choice or identifies a product preference that requires the user.
