# Proof Architecture and Traceability

This reference owns the realization records, structural proof seams, real/fake boundaries and enforcement classes. `artifact-and-self-review.md` verifies the records.

Expected inputs: the need and rule records with their cases, the entity binding table, behavioral interface contracts, state model, failure/recovery decisions, and complete target structure/flows.

Return: the realization records, seam sufficiency, dependency proof classes, enforcement decisions, and gaps.

## The Realization Record

Every rule is realized along this chain:

```text
rule R and the needs it serves
  -> entity E it is written over
  -> semantic owner (component)
  -> interface/contract that realizes it
  -> shape and its schema/type home
  -> state transition it drives or reads
  -> failure handling it depends on
  -> observable boundary and seam
  -> structural invariant and enforcement class
```

A realization record says in one sentence how an owner realizes the rules it names; `defineRealization` names them in `realizes`, and the guide's `typed-design.md` owns the other fields. One realization may address several rules. The page's how part explains the owners, interfaces, state and failure behind it; the record does not repeat them, and the page does not repeat the record. The records' links are the trace; nobody writes a trace table.

Good: "JobStore commits claim and cancellation as one conditional state write" names R3 and R4, and the state section beside it shows the transition.

Bad: one realization per rule that restates each rule; a realization that names no rule; an owner cell that names a package.

Stop when every `core` rule that needs new structure is named by a realization and every realization names a rule.

## Dependencies and Seams

Classify each dependency:

```text
in-process
locally substitutable
remote but owned
true external
```

State what must be real, what may be replaced through the designed seam, and what observation proves the behavior. A mockable signature without a production-realistic observation path is not proof architecture. Write the seam or the real/fake boundary as a decision record only when a capable reader could choose differently; the obvious seam needs no record.

Use a proof call graph when the test or operational harness follows materially different owners or boundaries than production. Show the driver/fixture, real versus replaced boundaries, observation point, and evidence returned.

Choose enforcement class where appropriate:

```text
type or interface
schema
runtime guard
transaction/atomic boundary
lint/static rule
automated test
health check
operational alarm
```

For each material invalid state, decide how it is kept out: the illegal combination is unrepresentable, or the trusted entry rejects it. Name the enforcement class beside that decision. Good: a negative total cannot be constructed, or the charge entry refuses it. Bad: the design is "add a negative test."

Do not choose exact files, commands, TDD order, or evidence-capture mechanics. Planning owns which test proves the decision.

Complete when: every `core` rule that needs new structure is named by a realization; every material invalid state has an illegality decision with its enforcement class; every material design element traces back to a legitimate need; and unprovable claims remain explicit.
