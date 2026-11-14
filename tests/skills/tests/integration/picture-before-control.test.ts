import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import {
  lineStartingWith,
  lintGeneratedPage,
  presentationHtmlReportSchema,
  runPresentationHtmlLint,
} from "#test-support/presentation-html-lint";
import {
  cleanupRulebookFixtures,
  createRulebookFixture,
  readJson,
  type NativeOutput,
} from "#test-support/sunstack-process";

afterEach(cleanupRulebookFixtures);

const frozenRevision = "a714d73191f57e777d612aa2bdf5a3768e4cda60";
const observationDigest = "d43732f5346bce930fb4f843dc22449c9c946c48a3f4717a2a33329762a7af06";
// The frozen book recorded the old rule's abstention on this island-only section
// (its Markdown held a "<" the raw-text check could not read). Parsed islands now
// decide it, and the owner ruled the choice rejected, so a nudge is the oracle.
const ownerRulingOverrides: Readonly<Record<string, "finding">> = {
  "b-agent-vm-assumptions-09-nov-63461154-pick-b2g": "finding",
};
const externalInputs = z
  .object({
    corpus: z.string().min(1).optional(),
    observations: z.string().min(1).optional(),
  })
  .parse({
    corpus: process.env.SUNSTACK_PICTURE_DEVELOPMENT_CORPUS,
    observations: process.env.SUNSTACK_PICTURE_DEVELOPMENT_OBSERVATIONS,
  });

test("active presentation-html rules validate with their own released CLI pin and no model", () => {
  // Arrange: use the active config, independently of the shared 0.9.0 engine.
  const ruleList = z.array(
    z.object({
      rule: z.string(),
      severity: z.string(),
      kind: z.object({ kind: z.string() }),
    }),
  );

  // Act: validate the real project and inspect what the agent will run.
  const checked = runPresentationHtmlLint(["--check"]);
  const listed = runPresentationHtmlLint(["--rules"]);

  // Assert: exactly the picture, section and table nudges, all mechanical warnings.
  expect(checked.status, checked.stderr).toBe(0);
  expect(listed.status, listed.stderr).toBe(0);
  expect(ruleList.parse(JSON.parse(listed.stdout))).toEqual(
    [
      "owner-decision.picture-before-control",
      "presentation-html.section-picture",
      "presentation-html.island-section-picture",
      "presentation-html.long-table",
      "presentation-html.long-island-table",
    ].map((rule) => ({ rule, severity: "warn", kind: { kind: "mechanical" } })),
  );
});

interface PictureCase {
  readonly choiceId: string;
  readonly section: string;
  readonly expected: "pass" | "finding" | "uncertain";
}

function markdownIsland(islandId: string, markdown: string): string {
  return `<ex-markdown id="${islandId}"><script type="text/markdown">\n${markdown}\n</script></ex-markdown>`;
}

function decisionSection(choiceId: string, heading: string, body: string): string {
  return [
    `<h2 id="${choiceId}-heading">${heading}</h2>`,
    body,
    `<ex-choice id="${choiceId}" title="${heading}: agree?">`,
    `<ex-option id="${choiceId}-agree" title="Agree"><template slot="summary">Keep it.</template></ex-option>`,
    `<ex-option id="${choiceId}-disagree" title="Disagree"><template slot="summary">Change it.</template></ex-option>`,
    "</ex-choice>",
  ].join("\n");
}

const pictureCases: readonly PictureCase[] = [
  {
    choiceId: "img",
    expected: "pass",
    section: decisionSection(
      "img",
      "Screenshot of the wrong-code state",
      '<p>The code field turns red.</p>\n<img src="wrong-code.png" alt="Sign-in form with a red code field">',
    ),
  },
  {
    choiceId: "svg",
    expected: "pass",
    section: decisionSection(
      "svg",
      "Inline drawing of the approval path",
      '<svg viewBox="0 0 40 10" role="img" aria-label="Browser to central"><path d="M0 5h40"/></svg>',
    ),
  },
  {
    choiceId: "figure",
    expected: "pass",
    section: decisionSection(
      "figure",
      "Captioned layout sketch",
      "<figure><pre>browser ──▶ issuer ──▶ central</pre><figcaption>Who signs the token</figcaption></figure>",
    ),
  },
  {
    choiceId: "picture",
    expected: "pass",
    section: decisionSection(
      "picture",
      "Responsive screenshot",
      '<picture><source srcset="device-dark.png" media="(prefers-color-scheme: dark)"><img src="device.png" alt="Device approval page"></picture>',
    ),
  },
  {
    choiceId: "canvas",
    expected: "pass",
    section: decisionSection(
      "canvas",
      "Rendered timing chart",
      '<canvas id="timing-chart" width="320" height="120" aria-label="Refresh timing"></canvas>',
    ),
  },
  {
    choiceId: "tree",
    expected: "pass",
    section: decisionSection(
      "tree",
      "Who owns each check",
      '<ex-tree title="Check owners"><script type="text/markdown">\n- Implementer\n  - unit tests\n- Verifier\n  - browser run\n</script></ex-tree>',
    ),
  },
  {
    choiceId: "earlier-heading-only",
    expected: "finding",
    section: [
      '<h2 id="context">Context with a picture</h2>',
      '<img src="flow.png" alt="Sign-in flow">',
      decisionSection(
        "earlier-heading-only",
        "A decision whose picture sits under the previous heading",
        "<p>The repeated approval returns the stored one.</p>",
      ),
    ].join("\n"),
  },
  {
    choiceId: "picture-after-choice",
    expected: "finding",
    section: `${decisionSection(
      "picture-after-choice",
      "A decision whose picture comes after it",
      "<p>The runner image has Chrome.</p>",
    )}\n<img src="runner.png" alt="Runner image contents">`,
  },
  {
    choiceId: "island-mermaid",
    expected: "pass",
    section: decisionSection(
      "island-mermaid",
      "Mermaid fence inside prose in an island",
      markdownIsland(
        "island-mermaid-text",
        "Requests arrive when `N - 65 s < T`.\n\n```mermaid\nflowchart LR\n  cli --> central\n```\n\nCentral answers once.",
      ),
    ),
  },
  {
    choiceId: "island-plantuml",
    expected: "pass",
    section: decisionSection(
      "island-plantuml",
      "PlantUML fence in an island",
      markdownIsland(
        "island-plantuml-text",
        "~~~plantuml\n@startuml\nBrowser -> Issuer: code\n@enduml\n~~~",
      ),
    ),
  },
  {
    choiceId: "island-image",
    expected: "pass",
    section: decisionSection(
      "island-image",
      "Markdown image in an island",
      markdownIsland(
        "island-image-text",
        "The wrong-code state:\n\n![Sign-in form with a red code field](wrong-code.png)",
      ),
    ),
  },
  {
    choiceId: "island-fence-inside-code",
    expected: "finding",
    section: decisionSection(
      "island-fence-inside-code",
      "A diagram fence quoted inside a code block",
      markdownIsland(
        "island-fence-inside-code-text",
        "How to write one:\n\n````md\n```mermaid\nflowchart LR\n  a --> b\n```\n````",
      ),
    ),
  },
  {
    choiceId: "island-earlier-heading-only",
    expected: "finding",
    section: [
      '<h2 id="island-context">Context with an island diagram</h2>',
      markdownIsland("island-context-text", "```mermaid\nflowchart LR\n  a --> b\n```"),
      decisionSection(
        "island-earlier-heading-only",
        "A decision whose island diagram sits under the previous heading",
        "<p>The issuer label changes.</p>",
      ),
    ].join("\n"),
  },
];

function runPictureCasePage(cases: readonly PictureCase[]): {
  readonly output: NativeOutput;
  readonly outcomes: Map<string, string | undefined>;
} {
  const { output, report, lines } = lintGeneratedPage(
    cases.map((pictureCase) => pictureCase.section),
  );
  const choiceResults = report.results.filter((result) => result.marker === "M001");
  expect(report.usage.model_requests).toBe(0);
  expect(choiceResults).toHaveLength(cases.length);
  const outcomes = new Map<string, string | undefined>();
  for (const pictureCase of cases) {
    const choiceLine = lineStartingWith(lines, `<ex-choice id="${pictureCase.choiceId}"`);
    const result = choiceResults.find((candidate) => candidate.first_line === choiceLine);
    outcomes.set(pictureCase.choiceId, result?.outcome);
  }
  return { output, outcomes };
}

test("each configured picture type before a choice in its own section passes; earlier-heading, later or quoted pictures still nudge", () => {
  // Arrange: one Demistify-shaped page, one heading section per picture case.
  const cases = pictureCases;

  // Act: run the active rule over the page through the pinned CLI.
  const { output, outcomes } = runPictureCasePage(cases);

  // Assert: every choice has exactly the expected mechanical outcome.
  expect(output.status, output.stderr).toBe(0);
  for (const pictureCase of cases) {
    expect(outcomes.get(pictureCase.choiceId), pictureCase.choiceId).toBe(pictureCase.expected);
  }
});

test("a Markdown heading inside an island between the section heading and the choice is uncertain", () => {
  // Arrange: the island's own heading may start the choice's real section.
  const cases: readonly PictureCase[] = [
    {
      choiceId: "island-heading",
      expected: "uncertain",
      section: decisionSection(
        "island-heading",
        "A section whose island opens a sub-section",
        markdownIsland(
          "island-heading-text",
          "```mermaid\nflowchart LR\n  a --> b\n```\n\n## Rollout\n\nNo picture here.",
        ),
      ),
    },
  ];

  // Act: run the active rule over the page through the pinned CLI.
  const { output, outcomes } = runPictureCasePage(cases);

  // Assert: the rule abstains rather than crediting the diagram above the island heading.
  expect(output.status, output.stderr).toBe(5);
  expect(outcomes.get("island-heading")).toBe("uncertain");
});

const observationSchema = z.object({
  corpus_revision: z.literal(frozenRevision),
  cases: z.array(
    z.object({
      id: z.string(),
      file: z.string(),
      lines: z.tuple([z.number().int().positive(), z.number().int().positive()]),
      expected: z.enum(["pass", "finding", "uncertain"]),
    }),
  ),
});
test.skipIf(externalInputs.corpus === undefined && externalInputs.observations === undefined)(
  "PRIVATE FROZEN CORPUS: 52 outcomes and 37 reviewed observations (SKIPPED when neither SUNSTACK_PICTURE_DEVELOPMENT_* input is supplied; fails on a partial or missing input)",
  () => {
    // Arrange: preserve private real pages externally, pinning both independent oracles.
    if (externalInputs.corpus === undefined || externalInputs.observations === undefined) {
      throw new Error(
        "Supply both SUNSTACK_PICTURE_DEVELOPMENT_CORPUS and SUNSTACK_PICTURE_DEVELOPMENT_OBSERVATIONS",
      );
    }
    const source = readFileSync(externalInputs.observations, "utf8");
    expect(createHash("sha256").update(source).digest("hex")).toBe(observationDigest);
    const observations = observationSchema.parse(JSON.parse(source));
    expect(
      execFileSync("git", ["rev-parse", "HEAD"], {
        cwd: externalInputs.corpus,
        encoding: "utf8",
      }).trim(),
    ).toBe(frozenRevision);
    expect(
      execFileSync("git", ["status", "--porcelain"], {
        cwd: externalInputs.corpus,
        encoding: "utf8",
      }),
    ).toBe("");
    const reportPath = path.join(createRulebookFixture(), "picture-report.json");

    // Act: run the active rule over the full frozen pages through the native CLI.
    const output = runPresentationHtmlLint([
      "--root",
      externalInputs.corpus,
      "--all",
      "--report",
      reportPath,
    ]);
    const report = presentationHtmlReportSchema.parse(readJson(reportPath));
    const choiceResults = report.results.filter((result) => result.marker === "M001");
    const choiceFindings = report.findings.filter(
      (finding) => finding.rule === "owner-decision.picture-before-control",
    );

    // Assert: literal reviewed geometry, including abstention, is the independent oracle.
    expect(output.status, output.stderr).toBe(0);
    expect(report.usage.model_requests).toBe(0);
    expect(report.requests).toEqual([]);
    expect(choiceResults).toHaveLength(52);
    expect(
      choiceResults.reduce<Record<string, number>>((counts, result) => {
        counts[result.outcome] = (counts[result.outcome] ?? 0) + 1;
        return counts;
      }, {}),
    ).toEqual({ pass: 17, finding: 35 });
    expect(observations.cases).toHaveLength(37);
    expect(observations.cases.map((observation) => observation.id)).toEqual(
      expect.arrayContaining(Object.keys(ownerRulingOverrides)),
    );
    for (const observation of observations.cases) {
      const results = choiceResults.filter(
        (result) =>
          result.file === observation.file &&
          result.first_line === observation.lines[0] &&
          result.last_line === observation.lines[1],
      );
      expect(results, observation.id).toHaveLength(1);
      expect(results[0]?.outcome, observation.id).toBe(
        ownerRulingOverrides[observation.id] ?? observation.expected,
      );
    }
    expect(choiceFindings).toHaveLength(35);
    for (const finding of choiceFindings) {
      expect(finding.severity).toBe("warn");
      expect(finding.message).toContain("Worth checking");
      expect(finding.message).toContain("may not need a picture");
      expect(finding.message).toContain("another heading");
      expect(finding.message).toContain("owner-decision-brief.md");
      expect(finding.message).toContain("options-and-decisions.md");
    }
  },
);
