import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";
import { unpackPinnedSource } from "../../lib/skill-rules/pinned-source.ts";

const repository = fileURLToPath(new URL("../../../../", import.meta.url));
const commit = "74e18127a8e8bea04c33b8c79259f11b96b7e2a1";
test("real Git extraction is byte-identical and disposal removes only its snapshot", () => {
  const source = {
    repository: "self",
    commit,
    path: "AGENTS.md",
    context: ["tests/skills/package.json"],
  };
  const snapshot = unpackPinnedSource({ source, self: repository });
  expect(snapshot.kind).toBe("ready");
  if (snapshot.kind !== "ready") throw new Error(snapshot.reason);
  try {
    expect(readFileSync(path.join(snapshot.directory, source.path))).toEqual(
      execFileSync("git", ["-C", repository, "show", `${commit}:${source.path}`]),
    );
    expect(existsSync(path.join(snapshot.directory, "tests/skills/package.json"))).toBe(true);
    expect(snapshot.directory.startsWith(repository)).toBe(false);
  } finally {
    snapshot.dispose();
  }
  expect(existsSync(snapshot.directory)).toBe(false);
});
test("a real missing path becomes a setup gap", () => {
  const snapshot = unpackPinnedSource({
    source: { repository: "self", commit, path: "missing-d24-source.md", context: [] },
    self: repository,
  });
  expect(snapshot.kind).toBe("setup-gap");
  if (snapshot.kind === "ready") snapshot.dispose();
});
