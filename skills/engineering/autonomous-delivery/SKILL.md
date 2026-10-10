---
name: autonomous-delivery
description: "Adapt an orchestrator-worker system to deliver verified outcomes. Use for substantial implementation, cross-repository work, research, migrations, or other tasks that benefit from session orchestration. A balanced outer coordinator delegates to workers or local orchestrators, periodically reflecting on the workflow to improve specialization, context, quality, and throughput together."
compatibility: "Uses session orchestration and isolated workspaces when available. Without them, apply the same reasoning in one agent. Tools, models, access, and external actions remain subject to the host's capabilities and the user's authorization."
license: MIT
metadata:
  version: "2.1.0"
---

# Autonomous delivery

**Organize the work, then keep improving how it is organized.** An intelligent,
balanced outer agent holds the user's intent and coordinates sessions. Those
sessions may do bounded work themselves or orchestrate a workstream with its own
workers. The useful shape depends on the task, codebase, risks, and evidence;
there is no universal roster, pipeline, or agent count.

Optimize for **verified useful outcomes per unit of time and effort**, not raw
agent activity. Quality and throughput are joint goals. Better task boundaries,
context, feedback, and verification often improve both by preventing rework;
confirm that with evidence and make real tradeoffs explicit. Do not buy apparent
speed by weakening the required outcome.

## The adaptive pattern

```text
User intent, constraints, and authority
                  |
         Balanced outer coordinator
                  |
       Task-appropriate workstreams
          /                  \
   Direct worker       Local orchestrator
                            |
                      Focused workers
                  |
       Evidence, integration, feedback
                  |
     Reflect and reshape the organization
```

This illustrates possible relationships, not mandatory levels. A coordinator can
also do useful work directly. A worker can become a local orchestrator when a
workstream needs it; an unnecessary layer can collapse back into direct work.
Use hierarchy to contain complexity, not to reproduce an org chart.

The outer agent needs enough judgment to decompose, challenge assumptions, and
integrate results, while staying economical about detail. Keep the global goal,
interfaces, important decisions, resource use, and acceptance in its context;
let local owners retain deep implementation or domain context. Select models and
tools for the work and the user's preferences, not a fixed "best model" hierarchy.
A difficult design decision might benefit from a stronger reasoning reviewer;
a routine bounded transformation might not.

## Balance intelligence, reasoning depth, and execution speed

Use an intelligent orchestrator with strong reasoning and broad enough context
to hold the objective, challenge assumptions, choose boundaries, and integrate
evidence. Pair it with **faster but still capable workers** for well-scoped
implementation, tests, bounded research, and repetitive operations. Fast does not
mean disposable or incapable; a worker must meet the same correctness bar.

Spend the strongest available reasoning where judgment has the highest leverage:
critical design decisions, concurrency or persistence invariants, difficult bugs,
contradictory evidence, repeated failed approaches, and consequential unblocking.
A local orchestrator or a focused expert consultation can handle that depth;
the outer coordinator need not absorb every implementation detail.

| Work | Model-selection bias |
|---|---|
| Overall decomposition, priorities, acceptance and integration | Strong reasoning, reliable synthesis and sufficient context |
| Bounded implementation with a clear contract and tests | Fast, capable coding model |
| Straightforward evidence gathering or routine validation | Efficient model with the necessary tools and fidelity |
| Hard diagnosis, high-risk design review, unresolved ambiguity | Strongest suitable reasoning model and supported reasoning effort |

Choose actual models and reasoning settings within the user's preferences,
availability and shared budget. Do not hard-code one permanent model pairing,
assume a label guarantees quality, or silently override explicit selections.
Model capability, reasoning effort and context size are different choices.
Increasing all three for every call is not a strategy.

Escalate when a concrete uncertainty or failed approach warrants it, not after an
arbitrary number of minutes. Give the stronger model the failing case, relevant
code, attempted explanations and exact unresolved decision. Return its conclusion
to the existing implementation owner rather than restarting the whole workstream.
Once the uncertainty is resolved, use faster execution again where appropriate.
Judge the balance by verified outcomes, rework, latency and total cost, including
handoffs and review, rather than token price or response speed alone.

## Start with a working understanding, not a ceremony

Establish the requested outcome and what would demonstrate it. Find the relevant
code, documents, existing sessions, conventions, dependencies, and constraints.
Distinguish confirmed requirements from assumptions. Identify what actions are
authorized and what data or shared state could be affected.

Choose an initial organization that makes useful progress with what is known.
For a small change or a tightly coupled investigation, one agent is often right.
For independent work or substantial separate context, use session orchestration.
For a broad workstream whose local decisions would overload the outer agent,
delegate an outcome to a local orchestrator.

Do not require every uncertainty to be resolved before starting. Investigate
high-impact unknowns early, begin independent work where safe, and revise the
plan as evidence arrives. Ask the user only when the answer changes scope,
authority, or a consequential choice that cannot reasonably be inferred.

## Delegate outcomes and decision boundaries

A useful assignment conveys the relevant user intent, expected result, owned
scope, dependencies, important context, authority, and how to demonstrate success.
State what the recipient can decide and what should come back for resolution.
Keep it sufficient to work independently, not an exhaustive copy of the parent
conversation or a rigid form to fill in.

For example:

> Own the client side of this protocol change. Preserve existing callers.
> Coordinate the UI and compatibility work if they benefit from separate
> owners. The server workstream owns the wire contract; agree on it before
> depending on a change. Return the implementation, relevant compatibility
> evidence, and unresolved interface decisions. Local edits and tests are in
> scope; publishing is not.

A local orchestrator receives responsibility for its outcome, not permission
to multiply agents without purpose. Any delegation remains within the parent's
scope, authorization, and shared resource budget. Pass down applicable session,
concurrency, cost, and time limits and whether further delegation is in scope.
Allocate within shared limits rather than giving every child the full budget;
report material resource use upward. A recipient may narrow its envelope, not
widen it, and brings requested expansions to its parent. A delegated orchestrator
applies this skill within its assignment, not as a fresh grant of autonomy.
Add depth only when it reduces the outer coordinator's cognitive or coordination
burden. Remove it when the extra handoffs cost more than they save.

Specialization can follow domain knowledge, subsystem ownership, method,
uncertainty, or a quality gap. It need not mean permanent titles. A worker that
knows the failing subsystem may be the best person to fix its CI failure; a fresh
reviewer may be useful for a high-risk assumption the implementer cannot easily
challenge. Choose deliberately rather than appointing a reviewer for every edit.

Use isolated workspaces for independent edits, and resolve shared writers
explicitly. Treat common files, APIs, fixtures, environments, and resource limits
as dependencies even when feature descriptions sound independent. Agree on
interfaces early enough to avoid parallel incompatible implementations.

## Coordinate without becoming the bottleneck

Use the host's session creation, messaging, status, and completion mechanisms.
Check for an existing owner before creating another. Give new sessions standalone
context; send existing owners only information that changes their work. Use
subagents for bounded consultations when that is the better available mechanism;
do not confuse them with durable sessions that own continuing work.

Start ready independent work together, do useful work while it runs, and consume
completion events where available. Silence is not proof of a stall, and an idle
session is not proof of completion. Inspect the actual state and result before
redirecting or replacing an owner. Avoid continuous polling, duplicate
investigations, and continuation messages with no new information.

Supervise outcomes, not just activity: busy is not proof of useful progress
either. When a result is unexpectedly delayed or blocks important work, inspect
the relevant authoritative state rather than repeatedly requesting status. A
finished result may simply be waiting to be relayed. Use verified evidence when
available; if ownership must change, transfer it explicitly, prevent duplicate
writers, and preserve the existing work. Scale attention to impact and expected
progress, not a universal timeout.

Let local owners make local decisions. Bring cross-workstream contracts,
conflicts, shared bottlenecks, and acceptance gaps to the outer coordinator.
Review the evidence appropriate to the risk without redoing each worker's
investigation. Integrate incrementally when that exposes incompatibility sooner;
do not delay useful completed work for unrelated optional work.

Keep enough durable state to recover: the outcome, current owners and
dependencies, decisions and assumptions, evidence/artifact identities, unresolved
risks, next actions, and active workflow experiments with their baseline and
expected effect. Use an existing tracker or a compact checkpoint, not a new
reporting system by default. Preserve useful worker context and saved work.
A checkpoint or scheduled prompt describes past state. On resume or an
authorized scheduled wakeup, reconcile new requests, current owners, artifacts,
and relevant external state before acting; do not replay an obsolete plan.

## Keep recurring work alive with session automation

Some objectives are ongoing services, not one-off deliverables. When the user
authorizes recurring work, use the host's **inline session automation or scheduled
wakeup** to revisit it without requiring another manual prompt. A completed cycle
does not complete an explicitly ongoing mandate. Keep running useful, bounded
cycles until its stop condition, expiry, or user cancellation.

Examples include repository triage, reviewing new performance evidence, examining
failed tool calls, periodic UI audits, delivery supervision and recovery checks.
These are examples, not an automatic checklist: schedule only relevant authorized
objectives, and choose their cadence independently. A release recovery check may
need minutes; a UI audit may belong after a release or on a much slower schedule.

Distinguish two host patterns:

- **Same-session wakeup:** resumes the continuing coordinator with its conversation
  and ownership context. Good for supervising an in-flight workstream or incident.
- **Fresh-session scheduled job:** starts an isolated run. Give it durable state,
  a checkpoint location and an explicit overlap/ownership rule. Do not assume it
  inherits the previous conversation.

Use the native scheduling mechanism instead of sleep loops, repeated status
messages, or asking an agent to stay busy. Prefer completion events for immediate
handoffs; a slower scheduled check is a recovery backstop for missed handoffs,
lost context, or an owner needing help. A timer does not prove a process is stuck.

### Define a small recurring contract

Persist the objective, scope, permissions, cadence or next wake time, evidence
source, current owner, last processed watermark, budget and stop condition.
Include what can happen automatically and what requires escalation. For example,
reading failure diagnostics is not permission to replay failed mutations, and
finding a UI problem is not automatic authorization for a redesign.

A reusable wakeup instruction is:

> Continue the authorized recurring objective: [outcome and scope]. Read the
> current checkpoint and newer user instructions first. Reconcile current owners,
> in-flight operations and relevant external state. Process only new or materially
> changed evidence since [watermark], within [time/cost/action limits]. Reuse the
> existing owner; do not duplicate work or replay uncertain effects. Take the next
> authorized useful action, preserve evidence and unresolved blockers, update the
> checkpoint, and keep or adjust the schedule within the approved cadence. Stop at
> [expiry/completion/cancellation condition]; settle already-started effects safely.

Each cycle should:

1. **Reconcile before acting.** Read current intent and authoritative state, not
   just the scheduled prompt's historical summary. Resolve replaced candidates,
   finished work, changed ownership and already-submitted operations.
2. **Select bounded useful work.** Process new evidence or advance a blocked
   dependency. If there is no actionable delta, do not create a task to justify
   the wakeup. Record a watermark when useful and avoid repetitive user updates.
3. **Execute or delegate once.** Keep a single owner for shared writes; prevent
   overlapping runs from duplicating audits, fixes, queue consumption or releases.
   Coalesce a wakeup behind active work where possible rather than spawning a copy.
4. **Verify and checkpoint.** Record actual outcomes, evidence identities, failures,
   next actions and the next due time. Keep the scheduled instruction current,
   concise and free of secrets; durable state carries the detailed history.
5. **Continue or stop deliberately.** Keep an ongoing authorized mandate scheduled.
   For finite work, remove its schedule when done or expired. At a cutoff, admit
   no new work, reconcile in-flight effects and preserve an honest handoff.

For triage, track which issues and updates were examined rather than rediscovering
the whole backlog every few minutes. For performance or tool-failure review,
retain the observation window, source version and censoring limits; failure-only
logs do not establish a failure rate, and old logs are not fresh latency evidence.
For UI audits, bind findings to a release and reuse the existing finding owner;
do not turn every wakeup into another polish cycle. Recovery checks should identify
the actual blocker and deliver missing context or decisions, not repeatedly tell
a busy worker to continue.

Recurring work consumes resources and may encounter sensitive data. Scheduling
does not expand permissions, grant new access or make external effects exactly
once. Preserve durable receipts and idempotency/lease safeguards where relevant;
reconcile uncertain writes before retries. Use appropriate backoff when there is
no new evidence or a persistent external blocker, within the authorized cadence.
Change scope, extend an expiry, or create additional schedules only with authority.

## Reflect periodically on the workflow itself

Execution feedback asks, "Is this result right?" Workflow reflection also asks,
**"Is this organization helping us get better results faster?"** Make the second
question recurring, not merely a retrospective after delivery.

Local orchestrators reflect on their own workstreams. The outer coordinator
reflects on boundaries, cross-workstream flow, and shared bottlenecks, delegating
local adjustments rather than micromanaging them.

Revisit it at meaningful intervals: after an early result, an integration,
a repeated failure or handoff, a shift in the critical path, or a long-running
work phase. Choose a cadence that can catch waste before it compounds without
interrupting useful work. Short tasks may need only one reconsideration;
long-running efforts need repeated ones. No fixed timer or mandatory meeting.

Use a small set of observations that matter to this task. Examples include
time to a usable result, accepted outcomes over a stated window, queue versus
active time, first-pass acceptance, defects or regressions, integration rework,
repeated questions, duplicated investigation, and context lost at handoffs.
Small samples support hypotheses, not invented fleet-wide statistics.

During reflection, consider:

- **Goal and quality:** Are we solving the right problem? Does the evidence
  establish the user's outcome, or just show that workers finished tasks?
- **Flow:** What currently limits verified progress? Is work waiting for
  knowledge, a decision, a shared resource, review, or another owner?
- **Organization:** Are boundaries, depth, concurrency, or specialization
  helping? Is the outer agent a queue? Would consolidation be better than fan-out?
- **Context:** Who lacks a contract, example, tool, or decision? Who is carrying
  irrelevant history? Are summaries hiding uncertainty or important evidence?
- **Learning:** What small change could improve both correctness and flow, and
  what would show whether it worked?

Turn reflection into action:

```text
Observed friction -> plausible cause -> small workflow change
-> compare useful progress AND quality -> keep, revise, or undo
```

Change one major variable at a time when practical. Compare similar work and
note confounders; a faster easy task does not prove a better process. Preserve
acceptance standards and safety boundaries. If a change only improves speed
while increasing defects or rework, it has not demonstrated the intended gain.
When a real quality/cost/latency tradeoff cannot be removed, make it explicit and
honor the user's priorities rather than quietly lowering the bar.

Adapt the organization, not just the schedule. Split an overloaded workstream;
merge tightly coupled owners; introduce a temporary specialist; move a decision
closer to the relevant evidence; improve a handoff; change a model or tool within
the user's constraints; reduce concurrency when integration or resources saturate.
Explain the change to affected owners and preserve accepted work, important
context, and clear responsibility during the transition. Do not restart the team
from scratch merely to obtain fresh contexts.

Retain useful lessons with their conditions and evidence. A successful pattern
for one codebase is an option for the next, not a new universal rule. Remove
ceremony that no longer earns its cost.

## Examples: different work, different organizations

These are illustrations to adapt, combine, or reject.

### Small bug in a cohesive subsystem

The outer agent investigates and fixes it directly. If the first result reveals
a subtle concurrency assumption, a bounded rubber-duck consultation challenges
that assumption while the original owner retains implementation context.
Reflection may confirm that extra sessions would only add latency; staying small
is a valid optimization. Judge the result by the regression evidence, not by
whether orchestration occurred.

### Cross-repository feature

The outer coordinator owns the user journey and shared contract. Repository
workstreams own their changes; one complex client workstream may use a local
orchestrator for distinct UI and compatibility work, while a small server change
stays with a direct worker.

If integration repeatedly exposes contract drift, stop expanding parallelism.
Have the owners settle examples and compatibility checks, then resume independent
work. Evaluate whether integration rework falls and verified delivery accelerates.
If every repository question is queued at the outer agent, delegate local
decisions more clearly rather than adding another central reviewer.
If the client's local orchestrator mostly relays messages, fold that layer back
into direct coordination with the existing workers.

### Research or diagnosis under uncertainty

Organize around competing hypotheses or independent evidence sources rather
than implementation roles. The coordinator synthesizes findings with provenance,
confidence, and contradictory evidence. Workers return what would disprove their
explanation, not just supporting examples.

After initial findings, collapse redundant branches and focus effort on the
uncertainty blocking a decision. Introduce a domain specialist only if the
remaining question needs one. Measure decision-useful evidence and avoided
false conclusions, not documents produced; research need not end in deployment.

### Broad migration or repetitive transformation

Begin with a representative slice to learn the real variations. A workstream
owner may coordinate independent batches using shared rules and regression
examples. If batches repeatedly hit the same exception, improve the rule or
extract a bounded specialist instead of teaching every worker independently.

If overlapping files and integration rework dominate, regroup by ownership or
consolidate writers. Increase parallelism only where validation and integration
can keep up. Compare accepted transformations, exception/rework rates, and time,
not raw edits. Preserve compatibility and migration recovery requirements.

### End-to-end code delivery

One possible arrangement uses implementation, reference research, qualification,
and release responsibilities. Combine or separate them as useful; these are not
mandatory roles for every task.

```text
Independent changes -> integration/review -> qualification
                                          -> authorized release -> user acceptance
Focused research ----> relevant decisions
```

Here, bind evidence to the exact integrated source and artifact. Green
individual branches do not prove their combination. Use the repository's checks,
proportional review, and existing release tooling; keep clear ownership of
publication and environment writes. A compatible fix and a persistent-format
migration need different rollout and recovery safeguards.

Reflection might reveal duplicate CI observation, serial independent checks,
late authentication discovery, or tests racing over shared fixtures. Remove
duplicate observation, overlap genuinely independent work, establish access
earlier, or isolate fixtures as appropriate. Keep coverage, failure visibility,
resource bounds, and artifact identity; verify the speedup in the relevant
environment. Deployment is not proof of the real user journey.

## Boundaries that adaptation must preserve

The organization is flexible; authority, honest evidence, and data safety are
not optional.

- **Stay within authority.** A skill or delegated role grants no permissions.
  Respect host rules and user limits. Do not infer publishing, merging,
  deployment, destructive changes, spending, or recurring automation permission
  from a planning request. Resolve genuinely missing authority before acting.
- **Protect data and work.** Do not expose private code, credentials, logs, or
  conversations to unauthorized destinations. Never obtain credentials from
  another session or browser profile. Preserve user checkouts, saved artifacts,
  and sessions with ongoing or persistent work; idle does not mean disposable.
- **Keep effects controlled.** Establish ownership for shared mutable resources.
  A timed-out external write has an unknown outcome, not necessarily a failed
  one. Reconcile its receipt and live state before retrying. Preserve retry
  identity where supported, and do not assume a key makes effects exactly once.
  State-changing migrations need compatible recovery, not blind rollback.
- **Match evidence to claims.** Distinguish proposals from implementation,
  local checks from integration, and simulation from live outcomes. Check the
  actual requested behavior and applicable failure paths. Report failures and
  unavailable evidence; do not rerun until lucky or weaken checks to look done.

## Finish the outcome, not the diagram

Stop when the requested result is verified and preserved, or report the precise
blocked scope and what would unblock it. No extra workstream is owed merely
because an example mentions one. Stop unneeded helpers you own without losing
user work or continuing activity.

Communicate the useful result, material evidence, uncertainty, and consequential
decisions concisely. Mention workflow changes when they explain a better result,
a changed forecast, or a tradeoff; do not make the user manage the organization.
