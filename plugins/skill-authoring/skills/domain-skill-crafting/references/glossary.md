# Glossary

Vocabulary for judging skills. This file holds definitions only; each standard lives in the topic that owns it.

## Root virtue

- Predictability: the agent follows the same process reliably, even when the output differs. The route is judged, not token-for-token sameness.
- Reusable behavior: the durable agent behavior the skill exists to stabilize.

## Invocation

Model-invocable, user-invocable, context load, cognitive load and router skills are explained in `descriptions-and-invocation.md`.

- Trigger surface: the YAML frontmatter description, plus any router wording that decides whether the skill loads.
- Description: the always-visible context pointer for a model-invocable skill.

## Information hierarchy

`calls-and-placement.md` holds the placement standards, the call forms and the shared-shape standards.

- Load mode: the caller-owned choice between all-run `MUST load` and conditional `IF <observable predicate>, load`.
- Mandatory reference: coherent all-run detail consumed through `MUST load`.
- Principle: a skill hidden from model invocation that teaches one engineering judgment, opens with its own read rule, and is cited by other skills at the decision it informs.
- Citation: the call form for a principle.
- Steps: ordered actions the agent performs.
- All-run spine: the part of the workflow every invocation needs.
- Reference: detail consulted after its caller selects the work.
- Ordinary reference: mandatory or conditional detail loaded by the same agent that follows the calling workflow.
- Review check: one narrow review question with its own reference in `skill-review`; reviewer agents each walk a family of checks.
- Execution shape: an agent-loaded step or a prescribed procedure dispatched to a helper agent.
- Context pointer: wording that names when to load a reference and what to do with it. Weak pointer wording is a variance bug.
- Branch predicate: the observable condition that selects a branch.
- Return shape: the concrete result a reference pass or branch brings back to the main path, such as a verdict, filled slots, proof result, route decision, or edit boundary.
- Check status: `complete | partial | blocked` for a selected review check; an unselected optional check is `complete` with `not selected: <reason>`.
- Review reduction: the review lead verifies each candidate at its anchor, resolves conflicts, and returns one review result.
- Schema: a reusable shape a downstream consumer can rely on.
- Output-schema: stable readable result fields shared by multiple model-facing consumers.
- Tool-schema: stable structure machine-validated by a tool, test, CI check, or runtime.

## Steering

- Mental model: the lens the skill asks the agent to think with while working.
- Leading word: a compact concept that recruits useful model priors and anchors behavior, such as `root cause`, `vertical slice`, or `single source of truth`.
- Completion criterion: the checkable condition that tells the agent a step or reference pass is complete.
- Legwork: the work a completion criterion demands inside a step, such as reading files, checking examples, or proving a claim.
- Positive shape: wording that states the target shape or behavior directly, rather than describing what not to do.

## Pruning

- Single source of truth: one authoritative home for each meaning.
- Duplication: the same meaning stated in more than one home.
- Sediment: stale guidance kept because deleting it felt risky.
- No-op: wording that does not change model behavior versus the default.

## Proof

- Structural proof: evidence that files are valid, parse, package, or validate.
- Behavior proof: evidence that the skill changes what the agent does.
- RED/GREEN/REFACTOR: capture baseline failure or proof gap, revise the skill, then tighten the smallest wording that still leaks.
- Rationalization: the excuse an agent uses to skip the intended behavior under pressure.
