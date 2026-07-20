#!/bin/bash
# Bootstrap script for agent-templates
# Clones the repo (if needed) and links all agent configurations

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Check if this script is being run from the repo
if [[ -d "scripts/link-agent-templates" && -f "AGENTS.md" ]]; then
    AGENT_TEMPLATES_DIR="$(pwd)"
    log_info "Running from existing agent-templates directory: $AGENT_TEMPLATES_DIR"
else
    # Default location
    AGENT_TEMPLATES_DIR="$HOME/Projects/agent-templates"

    if [[ -d "$AGENT_TEMPLATES_DIR" ]]; then
        log_info "Agent templates exists at: $AGENT_TEMPLATES_DIR"
    else
        log_info "Cloning agent-templates to: $AGENT_TEMPLATES_DIR"
        git clone https://github.com/BumpyClock/agent-templates.git "$AGENT_TEMPLATES_DIR"
    fi
fi

cd "$AGENT_TEMPLATES_DIR"

# Check for bun
if ! command -v bun &> /dev/null; then
    log_error "bun is not installed. Please install bun first:"
    echo "  curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

# Install dependencies for the linker
if [[ ! -d "scripts/link-agent-templates/node_modules" ]]; then
    log_info "Installing linker dependencies..."
    cd scripts/link-agent-templates
    bun install
    cd "$AGENT_TEMPLATES_DIR"
fi

# Compile agent templates into per-tool formats (dist/). dist/ is gitignored, so
# a fresh clone has none; without this the linker silently skips every tool's
# agents/ link and no agents get installed.
log_info "Compiling agent templates..."
if [[ ! -d "agent-templates/scripts/node_modules" ]]; then
    (cd agent-templates/scripts && bun install)
fi
(cd agent-templates/scripts && bun run compile-agents)

# Parse arguments
SETUP_MODE="${1:-all}"

# Validate setup mode
VALID_MODES=("claude" "codex" "copilot" "opencode" "pi" "all")
if [[ ! " ${VALID_MODES[@]} " =~ " ${SETUP_MODE} " ]]; then
    log_error "Invalid setup mode: $SETUP_MODE"
    echo "Valid modes: ${VALID_MODES[*]}"
    exit 1
fi

log_info "Linking agent templates for: $SETUP_MODE"

# Run the linker
bun scripts/link-agent-templates/link-agent-templates.ts \
    --agent-templates-dir "$AGENT_TEMPLATES_DIR" \
    --setup "$SETUP_MODE"

log_info "Agent templates bootstrap complete!"
echo ""
echo "Next steps:"
echo "  1. Restart your AI tools to pick up the new configurations"
echo "  2. To re-link: cd $AGENT_TEMPLATES_DIR && bun scripts/link-agent-templates/link-agent-templates.ts --setup all"
echo "  3. To update: cd $AGENT_TEMPLATES_DIR && git pull"
