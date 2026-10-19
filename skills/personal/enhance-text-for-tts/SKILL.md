---
name: enhance-text-for-tts
description: "Add audio tags and emphasis to text before text-to-speech generation. Use for voice notes, stories, audiobooks, multi-voice dialogue, or audible notifications."
---

# Enhance Text for TTS

Enhance text so expressive TTS models such as ElevenLabs `eleven_v4_turbo` deliver it with natural emotion, pacing, and emphasis. Generate the audio with the `elevenlabs` cli or `sag` cli.

## How to enhance

- Read the [guidelines](references/guidelines.md) first. They cover text preservation, tag placement, workflow, and output rules.
- Choose tags that fit the surrounding context, so the speech matches the content, context, and flow.
- Stack multiple tags in a row and intersperse them through the text for expressive speech.
- Tags describe the voice only. Replace visual tags such as `[frowning]` or `[smirking]` with a voice tag.
- Use audio tags such as `[whispers]` and `[short pause]` for v3 and v4 models. Use SSML `<break time="1.5s" />` for v2 and v2.5 models instead; v3 does not support it.
- Keep every source word in order. Check it with `scripts/verify_preserved.py SOURCE ENHANCED` before generating audio.

## References

Load only the references relevant to the requested delivery. Examples illustrate delivery patterns; do not copy their dialogue into unrelated requests.

- [Audio tags and tips](references/audio-tags.md). Read when selecting tags, matching a voice, or combining delivery cues.
- [Enhancement examples](references/enhancement-examples.md). Read for short input and output pairs showing tag placement.
- [Voice acting](references/voice-acting.md). Read for character performances with changing emotion and intensity.
- [Long form narration](references/long-form-narration.md). Read for story narration with pacing, tension, and reflection.
- [Glitch comedy](references/glitch-comedy.md). Read for comic dialogue using interrupted words and robotic delivery.
- [Overlapping timing](references/overlapping-timing.md). Read for interruptions and overlapping dialogue between speakers.
- [Dialogue showcase](references/dialogue-showcase.md). Read for conversational exchanges demonstrating varied vocal expression.
- [Long-form books](references/long-form-books.md). Read when enhancing a book, an EPUB, or text split across parallel workers.
- [Multi-voice dialogue](references/multi-voice-dialogue.md). Read when casting voices per character or generating a scene with `text-to-dialogue`.
