#!/bin/bash
# Bootstrap script for agent-workspace
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
if [[ -d "scripts/link-agent-workspace" && -f "AGENTS.md" ]]; then
    AGENT_WORKSPACE_DIR="$(pwd)"
    log_info "Running from existing agent-workspace directory: $AGENT_WORKSPACE_DIR"
else
    # Default location
    AGENT_WORKSPACE_DIR="$HOME/Projects/agent-workspace"

    if [[ -d "$AGENT_WORKSPACE_DIR" ]]; then
        log_info "Agent workspace exists at: $AGENT_WORKSPACE_DIR"
    else
        log_info "Cloning agent-workspace to: $AGENT_WORKSPACE_DIR"
        git clone https://github.com/BumpyClock/agent-workspace.git "$AGENT_WORKSPACE_DIR"
    fi
fi

cd "$AGENT_WORKSPACE_DIR"

# Check for bun
if ! command -v bun &> /dev/null; then
    log_error "bun is not installed. Please install bun first:"
    echo "  curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

# Install dependencies for the linker
if [[ ! -d "scripts/link-agent-workspace/node_modules" ]]; then
    log_info "Installing linker dependencies..."
    cd scripts/link-agent-workspace
    bun install
    cd "$AGENT_WORKSPACE_DIR"
fi

# Parse arguments
SETUP_MODE="${1:-all}"

# Validate setup mode
VALID_MODES=("claude" "codex" "copilot" "opencode" "pi" "all")
if [[ ! " ${VALID_MODES[@]} " =~ " ${SETUP_MODE} " ]]; then
    log_error "Invalid setup mode: $SETUP_MODE"
    echo "Valid modes: ${VALID_MODES[*]}"
    exit 1
fi

log_info "Linking agent workspace for: $SETUP_MODE"

# Run the linker
bun scripts/link-agent-workspace/link-agent-workspace.ts \
    --agent-workspace-dir "$AGENT_WORKSPACE_DIR" \
    --setup "$SETUP_MODE"

log_info "Agent workspace bootstrap complete!"
echo ""
echo "Next steps:"
echo "  1. Restart your AI tools to pick up the new configurations"
echo "  2. To re-link: cd $AGENT_WORKSPACE_DIR && bun scripts/link-agent-workspace/link-agent-workspace.ts --setup all"
echo "  3. To update: cd $AGENT_WORKSPACE_DIR && git pull"
