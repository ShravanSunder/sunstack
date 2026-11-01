import path from "node:path";

export interface RepositoryRequest {
  readonly repository: string;
  readonly self: string;
  readonly collectionsRoot?: string;
}
export type SourceRepository =
  | { readonly kind: "resolved"; readonly directory: string }
  | { readonly kind: "setup-gap"; readonly reason: string };

// Submodule names from ai-dev-skills/.gitmodules. The caller supplies its local checkout root;
// absent configuration never triggers network access or a scan of the user's home directory.
const collectionDirectories: Readonly<Record<string, string>> = {
  "https://github.com/mitsuhiko/agent-stuff": "mitsupi-agent-stuff",
  "https://github.com/steipete/agent-scripts": "steipete-agent-scripts",
  "https://github.com/obra/superpowers": "obra-superpowers",
};

export function resolveSourceRepository(request: RepositoryRequest): SourceRepository {
  if (request.repository === "self")
    return { kind: "resolved", directory: path.resolve(request.self) };
  if (request.repository === "agentstudio" && process.env.AGENTSTUDIO_REPOSITORY)
    return { kind: "resolved", directory: path.resolve(process.env.AGENTSTUDIO_REPOSITORY) };
  const folder = collectionDirectories[request.repository];
  if (folder && request.collectionsRoot)
    return { kind: "resolved", directory: path.resolve(request.collectionsRoot, folder) };
  return { kind: "setup-gap", reason: `No local repository configured for ${request.repository}` };
}
