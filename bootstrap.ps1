# Bootstrap script for agent-workspace on Windows
# Clones the repo (if needed) and links all agent configurations

[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [ValidateSet("claude", "codex", "copilot", "opencode", "pi", "all")]
    [string]$SetupMode = "all"
)

$ErrorActionPreference = "Stop"

# Helper functions
function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

function Write-Error-Message {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Write-Warn {
    param([string]$Message)
    Write-Host "[WARN] $Message" -ForegroundColor Yellow
}

# Check if running from the repo
$CurrentDir = Get-Location
if ((Test-Path "scripts\link-agent-workspace") -and (Test-Path "AGENTS.md")) {
    $AgentWorkspaceDir = $CurrentDir.Path
    Write-Info "Running from existing agent-workspace directory: $AgentWorkspaceDir"
}
else {
    # Default location
    $AgentWorkspaceDir = Join-Path $env:USERPROFILE "Projects\agent-workspace"

    if (Test-Path $AgentWorkspaceDir) {
        Write-Info "Agent workspace exists at: $AgentWorkspaceDir"
    }
    else {
        Write-Info "Cloning agent-workspace to: $AgentWorkspaceDir"
        git clone https://github.com/BumpyClock/agent-workspace.git $AgentWorkspaceDir
    }
}

Set-Location $AgentWorkspaceDir

# Check for bun
if (-not (Get-Command bun -ErrorAction SilentlyContinue)) {
    Write-Error-Message "bun is not installed. Please install bun first:"
    Write-Host "  irm bun.sh | iex" -ForegroundColor Yellow
    exit 1
}

# Install dependencies for the linker
if (-not (Test-Path "scripts\link-agent-workspace\node_modules")) {
    Write-Info "Installing linker dependencies..."
    Set-Location scripts\link-agent-workspace
    bun install
    Set-Location $AgentWorkspaceDir
}

Write-Info "Linking agent workspace for: $SetupMode"

# Run the linker
bun scripts\link-agent-workspace\link-agent-workspace.ts `
    --agent-workspace-dir $AgentWorkspaceDir `
    --setup $SetupMode

Write-Info "Agent workspace bootstrap complete!"
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Restart your AI tools to pick up the new configurations"
Write-Host "  2. To re-link: cd $AgentWorkspaceDir; bun scripts\link-agent-workspace\link-agent-workspace.ts --setup all"
Write-Host "  3. To update: cd $AgentWorkspaceDir; git pull"
