"""Build an ElevenLabs text-to-dialogue request body from a tagged scene.

Usage:
  python -I build_dialogue.py SCENE.md CAST.json OUT.json [--strip-attributions]
  elevenlabs text-to-dialogue convert --json - -o scene.mp3 < OUT.json

CAST.json:
  {
    "model_id": "eleven_v4_turbo",
    "narrator": "N",
    "voices": {"N": "<voice id>", "K": "<voice id>"},
    "speakers": {"6": "K", "8": "K"}
  }

`speakers` maps a 1-based paragraph number to the speaker of the quoted lines in that paragraph.
Unlisted paragraphs, and all text outside quotes, use the narrator voice. In first-person books
the narrator voice also speaks the protagonist's lines.

--strip-attributions removes a bare attribution right after a quote ("he said.", "I asked him.",
"Mary whispered,") and turns the quote's closing comma into a period. Review the output: it
can leave fragments such as "Sharply." that need a manual cut.
"""
import json
import re
import sys

scene, cast_path, out = sys.argv[1:4]
strip = "--strip-attributions" in sys.argv
cast = json.load(open(cast_path, encoding="utf-8"))
narrator = cast["narrator"]
voices = cast["voices"]
speakers = {int(k): v for k, v in cast.get("speakers", {}).items()}

QUOTE = re.compile(r"(?:\[[^\]]*\]\s*)*“[^”]*”")
SAY = r"(?:said|asked|whispered|shouted|called|told|replied|answered|muttered|cackled|snapped)"
ATTRIB = re.compile(
    r"\s*(?:he|she|they|I|we|the [a-z]+(?: [a-z]+)?|[A-Z][a-z]+(?: [A-Z][a-z]+)?)\s+" + SAY
    + r"(?:\s+(?:me|him|her|them|us|again|after me|after him|quietly|softly))*\s*[.,]\s*")

paras = [p.strip() for p in open(scene, encoding="utf-8").read().split("\n\n") if p.strip()]
segments = []
for number, para in enumerate(paras, 1):
    who, pos = speakers.get(number, narrator), 0
    for m in QUOTE.finditer(para):
        segments.append((narrator, para[pos:m.start()]))
        quote, pos = m.group(), m.end()
        if strip:
            a = ATTRIB.match(para, pos)
            if a:
                pos = a.end()
                quote = re.sub(r",”$", ".”", quote)
        segments.append((who, quote))
    segments.append((narrator, para[pos:] + "\n\n"))

merged = []
for who, text in segments:
    if not text.strip():
        if merged and text:
            merged[-1][1] += text
        continue
    if merged and merged[-1][0] == who:
        merged[-1][1] = merged[-1][1].rstrip(" ") + " " + text.strip(" ")
    else:
        merged.append([who, text.strip(" ")])

inputs = [{"text": t.strip(), "voice_id": voices[w]} for w, t in merged if t.strip()]
body = {"model_id": cast.get("model_id", "eleven_v4_turbo"), "inputs": inputs}
json.dump(body, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
chars = sum(len(x["text"]) for x in inputs)
print(f"{len(inputs)} segments, {chars} characters")
