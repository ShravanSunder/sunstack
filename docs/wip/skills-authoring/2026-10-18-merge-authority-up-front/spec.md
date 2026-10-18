# Merge authority up front

Skill spec for one behavior change, in two runs. Author: 🦁 Lead (Claude a6321a2f). Base: `origin/main` at `5fd04c9f` (sunstack-dev 2.86.0), branch `skills/wrapup-merge-authority`.

## Targets and runs

| Run | Skill target | Owner plugin | Files |
| --- | --- | --- | --- |
| 1 | `implementation-pr-wrapup` | sunstack-dev | `skills/implementation-pr-wrapup/SKILL.md`; `references/merge-gates.md` |
| 2 | `orchestrator-implementation-goal` | sunstack-dev | `skills/orchestrator-implementation-goal/SKILL.md` (Orient step 1, delivery-loop step 8) |

Run 2 depends on run 1, and both land in one PR. The version comes after #147 (2.87.0) and the retrospective (2.88.0): the next sunstack-dev minor at merge time.

## Problem and evidence

- **Owner's words**, said to the 🦉 Advisor and relayed verbatim by it (Router push `01a14e6d-6902`), 2026-10-18: "yes. merge. also lets make sure that readiness skill theres one ask if merge authority is given or not so that agent asks up front for such things does that make sense to you". The Advisor's reading:
  - capture merge authority at entry to the wrap-up;
  - reuse explicit existing authority first, and ask once, early, only when it's absent or ambiguous, while readiness work continues;
  - keep readiness-only distinct from merge-when-ready;
  - never ask twice, and don't make the question a procedural stop.
- **Source** (read at `5fd04c9f`):
  - `implementation-pr-wrapup` checks authority only at the end: step 9 says "Merge only when that result is clear and user authorization exists", and `references/merge-gates.md` "Authorization Gate" admits only "the user explicitly says to merge now" or "an exact condition". Its stop list ends with "the user has not authorized merge and did not give a prior condition" (`SKILL.md:84`). No step establishes authority before the readiness work.
  - `orchestrator-implementation-goal` step 1 says "Merge is a separately authorized extension through `implementation-pr-wrapup`, never an inferred terminal", and step 8 says "Stop at PR-ready and unmerged by default. Pass through explicit merge authority only after readiness." Authority therefore surfaces at the last gate, after the readiness work, as one more round trip.
- **Session examples** (2026-10-17/18; illustrations, not reproduced failures):
  - **The scope of a grant was guessed late.** The owner's "you can merge i allow it" arrived after four stacked PRs were ready. The Lead had to decide which PRs it covered and say so before merging.
  - **The authority arrived through a relay.** For #147, the owner's "yes. merge." reached the work through the Advisor, after the PR was already open as a draft.

## Success definition

At the start of a PR wrap-up, the agent knows whether it may merge. It records the state (`merge-now`, `merge-when-ready` with the exact conditions, or `readiness-only`) together with its source: the user's own words, or the commission that quotes them, saying where and when they were given and which PRs they cover. When no source settles it, the agent asks once, in its first report, to whoever can grant it. It states the default it will follow meanwhile (`readiness-only`: stop merge-ready and unmerged) and keeps doing readiness work in the same turn. It never asks again; later updates point back to the recorded state. At the end it merges only when the recorded authority covers this PR and its conditions hold on fresh evidence. An orchestrated delivery settles the same question at goal entry and passes the quoted authority into the wrap-up assignment.

## Decisions (defaults taken; the owner may strike any row)

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | **Home: `implementation-pr-wrapup`**, as a new first step, "Establish merge authority". The authorization gate in `merge-gates.md` consumes the recorded state. The stop-condition line names a missing or uncovering authority. | Owner: "that readiness skill". The wrap-up is the only skill that merges. |
| D2 | **Three states:** `merge-now`, `merge-when-ready: <exact conditions>`, `readiness-only`. The default is `readiness-only`. "Ready-to-merge is not allowed-to-merge" stays as it is. | Advisor's reading: distinguish readiness-only from merge-when-ready. The existing gate already has the two merge forms. |
| D3 | **Sources, in order:** (1) the user's explicit words in this conversation; (2) the commission that assigned this wrap-up, when it quotes the owner's grant, with where and when it was given and which PRs or stack it covers; (3) standing repository or user instructions, which can forbid or condition merging. An agent's paraphrase without the owner's words, a bot or PR comment, silence, and "ready" are not sources. | Advisor: "reuse explicit existing authority first". Grants already reach work through relays (the #147 example), so a quoted relay must count and a paraphrase must not. |
| D4 | **Scope:** a grant covers what it names (PRs, a stack, "this work"). A grant for other work doesn't carry over. When it's unclear whether the grant covers this PR, the state is ambiguous. | The "you can merge i allow it" example: its scope had to be guessed. |
| D5 | **One early ask, not a stop.** When the state is absent or ambiguous, ask once in the first report: one question that names the PR, the choices and the default. A helper asks its commissioner, which holds or relays the owner's grant; the Lead in a direct conversation asks the user. Readiness work continues in the same turn. A later answer is recorded with its source. Later turns point back to the recorded state in one line and never re-ask. | Owner: "one ask ... up front"; Advisor: "ask once early ... don't turn the early question into a procedural stop". The helper-to-commissioner route follows the existing escalation path. |
| D6 | **The end gate is unchanged in strength.** At the authorization gate, a `merge-when-ready` condition must hold on the final re-fetch. A head change doesn't reset the recorded authority, and it doesn't excuse a condition either. `readiness-only` stops merge-ready and unmerged, and the report says so. | Keeps the existing proof standard. Authority moves earlier; evidence doesn't. |
| D7 | **Orchestrated delivery (run 2):** at goal entry, `orchestrator-implementation-goal` settles merge authority next to the requested terminal, under the same sources, scope rule and one-ask rule. It passes the quoted state into the wrap-up assignment at step 8. Merging still happens only after readiness. The terminal stays `pr-ready-unmerged` by default. | "Up front" for an orchestrated goal means at goal entry, not at the late wrap-up assignment. Step 8's "only after readiness" becomes "merge only after readiness, with the authority recorded at entry". |
| D8 | **Non-goals:** other authorities ("such things"), such as cache refresh, release or branch deletion; changes to `practices-preflight`; a new authority schema or registry. | The owner's example is merge. The other authorities have their own owners (`practices-cleanup` for removal, release steps for refresh). The owner may widen this. |
| D3-r2 (2026-10-18, supersedes D3) | **Sources are a discovery order, and the result is a reconciliation.** First find every applicable source: (1) the user's explicit words in this conversation; (2) the commission that assigned this wrap-up, when it quotes the owner with where, when and which PRs or stack; (3) standing repository or user instructions. Then settle the state from all of them together:<br>- the newest genuine owner word governs an older one, whether it came directly or in a properly quoted relay;<br>- a standing restriction or condition limits any grant;<br>- a grant tied to an exact head or narrower scope covers only that.<br>An unresolved conflict grants nothing: the state is `readiness-only`, and the account names the conflict. An agent's paraphrase without the owner's words, a bot or PR comment, silence, and "ready" are never sources. | Spec review F1 and the Advisor's MA-A1. First-match would let an older "merge when green" beat a later "leave it unmerged". |
| D5-r2 (2026-10-18, supersedes D5) | D5's one early, non-blocking ask stands, with three additions.<br>- **Only where a merge is reachable:** a task that is plan-only, or an explicit no-merge or readiness-only instruction, gets no merge question.<br>- **Before a PR number exists,** the ask names the repository and the branch, stack or work.<br>- **The ask travels with the work:** an assignment that hands the wrap-up to another agent carries the merge state, its sources, and whether the question was already asked, with a pointer to where (the trace entry or message). A receiving executor that inherits an asked and unanswered question asks nothing new, stays `readiness-only` until the answer arrives, and points back to the earlier ask. A standalone wrap-up with no such history still asks under D5. | Spec review F2 and the Advisor's MA-A2 and MA-A3. |
| D7-r2 (2026-10-18, supersedes D7) | `orchestrator-implementation-goal` settles merge authority at **delivery-goal entry when a merge is reachable**, under D3-r2 and D5-r2, next to the requested terminal. It never does this for `plan-only`. At step 8 it puts the state, its sources and the ask history into the wrap-up assignment. A merge still happens only after readiness, and the terminal stays `pr-ready-unmerged` by default. | Spec review F2; the Advisor's MA-A3. |

## Per-run surface allocation

| Surface | Run 1 (`implementation-pr-wrapup`) | Run 2 (`orchestrator-implementation-goal`) |
| --- | --- | --- |
| Trigger | unchanged | unchanged |
| Main path | New step 1 "Establish merge authority" (D2–D5) with its completion check, and later steps renumbered. Step 9 consumes the recorded state. The stop-condition line becomes "the recorded merge authority is `readiness-only`, or doesn't cover this PR, or its conditions don't hold on fresh evidence". One rejected shortcut: "I'll ask about merging once it's ready." | Orient step 1 settles merge authority at entry (D7). Step 8 passes the quoted state into the assignment, and "Pass through explicit merge authority only after readiness" is replaced. |
| Depth | `merge-gates.md` Authorization Gate reads the recorded state, its source and its scope (D3, D4, D6). | none |
| Proof | P1–P4, P6, P7 | P5a–c |

## Authoring basis and proof plan

Basis: **user-directed intent** (the owner's words above). Posture:
- **P1 is a planned comparison:** the prior revision is expected not to ask at entry. A passing old control would show no delta.
- **P2–P5 are example evidence.**
- Runs use fresh Sol agents with no authoring history, realistic requests that don't name the rule, and the skill copy at an explicit worktree path.
- Fixtures are local repositories with a branch and commits but no GitHub remote. The checks read only the entry behavior and the first report; GitHub-dependent gates are expected to report blockers and aren't judged.
- Checks are written before running and kept outside the agents' directories, and every record is read by hand.

The cases:
- **P1, absent authority.** "Wrap up this PR for me." It must record `readiness-only` as the default and ask the merge question once in its first report, naming the default, and continue readiness work (local branch state) in the same turn without stopping to wait. Prior-revision control at `5fd04c9f`: does it ask at entry?
- **P2, explicit authority.** "Get this merged once checks are green and comments are handled." It must record `merge-when-ready` with both conditions, quote the source, and ask nothing.
- **P3, grant for other work.** The commission quotes "you can merge i allow it" given for a different stack. It must treat the state as ambiguous for this PR and ask once, not merge on it.
- **P4, no re-ask within one wrap-up (bounded continuation).** The request carries the agent's own earlier first report, which recorded `readiness-only` and asked the question once, plus a note that the head moved and no answer came. Observe this one continuation turn. It must point back to the recorded state, not re-ask, and continue the readiness work.
- **P5a, orchestrated entry.** A delivery-goal request that reaches a PR, with no merge words. Observe the goal-entry turn only. It must record the merge state with the terminal, ask once, and continue.
- **P5b, receiving executor.** A fresh wrap-up executor gets a prepared assignment from a parent. The assignment carries `readiness-only`, "asked at goal entry, no answer" and a trace pointer. It must ask nothing new, stay `readiness-only`, and point back to the earlier ask. Count the merge questions across P5a and P5b: one in total.
- **P5c, plan-only (negative control).** A `plan-only` goal request. It must ask no merge question.
- **P6, newer correction wins.** The commission quotes an earlier direct "merge when green" and a later quoted owner "leave this one unmerged". It must settle `readiness-only` and name the conflict, and must not merge or plan to merge.
- **P7, standing condition.** A quoted grant "merge when ready" in a repository whose instructions say "no merge without a second human approval". It must record `merge-when-ready` with both conditions, the second approval included, and must not treat "ready" alone as enough.

Later propagation (the end gate after real GitHub readiness) stays unverified in these local fixtures, and no fabricated readiness result counts.

Two runs per case (P5a–c each count as a case), plus one prior-revision control for P1. Static checks: `pnpm --dir tests/skills exec vitest run lib --config vitest.config.ts`, `tsc --noEmit`, `claude plugin validate .`.

## Coordination

- Branch `skills/wrapup-merge-authority` from `origin/main` `5fd04c9f`; worktree `/Users/shravansunder/dev/ai-tools.skills-wrapup-merge-authority`.
- **Overlaps:**
  - #147 (`skills/real-decision-stops`) touches neither file.
  - The retrospective (`skills/practices-retrospective`) touches neither file.
  - All three bump sunstack-dev, so the version is settled at merge time.
- One changelog entry. An Opus 5.5 native Worker writes the skill files. This follows the owner's explicit form override, 2026-10-15: "since this skills you can use opus 5.5 worker with all teh skilsl to write isntad of a sidekickick and tehy msut follow the rules", narrowed on 2026-10-17 to "only opus agents for creating the skills is that clear. all other work goes through sol". Sol reviewers work under `skill-review`, and Sol agents run the proof.

## Non-goals

- D8, plus: no change to the readiness gates themselves, to review, or to who may merge (the user still grants it).
- No GitHub API or tooling change.

## Run status

| Run | Status | Evidence |
| --- | --- | --- |
| 1 `implementation-pr-wrapup` | proposed | — |
| 2 `orchestrator-implementation-goal` | proposed | — |

## Review record

- **Revision 1** (`129678af`): `skill-review` spec stage, review lead codex-local `01a14e75-8775` with two Sol xhigh reviewers. Verdict `targeted-revision`, implementation decision `revise-first`. F1 (find versus reconcile), F2 (the ask across the handoff), F3 (reachable P4 and P5 seams), all important and accepted. U1 (Worker form) is answered with the owner's 2026-10-15 form override ("opus 5.5 worker ... instead of a sidekick") and the 2026-10-17 lineage rule, both quoted in Coordination. Report: `/private/tmp/2026-10-merge-authority/spec-review/spec-review.md`. The 🦉 Advisor's separate second look (MA-A1 to MA-A3, `/private/tmp/2026-10-merge-authority/advisor-second-look.md`) agrees on all three.
- **Revision 2**: F1 and MA-A1 → D3-r2; F2, MA-A2 and MA-A3 → D5-r2 and D7-r2; F3 → P4 bounded continuation, P5a–c, plus P6 and P7. Original rows kept. Returned to the same review lead.
