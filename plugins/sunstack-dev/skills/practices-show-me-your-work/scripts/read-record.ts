// Reads one piece of work's show-me-your-work record into one form, from either of its two inputs: the work's
// Router work trail (one project, filtered by the work's tag), or, before a project exists, one or more entries
// files (JSONL, one entry per line). Row text, tags and links come from other agents, the CLI's JSON and
// hand-written files, so every field is parsed here, where it enters. The entry shape is owned by
// ../references/record-entries.md.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { basename } from "node:path";

export interface FeedCursor {
  epoch: number;
  position: number;
}

export type EntryLink =
  | { kind: "entry"; entryId: string }
  | { kind: "url"; url: string }
  | { kind: "other"; description: string };

/** One entry of the record, parsed from either input into the same form. */
export interface RecordEntry {
  entryId: string;
  text: string;
  tags: string[];
  links: EntryLink[];
  recordedAt: string | null;
}

export type RecordProvenance =
  | { kind: "workTrail"; projectId: string; workTag: string; coveredThrough: FeedCursor }
  | { kind: "entriesFiles"; fileNames: string[]; lineCount: number };

export interface LoadedRecord {
  entries: RecordEntry[];
  provenance: RecordProvenance;
}

// Entry ids become HTML id attributes and fragment links, so only this alphabet is accepted.
const entryIdPattern = /^[A-Za-z0-9][A-Za-z0-9-]{0,127}$/;

// ---------------------------------------------------------------------------------------------------------------
// Parsing untrusted input: row text and tags come from other agents, the CLI's JSON and hand-written files.

function isRecordObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseEntryLink(rawLink: unknown, where: string): EntryLink {
  if (!isRecordObject(rawLink) || typeof rawLink.kind !== "string") {
    throw new Error(`${where}: a link is not an object with a kind`);
  }
  if (rawLink.kind === "record" && isRecordObject(rawLink.record)) {
    const { kind, id } = rawLink.record;
    if (kind === "workTrailRow" && typeof id === "string" && entryIdPattern.test(id)) {
      return { kind: "entry", entryId: id };
    }
    return { kind: "other", description: `record ${String(kind)} ${String(id)}` };
  }
  if (rawLink.kind === "url" && typeof rawLink.url === "string") {
    return { kind: "url", url: rawLink.url };
  }
  return { kind: "other", description: JSON.stringify(rawLink) };
}

function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

interface EntryFieldsInput {
  raw: Record<string, unknown>;
  entryId: unknown;
  recordedAt: string | null;
  where: string;
}

function parseEntryFields({ raw, entryId, recordedAt, where }: EntryFieldsInput): RecordEntry {
  if (typeof entryId !== "string" || !entryIdPattern.test(entryId)) {
    throw new Error(`${where}: entry id is missing or has characters outside [A-Za-z0-9-]`);
  }
  if (typeof raw.text !== "string" || raw.text.trim() === "")
    throw new Error(`${where}: text is missing`);
  if (!isStringList(raw.tags)) throw new Error(`${where}: tags must be a list of strings`);
  const rawLinks = raw.links ?? [];
  if (!Array.isArray(rawLinks)) throw new Error(`${where}: links must be a list`);
  return {
    entryId,
    text: raw.text,
    tags: raw.tags,
    links: rawLinks.map((rawLink) => parseEntryLink(rawLink, where)),
    recordedAt,
  };
}

/** Parses one work-trail row from `agent-collaboration work-trail show --json`; returns null for a redacted row. */
export function parseWorkTrailRow(rawRow: unknown, where: string): RecordEntry | null {
  if (!isRecordObject(rawRow)) throw new Error(`${where}: row is not an object`);
  if (rawRow.redacted === true) return null;
  const envelope = isRecordObject(rawRow.envelope) ? rawRow.envelope : {};
  const time = isRecordObject(envelope.time) ? envelope.time : {};
  const recordedAt = typeof time.value === "string" ? time.value : null;
  return parseEntryFields({
    raw: rawRow,
    entryId: rawRow.rowId,
    recordedAt,
    where: `${where} row ${String(rawRow.rowId)}`,
  });
}

/** Parses an entries file: one JSON entry per line, `{ rowId, recordedAt, text, tags, links }`; blank lines skip. */
export function parseEntriesFile(
  fileText: string,
  fileName: string,
): { entries: RecordEntry[]; lineCount: number } {
  const entries: RecordEntry[] = [];
  let lineCount = 0;
  fileText.split("\n").forEach((line, lineIndex) => {
    if (line.trim() === "") return;
    lineCount += 1;
    const where = `${fileName}:${lineIndex + 1}`;
    let rawEntry: unknown;
    try {
      rawEntry = JSON.parse(line);
    } catch {
      throw new Error(`${where}: not one JSON entry`);
    }
    if (!isRecordObject(rawEntry)) throw new Error(`${where}: entry is not an object`);
    if (typeof rawEntry.recordedAt !== "string" || Number.isNaN(Date.parse(rawEntry.recordedAt))) {
      throw new Error(`${where}: recordedAt must be an ISO-8601 time`);
    }
    entries.push(
      parseEntryFields({
        raw: rawEntry,
        entryId: rawEntry.rowId,
        recordedAt: rawEntry.recordedAt,
        where,
      }),
    );
  });
  return { entries, lineCount };
}

// ---------------------------------------------------------------------------------------------------------------
// Reading the two inputs.

export type WorkTrailShowRunner = (commandArguments: string[]) => string;

const runAgentCollaboration: WorkTrailShowRunner = (commandArguments) =>
  execFileSync("agent-collaboration", commandArguments, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });

const sameCursor = (left: FeedCursor, right: FeedCursor): boolean =>
  left.epoch === right.epoch && left.position === right.position;

function parseCursor(rawCursor: unknown, where: string): FeedCursor {
  if (
    isRecordObject(rawCursor) &&
    typeof rawCursor.epoch === "number" &&
    typeof rawCursor.position === "number"
  ) {
    return { epoch: rawCursor.epoch, position: rawCursor.position };
  }
  throw new Error(`${where}: missing feed cursor`);
}

// The CLI wraps the page as { result: { record: { value: { page } } } }.
function pageOfShowOutput(parsedOutput: unknown): unknown {
  let current: unknown = parsedOutput;
  for (const key of ["result", "record", "value", "page"]) {
    current = isRecordObject(current) ? current[key] : undefined;
  }
  return current;
}

/**
 * Reads the work's rows forward from the start of the project feed. Each page scans a bounded window of project
 * positions and returns the matching rows in it, so the read continues until the covered position reaches the
 * feed's high water.
 */
export function readWorkTrail(
  projectId: string,
  workTag: string,
  runWorkTrailShow: WorkTrailShowRunner = runAgentCollaboration,
): LoadedRecord {
  const entries: RecordEntry[] = [];
  let after: FeedCursor = { epoch: 1, position: 0 };
  for (let pageNumber = 1; pageNumber <= 1000; pageNumber += 1) {
    const output = runWorkTrailShow([
      "work-trail",
      "show",
      "--project-id",
      projectId,
      "--tag",
      workTag,
      "--after",
      JSON.stringify(after),
      "--limit",
      "100",
      "--json",
    ]);
    const where = `work-trail page ${pageNumber}`;
    const page = pageOfShowOutput(JSON.parse(output));
    if (!isRecordObject(page) || !Array.isArray(page.rows))
      throw new Error(`${where}: no page of rows`);
    for (const rawRow of page.rows) {
      const entry = parseWorkTrailRow(rawRow, where);
      if (entry) entries.push(entry);
    }
    const coveredThrough = parseCursor(page.coveredThrough, where);
    if (sameCursor(coveredThrough, parseCursor(page.highWater, where))) {
      return { entries, provenance: { kind: "workTrail", projectId, workTag, coveredThrough } };
    }
    if (sameCursor(coveredThrough, after))
      throw new Error(`${where}: no progress past ${JSON.stringify(after)}`);
    after = coveredThrough;
  }
  throw new Error("work trail read exceeded 1000 pages");
}

/** Reads one or more entries files; entries keep their recorded order, files merged by recordedAt. */
export function readEntriesFiles(
  filePaths: string[],
  readText = (path: string) => readFileSync(path, "utf8"),
): LoadedRecord {
  const parsedFiles = filePaths.map((filePath) =>
    parseEntriesFile(readText(filePath), basename(filePath)),
  );
  const entries = parsedFiles
    .flatMap((parsedFile) => parsedFile.entries)
    .map((entry, order) => ({ entry, order }))
    .sort(
      (left, right) =>
        Date.parse(left.entry.recordedAt ?? "") - Date.parse(right.entry.recordedAt ?? "") ||
        left.order - right.order,
    )
    .map(({ entry }) => entry);
  const lineCount = parsedFiles.reduce((total, parsedFile) => total + parsedFile.lineCount, 0);
  return {
    entries,
    provenance: {
      kind: "entriesFiles",
      fileNames: filePaths.map((filePath) => basename(filePath)),
      lineCount,
    },
  };
}
