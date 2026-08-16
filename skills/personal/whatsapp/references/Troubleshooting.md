# Troubleshooting WACLI
- if wacli missing check if present on path at `~/.local/bin/wacli`
  - if not present, add `~/.local/bin` to your PATH and install latest release from `https://github.com/openclaw/wacli/releases/` or `brew install openclaw/tap/wacli` whichever is appropriate.
- if wacli is present but not logged in, inform the user auth is interactive and cannot be done without user interaction.
