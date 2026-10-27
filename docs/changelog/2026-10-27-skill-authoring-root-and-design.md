# 2026-10-27 Skill authoring: standards root and design

`skill-authoring` 0.5.0 → 0.6.0; release pending the owner's merge.

- Added hidden `domain-skill-crafting`, the single home for skill-text standards, and `skill-design`, which writes the four-part design set and its reader page before skill files change.
- `skill-creation` writes files from an accepted design or makes a mechanical edit. `skill-review` judges the design set and adds the transfer check; `skill-orchestrator` carries the design, writing, proof and review lifecycle.
- `skill-audit` sends flagged skills to independent review; a flagged skill whose review can't run stays `awaiting review`. `skill-rules` uses the current `sunstack exec` engine interface.
- First checked rules: eight of `domain-skill-crafting`'s standards are marked, in three RuleSets (two description checks evaluated locally; six model-judged rules assembled and printed, not evaluated until their evals). Every rule warns; nothing blocks. `skill-rules` adds `references/running-rules.md`; `skill-review`'s first rule pass and `skill-creation`'s self-check now run the rules and report each rule's state, never a pending or assumed pass. The orchestrator's and audit's rule sites stay pending.
- The repository's rule runner: `pnpm --dir tests/skills rules [skill folders]` (named in `AGENTS.md`), over `@sunstack/cli` 0.1.0 as a `tests/skills` dev dependency with only its build script allowed.
- Updated skill descriptions, Codex UI metadata, plugin keywords/default prompts, all three plugin versions, Claude/Cursor marketplace versions/descriptions, AGENTS guidance, architecture and README inventories. Extended the convergence rule's single-owner test to the two new skills. No commands or hooks added.
- Validation: `pnpm --dir tests/skills test` passes (19 files, 182 tests) and its typecheck passes; `claude plugin validate .` passes; the rule runner over all seven skill-authoring skills checks 8 rules and both metadata rules pass on all 7, with no model request.
- `codex plugin list --marketplace sunstack --available --json` succeeds; the installed listing still reports 0.5.0. This is discovery evidence, not delivery of 0.6.0.
- Codex and Claude caches: not refreshed; release pending the owner's merge.
