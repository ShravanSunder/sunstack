# Placing Scenarios

This reference owns where each scenario is tested: the cheapest layer that can observe it, the seam it uses, and when a broader layer is needed.

Expected inputs: the scenarios, Program Design's trace table (each rule's seam, observation point, and what may be replaced), and the project's test layout and layer names. Return: a layer and seam for each scenario, with the reason a cheaper layer cannot observe it.

## Use the Project's Layer Names

When the repository names its test layers (in `AGENTS.md` or `CLAUDE.md`, a testing guide, or its test folders and markers), those names win; record where they come from. When it is silent, write `project silent` and use the ordinary names:

```text
unit          focused logic and state transitions inside one owner
integration   real interaction between parts: across storage, process, filesystem,
              HTTP, event, or protocol boundaries, or UI components working together
end-to-end    a complete journey through the real system, entry point to observable outcome
```

## The Cheapest Layer That Can Observe It

Start low and move up only when the lower layer cannot see the outcome:

- A rule about parts interacting needs an integration scenario. Unit scenarios alone cannot establish that an interaction works.
- A rule that crosses a process, filesystem, network, UI, or distribution boundary needs that boundary real. A mocked unit cannot prove it.
- A rule about the whole path being wired needs an end-to-end journey. A few journeys prove wiring for many rules; do not write one per rule.

Most scenarios stay low and a few journeys prove the wiring. That shape is a guide, not a ratio, and not a checklist every change must fill.

## One Rule, Many Cases

When one rule covers many inputs, plan a table of cases or a property of the rule instead of one example per case. A single example is enough only when the rule is about that one case.

## Use a Seam Program Design Names

Each scenario uses the seam on its rule's trace row and replaces only what lies outside it. Mock only at system boundaries the seam allows (an external API, time, randomness), never a collaborator the rule is about. When no named seam can observe the scenario without replacing the interaction under test, return `seam-request` instead of inventing one.

## Say Why

Each placement above the lowest layer says in one line why a cheaper layer cannot observe it.

Good: "T4 · integration · seam: `ReminderStore` with a real SQLite file · unit cannot see the second process holding the lock."

Bad: "T4 · e2e · because it's important"; a unit scenario that mocks the store for a rule about two processes sharing it; one end-to-end journey per rule.

## Complete When

Every scenario has a layer named in the project's terms (or `project silent`), a seam from Program Design, and, above the lowest layer, the reason a cheaper layer cannot observe it; and no scenario crossing a real boundary replaces that boundary.
