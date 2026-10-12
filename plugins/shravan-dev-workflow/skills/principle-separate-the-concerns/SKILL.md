---
name: principle-separate-the-concerns
description: "Use when adding a module, layer, interface, or dependency, when one part changes for two unrelated reasons, or when testing one rule drags in the network, the clock, or the framework. Give each part one job and inject dependencies at real seams."
disable-model-invocation: true
---

# Separate the Concerns

Code structure is a reflection of understanding. Every module exists because you can state its job and name its reason to change. When concerns tangle (business rules mixed with I/O, the clock, the framework, the wire format) every change touches everything, and testing one rule drags in the network. Separation is not about more files. It is about putting a boundary where something really differs: where the system reaches outside, where a dependency varies, where one responsibility ends and another begins. A boundary in the right place lets you change one part, test it on its own, and replace what sits behind it. In the wrong place it is only indirection, and every abstraction has to justify the complexity it adds.

## How to think it through

**Name the jobs before drawing boundaries.** Most features have a few that differ: transport (how requests arrive), parsing and validation (turning raw input into domain values), domain rules, persistence, and presentation. Where a real boundary exists between them, give each its own module, named for its responsibility (`stored_thread_catalog`, `query-builder`), never `utils` or `common`.

**Use the reason-to-change test.** If a part would change for two unrelated reasons (the pricing rules change; the payment provider changes), split it along that line. If every change touches the same few parts together, they may be one concern pretending to be two.

**Keep the core pure and the shell thin.** Business logic is a function from domain values to domain values. Effects (network calls, writes, the current time) live at the edge and are passed in, so the rule can be tested in milliseconds with literal inputs.

**Translate at the boundary, both ways.** Coming in, parse raw data into domain types once and trust them inside: parse incoming updates once and hand typed updates to the merge, rather than letting the merge decode the same payload for every item. Going out, map storage and transport errors into domain errors, so `sqlx::Error` or a wire type never leaks into callers. Callers should see domain concepts, not the boundary's private representation.

**The hard call is where to inject.** Dependency injection earns its place at a real seam:
- an external system or protocol that could change, or that you want to stand in for;
- a nondeterministic input such as time or randomness;
- a process or trust boundary;
- a test that needs to replace the dependency *without changing production behavior* (a seam that changes production mode needs its own review);
- a stand-in for a piece that isn't ready yet.

Not everything should be injected. A dependency with one implementation, no variation, and no test need is just a function call. Define the interface from the consumer's side (what it needs, not everything the provider can do), and wire the concrete implementation at the composition point for its lifetime: at startup for process-wide things like a provider client, per request for request-scoped things like a session or a database transaction. Don't thread it through layers that never use it.

**Hand each part only what it uses.** A module that needs the database URL gets the database URL, not the whole config with the admin key in it; a component that reads one field of the session gets that field. What a part never received, it can't misuse or come to depend on.

**Before finalizing an interface, write one representative caller.** If the call reads awkwardly, the boundary is in the wrong place. And when a capability belongs to an existing adapter, extend that adapter rather than starting a parallel one.

**Watch shared state.** A part that changes something process-wide (globals, environment, a singleton) that another part relies on has reached outside its job, whatever its file boundary says. Starting the web server must not replace the process-wide `Request` and `Response` that another SDK already relies on.

## Example: the provider baked into the consumer

A plugin imports one VM provider directly. Switching providers means editing the plugin, and its tests need the provider running. Better: the plugin defines the small VM-runtime interface it needs, the provider package implements it, and the host injects it at startup. The plugin no longer changes when the provider does, and its tests use a stand-in.

IF the case in front of you doesn't match the provider example, or you are reviewing someone else's structure against this principle, load `references/example_scenarios.md` (scenarios, simplest first: the page that fetched, reshaped, and rendered; parse once at the boundary; injection everywhere; the CLI that became the client; startup that broke a neighbour) and return the closest scenario and how its move applies to your case.

## When it doesn't apply

A small module with one stable job, no I/O, and one caller needs no interface and no extra file. Split by responsibility, not by line count, though a file past 600 lines is usually holding more than one job.

## Signs you skipped it

- A business rule that only runs with the network or the framework attached, or that decodes raw transport data itself instead of receiving typed values.
- A module edited for two unrelated reasons in recent history.
- A `helpers` or `common` module that mixes provider calls, decoding, and domain rules, so testing one rule needs the whole stack.
- Storage, transport, or wire types in a domain function's signature.
- Interfaces with one implementation that hide nothing, a dependency threaded through layers that never use it, or a whole config object passed to a part that reads one field.
- A component that changes globals or environment at startup.

For how values cross a boundary as types, see `principle-types-are-communication`. When the question is who owns and writes a piece of data, use `principle-one-owner-per-truth`; when a layer may not be needed at all, use `principle-justify-the-complexity`.
