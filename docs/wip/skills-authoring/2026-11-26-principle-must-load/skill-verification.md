# Skill verification

## Routes, per standard and requirement

Outcomes are from `skill-rules-authoring/references/decision-matrix.md`. A new rule route stays pending until `skill-rules-authoring` has made that rule; until then the receipt beside it is the check this PR runs. Every receipt works per occurrence, keyed by the `call-sites.md` row number, not per line or per file.

| Item | Outcome | Decided on | Check in this PR |
|---|---|---|---|
| S1 no parenthetical principle link left, in the 30 targets | deterministic, gated | Visible in a line's text: a parenthetical link or parenthetical `sunstack-dev:` name for a principle. Gated out: sibling citations inside `skills/principle-*/`, and fenced examples in `calls-and-placement.md`. Mechanical rule pending. | **Leftover receipt:** zero parenthetical principle targets in the 30 targets' files. It must fail on a line that holds a new load beside an old citation (e.g. `practices-research/SKILL.md:26` with only row 47 converted). |
| S1/S2 every row landed as its call | deterministic | Each `call-sites.md` row names file, principle and class. | **Row receipt:** for each of the 110 load rows, the file holds a `MUST load` of that principle, opened with `IF` for a `C` row and without for an `E` row, and the count of loads per (file, principle) equals the count of rows. Row 39 (no load, D10) passes only when `practices-delegation/SKILL.md:49` keeps its obligation text and holds neither a parenthetical link nor a load of the principle; row 37 must hold the load with the full external-effect condition. Three cases are walked: a silent helper that could write (row 37's load fires, once); a silent helper with external-effect authority but no write grant, such as stopping a running job (row 37's load fires); a handback, or a silent inspection-only helper (no load). It must fail when one of two same-principle rows in a file is dropped (e.g. `domain-typescript/SKILL.md` rows 20, 21, 23 with row 23 removed). |
| S2 the class matches the step | model-judged, pending | Needs reading the step around the load. | Review check: the implementation reviewer walks **every** row against its full source line and enclosing step: the class (for an `E`, whether some run never reaches the moment), the exact due condition for a `C`, and the full pre-existing action, including its ordinary and exception paths. |
| S3 the result names what applying it produced, every obligation kept | model-judged | Needs comprehension; the word `return` alone is a proxy. The active rule is `load-call.names-when-where-and-result` (marker K001), on the `load` evidence, which selects a backtick right after `load` (D8 makes every principle load selectable). | Run `sunstack lint` with the skill-rules config on the changed files; report how many of the 110 loads the `load` evidence selected; read each K001 result for a principle load. Every unselected load gets a manual per-row check of its return against the row. Plus the review check: each return keeps every clause of its row (row 106 read with and without an observed red). |
| S4 loaded only where the judgment changes the action | review-only | Placements are unchanged; this PR changes nothing S4 governs. | none beyond the row receipt |
| S5 once per decision | review-only | Needs the other skills used at that step. | Review check: for each run, any same-decision pair creation recorded, returned to the Lead before any drop; recheck one shared decision and two distinct decisions with a prior full read (run 32's cases). |
| S6 target resolves from its file | deterministic | A file-system fact. | **Resolve receipt:** each relative target exists from its file; each `sunstack-dev:principle-*` name exists under `plugins/sunstack-dev/skills/`. |
| S7 never replaces the skill's own procedure load | review-only | A judgment about what the step's procedure is. | Review check on run 1's wording. |
| S8 sibling citations stay citations | deterministic | `grep` for `MUST load` in `plugins/sunstack-dev/skills/principle-*/SKILL.md`. | Receipt: zero matches, and each principle's existing sibling citations unchanged. |
| S9 read rule in principles | prose | Already every principle's first body line. | none |
| Run 32: the reviewer check judges by the new standard | review check | A reviewer reference's instructions; judged by reading them. | Recheck four cases against the edited `placement-and-calls.md`: two loads of one principle for the same decision within one skill are flagged; a load duplicated across a caller and its callee for one decision is flagged; a valid conditional load passes; a valid sibling citation inside a principle passes. |
| Requirements 1–3: agents read the principle at its moment | eval | A claim about what an agent does while working. | **Unverified in this PR.** The owner put behavior comparisons after the PR (31 Oct). |
| Spec 5: tests still parse the targets | deterministic | `phase-composition-map.ts` `extractPrinciples` (updated) and `extractLoadCalls`. | `pnpm --dir tests/skills test`, with pass/fail counts and exit code, after regenerating `phase-composition.md` and its HTML page (both equality checks in the map contract test); plus a direct check that the regenerated map lists each run's principles for the base-plugin skills it covers. The map covers `sunstack-dev` and frozen v1 only, so v2 coverage comes from the row receipt, not the map. |

## Proof plan

Every run: drafted from user intent; behavior not yet evaluated. Static checks are structural proof only.

Evidence that already exists is a baseline characterization (the audit's candidate read counts). The later behavior step, outside this PR: fresh sessions on 3–4 realistic tasks that reach a cited moment (accepting a helper's handback; writing a test; explaining code with `practices-how`), run on the prior and new revisions, with principle reads, the loaded revision and whether the moment was reached read from each host's session record. That could reach "a difference shown for an approved representative case".

## Trigger trial

`not applicable`: no run writes or alters a description.

## What stays unverified

- Whether agents now read principles at their moments, and whether the work improves (the eval above).
- The token cost of the new loads in typical runs; no run's actual token use is measured.
- S4 in its own right; this PR keeps today's placements.
- K001's verdict quality on principle loads; the lint run reports it, but it's a model judgment.
