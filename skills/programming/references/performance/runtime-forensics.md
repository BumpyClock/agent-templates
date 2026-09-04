# Diagnose a live process

Use this workflow for a live process with unexplained CPU use, memory growth, delay, or intermittent behavior.
The deliverable is a diagnosis with evidence and limits, not an implementation.
For a supplied capture without live access, use [trace forensics](trace-forensics.md).

## Workflow

1. Identify the target process and the reported symptom.
   Record the process identity, executable, build, source revision, configuration, workload, and symptom interval.
   Confirm that the target belongs to the authorized environment.
   Set capture duration, resource limits, and a stop condition for service impact.
   This step ends with an identified target and a bounded capture plan.
2. Capture the relevant signal with existing, scoped instrumentation.
   Prefer available metrics, targeted logs, or a native profiler before additional instrumentation.
   Select CPU samples, scheduler events, heap evidence, or request traces according to the symptom.
   Record the tool version, capture interval, clock, sample settings, and workload state.
   Note dropped events, pauses, and observed measurement overhead.
   This step ends with a usable artifact or an explicit capture limitation.
3. Reduce the capture to evidence that addresses the symptom.
   Use [trace forensics](trace-forensics.md) for capture semantics and attribution limits.
   Map supported observations to source files, symbols, and the captured build where possible.
   Record source-map or symbol gaps instead of an invented source location.
   This step ends with cited observations and separate causal hypotheses.
4. Distinguish competing causes with a bounded check when safe and authorized.
   Use [systematic diagnosis](../../systematic-debugging/guide.md) to select the check.
   Prefer existing observations or a controlled reproduction over a live mutation.
   For a permitted intervention, state its prediction, affected scope, recovery procedure, and stop condition before execution.
   This step ends with supporting evidence, contradictory evidence, or a named uncertainty.
5. Report the symptom, observed signal, supported mechanism, and unresolved alternatives.
   Cite the capture interval, relevant events or stacks, artifact locations, and matching source evidence.
   State the capture limits and any intervention that changed the process.
   Apply [verification before completion](../verification-before-completion.md) to the diagnosis claim.
   This step ends with an evidence-bounded report and no unrequested fix.

## Protect the live environment

Obtain explicit authorization before live code injection, hot patches, or user-visible mutation.
Treat diagnostic code injection and hot patches as mutations, even when their purpose is observation.
Never describe those operations as read-only.
For a permitted intervention, restore the prior state when safe unless the owner authorizes persistence.

Profilers and heap snapshots can pause a process or change resource use.
Use the least intrusive capture that can answer the question.
Stop when overhead exceeds the agreed service-impact limit.
When a safe intervention is unavailable, report uncertainty rather than infer a confirmed cause.

Restrict capture scope to the authorized process, interval, and data.
Avoid secrets and unrelated private content in logs, captures, commands, and reports.
Use approved local storage with a bounded retention period.
Share only the redacted evidence necessary for the diagnosis.

## Separate observations from causes

A hot stack identifies captured activity, not necessarily the cause of user delay.
A retained object identifies reachability, not necessarily a leak.
An intervention supports causality only to the extent that its controls exclude competing explanations.
State those controls and their limits.

For an authorized correction, continue with [systematic diagnosis](../../systematic-debugging/guide.md) or the [performance workflow](perf-issue.md).
Otherwise, stop at the report.
