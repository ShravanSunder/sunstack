---
name: decision-model-review
description: "Use when independently reviewing a decision model before it ships: a rule's decision graph, questions a model answers for code, their evidence, thresholds or proof claims. Not for designing one."
---

# Decision Model Review

Review is an attempt to make the model fail. Every check names what fails it, and holds a bad control that must fail it; a check that can't fail isn't run. The standards it checks against belong to `domain-decision-models`. This skill owns how they are checked: what is admitted, which checks run, how candidates reduce, and what the verdict means.

An agent with no authoring history on the model runs it, started the way the host starts a reviewer. A routing review that loads this skill takes the return and reduces it under its own contract; a direct commissioner reads it as returned. The reviewer never edits, never runs a model request, and never accepts.

Read the model the way the model reads its evidence: on the state it receives. A question that reads well can still give a labelled case the wrong answer once it sits beside that case's actual fields and reference, and only that state shows it. A review that read only the source of a question can say what the question asks, never what it does to a case.

A case's state, wherever a check below asks for it, is its request as the engine builds it: a prepared request, built without sending (for a sunstack lint rule, `--prepare` from 0.9.0, as `skill-rules-config`'s prepared-requests reference describes), or the same request saved by a run that sent it, from the same rulebook files, which the report's hashes show. Nothing else counts: not an evidence listing, not a checkout of the case's revision printed with its own configuration, not a state assembled by hand. Without it, a check that needs it is `partial`, naming the missing prepared request.

## 1. Admit the profile and the stage

Name the model's execution profile and the review's stage:
- **profile:** a lint rule (a rule in a rulebook whose findings go to an agent), a `run_judgments` caller, or an engine selection;
- **stage:** design, implementation, or delivery.

Then name the inputs that profile and stage supply.
- **A lint rule** supplies what its stage has produced so far: the classification, the evidence print and encoded state, the question set, the tree and policy table, each finding route's nudge, the cases and run reports, and the frozen configuration. When one exists, it also supplies the receiving reading or commission built from its nudges: what an agent or a Lead made of them.
- **A `run_judgments` caller or a selection** supplies its equivalents: the exact state or its builder, the questions with their criteria, the policy code, and its tests, results and version evidence. Its own code acts on the outcome, so it has no nudge to review. It never fabricates lint-rule artifacts.

Return `blocked-input` only when nothing supplied supports any check, naming what's missing and who restores it. Otherwise the review goes on. A supplied request that is visibly empty or invalid is a finding where a check supports it, not missing review input.

Completion: the profile, the stage, and each supplied and missing input are named.

## 2. Read the whole model

MUST load `../domain-decision-models/SKILL.md` and return the standards that apply to this model's profile and nodes; the checks below test against them. Read every supplied input whole. Held-out cases are never an input: a reviewer who reads them can no longer review a model that will be scored on them.

Completion: every supplied input was read in full, and the applicable standards are listed.

## 3. Walk the checks

MUST load `references/checks/review-schema.md` and return the status, finding, reduction and round fields that each check and step 5 fill.

Record a status for every check. A check whose evidence the profile or stage doesn't supply yet is `blocked` or `partial`, named with the missing input; the checks that can run still return their findings. A design-stage model can show an inverted question or an averaged veto before any results exist.

Walk every check below that the profile selects. Each load returns the check's status, the inputs it read, and its candidate findings with their anchors, or its `blocked` or `partial` reason.

1. MUST load `references/checks/state-and-evidence.md`: whether the state holds the decisive content, names its evaluated fields, keeps out what the judgment doesn't use, and holds no example that is a labelled case or carries a case's answer.
2. MUST load `references/checks/questions.md`: whether each question asks one proposition its criteria define, states its route direction, and gives the standard's bad examples and every labelled case the right answer when read on the state the model receives.
3. MUST load `references/checks/primitives-and-statistics.md`: whether each primitive fits its answer's meaning, computation stays in code, and each number keeps its meaning.
4. MUST load `references/checks/policy-and-composition.md`: whether each node's policy is complete, and whether the composition keeps obligations and vetoes ahead of any weighting.
5. MUST load `references/checks/proof-and-claims.md`: whether each claim rests on labels, a full denominator, a frozen set, a baseline and one version group.
6. MUST load `references/checks/patterns-and-capability.md`: whether each pattern and capability claim carries its evidence, and whether a composed model passes the pattern-fit checklist.
7. IF the profile is a lint rule, load `references/checks/nudge-and-receiver.md` and return its check record: whether each finding route gives the receiving agent what it needs to make the broader call (what was observed, the standard, the severity, where to read, an honest basis, no can't-settle route ending `pass`), and, when the receiving reading or commission is supplied, whether it carries the nudge and its broader question or narrows it into "make it pass". This is judged apart from whether the tree classifies the piece correctly. For a `run_judgments` caller or a selection, whose own code acts on the outcome, record this check as not selected, with the profile as the reason.

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

Return `ready`, `needs-revision`, `blocked-input` or `not-converging`, with the probes still owed and each proof the records can't support marked unavailable. Unavailable proof never passes. A delivery-stage review never returns `ready` while a check, or a part of one, that the profile requires is `blocked` or `partial`. A part blocked only for want of an input the profile marks optional, such as a lint rule's receiving reading or commission, is reported as not run with that input named, never hidden, and doesn't hold back `ready`.

A design- or implementation-stage `ready` says the model may go to its next run, and the return says so in those words. It never says the model works: the review of the trees that later failed their development run returned `ready` from source alone, with the encoded requests listed as missing, and was read as approval.

## 7. Rounds

- **Routed use:** the routing review owns the rounds and its convergence rule.
- **Direct commission:** the commissioner owns round control.
  - When the commissioner supplies the previous round's return, this return carries the finding delta, by anchor and failure form: new, recurring and closed.
  - Return `not-converging` only under a convergence policy the commissioner supplies. Without one, return the deltas, and the commissioner decides whether another round runs.

## Completion Blockers

The review is not done while any of these hold:

- a check has no status, or a `blocked` or `partial` check doesn't name its missing input;
- a whole review stopped as `blocked-input` while a supplied input supported any check;
- a delivery-stage `ready` with a required check or part not `complete`, or a part not run for want of an optional input left out of the return;
- a finding without its anchor or its standard, or a candidate neither kept, merged nor rejected;
- unavailable proof reported as passed;
- a labelled case or a negative example counted as passing from the question's text, with its state unread and the check not marked `partial`;
- a design- or implementation-stage `ready` that doesn't say it means "ready for the next run";
- a probe run by the reviewer;
- `not-converging` returned on a direct commission without a supplied policy;
- an edit to the reviewed model or its files.
