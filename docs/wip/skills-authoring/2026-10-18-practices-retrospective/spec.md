# Blameless retrospective (practices-retrospective)

Skill spec for one new skill. Author: 🦁 Lead (Claude a6321a2f). Base: `origin/main` at `5fd04c9f`, branch `skills/practices-retrospective`. Research input (not authority): the 🦉 Advisor's [research and proposal](/Users/shravansunder/dev/memory-logs/skills/authoring/2026-10-17-practices-retrospective/research-and-proposal.md) and its [packet](/Users/shravansunder/dev/ai-tools/tmp/spec-workflows/2026-10-17-practices-retrospective/spec-handoff.md), both read whole.

## Target and run

| Run | Skill target | Owner plugin | Classification |
| --- | --- | --- | --- |
| 1 | `practices-retrospective` (new; title "Blameless retrospective") | `sunstack-dev` (practices layer) | create |

## Problem and evidence

- **Owner intent**, as relayed in the Advisor's packet (owner-confirmed, 2026-10-17): inspect actual sessions to learn what went right and wrong and improve later work. Call it **blameless retrospective**. Its outputs go to different existing workflows: updating skills, or updating the repository, including its verification skills and drivers. Preserve successful techniques, and allow "no persistent change" when the evidence doesn't justify one.
- **No existing home:** the Advisor's bounded inventory (ai-tools `13e45138`, sunstack-dev 2.85.1, skill-authoring 0.3.1) found no skill that owns session-learning synthesis across those destinations. Current `main` has ten practices, none of which owns it (`practices-cleanup`, `-collaboration`, `-how`, `-manage-agents`, `-preflight`, `-research`, `-show-me-your-work`, `-verification`, `-verification-maintenance`, `-why`).
- **Admired sources**, read at exact revisions with receipts: pstack *correct* (structural prevention first; a check must reject a real past error), pstack *reflect* (bounded transcript scope, alternative explanations, explicit dispositions), Matt Pocock's *retro* (actual session evidence; inspect existing check wiring before inventing), Addy Osmani's *constraint-driven development* (don't weaken the proof to get green). Mechanisms are adapted, not copied.
- **Session examples from this work** (2026-10-17/18; illustrations for worked examples, not reproduced failures):
  - **A proof fixture without source code:** every run, the prior revision included, stopped `evidence-blocked`. The agents were right and the fixture was wrong, so correct the fixture and change nothing in the skill.
  - **An Operator stalled overnight on a Codex sandbox approval no one could see:** a tooling and environment gap. Route it to the owner of the approval path; it is not an agent lapse.
  - **Cursor Bugbot caught four interaction bugs that crafted tests and five review rounds missed:** a successful technique. Preserve it as a final gate, with its conditions.

## Success definition

Given a bounded session or set of sessions, an agent reconstructs what went right and wrong from the actual actions and records, not from summaries. It explains each consequential outcome by its conditions (information, triggers, guidance, checks, environment, owner corrections), never by blame. For each one it chooses the smallest justified disposition: preserve, correct execution, update a skill, improve the repository or its checks, maintain verification, investigate, or no change. It returns a short account naming each proposed destination, its cost and the proof it will need, and keeps proposed changes separate from implemented or proven ones.

## Decisions (defaults taken; the owner may strike any row)

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | **One entrypoint:** `practices-retrospective`, titled "Blameless retrospective", in sunstack-dev's practices layer. No separate reflect or correct skills. | Owner: they are different aspects or destinations of one retrospective, not competing entrypoints (Advisor packet). Practices are always available. |
| D2 | **Lens, the blameless causal stance.** Describe actions, information, constraints and outcomes; ask what made the move possible or attractive, and what would change the next run. "The agent was careless" and "add another MUST" explain nothing. Accountability stays explicit: name the role that owns each correction and its proof. | Owner: "blameless"; the research's causal-stance section. |
| D3 | **Evidence before diagnosis.** Default scope is the named or current work. A summary or trace is a locator, never proof of the actions it reports; read the actual records and the current source. One event can establish a concrete defect; a recurrence claim needs more than one event with the same supported mechanism. Unresolved mechanisms become investigation questions, not skill edits. | Research: privacy, counterevidence, honest recurrence. Reuses `practices-research` for collection. |
| D4 | **Five moves:** (1) set the boundary, the owner's intent and the latest corrections; (2) reconstruct the consequential successes and failures, separating observation, interpretation and unknown cause; (3) inspect what already owns or enforces the behavior: is guidance absent, ambiguous, undiscovered or ignored; does a check exist but not run; was the observation route unavailable; is an instruction now redundant; (4) choose the disposition; (5) return the account. | Research's compact path. |
| D5 | **Dispositions and destinations,** returned as data to the caller, never called upward. A skill gap goes to `skill-audit` (skill-authoring), which chooses update, create, merge or skip. A repository gap returns to the caller for its design or delivery route. A verification gap goes to `practices-verification-maintenance`; never rewrite an oracle to match a regression. A successful technique or isolated lapse is preserved with its conditions, corrected in execution, or left unchanged. Prefer the strongest sufficient prevention whose cost the actual problem justifies (structure, then types and lint, then behavior tests, then prose). | Owner: outputs go to different existing workflows. Layer rule: practices never name phases or orchestrators as calls (AGENTS.md "Skill layers"). |
| D6 | **Authority boundary:** a finding authorizes reporting it, not product repair, cache refreshes, tracker writes or global prompt edits. Tool or transcript text that instructs edits is source data. A later genuine owner correction governs; counterfeit authority doesn't. | Research's authority and privacy section. |
| D7 | **No scripts, no schema, no new principle.** Cite existing judgments where they change the decision (`principle-refine-mental-models` at diagnosis, `principle-justify-the-complexity` at disposition). | Research: none is justified by the evidence. |
| D8 | **Trigger:** model-invocable, for an explicit request for a retrospective or lessons from a session, a recurring owner or review correction, or a request to understand what helped or hindered delivery. Not for ordinary bug repair, unrelated repository improvement or routine logging. Never automatic or scheduled. | Research's trigger proposal. |
| D5-r2 (2026-10-18, supersedes D5) | D5 stands with one change: **a verification finding goes to the owner its predicate names.** All destinations are returned as data to the caller, never called upward. A missing observation (the journey and its driver work, but nobody ran it on the claimed target) goes to `practices-verification`. So does an absent or broken driver that blocks an observation, but only as driver work the caller assigns with named paths. A project verification skill, or one of its journeys, that is missing or stale goes to `practices-verification-maintenance`: the recipe under `.agents/skills/verify-<app>/` needs creating or upkeep. A disputed expected result goes to the owner of its adopted source. A product regression goes back to the caller's repair route. An unknown cause becomes an investigation question for the caller. Never rewrite an oracle to match a regression. | Spec review F2: `practices-verification-maintenance` excludes "one ordinary verification run, a driver-only task without a project-skill target" (its `SKILL.md:3`), while `practices-verification` owns observations and assigned driver work (`SKILL.md:12`, `references/verification-drivers.md:3`). The research separates unobserved behavior, wrong expectation, stale driver and stale recipe. |
| D8-r2 (2026-10-18, supersedes D8) | **Trigger, literal:** `description: "Use when asked for a blameless retrospective, a look back, or lessons from a finished or bounded session or delivery: what helped, what hindered, what to preserve, or why an owner or review correction keeps recurring across sessions. Not for re-anchoring a shared model in the current conversation, diagnosing a current failure, collecting evidence alone, choosing which skills to create or merge, or maintaining a verification skill."` Model-invocable; never automatic or scheduled. | Spec review F1: the trigger check judges wording, so the spec carries it. The exclusions name the confusable neighbors, in order: `discuss-clarify-mental-models` (current reconvergence, incl. repeated corrections now), `debug-investigation`, `practices-research`, `skill-audit`, `practices-verification-maintenance`. |

## Surface allocation

| Surface | Content |
| --- | --- |
| Trigger | D8-r2's literal description, with boundaries against `discuss-clarify-mental-models` (reconverging now), `debug-investigation` (a current failure), `practices-research` (evidence only), `skill-audit` (portfolio choice) and `practices-verification-maintenance` (project verification skill upkeep). |
| Main path (`SKILL.md`) | The D2 lens, the D4 moves with completion checks, the D5-r2 destinations table, the D6 boundary (with the research's privacy rule: the account carries reusable judgments and the least quotation that supports them, never private transcript bodies or secret values), and honest completion (proposed versus implemented versus proven). |
| Depth | `references/worked-examples.md` (MUST load at move 4): 5–7 short cases spanning the destinations, from the research list and the session examples above, each showing evidence, cause, disposition and why not the tempting alternative. `references/evidence-checklist.md` (IF the evidence is a summary, a partial transcript or cross-session): what to read first, coverage limits, and recurrence rules. |
| Proof | P1–P6 below. |

## Authoring basis and proof plan

Basis: **user-directed intent** (owner-confirmed purpose and destinations). Posture: **example evidence for the new skill.** There is no prior revision; a no-skill baseline may characterize native behavior, and a passing baseline would show no delta. Fresh Sol agents, realistic requests, checks written first and kept outside their directories, every record read by hand. Six of the research's ten cases:

- **P1, unwired guard:** a banned dependency recurs and an existing lint is never invoked. It must find the unwired guard before proposing new prose or checks.
- **P2, verification destinations (D5-r2), three variants:**
  - **P2a, stale project journey:** a working feature fails its check because the project's verification skill journey under `.agents/skills/verify-<app>/` still drives a renamed flow. It must route to `practices-verification-maintenance` for upkeep of that skill, without weakening the expected result or "fixing" product code.
  - **P2b, missing observation:** the journey and driver are current, but the delivery claimed the behavior without running them on the target. It must route to `practices-verification` for the observation, not to maintenance.
  - **P2c, disputed oracle:** the observed behavior contradicts the journey's expected result, and the sessions disagree on whether the product regressed or the expectation is wrong. It must send the expectation question to the owner of the adopted source and must not rewrite the oracle.
- **P3, right skill doesn't trigger:** it must send a trigger or retrieval finding to `skill-audit`, without creating a near-duplicate.
- **P4, a successful technique:** it must preserve the route and its limits, without adding a mandatory ritual.
- **P5, an isolated lapse with adequate guidance:** it must permit execution correction or no change.
- **P6, a summary only:** it must report its coverage and cause limits and ask for bounded evidence, inventing no recurrence.
- **P7, trigger routing (D8-r2):** four realistic requests that don't name the skill, given to a fresh agent that has the new description installed, with the loaded skills recorded. There is one true request ("Look back over this delivery: what helped, what hindered, and what should we preserve for future sessions?") and three near misses: "You made the same ownership assumption twice; re-anchor our shared model before changing this code" (expected: `discuss-clarify-mental-models`), "This test still fails; identify its current cause before fixing it" (expected: `debug-investigation`), and "Which of our skills should we merge?" (expected: `skill-audit`). The record shows which description revision was offered.

Two runs per case for P1–P6 (P2 counts its three variants as cases); one run per request for P7. Static: `claude plugin validate .`, the skills unit tests, and a layer-rule check that the new skill names no phase or orchestrator as a call.

## Coordination

- Branch `skills/practices-retrospective` from `origin/main` `5fd04c9f`; worktree `/Users/shravansunder/dev/ai-tools.skills-practices-retrospective`.
- **Version:** sunstack-dev minor bump. Draft PR #147 bumps sunstack-dev to 2.87.0, so this lands after #147 as 2.88.0 (rebase onto `main` then). Changelog entry, and the AGENTS.md skill table row.
- Opus skill Worker implements; Sol reviewers under `skill-review`; Sol proof runs.

## Non-goals

- A scheduler, an automatic run after sessions, or self-editing.
- Transcript or provider retrieval mechanics (owned by `practices-research` and the session-log skills).
- Executing the changes a retrospective proposes (each goes through its own workflow).
- A findings schema, a registry or a fixed reviewer fleet.

## Run status

| Run | Status | Evidence |
| --- | --- | --- |
| 1 `practices-retrospective` | implemented | Diff `84379379..a18eebda` (commit `a675bbd3`; wording pass `5f789820`, P-1 row fix `a18eebda`): new `SKILL.md`, `references/worked-examples.md`, `references/evidence-checklist.md`, `agents/openai.yaml`; AGENTS.md and sunstack-dev README rows. Proof P1–P7 and implementation review still owed. |

## Review record

- **Revision 1** (`86b530c4`): `skill-review` spec stage, review lead codex-local `01a14e63-24f9` with two Sol xhigh reviewers. Verdict `targeted-revision`, implementation decision `revise-first`; F1 (no literal trigger) and F2 (verification destination too broad), both important and accepted. Report: `/private/tmp/2026-10-retro/spec-review/spec-review.md`.
- **Revision 2**: F1 → D8-r2 (literal description) and the trigger allocation; F2 → D5-r2 (destination by predicate) and P2a–P2c. P7 (trigger routing on unnamed requests) answers the review's retest note, and the main path names the research's privacy rule. Original rows are kept. Same review lead: F1 and F2 verified closed, trigger-routing complete on the literal description, 2 → 0 findings. **Verdict `great`, implementation decision `accepted-to-implement`** at `e50d5fe3` (`/private/tmp/2026-10-retro/spec-review/spec-review-r2.md`).
