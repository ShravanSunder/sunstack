import { spawnSync } from "node:child_process";

export interface EngineRequest {
  readonly engine: string;
  readonly directory: string;
  readonly arguments: readonly string[];
}
export interface EngineResult {
  readonly status: number | null;
  readonly stdout: string;
  readonly stderr: string;
  readonly signal: NodeJS.Signals | null;
  readonly error: string | null;
}

export function runLintEngine(request: EngineRequest): EngineResult {
  const result = spawnSync(request.engine, [...request.arguments], {
    cwd: request.directory,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return {
    status: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
    signal: result.signal,
    error: result.error?.message ?? null,
  };
}
