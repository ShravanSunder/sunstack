# Real decision stops: replace the structural-confirmation gate

Skill spec for one behavior change in `sunstack-dev`, in two runs. Author: 🦁 Lead (Claude a6321a2f). Base: `origin/main` at `5fd04c9f` (sunstack-dev 2.86.0), branch `skills/real-decision-stops`.

## Targets and runs

| Run | Skill target | Owner plugin | Files |
| --- | --- | --- | --- |
| 1 | `program-design` | sunstack-dev | `skills/program-design/SKILL.md`; `skills/program-design/references/artifact-and-self-review.md`; `shared-references/owner-decision-brief.md` (owned by `program-design`, per #103) |
| 2 | `spec-program-review` | sunstack-dev | `skills/spec-program-review/SKILL.md`; `references/reviewing-common-method.md`; `references/lanes/lane-schema.md`, `mode-complete-reviewer.md`, `reader-understanding.md`; the static contract test `tests/skills/lib/spec-program-design-user-requirements-contract.test.ts` |

Run 2 depends on run 1 and lands in the same PR. A later run 3 (goal-boundary confirmations in `discuss-pathfinding`, `spec-design` and `spec-program-review`) is a non-goal here; see Non-goals.

## Problem and evidence

- **Owner decision**, relayed by Sun (Chief of Staff) on board thread root `01a118f1`, activity 8046, 2026-10-17 22:21 ET. Quoted: "Fix: option 3. Replace the structural-realization confirmation gate with a check for real open decisions. Agents pick the best structure, record it and its tradeoffs, and go straight to independent review. Remove the confirmation and waiver requirements from program-design, spec-program-review and their references, including the done-criteria and failure lists, so that reviewers stop asking for it." And: "an agent may stop only for a REAL open direction, and it must give a good explanation of why the decision is genuinely open, including the nuanced positions of the agents involved (Lead, Advisor, reviewers): where they agree, where they disagree, and why. Include 2-3 concrete options and a recommendation. No bare 'confirm structure' asks. These stops go to the Chief of Staff role (Sun), never straight to Shravan."
- **Owner report** (8031, via Sun): "the Program Design skill makes agents stop and wait on Shravan ... Several agents are freezing or pausing for no good reason because of this gate".
- **Fleet evidence**: a read-only Sol survey of 210 sessions (`/private/tmp/2026-10-gate-incident/fleet-survey.md`) found the AgentStudio daemon Lead (`01a1418c`, turn `01a14c08`, board 8029) and the central one-core design Lead (`9f6bdec4`, board 7156: "Waiting on the owner's structural-realization confirmation ... All builders remain stopped") holding on this gate, and the Chief of Staff supervision design had held on it earlier (board 7632).
- **Source** (read at `5fd04c9f`): `program-design` SKILL.md line 68 makes a missing confirmation `decision-needed` with "the human owner" as decision owner; step 16 (lines 248–268) says "ask the authorized owner to confirm the current structural realization, and end the turn"; step 17 (line 272) runs only after the reply or a waiver; line 358 is a failure-list item; the result and handoffs (lines 59, 84, 291) carry "structural-realization confirmation". `spec-program-review` enforces it again at admission (lines 78, 95), in its failure list (225), in `reviewing-common-method.md` (5, 17) and in three lane prerequisites. `artifact-and-self-review.md` 102 and 114 make it a self-check item.
- **Provenance**: introduced 2026-08-03 (`051f0a99`) as a guard against Program Design silently expanding the confirmed goal; made turn-ending in #102 (D6, 2026-09-25); kept by #103. Its intent (no silent expansion, the domain visible before review) is preserved below by existing blockers, not by a stop.

## Success definition

A `program-design` run whose structure has no genuinely open owner-controlled direction records the selected structure and its tradeoffs, shows the views, and goes straight to independent review in the same run, with no confirmation request, no waiver record and no end-of-turn stop. When a direction is genuinely open, the run stops with a decision brief that explains why it is open, states each involved agent's position (where they agree, where they disagree, and why), gives 2–3 concrete options and a recommendation, and routes to the Chief of Staff role, not to the owner directly. `spec-program-review` admits a Program Design without any confirmation record and never asks for one.

## Decisions (defaults taken; the owner may strike any row)

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | Remove the structural-realization confirmation entirely: the step-16 ask and end-turn, the line-68 `decision-needed` clause, the step-17 wait, completion and failure items, the waiver text, and every result, handoff, admission, lane and self-check mention. Hard cutover; no alias, no "waived" record. | Owner 8046 names exactly these surfaces; owner standard "hard cutover, no backward compatibility". |
| D2 | Step 16 becomes "self-check and record the structure decision": record in the artifact the selected structure, the credible alternatives, tradeoffs and falsifiers (already required by the failure list), show the same views, then continue to step 17 in the same run. | Owner: "Agents pick the best structure, record it and its tradeoffs, and go straight to independent review." The views stay because they serve the reader and the reviewer. |
| D3 | `decision-needed` keeps exactly one trigger: two or more viable structural directions remain and choosing needs owner-controlled cost, risk, compatibility or policy tolerance that neither the Specification, the confirmed goal, nor the owner's standing instructions settle. "The structure is new" or "the owner might want to see it" is not a trigger. | Owner: "stop only for a REAL open direction". This is the existing first half of line 68 without the confirmation clause. |
| D4 | `owner-decision-brief.md` gains two required parts. **Why it is genuinely open**: what evidence and standing owner instructions were checked and why they don't settle it. **Where the agents stand**: each involved agent's position (Lead, Advisor, reviewers that weighed in): agreement, disagreement, and the reason for each. Options are capped at 2–3 concrete ones; the recommendation stays. | Owner 8046, quoted above. One brief owner serves every caller (#103), so the requirement lands once. |
| D5 | Routing: an owner-decision brief goes to the owner's decision channel. That is the Chief of Staff role when the session has one, and the owner only when no Chief of Staff exists. Written as a role; no person's name in generic skills. | Owner: "These stops go to the Chief of Staff role (Sun), never straight to Shravan." The Advisor (board 8032) warned against hardcoding a name. |
| D6 | The original intent stays guarded by existing text, not by a stop: material scope expansion beyond the confirmed goal (line 138) still returns to the owner as a real decision; requested machinery outside the goal is still rejected; the failure list still requires alternatives, tradeoffs and falsifiers for every material choice. | Keeps the 2026-08-03 purpose without the freeze. |
| D7 | `spec-program-review` admission, failure list, common method and lanes drop the confirmation requirement and add nothing in its place. A reviewer that finds a genuinely open owner-controlled choice reports it with the existing `requires owner expansion decision` scope effect, and the caller briefs it per D4–D5. | Owner: "so that reviewers stop asking for it". No new review mechanism. |
| D8 | The static contract test drops its two assertions for the old text and adds assertions that the old phrase is absent (hard-cutover guard) and that the D3 trigger and D4 brief parts are present. | Keeps the existing test owner. |
| D9 | Version: sunstack-dev minor bump (2.86.0 → 2.87.0), one changelog entry, Codex and Claude manifests together. | User-visible behavior change. |

## Per-run surface allocation

| Surface | Run 1 (`program-design`) | Run 2 (`spec-program-review`) |
| --- | --- | --- |
| Trigger | unchanged | unchanged |
| Main path | line 59 result list, line 68 `decision-needed`, the route block (lines 74–84), step 16 (rewrite per D2), step 17 opening (no wait), step 18 result list, failure list (line 358 removed; line-138 expansion rule unchanged) | admission inputs (78) and the mode requirements (95); failure list (225) |
| Depth | `artifact-and-self-review.md` 102 and 114: drop the confirmation; keep "views shown" items. `owner-decision-brief.md`: D4 and D5. | `reviewing-common-method.md` 5 and 17; `lanes/lane-schema.md` 3; `lanes/mode-complete-reviewer.md` 9; `lanes/reader-understanding.md` 7 and 9 |
| Proof | behavior runs P1 and P2 below | behavior run P3 below; static test D8 |

## Authoring basis and proof plan

Basis: **user-directed intent** (owner decision 8046), backed by observed fleet freezes; no RED is manufactured. Proof posture: **representative comparison** on three representative cases, each run by fresh Sol agents with no authoring history. Each gets a realistic request and the skill copy at an explicit worktree path, so the record shows which copy was read. Checks are written before running and kept outside the agents' working directories, and every transcript is read by hand.

- **P1, settled structure.** A small accepted Specification with one obvious structure and no open owner tolerance; ask for its Program Design. Prior revision (`5fd04c9f`): expected to stop for structural confirmation (characterization). New revision: must record the structure and tradeoffs, show the views, and proceed to independent review in the same run, with no confirmation ask, no waiver line and no `decision-needed`.
- **P2, genuinely open direction.** The same setup, but two viable structures differ only by an owner-controlled tolerance the Specification leaves open (for example, retention cost against audit completeness), with an Advisor note and a reviewer note that disagree. New revision: must return `decision-needed` with a brief that explains why it is open, states both agents' positions (agree, disagree, why), gives 2–3 options and a recommendation, and routes to the Chief of Staff role. A bare "please confirm the structure" fails.
- **P3, review admission.** Run `spec-program-review` in `program-only` mode on a Program Design that has no confirmation record. New revision: must admit and review, never return a missing-confirmation gap.

Repetitions: two fresh runs per case on the new revision and one prior-revision control for P1 and P3. Variance is reported as a proof gap. Static: `pnpm --dir tests/skills exec vitest run lib --config vitest.config.ts`, `tsc --noEmit`, `claude plugin validate .`, and a repository search showing zero remaining mentions of "structural-realization confirmation" and "waived by owner" in active skills.

## Coordination

- Branch `skills/real-decision-stops` from `origin/main` `5fd04c9f`, worktree `/Users/shravansunder/dev/ai-tools.skills-real-decision-stops`.
- No pending edits to these files on other branches known at `5fd04c9f`.
- Version and changelog: runs 1 and 2 land together; one changelog entry under `docs/changelog/`, with `README.md` index, plugin manifests at 2.87.0.
- Implementation by an Opus skill Worker (owner rule: Opus writes skills); spec and implementation review by Sol reviewers under `skill-review`; proof runs by fresh Sol agents.

## Non-goals

- Run 3: goal-boundary confirmations in `discuss-pathfinding` (line 181, `user-requirements-extraction.md` 113 and 118), `spec-design` (151, 302) and `spec-program-review` (77, 91). Owner 8046 item 4 asks for the same rule there "after the main fix"; it gets its own spec once this lands.
- Changing what a confirmed goal boundary is, or how material scope expansion is decided (D6 keeps both).
- Any change to independent review, its convergence rule, or the views themselves.
- Board, Router or Chief of Staff tooling.

## Run status

| Run | Status | Evidence |
| --- | --- | --- |
| 1 `program-design` | proposed | — |
| 2 `spec-program-review` | proposed | — |

## Review record

Pending: `skill-review` spec stage.
