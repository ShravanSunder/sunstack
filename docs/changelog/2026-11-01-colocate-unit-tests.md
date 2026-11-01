# 2026-11-01 Shared code standards, and the Standards line

`sunstack-dev` 2.102.1 → 2.103.0 and `ai-scaffold` 0.2.3 → 0.3.0. PR #189 reworked on the owner's decision: the owner's coding standards are written once, and each repository says whose standards apply.

- New hidden `domain-code-standards`.
  - Before a choice a standard governs, read the repository's AGENTS.md Standards line and apply that set alone: the owner's, or the repository's own. With no line, ask the owner; never infer or mix.
  - It holds the owner's shared standards: unit tests beside their module, `tests/` only for integration, e2e and shared helpers, old forms moved when a module is edited, naming by responsibility, test structure and documentation.
  - It also holds the monorepo standards (uv and pnpm workspaces, pure models, absolute imports, permission before config edits).
- `domain-typescript`, `domain-rust` and `domain-python` load it first and keep only their language's forms: `<module>.test.ts`; `<module>_test.rs` via `#[cfg(test)] #[path] mod tests;`; `<module>_test.py`. `domain-typescript` allows `as const`. A new hidden `domain-swift` loads it too and holds the Swift standards; Swift's unit tests stay in SPM `Tests/` targets.
- `scaffold-project` asks whose standards the repository follows (`--standards owner|own`). It writes a `## Standards` section into CLAUDE.md, linking the skills or pointing to the repository's own standards file.
  - A retrofit appends the section once, and never replaces an instruction file or link.
  - The scaffold writes no rules files: standards reach agents, Cursor included, only through the skills. The four `.cursor/rules` templates are deleted.
- This repository's AGENTS.md gains its Standards section.
- Design set and reviews: `docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/`.
- Validation: `tests/skills` vitest 293/293 (the scaffold script tests included), typecheck exit 0, `rules --check` exit 0 (13 rules), `claude plugin validate .` passed.
- Unverified: agent behavior under the Standards line (pressure tasks come next), and client loading of linked hidden skills.
- Codex and Claude caches: not refreshed.
