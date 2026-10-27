# 2026-10-27 Skill authoring: standards root and design

`skill-authoring` 0.5.0 → 0.6.0; release pending the owner's merge.

- Added hidden `domain-skill-crafting`, the single home for skill-text standards, and `skill-design`, which writes the four-part design set and its reader page before skill files change.
- `skill-creation` writes files from an accepted design or makes a mechanical edit. `skill-review` judges the design set and adds the transfer check; `skill-orchestrator` carries the design, writing, proof and review lifecycle.
- `skill-audit` sends flagged skills to independent review. `skill-rules` uses the current `sunstack exec` engine interface. Rule-check sites remain pending; agent behavior on the next real skill change remains unverified.
- Updated skill descriptions, Codex UI metadata, plugin keywords/default prompts, all three plugin versions, Claude/Cursor marketplace versions/descriptions, AGENTS guidance, architecture and README inventories. Extended the convergence rule's single-owner test to the two new skills. No commands or hooks added.
- Validation: `pnpm --dir tests/skills test` passes (18 files, 169 tests); `claude plugin validate .` passes.
- `codex plugin list --marketplace sunstack --available --json` succeeds; the installed listing still reports 0.5.0. This is discovery evidence, not delivery of 0.6.0.
- Codex and Claude caches: not refreshed; release pending the owner's merge.
