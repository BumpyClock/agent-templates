import { afterEach, beforeEach, expect, test } from "bun:test";
import {
	cp,
	lstat,
	mkdir,
	mkdtemp,
	readFile,
	readdir,
	readlink,
	realpath,
	rm,
	symlink,
	writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { backupAndReplace } from "./backups";
import { linkSkills } from "./link-agent-templates";

let fixture: string;
let home: string;
let repo: string;
let backups: string;

beforeEach(async () => {
	fixture = await mkdtemp(path.join(os.tmpdir(), "agent-template-backups-"));
	home = path.join(fixture, "home");
	repo = path.join(fixture, "repo");
	backups = path.join(home, ".agent-templates", "backups");
	await mkdir(repo, { recursive: true });
});

afterEach(async () => {
	await rm(fixture, { recursive: true, force: true });
});

async function write(file: string, value: string): Promise<void> {
	await mkdir(path.dirname(file), { recursive: true });
	await writeFile(file, value);
}

function runLinker(tool: string): void {
	const result = Bun.spawnSync({
		cmd: [process.execPath, path.join(import.meta.dir, "link-agent-templates.ts"),
			"--agent-templates-dir", repo, "--secrets-dir", path.join(fixture, "no-secrets"),
			"--setup", tool, "--no-prompt"],
		env: { ...process.env, HOME: home, USERPROFILE: home },
	});
	expect(result.exitCode, result.stderr.toString()).toBe(0);
}

async function snapshots(target: string): Promise<string[]> {
	const result: string[] = [];
	let histories: string[];
	try {
		histories = await readdir(backups);
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === "ENOENT") return result;
		throw error;
	}
	for (const history of histories) {
		for (const version of await readdir(path.join(backups, history))) {
			const snapshot = path.join(backups, history, version);
			const metadata = JSON.parse(await readFile(path.join(snapshot, "target.json"), "utf8"));
			if (metadata.target === target) result.push(path.join(snapshot, "entry"));
		}
	}
	return result.sort();
}

const targets = [
	["claude", "defaults/AGENTS.md", ".claude/CLAUDE.md"],
	["codex", "defaults/AGENTS.md", ".codex/AGENTS.md"],
	["copilot", "defaults/AGENTS.md", ".copilot/copilot-instructions.md"],
	["opencode", "tools.md", ".config/opencode/tools.md"],
	["pi", ".pi/agent/models.json", ".pi/agent/models.json"],
	["all", "defaults/AGENTS.md", ".agents/AGENTS.md"],
] as const;

test.each(targets)("%s preserves replaced real files", async (tool, source, destination) => {
	const sourcePath = path.join(repo, source);
	const target = path.join(home, destination);
	await write(sourcePath, "shared config");
	await write(target, "private previous config");
	runLinker(tool);
	const saved = await snapshots(target);
	expect(saved).toHaveLength(1);
	expect(await readFile(saved[0]!, "utf8")).toBe("private previous config");
	expect(await realpath(target)).toBe(await realpath(sourcePath));
	if (process.platform !== "win32") {
		expect((await lstat(backups)).mode & 0o777).toBe(0o700);
		expect((await lstat(path.dirname(saved[0]!))).mode & 0o777).toBe(0o700);
	}
});

test("real directories are backed up with nested content and permissions intact", async () => {
	const target = path.join(home, ".codex", "prompts");
	await write(path.join(repo, "prompts", "new.md"), "new prompt");
	await write(path.join(target, "nested", "old.md"), "local prompt");
	const before = await lstat(path.join(target, "nested", "old.md"));
	runLinker("codex");
	const [saved] = await snapshots(target);

	expect(await readFile(path.join(saved!, "nested", "old.md"), "utf8")).toBe("local prompt");
	expect((await lstat(path.join(saved!, "nested", "old.md"))).mode).toBe(before.mode);
	expect(await readFile(path.join(target, "new.md"), "utf8")).toBe("new prompt");
});

test("retains the newest five backups independently for each destination", async () => {
	const models = path.join(home, ".pi", "agent", "models.json");
	const settings = path.join(home, ".pi", "agent", "settings.json");
	await write(path.join(repo, ".pi", "agent", "models.json"), "shared models");
	await write(path.join(repo, ".pi", "agent", "settings.json"), "shared settings");
	for (let index = 0; index < 8; index += 1) {
		for (const target of [models, settings]) {
			await rm(target, { force: true });
			await write(target, `${path.basename(target)}-${index}`);
		}
		runLinker("pi");
	}
	for (const target of [models, settings]) {
		const saved = await snapshots(target);
		expect(saved).toHaveLength(5);
		expect(await Promise.all(saved.map((file) => readFile(file, "utf8")))).toEqual(
			[3, 4, 5, 6, 7].map((index) => `${path.basename(target)}-${index}`),
		);
	}
});

test("correct links do not create backups or churn existing history", async () => {
	const target = path.join(home, ".pi", "agent", "models.json");
	await write(path.join(repo, ".pi", "agent", "models.json"), "shared config");
	runLinker("pi");
	expect(await snapshots(target)).toEqual([]);
	await rm(target);
	await write(target, "old config");
	runLinker("pi");
	const saved = await snapshots(target);
	const before = await lstat(target);
	runLinker("pi");
	expect(await snapshots(target)).toEqual(saved);
	expect((await lstat(target)).ino).toBe(before.ino);
});

test("archives relative and dangling symlinks without following them", async () => {
	const target = path.join(home, ".pi", "agent", "models.json");
	await write(path.join(repo, ".pi", "agent", "models.json"), "shared config");
	await mkdir(path.dirname(target), { recursive: true });
	for (let index = 0; index < 7; index += 1) {
		await rm(target, { force: true });
		await symlink(`missing-${index}.json`, target, "file");
		runLinker("pi");
	}
	const saved = await snapshots(target);
	expect(saved).toHaveLength(5);
	expect(await Promise.all(saved.map((file) => readlink(file)))).toEqual(
		[2, 3, 4, 5, 6].map((index) => `missing-${index}.json`),
	);
});

test("Cursor whole-tree migration backs up only the old symlink", async () => {
	const skills = path.join(repo, "skills");
	const target = path.join(home, ".cursor", "skills");
	await write(path.join(skills, "example", "SKILL.md"), "example");
	await mkdir(path.dirname(target), { recursive: true });
	await symlink(skills, target, process.platform === "win32" ? "junction" : "dir");
	runLinker("cursor");
	const [saved] = await snapshots(target);
	expect((await lstat(saved!)).isSymbolicLink()).toBe(true);
	expect(await readlink(saved!)).toBe(skills);
	expect((await readdir(skills)).sort()).toEqual(["example"]);
	expect(await readFile(path.join(target, "example", "SKILL.md"), "utf8")).toBe("example");
});

test("stale skill links are archived before pruning", async () => {
	const skills = path.join(repo, "skills");
	const target = path.join(home, ".copilot", "skills");
	await write(path.join(skills, "group", "example", "SKILL.md"), "example");
	await linkSkills(skills, target, "flat", backups);
	const stale = path.join(target, "example");
	const previous = await readlink(stale);
	await linkSkills(skills, target, "nested", backups);
	const [saved] = await snapshots(stale);
	expect(await readlink(saved!)).toBe(previous);
	expect(await readFile(path.join(skills, "group", "example", "SKILL.md"), "utf8")).toBe("example");
	expect((await readdir(target)).sort()).toEqual(["group"]);
});

test("backup failure leaves the original destination untouched", async () => {
	const target = path.join(home, "config.json");
	await write(target, "must survive");
	await write(backups, "not a directory");
	await expect(backupAndReplace(target, async () => {
		await write(target, "replacement");
	}, backups)).rejects.toThrow();
	expect(await readFile(target, "utf8")).toBe("must survive");
});

test("pruning directory symlink backups never deletes their targets", async () => {
	const target = path.join(home, ".codex", "prompts");
	await write(path.join(repo, "prompts", "new.md"), "new prompt");
	await mkdir(path.dirname(target), { recursive: true });
	for (let index = 0; index < 7; index += 1) {
		const previous = path.join(fixture, `external-${index}`);
		await write(path.join(previous, "local.md"), `keep-${index}`);
		await rm(target, { force: true, recursive: true });
		await symlink(previous, target, process.platform === "win32" ? "junction" : "dir");
		runLinker("codex");
	}
	expect(await snapshots(target)).toHaveLength(5);
	for (let index = 0; index < 7; index += 1) {
		expect(await readFile(path.join(fixture, `external-${index}`, "local.md"), "utf8")).toBe(`keep-${index}`);
	}
});

test("a no-change rerun reconciles backups left by an interrupted run", async () => {
	const target = path.join(home, ".pi", "agent", "models.json");
	await write(path.join(repo, ".pi", "agent", "models.json"), "shared config");
	for (let index = 0; index < 5; index += 1) {
		await rm(target, { force: true });
		await write(target, `previous-${index}`);
		runLinker("pi");
	}
	const saved = await snapshots(target);
	const history = path.dirname(path.dirname(saved.at(-1)!));
	const interrupted = path.join(history, "0000000000000006");
	await cp(path.dirname(saved.at(-1)!), interrupted, { recursive: true });
	await write(path.join(interrupted, "entry"), "interrupted backup");
	await mkdir(path.join(history, "0000000000000007"));
	const before = await lstat(target);
	runLinker("pi");

	const recovered = await snapshots(target);
	expect(recovered).toHaveLength(5);
	expect(await Promise.all(recovered.map((file) => readFile(file, "utf8")))).toEqual([
		"previous-1", "previous-2", "previous-3", "previous-4", "interrupted backup",
	]);
	expect((await lstat(target)).ino).toBe(before.ino);
});

test("failed replacement restores the original and does not prune successful backups", async () => {
	const target = path.join(home, "config.json");
	for (let index = 0; index < 5; index += 1) {
		await write(target, `previous-${index}`);
		await backupAndReplace(target, async () => {}, backups);
	}
	const saved = await snapshots(target);
	await write(target, "must survive");
	await expect(backupAndReplace(target, async () => {
		throw new Error("replacement failed");
	}, backups)).rejects.toThrow("replacement failed");
	expect(await readFile(target, "utf8")).toBe("must survive");
	expect(await snapshots(target)).toEqual(saved);
});
