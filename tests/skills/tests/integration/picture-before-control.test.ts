import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import {
  cleanupRulebookFixtures,
  createRulebookFixture,
  nativeReportSchema,
  readJson,
  repositoryRoot,
  type NativeOutput,
} from "#test-support/sunstack-process";

afterEach(cleanupRulebookFixtures);

const config = path.join(
  repositoryRoot,
  "plugins/sunstack-dev/skills/presentation-html/rules/presentation-html.config.json",
);
const engine = "@sunstack/cli@0.18.0";
const frozenRevision = "a714d73191f57e777d612aa2bdf5a3768e4cda60";
const observationDigest = "d43732f5346bce930fb4f843dc22449c9c946c48a3f4717a2a33329762a7af06";
const externalInputs = z
  .object({
    corpus: z.string().min(1).optional(),
    observations: z.string().min(1).optional(),
  })
  .parse({
    corpus: process.env.SUNSTACK_PICTURE_DEVELOPMENT_CORPUS,
    observations: process.env.SUNSTACK_PICTURE_DEVELOPMENT_OBSERVATIONS,
  });

function runPictureLint(arguments_: readonly string[]): NativeOutput {
  const output = spawnSync("pnpm", ["dlx", engine, "lint", "--config", config, ...arguments_], {
    cwd: repositoryRoot,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
    env: { ...process.env, OPENROUTER_API_KEY: "", SUNSTACK_CREDENTIAL_STORE: "off" },
  });
  if (output.error) throw output.error;
  return { status: output.status, stdout: output.stdout, stderr: output.stderr };
}

test("active picture rule validates with its own released CLI pin and no model", () => {
  // Arrange: use the active config, independently of the shared 0.9.0 engine.
  const ruleList = z.array(
    z.object({
      rule: z.string(),
      severity: z.string(),
      kind: z.object({ kind: z.string() }),
    }),
  );

  // Act: validate the real project and inspect what the agent will run.
  const checked = runPictureLint(["--check"]);
  const listed = runPictureLint(["--rules"]);

  // Assert: no asking rule, held companion or extra rule is activated.
  expect(checked.status, checked.stderr).toBe(0);
  expect(listed.status, listed.stderr).toBe(0);
  expect(ruleList.parse(JSON.parse(listed.stdout))).toEqual([
    {
      rule: "owner-decision.picture-before-control",
      severity: "warn",
      kind: { kind: "mechanical" },
    },
  ]);
});

interface PictureCase {
  readonly choiceId: string;
  readonly section: string;
  readonly expected: "pass" | "finding";
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
];

test("each configured picture type before a choice in its own section passes; earlier-heading or later pictures still nudge", () => {
  // Arrange: one Demistify-shaped page, one heading section per picture case.
  const root = createRulebookFixture();
  const page = [
    "<!doctype html>",
    '<html lang="en"><head><meta charset="utf-8"><title>Picture cases</title></head><body>',
    "<h1>Picture cases</h1>",
    ...pictureCases.map((pictureCase) => pictureCase.section),
    "</body></html>",
    "",
  ].join("\n");
  const pagePath = path.join(root, "picture-cases.html");
  writeFileSync(pagePath, page);
  const lines = page.split("\n");
  const reportPath = path.join(root, "picture-cases-report.json");

  // Act: run the active rule over the page through the pinned CLI.
  const output = runPictureLint(["--root", root, "--report", reportPath, pagePath]);
  const report = pictureReportSchema.parse(readJson(reportPath));

  // Assert: every choice has exactly the expected mechanical outcome.
  expect(output.status, output.stderr).toBe(0);
  expect(report.usage.model_requests).toBe(0);
  expect(report.results).toHaveLength(pictureCases.length);
  for (const pictureCase of pictureCases) {
    const choiceLine =
      lines.findIndex((line) => line.startsWith(`<ex-choice id="${pictureCase.choiceId}"`)) + 1;
    const result = report.results.find((candidate) => candidate.first_line === choiceLine);
    expect(result?.outcome, pictureCase.choiceId).toBe(pictureCase.expected);
  }
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
const pictureReportSchema = nativeReportSchema.extend({
  findings: z.array(nativeReportSchema.shape.findings.element.extend({ message: z.string() })),
  results: z.array(
    nativeReportSchema.shape.results.element.extend({
      file: z.string(),
      first_line: z.number().int().positive(),
      last_line: z.number().int().positive(),
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
    const output = runPictureLint([
      "--root",
      externalInputs.corpus,
      "--all",
      "--report",
      reportPath,
    ]);
    const report = pictureReportSchema.parse(readJson(reportPath));

    // Assert: literal reviewed geometry, including abstention, is the independent oracle.
    expect(output.status, output.stderr).toBe(5);
    expect(report.usage.model_requests).toBe(0);
    expect(report.requests).toEqual([]);
    expect(report.results).toHaveLength(52);
    expect(
      report.results.reduce<Record<string, number>>((counts, result) => {
        counts[result.outcome] = (counts[result.outcome] ?? 0) + 1;
        return counts;
      }, {}),
    ).toEqual({ pass: 17, finding: 34, uncertain: 1 });
    expect(observations.cases).toHaveLength(37);
    for (const observation of observations.cases) {
      const results = report.results.filter(
        (result) =>
          result.file === observation.file &&
          result.first_line === observation.lines[0] &&
          result.last_line === observation.lines[1],
      );
      expect(results, observation.id).toHaveLength(1);
      expect(results[0]?.outcome, observation.id).toBe(observation.expected);
    }
    for (const finding of report.findings) {
      expect(finding.severity).toBe("warn");
      expect(finding.message).toContain("Worth checking");
      expect(finding.message).toContain("may not need a picture");
      expect(finding.message).toContain("another heading");
      expect(finding.message).toContain("owner-decision-brief.md");
      expect(finding.message).toContain("options-and-decisions.md");
    }
  },
);
