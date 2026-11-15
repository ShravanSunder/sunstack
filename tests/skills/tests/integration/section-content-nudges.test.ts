import { afterEach, expect, test } from "vitest";
import {
  lineStartingWith,
  lintGeneratedPage,
  preparedExitStatus,
  preparedRequestsFor,
  type PreparedRequest,
} from "#test-support/presentation-html-lint";
import { cleanupRulebookFixtures } from "#test-support/sunstack-process";

afterEach(cleanupRulebookFixtures);

// M002 and M005 are active Jev decision models; M003 and M004 stay mechanical.
const sectionViewRule = "presentation-html.section-view.model";
const islandTableRule = "presentation-html.long-detail-island-table.model";
const requestedModel = "jev-latest";

const tenWords = "The issuer signs each token before central accepts the request.";
function proseWords(sentences: number): string {
  return Array.from({ length: sentences }, () => tenWords).join(" ");
}
const hundredWords = proseWords(10);

function markdownIsland(islandId: string, markdown: string): string {
  return `<ex-markdown id="${islandId}"><script type="text/markdown">\n${markdown}\n</script></ex-markdown>`;
}

function htmlTable(tableId: string, bodyRows: number): string {
  const rows = Array.from(
    { length: bodyRows },
    (_, index) => `<tr><td>T${index + 1}</td><td>Proposed value</td></tr>`,
  );
  return [
    `<table id="${tableId}">`,
    "<thead><tr><th>ID</th><th>Proposed</th></tr></thead>",
    "<tbody>",
    ...rows,
    "</tbody></table>",
  ].join("\n");
}

function pipeTable(bodyRows: number): string {
  const rows = Array.from({ length: bodyRows }, (_, index) => `| T${index + 1} | Proposed value |`);
  return ["| ID | Proposed |", "|---|---|", ...rows].join("\n");
}

function stateList(request: PreparedRequest, field: string): string[] {
  const value = request.request.state[field];
  return Array.isArray(value) ? value.map(String) : [];
}

/** The one request whose piece starts at `line`; fails unless exactly one exists. */
function requestAt(requests: readonly PreparedRequest[], line: number): PreparedRequest {
  const matching = requests.filter((request) => request.owner.piece.first_line === line);
  expect(matching, `requests starting at line ${line}`).toHaveLength(1);
  const [only] = matching;
  if (only === undefined) throw new Error(`no request starts at line ${line}`);
  return only;
}

function firstLines(requests: readonly PreparedRequest[]): number[] {
  return requests
    .map((request) => request.owner.piece.first_line)
    .sort((left, right) => left - right);
}

test("each heading section with content becomes one unsent needs_view/views_carry request on the default model, carrying its own views", () => {
  // Arrange: one h2 section per case; a picture sits in HTML or in an island.
  const bodySections = [
    `<h2 id="prose-without-picture">prose-without-picture</h2>\n<p>${hundredWords}</p>`,
    `<h2 id="prose-with-svg">prose-with-svg</h2>\n<p>${hundredWords}</p>\n<svg viewBox="0 0 40 10" role="img" aria-label="Issuer to central"><path d="M0 5h40"/></svg>`,
    `<h2 id="prose-with-island-diagram">prose-with-island-diagram</h2>\n<p>${hundredWords}</p>\n${markdownIsland("issuer-flow", "```mermaid\nflowchart LR\n  issuer --> central\n```")}`,
    `<h2 id="empty-section">empty-section</h2>`,
  ];

  // Act: prepare the generated page through the CLI pin; nothing is sent.
  const { output, report, lines } = lintGeneratedPage(bodySections);

  // Assert: one request per section with content, the views each one carries, none sent.
  expect(output.status, output.stderr).toBe(preparedExitStatus);
  expect(report.usage.model_requests).toBe(0);
  const requests = preparedRequestsFor(report, sectionViewRule);
  for (const request of requests) {
    expect(request.requested_model).toBe(requestedModel);
    expect(Object.keys(request.request.questions).sort()).toEqual(["needs_view", "views_carry"]);
  }
  const withoutLine = lineStartingWith(lines, '<h2 id="prose-without-picture">');
  const withSvgLine = lineStartingWith(lines, '<h2 id="prose-with-svg">');
  const withIslandLine = lineStartingWith(lines, '<h2 id="prose-with-island-diagram">');
  expect(firstLines(requests)).toEqual([withoutLine, withSvgLine, withIslandLine]);
  const without = requestAt(requests, withoutLine);
  const withSvg = requestAt(requests, withSvgLine);
  const withIsland = requestAt(requests, withIslandLine);
  expect(stateList(without, "blocks").some((block) => block.startsWith("<svg"))).toBe(false);
  expect(stateList(without, "island_views")).toEqual([]);
  expect(stateList(withSvg, "blocks").some((block) => block.startsWith("<svg"))).toBe(true);
  expect(stateList(withIsland, "island_views")).toHaveLength(1);
  const emptyLine = lineStartingWith(lines, '<h2 id="empty-section">');
  expect(requests.filter((request) => request.owner.piece.first_line === emptyLine)).toEqual([]);
  expect(
    report.results.find((result) => result.marker === "M002" && result.first_line === emptyLine)
      ?.outcome,
  ).toBe("not_applicable");
  expect(report.findings.filter((finding) => finding.rule === sectionViewRule)).toEqual([]);
});

test("a parent section cannot borrow its child's picture, and a Markdown heading starts its own mechanical M003 section", () => {
  // Arrange: the parent's prose sits above a child heading that holds the picture;
  // an island heading opens a sub-section with its own prose.
  const bodySections = [
    `<h2 id="parent">Parent</h2>\n<p>${hundredWords}</p>`,
    '<h3 id="child">Child</h3>\n<img src="flow.png" alt="Sign-in flow">',
    `<h2 id="island-host">Island host</h2>\n${markdownIsland(
      "island-with-heading",
      `\`\`\`mermaid\nflowchart LR\n  a --> b\n\`\`\`\n\n## Rollout\n\n${hundredWords}`,
    )}`,
  ];

  // Act: prepare the generated page through the CLI pin.
  const { output, report, lines } = lintGeneratedPage(bodySections);

  // Assert: each M002 request holds only its own section's views; M003 still nudges mechanically.
  expect(output.status, output.stderr).toBe(preparedExitStatus);
  const requests = preparedRequestsFor(report, sectionViewRule);
  const parentLine = lineStartingWith(lines, '<h2 id="parent">');
  const childLine = lineStartingWith(lines, '<h3 id="child">');
  const islandHostLine = lineStartingWith(lines, '<h2 id="island-host">');
  expect(firstLines(requests)).toEqual([parentLine, childLine, islandHostLine]);
  const parent = requestAt(requests, parentLine);
  const child = requestAt(requests, childLine);
  const islandHost = requestAt(requests, islandHostLine);
  expect(stateList(parent, "blocks").some((block) => block.includes("<img"))).toBe(false);
  expect(stateList(child, "blocks").some((block) => block.includes("<img"))).toBe(true);
  expect(stateList(islandHost, "island_views")).toHaveLength(1);
  const rolloutLine = lineStartingWith(lines, "## Rollout");
  expect(
    report.results.find((result) => result.marker === "M003" && result.first_line === rolloutLine)
      ?.outcome,
  ).toBe("finding");
  expect(
    report.findings.find(
      (finding) =>
        finding.rule === "presentation-html.island-section-picture" && finding.line === rolloutLine,
    )?.message,
  ).toMatch(/^100 words, no picture\./);
});

test("an HTML table with more than 20 rows nudges mechanically; each island table becomes one unsent M005 request", () => {
  // Arrange: header row plus body rows; 21 HTML rows nudge, 20 do not.
  const bodySections = [
    `<h2 id="tables">Tables</h2>\n${htmlTable("long-table", 20)}\n${htmlTable("limit-table", 19)}`,
    markdownIsland("long-island-table", pipeTable(20)),
    markdownIsland("limit-island-table", pipeTable(19)),
  ];

  // Act: prepare the generated page through the CLI pin.
  const { output, report, lines } = lintGeneratedPage(bodySections);

  // Assert: M004 keeps its row-count nudge; M005 asks its three questions per island table.
  expect(output.status, output.stderr).toBe(preparedExitStatus);
  expect(report.usage.model_requests).toBe(0);
  const tableFindings = report.findings
    .filter((finding) => finding.rule.includes("table"))
    .map((finding) => ({ rule: finding.rule, line: finding.line, message: finding.message }));
  expect(tableFindings).toEqual([
    {
      rule: "presentation-html.long-table",
      line: lineStartingWith(lines, '<table id="long-table">'),
      message: expect.stringMatching(/^21-row table\. Worth checking: is this optional detail/),
    },
  ]);
  expect(report.results.filter((result) => result.marker === "M004")).toHaveLength(2);
  const islandTableLines = lines
    .map((line, index) => ({ line, number: index + 1 }))
    .filter(({ line }) => line === "| ID | Proposed |")
    .map(({ number }) => number);
  expect(islandTableLines).toHaveLength(2);
  const islandRequests = preparedRequestsFor(report, islandTableRule);
  expect(firstLines(islandRequests)).toEqual(islandTableLines);
  for (const line of islandTableLines) requestAt(islandRequests, line);
  const tablesLine = lineStartingWith(lines, '<h2 id="tables">');
  expect(firstLines(preparedRequestsFor(report, sectionViewRule))).toEqual([tablesLine]);
  for (const request of islandRequests) {
    expect(request.requested_model).toBe(requestedModel);
    expect(Object.keys(request.request.questions).sort()).toEqual([
      "failure_cases",
      "long_detail",
      "optional_detail",
    ]);
  }
});
