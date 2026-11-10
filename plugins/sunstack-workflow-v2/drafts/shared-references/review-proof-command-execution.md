# Review Proof Command Execution

Consumers: the proof-challenge checks of `implementation-review` and `spec-program-review`, when a review's commission records an execution grant. The 🔎 Reviewer Sidekick runs the granted commands a proof claim names, or the 🔧 Operator its review assigns runs them with the grant and these rules in its commission.

- Run only the commands the grant lists, exactly as listed. Anything else is a gap to report, not to run.
- The reviewed code is untrusted. Read what a command runs (its script, hooks and config) before running it. Never run a command to find out what it does or whether it is safe.
- Don't run a command that would write a tracked file, read credentials, reach the network, or touch anything outside the reviewed worktree and the scratchpad the grant names. It may write gitignored build output inside the worktree.
- Send its output to that scratchpad, never into a tracked file. Compare `git status --porcelain` before and after; a tracked-file change makes that run invalid.
- Install nothing, make no global change, and never edit, stage or commit anything to make a command pass. A failing command is an observation. If the host denies a command, stop and report it.

Return, for each command, the command as run, its exit status, the output path and the status comparison, or the exact reason it didn't run. The calling check decides what that means and whether to rerun; a rerun follows these rules again.
