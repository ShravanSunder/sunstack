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

`pnpm --dir tests/skills test`: 33 files, 345 passed, 2 skipped, exit 0 (run twice). An earlier run in the same worktree reported 8 failures in 5 files; its output was not kept, and two later runs with no edits in between passed. `pnpm --dir tests/skills typecheck`: exit 0. The phase-composition map and its HTML page were regenerated (`pnpm --dir tests/skills phase-composition`, then Demistify `embed`); the map contract test passes, and Demistify `check` reports 0 errors on the page.

## Skill rules

`sunstack lint --config plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json` on the 53 changed skill files: 0 errors, 1 warning (the existing `design-program` description length, unchanged by this change). The `load` evidence selected all 110 principle loads: `load-call.names-when-where-and-result` (K001) passed 80 and was unsure on 30. Each of the 30 was read by hand against its inventory row: each names a concrete result (kept). The same files at the base had 33 unsure K001 results; the change adds the 110 newly selectable principle loads.

## Not shown

Agent behavior: whether agents now read principles at their moments. That comparison is outside this change.
