---
name: decision-model-review
description: "Use when independently reviewing a decision model before it ships: a rule's decision graph, questions a model answers for code, their evidence, thresholds or proof claims. Not for designing one."
---

# Decision Model Review

Review is an attempt to make the model fail. Every check names what fails it, and holds a bad control that must fail it; a check that can't fail isn't run. The standards it checks against belong to `domain-decision-models`. This skill owns how they are checked: what is admitted, which checks run, how candidates reduce, and what the verdict means.

A 🔎 Reviewer Sidekick with no authoring history runs it, commissioned through `practices-manage-agents`. A routing review (`skill-review` or `implementation-review`) takes the return and reduces it under its own contract; a direct commissioner reads it as returned. The reviewer never edits, never runs a model request, and never accepts.

## 1. Admit the profile and the stage

Name the model's execution profile and the review's stage:
- **profile:** a kit rule, a `run_judgments` caller, or an engine selection;
- **stage:** design, implementation, or delivery.

Then name the inputs that profile and stage supply.
- **A kit rule** supplies what its stage has produced so far: the classification, the evidence print and encoded state, the question set, the tree and policy table, the cases and run reports, and the frozen configuration.
- **A `run_judgments` caller or a selection** supplies its equivalents: the exact state or its builder, the questions with their criteria, the policy code, and its tests, results and version evidence. It never fabricates kit artifacts.

Return `blocked-input` only when nothing supplied supports any check, naming what's missing and who restores it. Otherwise the review goes on. A supplied request that is visibly empty or invalid is a finding where a check supports it, not missing review input.

Completion: the profile, the stage, and each supplied and missing input are named.

## 2. Read the whole model

MUST load `domain-decision-models` and return the standards that apply to this model's profile and nodes; the checks below test against them. Read every supplied input whole.

Completion: every supplied input was read in full, and the applicable standards are listed.

## 3. Walk the checks

MUST load `references/checks/review-schema.md` and return the status, finding, reduction and round fields that each check and step 5 fill.

Record a status for every check. A check whose evidence the profile or stage doesn't supply yet is `blocked` or `partial`, named with the missing input; the checks that can run still return their findings. A design-stage model can show an inverted question or an averaged veto before any results exist.

Walk every check below. Each MUST load returns the check's status, the inputs it read, and its candidate findings with their anchors, or its `blocked` or `partial` reason.

1. MUST load `references/checks/state-and-evidence.md`: whether the state holds the decisive content, names its evaluated fields, and keeps out what the judgment doesn't use.
2. MUST load `references/checks/questions.md`: whether each question asks one proposition its criteria define, states its route direction, and passes the standard's own bad examples.
3. MUST load `references/checks/primitives-and-statistics.md`: whether each primitive fits its answer's meaning, computation stays in code, and each number keeps its meaning.
4. MUST load `references/checks/policy-and-composition.md`: whether each node's policy is complete, and whether the composition keeps obligations and vetoes ahead of any weighting.
5. MUST load `references/checks/proof-and-claims.md`: whether each claim rests on labels, a full denominator, a frozen set, a baseline and one version group.
6. MUST load `references/checks/patterns-and-capability.md`: whether each pattern and capability claim carries its evidence, and whether a composed model passes the pattern-fit checklist.

Completion: every check has a status, and each `blocked` or `partial` one names its missing input.

## 4. Request probes

A check that needs a model run to decide returns a probe request to the commissioner. The request names the variable to change, what stays frozen, and the expected label. The commissioner, who holds the grant, runs it; the reviewer never sends a model request.

## 5. Reduce

The reviewer decides each candidate, and the schema's fields record the result.
- **Duplicates.** Two candidates with the same anchor and failure form are one finding, recorded once with both sources.
- **Scope.** A correction that would add work the model doesn't need fails the deletion test. Open the clause the finding claims to serve: if the model's obligation holds without the proposed addition, reject the candidate as scope expansion. Never escalate it as an owner decision.
- **Each kept finding carries:**
  - its anchor;
  - the standard it breaks, quoted from `domain-decision-models`;
  - whether it blocks;
  - the bad control or failure condition it rests on;
  - the smallest correction.

Completion: every candidate is kept, merged or rejected, with its reason.

## 6. Return the verdict

Return `ready`, `needs-revision`, `blocked-input` or `not-converging`, with the probes still owed and each proof the records can't support marked unavailable. Unavailable proof never passes. A delivery-stage review never returns `ready` while a check the profile requires is `blocked` or `partial`.

## 7. Rounds

- **Routed use:** the routing review owns the rounds and its convergence rule.
- **Direct commission:** the commissioner owns round control.
  - When the commissioner supplies the previous round's return, this return carries the finding delta, by anchor and failure form: new, recurring and closed.
  - Return `not-converging` only under a convergence policy the commissioner supplies. Without one, return the deltas, and the commissioner decides whether another round runs.

## Completion Blockers

The review is not done while any of these hold:

- a check has no status, or a `blocked` or `partial` check doesn't name its missing input;
- a whole review stopped as `blocked-input` while a supplied input supported any check;
- a delivery-stage `ready` with a required check not `complete`;
- a finding without its anchor or its standard, or a candidate neither kept, merged nor rejected;
- unavailable proof reported as passed;
- a probe run by the reviewer;
- `not-converging` returned on a direct commission without a supplied policy;
- an edit to the reviewed model or its files.
