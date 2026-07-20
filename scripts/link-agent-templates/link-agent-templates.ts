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
	agentTemplatesDir: string;
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
	let agentTemplatesDir = process.cwd();
	let setupMode: AgentTool = "all";
	let show = false;

	for (let i = 0; i < argv.length; i += 1) {
		const arg = argv[i];

		if (arg === "--agent-templates-dir") {
			const value = argv[i + 1];
			if (!value) {
				throw new Error("Missing value for --agent-templates-dir");
			}
			agentTemplatesDir = value;
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
		agentTemplatesDir: path.resolve(agentTemplatesDir),
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
	templatesDir: string,
	sourceRelative: string,
	targetPath: string,
): Promise<void> {
	const sourcePath = path.join(templatesDir, sourceRelative);
	if (!(await pathExists(sourcePath))) {
		return;
	}

	await ensureLinked(sourcePath, targetPath);
}

// =============================================================================
// Claude Code linking
// =============================================================================

async function linkClaude(agentTemplatesDir: string): Promise<void> {
	info("Linking Claude Code agent templates...");

	const claudeRoot = homePath(".claude");
	await mkdir(claudeRoot, { recursive: true });

	await linkIfPresent(
		agentTemplatesDir,
		"prompts",
		path.join(claudeRoot, "commands"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"skills",
		path.join(claudeRoot, "skills"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"docs",
		path.join(claudeRoot, "docs"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"defaults/AGENTS.md",
		path.join(claudeRoot, "CLAUDE.md"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"defaults/AGENTS.local.md",
		path.join(claudeRoot, "AGENTS.local.md"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"tools.md",
		path.join(claudeRoot, "tools.md"),
	);

	// Link compiled agents from agent-templates
	const agentsSource = path.join(
		agentTemplatesDir,
		"agent-templates/dist/claude",
	);
	const agentsTarget = path.join(claudeRoot, "agents");
	if (await pathExists(agentsSource)) {
		await ensureLinked(agentsSource, agentsTarget);
	}

	// Link settings.json
	const settingsSource = path.join(agentTemplatesDir, ".claude/settings.json");
	const settingsTarget = path.join(claudeRoot, "settings.json");
	if (await pathExists(settingsSource)) {
		await ensureLinked(settingsSource, settingsTarget);
	}
}

// =============================================================================
// Codex linking
// =============================================================================

async function linkCodex(agentTemplatesDir: string): Promise<void> {
	info("Linking Codex agent templates...");

	const codexRoot = homePath(".codex");
	await mkdir(codexRoot, { recursive: true });

	await linkIfPresent(
		agentTemplatesDir,
		"prompts",
		path.join(codexRoot, "prompts"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"skills",
		path.join(codexRoot, "skills"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"docs",
		path.join(codexRoot, "docs"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"defaults/AGENTS.md",
		path.join(codexRoot, "AGENTS.md"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"defaults/AGENTS.local.md",
		path.join(codexRoot, "AGENTS.local.md"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"tools.md",
		path.join(codexRoot, "tools.md"),
	);

	// Link compiled agents
	const agentsSource = path.join(
		agentTemplatesDir,
		"agent-templates/dist/codex",
	);
	const agentsTarget = path.join(codexRoot, "agents");
	if (await pathExists(agentsSource)) {
		await ensureLinked(agentsSource, agentsTarget);
	}

	// Link hooks.json
	const hooksSource = path.join(agentTemplatesDir, ".codex/hooks.json");
	const hooksTarget = path.join(codexRoot, "hooks.json");
	if (await pathExists(hooksSource)) {
		await ensureLinked(hooksSource, hooksTarget);
	}
}

// =============================================================================
// GitHub Copilot linking
// =============================================================================

async function linkCopilot(agentTemplatesDir: string): Promise<void> {
	info("Linking GitHub Copilot agent templates...");

	const copilotRoot = homePath(".copilot");
	await mkdir(copilotRoot, { recursive: true });

	await linkIfPresent(
		agentTemplatesDir,
		"prompts",
		path.join(copilotRoot, "prompts"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"skills",
		path.join(copilotRoot, "skills"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"docs",
		path.join(copilotRoot, "docs"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"defaults/AGENTS.md",
		path.join(copilotRoot, "copilot-instructions.md"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"defaults/AGENTS.local.md",
		path.join(copilotRoot, "AGENTS.local.md"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"tools.md",
		path.join(copilotRoot, "tools.md"),
	);

	// Link compiled agents
	const agentsSource = path.join(
		agentTemplatesDir,
		"agent-templates/dist/copilot",
	);
	const agentsTarget = path.join(copilotRoot, "agents");
	if (await pathExists(agentsSource)) {
		await ensureLinked(agentsSource, agentsTarget);
	}

	// Link hooks directory
	const hooksSource = path.join(agentTemplatesDir, ".copilot/hooks");
	const hooksTarget = path.join(copilotRoot, "hooks");
	if (await pathExists(hooksSource)) {
		await ensureLinked(hooksSource, hooksTarget);
	}
}

// =============================================================================
// OpenCode linking
// =============================================================================

async function linkOpencode(agentTemplatesDir: string): Promise<void> {
	info("Linking OpenCode agent templates...");

	const opencodeRoot = homePath(".config/opencode");
	await mkdir(opencodeRoot, { recursive: true });

	await linkIfPresent(
		agentTemplatesDir,
		"prompts",
		path.join(opencodeRoot, "commands"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"skills",
		path.join(opencodeRoot, "skills"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"tools.md",
		path.join(opencodeRoot, "tools.md"),
	);

	// Link compiled agents
	const agentsSource = path.join(
		agentTemplatesDir,
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

async function linkPi(agentTemplatesDir: string): Promise<void> {
	info("Linking Pi agent templates...");

	const piRoot = homePath(".pi/agent");
	await mkdir(piRoot, { recursive: true });

	await linkIfPresent(
		agentTemplatesDir,
		"defaults/AGENTS.md",
		path.join(piRoot, "AGENTS.md"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"defaults/AGENTS.local.md",
		path.join(piRoot, "AGENTS.local.md"),
	);

	// Link settings files
	const settingsSource = path.join(agentTemplatesDir, ".pi/agent/settings.json");
	const settingsTarget = path.join(piRoot, "settings.json");
	if (await pathExists(settingsSource)) {
		await ensureLinked(settingsSource, settingsTarget);
	}

	const modelsSource = path.join(agentTemplatesDir, ".pi/agent/models.json");
	const modelsTarget = path.join(piRoot, "models.json");
	if (await pathExists(modelsSource)) {
		await ensureLinked(modelsSource, modelsTarget);
	}

	const cloakSource = path.join(agentTemplatesDir, ".pi/agent/cloak.json");
	const cloakTarget = path.join(piRoot, "cloak.json");
	if (await pathExists(cloakSource)) {
		await ensureLinked(cloakSource, cloakTarget);
	}

	// Link compiled agents
	const agentsSource = path.join(
		agentTemplatesDir,
		"agent-templates/dist/pi",
	);
	const agentsTarget = path.join(piRoot, "agents");
	if (await pathExists(agentsSource)) {
		await ensureLinked(agentsSource, agentsTarget);
	}

	// Link extensions
	const extensionsSource = path.join(agentTemplatesDir, ".pi/agent/extensions");
	const extensionsTarget = path.join(piRoot, "extensions");
	if (await pathExists(extensionsSource)) {
		await ensureLinked(extensionsSource, extensionsTarget);
	}

	// Link themes
	const themesSource = path.join(agentTemplatesDir, ".pi/agent/themes");
	const themesTarget = path.join(piRoot, "themes");
	if (await pathExists(themesSource)) {
		await ensureLinked(themesSource, themesTarget);
	}
}

// =============================================================================
// Generic .agents linking (shared personalities and prompts)
// =============================================================================

async function linkAgentsShared(agentTemplatesDir: string): Promise<void> {
	info("Linking shared .agents directory...");

	const agentsRoot = homePath(".agents");
	await mkdir(agentsRoot, { recursive: true });

	await linkIfPresent(
		agentTemplatesDir,
		"prompts",
		path.join(agentsRoot, "prompts"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"personalities",
		path.join(agentsRoot, "personalities"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"defaults/AGENTS.md",
		path.join(agentsRoot, "AGENTS.md"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"defaults/AGENTS.local.md",
		path.join(agentsRoot, "AGENTS.local.md"),
	);
	await linkIfPresent(
		agentTemplatesDir,
		"tools.md",
		path.join(agentsRoot, "tools.md"),
	);
	await linkIfPresent(
		agentTemplatesDir,
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
		await linkClaude(options.agentTemplatesDir);
	}

	if (mode === "codex" || mode === "all") {
		await linkCodex(options.agentTemplatesDir);
	}

	if (mode === "copilot" || mode === "all") {
		await linkCopilot(options.agentTemplatesDir);
	}

	if (mode === "opencode" || mode === "all") {
		await linkOpencode(options.agentTemplatesDir);
	}

	if (mode === "pi" || mode === "all") {
		await linkPi(options.agentTemplatesDir);
	}

	if (mode === "all") {
		await linkAgentsShared(options.agentTemplatesDir);
	}

	info("Agent templates linking completed");
}

if (import.meta.main) {
	main().catch((error) => {
		console.error("link-agent-templates failed:", error);
		process.exit(1);
	});
}
