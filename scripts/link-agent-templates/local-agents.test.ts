import { afterEach, beforeEach, expect, test } from "bun:test";
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const START =
	"<!-- BEGIN shared AGENTS.local.md. Synced from the dotfiles secrets repo by link-agent-templates. Edits inside this block are overwritten; put machine-specific rules below the END marker. -->";
const END = "<!-- END shared AGENTS.local.md -->";

let fixture: string;
let repo: string;
let secrets: string;
let home: string;

function localPath(): string {
	return path.join(repo, "defaults/AGENTS.local.md");
}

async function writeBaseline(content: string): Promise<void> {
	await mkdir(secrets, { recursive: true });
	await writeFile(path.join(secrets, "AGENTS.local.md"), content);
}

async function writeLocal(content: string): Promise<void> {
	await mkdir(path.dirname(localPath()), { recursive: true });
	await writeFile(localPath(), content);
}

function run(secretsDir = secrets) {
	const result = Bun.spawnSync({
		cmd: [
			process.execPath,
			path.join(import.meta.dir, "link-agent-templates.ts"),
			"--agent-templates-dir", repo,
			"--secrets-dir", secretsDir,
			"--setup", "cursor",
			"--no-prompt",
		],
		env: { ...process.env, HOME: home, USERPROFILE: home },
	});
	expect(result.exitCode, result.stderr.toString()).toBe(0);
	return { stdout: result.stdout.toString(), stderr: result.stderr.toString() };
}

function block(body: string): string {
	return `${START}\n${body}\n${END}\n`;
}

beforeEach(async () => {
	fixture = await mkdtemp(path.join(os.tmpdir(), "agent-local-"));
	repo = path.join(fixture, "repo");
	secrets = path.join(fixture, "secrets");
	home = path.join(fixture, "home");
	await mkdir(repo, { recursive: true });
	await mkdir(home, { recursive: true });
});

afterEach(async () => {
	await rm(fixture, { recursive: true, force: true });
});

test("fresh machine gets the shared block and nothing else", async () => {
	await writeBaseline("- shared rule one\n- shared rule two\n");
	run();
	expect(await readFile(localPath(), "utf8")).toBe(block("- shared rule one\n- shared rule two"));
});

test("rerun with unchanged baseline is byte-identical", async () => {
	await writeBaseline("- shared rule\n");
	run();
	const first = await readFile(localPath(), "utf8");
	const { stdout } = run();
	expect(await readFile(localPath(), "utf8")).toBe(first);
	expect(stdout).not.toContain("shared block");
});

test("baseline change rewrites the block and keeps local tail", async () => {
	await writeBaseline("- shared v1\n");
	run();
	await writeFile(localPath(), (await readFile(localPath(), "utf8")) + "\n## This machine\n- local only\n");
	await writeBaseline("- shared v2\n");
	const { stdout } = run();
	expect(await readFile(localPath(), "utf8")).toBe(block("- shared v2") + "\n## This machine\n- local only\n");
	expect(stdout).toContain("Updated shared block");
});

test("legacy file without markers gets the block prepended, a backup, and a warning", async () => {
	await writeBaseline("- shared rule\n");
	await writeLocal("- old seeded copy\n- device edit\n");
	const { stdout, stderr } = run();
	expect(await readFile(localPath(), "utf8")).toBe(block("- shared rule") + "- old seeded copy\n- device edit\n");
	expect(stderr).toContain("Prune the duplicates");
	expect(stdout).toContain("Backed up");
	const backups = await readdir(path.join(home, ".agent-templates", "backups"));
	expect(backups.some((name) => name.startsWith("AGENTS.local.md-"))).toBe(true);
});

test("malformed markers leave the file alone with a warning", async () => {
	await writeBaseline("- shared rule\n");
	const broken = `${START}\n- half block\n- local\n`;
	await writeLocal(broken);
	const { stderr } = run();
	expect(await readFile(localPath(), "utf8")).toBe(broken);
	expect(stderr).toContain("malformed shared-block markers");
});

test("missing baseline leaves an existing local file untouched", async () => {
	await writeLocal("Machine-local sentinel.\n");
	run(path.join(fixture, "missing-secrets"));
	expect(await readFile(localPath(), "utf8")).toBe("Machine-local sentinel.\n");
});
