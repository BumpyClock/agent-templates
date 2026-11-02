#!/usr/bin/env python3
"""Check the public Pi config without printing potential secret values."""

import json
from pathlib import Path
import re
import sys

PUBLIC_URLS = {
    "https://raw.githubusercontent.com/earendil-works/pi/main/packages/coding-agent/src/modes/interactive/theme/theme-schema.json",
}
ENV_REFERENCE = re.compile(r"\$(?:[A-Z_][A-Z0-9_]*|\{[A-Z_][A-Z0-9_]*\})\Z")
CREDENTIAL_FIELD = re.compile(
    r"(?:api[_-]?key|authorization|access[_-]?token|refresh[_-]?token|"
    r"client[_-]?secret|secret|password|token)\Z", re.IGNORECASE
)
SECRET_PATTERN = re.compile(
    r"-----BEGIN (?:[A-Z]+ )?PRIVATE KEY-----|"
    r"\b(?:sk-[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|"
    r"github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}|"
    r"AIza[A-Za-z0-9_-]{30,}|AKIA[0-9A-Z]{16})\b"
)
URL_PATTERN = re.compile(r"(?:https?|wss?)://[^\s\"'<>`]+")
LOCAL_FILES = {
    "auth.json", "models-store.json", "mcp-cache.json", "mcp-npx-cache.json",
    "trust.json",
}
LOCAL_DIRS = {"sessions", "npm", "node_modules", "tmp", "pi-subagents"}


def check(root: Path) -> list[str]:
    errors = []
    if not root.is_dir():
        return ["Pi config directory is missing"]

    def check_fields(value, location):
        if isinstance(value, dict):
            for key, child in value.items():
                field = f"{location}.{key}"
                if CREDENTIAL_FIELD.fullmatch(key) or key == "baseUrl":
                    if not isinstance(child, str) or not ENV_REFERENCE.fullmatch(child):
                        errors.append(f"{field}: connection value must be an environment reference")
                elif key.lower() == "headers" and isinstance(child, dict):
                    for header_value in child.values():
                        if not isinstance(header_value, str) or not ENV_REFERENCE.fullmatch(header_value):
                            errors.append(f"{field}: header must be an environment reference")
                else:
                    check_fields(child, field)
        elif isinstance(value, list):
            for index, child in enumerate(value):
                check_fields(child, f"{location}[{index}]")

    for path in sorted(root.rglob("*")):
        relative = path.relative_to(root)
        location = str(relative)
        if path.is_symlink():
            errors.append(f"{location}: symlink is not allowed in public config")
            continue
        if path.is_dir():
            continue
        if (path.name in LOCAL_FILES or any(part in LOCAL_DIRS for part in relative.parts)
                or path.name.startswith(("cliproxyapi", ".env"))
                or ".backup" in path.name or ".local." in path.name):
            errors.append(f"{location}: machine-local file is not allowed")
            continue
        try:
            text = path.read_text()
        except UnicodeError:
            errors.append(f"{location}: non-text file needs manual review")
            continue
        for number, line in enumerate(text.splitlines(), 1):
            if SECRET_PATTERN.search(line):
                errors.append(f"{location}:{number}: secret-shaped value")
            if any(url not in PUBLIC_URLS for url in URL_PATTERN.findall(line)):
                errors.append(f"{location}:{number}: URL is not on the reviewed public allowlist")
        if path.suffix == ".json":
            try:
                check_fields(json.loads(text), location)
            except json.JSONDecodeError:
                errors.append(f"{location}: invalid JSON")
    return errors


if __name__ == "__main__":
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parents[1] / ".pi"
    findings = check(root)
    if findings:
        print("\n".join(findings), file=sys.stderr)
        sys.exit(1)
    print("Public Pi config checks passed. No credential literals or unreviewed URLs found.")
