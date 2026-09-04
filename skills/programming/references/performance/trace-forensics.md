# Diagnose a supplied capture

Use this workflow for a supplied CPU profile, event trace, thread dump, or heap snapshot.
Live-process access is not a prerequisite.
The deliverable is a cited diagnosis within the capture's limits.

## Workflow

1. Preserve the original capture unchanged.
   Identify its format, producer version, capture interval, workload, build, and source revision where available.
   Record clock units, sample or event semantics, symbol availability, truncation, and missing metadata.
   Keep derived files separate from the original.
   This step ends with a capture inventory and explicit unknowns.
2. Open the capture with an existing native profiler or format-aware parser.
   Check units, sample weights, event boundaries, and dropped-data indicators before aggregation.
   Use SQL only when its queries help answer the question.
   For a transformation, preserve source identifiers.
   Validate transformed record counts and aggregate totals against the native interpretation.
   This step ends with an interpretable capture or a named format limitation.
3. Extract the observations that address the reported symptom.
   Follow the relevant hot stacks, waits, event intervals, or heap retainer paths.
   Apply the metric-specific cautions below.
   Cite timestamps, thread identifiers, stack paths, object identifiers, or query definitions that locate the evidence.
   This step ends with reproducible observations, separate from causal hypotheses.
4. Relate the observations to source and comparable captures when available.
   Match symbols and source maps to the captured build.
   For paired captures, compare equivalent workloads, environments, capture settings, durations, and metric definitions.
   Record the revision difference and any other changed conditions.
   This step ends with supported attribution or an explicit attribution limit.
5. Report the artifact, relevant observations, source evidence, and strongest supported explanation.
   Separate measured facts, causal hypotheses, and unresolved alternatives.
   State whether a matched comparison exists and what that comparison establishes.
   Use [verification before completion](../verification-before-completion.md) to bound the claim.
   This step ends with a cited report, not a fix.

## Interpret the metric

- For CPU profiles, use sample weights or sample intervals according to the capture format.
  Raw sample counts do not always represent equal time.
  CPU time across threads is not wall-clock latency.
  Sampled stacks may omit off-CPU waits and short events.
- For call trees, distinguish self cost from inclusive cost.
  Avoid addition of inclusive costs across ancestors and descendants.
  A large inclusive cost does not establish expensive work inside that function itself.
- For event traces, distinguish elapsed intervals from actual CPU execution.
  Respect thread and clock domains before event alignment.
  Use duration-normalized rates only when workload and event semantics make those rates comparable.
- For heap captures, distinguish allocation volume from retained memory.
  Follow retainer paths to understand reachability.
  Account for shared references before addition of retained sizes.
  One snapshot can show retention but cannot establish growth over time.
  For a growth claim, require comparable measurements across time.
  Record workload differences and garbage-collection state for every capture.
- For thread dumps, report the captured stack and wait state.
  One stack observation cannot establish how long a thread remained there.

## Bound attribution and access

Missing symbols limit source attribution but do not erase supported timing, thread-state, or memory observations.
Report opaque frames as opaque frames.
Keep source claims conditional when the build or source revision is unknown.

A matched before-and-after difference establishes an association, not causality by itself.
Use source evidence and available controls to assess the proposed mechanism.
When alternatives remain, name the evidence that could distinguish them.

Keep capture access within the supplied task and authorized storage.
Exclude secrets and unrelated private content from derived reports.
Retain derived data only as long as the task and applicable policy require.
Do not obtain unrelated captures or assume permission to instrument a live process.

For authorized live evidence collection, use [runtime forensics](runtime-forensics.md).
For an authorized fix, use [systematic diagnosis](../../systematic-debugging/guide.md) or the [performance workflow](perf-issue.md).
Otherwise, stop at the report.
