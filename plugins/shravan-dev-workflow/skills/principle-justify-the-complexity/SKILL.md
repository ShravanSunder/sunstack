---
name: principle-justify-the-complexity
description: "Use when adding or keeping a layer, abstraction, option, mechanism, or second path, or when sequencing a refactor or rewrite. Double-check that each piece of complexity is justified by an outcome that needs it now; remove the rest and cut over completely."
disable-model-invocation: true
---

# Justify the Complexity

**Apply when** you add or keep a layer, abstraction, option, mechanism, or second path (including one kept "just in case"), or sequence a refactor or rewrite.

**Rule.** Every piece of complexity has to justify itself by an outcome that needs it now. Double-check before adding or keeping it: which outcome breaks without it, and does something simpler or already existing do the job? Remove what no outcome needs, then build on the simpler base. Build the least that meets the contract: reuse the existing common path over a special case, an established library over a hand-rolled one, a function over a framework. Add no option, layer, or extension point without a current consumer. When replacing something, cut over completely and delete the old path.

**Why.** Every mechanism costs reading, testing, and maintenance for as long as it exists, and a speculative one usually guesses the future wrong. Two paths double the bugs and make every later change a decision about which path. The simplest design that works is the easiest to change when the real need arrives.

**The test.**

1. Which outcome would break if you deleted this?
2. Does an existing path, library, or tool already do it?
3. After this change, does any old path still run alongside the new one?

**Distinct from.**

- `principle-separate-the-concerns`: before deleting a layer, ask what it hides. A thin adapter over an external protocol earns its seam.
- `principle-name-the-tradeoffs` weighs options that each meet the outcome; this card removes what no outcome needs.
- `principle-hold-the-scope` guards the requirements; this card guards the mechanisms.

**Applied means** you name what you removed or declined to add, and the outcome you checked still holds; or the complexity you kept and the outcome that justifies it.

## Worked case

A team plans to run a gateway inside its own virtual machine "for isolation". Asking what outcome the VM provides that a container doesn't, at the current trust boundary, finds none: the gateway handles no untrusted code. The container ships, and the VM is written down as the move to make if the trust boundary changes. One runtime, one deployment path, and a stated condition for revisiting.

## Overkill

When a layer owns a policy or lifecycle, hides substantial behavior, or provides a real seam, deleting it only moves its complexity into every caller. Simplicity never means dropping error handling or tests.
