"""Check that enhanced TTS text keeps the source words, in order.

Usage:
  python -I verify_preserved.py SOURCE ENHANCED   # two files, or two directories paired by file name

Tags (`[...]`), `## ` headings, and `***` scene breaks are ignored. Case and punctuation are
ignored, so sentence-casing and added `!`, `?`, or `...` pass. For each pair it also reports
curly-quote balance and stacked tag groups per 100 words. Exits 1 when any pair fails.
"""
import re
import sys
from pathlib import Path

TAG = re.compile(r"\[[^\]]*\]")


def words(text):
    text = re.sub(r"^#+ .*$", " ", text, flags=re.M)
    text = TAG.sub(" ", text).replace("***", " ")
    return re.findall(r"[a-z0-9]+", text.lower())


def check(src, enh):
    s, e = src.read_text(encoding="utf-8"), enh.read_text(encoding="utf-8")
    a, b = words(s), words(e)
    n = max(len(a), 1)
    stacked = len(re.findall(r"\]\s*\[", e)) * 100 / n
    quotes = "ok" if e.count("“") == e.count("”") else f"unbalanced {e.count('“')}/{e.count('”')}"
    if a == b:
        print(f"OK   {enh.name}: {len(a)} words, stacked/100w={stacked:.1f}, quotes {quotes}")
        return True
    i = next((k for k in range(min(len(a), len(b))) if a[k] != b[k]), min(len(a), len(b)))
    print(f"FAIL {enh.name}: source={len(a)} enhanced={len(b)} first difference at word {i}\n"
          f"     source:   {' '.join(a[i:i + 10])}\n     enhanced: {' '.join(b[i:i + 10])}")
    return False


src, enh = Path(sys.argv[1]), Path(sys.argv[2])
pairs = [(f, enh / f.name) for f in sorted(src.glob("*.md"))] if src.is_dir() else [(src, enh)]
failed = 0
for s, e in pairs:
    if not e.exists():
        print(f"MISSING {e.name}")
        failed += 1
    elif not check(s, e):
        failed += 1
print(f"checked={len(pairs)} failed={failed}")
sys.exit(1 if failed else 0)
