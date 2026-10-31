# skill-rules systems: skill verification

Draft 3, by the 🐒 Implementer Sidekick (Opus 5.5, `claude-local/c6a9871a`), 31 Oct 2026, revised after 10:38 EDT (from `date`), for the Advisor's per-skill check 1 (P1, N4–N6); the Lead's note on graders is folded in after 10:50 EDT, and C11 is added to the unexercised list after 11:11 EDT. Part four: [requirements](requirements.md), [specification](specification.md), [skill design](skill-design.md), skill verification. The [orchestration design](orchestration.md) §10 fixes the shape of the proof; this part fixes its material, checks and run conditions. Draft 3, after 12:12 EDT: the behavior comparison is a later step (owner, 31 Oct), not run in this change; this change's proof is named below.

## Routes, by `decision-matrix.md`

Each requirement and standard went through the matrix's six questions (`skill-rules/references/decision-matrix.md`, "Decide in this order"). One fact decides most of them: the Part A standards and Part C checks describe a **decision model an agent writes** (rules JSON, state samples, a policy table), and no evidence kind in the kit picks those. So whether the skills teach them is an eval (question 2: what an agent does while working). Whether a given model meets them is a review check that `decision-model-review` runs on that model (question 3: no kind picks the text).

| item | route | properties it was decided on |
| --- | --- | --- |
| Success definition 1–5 (requirements) | eval: the teaching-transfer comparison, a later step (owner, 31 Oct), not run in this change | what an agent designs while working; only a fresh run shows it |
| Success definition 6 (requirements) | eval: the seeded-defect comparison, a later step (owner, 31 Oct), not run in this change | what a reviewer finds while working |
| A1–A23 (Part A) | eval, through the teaching-transfer properties below; on any authored model, a review check by `decision-model-review` | the property lives in a decision model no evidence kind picks |
| W1, W3 | eval (teaching transfer, property "standard preserved") | agent behavior; unchanged from today |
| W2, W5 | eval (teaching transfer: the output carries the design and the return columns) | agent behavior |
| W4 | eval for the plan; stage 3 for the results | rule results need keyed runs, which this change doesn't make |
| W6 | review check: the diff keeps `references/decision-matrix.md` and `references/running-rules.md` with their opening contracts, and every caller's path still resolves | cross-file: the callers sit in other skills |
| W7 | review check: the sentence is present in `SKILL.md` and `check-and-reports.md`; the behavior is unverified (below) | agent behavior under a missing grant, which the transfer task doesn't exercise |
| C1–C10 (Part C) | eval: the seeded-defect comparison; C10 also a review check (the schema and per-check references exist, each check with a bad control) | reviewer behavior; the file structure is cross-file |
| the three descriptions' openers, length, situation and no-workflow standards | deterministic and judged rules already in the kit (`descriptions-and-invocation` K001–K006), run by the self-check | the kit marks these standards |
| the new `SKILL.md` bodies and references against the main-path, calls, steering and generalization standards | the kit's existing rules, run by the self-check (`running-rules.md`); the rest by `skill-review` | marked standards run as rules; unmarked ones are review-only |
| the two model-invocable descriptions' loading | eval: the two-prompt trials below, a later step (owner, 31 Oct), not run in this change | invocation is session behavior |

No requirement or standard went to "prose". No new rule is proposed in this change; rule routes for the new skills' own standards wait for stage 3.

## What the later runs would exercise, and what they wouldn't

Routing a standard to an eval doesn't mean the runs observe it. Each grading property and planted defect exercises the standards below; every other standard is reviewed structurally (the skill text states it, with its worked examples) and stays unexercised by behavior.

| run element | exercises |
| --- | --- |
| standard preserved | A1, A6; W1, W3 |
| decisive evidence | A5, A13; W2 |
| propositions separated | A2 |
| primitive and statistic | A3, A4, A8, A15, A21 (in part) |
| batching | A7 |
| uncertainty routed | A9 |
| labels and measurement | A11; A17 (in part) |
| planted: inverted instruction-and-criteria pair | C3, C7 (A14) |
| planted: multi-proposition Choice | C3 (A2, A3) |
| planted: missing decisive context | C2 (A5) |
| planted: veto averaged away | C4 (A20) |
| planted: parent mapping called verified | C6 (A3 coarsening, A21) |
| the clean packet | C8: no unfounded blocking finding |

**Unexercised by behavior:**
- Part A: A10 (costs), A12 (records), A14 (in the authoring runs), A16, A18 (version change), A19 (pattern labels), A20 (in the authoring runs), A22 (caller bounds) and A23 (replay validity).
- Workflow: W4's results, W5's full return, and W7.
- Review: C1 for profiles other than a kit rule, C5, C9 beyond the planted items, C10's structure, and C11's direct-commission rounds.

These stay structurally reviewed, and the claim names them.

## This change's proof

Static and review evidence. Behavior is not evaluated in this change.
- **Static checks:** `pnpm --dir tests/skills test` and typecheck, `rules --check`, `claude plugin validate .` and the Codex listing, the phase-composition contract, and the design page's lint with its embedded parts compared.
- **The keyed rules self-check** over the five changed skills, run by the Lead, with every finding and uncertain piece dispositioned (`self-check-dispositions.md`).
- **The Advisor's validations:** orchestration rounds 1–4, and per-skill content checks 1–3.
- **The formal design review** (closed 6 → 1 → 0, verdict great), and the `skill-review` implementation stage still to come.

**The gap, named:** behavior is not evaluated. The behavior comparison (teaching transfer, seeded-defect review and the trigger trials below) is a later step the owner plans (owner, 31 Oct). It isn't run in this change, and isn't part of its done criteria. Its design and run material stay as the plan for that step. The success definition in the requirements says what the skills aim at; it isn't claimed as proven.

## The later step: behavior comparison (owner, 31 Oct), not run in this change

The sections from here to "Static checks" are the plan for that later step.

### Proof posture for the later step

- **Authoring basis:** observed failure, reproduced statically, plus user-directed intent (requirements).
- **Skill types:** `domain-decision-models` and `skill-rules` are technique skills, whose proof is "the technique transferring to a fresh, similar task without handholding" (`proof-claims.md`). `decision-model-review` is also a technique skill, a review procedure applied to new material.
- **The strongest claim planned:** "a difference shown for an approved representative case" (`proof-claims.md`'s ladder). Each arm runs once per standard or packet, so variance across repetitions is unmeasured and is named as a proof gap. "Repeated fresh runs passing" is not claimed.
- **Until the runs:** the skills are reported as "drafted from user intent; behavior not yet evaluated".

### Run conditions (every subject run)

From `proof-claims.md`'s run standards and validation 3's N3:
- **A fresh agent.** Each subject is a new Luna session, never a fork or a resume.
- **A realistic request.** It never shows the checks, never says it's a test, and never asks which skills the agent used. A trigger run never names the skill.
- **Checks kept outside.** The checks, the grading properties, the defect manifests and which packet is clean are written before any run, outside every directory a subject works in.
- **Arms isolated.** Each arm's checkout is identical except for the installed skills under test. The baseline arm has `skill-authoring` at `origin/main`; the candidate arm has the change's revision of both plugins.
- **Loaded copies confirmed.** Each run's record shows which skill revisions loaded, read from the host's record of the session.
- **Read by hand.** Each run's actions are read from the host's record, never from the agent's reply.
- **Breaks rerun.** A run that broke before the work (a permission stop, a runtime failure) is rerun, not scored.
- **Who does what.** Subject sessions are separate from any reviewer or grader helpers. The writer prepares the material and checks. The Lead commissions the graders and chooses their model, and accepts the checks before the first session. Graders are blind to the arm, and are never the writer or the Advisor.

### Teaching transfer (runs 1 and 2)

- **Two unseen real standards.** Both are unmarked in the kit today, so no rule entry exists to copy, and the rewritten skills must not use them as worked examples:
  - S1: `domain-skill-crafting/references/calls-and-placement.md:41`, "A citation's action says what to produce or check, in words other than the link text; "apply X", "(see X)", or an action that restates the link text is incomplete."
  - S2: `domain-skill-crafting/references/main-path.md:15`, "Each branch returns a concrete result the main path uses; "more context" is not a result."

  Copies of both files sit in `tests/skills/fixtures/skill-rules/generalization-k001/` as cases for another rule; they hold the standard's text, not a rule for it, and both arms see them alike.
- **The task (both arms, same words):** a request to turn the standard into a checked rule in the kit, and to return the design and the rule entry. It doesn't mention decision models, Jev practice or any skill.
- **The evidence, checked before any run.** The writer prints the kit's evidence for the kinds that could carry each standard; a print that depends on a selected kind is run by whoever holds the grant. The writer records whether the pieces hold what the judgment needs. That record is the graders' reference for a refusal; an unmarked standard isn't assumed implementable.
- **A justified refusal is scored, not penalized.** The matrix permits review-only or an evidence gap when no piece can answer the standard.
  - A refusal whose property-based reason holds against that record passes "standard preserved" and "decisive evidence"; the other five properties are `not applicable` for that session.
  - An unjustified refusal fails all seven.
  - When one arm justifiably refuses and the other builds a rule the evidence can't support, the builder fails "decisive evidence".
  - A property `not applicable` in either arm leaves that standard's comparison.
- **Sessions:** four, one per arm per standard.
- **The grading properties,** each pass or fail, with its definition written before the run:

| property | passes when |
| --- | --- |
| standard preserved | the rule's questions and routes decide the standard's own good and bad cases as the standard means them, including its negative case ("apply X") |
| decisive evidence | the design names the evidence kind and the fields the judgment needs, and names a gap where a field can't hold them |
| propositions separated | each question asks one proposition; coexisting requirements are separate questions with a declared order |
| primitive and statistic | each question's type fits its answer's meaning, and each threshold names the quantity it reads |
| batching | independent assessments over the same state and model profile go in one inference pass; a further request is only for new evidence or options, or a bounded repeat or caller escalation with a stated purpose (A7) |
| uncertainty routed | every judged node's in-between answer has an intended route, distinct from an incomplete reply |
| labels and measurement | the proof plan has independent labels, good, bad and near-miss cases, a held-out set and a baseline |

- **Deciding condition:** orchestration §10, per standard. The candidate arm passes every property the baseline passes and at least one the baseline fails. Equal, worse and incomplete are as §10 defines them.

### Seeded-defect review (run 3)

- **Material:** two rule-change packets, both declared as a kit rule at the implementation stage, which `skill-review`'s implementation stage and `decision-model-review` both admit. Each holds a skill diff with its rule entry, the evidence print, encoded state samples, a policy table and a development-results summary. Both arms get the same declared profile and stage.
  - **The seeded packet** holds the five planted defects of orchestration §10. Each sits at a recorded anchor in the manifest: file, line, or the entry's question or step name.
  - **The clean packet** is a correctly designed rule for a third standard, checked by the Advisor before any run.
- **Material validity:** before any run, the Advisor confirms that each planted defect breaks the standard it's meant to (with its source anchor), and that the clean packet breaks none.
- **Sessions:** four, one per arm per packet. The candidate arm has `decision-model-review`; the baseline arm has `skill-review` only.
- **Grading and deciding condition:** orchestration §10 (the four finding classes, missed anchors, and the no-regression condition), fixed before the first session.

### Trigger trials (runs 2 and 3)

Each prompt runs in a fresh session that sees the installed skills' descriptions side by side, and nothing of this design set. Which skill loaded is read from the host's record.

| skill | true prompt (should load) | near miss (should not load) |
| --- | --- | --- |
| `skill-rules` | "The rule that each branch names an observable condition keeps flagging lines that are fine. Work out what its questions and thresholds should be." | "Our support-ticket router asks the model three questions before it picks a queue. Check whether its thresholds make sense before we ship it." (`decision-model-review` or the domain's caller, not `skill-rules`) |
| `decision-model-review` | "Before we merge, have someone independently check the new branch-condition rule's questions, evidence and thresholds." | "Review this PR's Rust changes to the report projection before merge." (`implementation-review`) |

`domain-decision-models`: not applicable (hidden).

## Static checks (every run)

- `pnpm --dir tests/skills rules <changed skill folders>`, read by `running-rules.md`, with each finding's call, each uncertain piece decided, and each gap named. That run sends model requests, so the Lead runs it from the writer's prepared command, on the installed CLI with its signed binary (the owner's standing procedure). The writer runs `rules --check`, which needs no key.
- `pnpm --dir tests/skills test` and typecheck; the phase-composition contract after regenerating the map (skill design, coordination).
- `claude plugin validate .` and the Codex marketplace listing (`platform.md`).
- The deletion test on changed text at assessment (`steering.md`).

Static results are structural proof only, never behavior proof.

## What stays unverified

- **Behavior.** Not evaluated in this change: the behavior comparison and the trigger trials are a later step (owner, 31 Oct). Until then, the skills' teaching is drafted from user intent, and its effect on agents is unobserved. That includes whether each changed description loads on its true prompt and stays quiet on its near miss.
- **Rule accuracy.** No rebuilt rule is measured here; that's stage 3, with the rules CLI's full-denominator and version proof unavailable until O3.
- **Variance, for the later step.** One run per arm per standard or packet would show a difference for those cases, not a repeatable effect.
- **Other callers.** The domain's reach through `run_judgments` and engine-selection authors is unexercised; no run here takes those paths.
- **Routing.** Runs 4–5 (O2, decided option a) are proven statically only: the routing sentence exists and names its condition. That a routing review actually hands off to `decision-model-review` is unexercised.
- **Triggers, for the later step.** Each planned trial is one prompt pair, not a sample of real phrasings.
- **The keyed-run handoff (W7).** No run here puts an agent without a grant in front of a keyed step.
