# Verify Before Accepting: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. Find the one closest to your case and apply its move.

## "Ready" on structural checks

**What happened.** A set of skill cards passed every check run on it: frontmatter parsed, metadata valid, names consistent, packaging validation green. They were reported "ready for comments". The owner read them and found they were mostly bookkeeping that taught nothing.

**The move.** Check that the evidence observes the claimed thing.

**Better.** The checks observed packaging, not teaching. The honest claim was "structurally valid; whether the cards teach is unverified". The right check was a reader walking an unseen case with only the card, and that was what found the problem.

## Summaries without logs

**What happened.** Two proof assignments came back with commands, counts, and "success", but no log paths. A follow-up found that no persistent logs had been written, so nobody could inspect what actually ran.

**The move.** Read it; don't count it.

**Better.** Name the persistent logs in the assignment, and check that they exist before accepting the proof.

## Proof from the wrong checkout

**What happened.** Helpers ran their proof work in the shared checkout instead of the isolated worktree they were assigned. A docs comparison reported deletions that hadn't happened, and a browser test was created and run in the wrong tree, then presented as proof.

**The move.** Check the version and the place.

**Better.** Confirm the working directory, branch, and head behind every result before accepting it. A result from the wrong tree is evidence about a different tree.

## The review finding that was wrong

**What happened.** A reviewer flagged a missing null check, citing a real line. The line was in a code path no caller reaches.

**The move.** Review findings are claims; open the anchor.

**Better.** Reject it, citing the call graph that shows the path is unreachable. Apply only findings that survive their own verification.

## Fixed in CI?

**What happened.** CI failed on a bridge test, a fix was pushed, and the agent claimed it was fixed without reproducing the failure. The owner asked why it couldn't be found locally.

**The move.** The evidence must prove the exact claim.

**Better.** Reproduce the CI failure first, locally or in the CI environment. Show it red, apply the fix, and show the same check green at the same head. "Fixed" means that same check passed again.

## A second harness

**What happened.** A behavior was confirmed in one agent harness, and the claim was written as if it held everywhere.

**The move.** Name what the evidence doesn't cover.

**Better.** Either repeat the check through a second, distinct harness, or narrow the claim to "confirmed in harness A; other harnesses unverified".
