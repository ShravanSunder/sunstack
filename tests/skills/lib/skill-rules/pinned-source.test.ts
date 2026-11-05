import { describe, expect, test } from "vitest";
import { unpackPinnedSource } from "./pinned-source.ts";
import type { PinnedSource } from "./pinned-source.ts";

const source: PinnedSource = {
  repository: "self",
  commit: "74e18127a8e8bea04c33b8c79259f11b96b7e2a1",
  path: "AGENTS.md",
  context: [],
};
describe("pinned source setup failures", () => {
  test.each([
    [128, "fatal: not a valid object name: missing"],
    [128, "fatal: pathspec 'missing.md' did not match any files"],
    [null, "spawn git ENOENT"],
  ])("returns Git failure %s without a fallback", (status, stderr) => {
    const result = unpackPinnedSource({
      source,
      self: "/repository",
      archive: (request) => {
        expect(request.paths).toEqual(["AGENTS.md"]);
        expect(request.commit).toBe(source.commit);
        return { status, stdout: Buffer.alloc(0), stderr };
      },
    });
    expect(result).toEqual({
      kind: "setup-gap",
      reason: `git archive exit ${status ?? "terminated"}: ${stderr}`,
    });
  });
  test("a missing repository mapping never invokes Git", () => {
    const result = unpackPinnedSource({
      source: { ...source, repository: "unknown" },
      self: "/repository",
      archive: () => {
        throw new Error("must not run");
      },
    });
    expect(result).toEqual({
      kind: "setup-gap",
      reason: "No local repository configured for unknown",
    });
  });
  test("invalid archive paths fail before Git", () => {
    expect(
      unpackPinnedSource({ source: { ...source, path: "../escape" }, self: "/repository" }).kind,
    ).toBe("setup-gap");
  });
});
