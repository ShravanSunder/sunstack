import { describe, expect, test } from "vitest";
import { parseRuleExpectations } from "./expectations.ts";

const entry = {
  id: "real-place",
  rule: "placement.product-workflow",
  source: {
    repository: "self",
    commit: "74e18127a8e8bea04c33b8c79259f11b96b7e2a1",
    path: "plugins/sunstack-dev/skills/ops-observability-stack/SKILL.md",
    context: [],
  },
  piece_first_line: 6,
  expect: "must_fire",
  lines: [17, 18],
  kind: "regression_example",
  basis: "Historical owner-reviewed source",
  decided_by: { how: "independent", who: ["blind judges"] },
  added: "2026-11-01",
};
const rules = ["placement.product-workflow"];
describe("expectation contract", () => {
  test("preserves source, provenance and independently specified finding lines", () => {
    expect(parseRuleExpectations({ expectations: [entry] }, rules)).toEqual([entry]);
  });
  test("rejects a rule absent from the sibling file", () => {
    expect(() => parseRuleExpectations({ expectations: [entry] }, [])).toThrow(
      "absent from its sibling",
    );
  });
  test("must_fire cannot omit its acceptable lines", () => {
    const { lines: _lines, ...withoutLines } = entry;
    expect(() => parseRuleExpectations({ expectations: [withoutLines] }, rules)).toThrow(
      "must_fire requires",
    );
  });
  test.each(["model", "labelers-agreed"])("rejects uncontracted decision source %s", (how) => {
    expect(() =>
      parseRuleExpectations({ expectations: [{ ...entry, decided_by: { how } }] }, rules),
    ).toThrow();
  });
  test("independent decisions need named judges", () => {
    expect(() =>
      parseRuleExpectations(
        { expectations: [{ ...entry, decided_by: { how: "independent" } }] },
        rules,
      ),
    ).toThrow();
    expect(() =>
      parseRuleExpectations(
        { expectations: [{ ...entry, decided_by: { how: "independent", who: [] } }] },
        rules,
      ),
    ).toThrow();
  });
  test("duplicate identities are rejected", () => {
    expect(() => parseRuleExpectations({ expectations: [entry, entry] }, rules)).toThrow(
      "Duplicate expectation",
    );
  });
  test("unknown retains its basis without becoming a pass", () => {
    const { lines: _lines, ...withoutLines } = entry;
    expect(
      parseRuleExpectations(
        { expectations: [{ ...withoutLines, expect: "unknown", decided_by: { how: "author" } }] },
        rules,
      )[0]?.expect,
    ).toBe("unknown");
  });
});
