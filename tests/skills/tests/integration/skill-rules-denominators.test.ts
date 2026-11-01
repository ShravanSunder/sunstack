import path from "node:path";
import { describe, expect, test } from "vitest";
import { loadRuleDenominators } from "../../lib/skill-rules/denominators.ts";
import { kitRelative, repositoryRoot } from "../support/test-fixture.ts";

describe("unread, inside each rule's declared denominator (D3a)", () => {
  test("the repository's own denominators name each rule's kind and files", () => {
    const denominators = loadRuleDenominators(
      path.join(repositoryRoot, kitRelative, "skill-rules.config.json"),
    );
    expect(denominators.find((item) => item.rule === "placement.product-workflow")).toMatchObject({
      kind: "section",
      files: ["**/SKILL.md", "**/references/**/*.md"],
    });
    expect(denominators.find((item) => item.rule === "question.names-field")).toMatchObject({
      kind: "rule_question",
      files: ["**/rules/*.rules.json"],
    });
    expect(denominators.find((item) => item.rule === "completion.criterion")?.within).toEqual([
      "workflow_section",
    ]);
  });
});
