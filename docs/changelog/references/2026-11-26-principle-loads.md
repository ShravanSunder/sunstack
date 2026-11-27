# Principle loads: validation receipts (2026-11-26)

Branch `skills/principle-must-load`, base `9985ee4c`. The design set and per-occurrence inventory are in `docs/wip/skills-authoring/2026-11-26-principle-must-load/` (design review accepted in round 4).

## Structural receipts

| Receipt | Result |
|---|---|
| Row receipt: each of the 110 load rows in `call-sites.md` matched by a `MUST load` of its principle in its file, with `IF` exactly on the conditional rows, counted per file and principle | 110 wanted, 110 found, 0 mismatches |
| Leftover receipt: parenthetical principle links in the 30 target skills | 0 |
| Retired row 39 (`practices-delegation/SKILL.md:49`) | link gone, obligation text kept; row 37 holds the load |
| Resolve receipt: every relative target exists from its file; every `sunstack-dev:principle-*` exists | 110 loads, 0 unresolved |
| Sibling receipt: `MUST load` inside `sunstack-dev/skills/principle-*/SKILL.md` | 0; no principle file changed |

## Tests

`pnpm --dir tests/skills test`: 33 files, 345 passed, 2 skipped, exit 0 (run three times, the last after the review-round-1 fixes). An earlier run in the same worktree reported 8 failures in 5 files; its output was not kept, and two later runs with no edits in between passed. `pnpm --dir tests/skills typecheck`: exit 0. The phase-composition map and its HTML page were regenerated (`pnpm --dir tests/skills phase-composition`, then Demistify `embed`); the map contract test passes, and Demistify `check` reports 0 errors on the page.

## Skill rules

Final pass, after implementation-review round 1 fixes: `sunstack lint --config plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json` on the 53 changed skill files. Status `uncertain` (exit 1, from unsure results only): 0 errors, 1 warning (the existing `design-program` description length, unchanged by this change).

`load-call.names-when-where-and-result` (K001) judges one paragraph piece with every call in it, so occurrence counts and piece results differ. Of the 110 principle-load occurrences, every one sits in a selected `load` piece: 86 occurrences are in pieces that passed and 24 occurrences are in 21 pieces the rule left unsure. No piece failed. The rule's unsure verdict stays unsure; the column below is my source disposition per occurrence, not a rule result. (The first pass at `8a25e189` gave 80/30 over 27 pieces; the base `9985ee4c` had 33 unsure K001 pieces in the same files, before principle calls were selectable.) The two loads in `calls-and-placement.md`'s fenced examples are not selected, as fenced examples.

| Result id | Site | Target | Disposition |
|---|---|---|---|
| 114 | `domain-python/SKILL.md:22` | `../principle-types-are-communication/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 117 | `domain-python/SKILL.md:90` | `../principle-write-tests-that-can-fail/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 122 | `domain-rust/SKILL.md:61` | `../principle-design-for-failure/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 130 | `domain-rust/references/sqlx-sqlite.md:19` | `../../principle-one-owner-per-truth/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 133 | `domain-typescript/SKILL.md:48` | `../principle-types-are-communication/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 134 | `domain-typescript/SKILL.md:87` | `../principle-design-for-failure/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 174 | `practices-how/SKILL.md:28` | `../principle-write-for-the-reader/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 178 | `practices-research/SKILL.md:23` | `../principle-read-ground-truth-first/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 180 | `practices-research/SKILL.md:26` | `../principle-verify-before-accepting/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 180 | `practices-research/SKILL.md:26` | `../principle-experiment-before-proposing/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 211 | `practices-verification-maintenance/SKILL.md:35` | `../principle-write-tests-that-can-fail/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 211 | `practices-verification-maintenance/SKILL.md:35` | `../principle-write-for-the-reader/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 197 | `practices-verification/SKILL.md:20` | `../principle-write-tests-that-can-fail/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 197 | `practices-verification/SKILL.md:20` | `../principle-experiment-before-proposing/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 199 | `practices-verification/SKILL.md:24` | `../principle-prove-it-works/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 205 | `practices-verification/SKILL.md:37` | `../principle-verify-before-accepting/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 206 | `practices-verification/references/project-verification-selection.md:21` | `../../principle-one-owner-per-truth/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 219 | `presentation-html/SKILL.md:16` | `../principle-write-for-the-reader/SKILL.md` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 251 | `design-program/SKILL.md:159` | `sunstack-dev:principle-justify-the-complexity` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 288 | `plan-implementation/references/steps-and-proof.md:69` | `sunstack-dev:principle-write-tests-that-can-fail` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 298 | `role-checker/references/review-with-lead.md:41` | `sunstack-dev:principle-verify-before-accepting` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 312 | `role-implementer/SKILL.md:18` | `sunstack-dev:principle-types-are-communication` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 330 | `role-lead/SKILL.md:16` | `sunstack-dev:principle-build-the-shared-model-first` | kept: names a concrete result (read by hand against its `call-sites.md` row) |
| 345 | `role-lead/references/working-with-checker-verification.md:43` | `sunstack-dev:principle-prove-it-works` | kept: names a concrete result (read by hand against its `call-sites.md` row) |

## Not shown

Agent behavior: whether agents now read principles at their moments. That comparison is outside this change.
