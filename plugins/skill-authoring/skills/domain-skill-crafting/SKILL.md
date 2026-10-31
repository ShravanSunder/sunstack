---
name: domain-skill-crafting
description: "Use when writing, designing, reviewing or auditing a skill, or judging any part of a skill's text against the skill-writing standards."
disable-model-invocation: true
---

# Skill Crafting

Read this skill in full before the skill-text work it governs; your own full read earlier this session counts.

## The model

A skill makes an agent follow a predictable process; predictable means the same process every run, not the same output.

A skill has four surfaces: the trigger in its frontmatter (when and why it loads), the main path in `SKILL.md` (the mental model and the route), the depth in `references/` (detail the main path calls for), and the proof in tests (that the other three change behavior).

The surfaces are designed in that order, and each is judged against the one before it: the trigger decides what the main path must handle, the main path decides what depth it needs, and the proof judges the result.

## Where the standards live

Every standard for skill text lives once, in this skill; a skill that needs a standard at a decision loads the topic that holds it and never restates it.

Each topic opens with its standards, one self-contained sentence each, followed by the depth that teaches them.

A procedure, meaning how to carry out a step, is not a standard: it lives once, with the skill that runs it.

## Topics

Check every condition below against the work in front of you, and load each topic whose condition holds; one piece of work often needs several.

- IF writing or judging a description, or choosing whether a skill is model-invocable, load `references/descriptions-and-invocation.md` and return the standards that apply.
- IF writing or judging a `SKILL.md` body (its mental model, its route, a branch or its completion boundary), load `references/main-path.md` and return the standards that apply.
- IF deciding where material lives (the body, a reference, a script, a schema or the glossary), or writing or judging a load, a dispatch, a citation of a principle, or a shared output or tool shape, load `references/calls-and-placement.md` and return the standards that apply.
- IF choosing or judging wording meant to change what the agent does (a leading word, a completion criterion, a rule's strength, a prohibition, or a repair for a failure a run showed), load `references/steering.md` and return the standards that apply, with the repair that matches each observed failure.
- IF the skill states a rule, or a change starts from one product, library, repository or incident, load `references/generalization.md` and return each rule with its two transfer cases and its verdict.
- IF stating, planning or judging what evidence shows about a skill's behavior, load `references/proof-claims.md` and return the strongest claim the evidence supports, with any gap to the claim being made.
- IF classifying a skill change as mechanical, scoped or behavior-changing, or checking someone's classification, load `references/change-classes.md` and return the class with the claim that lets the next reader check it.
- IF the change touches anything that executes, reaches the network, comes from a third party, handles credentials, writes outside the repository, or sits in a skill's `scripts/` or `assets/`, load `references/security.md` and return each sensitive surface in scope, or none, with the standards its decision must meet.
- IF the change touches frontmatter encodings, `agents/openai.yaml`, a plugin manifest, marketplace metadata, a version, the changelog or platform validation, load `references/platform.md` and return the facts and standards for each platform surface it touches.
- IF a term in a skill's text or in this skill is unclear, load `references/glossary.md` and return its definition.
- IF creating a skill, or the size or shape of a main path is contested, load `references/worked-examples.md` and return the shape choice: how much machinery the job earns.
