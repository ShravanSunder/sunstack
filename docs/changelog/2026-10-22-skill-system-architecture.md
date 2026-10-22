# 2026-10-22 Skill system architecture and onboarding

- Added `docs/architecture/`: skill layers and call forms, role/form/model boundaries, four-document design, capability through-lines, skill authoring, linter ownership and proof boundaries, and optional admired-source lineage under `docs/architecture/references/`.
- `AGENTS.md` links the architecture and plugin-owned inventories, removes the duplicate per-skill table, and replaces a stale machine-specific provenance path with checkout discovery. The root README links the architecture guide.
- The operating map now describes Cursor's shipped `metadata.pluginRoot` resolution separately from Codex/Claude source paths; no manifest was changed.
- Corrected the plugin README's stale draft-plan/later-approval and inline-execution summary to match `implement-plan`'s ready delivery context and assigned executor.
- Labeled ACPX provenance as historical and replaced the inspiration catalog's stale deferred-work-log pointer with the shipped trace/retrospective owners.
- Documents the shipped skill-authoring 0.4.0 surface separately from the unfinished released-CLI/lint consumer. Runtime skill files, manifests and plugin versions are unchanged.
- Validation: `git diff --check` clean; a Python Markdown link/anchor check passes across the changed documentation. No fresh skill behavior, installed-client, hosted-judge or engine-release claim is made by these changes.
- Refresh/reinstall: not required for repository documentation; no client caches changed.
