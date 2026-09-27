# Skill mechanics

Use this reference for skill frontmatter, invocation choices, and routers. For routine edits, use the [root checklist](SKILL.md). For pointers, disclosure, and sequence boundaries, use [Instruction design](references/instruction-design.md).

## Invocation controls

Separate implicit selection from explicit invocation. A host can select a skill that matches a request. A user can invoke a skill by name. Controls and entry points differ by host.

| Host | Explicit-only control | Explicit invocation |
| --- | --- | --- |
| Codex | Set `policy.allow_implicit_invocation: false` in `agents/openai.yaml` | Explicit `$skill-name` invocation still works |
| Claude Code | Set `disable-model-invocation: true` in `SKILL.md` frontmatter | The user can invoke `/skill-name` |
| Other hosts | Support for these controls is not established here | Check the host's documentation and available invocation tools |

Sources: [Codex skills](https://developers.openai.com/codex/skills/) and [Claude Code invocation controls](https://code.claude.com/docs/en/skills#control-who-invokes-a-skill).

A shared skill can carry both controls. Neither setting replaces the other host's setting. Do not infer support in Copilot, OpenCode, Pi, or another host because it reads `SKILL.md`.

Use explicit-only activation when the workflow needs a deliberate user request, such as a specific critique persona. Otherwise, describe the specific task that warrants implicit selection. Invocation does not authorize every action the skill describes.

## Descriptions and metadata exposure

Keep the description short. Put the actual workflow first. Do not list related requests that should not activate the skill. An explicit-only skill still needs an accurate summary wherever its host shows it.

Metadata exposure and invocation policy are separate questions. Codex documents an initial skill list with names, descriptions, and paths. Under list-budget pressure, Codex can shorten descriptions or omit entries. Claude Code documents its own visibility rules, which depend on frontmatter. Do not promise zero context cost, universal invisibility, or an always-present full description.

Keep the `agents/openai.yaml` UI text and `default_prompt` consistent with the root's scope. `default_prompt` does not set invocation policy.

## Linked files and shared references

Reading a linked file differs from invoking a skill through the host's skill mechanism. Invocation flags do not control filesystem access. Within task authorization and available tools, an agent may read a reference inside another skill's directory.

Keep shared technical knowledge in a maintained reference. Link it from the tasks that need it. Its directory does not need to become an implicitly invoked skill to make the file readable. Reading the file does not authorize running its workflow or bypassing an explicit-request boundary.

## Routers and splitting

Use a small router when one skill supports distinct workflows with different inputs, outputs, or reference needs. Keep common constraints in the root. Link each route's material so the agent reads only the selected route. A short, single-purpose skill does not need a router.

Create a separate skill when a workflow needs independent discovery or invocation. A memorable trigger word alone is not a reason. A router can direct the agent to ordinary linked references. Whether a router can invoke another skill through a tool depends on the host's supported mechanism and the applicable activation policy.

After changing activation or structure, check the relevant host settings, description, default prompt, and local links. Separate a static metadata check from observed host behavior.
