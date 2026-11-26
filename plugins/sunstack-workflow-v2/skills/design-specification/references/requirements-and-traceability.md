# Requirements and Traceability

This reference owns construction and repair of rule records and the links that make them traceable.

Expected inputs: authority/problem model, the stage-2 entity definitions and undefined-noun gaps, goals/non-goals, `core` deliverables, resolved decisions, candidate constraints, and current rule text.

Return: the rule records, any need no rule serves, any entity no rule uses, and exact gaps or conflicts.

## Rule Shape

A rule record (`defineRule`; the guide's `typed-design.md` owns the field names) carries:

```text
stable R identifier
one sentence, written over defined entities, naming the consumer or boundary
the needs it serves (one or more U identifiers)
the decisions that govern it and the assumptions it relies on, when any
cases: the success condition, negative or failure expectation, threshold, target constraints and reference, as given and expected pairs
```

A rule's sentence stays one sentence. Detail that would lengthen it goes into its cases.

Use a conditional form that makes context and response unambiguous. EARS-style forms are construction tools, not mandatory output syntax:

```text
always active     The <system> <response>.
state-driven      While <state>, the <system> <response>.
event-driven      When <trigger>, the <system> <response>.
optional feature  Where <feature exists>, the <system> <response>.
unwanted behavior If <fault>, then the <system> <response>.
complex           While <state>, when <trigger>, the <system> <response>.
```

Write faults as `If/then`; a failure is not a normal event. Split compound rules when clauses can pass or fail independently.

## Repair Weak Requirements

Weak:

```text
The system must support retries.
```

Repair:

```text
If the provider times out before confirming acceptance, the system must retry
without creating more than one externally visible operation.
```

Weak:

```text
Use Redis for idempotency.
```

Repair:

```text
For repeated requests with the same idempotency key and equivalent payload,
the service must return the original outcome without repeating the external side effect.
```

The technology-name test: if a materially different implementation could satisfy the same observable obligation, the technology name is structural How rather than requirement meaning unless an authorized contract makes that technology normative.

Replace `support`, `handle`, `robust`, `easy`, `secure`, `fast`, and similar adjectives with the behavior that distinguishes pass from fail.

## Traceability

A rule names the needs it serves, one or several; that link is the trace. The design check reports a `core` rule with no need and, for a rule a `core` deliverable scopes, no planned check, a gap that stays until Verification Design adds the check. It notes a need no rule serves. Each U identifier resolves to a need record; do not restate or fork it. Preserve stakeholder needs even when no direct-user journey exists.

Flag:

- a rule that relies on a contested noun with no `E` entity, or an entity no rule uses;
- a `core` need with no rule;
- a rule with no need or authority basis;
- a contract or constraint with no consumer;
- a rule whose negative case is undefined;
- a rule whose pass and fail depend on a threshold or reference its cases do not carry;
- duplicate rules with different wording or authority;
- a user-facing rule that serves a need whose authority state is not `authorized`, or that rests on an `observational`, `advisory`, or `unresolved` source;
- a declined-extraction rule that cites neither an alternate authoritative source nor the exact decision/evidence gap.

Apply the stranger test: a capable reader with no session history must state the same pass/fail behavior from the rule and its cases.

Complete when: every material rule is authoritative, one sentence, observable, written over defined entities, names its needs, and is separated from implementation tasks.
