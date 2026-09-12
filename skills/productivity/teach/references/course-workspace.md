# Course workspace

Use this reference only for the requested or established persistent-course route in [Teach](../SKILL.md).

## Workspace authority

Work in the course directory designated by the user or established by the existing course. The paths below are relative to that directory, not this skill directory. If a new course needs a location and none is established, clarify the location before writing files; teaching in the conversation can continue meanwhile.

Create only the materials needed for the current course task, with directories created lazily. Routine lesson and record updates within the established mission can proceed without repeated approval. Preserve unrelated files; a course request does not authorize repurposing another project, publishing materials, enrolling in a community, or deleting existing work.

## Course materials

These are supported formats, not a checklist of files every session must create.

| Path | Purpose | Format |
| --- | --- | --- |
| `MISSION.md` | The learner's goal, relevant constraints, and scope | [Mission format](../MISSION-FORMAT.md) |
| `RESOURCES.md` | Curated sources and useful communities | [Resources format](../RESOURCES-FORMAT.md) |
| `learning-records/*.md` | Demonstrated learning, stated prior knowledge, and consequential corrections | [Learning record format](../LEARNING-RECORD-FORMAT.md) |
| `lessons/*.html` | Bounded HTML lessons tied to the mission | [Lessons](#lessons) |
| `reference/*.html` | Printable cheat sheets, algorithms, diagrams, or other reusable reference | [Reference documents](#reference-documents) |
| `assets/*` | Shared styles, quiz widgets, simulators, and diagram helpers | [Assets](#assets) |
| `GLOSSARY.md` | Terms the learner understands and the course uses consistently | [Glossary format](../GLOSSARY-FORMAT.md) |
| `NOTES.md` | Relevant teaching preferences and working context | [Learning evidence](#learning-evidence-and-completion) |

## Mission and next objective

Ground lessons in the user's stated goal and constraints. A clear requested topic is enough to begin; an absent mission file does not require an intake interview. Clarify motivation or background only when it changes what should be taught next.

Use [Mission format](../MISSION-FORMAT.md) when recording the course goal. If the user explicitly changes that goal, update the mission and record a consequential shift. Ask before inferring a different mission on their behalf.

Choose a challenge within the learner's likely zone of proximal development: achievable with some support, rather than trivial or overwhelming. Use relevant learning records, stated experience, and exercise attempts to estimate the starting point. Honor a specifically requested topic rather than replacing it with a full curriculum assessment.

## Learning design

Different topics call for different balances of:

- **Knowledge:** concepts and facts needed to understand the topic.
- **Skills:** practice that makes the knowledge usable and adaptable.
- **Wisdom:** judgment developed through real-world use and feedback from practitioners.

Distinguish immediate retrieval fluency from durable retention. A fluent answer during a lesson does not by itself show long-term mastery. When appropriate, support retention through:

- Retrieval practice that asks the learner to recall or apply material rather than reread it.
- Spaced practice across sessions.
- Interleaving related skills so the learner must choose the right approach.

Keep explanations focused on the concepts needed for the next task. Supply prerequisite knowledge when needed; a learner who already knows it can begin with practice. Use manageable difficulty in exercises without adding difficulty to the explanation itself.

Follow the root skill's sourcing rule. Use existing trusted resources when relevant, verify uncertain or consequential claims, and record useful sources in `RESOURCES.md`. Recommend a primary source when it adds value, not as a required search before every lesson. Cite claims where attribution or verification matters and state source gaps honestly.

## Lessons

A lesson teaches a bounded objective tied to the mission and gives the learner a tangible result. Keep its length and difficulty appropriate to the learner's request and demonstrated level.

Use the course's agreed format. For a new course without a format preference, use HTML lessons named `lessons/0001-<dash-case-name>.html`, incrementing from the highest existing lesson number. Each lesson should be understandable on its own, while linking relevant prerequisites, lessons, and reference documents. A conversational follow-up does not need a new lesson file merely because a course exists.

Use readable typography, clear layout, and useful print styling for material the learner will revisit. Link shared local assets where appropriate; produce a fully single-file artifact when that is the requested delivery format.

Deliver the lesson with a usable path or link. Open it through available local tools when requested or part of the agreed course workflow. Invite follow-up questions where helpful without requiring boilerplate in every artifact.

### Practice and feedback

Use retrieval questions, quizzes, small browser tasks, or guided real-world exercises when they help the objective. Give prompt, specific feedback on the learner's attempt; automatic feedback is useful when it is reliable and worth implementing.

Avoid answer-format giveaways such as a uniquely detailed correct option, inconsistent grammar, or distinctive styling. Use plausible alternatives with comparable presentation rather than forcing identical word or character counts. Preserve clarity and technical accuracy.

For real-world judgment, answer within the available evidence first. Recommend reputable practitioners, forums, classes, or communities when external feedback would materially help. Respect the user's preferences, budget, and any decision not to join a community. A recommendation is not permission to enroll or spend money.

## Assets

Before adding a component, inspect relevant existing assets and reuse those that fit. Shared styles can keep a multi-lesson HTML course consistent. Quiz widgets, simulators, or diagram helpers can live in `assets/` when actual reuse justifies extraction.

A single lesson does not require a component library or a shared stylesheet. Avoid speculative abstractions and preserve a requested self-contained delivery format.

## Reference documents

Create a reference when the learner needs a compact resource beyond the lesson. Keep it readable, printable, and quick to scan. Useful forms include:

- Syntax and code snippets.
- Algorithms and process flowcharts.
- Yoga sequences or exercise routines.
- Diagrams and domain glossaries.

Reuse or extend an existing reference when it covers the need. Link it from the lessons that use it. Keep terminology consistent with `GLOSSARY.md` when present, using [Glossary format](../GLOSSARY-FORMAT.md) to record demonstrated understanding rather than merely introduced terms.

## Learning evidence and completion

Use [Learning record format](../LEARNING-RECORD-FORMAT.md) for demonstrated understanding, stated prior knowledge, corrected misconceptions, or consequential mission changes. Distinguish what the learner demonstrated from what they reported. Coverage alone is not learning, and learning records are not session activity logs.

Use `NOTES.md` for relevant teaching preferences or working context that will matter in later lessons. Do not manufacture notes or records just to fill the workspace.

Complete the requested lesson or course update, give feedback on available attempts, and update only warranted records. Check affected local lesson links and assets when creating or changing them. State unassessed learning or material limitations, then stop rather than extending the course or building more infrastructure without a new need.
