import { afterEach, expect, test } from "vitest";
import { lineStartingWith, lintGeneratedPage } from "#test-support/presentation-html-lint";
import { cleanupRulebookFixtures } from "#test-support/sunstack-process";

afterEach(cleanupRulebookFixtures);

const tenWords = "The issuer signs each token before central accepts the request.";
function proseWords(sentences: number): string {
  return Array.from({ length: sentences }, () => tenWords).join(" ");
}
const hundredWords = proseWords(10);
const ninetyWords = proseWords(9);

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

interface SectionCase {
  readonly headingId: string;
  readonly body: string;
  readonly expected: "pass" | "finding";
  readonly message?: string;
}

const sectionCases: readonly SectionCase[] = [
  {
    headingId: "prose-without-picture",
    body: `<p>${hundredWords}</p>`,
    expected: "finding",
    message: "100 words, no picture.",
  },
  { headingId: "short-prose", body: `<p>${ninetyWords}</p>`, expected: "pass" },
  {
    headingId: "prose-with-svg",
    body: `<p>${hundredWords}</p>\n<svg viewBox="0 0 40 10" role="img" aria-label="Issuer to central"><path d="M0 5h40"/></svg>`,
    expected: "pass",
  },
  {
    headingId: "prose-with-island-diagram",
    body: `<p>${hundredWords}</p>\n${markdownIsland("issuer-flow", "```mermaid\nflowchart LR\n  issuer --> central\n```")}`,
    expected: "pass",
  },
  {
    headingId: "island-prose-without-picture",
    body: markdownIsland("island-prose", hundredWords),
    expected: "finding",
    message: "100 words, no picture.",
  },
];

test("a heading section with at least 100 prose words and no picture nudges with its word count", () => {
  // Arrange: one h2 section per case; a picture in HTML or in an island counts.
  const bodySections = sectionCases.map(
    (sectionCase) =>
      `<h2 id="${sectionCase.headingId}">${sectionCase.headingId}</h2>\n${sectionCase.body}`,
  );

  // Act: lint the generated page through the pinned CLI.
  const { output, report, lines } = lintGeneratedPage(bodySections);

  // Assert: each section's own result and its finding text.
  expect(output.status, output.stderr).toBe(0);
  expect(report.usage.model_requests).toBe(0);
  const sectionResults = report.results.filter((result) => result.marker === "M002");
  for (const sectionCase of sectionCases) {
    const headingLine = lineStartingWith(lines, `<h2 id="${sectionCase.headingId}">`);
    const result = sectionResults.find((candidate) => candidate.first_line === headingLine);
    expect(result?.outcome, sectionCase.headingId).toBe(sectionCase.expected);
    const finding = report.findings.find(
      (candidate) =>
        candidate.rule === "presentation-html.section-picture" && candidate.line === headingLine,
    );
    if (sectionCase.message === undefined) {
      expect(finding, sectionCase.headingId).toBeUndefined();
    } else {
      expect(finding?.severity).toBe("warn");
      expect(finding?.message, sectionCase.headingId).toMatch(
        new RegExp(`^${sectionCase.message}`),
      );
    }
  }
});

test("a parent section cannot borrow its child's picture, and a Markdown heading starts its own section", () => {
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

  // Act: lint the generated page through the pinned CLI.
  const { output, report, lines } = lintGeneratedPage(bodySections);

  // Assert: the parent and the island's own Markdown section nudge; the island host passes.
  expect(output.status, output.stderr).toBe(0);
  const outcomeAt = (marker: string, line: number) =>
    report.results.find((result) => result.marker === marker && result.first_line === line)
      ?.outcome;
  expect(outcomeAt("M002", lineStartingWith(lines, '<h2 id="parent">'))).toBe("finding");
  expect(outcomeAt("M002", lineStartingWith(lines, '<h3 id="child">'))).toBe("pass");
  expect(outcomeAt("M002", lineStartingWith(lines, '<h2 id="island-host">'))).toBe("pass");
  expect(outcomeAt("M003", lineStartingWith(lines, "## Rollout"))).toBe("finding");
});

test("a table with more than 20 rows nudges with its row count, in HTML and in islands", () => {
  // Arrange: header row plus body rows; 21 rows nudge, 20 do not.
  const bodySections = [
    `<h2 id="tables">Tables</h2>\n${htmlTable("long-table", 20)}\n${htmlTable("limit-table", 19)}`,
    markdownIsland("long-island-table", pipeTable(20)),
    markdownIsland("limit-island-table", pipeTable(19)),
  ];

  // Act: lint the generated page through the pinned CLI.
  const { output, report, lines } = lintGeneratedPage(bodySections);

  // Assert: exactly the 21-row tables nudge, naming their row count.
  expect(output.status, output.stderr).toBe(0);
  const tableFindings = report.findings
    .filter((finding) => finding.rule.endsWith("table"))
    .map((finding) => ({ rule: finding.rule, line: finding.line, message: finding.message }));
  const islandTableLines = lines
    .map((line, index) => ({ line, number: index + 1 }))
    .filter(({ line }) => line === "| ID | Proposed |")
    .map(({ number }) => number);
  expect(tableFindings).toEqual([
    {
      rule: "presentation-html.long-table",
      line: lineStartingWith(lines, '<table id="long-table">'),
      message: expect.stringMatching(/^21-row table\. Worth checking: is this optional detail/),
    },
    {
      rule: "presentation-html.long-island-table",
      line: islandTableLines[0],
      message: expect.stringMatching(/^21-row table\. Worth checking: is this optional detail/),
    },
  ]);
  expect(
    report.results.filter((result) => result.marker === "M004" || result.marker === "M005"),
  ).toHaveLength(4);
});
