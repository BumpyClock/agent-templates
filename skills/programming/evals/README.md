# Programming skill evaluations

Use these cases to assess task outcomes, not compliance with a particular wording of the skill.
Historical failures explain the motivation for a case. They do not establish that a general rule improves other tasks or models.

## Record a case

Record the task, repository state, expected outcome, and observed failure with the model and date when known.
Separate observed incidents from proposed counterexamples.
Preserve historical observations when an expected outcome needs clarification.

## Compare outcomes

Compare the current skill, a proposed revision, and no skill under equivalent task conditions.
Assess correctness, completeness, unnecessary changes, validation quality, and execution cost.
Include counterexamples where a broad rule could harm a valid solution.
Examples include independent protocol constants, public APIs without local callers, overlapping useful tests, and diagnosis without local reproduction.

### Experimental workflow

1. Name the question and the hypothesis about task outcomes.
   Define the outcome rubric and the decision criterion before trials.
   Include executable artifact checks where the task permits them.
   Use [test quality](../references/write-tests.md) for checks that distinguish correct behavior from plausible failures.
   This step ends with a question, variants, cases, rubric, and trial budget.
2. Prepare isolated sessions and repository states for each trial.
   Keep task prompts, dependencies, tools, permissions, resource budgets, and relevant environment conditions equivalent.
   Hold the model version and configuration fixed within a skill-variant comparison.
   To compare models too, use a crossed design that runs every skill variant on every selected model.
   Record unavailable combinations rather than attribute model differences to the skill.
   This step ends with reproducible trial setups and declared differences.
3. Run the variants with organic task prompts.
   State the task goal without evaluation-leading cues or requests for principle citations.
   Preserve realistic repository names, files, and task vocabulary, including ordinary uses of `test`, `eval`, and `benchmark`.
   Keep evaluation-only labels and other trial results outside candidate context.

   Repeat trials as needed to assess variation within the budget.
   Retain failed and incomplete trials in the result record.
   This step ends with actual run counts, artifacts, execution costs, and trial status.
4. Assess artifacts with one calibrated rubric across all variants.
   Prioritize executable outcomes over subjective ratings or agent self-reports.
   Where practical, hide skill-variant and model identities from artifact judges.
   Consider neutral labels and randomized presentation order to reduce order effects.
   Record blinding limits when artifacts reveal identity.
   This step ends with per-trial judgments tied to artifact evidence.
5. Report measured outcomes separately from unrun proposals.
   Include the evaluated cases, skill revisions, model configurations, run counts, outcome variation, failures, and limitations.
   Apply [verification before completion](../references/verification-before-completion.md) to claims about observed behavior.
   This step ends with a bounded recommendation to retain, revise, reject, or defer the proposed change.

### Interpret process evidence

Use transcripts only when the experiment actually provides authorized access within the relevant session.
Treat transcripts as process diagnostics, not success criteria.
A file read or principle citation does not establish a correct artifact.
When transcripts are unavailable, report that limit without an invented transcript path or access claim.
Keep unrelated private sessions and secrets outside collection and reports.

Judge disagreement can reflect rubric ambiguity, evidence gaps, or genuine differences in interpretation.
Inspect the disputed artifact evidence before a conclusion about the judge.
Disagreement alone does not prove bias.
If the rubric changes, reassess all affected artifacts on the revised scale.

### Decide from the evidence

Retain a rule when outcome evidence supports its benefit across relevant cases.
Revise a case or rule when its assumptions no longer hold, rather than restoring obsolete instructions automatically.
Report which cases and models were actually evaluated.
