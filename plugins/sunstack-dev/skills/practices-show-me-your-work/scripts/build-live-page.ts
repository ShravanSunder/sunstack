// Builds the owner's live show-me-your-work page for one piece of work from its record.
// The record is either the work's Router work trail (one project, filtered by the work's tag) or, before a project
// exists, one or more entries files (JSONL, one entry per line). The page is derived: it renders every entry once,
// adds only fixed labels, and never holds a fact the record doesn't. The entry shape it reads is owned by
// ../references/record-entries.md; the selection rule it applies is owned by ../references/live-page.md.
//
// Usage:
//   node build-live-page.ts --router <projectId> <workTag> <output.html> <page title>
//   node build-live-page.ts --file <entries.jsonl> [--file <more.jsonl>] <output.html> <page title>
import { writeFileSync } from "node:fs";
import { readEntriesFiles, readWorkTrail, type LoadedRecord, type RecordEntry, type RecordProvenance } from "./read-record.ts";

export type EntryKind =
  | "action"
  | "decision"
  | "assumption"
  | "design-change"
  | "proof"
  | "lead-acceptance"
  | "owner-ask";

// When an entry carries more than one kind tag, the first match here names it.
const entryKindsInPrecedence: readonly EntryKind[] = [
  "lead-acceptance",
  "design-change",
  "assumption",
  "decision",
  "proof",
  "action",
  "owner-ask",
];

const entryKindLabels: Record<EntryKind, string> = {
  action: "Action",
  decision: "Decision",
  assumption: "Assumption",
  "design-change": "Design change",
  proof: "Proof",
  "lead-acceptance": "Lead acceptance",
  "owner-ask": "Owner ask",
};

const closureTags = ["resolves", "supersedes"] as const;

const actorLabels: Record<string, string> = {
  owner: "You",
  lead: "Lead",
  sidekick: "Sidekick",
  advisor: "Advisor",
};
// ---------------------------------------------------------------------------------------------------------------
// The selection rule and placement: where each entry renders, exactly once.

export type EntryPlacement =
  | { section: "waiting-for-owner" }
  | { section: "part"; partId: string | null }
  | { section: "closed-history" }
  | { section: "closing-cell"; closedEntryId: string }
  | { section: "lead-view" };

export type ClassifiedEntry = {
  entry: RecordEntry;
  kind: EntryKind | null;
  closesEntryId: string | null;
  closedBy: RecordEntry[];
  nextActor: string | null;
  placement: EntryPlacement;
};

const tagValue = (entry: RecordEntry, prefix: string): string | null =>
  entry.tags.find((tag) => tag.startsWith(prefix))?.slice(prefix.length) ?? null;

export function entryKind(entry: RecordEntry): EntryKind | null {
  return entryKindsInPrecedence.find((kind) => entry.tags.includes(kind)) ?? null;
}

/** A closing entry closes only the entry its first link names; every other link is authority or context. */
export function closedEntryIdOf(entry: RecordEntry): string | null {
  if (!closureTags.some((tag) => entry.tags.includes(tag))) return null;
  const firstLink = entry.links[0];
  return firstLink?.kind === "entry" ? firstLink.entryId : null;
}

function partIdOf(entry: RecordEntry): string | null {
  const partId = tagValue(entry, "part:");
  return partId === null || partId === "" || partId === "none" ? null : partId;
}

/**
 * Applies the selection rule from live-page.md. Progress, assumptions, design changes, proof and Lead acceptance
 * always reach the owner's view; a decision reaches it only when tagged `core` (it changes or fills in the design
 * or plan); other decisions, owner asks and entries of no known kind fold into the Lead's view. An open assumption
 * is waiting for the owner only when its next actor is the owner. Closed entries move to history.
 */
export function classifyEntries(entries: RecordEntry[]): ClassifiedEntry[] {
  const entryIds = new Set(entries.map((entry) => entry.entryId));
  const closersByClosedId = new Map<string, RecordEntry[]>();
  for (const entry of entries) {
    const closedId = closedEntryIdOf(entry);
    if (closedId === null || closedId === entry.entryId || !entryIds.has(closedId)) continue;
    closersByClosedId.set(closedId, [...(closersByClosedId.get(closedId) ?? []), entry]);
  }
  return entries.map((entry) => {
    const kind = entryKind(entry);
    const closesEntryId = closedEntryIdOf(entry);
    const closedBy = closersByClosedId.get(entry.entryId) ?? [];
    const nextActor = tagValue(entry, "next:");
    const placement = ((): EntryPlacement => {
      if (closedBy.length > 0) return { section: "closed-history" };
      if (kind === null) {
        // An entry with only a closure tag renders beside the entry it closes, the first time that entry shows.
        if (closesEntryId !== null && closesEntryId !== entry.entryId && entryIds.has(closesEntryId)) {
          return { section: "closing-cell", closedEntryId: closesEntryId };
        }
        return { section: "lead-view" };
      }
      if (kind === "assumption" && nextActor === "owner") return { section: "waiting-for-owner" };
      if (kind === "owner-ask") return { section: "lead-view" };
      if (kind === "decision" && !entry.tags.includes("core")) return { section: "lead-view" };
      return { section: "part", partId: partIdOf(entry) };
    })();
    return { entry, kind, closesEntryId, closedBy, nextActor, placement };
  });
}

// ---------------------------------------------------------------------------------------------------------------
// Rendering.

export function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const easternTime = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatTime(isoTime: string | null): string {
  if (isoTime === null || Number.isNaN(Date.parse(isoTime))) return "Not recorded";
  return `${easternTime.format(new Date(isoTime))} ET`;
}

const anchorId = (entryId: string) => `entry-${entryId}`;
const shortId = (entryId: string) => entryId.slice(0, 13);
const partSectionId = (partId: string | null) =>
  partId === null ? "part-none" : `part-${partId.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;

function actorLabel(actor: string | null): string {
  return actor === null ? "Not recorded" : (actorLabels[actor] ?? actor);
}

function safeUrl(url: string): string | null {
  return /^(https?|file):/i.test(url) ? url : null;
}

type RenderContext = { classifiedById: Map<string, ClassifiedEntry>; anchoredIds: Set<string> };

// Each entry carries exactly one anchor, on the one place its placement names.
function anchorAttribute(entryId: string, context: RenderContext): string {
  if (context.anchoredIds.has(entryId)) throw new Error(`entry ${entryId} rendered twice`);
  context.anchoredIds.add(entryId);
  return ` id="${anchorId(entryId)}"`;
}

function entryReference(entryId: string, context: RenderContext): string {
  const target = context.classifiedById.get(entryId);
  const label = target ? escapeHtml(target.entry.text.split("\n")[0] ?? "") : `entry ${shortId(entryId)}`;
  return target ? `<a href="#${anchorId(entryId)}">${label}</a>` : `${label} (not in this record)`;
}

function linksMarkup(classified: ClassifiedEntry, context: RenderContext): string {
  const linkItems = classified.entry.links.map((link, linkIndex) => {
    const closes = linkIndex === 0 && classified.closesEntryId !== null;
    if (link.kind === "entry") return `${closes ? "Closes" : "See"} ${entryReference(link.entryId, context)}`;
    if (link.kind === "url") {
      const url = safeUrl(link.url);
      return url ? `<a href="${escapeHtml(url)}">${escapeHtml(url)}</a>` : `Link: ${escapeHtml(link.url)}`;
    }
    return `Link: ${escapeHtml(link.description)}`;
  });
  return linkItems.length ? `<br><small>${linkItems.join("<br>")}</small>` : "";
}

function entryTextMarkup(classified: ClassifiedEntry, context: RenderContext): string {
  const [firstLine = "", ...detailLines] = classified.entry.text.split("\n");
  const detail = detailLines.length ? `<br><small>${detailLines.map(escapeHtml).join("<br>")}</small>` : "";
  return `${escapeHtml(firstLine)}${detail}${linksMarkup(classified, context)}`;
}

function kindLabel(classified: ClassifiedEntry): string {
  if (classified.kind !== null) return entryKindLabels[classified.kind];
  return classified.closesEntryId !== null ? "Closing entry" : "Other";
}

function stateLabel(classified: ClassifiedEntry): string {
  const { entry, kind } = classified;
  if (classified.closedBy.length > 0) return "Closed";
  if (kind === "assumption") {
    const seen = entry.tags.includes("state:not-marked-wrong") ? "open; you saw it and didn't mark it wrong" : "open";
    return `Assumption, ${seen}. Next: ${actorLabel(classified.nextActor)}`;
  }
  if (kind === "owner-ask") return `Ask, ${tagValue(entry, "state:") ?? "state not recorded"}`;
  if (kind === "decision") return entry.tags.includes("door:two-way") ? "Decided, two-way door" : "Decided";
  if (kind === "lead-acceptance") return "Accepted by the Lead";
  return "";
}

function entryRow(classified: ClassifiedEntry, context: RenderContext): string {
  const { entry } = classified;
  return [
    `    <tr${anchorAttribute(entry.entryId, context)}>`,
    `<td>${kindLabel(classified)}</td>`,
    `<td>${entryTextMarkup(classified, context)}</td>`,
    `<td>${escapeHtml(actorLabel(tagValue(entry, "who:")))}</td>`,
    `<td>${escapeHtml(stateLabel(classified))}</td>`,
    `<td>${formatTime(entry.recordedAt)}</td>`,
    `<td><code>${shortId(entry.entryId)}</code></td></tr>`,
  ].join("");
}

function entryTable(classifiedEntries: ClassifiedEntry[], emptyText: string, context: RenderContext): string {
  if (classifiedEntries.length === 0) return `<p>${escapeHtml(emptyText)}</p>`;
  const bodyRows = classifiedEntries.map((classified) => entryRow(classified, context)).join("\n");
  return [
    `<div class="ex-table-scroll" data-width="canvas">`,
    `<table>`,
    `  <thead><tr><th>Kind</th><th>Entry</th><th>Who</th><th>State</th><th>Recorded</th><th>Entry id</th></tr></thead>`,
    `  <tbody>\n${bodyRows}\n  </tbody>`,
    `</table>`,
    `</div>`,
  ].join("\n");
}

function closedHistoryTable(closedEntries: ClassifiedEntry[], context: RenderContext): string {
  if (closedEntries.length === 0) return "<p>Nothing closed yet.</p>";
  const bodyRows = closedEntries
    .map((closed) => {
      const closerCells = closed.closedBy.map((closer) => {
        const closerClassified = context.classifiedById.get(closer.entryId);
        const ownsCell =
          closerClassified?.placement.section === "closing-cell" &&
          closerClassified.placement.closedEntryId === closed.entry.entryId &&
          !context.anchoredIds.has(closer.entryId);
        if (ownsCell && closerClassified) {
          return `<span${anchorAttribute(closer.entryId, context)}>${entryTextMarkup(closerClassified, context)} <small>(${escapeHtml(actorLabel(tagValue(closer, "who:")))}, ${formatTime(closer.recordedAt)}, <code>${shortId(closer.entryId)}</code>)</small></span>`;
        }
        return entryReference(closer.entryId, context);
      });
      return [
        `    <tr${anchorAttribute(closed.entry.entryId, context)}>`,
        `<td>${kindLabel(closed)}</td>`,
        `<td>${entryTextMarkup(closed, context)}</td>`,
        `<td>${closerCells.join("<br>")}</td>`,
        `<td>${escapeHtml(actorLabel(tagValue(closed.entry, "who:")))}</td>`,
        `<td><code>${shortId(closed.entry.entryId)}</code></td></tr>`,
      ].join("");
    })
    .join("\n");
  return [
    `<div class="ex-table-scroll" data-width="canvas">`,
    `<table>`,
    `  <thead><tr><th>Kind</th><th>Closed entry</th><th>Closed by</th><th>Who</th><th>Entry id</th></tr></thead>`,
    `  <tbody>\n${bodyRows}\n  </tbody>`,
    `</table>`,
    `</div>`,
  ].join("\n");
}

function provenanceText(provenance: RecordProvenance, entryCount: number): string {
  if (provenance.kind === "workTrail") {
    const { epoch, position } = provenance.coveredThrough;
    return `Built from ${entryCount} entries in the work trail of Router project ${provenance.projectId}, tag ${provenance.workTag}, covered through project position ${epoch}:${position}.`;
  }
  return `Built from ${entryCount} entries in ${provenance.fileNames.join(", ")} (${provenance.lineCount} lines), before the work had a Router project.`;
}

export type PageCounts = {
  waitingForOwner: number;
  openAssumptionsWithAgents: number;
  designChanges: number;
  proof: number;
  leadAcceptances: number;
  closed: number;
  leadView: number;
};

export function countPage(classifiedEntries: ClassifiedEntry[]): PageCounts {
  const open = classifiedEntries.filter((classified) => classified.closedBy.length === 0);
  return {
    waitingForOwner: open.filter((classified) => classified.placement.section === "waiting-for-owner").length,
    openAssumptionsWithAgents: open.filter(
      (classified) => classified.kind === "assumption" && classified.placement.section !== "waiting-for-owner",
    ).length,
    designChanges: open.filter((classified) => classified.kind === "design-change").length,
    proof: open.filter((classified) => classified.kind === "proof").length,
    leadAcceptances: open.filter((classified) => classified.kind === "lead-acceptance").length,
    closed: classifiedEntries.length - open.length,
    leadView: open.filter((classified) => classified.placement.section === "lead-view").length,
  };
}

/** Renders the page body. `provenance` and `builtAt` only change the opening sentence. */
export function renderPage(loaded: LoadedRecord, pageTitle: string, builtAt: string): string {
  const classifiedEntries = classifyEntries(loaded.entries);
  const context: RenderContext = {
    classifiedById: new Map(classifiedEntries.map((classified) => [classified.entry.entryId, classified])),
    anchoredIds: new Set(),
  };
  const inSection = (section: EntryPlacement["section"]) =>
    classifiedEntries.filter((classified) => classified.placement.section === section);
  const partIds = [
    ...new Set(
      inSection("part").map((classified) => (classified.placement.section === "part" ? classified.placement.partId : null)),
    ),
  ].sort((left, right) => (left === null ? 1 : right === null ? -1 : 0));
  const counts = countPage(classifiedEntries);

  const partSections = partIds
    .map((partId) => {
      const partEntries = inSection("part").filter(
        (classified) => classified.placement.section === "part" && classified.placement.partId === partId,
      );
      const heading = partId === null ? "Not tied to a part" : `Part ${escapeHtml(partId)}`;
      return `<h3 id="${partSectionId(partId)}">${heading}</h3>\n${entryTable(partEntries, "", context)}`;
    })
    .join("\n\n");

  const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(pageTitle)}</title>
<link rel="stylesheet" href="https://demistify.getagentstudio.dev/v1/theme.css">
<script type="module" src="https://demistify.getagentstudio.dev/v1/runtime.js"></script>
</head>
<body>
<ex-nav for="content"></ex-nav>
<ex-document id="content">

<h1>${escapeHtml(pageTitle)}</h1>

<p>This page is built from the work's record and isn't edited by hand. Built ${escapeHtml(builtAt)}. "Who" is who did, decided or assumed it; "Recorded" is when the entry entered the record.</p>

<p>${escapeHtml(provenanceText(loaded.provenance, loaded.entries.length))}</p>

<ex-callout title="Right now" tone="tldr" icon="book-open">
<ul>
<li>Waiting for you: ${counts.waitingForOwner}</li>
<li>Open assumptions an agent or peer is checking: ${counts.openAssumptionsWithAgents}</li>
<li>Changed from the design: ${counts.designChanges}</li>
<li>Proof entries: ${counts.proof}</li>
<li>Lead acceptances: ${counts.leadAcceptances}</li>
<li>Closed and kept as history: ${counts.closed}</li>
</ul>
</ex-callout>

<h2 id="waiting">Waiting for you</h2>
<p>Only open assumptions whose next actor is you. Each needs your choice; its decision page, when there is one, is linked in the entry. An open assumption is never a decision, whatever its state.</p>
${entryTable(inSection("waiting-for-owner"), "Nothing is waiting for you.", context)}

<h2 id="by-part">The work, part by part</h2>
<p>What happened, what was decided, assumed and changed, and what is proven, beside the part of the design or plan each entry concerns. Open assumptions show who they wait on.</p>
${partSections || "<p>No entries yet.</p>"}

<h2 id="closed">Closed and kept as history</h2>
<p>Entries a later entry corrected, resolved or replaced. Only an entry whose first link names an entry, and that carries a closing tag, closes it; other links never close anything.</p>
${closedHistoryTable(inSection("closed-history"), context)}

<h2 id="lead-view">The Lead's view</h2>
<details>
<summary>Decisions that don't change or fill in the design or plan, owner asks, and other entries (${counts.leadView})</summary>
${entryTable(inSection("lead-view"), "None.", context)}
</details>

</ex-document>
</body>
</html>
`;
  const unrendered = loaded.entries.filter((entry) => !context.anchoredIds.has(entry.entryId));
  if (unrendered.length > 0) throw new Error(`entries not rendered: ${unrendered.map((entry) => entry.entryId).join(", ")}`);
  return page;
}

// ---------------------------------------------------------------------------------------------------------------
// Command line.

type BuildArguments =
  | { input: "router"; projectId: string; workTag: string; outputPath: string; pageTitle: string }
  | { input: "file"; filePaths: string[]; outputPath: string; pageTitle: string };

const usage =
  "usage: build-live-page.ts --router <projectId> <workTag> <output.html> <title>\n" +
  "       build-live-page.ts --file <entries.jsonl> [--file <more.jsonl>] <output.html> <title>";

export function parseBuildArguments(commandArguments: string[]): BuildArguments {
  const [mode, ...rest] = commandArguments;
  if (mode === "--router" && rest.length === 4) {
    const [projectId = "", workTag = "", outputPath = "", pageTitle = ""] = rest;
    return { input: "router", projectId, workTag, outputPath, pageTitle };
  }
  if (mode === "--file") {
    const filePaths: string[] = [];
    let remaining = commandArguments;
    while (remaining[0] === "--file" && remaining[1] !== undefined) {
      filePaths.push(remaining[1]);
      remaining = remaining.slice(2);
    }
    if (remaining.length === 2) {
      const [outputPath = "", pageTitle = ""] = remaining;
      return { input: "file", filePaths, outputPath, pageTitle };
    }
  }
  throw new Error(usage);
}

function main(): void {
  const buildArguments = parseBuildArguments(process.argv.slice(2));
  const loaded =
    buildArguments.input === "router"
      ? readWorkTrail(buildArguments.projectId, buildArguments.workTag)
      : readEntriesFiles(buildArguments.filePaths);
  const page = renderPage(loaded, buildArguments.pageTitle, formatTime(new Date().toISOString()));
  writeFileSync(buildArguments.outputPath, page);
  const counts = countPage(classifyEntries(loaded.entries));
  console.log(
    `${buildArguments.outputPath}: ${loaded.entries.length} entries; ${provenanceText(loaded.provenance, loaded.entries.length)} ` +
      `Waiting for you ${counts.waitingForOwner}, closed ${counts.closed}, Lead's view ${counts.leadView}.`,
  );
}

if (import.meta.main) main();
