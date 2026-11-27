# Specification

## What the change must do

1. The standard in `domain-skill-crafting` teaches a principle call as a load at its moment with a named result, and drops the rules that forbade loading a principle.
2. Every principle call site in the 30 maintained citing skills becomes a load in that form, keeping its moment, its principle and every obligation of its action, except where one decision is already loaded on the same path (S5; one such pair, D10). `call-sites.md` lists each occurrence with its moment class, moment and return.
3. A call site whose moment comes in only some runs of its step stays conditional, so a run that never reaches the moment loads nothing.
4. A call site inside a reference keeps the reference's own entry condition; it needs an `IF` only when its moment is narrower than the reference's.
5. Each rewritten call names its target in backticks right after `load`, as reference loads already do: `` `../principle-<name>/SKILL.md` `` (one more `../` from `references/`) inside `sunstack-dev`, and `` `sunstack-dev:principle-<name>` `` in `sunstack-workflow-v2`. That is the form the active lint load selector and the test-suite load parser read.
6. A principle's references to its sibling principles stay citations.
7. The reviewer check that judges principle calls (`skill-review`'s `placement-and-calls`) judges loads by the new standard, and keeps judging sibling citations.
8. The maintainer docs that describe principle citations match the new standard in the same change.

## Standards the change states

These replace `calls-and-placement.md` "Citations of principles" (lines 37–47 at `9985ee4c`), under a new heading "Loads of principles".

- S1. A principle is loaded at the moment its judgment changes how an action is done; a parenthetical link to a principle at the end of a sentence is not a call.
- S2. A principle load where every run of the step reaches the moment reads `MUST load <principle> and return <result>`; where only some runs do, it reads `IF <observable moment>, MUST load <principle> and return <result>`. A moment written as "before X" or "when X" is conditional whenever some runs of the step never reach X.
- S3. A principle load's result names what applying the principle produced or checked at this step, in words other than the principle's name, and keeps every obligation the step already set; "return the principle", "apply it" or a result that restates the name is incomplete.
- S4. A principle is loaded only where its judgment changes how this action is done.
- S5. A principle is loaded once per decision; when a skill used at that step already loads it for that decision, the load isn't repeated.
- S6. A principle load's target resolves from the file that holds it: a relative path inside the same plugin, or a `sunstack-dev:principle-<name>` name resolved through the calling plugin's documented base-root lookup.
- S7. A principle load never replaces a load call for the skill's own procedure.
- S8. A principle that points at a sibling principle cites it: one sentence naming the moment and the action, followed by a relative link.
- S9. A principle's first body line is its own read rule, so a full read earlier in the session satisfies a later load of the same principle.

Glossary changes (`glossary.md:21–24`):

- Load mode: unchanged; it names the two forms for references, `MUST load` and `IF <observable predicate>, load`.
- Principle: a skill hidden from model invocation that teaches one engineering judgment, opens with its own read rule, and is loaded by other skills at the decision it informs.
- Principle load: the call form for a principle, `MUST load <principle> and return <result>`, opened with `IF <moment>` when only some runs reach the moment.
- Citation: the form a principle uses to point at a sibling principle.

`descriptions-and-invocation.md:22` becomes: "A principle and a domain skill, which other skills load, stay hidden from model invocation."

## Rules with their transfer tests

Each case pairs a materially different toolkit where the rule should hold with a bad choice the rule never names.

**S1–S2 (load at the moment, conditional when the moment is).**
- Case one: a Go platform team's release skill whose step ships both code-only and schema changes, with `principle-own-the-migration` behind "IF the release includes a schema change". A code-only release never loads it; a schema release loads it before merge. Holds.
- Case two: a skill that lists its principles in a "Principles used" footer, or in a frontmatter field, and loads none at a step. No moment is named and nothing is returned, so S1 and S2 reject it. Holds.
- Verdict: passes.

**S3 (a named result, obligations kept).**
- Case one: a data team's debugging skill: `IF the fix touches shared state, MUST load principle-design-for-concurrency and return the invariant and the interleaving that breaks it`. The result can't be written without the read. Holds.
- Case two: a rewrite that turns "exercise the real boundary and keep the oracle, then the red or a no-red gap" into "return the red, or that none was seen". The no-red branch no longer requires the exercise; S3 rejects it for dropping an obligation. Holds.
- Verdict: passes.

**S4 (only where it changes the action).**
- Case one: a mobile team's release checklist loads `principle-prove-it-works` at "verify on a device", where it decides what counts as proof. Holds.
- Case two: a skill loads the same principle at "bump the version number", where no judgment of proof is made. S4 rejects it. Holds.
- Verdict: passes.

**S5 (once per decision).**
- Case one: a review skill whose step loads a reference that already loads `principle-verify-before-accepting` for accepting the same finding; the step drops its own load. Holds.
- Case two: a caller and callee each load it for the same acceptance, so a reviewer sees two calls for one decision. S5 rejects the second. Two distinct decisions (accepting a finding; closing a corrected finding) each keep their load, and the second reuses the full read under S9. Holds.
- Verdict: passes.

**S6 (resolves from the file).**
- Case one: an infra toolkit split into a base plugin and a workflow plugin, whose workflow skill loads `base:principle-x` through its documented base-root lookup. Holds.
- Case two: a skill that loads a principle by an absolute cache path with a version number in it. It doesn't resolve on another install; S6 rejects it. Holds.
- Verdict: passes.

**S7 (not a substitute for the skill's own procedure).**
- Case one: a deploy skill keeps `MUST load references/rollback.md` for its rollback steps and loads `principle-design-for-failure` for the judgment of unknown outcomes. Holds.
- Case two: a skill drops its rollback reference and points at the principle instead. S7 rejects it. Holds.
- Verdict: passes.

**S8 (sibling citations stay citations).**
- Case one: a security toolkit's `principle-least-privilege` points at `principle-audit-trail` when a grant must be recorded. The pointer stays a citation; a load would chain a second full principle into every read of the first. Holds.
- Case two: a principle that writes `MUST load principle-x` for a sibling, so one read recursively loads its neighbours. S8 rejects it. Holds.
- Verdict: passes.

**S9 (a full read this session satisfies a later load).**
- Case one: a frontend toolkit's agent read `principle-prove-it-works` in full while verifying one screen; a second load later in the same session for another screen reuses that read. Holds.
- Case two: the agent has only a summary of the principle, read part of it, or read it in full in a previous session. None is a full read this session, so the load requires a fresh full read. Holds.
- Verdict: passes.

**Invocation wording (`descriptions-and-invocation.md:22`).**
- Case one: a toolkit whose hidden principles and domains are read by path from other skills. Holds.
- Case two: a principle made model-invocable so it loads on its own description. The rule rejects it. Holds.
- Verdict: passes.

## The rewrite, by shape

Each site is rewritten by one of three shapes. Before → after, from current source:

1. **The moment is a condition, stated first.** `practices-research/SKILL.md:26`: "Before accepting a load-bearing conclusion, name the anchor you opened for it and what that anchor doesn't cover ([verify before accepting](../principle-verify-before-accepting/SKILL.md))." Some research runs accept no load-bearing conclusion, so the call is conditional: "IF you are about to accept a load-bearing conclusion, MUST load `../principle-verify-before-accepting/SKILL.md` and return the anchor you opened for it and what that anchor doesn't cover."
2. **The moment is a condition inside a step.** `practices-how/SKILL.md:22`: "When a term is overloaded, or the code and the docs use different words for what may be one thing, state what it refers to and what makes two of them the same before you explain with it ([define the domain first](../principle-define-the-domain-first/SKILL.md))." → "IF a term is overloaded, or the code and the docs use different words for what may be one thing, MUST load `../principle-define-the-domain-first/SKILL.md` and return what it refers to and what makes two of them the same, before you explain with it."
3. **The step is the moment.** `role-implementer/SKILL.md:20`: "Build a scenario that can fail for the required wrong behavior, exercise the real boundary and keep its assertion oracle and observed red, or name that no pre-fix red was seen (write tests that can fail (`sunstack-dev:principle-write-tests-that-can-fail`))." Every implementation run builds such a scenario, so the load is unconditional and comes first: "MUST load `sunstack-dev:principle-write-tests-that-can-fail` before you build the scenario, and return a scenario that can fail for the required wrong behavior, exercised at the real boundary, with its assertion oracle kept, and either its observed red or a statement that no pre-fix red was seen." Read with an observed red and with none: both still require the real-boundary exercise and the oracle.

The plain-words link text of today's citations (for example "a passing test proves only what it observes") is dropped from the call; its meaning is the principle's to teach.
