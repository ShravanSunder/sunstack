import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { z } from "zod";
import { resolveSourceRepository } from "./source-repositories.ts";

const relativePathSchema = z
  .string()
  .min(1)
  .refine(
    (value) =>
      !path.isAbsolute(value) &&
      !value.includes("\\") &&
      !value.includes(":") &&
      value.split("/").every((part) => part !== ".." && part !== "." && part !== ""),
    "Expected a repository-relative literal path",
  );
export const pinnedSourceSchema = z.object({
  repository: z.string().min(1),
  commit: z.string().regex(/^[a-f0-9]{40}$/),
  path: relativePathSchema,
  context: z.array(relativePathSchema),
});
export type PinnedSource = z.infer<typeof pinnedSourceSchema>;
export interface GitArchiveResult {
  readonly status: number | null;
  readonly stdout: Buffer;
  readonly stderr: string;
}
export interface GitArchiveRequest {
  readonly directory: string;
  readonly commit: string;
  readonly paths: readonly string[];
}
export type GitArchive = (request: GitArchiveRequest) => GitArchiveResult;
export interface UnpackRequest {
  readonly source: PinnedSource;
  readonly self: string;
  readonly collectionsRoot?: string;
  readonly archive?: GitArchive;
}
export type PinnedSnapshot =
  | { readonly kind: "ready"; readonly directory: string; readonly dispose: () => void }
  | { readonly kind: "setup-gap"; readonly reason: string };

function archiveGitSource(request: GitArchiveRequest): GitArchiveResult {
  const result = spawnSync(
    "git",
    ["-C", request.directory, "archive", "--format=tar", request.commit, "--", ...request.paths],
    { maxBuffer: 128 * 1024 * 1024 },
  );
  return {
    status: result.status,
    stdout: result.stdout ?? Buffer.alloc(0),
    stderr: result.error?.message ?? result.stderr?.toString("utf8") ?? "",
  };
}

/** Archive bytes come only from Git; extraction and disposal never register a worktree. */
export function unpackPinnedSource(request: UnpackRequest): PinnedSnapshot {
  const parsed = pinnedSourceSchema.safeParse(request.source);
  if (!parsed.success) return { kind: "setup-gap", reason: parsed.error.message };
  const repository = resolveSourceRepository({
    repository: parsed.data.repository,
    self: request.self,
    ...(request.collectionsRoot ? { collectionsRoot: request.collectionsRoot } : {}),
  });
  if (repository.kind === "setup-gap") return repository;
  const directory = mkdtempSync(path.join(tmpdir(), "skill-rule-source-"));
  const dispose = (): void => rmSync(directory, { recursive: true, force: true });
  try {
    const archived = (request.archive ?? archiveGitSource)({
      directory: repository.directory,
      commit: parsed.data.commit,
      paths: [...new Set([parsed.data.path, ...parsed.data.context])],
    });
    if (archived.status !== 0) {
      dispose();
      return {
        kind: "setup-gap",
        reason: `git archive exit ${archived.status ?? "terminated"}: ${archived.stderr.trim() || "no error detail"}`,
      };
    }
    const extracted = spawnSync("tar", ["-xf", "-", "-C", directory], {
      input: archived.stdout,
      encoding: "utf8",
    });
    if (extracted.status !== 0 || extracted.error) {
      dispose();
      return {
        kind: "setup-gap",
        reason: `tar extraction failed: ${extracted.error?.message ?? extracted.stderr}`,
      };
    }
    return { kind: "ready", directory, dispose };
  } catch (error) {
    dispose();
    return { kind: "setup-gap", reason: error instanceof Error ? error.message : String(error) };
  }
}
