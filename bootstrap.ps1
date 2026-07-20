# Bootstrap script for agent-templates on Windows
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
if ((Test-Path "scripts\link-agent-templates") -and (Test-Path "AGENTS.md")) {
    $AgentTemplatesDir = $CurrentDir.Path
    Write-Info "Running from existing agent-templates directory: $AgentTemplatesDir"
}
else {
    # Default location
    $AgentTemplatesDir = Join-Path $env:USERPROFILE "Projects\agent-templates"

    if (Test-Path $AgentTemplatesDir) {
        Write-Info "Agent templates exists at: $AgentTemplatesDir"
    }
    else {
        Write-Info "Cloning agent-templates to: $AgentTemplatesDir"
        git clone https://github.com/BumpyClock/agent-templates.git $AgentTemplatesDir
    }
}

Set-Location $AgentTemplatesDir

# Check for bun
if (-not (Get-Command bun -ErrorAction SilentlyContinue)) {
    Write-Error-Message "bun is not installed. Please install bun first:"
    Write-Host "  irm bun.sh | iex" -ForegroundColor Yellow
    exit 1
}

# Install dependencies for the linker
if (-not (Test-Path "scripts\link-agent-templates\node_modules")) {
    Write-Info "Installing linker dependencies..."
    Set-Location scripts\link-agent-templates
    bun install
    Set-Location $AgentTemplatesDir
}

Write-Info "Linking agent templates for: $SetupMode"

# Run the linker
bun scripts\link-agent-templates\link-agent-templates.ts `
    --agent-templates-dir $AgentTemplatesDir `
    --setup $SetupMode

Write-Info "Agent templates bootstrap complete!"
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Restart your AI tools to pick up the new configurations"
Write-Host "  2. To re-link: cd $AgentTemplatesDir; bun scripts\link-agent-templates\link-agent-templates.ts --setup all"
Write-Host "  3. To update: cd $AgentTemplatesDir; git pull"
