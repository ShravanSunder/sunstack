# Skill spec: the principles layer (step 1)

Multi-run skill spec, written by the 🦁 design-skills Lead (claude-local `67681626…`), 2026-10-12. Each run names one `principle-*` skill. The cards are now the skills under `plugins/shravan-dev-workflow/skills/principle-*/`, and the index is `plugins/shravan-dev-workflow/docs/principles-index.md` (D22); the draft files they came from were removed once implemented.

## Targets and owner plugin

Owner plugin: `shravan-dev-workflow`. Classification: `create`, behavior-changing, `user-directed intent`.

| Run | Wave | Skill | Also lands in this run |
| --- | --- | --- | --- |
| 1 | 1 | `principle-design-for-failure` | the family surfaces: the index (a plugin doc, D22), README namespace row, repo AGENTS.md lines (D9), version, manifests, changelog |
| 2 | 1 | `principle-build-the-shared-model-first` | |
| 3 | 1 | `principle-separate-the-concerns` | |
| 4 | 1 | `principle-tests-are-executable-claims` | |
| 5–17 | 2 | the other 13, named in the index draft | |

Wave 2 was to start after the wave-1 behavior check. With that check deferred (D19), all 17 runs are implemented in one pass and the family ships as one PR (D13); the waves remain only as the spec-review grouping (wave-1 text reviewed here, wave-2 text at implementation review).

## Problem and evidence

- **The owner's goal** (2026-10-11, recorded in the design record): skills should teach how a good engineer thinks, with bookkeeping a small share of the text. Today, engineering judgment lives inside long phase skills and their references, mixed with process bookkeeping, and the owner cannot call one judgment on its own.
- **The agreed model** (owner, 2026-10-12): three layers. L1 `principle-*` composed how-to-build blocks; L2 phase skills use them at their own altitude; L3 orchestrators force them at named points. `practices-*` and `discuss-*` stay what the owner runs. Step 1 builds only L1.
- **Grounding.** The 17 principles come from a find, group, and map process over 1,966 atoms from three tiers (the owner's skills and instructions, admired skills, session-log extractions), snapshot `atoms-all.jsonl` sha `8e5a2561f24b`. The full map test placed 1,934 of 1,966 atoms (98.37%); the 32 residuals are 27 domain practices (UI/UX, performance: later domain packs), 2 working practices, and 3 noise. Every one of the owner's 15 strongest habits lands in a principle. Design record: `docs/wip/skills-authoring/2026-10-11-design-skills-first-tranche/redesign/practices-tree.md` in the `docs/sdlc-learning-coverage` worktree (uncommitted, local); private corpus under `~/dev/memory-logs/skills/lessons/2026-10-11-owner-engineering-practices-tree/`.
- **Card shape evidence.** A written-design ablation of card 11 (no card vs short TOP vs TOP plus depth; VM-provisioning fixture; Luna high ×3 and Sol medium ×2; blind scorers): TOP lifted author scores by +2.0 (Luna) and +2.5 (Sol) of 7; the long depth added +1.33 (Luna) and 0 (Sol), under the +1.5 threshold; critic scores were at ceiling. One fixture; it supports a compact top on that fixture, not the shape for every card. Results: `tmp/design-skills-lead/experiments/ablation-card-11-results.md` in the same worktree.
- **Prior art.** pstack (`cursor-plugins/pstack`, read in the admired-source checkout): 23 `principle-*` leaves averaging about 256 words, `disable-model-invocation: true`, "Apply when … <rule>" descriptions, an index skill, playbooks that name a principle at a step, and the accountability rule "name each principle and the decision it changed". Adapted, not copied.

## Success definition

When the owner (and, after step 2, a phase or orchestrator) calls a principle by name, the agent applies that one judgment to the work in front of it: it makes, changes, rules out, or confirms a concrete decision it would otherwise get wrong or leave implicit, names that decision, and does not add the principle's machinery where the card's overkill line says it isn't needed. No principle loads on its own.

Observable in the wave-1 check: with the card, authors satisfy more of the card's obligations than without it, by the predeclared threshold, and the good-design controls get no more flags or machinery than without it.

## Numbering and terms

- **Card N** (1–17) is the principle's number in the index order and the D18 table: 1 hold the scope … 17 refine mental models. **Run N** is implementation order (Run status table). They differ: run 3 is card 9. Decisions that say "card 3" or "card 17" mean the card number.
- In D14, the chunk-card terms map to card sections: trigger → Apply when; countercase → Distinct from; case → Worked case; overkill → Overkill. No other sections are added.

## Decisions

The owner may strike any row. Rows marked *owner* are the owner's decisions; the rest are the Lead's defaults.

| ID | Decision | Rationale |
| --- | --- | --- |
| D1 | `principle-*` is the bottom layer. A principle names only sibling principles, never a practice, phase, orchestrator, or tool manual. *owner* | Owner, 2026-10-12. Keeps principles composable by every layer above without cycles. |
| D2 | User-invocable only. Claude: `disable-model-invocation: true` in `SKILL.md`. Codex: `policy.allow_implicit_invocation: false` in `agents/openai.yaml`. *owner (callable, not auto); encoding: Lead* | Owner-callable, not auto-triggered. Avoids 17 descriptions in every context. pstack ships the same key in shared `SKILL.md`. Known exception: the Codex `skill-creator` quick validator allows only `name`, `description`, `license`, `allowed-tools`, `metadata`, so it will flag the key. The Codex runtime parser ignores unknown keys: confirmed by the Codex Lead in a local `openai/codex` checkout at `7f01a84e` (`codex-rs/skills/src/parser.rs` ignores unmodeled keys, covered by `parser_tests.rs`; the loader reads `policy` from `agents/openai.yaml` separately, and a host test asserts the loaded field is `false`). The behavior that `false` hides the skill from implicit invocation while explicit invocation still works comes from Codex's official docs, not from those tests. Release readback confirms the skills load and stay out of the implicit list on both clients. |
| D3 | `agents/openai.yaml`: `interface.display_name` "Principle: <Title>", a short description, `default_prompt` "Use $<name> to …", and `policy.allow_implicit_invocation: false`. | Matches the plugin's existing yaml shape plus the Codex policy field. |
| D4 | Description: "Use when <observable trigger>. <the rule in one clause>." | Repo convention starts with "Use when". For a user-invocable skill the human is the index, so the rule clause helps them pick the right card (pstack lesson). It names a judgment, not a workflow. |
| D5 | One `SKILL.md`, no references. TOP: Apply when, Rule, Why, The test (2–3 questions), Distinct from, Applied means (about 250–300 words). Then Worked case and Overkill (about 150 words). | Ablation: the short top carries the gain; depth stays short and inline because 150 words do not justify a reference. "Applied means" carries the accountability rule. |
| D6 | No provenance or source ids in `SKILL.md`. Sources live in this spec. | Deletion test: source lists change no behavior. Keeps private evidence out of the public runtime text. |
| D7 | The index is a shared reference, `shared-references/principles-index.md`, linked from the README. *agreed scope v2* | It is the family map that step 2's phases and step 3's orchestrators will load. In step 1 its only reader is the owner via the README; the alternative is a maintainer doc until step 2, then a move. |
| D8 | No stored pressure scenarios; `test:evals` is not run. | Owner decision 2026-10-09 (`docs/changelog/2026-10-09-remove-pressure-scenarios.md`): stored scenarios were removed while pressure testing is redesigned. The repo AGENTS.md line asking for scenarios predates it. Each card's discriminating scenario and control live in the behavior check instead. |
| D9 | Repo `AGENTS.md`: one sentence in "Skill layers" adding the principle layer, and one family row in "Current Plugin Skills". *owner (one line); second line: Lead* | The owner approved one line. The table says it enumerates "exactly" the runtime surface, so a family row keeps that claim true. No change to the owner's global instructions. |
| D10 | Version 2.72.1 → 2.74.0 across the three plugin manifests and the Claude and Cursor marketplace entries. | Draft PR #122 already claims 2.73.0 on its branch; distinct content gets a distinct cache key. Whichever PR merges second re-bumps. |
| D11 | Card 3 stays `principle-say-what-it-means`. *owner* | "Names as proposed." The Advisor's rename default (`principle-model-the-domain`) is put to the owner once, when card 3 is written. |
| D12 | Worked cases are public-safe, generic cases modeled on private source cases. | The repository is public; source case ids stay in this spec. |
| D13 | Branch `skills/principles-layer` from main; one PR after wave 2. | The principles do not depend on PR #122. Wave 1 is a proof checkpoint, not a release. |
| D14 | Wave-2 content basis: each card's index row (when, rule, distinct from) plus its chunk-card trigger, overkill, countercase, and case, in the wave-1 shape. | Their text gets implementation review; the shape is settled by wave 1. |
| D15 | Each behavior fixture uses a different domain from its card's worked case. | Near-transfer guard from the card-11 amendment (payment case vs VM-provisioning fixture). |
| D16 | pstack's "build the lever / encode lessons in structure" goes into card 17's depth, not an 18th principle. | Advisor default, revisit after wave 1. |
| D17 | A static contract test, `tests/skills/lib/principle-layer-contract.test.ts`: every `principle-*` skill has `disable-model-invocation: true`, an `agents/openai.yaml` with `allow_implicit_invocation: false`, names no non-principle skill, appears in the index, and the index names no missing skill. | D1 and D2 are deterministic rules, so code checks them (gate kind: deterministic). Fits the repo's existing contract tests. |
| D18 | 2026-10-12, supersedes D11 and the v4 names: every principle is named from the owner's own phrases (table below). *owner* | Owner direction: name the principles from the owner's own way of working and thinking. Names the owner already says are names the owner can call without a lookup. Card 3 is `principle-domain-meaning-first` (P-0014: define the domain meaning before choosing structure); pstack's `model-the-domain` is about structures, which card 8 owns. |
| D19 | 2026-10-12, supersedes the wave-1 behavior check in the proof plan: no behavior runs in step 1. Proof posture: drafted from user intent; behavior not yet evaluated. *owner* | Owner direction: no pressure tests for now, and move toward a PR. The planned protocol and the Codex Lead's prepared fixtures (`/private/tmp/2026-10-principles-wave1-prep-codex-01a118ee/`, unfrozen) stay available for when the owner resumes behavior testing. The PR and changelog name the behavior as unverified. This is the explicit deferred-proof disposition for all 17 runs (spec-review candidate P1). |
| D20 | 2026-10-12: the remaining spec review (the structure checks) is skipped; all 17 runs are implemented now. *owner* | Owner direction: start writing the principles now, skipping the structure half rather than waiting. The teaching checks had run and their findings were fixed (T1, T2) or closed by D19 (P1). The structure reviewer's candidates carry into the implementation review. |
| D21 | 2026-10-12, supersedes D17 and the test lines of the proof plan: this change adds and runs no automated tests and no pressure tests. *owner* | Owner direction: no automated tests or pressure tests. The D17 rules (invocation encodings, sibling-only naming, index matches the skills) were checked once by a throwaway script at implementation; no test file was added. |
| D22 | 2026-10-12, supersedes D7's home: the index lives at `plugins/shravan-dev-workflow/docs/principles-index.md` until a skill loads it; step 2 moves it to `shared-references/` with its first callers. *owner* | Owner direction after the skill-creation audit: follow the shared-reference rule (a shared reference serves two or more active skills; every reference has a caller). The README, AGENTS.md, and changelog link the doc. |
| D23 | 2026-10-12, supersedes the D18 names (D18's table stays as history): final names, verb-led, chosen by the owner with the Advisor and aligned with the Codex Lead: 1 `principle-hold-the-scope`, 2 `principle-build-the-shared-model-first`, 3 `principle-define-the-domain-first`, 4 `principle-read-ground-truth-first`, 5 `principle-experiment-before-proposing`, 6 `principle-name-the-tradeoffs`, 7 `principle-one-owner-per-truth`, 8 `principle-constrain-states-and-authority`, 9 `principle-separate-the-concerns`, 10 `principle-justify-the-complexity`, 11 `principle-design-for-failure`, 12 `principle-design-for-concurrency`, 13 open (pending testing research; ships as `principle-tests-are-executable-claims` until settled), 14 `principle-prove-it-works`, 15 `principle-verify-before-accepting`, 16 `principle-write-for-the-reader`, 17 `principle-refine-mental-models`. *owner* | Owner direction: verb-led names. Content follows three names: 10 opens with the justification double-check; 12 opens with actors that already overlap (coping, not adding concurrency); 14 opens with a passing test being evidence and proof being the feature working through the real entry point. |
| D24 | 2026-10-12: the 17 principles stay separate skills; none coalesce into one skill with references. An index skill is optional later, only if picking among 17 gets hard. *owner* | Owner agreed with the Advisor: the boundaries tested as real. |
| D25 | 2026-10-12, supersedes card 8's name and scope in D23: card 8 is `principle-types-are-communication` (the owner's own heading) and teaches type discipline only, with the owner's TypeScript, Python, and Rust requirements taught where they do the work. Least authority leaves the card for a later security domain pack; one line keeps "well-typed" apart from "allowed". Cards that rely on types point to it. *owner* | Owner: "yes to a"; asked that other principles such as design for failure reference it. The pstack type-system leaf repeats the owner's own type rules. |
| D26 | 2026-10-12, supersedes D5's card shape: each card teaches. Body: the idea, how to think it through (including the hard call and how to choose between moves), one anchor example, when it doesn't apply, signs you skipped it, and a cross-reference only where it changes what the reader does next. Further scenarios live in `references/example_scenarios.md`, loaded by one `IF` call when the case doesn't match the anchor or when reviewing. The accountability rule lives once, in the index. Cards are hand-written from scraped sources, one at a time. *owner* | Owner: the first cards were "mostly pedantic stuff" and "this is not how you write skills, skills are supposed to teach the principle"; approved this shape and named the reference file `example_scenarios.md`. Pointer phrasing may change after the reference-loading research. |

### D18 names and their sources

Each name is a phrase the owner already uses: a heading or line in the owner's private global instructions, or a correction the owner repeats (P atoms, snapshot `8e5a2561f24b`). The quoted sources are private and live in memory-logs at `skills/authoring/2026-10-12-principles-layer/name-and-card-sources.md`.

| # | Name | Source |
| --- | --- | --- |
| 1 | `principle-focus-and-scope` | owner instructions, Curiosity before solutions; P-0002 (the top habit) |
| 2 | `principle-shared-mental-model-first` | owner instructions, Our Values |
| 3 | `principle-domain-meaning-first` | P-0014; "names are promises" stays in the rule |
| 4 | `principle-read-ground-truth-first` | owner instructions, Our Values; W-0084 |
| 5 | `principle-experiment-before-proposing` | owner direction, 2026-10-11, to experiment and validate every change |
| 6 | `principle-tradeoffs-are-the-work` | owner instructions heading of the same name |
| 7 | `principle-one-owner-per-truth` | unchanged; W-0032 |
| 8 | `principle-types-and-trust-boundaries` | owner instructions, Types are communication; trust boundaries |
| 9 | `principle-separation-of-concerns` | owner instructions heading, Structure and separation of concerns |
| 10 | `principle-dont-over-engineer` | P-0044 |
| 11 | `principle-what-happens-when-it-fails` | owner instructions, Tradeoffs are the work |
| 12 | `principle-concurrency-and-ordering` | owner instructions, Rust async; P-0058 |
| 13 | `principle-tests-are-executable-claims` | owner instructions, Testing |
| 14 | `principle-prove-it-through-the-real-path` | owner instructions, Proof of completion |
| 15 | `principle-verify-before-accepting` | owner instructions, Our Values; P-0032 |
| 16 | `principle-write-for-the-reader` | owner instructions, Structure and separation of concerns |
| 17 | `principle-fix-the-understanding-first` | owner instructions, Reality informs the mental model |

## Per-run surface allocation

| Surface | Every run |
| --- | --- |
| Trigger | description (D4), `disable-model-invocation: true`, `agents/openai.yaml` policy (D2, D3) |
| Main path | the card: Apply when, Rule, Why, The test, Distinct from, Applied means |
| Depth | inline Worked case and Overkill; no references (D5) |
| Proof | static checks for all runs; the comparative behavior check for runs 1–4 |

Run 1 also adds the family surfaces listed in the targets table.

## Authoring basis

User-directed intent: owner GO on step 1, 2026-10-12. Each card was written from the owner's private global instructions, owner atoms (P = prompts, W = owner-written skills; snapshot `8e5a2561f24b`), admired-source atoms (B, R), session-log cases (CASE), and pstack principle leaves. The cards quote none of them. Quoted sources: memory-logs `skills/authoring/2026-10-12-principles-layer/name-and-card-sources.md`.

| Card | Sources |
| --- | --- |
| 11 what happens when it fails | pilot card (`redesign/pilot-card-11.md` in the design record) and its ablation; chunk card 11 (trigger B-0045; CASE-07-007); owner instructions, Tradeoffs are the work; pstack `principle-make-operations-idempotent`. |
| 2 shared mental model first | owner instructions, Our Values and Curiosity before solutions; W-0028, W-0030, W-0047; P-0001, P-0003, P-0037, P-0160; chunk card 2 (CASE-05-030, the model for the worked case). |
| 9 separation of concerns | owner instructions, Structure and separation of concerns, Structure follows responsibility, and the stand-in seam in Execution; chunk card 9 (trigger B-0129; CASE-09-003, behind test question 3); P-0061, P-0066, P-0237, P-0343, P-0348, P-S-0002; pstack `principle-boundary-discipline`. The billing worked case is synthetic. |
| 13 tests are executable claims | owner instructions, Testing; chunk card 13 (trigger R-0242; CASE-06-051, the model for the worked case); P-0035, P-0050, P-0062, P-0074, P-0329, P-0330; pstack `principle-test-behavior-not-implementation`. |
| Wave 2 | the index row and chunk card for each principle (D14), the owner atoms mapped to it, and the matching pstack leaf where one exists. |

Citation rules: P atoms are evidence of what the owner pushed on, not stated rules; P-0011 is not used.

## Proof plan

**Proof posture:** drafted from user intent; behavior not yet evaluated (D19). The card-11 shape rests on the earlier one-fixture ablation of the pilot text, not on these cards.

**Static:** `claude plugin validate .` and `codex plugin list --marketplace ai-tools --available --json`; the Codex quick validator per new skill (expected: only the D2 key flag; not run if PyYAML is missing). No test suite runs (D21). Static checks are structural only.

**Behavior, wave 1: deferred by the owner (D19).** Kept as the plan for when behavior testing resumes (to be run by the 🦁 Codex Lead `01a118ee…`, on the card-11 protocol):

- Conditions: a = no card; b = the shipped card text from the branch head, given in the prompt as the skill body.
- Per card, two tasks: an author task (write the design or plan) and a critic task (review an excerpt with seeded defects and one good-design control).
- Subjects: fresh Luna high ×3 per condition and task (12 runs per card, 48 in total). Sol medium ×2 on the author task is optional.
- Scoring: three blind Luna scorers per card on shuffled, unlabeled outputs, against a rubric frozen before any run. The Codex Lead freezes each fixture and rubric from the obligations below.
- Per model × task cell: the card passes when the author gain is at least 1.5 on a seven-point author rubric, the critic gain is at least 1 of 4 (unless at ceiling, reported as such), and the control is no worse: b adds no flag or machinery to the good-design control more often than a. (Codex Lead pre-freeze correction 2: every author rubric has seven points, so the fixed +1.5 applies.)
- A failing card gets one revision to its top on the missed obligation, then one rerun. If it still fails, the evidence goes to the owner (keep, cut, or reshape). No card is removed automatically.
- Card 11 reruns the frozen VM-provisioning fixture with the shipped text (a and b), to check the trimmed depth kept the gain.

**Obligations per card** (rubric seeds; fixtures in a different domain from the worked case, D15):

- **2 shared mental model first.** Fixture: an agent takes over work from a written spec and plan plus a later conversation that corrects two points and uses one ambiguous term; one complex decision was agreed quickly. Author obligations: a restatement specific enough to be corrected line by line; the load-bearing assumption and what would break it; both later corrections override the documents; the ambiguous term or the strongest other reading is surfaced; a specific confirmation question rather than proceeding or a generic "look right?". Control: a settled, small item gets no ritual read-back.
- **9 separation of concerns.** Fixture: a feature whose current code tangles a core rule with the clock, a database, an external provider, and framework wiring, and where framework startup changes a process-global another part relies on. Author obligations: the core rule is a pure part testable without network, clock, or framework; the provider sits behind one adapter that hides its protocol; time is passed in at the edge; each part's job and reason to change is stated; the global mutation is named and contained. Controls: no interface for single-implementation pure logic; no speculative package split.
- **13 tests are executable claims.** Fixture: a bug, a proposed fix, and a test harness whose fixture or fake handles the input before the code under test. Author obligations: the scenario is input or event to observable outcome; assertions check outcomes, not calls; a concrete red-then-green procedure that names the expected failure (a written task cannot show that red was observed, so a claimed run scores zero and actual red execution stays unproved by this check); the harness interception is spotted and the input is injected at the real boundary; the cheapest honest layer is chosen; mocks cover only out-of-scope dependencies with realistic contracts. Control: no duplicate test where an existing test at the seam already turns red.
- **11 what happens when it fails.** The frozen card-11 rubric: author A1–A7; critic D1–D3 plus control C1.

**When behavior testing resumes:** the prepared card-2 and card-13 fixtures must use domains clearly different from those cards' worked cases (a resumed spec and plan; a terminal key event), per D15 and structure review R1; recheck every fixture brief against every worked case before freezing.

**What the check does not prove:** routing, installed-skill loading, the invocation encodings, or that a phase or orchestrator picks the right principle (steps 2 and 3). Those stay unverified in step 1; release readback covers loading and invocation.

**Review:** spec review now (this document); implementation review of all 17 runs and the family surfaces after static proof, by the 🦉 Advisor (`a6321a2f…`) as review lead with two reviewer agents, at least one of another lineage.

## Coordination

- Base: `main` at `f1c78679`. Branch `skills/principles-layer`, worktree `/Users/shravansunder/dev/ai-tools.skills-principles-layer`.
- Pending edits elsewhere: draft PR #122 (`skills/design-family-redesign`, head `e2adb45a`) also edits `AGENTS.md`'s skill table, the plugin README, and the version. Whichever merges second resolves those conflicts and re-bumps (D10).
- Version 2.74.0 (D10). Changelog `docs/changelog/2026-10-12-principles-layer.md` (20 lines or fewer) plus its `docs/changelog/README.md` entry, written in run 1 and updated at wave 2.
- **Existing owners of the same judgments** (skill-creation step 1 search, recorded after implementation): `program-design/references/failure-concurrency-recovery.md` owns failure realization, partial success, recovery, and interleavings (principles 11 and 12); `implement-plan` owns drift versus break (17); `plan-implementation/references/slice-and-proof-design.md`, `implement-plan/references/execution-and-proof.md`, and `implementation-review/references/reviewing-implementation.md` teach test design and proof (13, 14, 15); `discuss-clarify-mental-models` is the practice twin of 2 and 17. Step 1 leaves them unchanged by owner scope, so each judgment has two homes until step 2 makes those skills load the principle and cuts their duplicate text over.
- Admired-source provenance: the `ai-dev-skills` mapping for the pstack-inspired principles is updated at PR wrap-up, not in these runs.

## Non-goals

- No change to any existing skill (practices, discuss, manage-agents, presentation, ops, phases, orchestrators, tool manuals) or shared reference other than the new index.
- No change to the owner's global instructions.
- No domain packs (UI/UX with accessibility, performance).
- No wiring: phases loading principles (step 2), orchestrators forcing them (step 3), practice-to-principle pointers (step 4).
- No index skill or router; no stored pressure scenarios.

## Run status

Each card was rewritten by hand in the D26 teaching shape, from its own scraped sources (owner instructions, language rules, pstack leaves, existing skills, owner atoms, real cases; `tmp/design-skills-lead/sources/` in the design-skills worktree), one at a time, with a teaching read per batch: an unseen case walked by a reader of only the card, plus a source comparison. Every addition from those reads was applied. These are the Lead's records, not the independent implementation review.

| Card | Skill | Teaching read | Status |
| --- | --- | --- | --- |
| 11 | `principle-design-for-failure` | batch 1 (Advisor, Codex Lead) | implemented |
| 9 | `principle-separate-the-concerns` | batch 1 (Advisor, Codex Lead) | implemented |
| 17 | `principle-refine-mental-models` | batch 1 (Advisor, Codex Lead) | implemented |
| 8 | `principle-types-are-communication` | batch 1 (Advisor, Codex Lead) | implemented |
| 12 | `principle-design-for-concurrency` | batch 2 (Advisor) | implemented |
| 10 | `principle-justify-the-complexity` | batch 2 (Advisor) | implemented |
| 1 | `principle-hold-the-scope` | batch 2 (Advisor) | implemented |
| 2 | `principle-build-the-shared-model-first` | batch 3 (Advisor) | implemented |
| 3 | `principle-define-the-domain-first` | batch 3 (Advisor) | implemented |
| 4 | `principle-read-ground-truth-first` | batch 3 (Advisor) | implemented |
| 5 | `principle-experiment-before-proposing` | batch 4 (Advisor) | implemented |
| 6 | `principle-name-the-tradeoffs` | batch 4 (Advisor) | implemented |
| 7 | `principle-one-owner-per-truth` | batch 4 (Advisor) | implemented |
| 15 | `principle-verify-before-accepting` | batch 5 (Advisor) | implemented |
| 16 | `principle-write-for-the-reader` | batch 5 (Advisor) | implemented |
| 14 | `principle-prove-it-works` | batch 5 (Advisor) | implemented |
| 13 | `principle-tests-are-executable-claims` | waiting for the owner's split decision (testing research: two principles plus a TDD practice) | old shape; not rewritten |

No run is `reviewed` or `shipped`.

## Review record

Spec review, 🦉 Advisor as review lead: teaching checks complete (T1 and T2 fixed at `d9c7fa53` and verified; P1 closed by D19). Structure checks skipped by the owner (D20); their candidates go to the implementation review. Implementation decision: skipped-by-user. Highest risk named by the review: no behavior evidence, and the load and no-load check at release readback is still owed.

Implementation review: pending, 🦉 Advisor as review lead with the 🦁 Codex Lead as the cross-lineage reviewer.

### Review candidates applied by the author (pending the review lead's verification)

- Spec-stage structure report (`38915f2e`): T2 applied (card 2's trigger no longer claims the recurring-correction symptom, which belongs to card 17; the layer rule forbids naming the practice neighbour). R1 recorded for when behavior testing resumes. R2 and R3 applied as the Numbering and terms section. T1 superseded: all 17 descriptions now exist and are in the implementation structure reviewer's scope.
- Implementation-stage teaching report (`e48fca95`): I1 (card 17 completion covers drift and break), I2 (card 5 completion accepts a confirmed decision), I3 (card 5 overkill no longer excludes measuring infrequent but consequential work) applied.
- Review lead finding A1 (verified at `e48fca95`): five more cards' Applied means accepted only a change; each now also accepts a confirmed decision with its evidence (focus and scope, domain meaning, one owner per truth, types and trust boundaries, don't over-engineer).

### Process record (skill-creation audit, 2026-10-12, at the owner's request)

- **Security gate** (`skill-creation` `security-gate.md` labels; due before the cards were written, recorded after):

  ```text
  sensitive surfaces: third-party skill adoption (pstack principle leaves and poteto-mode index)
  entry points: none (Markdown cards and openai.yaml metadata; no scripts, hooks, assets, package scripts)
  untrusted inputs: none at runtime
  privileged actions: none
  third-party source: cursor-plugins submodule, pstack/skills, pin ecc249f
  license / permission state: MIT (Copyright 2026 Lauren Tan)
  copy-vs-adapt decision: adapt; card shape and some principle ideas adapted, no upstream prose copied; names from the owner's phrases
  decision: allowed
  required proof: none beyond static validation (no executable surface)
  public-safe constraints: no private owner quotes in public files (sources in memory-logs)
  review route: implementation review (sensitive-surface check)
  ```
- **References loaded late.** `reference-design.md` and `worked-examples.md` were loaded after implementation; both confirm D5 (cards inline, no references). `reference-design.md` also confirms the index finding below.
- **Index had no caller.** As a shared reference it was called by no skill in step 1, against the caller-owns-routing rule and the repo rule that shared references serve two or more active skills. Fixed by D22: it is a plugin doc until step 2 gives it callers.
- **One pass, not one skill per run.** All 17 runs were implemented in one generated pass after D20, instead of one skill per run. Repaired as far as it can be after the fact: each run now has its own row under Run status with its basis and verification.
- **PR before review.** Draft PR #123 was opened before the implementation review (repo SOP order is review, then PR wrap-up). It stays draft, and `implementation-pr-wrapup` starts only after the review closes.
- **Admired-source provenance** (repo AGENTS.md, maintain both): the lite catalog gains a pstack `principle-*` note and an Engineering principles row; `ai-dev-skills` gains `docs/my-ai-tools/shravan-dev-workflow/principle-family.md` and a README row. The reverse-link rows for `docs/repo-index/cursor-plugins.md` are recorded in that file as proposed edits, because another session has that file staged.
- **Commits** are SSH-signed (GitHub reports `4271faf1` verified).

