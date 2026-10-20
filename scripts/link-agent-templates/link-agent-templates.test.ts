import { afterEach, beforeEach, expect, test } from "bun:test";
import {
	lstat,
	mkdir,
	mkdtemp,
	readFile,
	readdir,
	realpath,
	rm,
	symlink,
	writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { linkSkills } from "./link-agent-templates";

let fixture: string;
let source: string;
let target: string;

beforeEach(async () => {
	fixture = await mkdtemp(path.join(os.tmpdir(), "agent-templates-linker-"));
	source = path.join(fixture, "repo", "skills");
	target = path.join(fixture, "home", ".copilot", "skills");
	for (const relative of [
		"programming",
		path.join("engineering", "code-review"),
		path.join("pstack", "technical-writing"),
	]) {
		const dir = path.join(source, relative);
		await mkdir(dir, { recursive: true });
		await writeFile(path.join(dir, "SKILL.md"), path.basename(relative));
	}
});

afterEach(async () => {
	await rm(fixture, { recursive: true, force: true });
});

async function linkDirectory(from: string, to: string): Promise<void> {
	await symlink(from, to, process.platform === "win32" ? "junction" : "dir");
}

function runLinker(tool: "copilot" | "claude" | "cursor"): void {
	const home = path.join(fixture, "home");
	const result = Bun.spawnSync({
		cmd: [
			process.execPath,
			path.join(import.meta.dir, "link-agent-templates.ts"),
			"--agent-templates-dir",
			path.join(fixture, "repo"),
			"--secrets-dir",
			path.join(fixture, "missing-secrets"),
			"--setup",
			tool,
			"--no-prompt",
		],
		env: { ...process.env, HOME: home, USERPROFILE: home },
	});
	expect(result.exitCode, result.stderr.toString()).toBe(0);
}

test("Copilot preserves grouped paths and cross-skill references", async () => {
	runLinker("copilot");
	expect(await realpath(path.join(target, "engineering", "code-review"))).toBe(
		await realpath(path.join(source, "engineering", "code-review")),
	);
	expect(
		await readFile(path.join(target, "programming", "..", "engineering", "code-review", "SKILL.md"), "utf8"),
	).toBe("code-review");
	expect(
		await readFile(path.join(target, "pstack", "technical-writing", "..", "..", "programming", "SKILL.md"), "utf8"),
	).toBe("programming");
	expect((await readdir(target)).sort()).toEqual(["engineering", "programming", "pstack"]);
});

test("Copilot preserves groups with skills nested more than one level deep", async () => {
	const deep = path.join(source, "group", "category", "deep-skill");
	await mkdir(deep, { recursive: true });
	await writeFile(path.join(deep, "SKILL.md"), "deep-skill");
	runLinker("copilot");
	expect(
		await readFile(path.join(target, "group", "category", "deep-skill", "SKILL.md"), "utf8"),
	).toBe("deep-skill");
});

test.each(["claude", "cursor"] as const)("%s keeps grouped skills flat", async (tool) => {
	runLinker(tool);
	const flatRoot = path.join(fixture, "home", `.${tool}`, "skills");
	expect((await readdir(flatRoot)).sort()).toEqual(["code-review", "programming", "technical-writing"]);
	expect(await realpath(path.join(flatRoot, "technical-writing"))).toBe(
		await realpath(path.join(source, "pstack", "technical-writing")),
	);
});

test("migration prunes old managed links and preserves unrelated local skills", async () => {
	await linkSkills(source, target, "flat");
	const custom = path.join(target, "custom");
	const external = path.join(fixture, "external");
	await mkdir(custom);
	await writeFile(path.join(custom, "SKILL.md"), "custom");
	await mkdir(external);
	await linkDirectory(external, path.join(target, "external"));

	await linkSkills(source, target, "nested");

	expect((await readdir(target)).sort()).toEqual(["custom", "engineering", "external", "programming", "pstack"]);
	expect(await readFile(path.join(custom, "SKILL.md"), "utf8")).toBe("custom");
	expect(await realpath(path.join(target, "external"))).toBe(await realpath(external));
	expect(await readFile(path.join(source, "engineering", "code-review", "SKILL.md"), "utf8")).toBe("code-review");
});

test("nested linking is idempotent", async () => {
	await linkSkills(source, target, "nested");
	const before = await lstat(path.join(target, "engineering"));
	await linkSkills(source, target, "nested");
	const after = await lstat(path.join(target, "engineering"));
	expect(after.ino).toBe(before.ino);
	expect(after.mtimeMs).toBe(before.mtimeMs);
});

test("whole-tree symlinks never cause writes into the source tree", async () => {
	await mkdir(path.dirname(target), { recursive: true });
	await linkDirectory(source, target);
	await linkSkills(source, target, "nested");
	expect((await lstat(target)).isDirectory()).toBe(true);
	expect((await lstat(target)).isSymbolicLink()).toBe(false);
	expect((await readdir(source)).sort()).toEqual(["engineering", "programming", "pstack"]);
	expect((await readdir(path.join(source, "engineering"))).sort()).toEqual(["code-review"]);
});

test("a real directory collision stops migration without deleting local content", async () => {
	await linkSkills(source, target, "flat");
	const collision = path.join(target, "engineering");
	await mkdir(collision);
	await writeFile(path.join(collision, "local.txt"), "keep");

	await expect(linkSkills(source, target, "nested")).rejects.toThrow("Refusing to replace");
	expect(await readFile(path.join(collision, "local.txt"), "utf8")).toBe("keep");
	expect(await readFile(path.join(target, "code-review", "SKILL.md"), "utf8")).toBe("code-review");
});
