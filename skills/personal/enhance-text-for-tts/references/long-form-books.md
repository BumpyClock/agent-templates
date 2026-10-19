# Long-form books

Read this when enhancing a whole book or any text too long for one pass. The goal is an audiobook-ready Markdown file that keeps every source word.

## Prepare the source

- Keep only story content. Drop the cover, praise, title, copyright, dedication, contents, and back matter.
- For an EPUB, read the spine order from the `.opf` or `toc.ncx`. Convert each chapter file to Markdown with one `## Chapter N` heading.
- Publishers often print the first words of a chapter or scene in ALL CAPS. Convert them to sentence case and keep proper nouns capitalized. Otherwise the voice may shout them.
- Mark each scene break with a line holding only `[long pause]`.

## Split and delegate

- Split chapters at scene breaks. Scenes of about 1,000 words keep each write small. Small models drop the end of long writes without saying so.
- Balance batches by word count, not by chapter count.
- Give every worker one shared brief file. If you change the brief mid-run, also message each worker. Workers keep the copy they read first.
- Workers cannot invoke a skill that sets `disable-model-invocation`. Tell them to Read this skill's `SKILL.md` and references by path.
- Workers only enhance text. Do not let them generate audio. Stop each worker when its batch passes verification. Idle workers can pick up stray prompts.

## Tag density

Small models default to one tag per line, even when told to stack tags. Give them these mechanical rules and a worked before-and-after example:

- Open every dialogue paragraph with two stacked tags: emotion, then vocal manner.
- When one paragraph holds two quoted parts, put a tag before the second part where the tone turns.
- In narration paragraphs longer than four sentences, add a tag at the strongest beat.
- Pair a non-verbal tag with a delivery tag, for example `[sighs] [weary]`.
- Target about 1 to 3 stacked groups per 100 words. More than about 3 crowds the text.

## Verify before assembly

- Run `scripts/verify_preserved.py SOURCE ENHANCED` on every scene. It also accepts two directories. Do not trust worker self-reports. In one run, workers reported success on scenes with reordered paragraphs and dropped words.
- Re-run any scene that fails from the clean source, not from the failed output.
- Check tag hygiene. Replace visual tags such as `[frowning]`, `[wide-eyed]`, `[smirking]`, and `[watchful]` with voice tags. Split comma-joined tags into separate brackets. Remove adjacent duplicates such as `[calm] [calm]`.
- Assemble the scenes in order, then verify the whole book against the source once more.
