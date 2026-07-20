import {
	mkdir,
	readlink,
	rm,
	lstat,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";

type AgentTool = "claude" | "codex" | "copilot" | "opencode" | "pi" | "all";

type CliOptions = {
	agentWorkspaceDir: string;
	setupMode: AgentTool;
	show: boolean;
};

function info(message: string): void {
	console.log(`[INFO] ${message}`);
}

function action(message: string): void {
	console.log(`[ACTION] ${message}`);
}

function parseArgs(argv: string[]): CliOptions {
	let agentWorkspaceDir = process.cwd();
	let setupMode: AgentTool = "all";
	let show = false;

	for (let i = 0; i < argv.length; i += 1) {
		const arg = argv[i];

		if (arg === "--agent-templates-dir") {
			const value = argv[i + 1];
			if (!value) {
				throw new Error("Missing value for --agent-templates-dir");
			}
			agentWorkspaceDir = value;
			i += 1;
			continue;
		}

		if (arg === "--setup") {
			const value = argv[i + 1] as AgentTool;
			if (
				!value ||
				!["claude", "codex", "copilot", "opencode", "pi", "all"].includes(
					value,
				)
			) {
				throw new Error(
					"--setup must be one of: claude, codex, copilot, opencode, pi, all",
				);
			}
			setupMode = value;
			i += 1;
			continue;
		}

		if (arg === "--show" || arg === "-s") {
			show = true;
			continue;
		}

		if (arg === "--help" || arg === "-h") {
			console.log(
				"Usage: bun scripts/link-agent-templates/link-agent-templates.ts [options]",
			);
			console.log("");
			console.log("Options:");
			console.log(
				"  --agent-templates-dir <path>  Agent templates repo root (default: cwd)",
			);
			console.log(
				"  --setup <tool>               Setup specific tool or 'all' (default: all)",
			);
			console.log("  --show, -s                    Show current link status");
			process.exit(0);
		}

		throw new Error(`Unknown argument: ${arg}`);
	}

	return {
		agentWorkspaceDir: path.resolve(agentWorkspaceDir),
		setupMode,
		show,
	};
}

function homePath(relativePath: string): string {
	return path.join(os.homedir(), relativePath);
}

async function pathExists(filePath: string): Promise<boolean> {
	try {
		await lstat(filePath);
		return true;
	} catch {
		return false;
	}
}

async function normalizeForCompare(filePath: string): Promise<string> {
	if (process.platform === "win32") {
		return filePath.toLowerCase();
	}
	return filePath;
}

async function getSymlinkTarget(
	symlinkPath: string,
): Promise<string | null> {
	try {
		const target = await readlink(symlinkPath);
		return target;
	} catch {
		return null;
	}
}

async function ensureLinked(
	sourcePath: string,
	targetPath: string,
): Promise<void> {
	const targetDir = path.dirname(targetPath);
	await mkdir(targetDir, { recursive: true });

	if (await pathExists(targetPath)) {
		const stat = await lstat(targetPath);
		if (stat.isSymbolicLink()) {
			const existingTarget = await getSymlinkTarget(targetPath);
			if (existingTarget) {
				const normalizedExisting = await normalizeForCompare(existingTarget);
				const normalizedSource = await normalizeForCompare(sourcePath);
				if (normalizedExisting === normalizedSource) {
					// Already linked correctly
					return;
				}
			}
			// Wrong symlink target, remove and recreate
			await rm(targetPath, { force: true });
		} else {
			// Regular file or directory exists, remove it
			await rm(targetPath, { force: true, recursive: true });
		}
	}

	// Create the symlink
	const relativeSource = path.relative(targetDir, sourcePath);
	const proc = Bun.spawn(["ln", "-s", relativeSource, targetPath], {
		stdin: "inherit",
		stdout: "inherit",
		stderr: "inherit",
	});
	const exitCode = await proc.exited;
	if (exitCode !== 0) {
		throw new Error(`Failed to create symlink: ${targetPath} -> ${sourcePath}`);
	}
	action(`Linked: ${targetPath} -> ${sourcePath}`);
}

async function linkIfPresent(
	workspaceDir: string,
	sourceRelative: string,
	targetPath: string,
): Promise<void> {
	const sourcePath = path.join(workspaceDir, sourceRelative);
	if (!(await pathExists(sourcePath))) {
		return;
	}

	await ensureLinked(sourcePath, targetPath);
}

// =============================================================================
// Claude Code linking
// =============================================================================

async function linkClaude(agentWorkspaceDir: string): Promise<void> {
	info("Linking Claude Code agent templates...");

	const claudeRoot = homePath(".claude");
	await mkdir(claudeRoot, { recursive: true });

	await linkIfPresent(
		agentWorkspaceDir,
		"prompts",
		path.join(claudeRoot, "commands"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"skills",
		path.join(claudeRoot, "skills"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"docs",
		path.join(claudeRoot, "docs"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"defaults/AGENTS.md",
		path.join(claudeRoot, "CLAUDE.md"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"defaults/AGENTS.local.md",
		path.join(claudeRoot, "AGENTS.local.md"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"tools.md",
		path.join(claudeRoot, "tools.md"),
	);

	// Link compiled agents from agent-templates
	const agentsSource = path.join(
		agentWorkspaceDir,
		"agent-templates/dist/claude",
	);
	const agentsTarget = path.join(claudeRoot, "agents");
	if (await pathExists(agentsSource)) {
		await ensureLinked(agentsSource, agentsTarget);
	}

	// Link settings.json
	const settingsSource = path.join(agentWorkspaceDir, ".claude/settings.json");
	const settingsTarget = path.join(claudeRoot, "settings.json");
	if (await pathExists(settingsSource)) {
		await ensureLinked(settingsSource, settingsTarget);
	}
}

// =============================================================================
// Codex linking
// =============================================================================

async function linkCodex(agentWorkspaceDir: string): Promise<void> {
	info("Linking Codex agent templates...");

	const codexRoot = homePath(".codex");
	await mkdir(codexRoot, { recursive: true });

	await linkIfPresent(
		agentWorkspaceDir,
		"prompts",
		path.join(codexRoot, "prompts"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"skills",
		path.join(codexRoot, "skills"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"docs",
		path.join(codexRoot, "docs"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"defaults/AGENTS.md",
		path.join(codexRoot, "AGENTS.md"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"defaults/AGENTS.local.md",
		path.join(codexRoot, "AGENTS.local.md"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"tools.md",
		path.join(codexRoot, "tools.md"),
	);

	// Link compiled agents
	const agentsSource = path.join(
		agentWorkspaceDir,
		"agent-templates/dist/codex",
	);
	const agentsTarget = path.join(codexRoot, "agents");
	if (await pathExists(agentsSource)) {
		await ensureLinked(agentsSource, agentsTarget);
	}

	// Link hooks.json
	const hooksSource = path.join(agentWorkspaceDir, ".codex/hooks.json");
	const hooksTarget = path.join(codexRoot, "hooks.json");
	if (await pathExists(hooksSource)) {
		await ensureLinked(hooksSource, hooksTarget);
	}
}

// =============================================================================
// GitHub Copilot linking
// =============================================================================

async function linkCopilot(agentWorkspaceDir: string): Promise<void> {
	info("Linking GitHub Copilot agent templates...");

	const copilotRoot = homePath(".copilot");
	await mkdir(copilotRoot, { recursive: true });

	await linkIfPresent(
		agentWorkspaceDir,
		"prompts",
		path.join(copilotRoot, "prompts"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"skills",
		path.join(copilotRoot, "skills"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"docs",
		path.join(copilotRoot, "docs"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"defaults/AGENTS.md",
		path.join(copilotRoot, "copilot-instructions.md"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"defaults/AGENTS.local.md",
		path.join(copilotRoot, "AGENTS.local.md"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"tools.md",
		path.join(copilotRoot, "tools.md"),
	);

	// Link compiled agents
	const agentsSource = path.join(
		agentWorkspaceDir,
		"agent-templates/dist/copilot",
	);
	const agentsTarget = path.join(copilotRoot, "agents");
	if (await pathExists(agentsSource)) {
		await ensureLinked(agentsSource, agentsTarget);
	}

	// Link hooks directory
	const hooksSource = path.join(agentWorkspaceDir, ".copilot/hooks");
	const hooksTarget = path.join(copilotRoot, "hooks");
	if (await pathExists(hooksSource)) {
		await ensureLinked(hooksSource, hooksTarget);
	}
}

// =============================================================================
// OpenCode linking
// =============================================================================

async function linkOpencode(agentWorkspaceDir: string): Promise<void> {
	info("Linking OpenCode agent templates...");

	const opencodeRoot = homePath(".config/opencode");
	await mkdir(opencodeRoot, { recursive: true });

	await linkIfPresent(
		agentWorkspaceDir,
		"prompts",
		path.join(opencodeRoot, "commands"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"skills",
		path.join(opencodeRoot, "skills"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"tools.md",
		path.join(opencodeRoot, "tools.md"),
	);

	// Link compiled agents
	const agentsSource = path.join(
		agentWorkspaceDir,
		"agent-templates/dist/opencode",
	);
	const agentsTarget = path.join(opencodeRoot, "agents");
	if (await pathExists(agentsSource)) {
		await ensureLinked(agentsSource, agentsTarget);
	}
}

// =============================================================================
// Pi linking
// =============================================================================

async function linkPi(agentWorkspaceDir: string): Promise<void> {
	info("Linking Pi agent templates...");

	const piRoot = homePath(".pi/agent");
	await mkdir(piRoot, { recursive: true });

	await linkIfPresent(
		agentWorkspaceDir,
		"defaults/AGENTS.md",
		path.join(piRoot, "AGENTS.md"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"defaults/AGENTS.local.md",
		path.join(piRoot, "AGENTS.local.md"),
	);

	// Link settings files
	const settingsSource = path.join(agentWorkspaceDir, ".pi/agent/settings.json");
	const settingsTarget = path.join(piRoot, "settings.json");
	if (await pathExists(settingsSource)) {
		await ensureLinked(settingsSource, settingsTarget);
	}

	const modelsSource = path.join(agentWorkspaceDir, ".pi/agent/models.json");
	const modelsTarget = path.join(piRoot, "models.json");
	if (await pathExists(modelsSource)) {
		await ensureLinked(modelsSource, modelsTarget);
	}

	const cloakSource = path.join(agentWorkspaceDir, ".pi/agent/cloak.json");
	const cloakTarget = path.join(piRoot, "cloak.json");
	if (await pathExists(cloakSource)) {
		await ensureLinked(cloakSource, cloakTarget);
	}

	// Link compiled agents
	const agentsSource = path.join(
		agentWorkspaceDir,
		"agent-templates/dist/pi",
	);
	const agentsTarget = path.join(piRoot, "agents");
	if (await pathExists(agentsSource)) {
		await ensureLinked(agentsSource, agentsTarget);
	}

	// Link extensions
	const extensionsSource = path.join(agentWorkspaceDir, ".pi/agent/extensions");
	const extensionsTarget = path.join(piRoot, "extensions");
	if (await pathExists(extensionsSource)) {
		await ensureLinked(extensionsSource, extensionsTarget);
	}

	// Link themes
	const themesSource = path.join(agentWorkspaceDir, ".pi/agent/themes");
	const themesTarget = path.join(piRoot, "themes");
	if (await pathExists(themesSource)) {
		await ensureLinked(themesSource, themesTarget);
	}
}

// =============================================================================
// Generic .agents linking (shared personalities and prompts)
// =============================================================================

async function linkAgentsShared(agentWorkspaceDir: string): Promise<void> {
	info("Linking shared .agents directory...");

	const agentsRoot = homePath(".agents");
	await mkdir(agentsRoot, { recursive: true });

	await linkIfPresent(
		agentWorkspaceDir,
		"prompts",
		path.join(agentsRoot, "prompts"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"personalities",
		path.join(agentsRoot, "personalities"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"defaults/AGENTS.md",
		path.join(agentsRoot, "AGENTS.md"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"defaults/AGENTS.local.md",
		path.join(agentsRoot, "AGENTS.local.md"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"tools.md",
		path.join(agentsRoot, "tools.md"),
	);
	await linkIfPresent(
		agentWorkspaceDir,
		"skills",
		path.join(agentsRoot, "skills"),
	);
}

// =============================================================================
// Main entrypoint
// =============================================================================

async function main(): Promise<void> {
	const options = parseArgs(process.argv.slice(2));

	if (options.show) {
		info("Current link status:");
		// TODO: Implement show status
		return;
	}

	const mode = options.setupMode;

	if (mode === "claude" || mode === "all") {
		await linkClaude(options.agentWorkspaceDir);
	}

	if (mode === "codex" || mode === "all") {
		await linkCodex(options.agentWorkspaceDir);
	}

	if (mode === "copilot" || mode === "all") {
		await linkCopilot(options.agentWorkspaceDir);
	}

	if (mode === "opencode" || mode === "all") {
		await linkOpencode(options.agentWorkspaceDir);
	}

	if (mode === "pi" || mode === "all") {
		await linkPi(options.agentWorkspaceDir);
	}

	if (mode === "all") {
		await linkAgentsShared(options.agentWorkspaceDir);
	}

	info("Agent workspace linking completed");
}

if (import.meta.main) {
	main().catch((error) => {
		console.error("link-agent-templates failed:", error);
		process.exit(1);
	});
}
