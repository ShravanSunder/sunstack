# Skill design

Base `origin/main` `09f07b80`; branch `skills/decisions-to-owner`.

| Run | Named skill | Surface | Change |
|---|---|---|---|
| 1 | `practices-show-me-your-work` | depth: `references/stop-treatments.md` lines 24, 34, 78; companion: the shared `sunstack-dev/shared-references/owner-decision-brief.md` lines 17, 19, 21 | treatments route through the brief; the brief's recipient rule as the specification gives |
| 2 | `design-program` (v2) | main path: `SKILL.md:70` | the `IF returning decision-needed` load |
| 3 | `domain-code-standards` | main path: `SKILL.md:21`, a new conditional load after line 30, and the completion line 73 | "ask the owner"; one `IF a standards choice needs the owner, load …owner-decision-brief.md` covering all four owner cases; completion names the delivered brief |

The shared brief stays the one home for recipient routing. It is written as run 1's companion because `stop-treatments.md` is its closest caller; runs 2 and 3 point at it. One cutover check covers all four active files (see verification).

Trigger: unchanged in all runs. No reference added or removed; no call site changes form. Sensitive surfaces: none.

Topics: `steering.md` (each changed sentence passes the deletion test; S2 is a positive shape, not a prohibition), `calls-and-placement.md` (the brief remains the one home for recipient routing; `design-program` points at it instead of restating it), `generalization.md` (transfer tests in the specification).

## Decisions

| # | Default taken | Rationale |
|---|---|---|
| D1 | `design-program` stops restating the recipient and points at the reference. | One home per meaning; the restated route is what drifted. |
| D2 | Keep the owner-asked-directly rule word for word. | It's correct and unrelated to the Chief of Staff. |
| D4 | Add `tests/skills/lib/contracts/owner-decision-routing-contract.test.ts` reading the maintained files directly. | The existing routing contract resolves v1 first and keeps checking the frozen route; the maintained route needs its own check (review F3). |
| D3 | Versions: sunstack-dev 3.9.0 → 3.9.1, sunstack-workflow-v2 0.9.0 → 0.9.1; one changelog entry. | Small behavior change. |

## Coordination

Stage exact paths (the worktree inherits two untracked folders). Refresh Codex and Claude caches after merge.

## Run status

| Run | Status |
|---|---|
| 1–3 | implemented; implementation review 1 fixes applied (I1–I4); review 4 cuts applied (R1–R4) |

## Review record

| Round | Verdict | Decision | Report |
|---|---|---|---|
| 1 | `targeted-revision`, 6 findings | `revise-first` | `~/.codex-router/scratch/01a1635f-5d9d-70e4-bfc7-6d97cf0ee4ff/2026-11-decisions-to-owner-review/round-1/review.md` |
| 2 | `targeted-revision`, 2 open (F1 narrowed, F2 authority) | `revise-first` | `…/round-2/review.md` |
| 3 | `targeted-revision`, 1 open (F2 narrowed) | `revise-first` | `…/round-3/review.md` |
| 4 | `targeted-revision`, 1 open (F2: no-Lead authority) | `revise-first` | `…/round-4/review.md` |
| 5 | `targeted-revision`, 2 open (F2 reachability and caller route, F7 authority first); `not-converging` | `revise-first` | `…/round-5/review.md` |
| 6 | 0 open (F2, F7 closed) | `accepted-to-implement` | `…/round-6/review.md` |

Round 4 disposition: F2 by the owner's ruling of 27 Nov (requirements, Need): a two-way door is the agent's call, recorded in the trace (new S5); a one-way door goes up the chain, and with no Lead, or a Lead that can't be found or reached on the work's thread, the helper briefs the owner and says which. Transfer cases for no Lead, unreachable Lead and both doors added; the contract plan asserts them.

Round 5 disposition, bounded restart (Lead's call under the convergence rule): F2 by defining unreachable from Router's delivery outcomes (no named Lead, or delivery rejected or not submitted; queued, unanswered or uncertain stays pending) and by having both stop treatments use the recipient the brief names; F7 by checking owner reservation and delegated authority before the door split. Cases and the contract plan follow.

Round 3 disposition: F2 by naming the owner-assigned helper's route: to the work's Lead, or to the owner when the work has no Lead (the owner is then the commissioner); S1, requirements and the test plan match.

Round 2 dispositions: F1 by a conditional load in `domain-code-standards` covering all four owner cases and a completion line naming the delivered brief; F2 by dropping the owner-opened exception and keeping the owner's standing rule (helpers to the Lead; direct owner questions answered directly, S3); requirements and the page updated.

Round 1 dispositions: F1 by run 1's stop-treatment edits and run 3's helper sentence; F2 by the owner-opened and intermediary sentences in line 17 and the owner-only question tool in line 21; F3 by D4; F4 by the S3 and S4 cases; F5 by binding the brief to run 1 as companion; F6 by run 2's literal `IF returning` form.
