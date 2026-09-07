# Detailed Usability Rubric

Use this reference for a detailed usability assessment or a complex task with suspected cognitive-load problems.
Use `critique.md` for product access, evidence, scope, and reports.

Assess only the criteria relevant to the users, task, platform, and inspected states. These examples are not a required feature list.
Complete the assessment with evidence, concrete effects on the task, and explicit verification limits.

## Cognitive Load

Distinguish necessary task complexity from effort that the interface adds. Preserve information that users need for comparison or decisions.
Option count alone does not establish overload. User knowledge, label clarity, visible context, and task structure affect the assessment.

### Assessment Questions

- **Task focus:** Can users identify the next useful action without unrelated demands?
- **Groups and hierarchy:** Do labels, proximity, and emphasis express meaningful relationships?
- **Decision context:** Can users compare relevant alternatives without hidden information?
- **Memory demands:** Must users recall a value or instruction from another screen?
- **Task sequence:** Does each step have the information needed for its decision?
- **Progressive disclosure:** Does it reduce distraction without loss of necessary controls or context?
- **Terminology:** Do terms match the users' domain knowledge?
- **Practice and feedback:** Can users learn repeated tasks through consistent patterns and clear results?

### Problems and Corrections

| Observed problem | Possible correction |
|---|---|
| An undifferentiated option list obscures relevant choices. | Group options by a meaningful category or expose useful filters. |
| A later step requires a value from an earlier screen. | Keep that value visible at the decision point. |
| A comparison requires repeated navigation between detail pages. | Present the relevant attributes together. |
| Navigation provides no indication of the current section. | Show current location through an active state or appropriate path indicator. |
| Labels require unfamiliar domain knowledge. | Use familiar terms or provide a short definition where needed. |
| Decorative content obscures the primary task. | Reduce its prominence or remove it when it serves no user need. |
| Related actions behave differently without a task-specific reason. | Align their labels, controls, and feedback. |

Treat these corrections as hypotheses until the inspected task supports them. Do not infer abandonment rates or user mistakes from layout alone.

## Nielsen's Ten Usability Heuristics

### 1. Visibility of System Status

- For operations with a perceptible delay, check that users can distinguish progress from a stalled interface.
- Check that important actions expose their result, such as a save confirmation or a visible updated value.
- For multi-step tasks, check that progress and the current step are clear.
- Check that validation appears when users can act on it, without premature error messages.

Example: A save control remains disabled with no status after a request fails. Users cannot distinguish failure from continued progress.

### 2. Match Between System and Real World

- Check that labels, units, and information order match the users' task and domain.
- Check that icons have a recognizable meaning or an adequate label.
- Check that text direction and sequence fit the language and platform.

Example: An account form exposes an internal database field name instead of the term users know from their account records.

### 3. User Control and Freedom

- For reversible edits, assess whether undo or another recovery path fits the risk and task.
- For an incomplete task, check that users can cancel or leave without unintended changes.
- For filters and selections, check that users can revise or clear their choices.
- For irreversible actions, check that consequences are clear before commitment.

Example: A modal permits an edit but offers no exit without a save. A cancel action restores control.

### 4. Consistency and Standards

- Check that the same term identifies the same concept across the inspected flow.
- Check that equivalent actions have consistent controls and results.
- Check that interaction patterns respect platform conventions and the established design system.
- Distinguish intentional task differences from unexplained inconsistencies.

Example: The same icon means archive in one view and delete in another.

### 5. Error Prevention

- For consequential actions, assess safeguards against accidental or misunderstood changes.
- Check that input constraints reject invalid values and accept valid task cases.
- Check that defaults fit the task and expose consequential assumptions.
- For substantial user input, assess protection against loss from interruption or navigation.

Example: A destructive bulk action does not show which records it affects. A target summary makes the consequence explicit.

### 6. Recognition Rather Than Recall

- Check that users can find task-relevant actions through visible labels or understandable navigation.
- Check that necessary values and instructions remain available at the point of use.
- For repeated lookup tasks, assess whether recent items or suggestions reduce demonstrated recall demands.
- Check that secondary disclosure does not conceal information needed for the current decision.

Example: A checkout step requires a delivery code shown only on the previous screen.

### 7. Flexibility and Efficiency of Use

- For frequent tasks, assess shortcuts or alternative paths that reduce repetitive work.
- For repeated operations on many items, assess whether a bulk action fits the task and its risks.
- Check that efficient paths remain discoverable without extra complexity in basic use.
- Assess customization only when different user needs justify it.

Example: A daily record-review task requires repeated menu navigation for the same action. A direct control or keyboard shortcut may reduce effort.

### 8. Aesthetic and Minimalist Design

- Check that visible content supports the current task, necessary context, or product identity.
- Check that hierarchy directs attention to relevant information and actions.
- Check whether decorative emphasis competes with critical content.
- Preserve useful detail when its removal would make the task harder.

Example: Promotional cards dominate a transaction screen and obscure the transaction status.

### 9. Help Users Recognize, Diagnose, and Recover from Errors

- Check that error messages identify the problem in language users understand.
- Check that recovery instructions are specific and possible in the current state.
- Check that errors appear near the affected input or operation.
- Check that recovery preserves valid user work when feasible.
- Retain diagnostic codes when useful, but pair them with an explanation and next action.

Example: Replace an isolated "Invalid input" message with the specific field requirement and a correction the user can make.

### 10. Help and Documentation

- When users need help, check that it answers the actual task question.
- For complex requirements, check that examples or explanations appear where users need them.
- For substantial documentation, check that users can locate relevant instructions through search or clear organization.
- Check that help does not require users to lose their task context or entered values.

Example: A form requires an unfamiliar account identifier but gives no example or explanation of where to find it.

## Optional Structured Scores

Use numeric scores only when the user requests a structured assessment. Otherwise, report evidence-backed findings without scores.
Score each assessed heuristic independently on the scale below. A score describes the inspected task and states, not the entire product.

| Score | Meaning |
|---|---|
| 0 | Observed defects prevent the assessed task. |
| 1 | Observed defects create major task difficulty. |
| 2 | Observed defects create material friction, but the task remains possible. |
| 3 | The assessed task works with minor friction. |
| 4 | No material issue was observed within the assessed scope. |

- Mark a heuristic `n/a` only when it does not apply to the assessed task, and explain why.
- Mark relevant behavior `unverified` when the evidence is insufficient, and state what remains unknown.
- For partial evidence, limit the score to inspected states and list unverified states separately.
- Support each score with observations rather than the presence or absence of example features.
- Omit aggregate scores unless the user requests them.
- For a requested total, exclude `n/a` and `unverified` heuristics from both the total and maximum.
- Report all exclusions and partial coverage beside any requested total.
- Compare scores only when task, scope, evidence, and criteria are comparable.
- Do not convert scores into release approval, redesign mandates, or claims of complete usability.

No score cancels an observed defect. Report consequential defects individually, regardless of other scores.
