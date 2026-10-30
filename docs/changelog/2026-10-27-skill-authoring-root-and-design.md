# 2026-10-27 Skill authoring: standards root and design

`skill-authoring` 0.5.0 → 0.6.0; release pending the owner's merge, after the sunstack-tools engine release it needs.

- Added hidden `domain-skill-crafting`, the single home for skill-text standards, and `skill-design`, which writes the four-part design set and its reader page before skill files change.
- `skill-creation` writes files from an accepted design or makes a mechanical edit. `skill-review` judges the design set and adds the transfer check; `skill-orchestrator` carries the design, writing, proof and review lifecycle. `skill-audit` sends flagged skills to independent review.
- Rules in use: twelve of `domain-skill-crafting`'s standards are checked rules, each a decision model over ast-grep evidence (`skill`, `step`, `load`, `branch`, `sentence`, `reference_section`) on `sunstack lint --config`, with Jev judging by default. One `rules/skill-rules.config.json` and an `evidence/` project replace the three RuleSets.
- Descriptions: four openers (`Use when`, `Trigger when`, `Always use when`, `Always trigger when`); over 225 characters warns, over 300 fails as `error`; Jev judges the description itself. The seven skill-authoring descriptions are rewritten at 165-182 characters.
- The four sites run the rules: `skill-creation`'s self-check, `skill-review`'s first pass, `skill-orchestrator`'s prove step and `skill-audit`. `skill-rules`' `running-rules.md` reads every outcome one way; an `uncertain` piece goes back to the calling agent to decide.
- The rule runner is TypeScript: `pnpm --dir tests/skills rules [paths] [--since REV] [--check]`. It refuses a full run that selects nothing and leaves the key to the engine. The `.mjs` runner is removed.
- Rule tests: labelled cases from real skills in `tests/skills/evals` (vitest-evals). Craft-rule labels come from two blind labelers and a settler. Held-out results are provisional until the owner's spot-checks; generalization waits on the owner's labels. Every judged rule warns; nothing blocks.
- Updated skill descriptions, Codex UI metadata, plugin versions, marketplace entries, AGENTS guidance, the architecture doc and README inventories. No commands or hooks added.
- Validation: `pnpm --dir tests/skills test` 231/231 and typecheck pass with a local engine build; `rules --check` assembles 12 rules; `claude plugin validate .` passes; every rule over the seven skill-authoring skills on Jev: 0 errors, 27 warnings, 0 incomplete. Details: [rules in use evidence](references/2026-10-29-rules-in-use-evidence.md).
- Codex and Claude caches: not refreshed; release pending the owner's merge.
