# Challenging a Verification Design

This reference owns the Verifier's challenge at delivery start, before anything is built: finding what the Verification Design misses or cannot do, and classifying each challenge so it reaches the right owner.

Expected inputs: the Requirements, the Specification, the Verification Design, Program Design's observation points, Test Design, and the project's verification controls. Return: classified challenges, filled into a `VerifierChallenge` as `verifier-report.md` teaches.

```ts
// import type { VerifierChallenge } from '../../../schemas/verifier-report.ts'
```

## What to Check

- **Coverage.** Walk every `U` and every `R`. Each `U` has a core-outcome check on the real surface or a named limit; each `R` has a `V`.
- **References.** Question any reference that is a recorded trace, an unpinned version, the implementation the change was ported from, or the code's own output.
- **Observation points.** Confirm each one exists in Program Design and can show the outcome the check needs.
- **Reused tests.** Open each test named for reuse and confirm its scope covers the case and drives the real surface.
- **Feasibility.** Confirm the controls each check needs exist in the project, and that the declared reference can be installed and run.

## Classify Each Challenge

```text
missing-scenario     a case is missing within the unchanged contract       -> the Lead adds it
feasibility-limit    a check cannot run here (no driver, no access)        -> recorded as unverified, with what would close it
correctness-change   the reference or an expected outcome should change   -> the Lead, then the owner
```

A correctness change is never settled by the Verifier or the Implementer: it changes what counts as correct.

Good: "U4 has no core-outcome check: only the version handshake is checked, not that the event reaches the pane · missing-scenario"; "R6's reference is traces recorded from agent 1.7; the installed agent is 1.8.2 · correctness-change".

Bad: "looks fine"; a challenge with no kind; a reference quietly swapped for one that is easier to run.

## Complete When

Every `U` and `R` has been checked against the checks, every reference, observation point, and reused test has been inspected, and every challenge has its kind.
