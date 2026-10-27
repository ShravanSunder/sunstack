# First checked rules: skill verification

Draft 1, by the 🦁 Lead, 2026-10-27. Part four of the design set: [requirements](requirements.md), [specification](specification.md), [skill design](skill-design.md), skill verification. Routes were decided with `skill-rules/references/decision-matrix.md`.

| Obligation | Route, and the property it was decided on | Passing condition (a wrong build fails it) |
| --- | --- | --- |
| F1 eight markers | review check: placement across files | exactly eight bound markers, one per named sentence's list item; none elsewhere; no description holds `<!--` |
| F2 assembly | native engine check | `pnpm --dir tests/skills rules --check` returns `kind: checked` and `checked_rule_count: 8` with the eight rule IDs, exit 0; a refusal or a missing ID fails |
| F3 metadata rules | mechanical, calibrated: a literal property of one field | for each: a good fixture completes `pass` and a bad one `fail` in the engine's report; both passing or both failing fails |
| F4 judged rules | review check: the printed question read as its standard | each of the six printed questions states its one standard with its subject; the report and the run sites say `not evaluated`; any claim that a judged rule passed fails |
| F5 severity | mechanical: a literal field | every entry's severity is `warn` |
| F6 targets | native report | the dogfood run's occurrences include `SKILL.md` and reference files of every skill-authoring skill; `SKILL.md`-only selection fails |
| F7 the runner | the runner's own test, plus the dogfood run | the test builds requests with one binding group per file and the default skill list, and resolves the engine in the named order; the dogfood run over every skill-authoring skill completes with the engine's exit status and both responses kept |
| F8, F9 run sites | review check: source walks | a review walk reaches the runner, turns a mechanical failure into a candidate finding, and records judged rules as not evaluated; a creation walk fixes or names a failure before the diff comparison; a walk where no runner is named reports a gap |
| F10 portability | review check | no skill text names `pnpm`, `tests/skills` or an ai-tools path; `AGENTS.md` names the command |
| F11 untouched sites | review check | the orchestrator's and the audit's sites are byte-identical |

## The dogfood run, and what it shows

After the runs land: the runner on every skill-authoring skill. It shows the eight rules assemble, the two mechanical rules complete on every `SKILL.md`, and every skill's description starts with `Use when` within 1,024 characters, or names the one that doesn't. Then the unit's implementation review runs the new first pass on this change's own files: the rules run inside the skills that run them, by fresh reviewer agents whose records show which copy of `skill-review` they loaded.

## Behavior, and what stays unverified

- This change is the next real skill change through milestone 1's lifecycle, so the review and the runs are the owner's chosen behavior proof for milestone 1: agents designing, reviewing and writing with the new skills, read from their records.
- Unverified until later: how a hosted judge answers the six judged rules (evals, unit U4); whether the orchestrator's and audit's sites work once switched on; installing the engine from npm in this environment, which needs the owner's approval (until then the runner uses the engine on the path or a given path).
