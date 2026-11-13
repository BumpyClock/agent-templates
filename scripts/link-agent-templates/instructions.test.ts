import { afterEach, beforeEach, expect, test } from "bun:test";
import {
	lstat,
	mkdir,
	mkdtemp,
	readFile,
	realpath,
	rm,
	symlink,
	writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const destinations = {
	claude: ".claude/CLAUDE.md",
	codex: ".codex/AGENTS.md",
	copilot: ".copilot/copilot-instructions.md",
	pi: ".pi/agent/AGENTS.md",
} as const;
type Harness = keyof typeof destinations;

let fixture: string;
let repo: string;
let home: string;

async function write(relative: string, content: string): Promise<void> {
	const file = path.join(repo, relative);
	await mkdir(path.dirname(file), { recursive: true });
	await writeFile(file, content);
}

function runLinker(tool: Harness | "all" | "cursor" | "opencode", ...args: string[]) {
	return Bun.spawnSync({
		cmd: [
			process.execPath,
			path.join(import.meta.dir, "link-agent-templates.ts"),
			"--agent-templates-dir", repo,
			"--secrets-dir", path.join(fixture, "missing-secrets"),
			"--setup", tool,
			"--no-prompt",
			...args,
		],
		env: { ...process.env, HOME: home, USERPROFILE: home },
	});
}

function link(tool: Harness | "all" | "cursor" | "opencode", ...args: string[]): void {
	const result = runLinker(tool, ...args);
	expect(result.exitCode, result.stderr.toString()).toBe(0);
}

beforeEach(async () => {
	fixture = await mkdtemp(path.join(os.tmpdir(), "agent-instructions-"));
	repo = path.join(fixture, "repo");
	home = path.join(fixture, "home");
	await write("defaults/AGENTS.md", "# Shared rules\n\nKeep shared policy.\n");
	for (const harness of Object.keys(destinations)) {
		await write(`defaults/harnesses/${harness}.md`, `## ${harness} policy\n\nUse ${harness} models.\n`);
	}
});

afterEach(async () => {
	await rm(fixture, { recursive: true, force: true });
});

test.each(Object.entries(destinations) as [Harness, string][])(
	"%s links generated shared rules followed by only its own policy",
	async (harness, destination) => {
		link(harness);
		const target = path.join(home, destination);
		const content = await readFile(target, "utf8");
		expect(content).toContain("Generated");
		expect(content).toContain("defaults/AGENTS.md");
		expect(content).toContain(`defaults/harnesses/${harness}.md`);
		expect(content).toContain(`# Shared rules\n\nKeep shared policy.\n\n## ${harness} policy\n\nUse ${harness} models.\n`);
		for (const other of Object.keys(destinations)) {
			if (other !== harness) expect(content).not.toContain(`Use ${other} models.`);
		}
		expect((await lstat(target)).isSymbolicLink()).toBe(true);
		expect(await realpath(target)).toBe(await realpath(path.join(repo, `defaults/generated/${harness}.md`)));
		expect(await readFile(path.join(repo, "defaults/AGENTS.md"), "utf8")).toBe("# Shared rules\n\nKeep shared policy.\n");
	},
);

test("all generates each harness while shared .agents instructions stay baseline-only", async () => {
	link("all");
	for (const [harness, destination] of Object.entries(destinations)) {
		expect(await readFile(path.join(home, destination), "utf8")).toEndWith(`Use ${harness} models.\n`);
	}
	const shared = path.join(home, ".agents/AGENTS.md");
	expect(await realpath(shared)).toBe(await realpath(path.join(repo, "defaults/AGENTS.md")));
	expect(await readFile(shared, "utf8")).toBe("# Shared rules\n\nKeep shared policy.\n");
});

test.each(["missing", "empty"])("%s overlay produces generated shared rules only", async (kind) => {
	if (kind === "missing") await rm(path.join(repo, "defaults/harnesses/pi.md"));
	else await write("defaults/harnesses/pi.md", " \n\t\n");
	link("pi");
	const content = await readFile(path.join(home, destinations.pi), "utf8");
	expect(content).toEndWith("# Shared rules\n\nKeep shared policy.\n");
	expect(content).not.toContain("## pi policy");
	expect(await realpath(path.join(home, destinations.pi))).toBe(
		await realpath(path.join(repo, "defaults/generated/pi.md")),
	);
});

test("local instructions remain linked separately and are never embedded in generated files", async () => {
	await write("defaults/AGENTS.local.md", "Machine-local sentinel.\n");
	link("all");
	for (const destination of Object.values(destinations)) {
		const target = path.join(home, destination);
		expect(await readFile(target, "utf8")).not.toContain("Machine-local sentinel.");
		const local = path.join(path.dirname(target), "AGENTS.local.md");
		expect(await realpath(local)).toBe(await realpath(path.join(repo, "defaults/AGENTS.local.md")));
		expect(await readFile(local, "utf8")).toBe("Machine-local sentinel.\n");
	}
});

test("reruns refresh baseline and overlay without appending duplicate instructions", async () => {
	link("pi");
	await write("defaults/AGENTS.md", "# Updated shared rules\n\n");
	await write("defaults/harnesses/pi.md", "## Updated Pi policy\n");
	link("pi");
	const content = await readFile(path.join(home, destinations.pi), "utf8");
	expect(content).toEndWith("# Updated shared rules\n\n## Updated Pi policy\n");
	expect(content.split("# Updated shared rules")).toHaveLength(2);
	expect(content).not.toContain("Keep shared policy.");
	expect(content).not.toContain("Use pi models.");
	await rm(path.join(repo, "defaults/harnesses/pi.md"));
	link("pi");
	expect(await readFile(path.join(home, destinations.pi), "utf8")).toEndWith("# Updated shared rules\n");
});

test("no-change reruns leave generated files and symlinks untouched", async () => {
	link("pi");
	const generated = path.join(repo, "defaults/generated/pi.md");
	const target = path.join(home, destinations.pi);
	const beforeFile = await lstat(generated);
	const beforeLink = await lstat(target);
	link("pi");
	expect((await lstat(generated)).mtimeMs).toBe(beforeFile.mtimeMs);
	expect((await lstat(target)).mtimeMs).toBe(beforeLink.mtimeMs);
});

test("migration replaces direct baseline symlinks without modifying source instructions", async () => {
	const target = path.join(home, destinations.pi);
	await mkdir(path.dirname(target), { recursive: true });
	const baseline = path.join(repo, "defaults/AGENTS.md");
	await symlink(baseline, target, "file");
	link("pi");
	expect(await realpath(target)).not.toBe(await realpath(baseline));
	expect(await readFile(baseline, "utf8")).toBe("# Shared rules\n\nKeep shared policy.\n");
	expect(await readFile(target, "utf8")).toEndWith("Use pi models.\n");
});

test("unreadable overlays fail without replacing the last generated instructions", async () => {
	link("pi");
	const target = path.join(home, destinations.pi);
	const before = await readFile(target, "utf8");
	await rm(path.join(repo, "defaults/harnesses/pi.md"));
	await mkdir(path.join(repo, "defaults/harnesses/pi.md"));
	const result = runLinker("pi");
	expect(result.exitCode).not.toBe(0);
	expect(await readFile(target, "utf8")).toBe(before);
});

test("missing baseline skips generation and instruction linking", async () => {
	await rm(path.join(repo, "defaults/AGENTS.md"));
	link("pi");
	await expect(lstat(path.join(repo, "defaults/generated"))).rejects.toThrow();
	await expect(lstat(path.join(home, destinations.pi))).rejects.toThrow();
});

test("show mode does not generate files or change tool links", async () => {
	link("all", "--show");
	await expect(lstat(path.join(repo, "defaults/generated"))).rejects.toThrow();
	for (const destination of Object.values(destinations)) {
		await expect(lstat(path.join(home, destination))).rejects.toThrow();
	}
});

test.each(["opencode", "cursor"] as const)("%s setup keeps existing instruction coverage unchanged", async (harness) => {
	link(harness);
	await expect(lstat(path.join(repo, "defaults/generated"))).rejects.toThrow();
});
