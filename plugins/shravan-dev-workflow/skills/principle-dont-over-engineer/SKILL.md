---
name: principle-dont-over-engineer
description: "Use when sequencing an addition, refactor, or rewrite, when a layer, mechanism, or option is kept 'just in case', or when a new path would sit next to an old one. Remove what no outcome needs, build the least that works, and cut over completely."
disable-model-invocation: true
---

# Don't Over-Engineer

**Apply when** sequencing an addition, a refactor, or a rewrite; when a layer, mechanism, or option is kept "just in case"; or when a new path would sit next to an old one.

**Rule.** Before adding, remove what no outcome needs, then build on the simpler base. Build the least that meets the contract: reuse the existing common path over a special case, an established library over a hand-rolled one, a function over a framework. Add no option, layer, or extension point without a current consumer. When replacing something, cut over completely and delete the old path.

**Why.** Every mechanism costs reading, testing, and maintenance for as long as it exists, and a speculative one usually guesses the future wrong. Two paths double the bugs and make every later change a decision about which path. The simplest design that works is the easiest to change when the real need arrives.

**The test.**

1. Which outcome would break if you deleted this?
2. Does an existing path, library, or tool already do it?
3. After this change, does any old path still run alongside the new one?

**Distinct from.**

- `principle-separation-of-concerns`: before deleting a layer, ask what it hides. A thin adapter over an external protocol earns its seam.
- `principle-tradeoffs-are-the-work` weighs options that each meet the outcome; this card removes what no outcome needs.
- `principle-focus-and-scope` guards the requirements; this card guards the mechanisms.

**Applied means** you name what you removed or declined to add, and the outcome you checked still holds.

## Worked case

A team plans to run a gateway inside its own virtual machine "for isolation". Asking what outcome the VM provides that a container doesn't, at the current trust boundary, finds none: the gateway handles no untrusted code. The container ships, and the VM is written down as the move to make if the trust boundary changes. One runtime, one deployment path, and a stated condition for revisiting.

## Overkill

When a layer owns a policy or lifecycle, hides substantial behavior, or provides a real seam, deleting it only moves its complexity into every caller. Simplicity never means dropping error handling or tests.
