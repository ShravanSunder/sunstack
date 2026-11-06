# 2026-11-05 Rule scenarios and owner adoption

- `skill-authoring` 0.10.1 moves all 245 scenarios out of the runtime skill: one file per rule under `tests/skills/evals/rule-scenarios/`, with 65 retired scenarios preserved separately. IDs, labels, sources and expected behavior are unchanged.
- `evals:scenarios [rule…]` replaces `rules:expect`. Run reports, engine evidence/answers, stderr and config stay only under ignored `tests/skills/tmp/scenario-runs/`; the five committed run records are deleted.
- Explicit owner-instructed `evals:adopt <rule> --report <path>` records adoption only from a complete current passing report, refusing unsure, failing, partial or stale results. Ordinary lint reads adoption and holds missing/changed entries as `not_adopted` in both outputs. The shipped adoption file is `{}`.
- Schemas, runner/scorer modules, scripts, tests, tests README and the prior evidence reference use scenario terminology; the rule-running reference's command paragraph names the replacement CLI. Plugin manifests and Claude/Cursor marketplace versions match; Codex availability is unchanged.
- Keyless proof covers the 245-scenario migration, real scenario-run→adoption→ordinary-CLI path and refusal cases. [Proof and limits](references/2026-11-05-scenario-adoption.md).
- Installed Codex/Claude/Cursor caches were not refreshed. No rule was adopted; semantic tuning, kind gates and fresh trust scenarios remain D3 work.
