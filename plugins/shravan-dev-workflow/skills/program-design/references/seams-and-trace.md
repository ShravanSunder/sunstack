# Seams and the Trace Table

This reference owns the seam and observation point for each rule, what must be real and what may be replaced, keeping invalid states out, the trace table, and answering a seam request. It is the trace table's only builder.

Expected inputs: the rules (`R`) with the `U` lines they serve and the entities (`E`) they use, the binding table, the interface contracts, the state model, the failure decisions, and today's observation points. Return: the trace table, one illegality decision per material invalid state with its enforcement class, and the gaps.

## Seam and Observation Point

Two different things, for two different readers:

- A **seam** is a boundary in the design where a test can drive the behavior and replace what lies outside it without replacing the interaction the rule is about. Test Design picks its layer at a seam.
- An **observation point** is where the rule's outcome can be seen on the real system: a state, output, event, log line, trace, metric, or file that a check can read. Verification Design observes there.

For each rule, name both, and say what must be real and what may be replaced. Classify each dependency the rule crosses:

```text
in-process
locally substitutable
remote but owned
true external
```

A mockable signature with no realistic way to observe the outcome is not a seam. When the test harness follows materially different owners or boundaries than production, draw the test path (see `views.md`) so the difference is visible.

Name seams and observation points; stop there. Which test layer uses a seam belongs to `test-design`, and how each rule is proven belongs to `verification-design`. No test file, command, or test-order step belongs in this document.

## Keep Invalid States Out

For each material invalid state, decide how it is kept out: the illegal combination cannot be represented, or the trusted entry rejects it. Name the enforcement class beside the decision:

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

Good: a negative total cannot be constructed, or the charge entry refuses it. Bad: "add a negative test."

## The Trace Table

Before writing a row, open the binding table (owner, home, and shape for each `E`), the interface contracts (which variant realizes the rule), the state model (which transition), and the failure decisions (which handling).

```text
| R | U | E | owner | interface | state or failure | seam and observation point |
```

Write one row per rule into the document, or into the response in a chat-only run. Two rules that share a contract still keep their own rows, so a deleted rule shows as a deleted row. Test Design and Verification Design name the `R` they cover in their own documents, so this table does not list `T` or `V`.

Cell rules:

- The `R` cell names the rule and what it requires, not only an identifier.
- The `U` cell names every Requirements line the rule serves. `E` reads `none: <why>` when the rule uses no entity, such as a platform limit or a pure quality rule. `U` and `E` may each list several identifiers.
- The owner cell names a component, never a package. A cross-cutting row (tenant isolation, audit, rate limiting) names the mechanism's owner, such as the guard and its check, never "all components".
- The seam and observation point cell names the seam, what is real and what may be replaced there, and the observation point. It never names a test file, a command, or a test layer.
- `gap: <why>` marks design that is missing. "Not applicable" is `none: <why>` or a plain value such as `stateless guard`.
- No cell is blank, and no cell says "see above" or "see interfaces".

Each row's disposition follows from its cells: `covered` when every cell names a concrete element or a reasoned `none:`; `gap` when any cell reads `gap: <why>`. A row goes only when the Specification removes its rule.

Good: a reader can walk each row from owner line to observation point without opening the prose; the `E` cell matches the Specification's identifiers; the seam cell says what stays real.

Bad: a paragraph tagged with identifiers instead of a table; a trace kept in scratch notes; a rule with no row, or two rules merged into one row; a package in the owner column; a seam cell that names a mock but no observation point.

## Answering a Seam Request

A `seam-request`, or an open item waiting on `program-design`, from `test-design` or `verification-design` names one rule and the observation it needs. Work on that rule only:

1. Check whether an existing seam or observation point already gives that observation. If one does, point to it.
2. Otherwise design the smallest addition that does: a boundary where the test can drive the behavior, an emitted event, a readable state, or a log or trace point, each with its owner. Update the rule's row, and every other part of the design the addition touches. If the addition changes the structure the owner confirmed, show it again at step 6.
3. If it cannot exist (the platform does not expose it, or adding it would break an invariant), say why as an open item on that rule. If it needs a tolerance only the owner can set, return `owner-decision`.

Never answer with a weaker observation and call it the one asked for.

## Complete When

Every rule has one row whose cells name a concrete element, a reasoned `none:`, or a `gap: <why>`; every row's seam cell says what is real and names an observation point; every material invalid state has an illegality decision with its enforcement class; and every element in the design traces to a rule.
