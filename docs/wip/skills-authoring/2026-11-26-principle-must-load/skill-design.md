# Skill design

## Targets and runs

Base: `origin/main` at `9985ee4c` (sunstack-dev 3.8.2, workflow-v2 0.8.0, skill-authoring 0.12.3). Branch `skills/principle-must-load`, worktree `~/dev/ai-tools.skills-principle-must-load`. `call-sites.md` lists every one of the 111 occurrences (105 lines) with its class, moment and return; it is part of this set and is reviewed with it.

Run 1 lands the standard. Run 32 lands the reviewer check that judges it. Runs 2–31 apply it, one skill each, independent of each other once runs 1 and 32 are written.

| Run | Skill (plugin) | Sites | Files |
|---|---|---:|---|
| 1 | `domain-skill-crafting` (skill-authoring) | standard | `references/calls-and-placement.md`, `references/glossary.md`, `references/descriptions-and-invocation.md`, `references/main-path.md`, `SKILL.md` |
| 32 | `skill-review` (skill-authoring) | check | `references/checks/placement-and-calls.md` |
| 2 | `role-lead` (v2) | 4 | `SKILL.md`, `references/working-with-checker-verification.md` |
| 3 | `role-implementer` (v2) | 6 | `SKILL.md`, `references/working-with-checker-verification.md`, `references/working-with-lead.md` |
| 4 | `role-checker` (v2) | 6 | `references/verification-duty.md`, `verification-with-implementer.md`, `review-duty.md`, `review-with-lead.md` |
| 5 | `design-specification` (v2) | 1 | `references/domain-entities.md` |
| 6 | `design-program` (v2) | 5 | `SKILL.md`, `references/failure-concurrency-recovery.md`, `references/components-ownership-interfaces.md` |
| 7 | `design-verification` (v2) | 6 | `SKILL.md`, `references/choosing-the-observation.md` |
| 8 | `design-review` (v2) | 7 | `references/reviewing-verification-design.md`, `finding-and-reduction-schema.md`, `lanes/dispel.md`, `lanes/failure-concurrency.md` |
| 9 | `plan-implementation` (v2) | 2 | `SKILL.md`, `references/steps-and-proof.md` |
| 10 | `practices-cleanup` | 3 | `SKILL.md`, `references/merged-worktree-removal.md` |
| 11 | `practices-collaboration` | 1 | `SKILL.md` |
| 12 | `practices-delegation` | 3 | `SKILL.md`, `references/execution-forms.md` |
| 13 | `practices-how` | 4 | `SKILL.md` |
| 14 | `practices-preflight` | 2 | `SKILL.md` |
| 15 | `practices-research` | 4 | `SKILL.md` |
| 16 | `practices-retrospective` | 2 | `SKILL.md` |
| 17 | `practices-show-me-your-work` | 4 | `SKILL.md` |
| 18 | `practices-verification` | 6 | `SKILL.md`, `references/project-verification-selection.md` |
| 19 | `practices-verification-maintenance` | 3 | `SKILL.md` |
| 20 | `practices-why` | 4 | `SKILL.md` |
| 21 | `audit-security-review` | 1 | `SKILL.md` |
| 22 | `debug-investigation` | 2 | `SKILL.md` |
| 23 | `domain-code-standards` | 1 | `SKILL.md` |
| 24 | `domain-python` | 4 | `SKILL.md` |
| 25 | `domain-rust` | 11 | `SKILL.md`, `references/sqlx-sqlite.md` |
| 26 | `domain-typescript` | 5 | `SKILL.md` |
| 27 | `ops-linear-tracking` | 5 | `SKILL.md` |
| 28 | `ops-observability-stack` | 3 | `SKILL.md` |
| 29 | `presentation-html` | 2 | `SKILL.md` |
| 30 | `presentation-tui` | 2 | `SKILL.md` |
| 31 | `presentation-webui` | 2 | `SKILL.md` |

Provenance: runs 2–8 and 10–20 are the audit's judged targets. Run 9 (`plan-implementation`, 2 sites) was added to v2 after the audit's cut and is an inventory extension. Runs 21–31 (38 sites) are the other maintained `sunstack-dev` callers (decision D3). `practices-manage-agents` and `role-operator` have no principle call sites.

## Surface allocation

| Run | Trigger | Main path | Depth | Proof |
|---|---|---|---|---|
| 1 | unchanged | `SKILL.md:33` topic condition: "a load of a principle, or a principle's citation of a sibling" | `calls-and-placement.md`: replace "Citations of principles" (lines 37–47) with S1–S9; line 27 "a load, a dispatch or a citation" adds that a principle's call is a load and a citation is only a sibling pointer; the "Who reads it" row (line 72) becomes `principle load · this agent · at the moment its load names`; the placement-test row (line 90) becomes `judgment a principle teaches -> load the principle at the decision`; the "Principle" block in Call forms (lines 138–147) becomes the two load forms with the strong/weak pair below, and a separate "Sibling citation" block keeps the old citation form for principles only; line 149 becomes "IF a principle load's moment is a condition…". `glossary.md:21–24` and `descriptions-and-invocation.md:22` as the specification gives. `main-path.md:22` "citations of principles" → "principle loads". | static receipts; tests |
| 32 | unchanged | none | `placement-and-calls.md`, every principle-call instruction in it: line 8 lists forms as load, dispatch, or sibling citation; line 9 checks, for each step holding a principle load, the skills it names or loads at that step for a load of the same principle for the same decision (S5); line 14's returned standards name "principle load and sibling citation"; line 21's row splits into `principle load: moment (every-run or observable condition) · target · result` and `sibling citation: moment · action · relative link`; line 24 becomes "Open every loaded or cited principle…", and its duplicate sentence becomes "When the same principle is loaded twice for one decision, either twice in this skill or once here and once in a skill this one names or loads at that step, the finding is against this skill's extra load"; line 38's overlap boundary says the same for a duplicate load ("If a skill loads the same principle twice for one decision, report it here") and routes a load that changes nothing the agent does to `no-op-pruning`; line 40's stop condition covers loaded principles and sibling citations | the four-case recheck in `skill-verification.md` |
| 2–31 | unchanged | each site in `SKILL.md` rewritten per its `call-sites.md` row | each site in the listed references rewritten per its row | per-occurrence receipts; tests |

## The trigger

No description changes in any run. Every target keeps its invocation decision. Principles stay hidden from model invocation; a load reads the principle's `SKILL.md` by path, as skills already read hidden domains.

## The main path

For runs 2–31, each step keeps its order, decision and completion; only the call site changes, as its row says. A `C` row's moment passes `main-path.md`'s branch-condition test (observable from the work in front of the agent). A row whose full line doesn't match its moment or return goes back to the Lead before it is written.

## Call sites, in their forms

New forms, written into `calls-and-placement.md` "Call forms" by run 1:

```text
Principle load
  MUST load `<principle>` and return `<what applying it produced at this step>`.
  IF `<observable moment>`, MUST load `<principle>` and return `<what applying it produced>`.

  strong  IF you are about to rely on a helper's handback, MUST load `../principle-verify-before-accepting/SKILL.md` and return each claim matched to the commit, target and output you opened, or named as a gap.
  weak    IF you are about to rely on a helper's handback, MUST load `../principle-verify-before-accepting/SKILL.md` and return that you verified it.

Sibling citation (inside a principle only)
  <moment>, <action in plain words> ([<the sibling's judgment in plain words>](../principle-<name>/SKILL.md)).
```

`<principle>` is the backticked relative path inside `sunstack-dev`, or the backticked `sunstack-dev:principle-<name>` in `sunstack-workflow-v2` (resolved by its Base dependency paragraph). Both put a backtick right after `load`, which is what the active lint rule's `load` evidence (`rules/evidence/rules/skill-steps.yml:2`) and the test suite's load parser (`phase-composition-map.ts:161`) select.

## References

No reference is added or removed. Each run edits call sites inside existing references; their callers, entry conditions and returns are unchanged.

## Topics that apply

| Topic | Governs |
|---|---|
| `calls-and-placement.md` | the new call form (run 1 owns it; runs 2–31 apply it; run 32 judges it) |
| `steering.md` | the leading word `MUST load` and the required result as the completion that demands the read; each rewritten sentence passes the deletion test |
| `main-path.md` | the branch-condition test for each `C` moment; its element list (run 1) |
| `generalization.md` | the transfer tests in `specification.md` |
| `proof-claims.md` | the proof posture in `skill-verification.md` |
| `descriptions-and-invocation.md` | consulted: no description changes; line 22 wording updated in run 1 |
| `change-classes.md` | the class claim in `requirements.md` |

## Sensitive surfaces

None. The change edits Markdown instructions and one test-library regex: nothing executes outside the test suite, reaches the network, handles credentials or writes outside the repository.

## Decisions

| # | Default taken | Rationale |
|---|---|---|
| D1 | `C` moments use `IF <moment>, MUST load …`; `E` moments use a bare `MUST load …`. | Owner chose MUST load; a bare MUST load at all 44 `SKILL.md` sites would load several principles on every run (5 in `practices-verification`). The `IF` keeps loads to runs that reach the moment. Shown to the owner on 26 Nov; not objected to. |
| D2 | A principle's references to sibling principles stay citations (S8). | Principles are leaves; a load from a leaf chains full reads. |
| D3 | Include runs 21–31 (other `sunstack-dev` callers). | Once the standard changes, those 38 sites break it. The owner may strike this row and limit the change to runs 1–20 and 32, leaving those 38 sites on the retired form until a later change. |
| D4 | Replace `calls-and-placement.md:46` ("ships in the same plugin") with S6. | The repo already permits v2 → `sunstack-dev` principle reads through the base-root lookup (`AGENTS.md`, "Frozen workflow archive"); line 46 contradicts shipped v2 source. |
| D5 | Drop today's plain-words link text from each call. | It paraphrased the principle; the return now carries what the step needs. |
| D6 | One PR for all 32 runs. | One deliverable is one PR by default; the runs share one standard. |
| D7 | Leave `CLAUDE.md` / `my_agents.md` triggers alone. | Separate owner decision; devfiles edits go through a subagent. |
| D8 | Name the target in backticks right after `load` (a relative path in `sunstack-dev`), not as a Markdown link. | Same form as reference loads, so the active `load` lint evidence and the test suite's load parser pick each principle load up; a `[link](…)` after `load` is invisible to both (review finding F5/F6). |
| D10 | `practices-delegation` rows 37/39: keep the load in `SKILL.md:49` (row 39) and drop the parenthetical link from `execution-forms.md:41` (row 37) without adding a second load. | Both govern the same recovery decision on one path: `SKILL.md:43` MUST-loads `execution-forms.md`, its only caller, so every run that reaches row 37 has row 39's load (S5). The callee keeps its procedure text (worktree, branch, PR, posts; adopt, clean up or wait). Lead's call under S5, on the reviewer's recommendation; the owner may strike it to keep both loads. |
| D10a (2026-11-26, supersedes D10's placement) | Keep the load at row 37 (`execution-forms.md:41`) with its full condition, and retire row 39's link in `SKILL.md:49`, keeping its obligation text. | Round 3 showed row 39's condition is narrower ("could write or publish") and sits after the reference performs the recovery; the reference holds the wider condition ("write access or any external effect") at the point of decision. |
| D9 | Add run 32 (`skill-review`'s `placement-and-calls`). | Without it, implementation review keeps judging principle calls by the retired citation rule (review finding F2). Lead's call inside the owner's decision: the reviewer must judge the standard the owner chose. |
| D11 (2026-11-26) | Owner reviewed the summary page (D1–D10, including D3 as recommended) and said: "Yes, this makes sense." D3 and the other defaults stand; no row struck. | Owner's own reply in the Lead session. |

## Coordination

- Base `9985ee4c`; no pending edits on the branch besides this design set. The worktree inherited two untracked folders from the main checkout (`2026-11-20-practices-wrapup`, `2026-11-22-lean-design-records`); stage exact paths only.
- Test library (`tests/skills/lib/phase-composition/phase-composition-map.ts`): the map distinguishes the two call kinds. `extractPrinciples` keeps reporting parenthetical citations (frozen v1 still has them) under "Cites", and principle loads (a backticked `…/principle-<name>/SKILL.md` or `sunstack-dev:principle-<name>` after `load`, already found by `extractLoadCalls`) are reported under a new "Loads principles" line and table column; the detail renderer (around line 376) handles target kind `principle`. Regenerate `plugins/sunstack-dev/docs/phase-composition.md` and its generated HTML page through the existing route, and run both equality checks in `phase-composition-map-contract.test.ts` (the Markdown file and the HTML page's embedded Markdown).
- Maintainer docs, with run 1: `docs/architecture/skill-system.md:32,43`; `plugins/sunstack-dev/docs/principles-index.md:3` ("a skill cites one with a relative link at the decision it informs" → "a skill loads one at the decision it informs") and `:8` ("A principle a skill cites serves the action its citing sentence names" → loads).
- Versions: skill-authoring 0.12.3 → 0.13.0; sunstack-dev 3.8.2 → 3.9.0; sunstack-workflow-v2 0.8.0 → 0.9.0, in every manifest each plugin ships.
- Changelog: one entry `docs/changelog/2026-11-26-principle-loads.md`, listed in `docs/changelog/README.md`.
- Cache refresh for Codex and Claude after merge, recorded in the changelog's refresh status.
- Frozen v1 is not edited; its citations stay in the retired form under its freeze.

## Run status

| Run | Status |
|---|---|
| 1–32 | implemented (2026-11-26, uncommitted diff on `skills/principle-must-load`); receipts in `docs/changelog/references/2026-11-26-principle-loads.md` |

## Write-time deviations

- Row 15 (`domain-rust/SKILL.md:98`): the full line opens with "Before putting a `Mutex` around state that crosses an `.await`"; the load uses that moment and keeps the "one owning task" check. The inventory row is updated.
- Rows 2 and 28: the full lines opened with a lowercase or mid-bullet condition; the loads open with a literal `IF` so the class matches the row.
- Phase map: principle loads appear in the existing loads-by-kind lines (new kind `principle`) rather than a separate "Loads principles" line, so nothing is listed twice; "Cites" stays for v1's citations.

- Implementation review round 1 (I1–I5): rows 56, 57, 58, 69, 70, 87 and 90 became conditional, with the moments in `call-sites.md`; row 57's load moved to the start of step 3, before either reference picks an expected result; row 81 reads the basis before the fit decision; the reviewer's "several `IF` predicates to one destination" signal is scoped to references.

- Implementation review round 2 (I1): row 57's condition also covers drift the maintenance comparison finds, and the load comes as soon as a result change is known, before the result is selected.

## Review record

| Round | Target | Verdict | Decision | Report |
|---|---|---|---|---|
| 1 | this set at the hashes in its brief | `targeted-revision`, 9 accepted findings (F1–F9) | `revise-first` | `~/.codex-router/scratch/01a1635f-5d9d-70e4-bfc7-6d97cf0ee4ff/2026-11-principle-must-load-review/round-1/review.md` |
| 2 | revised set (hashes in `round-2/BRIEF.md`) | `targeted-revision`, 5 open (F2, F4, F7, F9, R2-N1), 5 closed | `revise-first` | `…/2026-11-principle-must-load-review/round-2/review.md` |
| 3 | revised set (hashes in `round-3/BRIEF.md`) | `targeted-revision`, 1 open (F7: D10's load sat at the narrower, later site) | `revise-first` | `…/2026-11-principle-must-load-review/round-3/review.md` |
| 4 | revised set (hashes in `round-4/BRIEF.md`) | `great`, 0 open | `accepted-to-implement` | `…/2026-11-principle-must-load-review/round-4/review.md` |

Round 4: accepted. Editorial carryovers fixed after acceptance: the wrapper's status line and the shape-2 example (now `practices-how/SKILL.md:22`, since the old example's line is the retired row 39).

Round 3 disposition: F7 fixed by D10a (load moved to row 37 with its full condition; row 39 retired), and the 111/110/1 counts aligned in requirements, specification and verification.

Round 2 dispositions: F2 fixed by run 32's full instruction list and `principles-index.md:3`. F4 fixed at rows 26, 28, 32 and 104, and by walking every row in implementation review. F7 settled by D10. F9 fixed by S9's own cases. R2-N1 fixed in the test-library coordination line.

Round 1 dispositions: F1 fixed in `specification.md` shape 3 and `call-sites.md` row 106. F2 fixed by run 32, run 1's `main-path.md:22` and `SKILL.md:33` wording, and the principles index. F3 fixed in S2, the S1–S2 case and shape 1. F4 fixed by `call-sites.md` and the per-occurrence receipts. F5 and F6 fixed by D8, the test-library change and the receipts. F7 fixed in `call-sites.md`'s same-decision rule and S5's cases. F8 fixed in `requirements.md`. F9 fixed in `specification.md`'s transfer tests. The plan-implementation provenance label is fixed above.
