# The Verifier's Challenge and Report

This reference owns how the Verifier's two returns are filled. Their shapes live in the schema file; this reference teaches what goes in them.

```ts
// import type { VerifierChallenge, VerifierReport } from '../../../schemas/verifier-report.ts'
```

Expected inputs: the Verification Design, and for the report the build at a known head commit with the evidence gathered. Return: a filled `VerifierChallenge` before building, or a filled `VerifierReport` after proving.

Three readers use these: the Verifier writes them (its `manage-agents` charter), the Lead decides from them together with its own inspection (`orchestrator-implementation-goal`), and a later merge check reads the report.

## The Challenge

Before building, the Verifier returns one `VerifierChallenge` for the Verification Design. Each challenge names the `U`, `R`, or `V` it is about, its kind, and the detail. `challenge.md` teaches how to find and classify them.

## The Report

After proving, the Verifier returns one `VerifierReport`:

- **The head commit tested.** A report on an older head does not cover a newer one; after any correction that changes the head, the affected checks run again and a new report is written for the new head.
- **One entry per check**, with its `V`, its `U`, and every `R` it proves. A check whose requirement has no rule carries the reason from the Verification Design instead.
- **The reference declared and the reference used.** When they differ (another version was installed, an entry point was unavailable), say what was used and why.
- **The scenario, what was observed, and the result:** `passed`, `failed`, or `not-run`.
- **Evidence paths** to the transcript, screenshot, log, or state dump.
- **Everything unverified**, each with its reason. A gap left out of this list reads as proven.

The report states findings and limits. It holds no verdict and no recommendation to accept: the Lead decides.

Good: "V2 · U3 · R4, R5 · declared: agent 1.8.2 via its stop hook · used: 1.8.2 · observed: the event reached pane 2 within 300 ms · passed · evidence: tmp/verify/v2-transcript.txt"

Bad: "all checks green, looks good to merge"; a report with no head commit; a check that ran against a recorded trace while the declared reference was the installed agent, with no note.

## Complete When

The challenge lists every challenge with its kind; or the report names its head commit, has an entry for every check with declared and used references, observation, result, and evidence, lists everything unverified with its reason, and contains no verdict.
