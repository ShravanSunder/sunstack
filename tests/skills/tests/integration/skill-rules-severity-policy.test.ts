import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { z } from "zod";
import { kitRelative, repositoryRoot } from "../../lib/skill-rules/test-fixture.ts";

// Our rules' severity policy (R5a): `error` only where every path to a finding is mechanical; any
// path that reads a model's answer, a gate included, reaches only `warn`. The engine keeps whatever
// severity is authored, so this check reads the rule files themselves.
const stepSchema = z.record(z.string(), z.unknown());
const entrySchema = z
  .object({
    name: z.string(),
    severity: z.enum(["warn", "error"]).optional(),
    decision: z.object({ start: z.string(), steps: z.record(z.string(), stepSchema) }),
  })
  .passthrough();
type Entry = z.infer<typeof entrySchema>;

function routesOf(step: Record<string, unknown>): unknown[] {
  const routes: unknown[] = [step["yes"], step["no"], step["uncertain"]];
  const labelled = step["routes"];
  if (labelled && typeof labelled === "object") routes.push(...Object.values(labelled));
  return routes.filter((route) => route !== undefined);
}

/** Each finding route that a path through a judged step reaches with severity `error`. */
function judgedErrorRoutes(entry: Entry): string[] {
  const violations: string[] = [];
  const visit = (stepName: string, judged: boolean, seen: ReadonlySet<string>): void => {
    if (seen.has(stepName)) return;
    const step = entry.decision.steps[stepName];
    if (!step) return;
    const readsAnswer = "ask" in step || "combine" in step;
    const nowJudged = judged || readsAnswer;
    for (const route of routesOf(step)) {
      if (typeof route === "string") {
        visit(route, nowJudged, new Set([...seen, stepName]));
        continue;
      }
      const finding = z
        .object({ finding: z.string(), severity: z.enum(["warn", "error"]).optional() })
        .passthrough()
        .safeParse(route);
      if (!finding.success) continue;
      const severity = finding.data.severity ?? entry.severity ?? "warn";
      if (nowJudged && severity === "error") violations.push(`${entry.name} at ${stepName}`);
    }
  };
  visit(entry.decision.start, false, new Set());
  return violations;
}

function rulebookEntries(): Entry[] {
  const configFile = path.join(repositoryRoot, kitRelative, "skill-rules.config.json");
  const config = z
    .object({ rulebook: z.array(z.object({ rules: z.string() })) })
    .passthrough()
    .parse(JSON.parse(readFileSync(configFile, "utf8")));
  return config.rulebook.flatMap((pair) =>
    Object.values(
      z
        .record(z.string(), entrySchema)
        .parse(JSON.parse(readFileSync(path.join(path.dirname(configFile), pair.rules), "utf8"))),
    ),
  );
}

describe("our severity policy over the rule files (R5a)", () => {
  test("no path that reads a model's answer reaches an error finding in the delivered rules", () => {
    const entries = rulebookEntries();
    expect(entries.length).toBeGreaterThan(0);
    expect(entries.flatMap(judgedErrorRoutes)).toEqual([]);
  });

  test("the check catches a judged gate followed by a mechanical error, and a route-level override", () => {
    const gateThenError: Entry = {
      name: "control.gate-then-error",
      severity: "error",
      decision: {
        start: "gate",
        steps: {
          gate: { ask: "gate", yes_at_or_above: 0.7, no_at_or_below: 0.3, yes: "length", no: "not_applicable" },
          length: { mechanical_check: { tool: "max_chars", field: "description", max: 300 }, yes: "pass", no: { finding: "Too long.", at: "description" } },
        },
      },
    };
    const routeOverride: Entry = {
      name: "control.route-override",
      decision: {
        start: "verdict",
        steps: {
          verdict: { ask: "verdict", yes_at_or_above: 0.7, no_at_or_below: 0.3, yes: "pass", no: { finding: "No.", at: "body", severity: "error" } },
        },
      },
    };
    const mechanicalError: Entry = {
      name: "control.mechanical-error",
      severity: "error",
      decision: {
        start: "length",
        steps: { length: { mechanical_check: { tool: "max_chars", field: "description", max: 300 }, yes: "pass", no: { finding: "Too long.", at: "description" } } },
      },
    };
    expect(judgedErrorRoutes(gateThenError)).toEqual(["control.gate-then-error at length"]);
    expect(judgedErrorRoutes(routeOverride)).toEqual(["control.route-override at verdict"]);
    expect(judgedErrorRoutes(mechanicalError)).toEqual([]);
  });
});
