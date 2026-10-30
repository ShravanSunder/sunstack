---
name: skill-design
description: "Use when a skill change needs its design before any file is edited: a new skill, a behavior change, or an observed skill failure to fix. Not for writing, judging or shipping it."
---

# Skill Design

A skill change is designed before any of its files change, in this order: requirements, then evidence, then generalization, then the design that `skill-creation` will write. The design set carries that work in four parts (requirements, specification, skill design and skill verification), each answering to the one before it, and one page built from them, so a reviewer can judge the change before it exists.

This skill holds the run's conduct and procedure; the standards a skill's text must meet are read from `domain-skill-crafting`, the hidden root this plugin's skills load. MUST load `../domain-skill-crafting/SKILL.md` and return its model and the topics whose conditions hold for this run; each step below loads the topic it applies.

## Stance

Work on exactly one named skill per run; a change that spans several skills gets one run per skill in its design set. Portfolio inventory, duplicate-surface archaeology, and "which skills should exist" belong to `skill-audit`.

Open the current files of every skill the change touches before saying anything about them. A claim about text you have not read in this run is not made; "I already know this skill" is not a read.

## Workflow

Steps 1 to 6 produce the design set and take it to `skill-review`'s design stage before any skill file changes. `skill-creation` then writes the files inside the accepted set; proof and implementation review come after it. A mechanical change ends at step 1.

To revise a design set, for review findings or a changed need, read the set at its current revision first. Redo each step whose returns the revision changes, take the other steps' returns from the set, and go on to step 6.

### 1. Classify, and name the promise

IF the request is to judge an existing skill or a draft rather than change it, use `skill-review` and return its verdict instead of continuing here.

MUST load `../domain-skill-crafting/references/change-classes.md` and return the change's class with its claim. What the class causes here: a `mechanical` change gets no design set, so return it to whoever asked with its class and claim, for `skill-creation` to write with static validation; a `behavior-changing` change gets the design set and the design review; a `scoped` change gets the design set and the design review in its scoped form.

For a behavior-changing or scoped change, name the run `create` or `update`. Search the owning plugin or skill folder for an existing skill or reference that already owns the behavior, and return the matching paths or `none`. Name the reusable behavior in one sentence: "This skill helps agents reliably do X when Y happens." State the success definition in the user's own words: the observable behavior and the situation that matter. Name who reaches the skill (an agent unprompted, another skill, a person) and when, and what the change leaves alone. Ask the user when missing meaning would materially change the intended behavior; do not derive the need from the current skill's wording alone.

An invitation like "just quickly fix it" that names neither a success definition nor an authoring basis is not a commission for an `update` run.

Completion: the class and its claim are returned. A mechanical change has gone back to whoever asked, and the run ends. Otherwise the classification, the owning paths or `none`, the baseline (the current skill files and behavior the change starts from, or `none`), the reusable behavior, the success definition, who reaches the skill and when, and the non-goals are named.

### 2. Gather the evidence, and the proof posture

IF the work the skill teaches lives in someone's head and is not yet understood, interview the user until you can restate it and they confirm the restatement; return the confirmed restatement. IF it lives in artifacts the run has not read, read them and return what each establishes with its path. Record each signal the change rests on, from sessions, retrospectives, an audit, a reproduced failure or the user's direction, with its date and source.

Name the authoring basis: `observed failure` or `user-directed intent`. MUST load `../domain-skill-crafting/references/proof-claims.md` and return the proof shape for the skill's type and the strongest posture its evidence supports. Then, by basis:

- **`user-directed intent`** may be designed and drafted from an approved success definition without RED; its evaluation may come before or after that draft.
- **`observed failure`** attempts faithful reproduction before any causal fix is claimed. IF the basis is `observed failure`, load `references/proof-runs.md`, attempt the reproduction as that reference carries out its runs, and return the reproduction result, the representative-hypothesis boundary, and the decisions open to the user; a result other than `reproduced` goes to the user with those decisions.

"I already know the wording problem" does not skip the reproduction.

Completion: the authoring basis, each signal with its date and source, the reproduction result when one ran, the user's decision when one was needed, and the strongest honest proof posture are returned.

### 3. Specify, and generalize

State what the skill must do, and each standard it will state, as one self-contained sentence each. IF the skill states a rule, or the change starts from one product, library, repository or incident, load `../domain-skill-crafting/references/generalization.md` and return each rule with its two transfer cases and its verdict.

Completion: every obligation and standard is one sentence, and every rule carries its two transfer cases and a passing verdict.

### 4. Design the skill

IF the core's security condition holds for this change, load `references/security-gate.md` before outlining any sensitive surface, and return its decision for each sensitive surface in scope, or none, for the skill design part.

Then design each surface with the topic that governs it:

- **The trigger.** MUST load `../domain-skill-crafting/references/descriptions-and-invocation.md` and return the invocation decision and the description written for it. IF client-specific invocation controls are requested, load `../domain-skill-crafting/references/platform.md` and return the platform encoding.
- **The main path.** MUST load `../domain-skill-crafting/references/main-path.md` and return the standards that apply to the lens, the route, and each branch. IF the classification is `create` or the main path's shape is contested, load `../domain-skill-crafting/references/worked-examples.md` and return the shape choice for this skill. MUST load `../domain-skill-crafting/references/steering.md` and return each wording choice with the observed failure, representative hypothesis, or user-approved success gap it answers, and the repair that topic matches to it.
- **The calls and the depth.** MUST load `../domain-skill-crafting/references/calls-and-placement.md` and return each call site in its form, the placement decision for the skill's depth, the caller and callee contract for each reference with the step-2 record or named source it is taught from, and, when several consumers need one stable output shape or a tool validates the structure, that shape's owner and its consumers.

Name the runs in sequence, each targeting one named skill, with each run's surface allocation: which of the trigger, main path, depth and proof carries each part of the change.

Completion: each part of the design names the root topic that governs it, every standard those topics returned is kept with the line of the design that shows it, and, when the security gate ran, its return covers every sensitive surface in scope.

### 5. Plan the verification

MUST load `../skill-rules/references/decision-matrix.md`, put each requirement and each standard the design set states through its questions, and return each one's outcome with the properties it was decided on. Each outcome maps to a route: deterministic to a mechanical rule, model-judged to a judged rule, review-only to a review check, eval to an eval, and prose to no proof needed. Anything no route can show is named as unverified, with the reason. A rule route stays pending until `skill-rules` has made that rule. A wording the matrix finds unready goes back to step 3. Carry step 2's proof posture into this part as each run's proof plan.

IF a run writes or alters the description of a model-invocable skill, load `../domain-skill-crafting/references/descriptions-and-invocation.md` and return that run's two-prompt trial as its two-prompt section teaches it: the true prompt and the near miss in the words a user would type, each to run in a fresh session that sees the skill's description beside its neighbours and nothing of this design set, with the loaded skill read from the host's record. A skill hidden from model invocation records its trial as `not applicable`.

Completion: every requirement and standard has its route and the properties it was decided on, every changed description has its trial planned or `not applicable`, and every unverified item is named with its reason.

### 6. Present the design set, and have it reviewed

MUST load `references/design-set.md` and return the four parts with every slot filled or its exact unknown, in the form that reference decides. MUST load `references/design-page.md` and return the page with its inspection results. Then use `skill-review` at its design stage and return its implementation decision, unless the user explicitly says no review is needed. A request explicitly skips review only when it names the design review and declines it ("skip the design review"). Wanting speed, "just implement it", or "no extra review ceremony unless the skill requires it" is not a skip: this skill requires the review, so say so and run it.

Accepted findings inside the settled design return to the step that owns them, and the revised set comes back through this step; a finding that changes design meaning, scope, contract, or a user decision goes to the user first.

Completion: the design set and its page exist, and the review decision is `accepted-to-implement`, or the user named the design review and declined it.

## Completion Blockers

The run is not done while any of these hold:

- a behavior-changing design lacks a success definition or an authoring basis;
- an observed failure's reproduction result is hidden instead of going to the user with its decisions;
- a sensitive surface was outlined before the security gate returned its decision;
- the design set is missing a part, a slot or its page;
- the design review was skipped without the user naming it and declining it.
