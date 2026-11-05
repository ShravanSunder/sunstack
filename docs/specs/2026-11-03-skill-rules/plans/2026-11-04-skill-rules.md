# Plan: skill rules and the owner-assessment engine feature

## Canonical record

```text
plan path: docs/specs/2026-11-03-skill-rules/plans/2026-11-04-skill-rules.md
originating planner: plan-implementation
supersedes: none
planning result: ready
governing planning basis:
  kind: reviewed-four-document-design
  set 1 (ai-tools, skills/rules-as-nudges at 47b3a025):
    Requirements docs/specs/2026-11-03-skill-rules/requirements/index.md (+ five chunks)
    Specification docs/specs/2026-11-03-skill-rules/specification/index.md (+ entities, five chunks)
    Program Design docs/specs/2026-11-03-skill-rules/program-design.md
    Verification Design docs/specs/2026-11-03-skill-rules/verification-design.md
    review: tmp/2026-11-03-skill-rules-review/report.md … report-round-6.md (converged: 8→2→0, then 6→1→0)
  set 2 (sunstack-tools, feat/owner-assessment at 9116442):
    docs/specs/2026-11-04-owner-assessment/{requirements,specification,program-design,verification-design}.md
    review: tmp/design-workflows/2026-11-04-owner-assessment/review/report.md … report-round-4.md (converged: 10→3→2→0)
  current applicability anchors: ai-tools 47b3a025; sunstack-tools 9116442 (base origin/main 4aa594a, engine 0.6.0)
delivery context:
  requested terminal: plan-only
  delivery grouping: single:engine-then-rules
  PR topology: one-pr per repository (sunstack-tools PR from feat/owner-assessment; ai-tools PR #188)
  repositories: ShravanSunder/sunstack-tools, ShravanSunder/sunstack (ai-tools)
```

Planned at: ai-tools `skills/rules-as-nudges` `47b3a025`; sunstack-tools `feat/owner-assessment` `9116442`. Tracking: none.

## Goal and scope

Build what the two reviewed designs specify: the engine asks each skill's kind once and every rule's gate reads it (sunstack-tools, released as 0.7.0); in ai-tools, every rule starts from a real mistake, judges only its kinds, reads its standard's text, passes real case floors before it nudges, and gives a complete nudge; the review skill is proven by two evals; the skills that teach rules are updated.

**Not in scope** (from the designs): other behavior scenarios beyond the two evals; the engine's existing skill-aware target loader (owner decision 9); per-assessment models (decision 8); a `completion.criterion` rethink (logged follow-up); moving product content out of general skills (parked).

**Owner input that could add a slice:** the mental-model check's A (rules that check a skill tells agents to run the rules, prove checks for real, use the role it was given). If the owner says yes, `plan-update` adds that slice with its own real cases; nothing below depends on it.

## Orchestration across the two repositories

| Order | Repository and PR | Waits on | Gate owner |
| --- | --- | --- | --- |
| 1 | sunstack-tools PR (feat/owner-assessment): slices E1–E5, release 0.7.0 | nothing | the Lead (engine release authority, owner 30 Oct) |
| 2 | ai-tools PR #188: slices A1, A2, A5, A6 (no kind gates) | nothing; may run beside order 1 | Implementer |
| 3 | ai-tools PR #188: slices A3, A4, A7, A8 (kind gates, real cases, skills, tree run) | the 0.7.0 release pinned in `tests/skills` | Implementer; the owner for disputed labels |

Only end to end: the line-17 nudge with its kind gate (V6 with V13/V14) passes only after the engine release is pinned in ai-tools. The owner merges ai-tools; the Lead merges and releases the engine after its gates.

## Current evidence

- Engine map: `sunstack-tools.feat-owner-assessment/tmp/design-workflows/2026-11-04-owner-assessment/current-system.md` (109 anchors at 4aa594a).
- ai-tools runner: `tests/skills/lib/skill-rules/` (report, expectation run, pinned source, denominators), `tests/skills/scripts/run-skill-rules.ts`, `run-rule-expectations.ts`; rules in `plugins/skill-authoring/skills/domain-skill-crafting/rules/` (18 entries today, six rulebooks, `*.expect.json` with 245 expectations).
- Eval harness: `tests/skills/evals/skill-pressure.eval.ts` and `lib/skill-pressure-evaluation/` (the ACPX subject runner forces read-only at `acpx-codex-agent-runner.ts:179`; permission modes at 200–202).
- Real cases: `~/dev/memory-logs/skills/authoring/2026-11-03-rule-case-mining/` (124 cases, blind labels for five rules: 69/70 agreed, TO09 settled quiet by the owner).
- Proof layers: ai-tools `tests/skills/README.md` (unit beside modules; integration and e2e under `tests/`); sunstack-tools colocated `*_test.rs`, `tests/integration`, `sunstack/tests/e2e`.

## Slices

Each slice lists its reads (the Implementer's required reads), writes, the Verification Design rows it earns with the command, its focused proof with the wrong behavior it must fail on and the oracle, and when to stop.

### E1 · Engine config and admission (contract; consumer E2)

- **Reads:** engine Specification E1–E5, R6; Program Design "Where each entity lives", "Interfaces: Admission"; current-system map Q1–Q2.
- **Writes:** `sunstack-lint/src/configuration_loading/config_contracts.rs` (owners, assessments), `config_validation.rs`; `sunstack-rules/src/rulebook_planning/rulebook_entry_wire.rs` (`requires`), `rulebook_admission.rs` (registry input), `rule_definitions/strict_decoding.rs` (safe fields); new `owner_assessment/assessment_plan.rs`.
- **Earns:** engine V6 (OC) by `cargo nextest run -p sunstack-rules -p sunstack-lint` plus `sunstack lint --check` on each refusal fixture.
- **Focused proof:** each R6 refusal with its field path; wrong behavior: a root with `**` or two captures, an unknown assessment or option, accepted silently. Oracle: engine R6.
- **Existing tests:** keep all admission tests; add cases beside them.
- **Stop:** an admission need that changes `AdmissionRefusal`'s shape.

### E2 · Owner units and context files (vertical)

- **Reads:** engine R2; Program Design "Interfaces: Units, Build"; map Q3, Q6.
- **Writes:** new `sunstack-lint/src/lint_execution/owner_units.rs`; `lint_run.rs` (context inputs, change dependencies at change selection and final picking); `evidence_piece_picking.rs`.
- **Earns:** engine V2 (OA, OB) by `cargo nextest run -p sunstack-lint` integration targets.
- **Focused proof:** a member-only run reads the describing file; a describing-file change selects members, including a selected-kind member that must reach the selection question. Wrong behavior: the dependency added only at final picking. Oracle: engine R2.
- **Stop:** the context catalog cannot stay apart from rule-picked pieces without changing `EvidenceBuild`'s public shape.

### E3 · Assessment stage, gate, reasons and skips (vertical)

- **Reads:** engine R1, R3, R4, R5; Program Design "Interfaces: Assessment stage, Gate", `NotApplicableReason`; map Q3–Q4.
- **Writes:** new `sunstack-rules/src/owner_assessment/assessment_run.rs`; `rulebook_planning/rulebook_run.rs` (`gate_for` before the first walk; skip collector keyed by rule, file, assessment); `decision_walking.rs` (`NotApplicableReason`, `basis()` exception only).
- **Earns:** engine V1, V3, V4, V5 (OA) by `cargo nextest run -p sunstack-rules` (integration `owner_assessment.rs` with `ControlledServer`).
- **Focused proof:** one question per unit and assessment (two runs in one process ask twice); outside `accept` → not_applicable, basis judged, no walk (test-only walk counter); selected option {A: 0.3, B: 0.7} at 0.7 is unsure, exactly 0.7 is judged; one skip per rule and file. Wrong behaviors: per-piece questions, cached answers, walk-then-discard, B substituted. Oracle: engine R1, R3, R4 and E3.
- **Existing tests:** keep `decision_walking_test`; add the ungated choice→not_applicable basis case (must stay judged).
- **Stop:** the dispatcher needs a second backend (contradicts decision 8).

### E4 · Report, status, schema and activation (vertical)

- **Reads:** engine R1, R4; Program Design "Interfaces: Report, Model activation"; map Q5.
- **Writes:** `sunstack-lint/src/lint_reporting/report_contracts.rs`, `outcome.rs`, `formats.rs`; `lint_run.rs` `model_work`.
- **Earns:** engine V4 (OB process journey: unsure → exit 5, failed assessment → exit 3), activation row (mechanical-only gated rulebook prepares the backend; no key refuses before acquisition) by `cargo nextest run -p sunstack` e2e.
- **Focused proof:** status precedence; schema regenerated and validated by the existing schema test. Wrong behavior: unsure run exiting 0. Oracle: engine R4.
- **Existing tests:** keep `schema_limits_usage`; repair its expected schema.

### E5 · Verify journey, changelog, release 0.7.0 (integration)

- **Reads:** engine Verification Design OD, OE; `.agents/skills/verify-sunstack-rule/`.
- **Writes:** `scripts/verify/sunstack-rule/rulebook/rulebook-lint.ts` (an `owner-assessment` case), CHANGELOG, version 0.7.0.
- **Earns:** engine V5 (existing journeys unchanged with units declared), V7 (OE: no skill word added) by the verify-sunstack-rule journey on the release candidate and a diff read.
- **Gate:** clippy, fmt, nextest, signing (Developer ID per the release rule); the engine PR merged; release published. The Lead accepts.

### A1 · Case files, receipts, rule state, nudge rendering (contract; consumers A2–A8)

- **Reads:** Specification R1, R2, R6, R8, R9, R18–R21, E7–E10; Program Design "The rule record and the case record", "The case-run receipt", "The derived rule state", "The nudge, as the agent reads it", "Gaps"; migration map.
- **Writes:** `tests/skills/lib/skill-rules/` new `cases.ts` (schema), `case-run-receipt.ts`, `rule-state.ts`; `report.ts` (`formatLintReport` parts, `ReportGaps`, held filter); `expectation-run.ts` → case run writing receipts; migration script `scripts/migrate-expectations-to-cases.ts`; every `*.expect.json` → `*.cases.json` (hard cutover, name map, retired cases, `legacy_independent`).
- **Earns:** U3·R8 (OD part), U17·R18/R19 (OD, OG), U18·R20 (OD), U19·R21 (OD migration comparison) by `pnpm --dir tests/skills test` and `pnpm --dir tests/skills typecheck`.
- **Focused proof:** every old expectation compared with its migrated case (a description case with no selector; a section case whose finding line differs from its first line; a Sol-settled case kept `legacy_independent`); every `HeldReason`; a fingerprint change after a passing run holds the rule (OG); a starting bar holds; a dropped rule's case never runs. Oracle: Program Design shapes and R18–R21.
- **Existing tests:** `expectations.test.ts`, `expectation-scoring.test.ts`, `current-accounts.test.ts` → repair onto `cases.json`; `report.test.ts` → repair (new parts and gaps); `pinned-source.test.ts`, `source-repositories.test.ts` → keep.

### A2 · Rule files: renames, drops, evidence fixes (vertical)

- **Reads:** Requirements U10 (rule table), U22; Specification R2, R22–R24; Program Design "The rules after this change".
- **Writes:** the six `*.rules.json` and their standards' markers (12 renames; six entries and markers removed); `skill-rules.config.json` (`branch` block field; `section` table rows); `evidence/rules/*.yml` as needed.
- **Earns:** U10·R2 (OA list matches U10), U22·R24 (branch repair cases), U20·R22 (OE declarations) by `pnpm --dir tests/skills rules:expect` (keyed, through the key wrapper) and `rules --check`.
- **Focused proof:** the dropped rules give no result; a colon-ended `IF` with its block passes; a real `IF` naming nothing fires. Oracle: U10, R24.
- **Stop:** an evidence change the engine refuses (route to an engine gap, not a workaround).

### A5 · Runner tests on real pinned skills (repair; decision 5)

- **Reads:** Requirements open meaning 3 (settled); Specification R21; Verification Design OF, OG.
- **Writes:** `tests/skills/lib/skill-rules/tests/*.test.ts`; remove `tests/skills/fixtures/run-skill-rules/sample/` and `completion/` once each test reads Git-pinned real skills through `pinned-source.ts`; keep `cancel-engine.ts` (an engine stand-in for cancellation, not skill text).
- **Earns:** U4·R9 and U14·R15 forced-boundary runs (OF: controlled provider on pinned real skills; uncertain → 5, incomplete, cancelled, invalid; unsure owner skipped and listed — the owner-assessment part after A3) by `pnpm --dir tests/skills test`.
- **Existing tests:** `run-skill-rules.test.ts`, `skill-rules-kit-selection.test.ts`, `skill-rules-mechanical-edges.test.ts`, `skill-rules-report-gaps.test.ts` → repair (real pinned skills, new names); `skill-rules-cancellation.test.ts` → keep; `skill-rules-severity-policy.test.ts` → keep (reads delivered rule files). Removing the sample fixtures is proven by a dead contract: no test reads them after the repairs (grep shows no reference).

### A6 · Review-skill evals (vertical)

- **Reads:** Requirements U12; Specification R3, E14; Program Design "The two evals"; Verification Design U12 row.
- **Writes:** `tests/skills/evals/review-skill.eval.ts`, `evals/review-skill/{cases/187-line-17,cases/166-storage-rule}/case.json`, `prepare-review-workspace.ts`, `run-review-subject.ts`, `rule-run-evidence.ts`, `build-grade-packet.ts`, `grading/review-grade.{md,rules.json,config.json}`; `acpx-codex-agent-runner.ts` and `runtime-configuration` (`agentMode`, `permissionMode: approve-all`, defaults unchanged); `package.json` script `evals:review`.
- **Earns:** U12·R3 by `pnpm --dir tests/skills evals:review` (first one real subject run on #187 showing the rules reaching Jev and `review.md` inside the worktree; then both cases; controls: a persuasive review with no rules run fails, a wrong rule or line fails, zero cases fails).
- **Focused proof:** unit tests beside each new module with recorded events and recorded judge outputs (no model). Wrong behavior: a review that only claims the rules ran passes. Oracle: R3 and the case's `expected`.
- **Existing tests:** `acpx-codex-agent-runner.test.ts` → repair (new options keep defaults); pressure tests → keep.
- **Stop:** the sandbox blocks the OS-store key or the network so the rules can't reach Jev (an environment gap; report incomplete, return to the Lead).

### A3 · Kind gates and the general-skill family (vertical; needs E5)

- **Reads:** Requirements U13–U16; Specification R13–R17; Program Design rules table, "The engine feature" contract.
- **Writes:** `tests/skills/package.json` engine pin to 0.7.0; `skill-rules.config.json` `owners.skill` and `assessments.work_scope`; `requires` on the three `general-skill.*` entries; the description and taught-rule checks in their rulebooks.
- **Earns:** U13·R13/R14 and U15·R16 (OB part), U14·R15 (OF owner-assessment part, with A5's harness) by `pnpm --dir tests/skills rules` and `pnpm --dir tests/skills test`.
- **Focused proof:** no `general-skill.*` result on the AgentStudio skill, Peekaboo or a tool manual; description rules on hidden skills. Wrong behavior: a general-skill nudge on a product skill. Oracle: R14, R17.

### A4 · Real cases, labels, bars, receipts (vertical; needs A1–A3)

- **Reads:** Specification R17–R21; the case mining set; the blind labels.
- **Writes:** the mined cases into each `*.cases.json` (active, labelled `agents_agreed` or `owner_decided`), held-back groups frozen first (`frozen` commit before any bar is recorded); blind labels for the general-skill family's cases (two Luna labellers, disputes to the owner); tuned bars with their cases; committed `*.case-run.json` receipts.
- **Earns:** U9·R1, U16·R17, U17·R18/R19, U18·R20, U19·R21, U22·R24, U8·R4 by `pnpm --dir tests/skills rules:expect` (keyed).
- **Focused proof:** each nudging judged rule meets 3/3/3 plus held-back, with a complete matching receipt; rules short of the floor stay held. Oracle: the labels and R18.
- **Stop:** an owner-disputed label blocks a floor (the rule stays held; continue the rest).

### A7 · Teaching skills (vertical, skill work)

- **Reads:** Requirements U7, U6, U5; Specification R10–R12; Program Design "The skills that teach it".
- **Writes:** `skill-rules`, `domain-decision-models`, `decision-model-review`, `skill-creation`, `skill-review`, `skill-design`, `domain-skill-crafting`, `skill-orchestrator`, `skill-audit` (each through `skill-authoring` skill-creation for writing; Opus writes skill text per the owner's rule); `tests/skills/evals/behavior-candidates.json` (E11 list).
- **Earns:** U5·R10, U6·R11, U7·R12, U12·R3 (behavior list part) by source read (OE) and the A8 tree run over the changed skills.
- **Focused proof:** each skill has a worked example (#187's line 17 among them) and a checkable completion; no skill reads a pass as meeting the standard. Oracle: R10–R12.

### A8 · Tree run, kind census, line-17 anchor (integration; needs A3–A7)

- **Reads:** Verification Design OB, OC, the U1, U3, U13, U21 rows.
- **Writes:** none in product code; census labels under `~/dev/memory-logs/skills/authoring/` (owner decides disputes).
- **Earns:** U1·R6 (line 17 every part, a second nudge, a quiet control), U3·R8 (OB part), U4·R9 (warn-only exit), U13·R13/R14 (OC: judged kinds equal blind labels on every skill; two runs agree), U21·R23 (lines 17 and 40 read) by `pnpm --dir tests/skills rules` twice at the PR head and the census comparison.
- **Gate:** before PR readiness; then `implementation-review` and `implementation-pr-wrapup`; changelog and plugin version bumps for user-visible skill changes.

## Dependency edges

- requires E1 → E2 → E3 → E4 → E5
- requires A1 → A2; A1 → A4; A1 → A5
- requires E5 → A3 (engine release pinned)
- requires A2, A3 → A4
- requires A4, A6, A7 → A8
- serial A2 <-> A3 (same rule files)
- parallel E1–E5 || A1, A2, A5, A6 (advisory)

Batch boundaries: after E5 (the Lead's release acceptance before A3); after A6's first real subject run (the eval environment must be shown to work before both cases run).

## Proof map (every Verification Design row)

| Row | Slice | Command |
| --- | --- | --- |
| U9 · R1 | A4 | `rules:expect`; source read of reasons |
| U10 · R2 | A2 (A8 confirms) | `rules:expect`; `rules` |
| U12 · R3 | A6 (A7 for the list) | `evals:review` |
| U8 · R4 | A4 | `rules:expect` |
| U11 · R5 | E5 | engine diff read |
| U1 · R6 | A8 | `rules` at PR head |
| U2 · R7 | A7 | source read of routes |
| U3 · R8 | A1 (OD), A8 (OB) | `test`; `rules` |
| U4 · R9 | A5 (OF), A8 (OB) | `test`; `rules` |
| U5 · R10 | A7 | source read |
| U6 · R11 | A7 | source read |
| U7 · R12 | A7 | source read |
| U13 · R13, R14 | A3, A8 (OC) | `rules` twice; census |
| U14 · R15 | A5 + A3 (OF) | `test` |
| U15 · R16 | A3 | `rules` |
| U16 · R17 | A4 | `rules:expect` |
| U17 · R18, R19 | A1 (OD, OG), A4 (OA) | `test`; `rules:expect` |
| U18 · R20 | A1 (OD), A4 (OA) | `test`; `rules:expect` |
| U19 · R21 | A1 (OD), A4 (OA) | `test`; `rules:expect` |
| U20 · R22 | A2 (OE), A8 (OB) | source read; `rules` |
| U21 · R23 | A8 | `rules` with a per-section count |
| U22 · R24 | A2, A4 | `rules:expect` |
| engine V1–V7 | E1–E5 | `cargo nextest`, `sunstack lint --check`, verify-sunstack-rule journey, diff read |

Keyed runs (`rules:expect`, `rules`, `evals:review`) use Jev through the existing key wrapper; no key in commands, logs or the PR.

## Risks and false-green traps

- A migration that compares only counts: A1 compares every entry.
- A rule nudging on an old passing run: receipts are fingerprinted (A1); OG proves it.
- An eval passing on a self-reported rule run: A6's proof comes from recorded commands.
- The old review skill tested instead of the delivered one: the workspace is the PR head.
- The engine pin left at 0.6.0 while gates are declared: A3 fails admission rather than passing silently.
- PR #188's size: one PR by default; if it is too big to review in one pass, a split goes to the owner as a decision at plan review.

## Stop and replan

- Any owner answer to A (adds a slice through `plan-update`).
- A design gap found while building returns to its design owner (`specification-gap` / `program-design-gap`), then `plan-update`.
- An engine gap found from ai-tools is fixed in the engine and released, never worked around.
