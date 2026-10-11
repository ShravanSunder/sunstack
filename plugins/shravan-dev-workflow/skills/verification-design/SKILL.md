---
name: verification-design
description: "Use when planning independent proof for each requirement and rule on the real surface: what it is checked against, which scenarios run, what is observed, what counts as passing and what stays unverified, including before-and-after verification of a bug fix, or when a Verifier challenges a Verification Design before building. Not for diagnosing a failure (debug-investigation) or the Implementer's regression tests (test-design)."
---

# Verification Design

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

Verification asks one question per requirement: does the delivered thing do what the owner asked, on the *real surface*, checked against a *declared reference*, independently of how it was built? Prove the *core outcome first*; mechanisms come second. Whatever cannot be shown is written down as *unverified*, never left implied.

The Lead loads this skill and writes Verification Design, as its own document beside the Program Design. The 🔬 Verifier loads it at delivery start to challenge the design before building, and after proving to fill its report. Independence comes from the Verifier's challenge and from expected outcomes taken from the Specification, not from who holds the pen.

## Workflow

1. **List what must be proven, and write the owner lines.** Take every Requirements line (`U`) and every Specification rule (`R`). For each `U`, name its core outcome and write one plain "proven by" line for the owner. Done when: every `U` has a core outcome and a "proven by" line, or "not verifiable here" with the reason; and every `R` is listed.

2. **Declare the reference.** MUST load `references/references-and-cases.md` and return a reference for each check. Done when: every check names what correct is checked against: the reference the Specification names (with version and entry point when one exists), or the Specification rule itself. No check is against recorded traces or the code's own output unless the Specification says so.

3. **Design the scenarios.** MUST load `references/real-surface.md` and return the scenarios and the surface for each. Done when: each `U`'s checks start with its core outcome on the real surface; every `R` is covered by at least one check (`V`), and when proof is not possible that `V` still exists and carries its unverified limit; the cases are aimed at the risk (targeted, boundary, negative, differential against the reference); and each check names its surface, the risk it targets, its `R`, and its `U`. Several rules may share one check.

4. **Place the observation.** For each scenario, name where it is observed, using Program Design's observation points. Done when: every scenario has an observation point that exists, or a `seam-request` has been returned for `program-design`.

5. **Set passing and limits.** Done when: every check has a pass condition; every automated test that already proves the real path is named for reuse instead of repeated by hand; and every gap is written as unverified with its reason.

6. **Hand on, ready to be challenged.** MUST load `references/verifier-report.md` and return the report shape with the document. Then return a `PhaseReturn` of kind `phase-complete` with the Verification Design pointer, every open item (including the Verifier's owed challenge), and its `designReview` value, naming no next skill. Done when: the document and report shape are complete and the return carries the pointer, every open item, and `designReview`. The Verifier runs the challenge when its pair is commissioned at delivery start, before building.

   ```ts
   // import type { PhaseReturn } from '../../schemas/design-returns.ts'
   ```

The document opens with the owner card, one "`U` · proven by" line per requirement, then one row per check:

```text
V · R · U · reference (version, entry point) · scenario · surface · risk it targets · observation point · passes when · reuses test · unverified
```

## Branches

- IF the change fixes a bug, load `references/bug-path.md` and return the reproduction plan: a command already run on the unfixed code that shows the symptom twice, and the same command after the fix.
- IF the project has no way to drive the surface a scenario needs, record "unverified: no way to drive <surface>" with what would close it, and keep the check in the document.
- IF no observation point Program Design names can show a scenario's outcome, return kind `seam-request` with the rule and the observation needed, and keep the check open.
- IF a rule, an expected outcome, or the reference a check needs is missing from the Specification, return kind `specification-gap`.
- IF you are the Verifier challenging a Verification Design before building, load `references/challenge.md` and return a `VerifierChallenge`, each challenge with its kind.
- IF you are the Verifier reporting after proving, load `references/verifier-report.md` and return a `VerifierReport` for the head commit you tested.
- IF this call changed the proof plan, set `designReview: owed`. Inside a design cycle, the cycle's review step discharges it; outside one, `design-review` runs before planning or delivery uses the plan.

## Rules

- Expected outcomes come from the Specification. The Verifier may read Program Design and Test Design to find where to observe, but never takes expected outcomes from them.
- When a check cannot be observed, ask Program Design for a seam. Never swap in a weaker check or reference. The rationalization to name: "the recorded traces are close enough."
- The Verifier reports; the Lead decides. The report states findings and limits, not a verdict.
- An automated test that exercises the real path counts as proof. Do not repeat it by hand.

**Completion boundary.** Done when every `U` has a "proven by" line and a core-outcome check on the real surface or a named limit; every `R` has a `V` (its limit, if any, written on that `V`); and every check declares its reference. A Requirements line with no rule records that reason in the `R` cell. The Verifier's challenge happens later, at delivery start.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return as a checkpoint through `practices-show-me-your-work`.
