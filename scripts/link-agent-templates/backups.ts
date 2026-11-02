import { createHash } from "node:crypto";
import {
	chmod,
	lstat,
	mkdir,
	readdir,
	rename,
	rm,
	rmdir,
	writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const BACKUP_LIMIT = 5;
const VERSION_NAME = /^\d{16}$/;

async function removeBackupEntry(entryPath: string): Promise<void> {
	try {
		await rm(entryPath, { recursive: true, force: true });
	} catch (error) {
		// Bun on Windows can require rmdir for a directory symlink or junction.
		if (!(await lstat(entryPath)).isSymbolicLink()) throw error;
		await rmdir(entryPath);
	}
}

export async function backupAndReplace(
	targetPath: string,
	replace: () => Promise<void>,
	backupRoot = path.join(os.homedir(), ".agent-templates", "backups"),
): Promise<void> {
	const absoluteTarget = path.resolve(targetPath);
	const identity = process.platform === "win32"
		? absoluteTarget.toLowerCase()
		: absoluteTarget;
	const hash = createHash("sha256").update(identity).digest("hex").slice(0, 16);
	const historyDir = path.join(backupRoot, `${path.basename(targetPath)}-${hash}`);
	await mkdir(historyDir, { recursive: true, mode: 0o700 });
	await chmod(backupRoot, 0o700);
	await chmod(historyDir, 0o700);

	const versions = (await readdir(historyDir)).filter((name) => VERSION_NAME.test(name)).sort();
	const next = BigInt(versions.at(-1) ?? "0") + 1n;
	const snapshot = path.join(historyDir, next.toString().padStart(16, "0"));
	await mkdir(snapshot, { mode: 0o700 });
	await writeFile(
		path.join(snapshot, "target.json"),
		JSON.stringify({ target: absoluteTarget, createdAt: new Date().toISOString() }, null, 2) + "\n",
		{ mode: 0o600 },
	);
	const savedPath = path.join(snapshot, "entry");
	await rename(targetPath, savedPath);
	console.log(`[ACTION] Backed up: ${targetPath} -> ${savedPath}`);

	try {
		await replace();
	} catch (error) {
		await rename(savedPath, targetPath);
		await rm(snapshot, { recursive: true, force: true });
		throw error;
	}

	await pruneHistory(historyDir);
}

async function pruneHistory(historyDir: string): Promise<void> {
	const versions = (await readdir(historyDir)).filter((name) => VERSION_NAME.test(name)).sort();
	// Only completed snapshots count toward retention. Interrupted empty slots
	// are discarded without touching the newest successful backups.
	const completed: string[] = [];
	for (const name of versions) {
		const versionDir = path.join(historyDir, name);
		try {
			await lstat(path.join(versionDir, "entry"));
			completed.push(versionDir);
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
			await rm(versionDir, { recursive: true, force: true });
		}
	}
	for (const versionDir of completed.slice(0, -BACKUP_LIMIT)) {
		await removeBackupEntry(path.join(versionDir, "entry"));
		await rm(versionDir, { recursive: true, force: true });
	}
}

export async function pruneBackups(
	backupRoot = path.join(os.homedir(), ".agent-templates", "backups"),
): Promise<void> {
	let histories;
	try {
		histories = await readdir(backupRoot, { withFileTypes: true });
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === "ENOENT") return;
		throw error;
	}
	for (const history of histories) {
		if (history.isDirectory()) await pruneHistory(path.join(backupRoot, history.name));
	}
}
