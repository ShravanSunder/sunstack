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

## Per-run surface allocation

| Surface | Run 1 (`implementation-pr-wrapup`) | Run 2 (`orchestrator-implementation-goal`) |
| --- | --- | --- |
| Trigger | unchanged | unchanged |
| Main path | New step 1 "Establish merge authority" (D2–D5) with its completion check, and later steps renumbered. Step 9 consumes the recorded state. The stop-condition line becomes "the recorded merge authority is `readiness-only`, or doesn't cover this PR, or its conditions don't hold on fresh evidence". One rejected shortcut: "I'll ask about merging once it's ready." | Orient step 1 settles merge authority at entry (D7). Step 8 passes the quoted state into the assignment, and "Pass through explicit merge authority only after readiness" is replaced. |
| Depth | `merge-gates.md` Authorization Gate reads the recorded state, its source and its scope (D3, D4, D6). | none |
| Proof | P1–P4 | P5 |

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
- **P4, no re-ask.** A continuation turn after a new head, with the state already recorded as `readiness-only` and no answer received. It must point back to the recorded state and not re-ask.
- **P5, orchestrated entry.** A goal request with no merge words. At goal entry, alongside the terminal, it must record the merge state, ask once, carry on with the work, and show that the wrap-up assignment it drafts quotes the state.

Two runs per case, plus one prior-revision control for P1. Static checks: `pnpm --dir tests/skills exec vitest run lib --config vitest.config.ts`, `tsc --noEmit`, `claude plugin validate .`.

## Coordination

- Branch `skills/wrapup-merge-authority` from `origin/main` `5fd04c9f`; worktree `/Users/shravansunder/dev/ai-tools.skills-wrapup-merge-authority`.
- **Overlaps:**
  - #147 (`skills/real-decision-stops`) touches neither file.
  - The retrospective (`skills/practices-retrospective`) touches neither file.
  - All three bump sunstack-dev, so the version is settled at merge time.
- One changelog entry. An Opus skill Worker implements; Sol reviewers work under `skill-review`; Sol agents run the proof.

## Non-goals

- D8, plus: no change to the readiness gates themselves, to review, or to who may merge (the user still grants it).
- No GitHub API or tooling change.

## Run status

| Run | Status | Evidence |
| --- | --- | --- |
| 1 `implementation-pr-wrapup` | proposed | — |
| 2 `orchestrator-implementation-goal` | proposed | — |

## Review record

Pending: `skill-review` spec stage, with the 🦉 Advisor's offered adversarial second look.
