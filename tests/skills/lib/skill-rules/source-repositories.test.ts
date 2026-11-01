import { describe, expect, test } from "vitest";
import { resolveSourceRepository } from "./source-repositories.ts";

describe("local source repositories", () => {
  test("self resolves independently of upstream configuration", () => {
    expect(resolveSourceRepository({ repository: "self", self: "/workspace" })).toEqual({
      kind: "resolved", directory: "/workspace",
    });
  });
  test.each([
    ["https://github.com/mitsuhiko/agent-stuff", "mitsupi-agent-stuff"],
    ["https://github.com/steipete/agent-scripts", "steipete-agent-scripts"],
    ["https://github.com/obra/superpowers", "obra-superpowers"],
  ])("maps %s to its local collection without fetching", (repository, folder) => {
    expect(resolveSourceRepository({ repository, self: "/workspace", collectionsRoot: "/collections" })).toEqual({
      kind: "resolved", directory: `/collections/${folder}`,
    });
  });
  test("missing configuration and unknown names remain setup gaps", () => {
    expect(resolveSourceRepository({ repository: "https://github.com/obra/superpowers", self: "/workspace" }).kind).toBe("setup-gap");
    expect(resolveSourceRepository({ repository: "../elsewhere", self: "/workspace", collectionsRoot: "/collections" }).kind).toBe("setup-gap");
  });
});
