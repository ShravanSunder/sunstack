# Skill spec: Verification Design in the design cycle

Draft of 2026-10-17 by the 🦁 Lead (claude-local a6321a2f), written with `skill-creation`. It folds in the 🦉 Advisor's (codex-local 01a118ee) second look at `/private/tmp/2026-10-agent-readiness-cleanup/verification-design-advisor-reply.md`. No skill file has changed.

## The design cycle after this change

| Owner | Question it settles |
|---|---|
| Requirements (`spec-design`) | Whose need and outcome are authorized? |
| Specification (`spec-design`) | What observable behavior, including failure, must hold, and against what reference? |
| Program Design (`program-design`) | Which owners, contracts and seams realize that behavior? |
| **Verification Design (`verification-design`, new)** | How will this project's requirements be shown to hold: against what reference, on which target, through which journey, and with which limits? |
| Planning (`plan-implementation`) | When, and by which commands, the adopted proof is earned. |
| Verifier, `practices-verification`, `verify-<app>` | Whether the route can decide the claim, what was actually observed, and what upkeep the journeys need. |

## Targets and runs

Plugin `sunstack-dev`. Each run has one target. Three stacked PRs (`gh stack`): PR A holds runs 1–6, the design side; PR B holds runs 7–13, the consumers; PR C holds run 14. They merge together.

| Run | Target | Kind | PR |
|---|---|---|---|
| 1 | `skills/verification-design` | create | A |
| 2 | `shared-references/diagram-rendering-and-fallbacks.md`: the one rendering owner, which now calls `presentation-html` | update | A |
| 3 | `shared-references/requirements-specification-program-design.md` → `design-documents.md`: the four-document contract, with every caller updated | update | A |
| 4 | `shared-references/phase-return-tokens.md`: adds `verification-design-gap` | update | A |
| 5 | `skills/spec-design`: modality selection moves out; Requirements views go through run 2 | update | A |
| 6 | `skills/program-design`: input, continuation and its medium clauses only | update | A |
| 7 | `skills/orchestrator-design`: cleanup | update | B |
| 8 | `skills/spec-program-review`: four documents | update | B |
| 9 | `skills/plan-implementation` with `shared-references/canonical-implementation-plan.md` | update | B |
| 10 | `skills/plan-improve-repo`: the design-bearing path | update | B |
| 11 | `skills/spec-handoff` and `skills/plan-handoff`: carry the four-document basis | update | B |
| 12 | `skills/orchestrator-implementation-goal`: token mapping | update | B |
| 13 | the Verifier's commission: `role-lead/references/working-with-verifier.md` and `verifier-contract.ts` | update | B |
| 14 | lasting versus temporary journeys (D17): `verification-design` (row field and reference), `role-lead/references/working-with-verifier.md`, `practices-verification`, `practices-verification-maintenance` (including `references/project-skill-layout.md`: scripts move out of the skill into repo scripts), `role-verifier` (promotion) | update | C |

Outside this repository: the devfiles skill index needs a `verification-design-gap` row. That needs the owner's commit approval, so it's listed under Coordination.

## Problem and evidence

- **The owner asked for this phase on Oct 11:** "specification -> should have a verification design like program design" and "verifvication design is per proejct" (Claude prompt history, 10:33 and 17:14).
- **It was built twice and closed both times.**
  - #122: closed Oct 13 ("Close it. Redo. New on top of127 gh stack").
  - #128: closed Oct 14 ("128 is phase level and its not even right", "128 is close only used as reference"; Codex prompt history, 14:21–14:22).
  - Owner on Oct 17: "the agent did the phases change before us and it was bad so i closed it it got missed."
- **#128's skill did three jobs** (`skills/verification-design/SKILL.md:26–35` at `ffe30964`): authoring, the prebuild challenge, and judging delivery. On main the last two now belong to `practices-verification` (`SKILL.md:8–35`) and `role-verifier` (`SKILL.md:14–26, 37–44`). The responsibility still missing is the Lead's proof strategy for the project. (Advisor, A1; verified.)
- **Main, `13e45138` at 2.85.1:**
  - There is no `verification-design`.
  - `orchestrator-design` runs three documents in 1,804 words of prose, and its tail (`SKILL.md:80–82`) repeats delivery management that `orchestrator-implementation-goal` and the practices already own.
  - 28 files name the three-document basis: planning admission, review, handoffs and the shared contract.
  - Program Design takes a "proof-modality inventory" as an input (`program-design/references/proof-architecture-and-traceability.md:5`), and `spec-design/references/proof-obligations.md` produces it.
- **No design skill names `presentation-html`.** `diagram-rendering-and-fallbacks.md` chooses among Markdown, Mermaid and Image Gen, and it sends topology to Mermaid without exception.

## Success definition

- **Verification Design.** After Program Design, the Lead writes one Verification Design for the design project. It has one row per requirement, linked to its Specification obligations. Each row gives:
  - a "proven by" line the owner can read;
  - the reference;
  - the target and the `verify-<app>` journey that will observe it, or the journey still needed;
  - a passing condition that a wrong implementation fails;
  - any real-path test it reuses;
  - what stays unverified.

  Several rows may share one observation. A pure rule gets proportional proof, not an app launch. Planned target properties are never described as observed.
- **Used downstream.** Review follows each requirement through its obligation and seam to an observation. Planning admits only the four current documents and gives each slice its "proven by" checks. Handoffs carry the four-document basis, and the Verifier's commission carries the Verification Design. A missing strategy routes to `verification-design` through `verification-design-gap`.
- **Orchestration.** `orchestrator-design` keeps orientation, phase selection, integrated review and correction, and an honest design terminal. Rendering goes to its shared owner. The delivery tail is replaced by the existing continuation contract.
- **Rendering.** Each phase names what its reader must understand. `diagram-rendering-and-fallbacks.md` decides between Markdown alone and an HTML page with Markdown islands, and calls `presentation-html` to build and check the page. The Markdown file stays the truth.

## Decisions

The owner may strike any row. A struck row stays, with a dated row naming what replaces it.

| # | Decision | Source or rationale |
|---|---|---|
| D1 | Verification Design is one document per design project, beside Program Design, and the Lead writes it. | Owner, Oct 11 ("per project"); the map confirmed Oct 17 ("yes"). |
| D2 | **Who owns what:** <ul><li>Verification Design: the project's proof strategy and coverage per requirement.</li><li>`practices-verification`: feasibility, observation and honest reuse.</li><li>The Verifier with `practices-verification-maintenance`: journeys and apparatus.</li><li>`program-design`: seams.</li><li>`spec-design`: expected behavior, thresholds, target constraints and the reference.</li></ul> | The map confirmed Oct 17; Advisor A1. |
| D3 | The Verifier challenges the Verification Design with `practices-verification` before the build, builds missing journeys and observes at delivery. It never runs the authoring phase. The commission packet carries the Verification Design, because roles never name phases. | #139's roles; Advisor A1; the layer rule. |
| D4 | The Markdown file is the truth. The page includes it with `<ex-markdown src>` and adds views around it. An embedded copy is regenerated output, never edited. A governing fact found while drawing a view goes back to its source document. | Owner Oct 17 ("use markdown islands and html"); Demistify guide 1.2.0 (`packages/demistify/skill/SKILL.md:35–78` at 58a856f3); Advisor A4. |
| D5 | The page's proof records: its Demistify binding and release; which islands were live and which embedded; whether the embedded text matches its source, by text comparison or the guide's source view; and a separate check of what each view means. No hashes or provenance registry. | Advisor A4. |
| D6 | Program Design's first pass takes the Specification's observable obligations and proof constraints and exposes candidate observation seams. Verification Design returns `program-design-gap` when a seam can't decide a requirement, and the design isn't ready until that seam is repaired. | Advisor A2: modality selection now comes after Program Design. |
| D7 | `requirements-specification-program-design.md` is renamed to `design-documents.md`, with every caller updated in the same change and no stub left behind. | The name would no longer describe four documents; hard cutover. |
| D8 | `spec-program-review` keeps its name and gains a four-document mode. It gets no new review ceremony. | Advisor A3. |
| D9 | The mechanics-only path in `plan-improve-repo` stays. A missing Verification Design never turns design work into mechanics-only work. | Advisor A3. |
| D10 | `test-design` and a revival of the F6 five-document plan are out of scope. | Lead default; Advisor A3. |
| D11 | #128 is reference only. Every file is written fresh on main. | Owner, Oct 14. |
| D12 | Phases teach the decision and cite principles at the decisions they improve. A Zod `.ts` result exists only where a named consumer validates it, and there are no Markdown schemas. | Owner Oct 14: "actually is practices not some pendantic shit. and no markdown schema". |
| D13 | Opus Workers write, Sol reviews both the spec and the implementation, and no new tests or pressure tests are added. | Standing owner rules for skill work. |
| D14 | Two stacked PRs: the design side, then the consumers. | Lead call: review in two readable pieces that merge together. |
| D15 | `diagram-rendering-and-fallbacks.md` is the only rule for choosing a medium. Each phase keeps its view predicates, its required semantic fields and its UI-moment obligations, and drops its own medium mandate. On main those mandates are `spec-design/SKILL.md:234,306`, `program-design/SKILL.md:232–238,356,358`, `orchestrator-design/SKILL.md:46` and `spec-program-review/SKILL.md:230`. | Spec review RA1, 2026-10-17: two live medium rules would let an HTML view pass one rule and fail the other. |
| D16 | Verification Design has no standalone review mode. A revision to it alone is reviewed in the four-document mode, which replaces `three-artifact-design`. The `specification-only` and `program-only` modes stay. | Spec review, 2026-10-17: a standalone mode would need its own admission design, and D8 adds no review ceremony. |
| D17 | Each Verification Design row marks its journey **lasting** or **temporary**. A lasting journey (the outcome will be checked again: a user-facing behavior that can regress, a release check, something other projects touch) becomes a **repo script**, in the project's own scripts location and **self-describing**: its header and `--help` say what it proves, its inputs and how to run it, so an agent can use it cold. The project's `verify-<app>` skill holds no copy of the script. It tells an agent which script proves which journey, and when and why to run it, the way a trigger does. A temporary journey is a probe in the task's scratch beside its evidence, deleted once the evidence is kept. The Verifier may promote a temporary probe to lasting after it runs, and reports the promotion to the Lead. The Lead commissions a lasting `needed:` journey as verification-skill work before observing. A probe no row covers is reported to the Lead, never promoted or deleted silently. Evidence may be presented as a presentation-html page. Run 14 owns this, as a third stacked PR. | Owner, 2026-10-17: "the verification phase should decide if a verification script will be temporary or something useful going forward and properly put them in scripts with docs to easily find them going forward"; "verification is skills and scripts in a repo right"; answers: "1. repo scripts, the skills tell you how to use it and when and why as triggers"; "2. i meant its self describing code that helps agent use it"; "3. yes" (the Verifier may promote); "we can use our new presentation skills with demistify and html to help with proofs". |

## Descriptions

| Skill | Description |
|---|---|
| `verification-design` (new) | "Use when planning how a design project's requirements will be proven: for each requirement, the reference, the target and `verify-<app>` journey, a passing condition a wrong build fails, reused real-path tests and what stays unverified, after Program Design or when that plan is missing or stale. Not for observing or challenging a delivered claim (practices-verification), building journeys (practices-verification-maintenance), or regression tests." |
| `orchestrator-design` | "Use when a user asks to run, resume, or finish one design cycle before planning: Requirements, Specification, Program Design, Verification Design, and their independent review. Not for a direct design phase, implementation delivery, or PR work." |
| `spec-program-review` | "Use when independently reviewing a Specification, Program Design, or the four-document design set (Requirements, Specification, Program Design, Verification Design), including reader understanding or readability, or deciding if a spec-only or program-only change needs review. Not for implementation review." |
| `plan-implementation` | "Use when writing or revising a repository-grounded implementation plan from a reviewed four-document design (Requirements, Specification, Program Design, Verification Design), an admitted improvement finding, or a direct planning request. Not for audit-only discovery (plan-improve-repo)." |
| `spec-design`, `program-design`, `plan-improve-repo`, `spec-handoff`, `plan-handoff`, `orchestrator-implementation-goal` | Unchanged. None of them names the three-document basis or proof planning. |

## Surface allocation

| Run | Trigger | Main path | Depth | Proof |
|---|---|---|---|---|
| 1 | the new description in Descriptions | start from requirements and obligations; inspect existing `verify-<app>` coverage and Program Design seams; choose cases and reuse; write passing conditions and limits; return seam gaps | the modality teaching moved from `proof-obligations.md`, with worked rows | structural |
| 2 | — | the document-medium decision and its call to `presentation-html`; native HTML views count where they preserve the relationships | the page-proof record (D5) | structural |
| 3 | — | — | the four-document contract and its identities | caller check |
| 4 | — | — | the `verification-design-gap` row | caller check |
| 5 | unchanged | modality selection removed; the views name what the reader must understand; the medium mandate goes to run 2 (D15) | `proof-obligations.md` removed | structural |
| 6 | unchanged | continuation points to Verification Design; the medium clauses go to run 2 (D15) | the input list (D6) | structural |
| 7 | new description | a short spine with a routing table; the delivery tail replaced; the medium check goes to run 2 (D15) | — | structural |
| 8 | new description | the integrated walk: requirement, obligation, seam, observation; the medium blocker goes to run 2 (D15) | a reviewing reference for Verification Design | structural |
| 9 | new description | admission updated | — | structural |
| 10–11 | unchanged | admission and carriers updated | — | structural |
| 12 | — | the token row | — | structural |
| 13 | — | — | the packet field | the existing schema tests |

## Authoring basis and proof

- Basis: **user-directed intent** (the Oct 11, 14 and 17 quotes above). Every run is **behavior-changing**.
- Proof is structural only:
  - `claude plugin validate .`;
  - every `MUST load` or `IF …, load` path resolves;
  - `git grep` finds no three-document wording left outside `retired-skills/`;
  - the existing `tests/skills` schema tests pass for run 13.
- Teaching effect is a named gap (D13).

## Coordination

- Base: `origin/main` `13e45138`, sunstack-dev 2.85.1. Branches `skills/verification-design` (PR A) and `skills/verification-design-consumers` (PR B), with `gh stack`, in their own Agent Studio worktree.
- Version 2.86.0, with one changelog entry of 20 lines or fewer, plus its README index line.
- Devfiles skill-index row for `verification-design-gap`: drafted in chat. It's committed only with the owner's approval.

## Non-goals

`test-design`; F6's plan-home and schema decisions; a rewrite of Program Design's realization table or entity binding; a review rename; a new Verifier report schema; new tests or evals; migrating existing design pages.

## Run status

| Run | Status |
|---|---|
| 1–13 | reviewed: implementation review `great` at `4f7e27a7` after T1 (fix `32929ff8`). PRs #143 (runs 1–6) and #144 (runs 7–13, 2.86.0) are open as stack #145. Not shipped until merged. |

## Review record

- 2026-10-17 Advisor second look (A1–A4): all four accepted. A1 → D2, D3 and run 1's main path. A2 → D6 and run 6. A3 → runs 7–12, D8 and D9. A4 → D4, D5 and run 2.
- 2026-10-17 spec review at `b34c6424` (review lead codex-local 01a149c2): `targeted-revision`, `revise-first`. RA1 (two medium rules) accepted → D15 and runs 5–8. G1 (descriptions missing) → the Descriptions section. Returned to the same review lead to verify the corrected anchors and finish trigger-routing. Follow-up at `3f8f6fa4`: RA1 verified closed. The new `spec-program-review` description promised a standalone Verification Design review, so it was narrowed (D16).
- 2026-10-17 implementation review (review lead codex-local 01a149f4, three Sol xhigh reviewers, nine checks): `targeted-revision` at `59c894ba`, accepting T1 (the gap example treated waiting as a missing seam) and rejecting RA-F1 (a fixture label inconsistency with no consumer) as non-blocking. T1 was fixed at `32929ff8`; verdict `great` at `4f7e27a7`.
