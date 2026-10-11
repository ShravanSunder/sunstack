---
name: test-design
description: "Use when planning the regression tests for a behavior change: which scenarios to protect, at which test layer, what is real and what is replaced, and an assertion that fails when the behavior is wrong. Not for proving delivery independently (verification-design), writing the test code (implement-plan), or auditing tests already written (implementation-review)."
---

# Test Design

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

A test is a claim about behavior, and it must be able to go *red*. For each rule, Test Design picks the scenarios worth protecting and the cheapest place on the *pyramid* that can still observe them, and makes sure no test can stay green while the behavior is wrong. The *expected outcome* comes from the Specification, never from the code under test.

The Lead loads this skill and writes Test Design from the Specification's rules and Program Design's seams, as its own document beside the Program Design; a small change gets a small one. The Implementer checks that it can be built before building starts, then builds it. Helpers may bring evidence; they never write a scenario.

## Workflow

1. **Pick the scenarios.** For each Specification rule, list the behaviors worth protecting: the normal case, the boundaries, and the failure cases the rule names. Search for existing tests that already cover them. Done when: every rule has one or more scenarios (`T` identifiers), or "not regression-tested: <why>" where the rule changes no behavior a test could observe or a named existing test already covers it; and every overlapping existing test is listed.

2. **Place each scenario.** MUST load `references/placement.md` and return a layer and seam for each scenario. Done when: every scenario has a layer and uses a seam Program Design names, and each one above the lowest layer says why a cheaper layer cannot observe it.

3. **Decide what is real.** For each scenario, say what runs real and what is replaced. Each replacement names the assumption it encodes; when that assumption is not verified, move the scenario up a layer so the real thing runs. Done when: every replacement has its assumption, and no scenario replaces the interaction it claims to prove.

4. **Write the check.** MUST load `../../shared-references/false-green-test-shapes.md` and return each scenario's expected outcome, assertion, red condition, and timing control. Done when: each scenario states its expected outcome with the Specification line it comes from, an assertion on an observable outcome, and the behavior change that turns it red; each timing-sensitive scenario names its controlled order or clock, or a bounded event wait, and how completion is observed, while other scenarios mark timing "n/a"; and none matches a false-green shape in the reference.

5. **Hand on.** Return a `PhaseReturn` of kind `phase-complete` with the Test Design pointer, its open items (each scenario waiting on a seam, waiting on `program-design`), and its `designReview` value, naming no next skill. Done when: every row names its rule, every rule is covered or excused, and the return carries the pointer and every open item.

   ```ts
   // import type { PhaseReturn } from '../../schemas/design-returns.ts'
   ```

The document is one row per scenario:

```text
T · R · scenario · layer · seam · real / replaced (assumption) · expected outcome (Spec line) · assertion · goes red when · timing control (or n/a)
```

## Branches

- IF existing tests overlap the changed behavior, load `references/existing-tests.md` and return keep, repair, or remove for each, with its basis. A removal needs a replacement, proof of redundancy, or proof the contract is dead.
- IF no seam Program Design names can observe a scenario without replacing the interaction under test, keep the scenario open, finish every other row, and list it as an open item waiting on `program-design` with the rule and the observation needed. Return kind `seam-request` only when nothing else can proceed until that seam exists. Resume at step 2 when the seam exists. Never invent a seam or weaken the scenario.
- IF the Implementer reports a scenario cannot be built as designed, re-enter at step 2 or 3 for that scenario. A report that an expected outcome is wrong goes to the Lead: if the row mis-cited a correct Specification line, fix the row; if the line itself is wrong, return `specification-gap`. Never edit an expected outcome to fit the code.
- IF a rule a scenario needs, or its expected outcome, is missing from the Specification, return kind `specification-gap`.
- IF this call added, removed, or changed scenarios, set `designReview: owed`. Inside a design cycle, the cycle's review step discharges it; outside one, `design-review` runs before planning or delivery uses the scenarios.

## Rules

- Expected outcomes come from the Specification. The rationalization to name: "I'll compute the expected value the same way the code does."
- A mock is an assumption. It never replaces the interaction being proved.
- The pyramid guides placement. There is no fixed ratio, and a small change gets a small Test Design.
- Test Design plans scenarios. Test code, commands, and red/green order belong to the Implementer; independent delivery proof belongs to `verification-design`.

**Completion boundary.** Done when every rule is covered or excused; every row has an expected outcome from the Specification, a red condition, and its timing control (or "n/a"); no replacement removes the interaction under test; every overlapping existing test has its disposition in the document; and any scenario waiting on a seam is listed as open.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return as a checkpoint through `practices-show-me-your-work`.
