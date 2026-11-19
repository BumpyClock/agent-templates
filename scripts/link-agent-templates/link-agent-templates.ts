import {
	mkdir,
	readdir,
	readFile,
	readlink,
	symlink,
	writeFile,
	lstat,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import readline from "node:readline/promises";
import { backupAndReplace, pruneBackups } from "./backups";
import {
	type ManagedBlockMarkers,
	reconcileManagedBlock,
} from "./managed-block";

type AgentTool =
	| "claude"
	| "codex"
	| "copilot"
	| "opencode"
	| "pi"
	| "cursor"
	| "all";

type InstructionHarness = "claude" | "codex" | "copilot" | "pi";

type CliOptions = {
	agentTemplatesDir: string;
	secretsDir: string;
	setupMode: AgentTool;
	show: boolean;
	prompt: boolean;
};

// The machine-local agent instructions file. The shared part lives in the
// private secrets repo and is written into defaults/AGENTS.local.md as a
// marker-delimited managed block on every run, so a secrets update reaches each
// device on its next link. Everything below the END marker is machine-local and
// is never touched. The file is gitignored in agent-templates and is what every
// tool's AGENTS.local.md links to.
const LOCAL_AGENTS_RELATIVE = "defaults/AGENTS.local.md";
const SECRETS_LOCAL_AGENTS_NAME = "AGENTS.local.md";
const LOCAL_AGENTS_MARKERS: ManagedBlockMarkers = {
	start:
		"<!-- BEGIN shared AGENTS.local.md. Synced from the dotfiles secrets repo by link-agent-templates. Edits inside this block are overwritten; put machine-specific rules below the END marker. -->",
	end: "<!-- END shared AGENTS.local.md -->",
};

function info(message: string): void {
	console.log(`[INFO] ${message}`);
}

function action(message: string): void {
	console.log(`[ACTION] ${message}`);
}

function warn(message: string): void {
	console.warn(`[WARN] ${message}`);
}

function defaultSecretsDir(): string {
	// The secrets submodule lives in the dotfiles repo, separate from this repo.
	// Prefer an explicit env override, else fall back to the conventional path.
	const fromEnv = process.env.DOTFILES_SECRETS_DIR;
	if (fromEnv) {
		return fromEnv;
	}
	return path.join(os.homedir(), "Projects", "dotfiles", "secrets");
}

function parseArgs(argv: string[]): CliOptions {
	let agentTemplatesDir = process.cwd();
	let secretsDir = defaultSecretsDir();
	let setupMode: AgentTool = "all";
	let show = false;
	let prompt = true;

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

		if (arg === "--secrets-dir") {
			const value = argv[i + 1];
			if (!value) {
				throw new Error("Missing value for --secrets-dir");
			}
			secretsDir = value;
			i += 1;
			continue;
		}

		if (arg === "--setup") {
			const value = argv[i + 1] as AgentTool;
			if (
				!value ||
				![
					"claude",
					"codex",
					"copilot",
					"opencode",
					"pi",
					"cursor",
					"all",
				].includes(value)
			) {
				throw new Error(
					"--setup must be one of: claude, codex, copilot, opencode, pi, cursor, all",
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

		if (arg === "--no-prompt") {
			prompt = false;
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
				"  --secrets-dir <path>          Dotfiles secrets dir holding the private",
			);
			console.log(
				"                                AGENTS.local.md baseline (default:",
			);
			console.log(
				"                                ~/Projects/dotfiles/secrets, or $DOTFILES_SECRETS_DIR)",
			);
			console.log(
				"  --setup <tool>               Setup specific tool or 'all' (default: all)",
			);
			console.log("  --show, -s                    Show current link status");
			console.log(
				"  --no-prompt                   Never prompt; skip when the",
			);
			console.log(
				"                                AGENTS.local.md baseline is missing",
			);
			process.exit(0);
		}

		throw new Error(`Unknown argument: ${arg}`);
	}

	return {
		agentTemplatesDir: path.resolve(agentTemplatesDir),
		secretsDir: path.resolve(secretsDir),
		setupMode,
		show,
		prompt,
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

async function createSymlink(
	sourcePath: string,
	targetPath: string,
): Promise<void> {
	const sourceIsDir = (await lstat(sourcePath)).isDirectory();

	if (process.platform === "win32") {
		try {
			await symlink(sourcePath, targetPath, sourceIsDir ? "dir" : "file");
		} catch (error) {
			if (!sourceIsDir) throw error;
			// Real symlinks need Windows Developer Mode (or elevation);
			// junctions work unprivileged for directories.
			await symlink(sourcePath, targetPath, "junction");
		}
		return;
	}

	await symlink(sourcePath, targetPath);
}

async function ensureLinked(
	sourcePath: string,
	targetPath: string,
	backupRoot?: string,
): Promise<void> {
	const targetDir = path.dirname(targetPath);
	await mkdir(targetDir, { recursive: true });

	if (await pathExists(targetPath)) {
		const stat = await lstat(targetPath);
		if (stat.isSymbolicLink()) {
			const existingTarget = await getSymlinkTarget(targetPath);
			if (existingTarget) {
				// Stored targets may be relative (symlinks) or absolute
				// (junctions); resolve before comparing against sourcePath.
				const resolvedExisting = path.resolve(targetDir, existingTarget);
				const normalizedExisting =
					await normalizeForCompare(resolvedExisting);
				const normalizedSource = await normalizeForCompare(sourcePath);
				if (normalizedExisting === normalizedSource) {
					// Already linked correctly
					return;
				}
			}
		}
		await backupAndReplace(
			targetPath,
			() => createSymlink(sourcePath, targetPath),
			backupRoot,
		);
	} else {
		await createSymlink(sourcePath, targetPath);
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

async function linkInstructions(
	templatesDir: string,
	harness: InstructionHarness,
	targetPath: string,
): Promise<void> {
	const baselinePath = path.join(templatesDir, "defaults/AGENTS.md");
	if (!(await pathExists(baselinePath))) return;

	const baseline = await readFile(baselinePath, "utf8");
	const overlayRelative = `defaults/harnesses/${harness}.md`;
	let overlay = "";
	try {
		overlay = await readFile(path.join(templatesDir, overlayRelative), "utf8");
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
	}

	const content =
		`<!-- Generated by scripts/link-agent-templates/link-agent-templates.ts.\n` +
		`Edit defaults/AGENTS.md and ${overlayRelative}, then rerun the linker. -->\n\n` +
		[baseline.trimEnd(), overlay.trim()].filter(Boolean).join("\n\n") + "\n";
	const generatedPath = path.join(templatesDir, "defaults/generated", `${harness}.md`);
	let previous: string | undefined;
	try {
		previous = await readFile(generatedPath, "utf8");
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
	}
	if (previous !== content) {
		await mkdir(path.dirname(generatedPath), { recursive: true });
		await writeFile(generatedPath, content);
		action(`Generated: ${generatedPath}`);
	}
	await ensureLinked(generatedPath, targetPath);
}

// =============================================================================
// Skill linking
// =============================================================================

// Discovery: a top-level dir with SKILL.md is a skill. A top-level dir without
// SKILL.md is a group; each child dir with SKILL.md is a skill. Dot dirs and
// plain files are skipped. Groups do not nest further.
async function discoverSkills(
	skillsDir: string,
): Promise<Map<string, string>> {
	const skills = new Map<string, string>();

	const addSkill = (name: string, sourcePath: string): void => {
		const existing = skills.get(name);
		if (existing) {
			throw new Error(
				`Skill name collision: "${name}" at ${existing} and ${sourcePath}`,
			);
		}
		skills.set(name, sourcePath);
	};

	const isSkill = (dir: string): Promise<boolean> =>
		pathExists(path.join(dir, "SKILL.md"));

	for (const entry of await readdir(skillsDir, { withFileTypes: true })) {
		if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
		const entryPath = path.join(skillsDir, entry.name);

		if (await isSkill(entryPath)) {
			addSkill(entry.name, entryPath);
			continue;
		}

		for (const child of await readdir(entryPath, { withFileTypes: true })) {
			if (!child.isDirectory() || child.name.startsWith(".")) continue;
			const childPath = path.join(entryPath, child.name);
			if (await isSkill(childPath)) {
				addSkill(child.name, childPath);
			}
		}
	}

	return skills;
}

export async function linkSkills(
	skillsDir: string,
	targetDir: string,
	layout: "flat" | "nested",
	backupRoot?: string,
): Promise<void> {
	if (!(await pathExists(skillsDir))) {
		return;
	}

	// Copilot discovers grouped skills recursively. Link each group intact so
	// relative references keep the source layout; Claude and Cursor stay flat.
	const skills =
		layout === "flat"
			? await discoverSkills(skillsDir)
			: new Map(
					(await readdir(skillsDir, { withFileTypes: true }))
						.filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
						.map((entry) => [entry.name, path.join(skillsDir, entry.name)]),
				);

	// The target may be a whole-dir symlink from an earlier layout. mkdir on a
	// symlink-to-dir succeeds silently, and every link created afterwards would
	// land inside the repo through it. Back up the link itself first, never its
	// contents.
	if (await pathExists(targetDir)) {
		const stat = await lstat(targetDir);
		if (stat.isSymbolicLink()) {
			await backupAndReplace(targetDir, async () => {
				await mkdir(targetDir, { recursive: true });
			}, backupRoot);
		} else if (!stat.isDirectory()) {
			throw new Error(`Refusing to replace a real skills file: ${targetDir}`);
		}
	}
	await mkdir(targetDir, { recursive: true });

	for (const name of skills.keys()) {
		const targetPath = path.join(targetDir, name);
		if (
			(await pathExists(targetPath)) &&
			!(await lstat(targetPath)).isSymbolicLink()
		) {
			throw new Error(
				`Refusing to replace a real skill file or directory: ${targetPath}`,
			);
		}
	}

	for (const [name, sourcePath] of skills) {
		await ensureLinked(sourcePath, path.join(targetDir, name), backupRoot);
	}

	// Prune stale links that point into the repo skills dir but no longer match
	// the selected layout. Real dirs and links to other places stay untouched.
	const repoPrefix = skillsDir + path.sep;
	for (const entry of await readdir(targetDir, { withFileTypes: true })) {
		if (skills.has(entry.name) || !entry.isSymbolicLink()) continue;
		const entryPath = path.join(targetDir, entry.name);
		const target = await getSymlinkTarget(entryPath);
		if (!target) continue;
		const resolved = path.resolve(targetDir, target);
		if (resolved.startsWith(repoPrefix)) {
			await backupAndReplace(entryPath, async () => {}, backupRoot);
			action(`Archived stale skill link: ${entryPath}`);
		}
	}
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
	await linkSkills(
		path.join(agentTemplatesDir, "skills"),
		path.join(claudeRoot, "skills"),
		"flat",
	);
	await linkIfPresent(
		agentTemplatesDir,
		"docs",
		path.join(claudeRoot, "docs"),
	);
	await linkInstructions(
		agentTemplatesDir,
		"claude",
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
	await linkInstructions(
		agentTemplatesDir,
		"codex",
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
	await linkSkills(
		path.join(agentTemplatesDir, "skills"),
		path.join(copilotRoot, "skills"),
		"nested",
	);
	await linkIfPresent(
		agentTemplatesDir,
		"docs",
		path.join(copilotRoot, "docs"),
	);
	await linkInstructions(
		agentTemplatesDir,
		"copilot",
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

	info("Copilot sessions can keep an old skill list. Run /skills reload in an open CLI session, or start a new chat in Copilot Desktop.");
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

	await linkInstructions(
		agentTemplatesDir,
		"pi",
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
// Cursor linking
// =============================================================================

// User skills are ~/.cursor/skills/<name>/SKILL.md. That directory is the one
// Cursor syncs to Cloud Agents. ~/.agents/skills is also read locally, but it
// stays on this machine. Flat links keep grouped skills (skills/<group>/<name>)
// visible, since the skill name is the folder that contains SKILL.md.
async function linkCursor(agentTemplatesDir: string): Promise<void> {
	info("Linking Cursor agent templates...");

	const cursorRoot = homePath(".cursor");
	await mkdir(cursorRoot, { recursive: true });

	await linkSkills(
		path.join(agentTemplatesDir, "skills"),
		path.join(cursorRoot, "skills"),
		"flat",
	);
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
// Machine-local AGENTS.local.md sync
// =============================================================================

// Ask what to do about a missing shared baseline on a device that has no local
// file yet. Only called when stdin is an interactive TTY; non-interactive runs
// skip instead.
async function promptMissingBaseline(
	baselinePath: string,
): Promise<"skip" | "create" | "quit"> {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	try {
		const answer = await rl.question(
			`No AGENTS.local.md baseline at ${baselinePath}\n` +
				`[S]kip (default) · [C]reate an empty local copy · [Q]uit: `,
		);
		const choice = answer.trim().toLowerCase();
		if (choice.startsWith("c")) return "create";
		if (choice.startsWith("q")) return "quit";
		return "skip";
	} finally {
		rl.close();
	}
}

function buildSharedBlock(baseline: string): string {
	return `${LOCAL_AGENTS_MARKERS.start}\n${baseline.trimEnd()}\n${LOCAL_AGENTS_MARKERS.end}\n`;
}

// Keep the shared block in defaults/AGENTS.local.md equal to the secrets
// baseline. Content outside the markers is machine-local and is preserved. A
// pre-existing file with no markers (the old seed-once copy) gets the block
// prepended after a backup; its old body stays below as local content and will
// usually duplicate the shared rules until pruned by hand.
async function syncLocalAgents(
	agentTemplatesDir: string,
	secretsDir: string,
	prompt: boolean,
): Promise<void> {
	const localPath = path.join(agentTemplatesDir, LOCAL_AGENTS_RELATIVE);
	const baselinePath = path.join(secretsDir, SECRETS_LOCAL_AGENTS_NAME);
	const localExists = await pathExists(localPath);

	if (!(await pathExists(baselinePath))) {
		if (localExists) {
			info(
				`No AGENTS.local.md baseline at ${baselinePath}; leaving ${localPath} unchanged.`,
			);
			return;
		}

		const skipMessage =
			`No AGENTS.local.md baseline at ${baselinePath}; skipping. ` +
			`Create it or pass --secrets-dir to enable local agent instructions.`;

		if (!prompt || !process.stdin.isTTY) {
			info(skipMessage);
			return;
		}

		const choice = await promptMissingBaseline(baselinePath);
		if (choice === "quit") {
			throw new Error(
				`Aborted: no AGENTS.local.md baseline at ${baselinePath}. ` +
					`Create it or pass --secrets-dir, then re-run.`,
			);
		}
		if (choice === "create") {
			await mkdir(path.dirname(localPath), { recursive: true });
			await writeFile(localPath, "");
			action(`Created empty AGENTS.local.md at ${localPath}`);
			return;
		}
		info(skipMessage);
		return;
	}

	const block = buildSharedBlock(await readFile(baselinePath, "utf8"));

	if (!localExists) {
		await mkdir(path.dirname(localPath), { recursive: true });
		await writeFile(localPath, block);
		action(`Created ${localPath} with shared block from ${baselinePath}`);
		return;
	}

	const existing = await readFile(localPath, "utf8");
	const result = reconcileManagedBlock(existing, block, LOCAL_AGENTS_MARKERS);

	switch (result.outcome) {
		case "unchanged":
			return;
		case "replaced":
			await writeFile(localPath, result.content);
			action(`Updated shared block in ${localPath} from ${baselinePath}`);
			return;
		case "prepended":
			await backupAndReplace(localPath, () =>
				writeFile(localPath, result.content),
			);
			action(`Prepended shared block to ${localPath}`);
			warn(
				`${localPath} had no shared-block markers. Its previous contents were kept below the END marker and likely repeat the shared rules. Prune the duplicates by hand.`,
			);
			return;
		case "conflict":
			warn(
				`${localPath} has malformed shared-block markers (missing, duplicated, or out of order). Left unchanged; fix the markers and re-run.`,
			);
			return;
	}
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

	// Sync the machine-local AGENTS.local.md before linking so the tool links
	// below resolve to a present file.
	await syncLocalAgents(
		options.agentTemplatesDir,
		options.secretsDir,
		options.prompt,
	);

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

	if (mode === "cursor" || mode === "all") {
		await linkCursor(options.agentTemplatesDir);
	}

	if (mode === "all") {
		await linkAgentsShared(options.agentTemplatesDir);
	}

	await pruneBackups();
	info("Agent templates linking completed");
}

if (import.meta.main) {
	main().catch((error) => {
		console.error("link-agent-templates failed:", error);
		process.exit(1);
	});
}
