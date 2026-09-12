# Skill mechanics

Use this reference for skill frontmatter, invocation choices, and routers.
Use the [root checklist](SKILL.md) for routine edits.
Use [Instruction design](references/instruction-design.md) for pointer design, disclosure, and sequence boundaries.

## Invocation controls

Separate implicit selection from explicit invocation. A host may select a skill from a matching request, or a user may invoke it by name. The controls and entry points are host-specific.

| Host | Explicit-only control | Explicit invocation |
| --- | --- | --- |
| Codex | Set `policy.allow_implicit_invocation: false` in `agents/openai.yaml` | Explicit `$skill-name` invocation still works |
| Claude Code | Set `disable-model-invocation: true` in `SKILL.md` frontmatter | The user can invoke `/skill-name` |
| Other hosts | Support for these controls is not established here | Check the host's documentation and available invocation tools |

Sources: [Codex skills](https://developers.openai.com/codex/skills/) and [Claude Code invocation controls](https://code.claude.com/docs/en/skills#control-who-invokes-a-skill).

A shared skill can carry both supported controls. Neither setting substitutes for the other host's setting. Do not infer support in Copilot, OpenCode, Pi, or another host from its ability to read `SKILL.md`.

Choose explicit-only activation when the workflow needs a deliberate user request, such as a particular critique persona. Otherwise, describe the specific task that warrants implicit selection. Invocation is not authorization for every action the skill describes.

## Descriptions and metadata exposure

Keep the description short and front-load the actual workflow. Avoid a catalog of related requests that should not activate the skill. An explicit-only skill still needs an accurate summary for the places its host exposes it.

Metadata exposure and invocation policy are separate questions. Codex documents an initial skill list containing names, descriptions, and paths; it may shorten descriptions or omit entries under list-budget pressure. Claude Code documents its own frontmatter-dependent visibility. Do not promise zero context cost, universal invisibility, or an always-present full description.

Keep `agents/openai.yaml` UI text and `default_prompt` consistent with the root's scope. A default prompt is not an invocation-policy setting.

## Linked files and shared references

Reading a linked file is different from invoking a skill through a host's skill mechanism. Invocation flags are not filesystem access controls. Within the task's authorization and available tools, an agent may read a reference located inside another skill directory.

Keep shared technical knowledge in a maintained reference and link it from the tasks that need it. Its directory does not need to become an implicitly invoked skill merely to make that file readable. Reading the file does not authorize executing its workflow or bypassing an explicit-request boundary.

## Routers and splitting

Use a small router when one skill supports distinct workflows with different inputs, outputs, or reference needs. Keep common constraints in the root and link the selected route's material. A short, single-purpose skill does not need a router.

Create a separate skill when a workflow needs independent discovery or invocation, not just because it has a memorable trigger word. A router can direct the agent to ordinary linked references. Whether it can invoke another skill through a tool depends on the host's supported mechanism and the applicable activation policy.

After changing activation or structure, check the relevant host settings, description, default prompt, and local links. Distinguish a static metadata check from observed host behavior.
