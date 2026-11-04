import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseEntriesFile, readEntriesFiles, readWorkTrail, type FeedCursor } from "./read-record.ts";

const projectId = "01a1635f-5d9d-70e4-bfc7-6d96c1a210e7";

function routerRow(rowId: string, text: string, tags: string[], extra: Record<string, unknown> = {}) {
  return {
    envelope: { time: { kind: "router", value: "2026-11-04T15:00:00Z" } },
    rowId,
    projectId,
    subject: { kind: "project" },
    text,
    tags,
    links: [],
    redacted: false,
    ...extra,
  };
}

function pageOutput(rows: unknown[], coveredThrough: FeedCursor, highWater: FeedCursor): string {
  return JSON.stringify({ result: { record: { value: { page: { rows, coveredThrough, highWater } } } } });
}

describe("readWorkTrail", () => {
  it("pages forward until the covered position reaches high water, skipping redacted rows", () => {
    // Arrange: three windows; the middle one is empty and the last holds a redacted row.
    const highWater = { epoch: 2, position: 300 };
    const pages = [
      pageOutput([routerRow("01a1a000-0001", "first", ["action"])], { epoch: 2, position: 100 }, highWater),
      pageOutput([], { epoch: 2, position: 200 }, highWater),
      pageOutput(
        [
          routerRow("01a1a000-0003", "third", ["proof"]),
          routerRow("01a1a000-0004", "redacted", ["proof"], { redacted: true }),
        ],
        highWater,
        highWater,
      ),
    ];
    const afterArguments: string[] = [];

    // Act
    const loaded = readWorkTrail(projectId, "design-documents", (commandArguments) => {
      afterArguments.push(commandArguments[commandArguments.indexOf("--after") + 1] ?? "");
      return pages[afterArguments.length - 1] ?? assert.fail("read past high water");
    });

    // Assert
    assert.deepEqual(
      loaded.entries.map((entry) => entry.entryId),
      ["01a1a000-0001", "01a1a000-0003"],
    );
    assert.deepEqual(afterArguments, [
      JSON.stringify({ epoch: 1, position: 0 }),
      JSON.stringify({ epoch: 2, position: 100 }),
      JSON.stringify({ epoch: 2, position: 200 }),
    ]);
    assert.deepEqual(loaded.provenance, {
      kind: "workTrail",
      projectId,
      workTag: "design-documents",
      coveredThrough: highWater,
    });
  });

  it("stops with an error when a page makes no progress short of high water", () => {
    const stuck = pageOutput([], { epoch: 1, position: 0 }, { epoch: 2, position: 50 });
    assert.throws(() => readWorkTrail(projectId, "design-documents", () => stuck), /no progress/);
  });

  it("rejects a row whose id could break out of an HTML attribute", () => {
    const page = pageOutput([routerRow('x" onclick="alert(1)', "bad id", ["action"])], { epoch: 2, position: 1 }, {
      epoch: 2,
      position: 1,
    });
    assert.throws(() => readWorkTrail(projectId, "design-documents", () => page), /entry id/);
  });
});

describe("entries files", () => {
  it("names the file and line of an entry that isn't valid JSON", () => {
    const fileText = `${JSON.stringify({ rowId: "a1", recordedAt: "2026-11-04T15:00:00Z", text: "ok", tags: ["action"] })}\n{not json\n`;
    assert.throws(() => parseEntriesFile(fileText, "entries-lead.jsonl"), /entries-lead\.jsonl:2: not one JSON entry/);
  });

  it("merges several writers' files by recorded time", () => {
    const lead = [
      { rowId: "lead-1", recordedAt: "2026-11-04T15:00:00Z", text: "lead first", tags: ["action"] },
      { rowId: "lead-2", recordedAt: "2026-11-04T15:20:00Z", text: "lead third", tags: ["action"] },
    ];
    const sidekick = [{ rowId: "side-1", recordedAt: "2026-11-04T15:10:00Z", text: "sidekick second", tags: ["proof"] }];
    const files: Record<string, string> = {
      "/work/entries-lead.jsonl": lead.map((entry) => JSON.stringify(entry)).join("\n"),
      "/work/entries-sidekick.jsonl": sidekick.map((entry) => JSON.stringify(entry)).join("\n"),
    };

    const loaded = readEntriesFiles(Object.keys(files), (path) => files[path] ?? assert.fail(path));

    assert.deepEqual(
      loaded.entries.map((entry) => entry.entryId),
      ["lead-1", "side-1", "lead-2"],
    );
    assert.deepEqual(loaded.provenance, {
      kind: "entriesFiles",
      fileNames: ["entries-lead.jsonl", "entries-sidekick.jsonl"],
      lineCount: 3,
    });
  });
});
