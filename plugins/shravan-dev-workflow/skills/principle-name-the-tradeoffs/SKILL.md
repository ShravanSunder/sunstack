---
name: principle-name-the-tradeoffs
description: "Use when a real choice changes complexity, risk, cost, or reversibility, or when one option is presented for a decision that has others. Show the credible alternatives as changes to the current design, with concrete gains, costs, who pays, and the assumption that must hold, then recommend one."
disable-model-invocation: true
---

# Name the Tradeoffs

Every design decision is a tradeoff: you gain something, you pay for it, and somebody bears the cost. The dangerous tradeoffs aren't the ones you discuss; they're the ones you don't realize you're making. An implicit assumption is a load-bearing wall nobody labeled. Naming the tradeoff means putting the real alternatives side by side as changes to the current design, being concrete about what each costs ("simpler" and "cleaner" are not costs), saying out loud the assumption the choice leans on, and then recommending one. The goal is a comparison someone can actually decide from.

## How to think it through

**Draw the current design, then each option as a change to it.** Options are worth comparing only when they differ on something that matters: who owns what, where a boundary sits, how consistent the data is, a lifecycle, how it will be proven. Two options that differ only in style don't help anyone decide.

**Be concrete about gains and costs.** Code to write and maintain, latency, startup time, operational burden, migration work, reader load, the owner's attention. "What's the true cost of complexity between A and B?" deserves an answer in those terms, not adjectives.

**Say who pays.** The user, the operator on call, the next developer, the owner. A cost nobody is named for is a cost nobody agreed to. "The faster build saves developer time, but it moves work to launch, so every user pays for it at startup."

**Find the load-bearing assumption and its cheapest falsifier.** Which assumption, if wrong, flips the choice? What five-minute check would show it? Say it out loud: "I'm assuming the database can rank typo-tolerant matches fast enough at our size; same assumption?" Then invert your preference: what evidence would make the other option right?

**Include the option you'd rather not.** The boring one, or doing nothing, is often credible. Leaving it out turns the comparison into a justification.

**Watch what you're trading away that the owner already cares about.** A faster build that makes startup slower, or a correctness fix that blocks the main thread, is a trade the owner may not accept. Put it on the table.

**Weigh structure and code differently.** For a structural choice (a boundary, an owner, a contract), prefer the clearer ownership and the option that keeps future choices open, even when it costs more than the smallest path. For a code-level choice inside a settled structure, prefer the simplest thing.

**Recommend one, and say when to revisit.** Name the debt the smaller choice accepts and the signal that would justify the bigger design later: "Keep the current search store if a measured matcher meets the agreed latency; change storage only if it doesn't, and only once you accept what that changes."

**The hard call is which decisions are yours.** Scale the rigor, and the asking, to reversibility, and judge reversibility by what gets built on top before you could back out, not by whether the edit can be undone. A one-way door (a change to the shape of data already stored, a public contract, who owns something, a new process boundary, data you can't take back) gets the full comparison and the owner's decision. Adding a new setting or a new file is not changing a stored format, and doesn't need escalating. For a one-way door: show it rather than just ask it, one decision at a time, with what waits if they defer. A reversible choice inside the agreed scope is yours: decide it, record why, and keep going.

**Temporary decisions say why and for how long.** A stand-in or workaround names what it stands in for, the assumption it encodes, what it gains now, what it costs, and what closes it.

## Example: the queue between two services

A design adds a message queue between an order service and a fulfillment service, "for decoupling". Shown as a change to the current direct call: the queue gains buffering through fulfillment outages and independent deploys; it costs a broker to run, eventual consistency the order screen must show ("processing"), and a new failure mode (poisoned or stuck messages) that the on-call person pays for. The load-bearing assumption is that fulfillment outages are frequent or long enough to matter, and last quarter's incident log shows two five-minute outages. The direct call with a bounded retry meets the need today. Recommend it, and name the revisit signal: outages longer than the retry window, or a second consumer of order events.

IF the case in front of you doesn't match the queue example, or you are judging how someone else presented a decision, load `references/example_scenarios.md` (scenarios, simplest first: "Too handwavy"; try A and B; the workaround that became permanent; the faster build that slowed startup; the new process nobody asked about; the search assumption, named up front) and return the closest scenario and how its move applies to your case.

## When it doesn't apply

When one feasible option meets the settled requirements and no assumption would change the conclusion, a comparison table is ceremony. A reversible, local choice needs one sentence and a recorded reason.

## Signs you skipped it

- Options compared with the cost named for only some of them, or one option presented as obvious with no word on the others.
- Costs stated as adjectives: simpler, cleaner, more robust.
- No one named as paying the cost.
- A design resting on an assumption nobody checked before choosing, like a fuzzy search assumed to find typo-only matches.
- A one-way door decided in passing, or a reversible choice escalated to the owner for no reason.
- A workaround with no stated reason or end.

When the question is whether a mechanism is needed at all, use `principle-justify-the-complexity`. When running something would settle the question faster than comparing, use `principle-experiment-before-proposing`.
