---
name: principle-prove-it-through-the-real-path
description: "Use before saying a feature, fix, or UI change works. Drive the real entry point with the real configuration, observe the result where the user would see it, and name anything still unverified."
disable-model-invocation: true
---

# Prove It Through the Real Path

**Apply when** you are about to say a feature, fix, or UI change works.

**Rule.** Drive the real entry point (the app, command, endpoint, or page a user would use) with the real configuration, and observe the result where the user would see it: the rendered screen at the target viewport, the response body, the file on disk. A planned journey is not a run journey, and a passing unit test is not a run of the feature. Record what you did and what you saw, and name anything still stubbed as unverified. When an automated test already drives that real path, it is the proof; don't repeat it by hand.

**Why.** Most "done but broken" comes from the gap between the parts that were tested and the thing that runs: the configuration, the wiring, the layout at a real size, the installed package. Only the real path crosses all of it.

**The test.**

1. Did you run what a user runs, or a stand-in for it?
2. Did you observe the outcome where the user would?
3. Is anything still stubbed, and is it named as unverified?

**Distinct from.**

- `principle-tests-are-executable-claims` designs the scenario that can expose a defect; this card runs the real thing. One automated real-path run can serve both.
- `principle-verify-before-accepting` judges whether the observation supports the claim made from it.

**Applied means** you name the entry point you drove, what you observed, and what is left unverified.

## Worked case

A share panel passes its component tests. Opened in the real app at a laptop viewport, it overflows the window, and closing it leaves keyboard focus on the page body. Fixing both took minutes; finding them took opening the app. The focus return is now covered by a test, and the layout was checked at two viewports with screenshots.

## Overkill

Pure domain logic with no entry point, viewport, or journey is proven by a focused test. Don't repeat a manual check that an automated real-path test already covers.
