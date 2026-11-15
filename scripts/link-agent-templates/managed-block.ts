// =============================================================================
// Managed-block reconciliation for a file the machine otherwise owns.
//
// A "managed block" is a marker-delimited section that an upstream source owns
// inside a file that also carries machine-local content. Everything outside the
// markers is left untouched on every run. Mirrors the helper of the same name in
// the dotfiles repo; kept as a copy because the two repos do not share code.
// =============================================================================

export type ManagedBlockOutcome =
	| "unchanged"
	| "replaced"
	| "prepended"
	| "conflict";

export type ManagedBlockMarkers = {
	start: string;
	end: string;
};

export type ReconcileResult = {
	content: string;
	outcome: ManagedBlockOutcome;
};

function countOccurrences(haystack: string, needle: string): number {
	if (needle === "") {
		return 0;
	}

	let count = 0;
	let index = haystack.indexOf(needle);
	while (index !== -1) {
		count += 1;
		index = haystack.indexOf(needle, index + needle.length);
	}

	return count;
}

type BlockSpan = {
	startIndex: number;
	tailStart: number;
};

// No markers -> null. One well-formed pair -> span. Anything else -> conflict.
function findManagedBlockSpan(
	content: string,
	markers: ManagedBlockMarkers,
): BlockSpan | "conflict" | null {
	const startCount = countOccurrences(content, markers.start);
	const endCount = countOccurrences(content, markers.end);

	if (startCount === 0 && endCount === 0) {
		return null;
	}

	if (startCount !== 1 || endCount !== 1) {
		return "conflict";
	}

	const startIndex = content.indexOf(markers.start);
	const endIndex = content.indexOf(markers.end, startIndex);
	if (endIndex === -1 || endIndex < startIndex) {
		return "conflict";
	}

	let tailStart = endIndex + markers.end.length;
	if (content[tailStart] === "\r" && content[tailStart + 1] === "\n") {
		tailStart += 2;
	} else if (content[tailStart] === "\n") {
		tailStart += 1;
	}

	return { startIndex, tailStart };
}

export function prependManagedBlock(content: string, block: string): string {
	if (!content.trim()) {
		return block;
	}

	const separator =
		block.endsWith("\n") || content.startsWith("\n") ? "" : "\n";
	return `${block}${separator}${content}`;
}

/**
 * Reconcile the desired managed block against existing file content.
 *
 * - Exact block already present -> `unchanged` (caller must not write).
 * - Both markers present but block text differs -> `replaced`; only the text
 *   between and including the markers changes.
 * - No markers present -> `prepended`; existing content is preserved after
 *   the block.
 * - Malformed markers -> `conflict`; content is returned unchanged and the
 *   caller must not modify the file.
 */
export function reconcileManagedBlock(
	existingContent: string,
	desiredBlock: string,
	markers: ManagedBlockMarkers,
): ReconcileResult {
	const span = findManagedBlockSpan(existingContent, markers);

	if (span === null) {
		return {
			content: prependManagedBlock(existingContent, desiredBlock),
			outcome: "prepended",
		};
	}

	if (span === "conflict") {
		return { content: existingContent, outcome: "conflict" };
	}

	const nextContent = `${existingContent.slice(0, span.startIndex)}${desiredBlock}${existingContent.slice(span.tailStart)}`;
	if (nextContent === existingContent) {
		return { content: existingContent, outcome: "unchanged" };
	}

	return { content: nextContent, outcome: "replaced" };
}
