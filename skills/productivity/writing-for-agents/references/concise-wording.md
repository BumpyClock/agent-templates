# Concise wording

Apply this reference to every edit of agent-facing instructions. Save tokens without adding ambiguity. An unclear instruction causes churn that costs more than the saved tokens. Clarity wins over compression.

## Cut

- Remove filler (just, really, basically, actually, simply), pleasantries, and hedging.
- State each fact once. Remove recaps that repeat the rule above them.
- Prefer short familiar words: "big" over "extensive", "fix" over "implement a solution for". Use one word when one word is enough.
- Drop a conjunction only when cause and effect stay clear without it.

## Keep

- Keep `not`, `never`, `no`, `only`, and `except`. Dropping one can flip a rule's meaning.
- Keep numbers and units exact.
- Keep technical terms, code symbols, function names, API names, CLI commands, commit-type keywords, code blocks, and exact error strings verbatim.
- Keep established tech acronyms such as DB, API, and HTTP.
- Keep articles and full grammar in instruction documents. Dropped articles and fragments belong to a chat register. Do not use them in a skill, `AGENTS.md`, or `CLAUDE.md`.

## Avoid false savings

These patterns look shorter but save no tokens and cost the reader decoding effort:

- Do not invent prose abbreviations such as `cfg`, `impl`, `req`, `res`, `fn`, or `auth`. A tokenizer splits them about as finely as the full word.
- Do not use arrows (`X → Y`) for cause, sequence, or mapping. An arrow is its own token and is less clear than a word.
- Do not add words or break grammar to sound terse. "When it not" costs one token more than "when not" and says the same thing.
- Keep the correct verb form when it costs the same. "Sees" and "see" are one token each, so the incorrect form buys nothing.

If the compressed phrasing is not shorter than the plain phrasing, use the plain phrasing.

## Sentence rules

Follow ASD-STE100 Simplified Technical English:

- Write one idea per sentence. Target 20 words or fewer.
- Use active voice. Use present tense where it is true.
- Write instructions as imperatives: "Run X", not "X should be run".
- Use one term for one meaning. Do not rotate synonyms for the same thing.
- Limit noun clusters to three words.
- Use a pronoun only when it has one clear referent. Otherwise, repeat the noun.

A useful line shape is the rule, then its reason, then its exception. For example: "Run the linker after adding a skill. The linker creates the tool symlinks. Skip it when editing an already linked file."

## Where full prose is required

Write complete sentences with explicit connectives in these cases, even in a compact document:

- Security warnings and irreversible actions.
- Ordered procedures where a missing conjunction could obscure the order. "Migrate table drop column backup first" is ambiguous. "Back up the table, then migrate it, then drop the column" is not.
- Any rule where compression creates technical ambiguity.

## Examples

Label an example when only its format should be copied. Otherwise, the agent may copy its language, names, or content.

## Output-style rules

When a document defines how an agent formats chat replies, point to the maintained source instead of restating it. The source is the `## Output` section of the shared global instructions (`defaults/AGENTS.md` in `agent-templates`). That section owns reply-language choice, tool-call narration, plain-prose exceptions, and the boundary between chat replies and persisted text.
