# Proof Challenge

Mission: verify that executable proof a design cites is real. When a Specification or Program Design points at commands, harnesses, or reproducible evidence as its proof, observe that proof under the recorded grant, or give the 🔎 Reviewer Sidekick the exact gap between the claim and the evidence.

Predicate: the reviewed design cites executable proof claims. When it does not, proof modality and seam sufficiency stay with the read-only `proof` focused check.

Expected inputs: the complete review context, the claim inventory (each cited command, expected outcome, evidence artifact, claimed layer), and a populated `execution grant` naming the allowed command set and scratchpad path. Without a grant nothing runs; inspect the cited evidence only and return the boundary.

Check boundary: read-only. Granted commands run only under the command procedure below, and everything else stays read-only.

## Observe Each Claim

IF a selected proof claim has a recorded execution grant, load `../../../../shared-references/review-proof-command-execution.md` and return each granted command's result (the command as run, its exit status, output path and `git status --porcelain` comparison, or the exact reason it didn't run) for this check's claim assessment. The 🔧 Operator assigned in `SKILL.md` runs those commands with the grant and that reference's rules in its commission, and returns those results. The 🔎 Reviewer Sidekick fills one row per claim from them:

```text
claim | command run or challenge | observed vs claimed: match|weaker|contradicts|cannot observe at this layer | false-green check: <how this could pass with the behavior absent: stale artifacts, mocked boundary, disabled gate, evidence older than the design> | exit status | rerun comparison: <both outcomes> or no failure
```

When a claim can't be observed (no grant, a would-write stop, a denied command, an absent harness), challenge it instead: state what the claim asserts, what the cited evidence can observe, and the smallest command or observation that would settle it.

Good: every executable claim has an observed result with exit status, or a named challenge the 🔎 Reviewer Sidekick must answer; false greens are named with the mechanism that fakes them.

Bad: relabeling a unit pass as runtime proof; accepting green output without exit status; running a whole suite when the design cites three commands.

Return: a check `complete | partial | blocked` result plus the per-claim rows, `commands run` (every command executed, verbatim, for the 🔎 Reviewer Sidekick's grant comparison), proof gaps, would-write stops, security observations, environment notes, and uncovered boundary.

Stop when every cited executable claim is verified, challenged, or blocked with its exact reason. Do not broaden into design review or generate proof the design never claimed.
