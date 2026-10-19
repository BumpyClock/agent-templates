# Multi-voice dialogue

Read this when a scene should use a different voice for each character. Generating audio needs user authorization, as the `speak` skill describes.

## Cast voices

- List voices with labels: `elevenlabs voices search --params '{"page_size":100}' --query "voices[].[voice_id,name,labels.gender,labels.age,labels.accent,labels.descriptive]" --format jsonl`.
- Match each character on gender, age, accent, and temperament. A cast built from labels is a starting point. Tell the user that no voice was auditioned.
- Give characters who talk to each other often clearly different voices.
- In a first-person book, the narrator voice also speaks the protagonist's lines.

## Build and generate

1. Write a cast file that maps paragraph numbers to speakers. See `scripts/build_dialogue.py` for the format.
2. Run `python -I scripts/build_dialogue.py SCENE.md CAST.json BODY.json --strip-attributions`.
3. Run `elevenlabs text-to-dialogue convert --json - -o scene.mp3 < BODY.json`. Pass the body on stdin; the `--json @file` form fails. The body takes `model_id` and `inputs`, not `output_format`.

Keep each request within the model's character limit. Check limits with `elevenlabs models list`. At the time of writing, `eleven_v4_turbo` allowed 10,000 characters and `eleven_v3` allowed 5,000.

## Speech attributions

When each character has a distinct voice, bare attributions such as "he said" or "I asked him" repeat what the voice change already signals. The user preferred the version with them removed, including the narrator's own "I said". `--strip-attributions` removes them and changes the quote's closing comma to a period.

- Keep attributions that carry information beyond who spoke. Cut leftover fragments such as "Sharply." when a tag already conveys them.
- Removing attributions changes the source text. Apply it only to the audio script, and only when the user wants it. Keep the word-preserving enhanced text as the master copy.

## Verify the audio

Transcribe the result with `elevenlabs speech-to-text convert --file scene.mp3 --model-id scribe_v1 --tag-audio-events false --query text --format raw`. Compare the word count and the final sentence with the input. A tag word in the transcript that does not appear in the source text means the model read the tag aloud.
