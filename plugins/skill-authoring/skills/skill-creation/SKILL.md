---
name: skill-creation
description: "Use when writing one named skill's files from its accepted design, or making a mechanical edit to a skill (typo, formatting, version, metadata). Not for designing or judging a skill."
---

# Skill Creation

This skill writes one skill's files inside a boundary fixed before the write: the accepted design set for a behavior-changing or scoped change, or the classification claim for a mechanical one. The change's class picks the boundary, and the run ends by comparing the diff with it.

This skill holds the run's conduct and procedure; the standards the written text must meet are read from `domain-skill-crafting`, the hidden root this plugin's skills load. MUST load `../domain-skill-crafting/SKILL.md` and return its model and the topics whose conditions hold for this run; each step below loads the topic it applies.

## Stance

Work on exactly one named skill per run; a design set that spans several skills is written one run at a time, each run naming its one skill.

Open the skill's current files before saying anything about them. A claim about text you have not read in this run is not made; "I already know this skill" is not a read.

## Workflow

Admit the change by its class, gate its sensitive surfaces, write, self-check, then compare the diff with its boundary and return. Proof and independent implementation review come after this skill, and the return names what is still owed.

### 1. Admit the change by its class

MUST load `../domain-skill-crafting/references/change-classes.md` and return the change's class with its claim: the claim its design set or its caller supplies, checked against that topic, or the claim you make from the request and the files it names. Then, by class:

- **Behavior-changing or scoped.** The change is written only inside its accepted design set: the set's review record shows it `accepted-to-implement`, or shows that the user skipped its design review. With no such set covering this run, stop and return the change to `skill-design` for its design; nothing is written. With one, read it, quote this run's success definition, authoring basis, surface allocation, proof posture, sensitive-surface decisions and the decision rows it must honor, and check its coordination slot against the current base. MUST load `../skill-review/references/design-review.md` before any file is edited, and return whether its acceptance binding still covers the set's current meaning; when it doesn't, nothing is written, and the change goes where the binding sends it.
- **Mechanical.** No design set is needed. The claim is the boundary: the surfaces it names are the only ones the run writes. The run gets static validation only, and no review is owed.

Completion: the class and its claim are returned, and the run is admitted with its boundary (this run of the accepted design set, or the mechanical claim), or it has stopped and the change has gone back to `skill-design` or where the binding sends it.

### 2. Gate sensitive surfaces before writing

IF the core's security condition holds for this change, load `../domain-skill-crafting/references/security.md` and return each sensitive surface the write will touch, with the standards its decision must meet. Then, by class:

- **Behavior-changing or scoped.** Each surface's decision comes from the design set's skill design part. A surface the set has no decision for is not written: stop and return the change to `skill-design`.
- **Mechanical.** MUST load `../skill-design/references/security-gate.md` and return its decision for each surface before writing that surface. The change still needs no design set.

Completion: every sensitive surface the write will touch has its decision, from the design set or the gate, and the root's security standards have said which decisions let their surfaces be written; or no surface is in scope.

### 3. Write

MUST load each topic under `../domain-skill-crafting/references/` that the core's index selects for the surfaces this run writes, unless an earlier step of this run loaded it, and return the standards that apply; the written files keep them. Then edit only the surfaces the boundary admits (this run's surface allocation in the design set, or the surfaces the mechanical claim names) and step 2 lets be written. IF the write reaches a sensitive surface step 2 holds no decision for, stop writing that surface and take it back to step 2. A draft shown in the conversation still shows each file it would create under its own path. When the run creates a skill, its folder may be scaffolded with the Codex `skill-creator`'s scripts when they fit the repository.

Completion: each surface the boundary admits is written or held back by its step 2 decision, and each standard the loaded topics returned is kept, with the line that shows it.

### 4. Self-check

MUST load `../skill-rules/references/running-rules.md`, run the rules on the files this run changed, and return its reading beside the diff: the run's status, each finding with your call, each `uncertain` piece with your decision, and each gap. Act on it before the diff comparison:

- an `error` finding, or a refusal the reading traces to this change, is fixed, and the self-check runs again on the fixed files;
- a `warn` finding is fixed, or named with the reason it stays;
- a judged finding is confirmed at its line and fixed where this run's boundary admits the fix, named as a candidate where it doesn't, or explained where it doesn't hold;
- an `uncertain` piece is yours to decide against its standard: fix or explain it, and report your call.

Any gap, or `rules: not run`, stays as the reading states it, with its reason, and the run goes on to step 5.

Completion: the reading from the self-check's last run, made after the last edit, stands beside the diff; no `error` finding or refusal traced to this change remains; and each warning, judged finding and `uncertain` piece carries its call (fixed, named or explained) for step 5.

### 5. Compare and return, by class

- **Behavior-changing or scoped.** Compare the diff with this run's boundary in the accepted design set, and name each deviation with its reason, each item the self-check left among them. Set the run's status in the set to `implemented`. Return the diff, each deviation, the self-check's reading, the proof posture the set records, the sensitive-surface decisions the write used, and the proof and implementation review still owed.
- **Mechanical.** Compare the diff with its classification claim: it touches only the surfaces the claim named. A diff that touches a surface the claim didn't name is reclassified at step 1, and its write doesn't stand until the new class admits it. Return the diff, the static validation result, the self-check's reading with the reason for each item it left, any security decision, and that no review is owed.

Completion: the diff is compared with its boundary, and the return for its class is complete.

## Completion Blockers

The run is not done while any of these hold:

- a behavior-changing or scoped change was written without an accepted design set covering its run, or with a sensitive surface that set did not decide;
- a mechanical change was written outside the surfaces its claim names;
- the diff was not compared with its boundary: this run of the accepted design set, or the mechanical claim;
- a rule was reported as run, or as passing, without the self-check's report showing it, or an `uncertain` piece or a gap was reported as a pass;
- an `error` finding was left unfixed at the diff comparison;
- the written `SKILL.md` breaks a root main-path standard on its mental model, its all-run spine or its branches;
- a promised stage, a branch, or a shape-only reference breaks a root placement standard on teaching owners or shape-only references;
- a dispatch site breaks a root call standard on dispatch;
- a classification breaks the root's change-class standard on claims;
- a sensitive surface breaks the root's security standard on decision timing;
- a proof claim breaks the root's proof standard on static validation.
