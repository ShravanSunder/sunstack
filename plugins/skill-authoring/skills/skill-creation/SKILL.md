---
name: skill-creation
description: "Use when designing or writing one named skill, or its skill spec, especially when its trigger, main path, references, steering, or proof plan need judgment. Not for judging a finished skill (skill-review) or for choosing which skills should exist (skill-audit)."
---

# Skill Creation

This skill applies the standards in `domain-skill-crafting`, the hidden root this plugin's skills load, to one skill change: its spec, then its files. It holds the run's conduct and procedure; the standards themselves are read from the root. MUST load `../domain-skill-crafting/SKILL.md` and return its model and the topics whose conditions hold for this run; each step below loads the topic it applies.

## Stance

Work on exactly one named skill per run. Portfolio inventory, duplicate-surface archaeology, and "which skills should exist" belong to `skill-audit`.

Open the skill's current files before saying anything about them. A claim about text you have not read in this run is not made; "I already know this skill" is not a read.

Whoever writes a change never reviews it. Review runs in agents that did not write it (`skill-review`).

## Workflow

Steps 1 to 6 produce the skill spec: the proposal a reviewer can judge before any skill file changes. Step 7 writes the files inside the accepted spec. Proof and independent implementation review come after this skill: proof is carried out with `references/proof-runs.md` and its claim judged by the root's proof standards, and `skill-review` reviews the changed files.

A run implementing one slice of an accepted multi-run skill spec reads that spec doc and takes the returns of steps 1 to 6 from it, quoting the slice's success definition, authoring basis, surface allocation, proof posture, and the decision rows it must honor, and checks the doc's coordination slot before editing. Before editing, it also confirms the spec's acceptance still covers the spec's current meaning, under the acceptance binding in `../skill-review/references/spec-review.md`: formatting, typo, link, process-only changes and verified remediations keep the acceptance; any other change since acceptance, or one of uncertain effect, goes back to spec review before any skill file is edited. The doc is the commission for that slice, and each slice still names exactly one skill target.

### 1. Name the promise and success

Classify the run as `create` or `update`. IF the request is to judge an existing skill or a draft rather than change it, use `skill-review` and return its verdict instead of continuing here. Search the owning plugin or skill folder for an existing skill or reference that already owns the named behavior and return the matching paths or `none`. Name the reusable behavior in one sentence: "This skill helps agents reliably do X when Y happens." Before behavior-changing authoring, state a concise, human-readable success definition that names the observable behavior and situation that matter. Ask the user when missing meaning would materially change the intended behavior; do not derive the need from current skill wording alone.

An invitation like "just quickly fix it" that names neither a success definition nor an authoring basis is not a commission for an `update` run.

Completion: classification, owner, reusable behavior, baseline (the current skill files and behavior the change starts from, or `none`), success definition, and the surface allocation (which of the four surfaces carries each part of the change) are named.

### 2. Choose the authoring basis and proof posture

IF the work the skill teaches lives in someone's head and is not yet understood, interview the user until you can restate it and they confirm the restatement; return the confirmed restatement. IF it lives in artifacts the run has not read, read them and return what each establishes with its path. `Build the main path`, `Place the depth`, and `Implement` consume these returns.

Then classify the change, and classify why you are making it. MUST load `../domain-skill-crafting/references/change-classes.md` and return the change's class with its claim and, for behavior-changing work, its basis: `observed failure` or `user-directed intent`. This session makes the call about its own work. What the class causes here: `mechanical` gets static validation only and skips both reviews; `behavior-changing` gets both review stages and the proof posture below; `scoped` narrows each review stage to its scoped form and leaves the proof rules unchanged.

IF the change is behavior-changing, load `../domain-skill-crafting/references/proof-claims.md` and return the proof shape for the skill's type and the strongest posture its evidence supports. Then, by basis:

- **`user-directed intent`** may draft from an approved success definition without RED; its evaluation may come before or after that draft.
- **`observed failure`** attempts faithful reproduction before any causal fix is claimed. IF the basis is `observed failure`, load `references/proof-runs.md`, attempt the reproduction as that reference carries out its runs, and return the reproduction result, the representative-hypothesis boundary, and the decisions open to the user; a result other than `reproduced` goes to the user with those decisions.

"I already know the wording problem" does not skip the reproduction.

Completion: authoring basis, reproduction result when applicable, user decision, and strongest honest proof posture are explicit, and each sourcing return that ran exists. The classification carries the claim the root's change-class standards require of its class.

### 3. Design the trigger

MUST load `../domain-skill-crafting/references/descriptions-and-invocation.md` and return the invocation decision and the description written for it. IF client-specific invocation controls are requested, load `../domain-skill-crafting/references/platform.md` and return the platform encoding. Completion: invocation capabilities are named, and the description and any platform encoding keep every standard those topics returned.

### 4. Build the main path

Write the body's lens, its route, its call sites, and its wording.

- MUST load `../domain-skill-crafting/references/main-path.md` and return the standards that apply to the lens, the route, and each branch.
- IF the classification is `create` or the main path's shape is contested, load `../domain-skill-crafting/references/worked-examples.md` and return the shape choice for this skill.
- MUST load `../domain-skill-crafting/references/calls-and-placement.md` and return each call site written in its form.
- MUST load `../domain-skill-crafting/references/steering.md` and return each wording choice with the observed failure, representative hypothesis, or user-approved success gap it answers, and the repair that topic matches to it.

Completion: every standard those topics returned is kept, with the line of the body that shows it.

### 5. Place the depth

MUST load `../domain-skill-crafting/references/calls-and-placement.md` and return the placement decision for the skill's depth, the caller and callee contract for each reference, and, when several consumers need one stable output shape or a tool validates the structure, that shape's owner and its consumers. A draft shown in the conversation still shows each file it would create under its own path. Write each teaching reference from the step-2 sourcing records or a named source. Completion: the placement decision is returned, and every placement standard it applies is kept, with the file and line that show it.

### 6. Write the skill spec and get it reviewed

MUST load `references/skill-spec.md` and return the skill spec, in the conversation or as a doc as that reference decides. IF the change is behavior-changing, before any skill file is edited and unless the user explicitly says no review is needed, use `skill-review` at its spec stage and return its implementation decision. A request explicitly skips review only when it names the spec review and declines it ("skip the spec review"). Wanting speed, "just implement it", or "no extra review ceremony unless the skill requires it" is not a skip: this skill requires the review, so say so and run it. Accepted findings inside the settled design return to the step that owns them; a finding that changes design meaning, scope, contract, or a user decision goes to the user first. Completion: the spec is written, and its review decision is `accepted-to-implement`, explicitly skipped by the user, or not applicable because the change is mechanical.

### 7. Implement

IF the core's security condition holds for this change, load `references/security-gate.md` before outlining or writing any sensitive surface and return its allowed, disallowed, blocked, or deferred decision for each sensitive surface in scope, or none; the root's security standards say which decisions let a write go ahead. MUST load each topic under `../domain-skill-crafting/references/` that the core's index selects for the surfaces this run writes, unless an earlier step of this run loaded it, and return the standards that apply; the written files keep them. When the run creates a skill, its folder may be scaffolded with the Codex `skill-creator`'s scripts when they fit the repository. Then edit the skill surface inside the accepted boundary, and update the spec's run status to `implemented`. Completion: compare the implemented diff against the accepted spec boundary; name a deviation when one exists, and name the proof and implementation review still owed. Return them with the step-2 proof posture and, when the security gate ran, its decision.

## Completion Blockers

The run is not done while any of these hold:

- the written `SKILL.md` breaks a root main-path standard on its mental model or its all-run spine;
- behavior-changing authoring lacks a human-readable success definition or authoring basis;
- an observed-failure path hides a failed, missing, or inconclusive reproduction result instead of returning the user decision;
- a branch breaks a root main-path standard on branches;
- a promised stage, a branch, or a shape-only reference breaks a root placement standard on teaching owners or shape-only references;
- a dispatch site breaks a root call standard on dispatch;
- a behavior-changing change reached implementation without an accepted spec review or an explicit user skip;
- implementation completed without comparing the diff to the accepted spec boundary;
- a classification breaks the root's change-class standard on claims;
- a sensitive surface breaks the root's security standard on decision timing;
- a proof claim breaks the root's proof standard on static validation.
