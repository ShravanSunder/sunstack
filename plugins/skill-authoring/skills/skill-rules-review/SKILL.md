---
name: skill-rules-review
description: "Use when independently reviewing a skill rule or filter before its development run or switch-on, or when its results look wrong. Not for authoring one, or a decision model outside a rulebook."
---

# Skill Rules: Review

A skill rule is two things at once: a decision model, which `decision-model-review` checks, and a nudge in a skill rulebook that any agent reads through plain `sunstack lint`, which this skill's three checks hold to the house requirements below. Review tries to make the rule fail on the wire: on the owner's own rulings, read on the state the model receives. A question read from its source shows what it asks; only the state a case sends shows what it does to that case.

The two held trees are the case for that. An independent review passed both as ready for their development run. It read every question, criterion and route, and mapped each of the owner's rulings onto the tree from the question text; for the public-tool rulings it wrote "the boundary excludes it, so no material, so pass". It listed the encoded requests as missing and returned ready anyway. On the sent states the first question called all five of those sections product material, and the filter's reference, compared with its development cases, held two of them with their labels. Both failures were findable before the run.

An agent with no authoring history on the rule runs this review, started the way the host starts a reviewer. It never edits the rule or its files, never sends a model request, never reads a held-out case, and never accepts: it returns a verdict to whoever asked.

## What a skill rule is held to

| a skill rule… | checked by |
| --- | --- |
| asks every model judgment in it, a filter's and a selection's included, as a tree of questions that each ask one thing | `decision-model-review`: questions, primitives-and-statistics |
| carries its examples in the rulebook's `reference`, which reaches the model in state, written from the standard and never a case | `decision-model-review`: state-and-evidence |
| keeps every owner ruling as a case, and its questions give each one its ruled answer on the state its request will carry | `owner-rulings` |
| is proven on real skill text, with bars of its own set on development cases, and switches on only past its floors | `owner-rulings`; `decision-model-review`: proof-and-claims |
| names its chunk and edges, picks its chunk for a stated reason, leaves nothing in its denominator unread without showing it, and fixes a wrong reading where the text is collected | `chunk-and-coverage` |
| judges general skills only, when its standard is for general skills, by a filter's label | `chunk-and-coverage` |
| gives a nudge, not a verdict: what it observed, where, where to read next, `warn` on any judged path, a pass that says one property held | `decision-model-review`: nudge-and-receiver; `lint-contract` |
| reaches any agent through plain `sunstack lint`, short lines first and detail on request, with nothing bent around an engine gap | `lint-contract` |

## Workflow

### 1. Admit the rule and the stage

Name the target (the rule or filter, its rulebook file, the config, the revision), who asked, and your independence from its author. Name the stage:
- **design:** before any request: a selection before its first run, a rule before its first case run (after its selection's run, when it has one);
- **development:** its development results are in;
- **switch-on:** someone proposes to activate it.

Then name each input supplied and each missing: the design; the entries and config; the evidence print; the desk-check record with each case's state as `decision-model-review` defines it; the development case file; the held-out holder's separation attestation; the source of the owner's rulings; at development and switch-on, the saved report with its requests; at switch-on, the held-out results. A held-out case's contents are never an input.

Completion: target, requester, independence and stage are stated, and every input is named as supplied or missing, with who restores it.

### 2. Walk the decision-model checks

MUST load `../decision-model-review/SKILL.md`, admit the rule as a lint rule at this stage, and walk its steps 1 to 5 yourself as its reviewer, returning each of its check records and candidates. Its review schema is the record for every check in this review.

Completion: each of its checks has a record and a status.

### 3. Walk the skill-rule checks

MUST load each check below and return its record, in the schema step 2 loaded, under the check's own name:
1. `references/checks/owner-rulings.md`: whether every owner ruling is a case, gets its ruled answer on its state, and whether the cases, bars and floors can carry the stage's claim.
2. `references/checks/chunk-and-coverage.md`: whether the rule names its chunk, picks it for a reason, reads only the folders its standard governs, shows what it didn't read, and fixes a misread where the text is collected.
3. `references/checks/lint-contract.md`: whether the rule reaches agents as a nudge through plain lint, with nothing bent around the engine.

IF reading the entries, an evidence print, a report or the case file needs the engine's meaning of a field or status, load `../skill-rules-config/SKILL.md` and return the meaning from the reference its task names.

Completion: each check has a status; a `partial` or `blocked` one names its missing input.

### 4. Reduce

Reduce every candidate from steps 2 and 3 together by `decision-model-review`'s step 5: duplicates merged with both sources, scope expansion rejected, each kept finding with its anchor, the standard it breaks, whether it blocks, its bad control and its smallest correction.

Completion: every candidate is kept, merged or rejected, with its reason.

### 5. Return the verdict

Return `ready`, `needs-revision`, `blocked-input` or `not-converging` by the schema's precedence, with the probes owed and each unavailable proof. Say what `ready` means at this stage, in words:
- **design:** ready for its next request (a selection's first run, or a rule's development case run), and nothing more;
- **development:** ready to freeze and run the held-out set once;
- **switch-on:** every switch-on condition holds, each with the run that shows it.

`owner-rulings` that is `partial` or `blocked` holds back `ready` at every stage: the owner-ruled cases' states are what a reading of the question text can't stand in for. Each comes from `skill-rules-config`'s desk-check state recipe, which sends nothing, a selection's candidates included; never ask for a selection run, or any other request, to get them. A rebuilt state with its equivalence gap named completes the input, and the gap goes in the verdict's unavailable proof.

Completion: the verdict, what it means at this stage, the probes owed and the unavailable proof are returned.

## Completion Blockers

The review is not done while any of these hold:

- a check from either skill has no status, or a `partial` or `blocked` one doesn't name its missing input;
- `ready` returned while `owner-rulings` is `partial` or `blocked`, or without saying what it means at this stage;
- an owner ruling counted as passing from the question's text, with its state unread;
- a request asked for, or sent, to prepare a state the recipe rebuilds for free;
- a held-out case read, or a model request sent, by the reviewer;
- a finding without its anchor or the standard it breaks;
- an edit to the rule, its entries, its cases or its config.
