import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { classifyEntries, renderPage } from "./build-live-page.ts";
import {
  readEntriesFiles,
  readWorkTrail,
  type FeedCursor,
  type LoadedRecord,
} from "./read-record.ts";

type FixtureEntry = { rowId: string; text: string; tags: string[]; links?: unknown[] };

const entryLink = (rowId: string) => ({
  kind: "record",
  record: { kind: "workTrailRow", id: rowId },
});
const urlLink = (url: string) => ({ kind: "url", url });

// One piece of work's record, shaped like the transfer cases in the design's specification.
const fixtureEntries: FixtureEntry[] = [
  {
    rowId: "act-1",
    text: "Wrote the replay builder",
    tags: ["action", "who:sidekick", "part:run-1"],
  },
  {
    rowId: "dec-core",
    text: "Batch size is 500; the design leaves it open",
    tags: ["decision", "core", "who:lead", "part:run-1"],
  },
  {
    rowId: "dec-routine",
    text: "Named the loop variable pageNumber",
    tags: ["decision", "door:two-way", "who:sidekick", "part:run-1"],
  },
  {
    rowId: "asm-agent",
    text: "The upstream feed is deduplicated; I can check its contract",
    tags: ["assumption", "state:open", "next:sidekick", "who:sidekick", "part:run-1"],
  },
  {
    rowId: "asm-advisor",
    text: "Late events may break ordering; sent for a second look",
    tags: ["assumption", "state:open", "next:advisor", "who:lead", "part:run-1"],
  },
  {
    rowId: "asm-owner",
    text: "A new durable store of replayed events that no design covers",
    tags: ["assumption", "state:open", "next:owner", "who:lead", "part:run-1"],
    links: [urlLink("https://example.test/decisions/replay-store.html")],
  },
  {
    rowId: "asm-seen",
    text: "Design and plan use the same entry kinds",
    tags: ["assumption", "state:not-marked-wrong", "next:lead", "who:lead", "part:run-2"],
  },
  {
    rowId: "dc-1",
    text: "Replay moved from the reader to the writer",
    tags: ["design-change", "who:lead", "part:run-1"],
  },
  {
    rowId: "proof-1",
    text: "Replay test passes, exit 0",
    tags: ["proof", "who:sidekick", "part:run-1"],
  },
  {
    rowId: "acc-1",
    text: "Accepted run 1 at commit abc123",
    tags: ["lead-acceptance", "who:lead", "part:run-1"],
  },
  {
    rowId: "ask-1",
    text: "Owner: keep the page short",
    tags: ["owner-ask", "state:open", "who:lead", "part:none"],
  },
  {
    rowId: "asm-closed",
    text: "Nothing gets built before the promised paste",
    tags: ["assumption", "state:open", "next:lead", "who:lead", "part:run-2"],
  },
  {
    rowId: "res-1",
    text: "Corrects the paste hold: the owner marked it wrong",
    tags: ["resolves", "who:owner"],
    links: [entryLink("asm-closed"), entryLink("dec-core")],
  },
  {
    rowId: "ctx-1",
    text: "Checked the feed contract",
    tags: ["decision", "core", "who:sidekick", "part:run-2"],
    links: [entryLink("asm-agent")],
  },
  {
    rowId: "url-first",
    text: "Replaces something named only by a URL",
    tags: ["supersedes", "who:lead"],
    links: [urlLink("https://example.test/x"), entryLink("asm-advisor")],
  },
  {
    rowId: "xss-1",
    text: `<script>alert("x")</script> & 'quoted'\n<img src=x onerror=alert(1)>`,
    tags: ["action", "who:lead", "part:run-1"],
    links: [urlLink("javascript:alert(1)")],
  },
];

const recordedAt = (index: number) => new Date(Date.UTC(2026, 10, 4, 15, index)).toISOString();

function loadFromEntriesFile(): LoadedRecord {
  const fileText = fixtureEntries
    .map((entry, index) =>
      JSON.stringify({ ...entry, links: entry.links ?? [], recordedAt: recordedAt(index) }),
    )
    .join("\n");
  return readEntriesFiles(["/work/entries-lead.jsonl"], () => fileText);
}

function loadFromWorkTrail(): LoadedRecord {
  const highWater: FeedCursor = { epoch: 2, position: 900 };
  const rows = fixtureEntries.map((entry, index) => ({
    envelope: { time: { kind: "router", value: recordedAt(index) } },
    rowId: entry.rowId,
    projectId: "project-1",
    subject: { kind: "project" },
    text: entry.text,
    tags: entry.tags,
    links: entry.links ?? [],
    redacted: false,
  }));
  // Two pages, so the comparison also crosses a page boundary.
  const pages = [rows.slice(0, 7), rows.slice(7)].map((pageRows, index) =>
    JSON.stringify({
      result: {
        record: {
          value: {
            page: {
              rows: pageRows,
              coveredThrough: index === 0 ? { epoch: 2, position: 400 } : highWater,
              highWater,
            },
          },
        },
      },
    }),
  );
  let call = 0;
  return readWorkTrail(
    "project-1",
    "replay",
    () => pages[call++] ?? assert.fail("read past high water"),
  );
}

function sectionOf(page: string, sectionId: string): string {
  const start = page.indexOf(`<h2 id="${sectionId}">`);
  assert.notEqual(start, -1, `section ${sectionId} missing`);
  const end = page.indexOf("<h2 ", start + 1);
  return page.slice(start, end === -1 ? undefined : end);
}

function rowOf(page: string, entryId: string): string {
  const start = page.indexOf(`id="entry-${entryId}"`);
  assert.notEqual(start, -1, `entry ${entryId} has no anchor`);
  return page.slice(start, page.indexOf("</tr>", start));
}

const page = renderPage(loadFromEntriesFile(), "Replay work", "Nov 4, 11:00 ET");

describe("renderPage", () => {
  it("escapes entry text and drops a link whose scheme could run script", () => {
    assert.ok(!page.includes("<script>alert"), "raw script tag reached the page");
    assert.ok(!page.includes("<img src=x"), "raw img tag reached the page");
    assert.ok(
      page.includes("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;quoted&#39;"),
    );
    assert.ok(!page.includes('href="javascript:'), "javascript: link rendered as a link");
    assert.ok(page.includes('href="https://example.test/decisions/replay-store.html"'));
  });

  it("closes an entry only through a closing entry's first link", () => {
    const closedIds = classifyEntries(loadFromEntriesFile().entries)
      .filter((classified) => classified.closedBy.length > 0)
      .map((classified) => classified.entry.entryId);
    // res-1's second link (dec-core), ctx-1's plain link (asm-agent) and url-first's later link (asm-advisor) close nothing.
    assert.deepEqual(closedIds, ["asm-closed"]);
    assert.ok(sectionOf(page, "closed").includes('id="entry-asm-closed"'));
    assert.ok(sectionOf(page, "by-part").includes('id="entry-dec-core"'));
  });

  it("gives every entry exactly one anchor, and every in-page link a target", () => {
    for (const entry of fixtureEntries) {
      const anchors = page.split(`id="entry-${entry.rowId}"`).length - 1;
      assert.equal(anchors, 1, `${entry.rowId} has ${anchors} anchors`);
    }
    const linkTargets = [...page.matchAll(/href="#(entry-[^"]+)"/g)].map((match) => match[1]);
    assert.ok(linkTargets.length > 0);
    for (const target of linkTargets)
      assert.ok(page.includes(`id="${target}"`), `${target} has no anchor`);
  });

  it("always shows progress, assumptions, design changes, proof and acceptance; folds routine decisions", () => {
    const byPart = sectionOf(page, "by-part");
    for (const shownId of ["act-1", "dec-core", "asm-agent", "dc-1", "proof-1", "acc-1", "ctx-1"]) {
      assert.ok(
        byPart.includes(`id="entry-${shownId}"`),
        `${shownId} missing from the owner's view`,
      );
    }
    const leadView = sectionOf(page, "lead-view");
    for (const foldedId of ["dec-routine", "ask-1"]) {
      assert.ok(
        leadView.includes(`id="entry-${foldedId}"`),
        `${foldedId} not folded into the Lead's view`,
      );
      assert.ok(
        !byPart.includes(`id="entry-${foldedId}"`),
        `${foldedId} shown in the owner's view`,
      );
    }
  });

  it("lists only an assumption whose next actor is the owner as waiting, and shows the others' next actor", () => {
    const waiting = sectionOf(page, "waiting");
    assert.ok(waiting.includes('id="entry-asm-owner"'));
    assert.equal(
      waiting.split('id="entry-').length - 1,
      1,
      "something other than asm-owner is waiting for the owner",
    );
    assert.match(rowOf(page, "asm-agent"), /Next: Sidekick/);
    assert.match(rowOf(page, "asm-advisor"), /Next: Advisor/);
    assert.match(page, /Waiting for you: 1</);
  });

  it("keeps a waiting assumption's part: the part's section links to its one anchor", () => {
    // Arrange: part run-9's only entry waits for the owner, and its text doesn't name the part.
    const fileText = JSON.stringify({
      rowId: "asm-only",
      recordedAt: recordedAt(0),
      text: "A new public endpoint no contract covers",
      tags: ["assumption", "state:open", "next:owner", "who:lead", "part:run-9"],
      links: [],
    });
    const loaded = readEntriesFiles(["/work/entries-lead.jsonl"], () => fileText);

    // Act
    const partPage = renderPage(loaded, "Endpoint work", "Nov 4, 11:00 ET");

    // Assert
    const partStart = partPage.indexOf('<h3 id="part-run-9">');
    assert.notEqual(partStart, -1, "part run-9 has no section");
    const partSection = partPage.slice(partStart, partPage.indexOf("<h2 ", partStart));
    assert.ok(
      partSection.includes('href="#entry-asm-only"'),
      "part section doesn't link the waiting entry",
    );
    assert.ok(
      !partSection.includes("A new public endpoint"),
      "part section repeats the entry's text",
    );
    assert.equal(partPage.split('id="entry-asm-only"').length - 1, 1);
    assert.match(rowOf(partPage, "asm-only"), /href="#part-run-9"/);
  });

  it("never shows an open assumption as decided, even after the owner saw it", () => {
    const seen = rowOf(page, "asm-seen");
    assert.match(seen, /Assumption, open; you saw it and didn&#39;t mark it wrong/);
    assert.doesNotMatch(seen, /Decided/);
    // A plain link from a later decision is context, so the assumption it points at stays open.
    assert.match(rowOf(page, "asm-agent"), /Assumption, open/);
  });

  it("builds the same page from an entries file as from the work trail, apart from the source sentence", () => {
    const fromFile = loadFromEntriesFile();
    const fromTrail = loadFromWorkTrail();
    assert.deepEqual(fromTrail.entries, fromFile.entries);
    const withoutSource = (loaded: LoadedRecord) =>
      renderPage(loaded, "Replay work", "Nov 4, 11:00 ET").replace(
        /^<p>Built from \d+ entries in .*<\/p>$/m,
        "<p>SOURCE</p>",
      );
    assert.equal(withoutSource(fromTrail), withoutSource(fromFile));
    assert.match(
      renderPage(fromTrail, "Replay work", "now"),
      /covered through project position 2:900/,
    );
  });
});
