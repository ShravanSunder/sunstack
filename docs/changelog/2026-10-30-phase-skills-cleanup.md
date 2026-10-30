# 2026-10-30 Phase skills cleanup

`sunstack-dev` 2.100.2 → 2.100.3.

- Seven phase skills checked against the creation-skill rules and fixed where a standard was really broken: `debug-investigation`, `docs-maintain`, `implementation-handoff`, `implementation-pr-wrapup`, `plan-handoff`, `plan-improve-repo`, `spec-handoff`. Each skill's purpose, calls, returns and route tokens are unchanged.
- In the six skills with a `Workflow` section, every step now states a completion an agent can check, or is merged into the step it serves; thin completions name the observable result and the work behind it. Each completion keeps the branches its skill already supports (read-only handoffs, no-plan handoffs, intentionally new paths, narrow docs edits). `implementation-pr-wrapup`'s Core Flow keeps its existing returns, each walked and found to have an observable done boundary.
- Three descriptions shortened to the owner's limits: `docs-maintain` 249 → 210, `implementation-pr-wrapup` 244 → 218, `plan-improve-repo` 253 → 186 characters; each keeps its loading moment and boundary.
- Reference sections that own a stage gained what good, bad or done looks like where it was missing; branch and call lines name their condition and return.
- Validation: twelve rules (sunstack #171's frozen kit, local engine build) on Jev, each run complete with no skipped rule. First run over the seven skills: 0 errors, no description warning, warnings 66 → 13, 166 uncertain. After the review corrections, the five changed skills were rechecked: 0 errors, 10 warnings, 94 uncertain; the first run stands for the unchanged `debug-investigation` and `plan-improve-repo`. Every finding and uncertain piece in those two runs has a recorded disposition. A fresh run over all seven at the final skill text found 0 errors and 14 warnings, each matching a recorded disposition. `claude plugin validate .` passes.
- The other seven phase skills are cleaned in sunstack #172, which rewrites them. Description trigger trials are not yet run (they wait on the owner's choice of how a fresh Luna session loads a branch plugin).
- Codex and Claude caches: not refreshed; release pending the owner's merge.
