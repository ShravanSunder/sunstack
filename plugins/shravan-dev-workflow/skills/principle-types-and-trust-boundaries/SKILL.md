---
name: principle-types-and-trust-boundaries
description: "Use when variants, external input, or authority cross a boundary: a status with several states, data from a network, file, or user, or a caller that can cause an effect. Make invalid states unrepresentable, validate once at the edge, and grant the least authority."
disable-model-invocation: true
---

# Types and Trust Boundaries

**Apply when** variants, external input, or authority cross a boundary: a status with several states, data from a network, file, or user, or a caller that can cause an effect.

**Rule.** Two decisions.

- **Representation.** Model the states the domain actually has as distinct types (a discriminated union, an enum with payloads), so contradictory combinations can't be written. Parse untrusted input once, at the edge, into those types, and trust them inside.
- **Authority.** Decide who may cause each effect, and give each crossing the least authority it needs. A well-typed request can still be unauthorized.

**Why.** A bag of booleans and optional fields admits states the domain says can't happen, and every reader has to guess which combinations are real. Validation scattered through the core is noisy and still misses the path nobody checked. Broad authority at a crossing turns one bug into a breach.

**The test.**

1. Can you write a combination of fields that the domain says can't happen?
2. Where is untrusted input parsed, and does anything downstream skip or repeat that check?
3. What is the least authority this caller needs, and does it have more?

**Distinct from.**

- `principle-domain-meaning-first` fixes the meaning first; this card picks the representation that keeps it.
- `principle-one-owner-per-truth` decides who owns and writes a truth, not which states it can take.

**Applied means** you name the state you made unrepresentable or the authority you narrowed, and the class of bug it removed; or the existing types and authority you confirmed already rule it out, and how you checked.

## Worked case

A job record has `done: boolean`, `failed: boolean`, and `error?: string`. A crash leaves `done: true, failed: true`, and the screen shows a green check next to an error. Better: one `status` that is `queued`, `running`, `succeeded`, or `failed` with its error. The contradiction can't be written, and every consumer must handle `failed`. Authority works the same way: a "read-only" helper given a token that can also write is one bug away from deleting data, so give it a read-only token.

## Overkill

If there is one valid representation and no untrusted input or capability crossing, a union or an admission check adds no decision. Don't wrap every string in its own type.
