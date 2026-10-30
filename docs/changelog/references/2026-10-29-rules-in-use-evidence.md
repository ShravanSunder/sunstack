# Rules in use: validation evidence (29 Oct 2026)

Evidence for the 0.6.0 entry's rules-in-use bullets. Every run used a local build of the sunstack-tools engine branch `feat/skill-rules-evidence-decisions` at `8742b6a9` (SHA256 `8f9507e4f03b9d7d474687b7cbc98f6181a2aa77f75fe50be5220fabfeb7e1c0`), because the released `@sunstack/cli` predates `sunstack lint --config`. The `tests/skills` pin moves to the engine release once the owner releases it; until then the runner and its tests need `--engine` or `SUNSTACK_TEST_ENGINE` pointed at that build.

## Every rule over the seven skill-authoring skills, Jev

Run through the repository runner at the frozen rule entries (`188116d0`): 40 checked files, 830 model requests, $0.037; 858 evaluated pairs: 452 pass, 187 not applicable, 27 findings (all `warn`, no `error`), 192 uncertain, 0 incomplete; exit 5 (`uncertain`). The runner's printed usage equals the report's. No description breaks the opener or length rules.

Runs over the same unchanged text moved 59 pieces between a finding or uncertain and a pass or not applicable, all at a gate's edge: Jev varies near the thresholds, which is why judged rules warn and an uncertain piece goes back to the calling agent.

## Rule tests

- Cases: 104 real pieces from current skills, their history and upstream skills (K006's development cases rewrite real openers to `Always`, because no current description opens with it). Development and held-out sets come from different skills.
- Labels: craft rules by two blind Sol labelers (67 of 74 agreed) and a third that settled the other 7; generalization's 30 wait on the owner's labels, per the owner's 26 October decision.
- Development, after one criteria-only tuning pass: 30 of 39 labelled cases matched.
- Held-out, run once on the frozen entries: 25 of 35 matched (2 wrong, 2 missed, 6 uncertain). Call completeness and the description's loading moment matched 5 of 5; reference teaching depth was weakest at 2 of 5. Provisional until the owner's spot-checks.
- Named cases measure decisions on chosen pieces, not how many real instances an evidence kind misses; no result here makes a rule ready to block.

## Not verified

- The released engine and the moved pin; Linux.
- The two-prompt trigger trial for the changed descriptions (needs the owner's choice of how a fresh Luna session loads the branch's plugin).
- The consumer run (a later skill change made by following the kit).
