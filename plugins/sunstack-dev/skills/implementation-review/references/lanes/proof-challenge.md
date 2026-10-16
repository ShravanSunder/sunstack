# Proof Challenge

Mission: check that the proof the implementation claims is real. For each material claim, observe it under the recorded grant, or give the 🔎 Reviewer Sidekick the exact gap between what is claimed and what the evidence can show.

Expected inputs: the current review context, the complete proof-claim inventory (commands, expected outcomes, evidence artifacts, claimed layers), and the `execution grant` the 🔎 Reviewer Sidekick recorded, naming the allowed command set and the scratchpad path.

Prerequisites: proof claims exist. Without a recorded grant nothing runs; inspect the supplied evidence only and return the boundary.

Check boundary: read-only review. Granted commands run only under the command procedure below, and everything else stays read-only.

## Observe Each Claim

IF a selected proof claim has a recorded execution grant, load `../../../../shared-references/review-proof-command-execution.md` and return each granted command's result (the command as run, its exit status, output path and `git status --porcelain` comparison, or the exact reason it didn't run) for this check's claim assessment. The 🔧 Operator assigned in `SKILL.md` runs those commands with the grant and that reference's rules in its commission, and returns those results. The 🔎 Reviewer Sidekick judges each claim against them:

```text
claim -> observation: exit status and scratchpad output, or the stop reason
observed vs claimed: match | weaker | contradicts | cannot observe at this layer
false-green check: could this command pass while the claimed behavior is absent?
  (stale artifacts, mocked boundary, disabled gate, evidence generated before
  the reviewed source, tautological oracle, mock or wiring call treated as
  the behavior, assertion that cannot fail for the claim)
environment check: to tell a real failure from flake or environment, run a
  failed granted command once more under the same procedure and report both
  outcomes side by side
```

When a claim can't be observed (no grant, a would-write stop, a denied command, an absent harness), challenge it instead: state what the claim asserts, what the supplied evidence can observe, and the smallest command or observation that would settle it.

Good: every material claim has an observed result with exit status, or a named challenge the 🔎 Reviewer Sidekick must answer; false greens are named with the mechanism that fakes them.

Bad: relabeling a unit pass as runtime proof; accepting green output without exit status; running the whole suite when the claims name three tests.

Return the check `complete | partial | blocked` status plus:

```text
per-claim results: <claim, command run | challenge, observed vs claimed,
  false-green check, exit status, scratchpad evidence path>
commands run: <every command executed, verbatim, for the Reviewer Sidekick's
  grant comparison>
proof gaps:
would-write stops:
security observations:
environment notes:
uncovered boundary:
```

Stop when every material claim is verified, challenged, or blocked with its exact reason. Do not broaden into quality review or generate proof the implementation never claimed.
