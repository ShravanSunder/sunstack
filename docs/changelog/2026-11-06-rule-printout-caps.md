# 2026-11-06 Rule printout caps

- `skill-authoring` 0.10.3 limits the agent-facing rule printout to 10 warnings and 10 uncertain entries per rule per run, with omitted counts and the full report path.
- Uncertain entries show source spans, rule, step and answers without evidence bodies. Printed finding blocks retain their standard, answers, path, cut and related locations; all error findings remain visible.
- The current-accounts printout applies the same warning cap. `report.json` and `accounts.json` retain every record and evidence body; status, usage, totals and exit codes are unchanged.
- Updated renderer/CLI wiring, recorded-report and native CLI tests, three plugin manifests and Claude/Cursor marketplace versions; Codex marketplace availability is unchanged.
- Validation: 53 test files / 325 tests pass, one live-provider skip; typecheck, scoped lint/format and marketplace validation pass. This candidate remains a draft pending the owner's printout decision.
- Codex/Claude/Cursor installed caches were not refreshed. No rule questions, bars or adoption state change.
