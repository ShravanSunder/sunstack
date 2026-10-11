# Proof Claims

This reference owns checking proof a design document claims: commands, harnesses, test runs, and recorded evidence. It compares what each claim asserts with what its evidence can actually observe, and runs the claimed commands only under an exact grant. Running a cited command runs the repository's code: treat it as untrusted input, not as a tool.

Expected inputs: the claim list (each cited command, expected outcome, evidence, and the layer it claims), and an execution grant naming the allowed commands and a scratch path. With no grant, inspect only and name the gap.

## Inspect Each Claim

For each claim, rebuild the chain and try to break it:

```text
rule -> failure it must catch -> seam or observation point -> evidence type -> environment -> pass/fail signal
```

- Can this evidence observe the named failure at the layer where it happens?
- Does a mock bypass the real integration?
- Can stale, cached, or generated evidence pass with the behavior absent?
- Does visual, operational, or security behavior need a live or manual observation?
- Is a required invariant enforced, merely logged, or not observable?

## Running Claimed Commands

Only a 🔧 Operator runs commands, and only the exact commands in the grant: no variants, no substitutes. A narrower unlisted command is a needed-grant gap, not a run.

- Before each run, resolve what the command actually runs (the script, its pre/post hooks, relevant configuration) and classify its writes as `scratchpad-only`, `ignored-build-artifacts` (listed paths), `tracked-worktree`, or `unknown`. `tracked-worktree` and `unknown` stop before running, with the predicted writes.
- A hook or test that reads credentials, touches the network, or reaches outside the worktree is a security observation and is not run.
- Output goes to the scratch path, never a tracked file. No installs, network fetches, or home-level writes. Never edit anything to make proof pass.
- After each run, compare `git status --porcelain` with its state before; any tracked change invalidates the result.

One row per claim:

```text
claim | write set | command run, or challenge | observed vs claimed: match | weaker | contradicts | cannot observe at this layer | how it could pass with the behavior absent | exit status
```

When running is blocked (no grant, a would-write command, no harness), challenge instead: what the claim asserts, what its evidence can observe, and the smallest command or observation that would settle it.

Good: every claim has an observed result with its exit status, or a named challenge; each false green is named with the mechanism that fakes it.

Bad: a unit pass relabeled as runtime proof; green output accepted without an exit status; running the whole suite when the document cites three commands.

## Complete When

Every claim is verified, challenged, or blocked with its reason; every command run is listed verbatim for comparison with the grant; and the worktree status before and after each run is reported.
