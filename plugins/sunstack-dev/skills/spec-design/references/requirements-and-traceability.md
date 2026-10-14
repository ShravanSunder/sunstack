# Requirements and Traceability

This reference owns two things: what the Requirements document must cover, and how the Specification's normative requirements are built and traced. `proof-obligations.md` alone selects the proof modality.

Expected inputs: the authority/problem model and adopted goal boundary; for Specification work, also the entity table and undefined-noun gaps, resolved decisions, candidate constraints, and current requirement text.

Return, for the Requirements: the adopted Requirements coverage, each normative-eligible U row with its authority, and the owner meaning still unmet. For Specification obligations: the requirement inventory and coverage map, with exact gaps or conflicts.

## The Requirements Document

Each adopted need becomes one U row that a person can confirm or correct:

```text
U3  Operator (direct user)
    need:       text sent to a named pane arrives in that pane, even when another pane has focus
    why:        operators lose typed work when it lands in the focused pane
    evidence:   support thread 2026-09-30, three reports from operators
    authority:  authorized, owner decision in the design thread 2026-10-02
    priority:   must, assigned by the owner
```

Bad: "U3 Users want reliable routing." It names no class, no observable outcome and no authority, so nobody can confirm it and no obligation can trace to it.

Bad: a row marked `authorized` because the author found it convincing. Authority belongs to whoever adopted the row, and a convincing proposal stays a proposal with a visible hypothesis label.

Coverage means every adopted owner statement inside the goal boundary lands on a U row or a named non-goal, and every row either carries authority or shows its hypothesis state. Unmet owner meaning is a question whose answer would change a row ("does a hidden pane count as addressable?"), never a request to "clarify requirements".

Review the Requirements in `requirements-only` mode before deriving obligations from it. A wrong U row propagates into every obligation that cites it, and catching it before the Specification exists is cheap.

Complete for the Requirements when: every adopted statement in the boundary has a row or a non-goal, each normative-eligible row has inspectable authority, and each unmet meaning is an exact question with its owning document.

## Requirement Shape

Each material requirement carries:

```text
stable identifier
normative statement, written over defined entities (E identifiers)
basis / authority source
consumer or affected boundary
observable success condition
negative or failure expectation
proof-obligation identifier or uncovered slot
dependencies or conflicts
authorized user-requirement identifiers when present
```

Use a conditional form that makes context and response unambiguous. EARS-style forms are construction tools, not mandatory output syntax:

```text
always active     The <system> <response>.
state-driven      While <state>, the <system> <response>.
event-driven      When <trigger>, the <system> <response>.
optional feature  Where <feature exists>, the <system> <response>.
unwanted behavior If <fault>, then the <system> <response>.
complex           While <state>, when <trigger>, the <system> <response>.
```

Write faults as `If/then`; a failure is not a normal event. Split compound obligations when clauses can pass or fail independently.

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

When normative-eligible user-requirements rows exist, construct the chain from their stable U identifiers. Otherwise begin at the problem:

```text
user or stakeholder need U1
  -> entities E1..En the obligations name
      -> problem P1
          -> outcome O1
              -> requirement R1
                  -> observable contract C1
                      -> proof-obligation slot V1
```

The U identifier resolves to the source row; do not restate or fork the producer's need. Preserve stakeholder U roots even when no direct-user journey exists. Each requirement cites the `E` identifiers it is written over; `domain-entities.md` owns the definitions.

Flag:

- a requirement that names a noun with no `E` entity, or an entity no requirement uses;
- an outcome with no requirement;
- a requirement with no outcome or authority basis;
- a contract or constraint with no consumer;
- a requirement whose negative case is undefined;
- a missing proof-obligation slot for the claimed behavior;
- duplicate requirements with different wording or authority.
- a user-facing requirement with no cited U row when normative-eligible rows exist;
- a normative requirement derived from an `observational`, `advisory`, or `unresolved` row;
- a declined-extraction requirement that cites neither an alternate authoritative source nor the exact decision/evidence gap.

Apply the stranger test: a capable reader with no session history must state the same pass/fail behavior and proof obligation.

Complete for Specification obligations when: every material requirement is authoritative, singular, observable, written over defined entities, traceable in both directions through U when present, and separated from implementation tasks.
