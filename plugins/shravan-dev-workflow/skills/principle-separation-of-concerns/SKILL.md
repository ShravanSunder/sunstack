---
name: principle-separation-of-concerns
description: "Use when adding a module, layer, interface, or dependency, when one part changes for two unrelated reasons, or when testing one rule drags in the network, the clock, or the framework. Give each part one job and inject dependencies at real seams."
disable-model-invocation: true
---

# Separation of Concerns

**Apply when** you add a module, layer, interface, or dependency; when one part changes for two unrelated reasons; or when testing one rule needs half the system.

**Rule.** Give each part one job and one reason to change, and hide one decision behind each interface. Keep core logic apart from what reaches outside or varies: I/O, the clock, randomness, external services, framework wiring. Where the core needs one of those, depend on a boundary and pass the concrete thing in (dependency injection), but only at a real seam: an external system, a nondeterministic input, a process or trust boundary, or a stand-in for a piece that isn't ready. The module structure should read as the design.

**Why.** Tangled concerns make every change touch everything, and drag the network and the clock into a test of one rule. A seam in the right place lets you swap a provider, test a rule in milliseconds, or build against a stand-in. A seam in the wrong place is only indirection.

**The test.**

1. Can you state each part's job, and the one reason it would change?
2. Can the core rule be tested without the network, the clock, or the framework?
3. Does any part change shared state that another part relies on (globals, environment, a singleton) without owning it?

**Distinct from.**

- `principle-dont-over-engineer` removes what no outcome needs. Before deleting a layer under that card, ask what the layer hides: a thin adapter over an external protocol earns its seam.
- `principle-one-owner-per-truth` decides who decides and writes a truth. The parts can be cut cleanly while the wrong one owns the data, and the reverse.

**Applied means** you name the seam you placed or refused, and the change or test it made cheap.

## Worked case

A billing module computes proration, reads the system clock, and calls the payment provider's SDK inline. Testing month-end proration needs a faked system date and five SDK mocks, and switching providers touches every function. Better: a pure proration function (plan and dates in, amounts out), one payment-gateway interface whose adapter hides the provider's protocol, and the current time passed in at the edge. Proration tests run in milliseconds with literal dates, and a provider change touches one adapter. The proration function gets no interface of its own: it has one implementation and nothing about it varies.

## Overkill

A small module with one stable job, no I/O, and one caller needs no interface. An interface with one implementation that hides no decision and serves no test or stand-in is indirection, not separation; remove it. Split files and packages when a part owns a real responsibility, not to make the tree look organized.
