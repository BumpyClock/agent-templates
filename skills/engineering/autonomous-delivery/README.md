# Autonomous delivery skill

An adaptive orchestrator-worker pattern, not a fixed software-delivery pipeline.
A balanced outer agent uses session orchestration to delegate outcomes to direct
workers or local orchestrators. It periodically reflects on how the work is
organized and changes specialization, task boundaries, context, hierarchy, and
concurrency to improve **quality and throughput together**.

Use an intelligent, strong-reasoning orchestrator with faster but still capable
workers. Reserve the strongest suitable reasoning for critical design decisions,
hard bugs, high-risk review and unblocking; use efficient execution for bounded
work once the contract is clear. Respect user model preferences and evaluate the
total cost of useful results, including rework and handoffs.

Start with the organization the task needs. Grow, simplify, or reshape it as
evidence arrives. A small bug may need one agent; a cross-repository feature may
need several workstreams with different internal shapes. More agents are not the
goal, and fewer are not inherently better either.

## Install from this gist

This gist is a distribution package, not an automatic installation. It contains
`SKILL.md`, this README, and an MIT license; no executable installer or credentials.
Review the files before installing. The commands below require GitHub CLI (`gh`)
and Git.

For GitHub Copilot personal skills, clone this gist and copy the directory:

```sh
gh gist clone https://gist.github.com/EvanBoyle/8c1a97f682d92dab8c09d0e1ea73f4a0 autonomous-delivery &&
  mkdir -p "$HOME/.copilot/skills" &&
  mkdir "$HOME/.copilot/skills/autonomous-delivery" &&
  cp autonomous-delivery/SKILL.md autonomous-delivery/README.md autonomous-delivery/LICENSE \
    "$HOME/.copilot/skills/autonomous-delivery/"
```

Run this from a directory where `autonomous-delivery` does not already exist.
Creating the destination deliberately fails for an installed version; compare
and deliberately replace the three files when upgrading. The chained commands
do not overwrite an existing installed skill.

For a repository-scoped installation, place the folder at
`.github/skills/autonomous-delivery/` instead. For another Agent Skills client,
use that client's documented skill directory. The final path must include
`autonomous-delivery/SKILL.md`.

Reload your agent if it does not discover the skill automatically. Installing a
skill does not add session tools, provide models, start workers, or grant access.
Without session orchestration, apply the reasoning in a single agent; use
available bounded consultations only when useful. No particular orchestration
SDK, model pairing, cloud provider, or agent count is required.

## Use

Example prompt:

> Use autonomous-delivery for this cross-repository feature. Choose an
> orchestrator-worker structure appropriate to the codebases and adapt it as
> you learn. Periodically reconsider whether task boundaries, context, and
> specialization are improving both quality and throughput. Verify the user
> journey. Local edits and tests are authorized; ask before publishing or
> deploying.

Another example:

> Use autonomous-delivery to investigate these competing explanations. Organize
> independent evidence gathering where useful, then reassess the workflow after
> the first findings. Consolidate duplicate work and focus on what could change
> the conclusion. Return a supported recommendation, not an implementation.

Provide the desired outcome, important constraints, permitted external actions,
and any model or resource preferences. An outer coordinator can delegate to
local orchestrators, but all descendants remain within the shared scope and
budget. Broad autonomy is not permission for unrelated or irreversible work.

The skill includes examples for a small bug, a cross-repository feature,
uncertain research, a broad migration, and end-to-end code delivery. The earlier
implementation/research/qualification/release pipeline is now one illustration,
not the universal structure. The recurring loop is:

```text
Observe results and friction -> reflect on the organization
-> adapt -> compare quality and useful throughput -> retain or revise
```

Useful adaptations might prevent contract drift, remove a decision bottleneck,
introduce a temporary specialist, consolidate coupled writers, or improve
handoff context. Keep changes that produce better verified outcomes, not merely
more activity.

## Recurring work and recovery

The skill includes generalized instructions for inline session automation and
scheduled wakeups. Use these, when authorized, to keep recurring objectives going:
repository triage, performance-log review, failed-tool diagnostics, periodic UI
audits, supervision and recovery checks are examples, not mandatory tasks.

Same-session wakeups retain a continuing coordinator's context; fresh-session
scheduled jobs need explicit durable handoff state. Each cycle reconciles current
intent and ownership, processes bounded new evidence, takes authorized action,
verifies progress and updates its checkpoint. Use events for timely handoffs and
schedules as recovery backstops, not busy-waiting or duplicate-worker factories.

Example authorization:

> For the next four hours, use session automation to check this workstream every
> ten minutes. Triage new evidence, unblock existing owners and continue authorized
> local fixes and tests. Do not publish or deploy. Preserve the latest checkpoint
> after each cycle; no new work after the cutoff. Report material blockers rather
> than repeating unchanged status.

For an explicitly ongoing objective, a successful cycle is not a reason to stop
the schedule. For finite work, clear it when done or expired. Cadence, scope,
permissions, resource limits, overlap handling and stop conditions must be explicit;
installation or a request to explain this pattern does not start an automation.

## Format and sharing

Uses the open [Agent Skills specification](https://agentskills.io/specification).
GitHub documents personal and project skill paths in
[About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills).

This is generalized original methodology, not private application source or a
claim about another system's guarantees. An unlisted gist is accessible to anyone
with its link; do not add private logs, credentials, or confidential details.

License: MIT. Version: 2.1.0.
