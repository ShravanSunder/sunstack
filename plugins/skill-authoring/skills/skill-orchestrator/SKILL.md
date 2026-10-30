---
name: skill-orchestrator
description: "Use when one skill change has to go all the way from need to shipped, or one run of an accepted multi-run skill design set has to be carried through. Not for a single step alone."
---

# Skill Orchestrator

A skill change is a small delivery with three gates: an accepted design set before files change, proof before review, and an independent review before ship. This skill carries one change through those gates and keeps the record honest. It does not write the design, the files, or the review itself; `skill-design`, `skill-creation`, and `skill-review` do. It runs the proof the design set plans with `skill-design`'s `proof-runs.md`, judges each claim by `domain-skill-crafting`'s proof standards, and checks each result before moving on.

## Practices This Skill Carries

- **Read before claiming.** Open the current files of every skill a step touches before stating anything about them. A claim about text not read in this run is not made.
- **Keep the record.** The design set's run status shows each run as `proposed`, `implemented`, `reviewed`, or `shipped`. Report only the state a run has reached; a proposed change is never described as shipped.
- **Independent check.** Review always runs in agents that did not write the change.
- **Ask for everything else.** For any other working practice — a log or trace, a decision format, commit or PR conventions, prose polishing — ask the user how they want it instead of assuming one.

## Classify The Run

A run starts from a `skill-audit` recommendation the user approved, or from a change the user names.

- `create` or `update` of one named skill: MUST load `../domain-skill-crafting/SKILL.md` and return its model and the topics whose conditions hold for this run. Then MUST load `../domain-skill-crafting/references/change-classes.md` and return the change's class with its claim. A `behavior-changing` or `scoped` change walks the workflow below.
- `evaluate` an existing skill or a draft: use `skill-review` (implementation stage for files on disk, design stage for a draft in the conversation) and end at its verdict and the run summary. An evaluation gains no implementation or shipping authority, and an invitation like "just quickly fix it" that names no success definition or authoring basis is not a commission.
- A question about which skills should exist, merge, or go: use `skill-audit`.
- A `mechanical` change (typo, formatting, version, metadata) goes straight to `skill-creation` with its classification claim, for static validation only: no design set and no reviews. Its run then continues at step 6, which records that boundary.
- One slice of an accepted multi-run design set: read the design set and check its coordination slot against the current base. MUST load `../skill-review/references/design-review.md` and return whether its Acceptance Binding still covers the design set's current meaning. When it does not, nothing is edited, and the change goes where the binding sends it. Then take steps 1–2 from the design set and continue at step 3.

## Workflow

### 1. Read and name the target

Open the current files of the target skill and of every skill or file the request names. Name exactly one skill target and its owner plugin or folder. Completion: target, owner, and the files read are listed.

### 2. Design

Use `skill-design` and return the design set and its design-review decision. When you state the route or plan, name `skill-review`'s design stage as the design reviewer. Completion: the design set exists, its runs show `proposed`, and its design-review decision is `accepted-to-implement` or explicitly skipped by the user.

### 3. Write

Use `skill-creation` inside the accepted design set and return the diff, any deviation from the design set, and the run status moved to `implemented`. Completion: the diff is compared with the accepted design set.

### 4. Prove

MUST load `../skill-design/references/proof-runs.md`, carry out the proof the design set plans by its procedure, and return each run's record and check results. MUST load `../domain-skill-crafting/references/proof-claims.md`, judge the claim by its standards, and return the strongest supported claim and its evidence. MUST load `../skill-rules/references/running-rules.md`, run the rules on the change's files, and return its reading with the proof result: the run's status, each finding with your call, each `uncertain` piece with your decision, and each gap. An `error` finding, or a refusal the reading traces to the change, sends the change back to step 3 for its fix, and this step runs again on the fixed files. Judged findings and decided `uncertain` pieces go to step 5 with your calls. A rule is reported as run only when the engine's own report shows that it ran. Completion: proof ran against the current files, or the user accepted a named proof gap; and the rules' reading, from a run on the current files, stands with the proof result, with no `error` finding left and each gap named with its reason.

### 5. Assess

Open the diff and the decisive proof yourself before any independent review. Check them against:

- the success definition and the accepted design set, including its run allocation;
- the four surfaces still aligned, and every changed reference and caller current;
- proof that observes the claimed behavior, with every check read from its run and static results labeled as static;
- the rules' reading from step 4: each judged finding confirmed at its line or explained, and each `uncertain` piece's call holding against its standard;
- ownership and names that match the design set;
- no complexity, compatibility path, check, schema, or mechanism outside the accepted boundary;
- when this run depends on earlier runs of the design set, those runs are at their current revisions and the combined behavior is proven, not only this run's local proof.

Missing or stale proof and bounded defects go back to step 3 or 4. A broken assumption, an undecided user choice, a public-contract change, or a wider target stops the work: bring the user the decision. MUST load `../domain-skill-crafting/references/steering.md` before accepting for independent review, run its deletion test on the changed text, and return each sentence that fails it, or none. Delete each sentence that fails; a deletion that affects meaning needs fresh proof and assessment. Completion: `accepted-for-independent-review`, `correction-required`, or `design-stop`, with the diff and proof you inspected and your reasons.

### 6. Review the implementation

IF step 5 returned `accepted-for-independent-review` and the change is behavior-changing, use `skill-review` at the implementation stage with the proof and your assessment, unless the user explicitly skipped review. When you state the route or plan, name `skill-review`'s implementation stage as the reviewer; "commission implementation review from agents who did not write the change" describes independence, not a reviewer, and does not satisfy this step. IF the change is mechanical or the user explicitly skipped implementation review, record that boundary in the run summary, and in the design set when the change has one, leave the run status at `implemented`, and continue to step 7; never mark the run `reviewed`. Route accepted findings to the step that owns them: a design mismatch to step 2, wording or placement to step 3, proof honesty to step 4, an assessment gap to step 5, and the ship surface to step 7. A correction gets fresh proof and a fresh assessment before review refreshes its coverage, under `skill-review`'s convergence rule. Completion: the review returned `great` and the run status is `reviewed`; or the mechanical or user-skipped boundary is recorded; or the loop stopped on `not-converging` with the user's decision.

### 7. Ship

IF shipping, load `../domain-skill-crafting/references/platform.md` and return the facts and standards for each platform surface the change touches. Then carry out the shipping actions for those surfaces, and return a report line for each in that topic's reporting form:

- Run the validators: the Codex quick validator for the target skill, the Codex `skill-creator`'s validation scripts when they fit the repository, and Claude plugin validation when the owning plugin supports Claude.
- Move the versions as that topic's version standard calls for: the source plugin's, and the Claude manifest's and the Claude marketplace's with it.
- Write the dated changelog entry.
- IF the user scoped release or readback, refresh the installed caches, and report the refresh on its own line.

MUST load `../domain-skill-crafting/references/security.md` and return its public-safety standard applied to what ships, meaning the changed files, the changelog entry and the report lines: each home-cache path or local cache identifier they hold, or none.

Completion: the run status is `shipped` only once the change is released or merged as the user scoped.

## Run Summary

Return a run summary whenever the run evaluates or edits a skill, commissions review, or runs proof. Omit lines for branches that did not run instead of filling them with `n/a`.

```text
target: <owner plugin or folder / skill>
classification: create | update | evaluate
outcome: <what changed, verdict, or blocker>
success and basis: <success definition; observed failure | user-directed intent>  # create/update only
run status: <per run: proposed | implemented | reviewed | shipped>
review: <stages run, checks, and complete | partial | blocked results>                   # only if review ran
proof: <claim, evidence, and remaining gap>                                              # only if proof ran
rules: <ran: status, findings with calls, uncertain decided, gaps | not run: reason>     # only if proof ran
security: <allowed | disallowed | blocked | deferred>                                    # only if a sensitive surface was routed
deviations: <accepted design set boundary or review deviation>                           # only if one occurred
```

## Completion Blockers

The run is not done while any of these hold:

- a claim was made about a skill file not read in this run;
- a behavior-changing change reached implementation without an accepted design review or an explicit user skip;
- implementation review started before fitting proof and a source-backed assessment;
- the assessment omitted the current diff, the actual proof, the accepted design set, complexity, or ownership, or, for a run that depends on earlier runs, their current revisions and combined behavior;
- an accepted correction reached refreshed review without fresh proof and reassessment;
- a behavior-changing change is reported shipped without behavior proof or a user-accepted proof gap, or without a `great` implementation review or an explicit, recorded user skip;
- a run status is reported beyond the state the run reached;
- the `rules:` line reports a rule as run or passing that the engine's report doesn't show, an `uncertain` piece as a pass, or an `error` finding left standing at step 5;
- a review round ran after `not-converging`, or outside the accepted boundary without the user's decision;
- required platform validation failed, or was skipped without a stated reason.
