# Review Proof Command Execution

This shared reference owns how a review runs a command that a proof claim names, under a recorded execution grant. Consumers, and only these: the proof-challenge check of `implementation-review` and the proof-challenge check of `spec-program-review`. Each loads it only for a selected claim whose grant is recorded.

The calling check keeps every judgment. It picks the claims and the commands, decides what each observation means for its claim, decides whether to run a command again, and returns its own check status. This reference returns observations and exceptions. It never says whether proof establishes a claim or whether a review is ready, and it never widens the grant.

Expected inputs: the recorded `execution grant`, which lists the exact allowed commands and the scratchpad path; the reviewed worktree; and the granted commands the calling check selected.

Return, for each command: the resolved chain and its write-set class with evidence, the command exactly as run, its exit status, the scratchpad path of its output, and the worktree status before and after. Also return every needed-grant gap, would-write stop, security observation, and denied or blocked command, each with its exact reason.

If the reviewer has a 🔧 Operator run the commands, the Operator's commission carries the granted commands and the steps below. This reference gives no authority to commission one.

The commands run the reviewed code. Treat that code and its scripts, hooks and configuration as untrusted input.

## Before Each Command

1. Run only a command the grant lists, exactly as listed. A variant, a substitute, or a narrower command the grant doesn't list, such as one test out of a granted suite, is a needed-grant gap. Report it and don't run it.
2. Read the chain the command runs: the script it names, that script's pre and post hooks, and the tool configuration that changes what it does. Never run a command to find out what it does or whether it is safe.
3. Classify the chain's write set as `scratchpad-only | ignored-build-artifacts (listed paths) | tracked-worktree | unknown`. A `tracked-worktree` or `unknown` command stops here; report the predicted writes and the evidence. Gitignored build output under listed paths, such as coverage, cache or dist, may be written; name those paths in the result.
4. If anything in the chain reads credentials, reaches the network, or touches anything outside the reviewed worktree, don't run the command. Report it as a security observation.
5. Record `git status --porcelain` for the reviewed worktree.

## Run and Compare

6. Run the command. Send its output, logs and captured artifacts to the grant's scratchpad (project `tmp/` or system tmp), never into a tracked file, and capture the exit status.
7. Record `git status --porcelain` again and report how it differs from step 5. A change to any tracked file invalidates that run's observation; report the run as invalid.

The calling check decides whether to run a command again. Every run, including a rerun, repeats steps 1 to 7.

## Limits

Install nothing, fetch nothing from the network, and add no tooling. Make no home-level or global change; the only writes allowed are the listed ignored build output inside the reviewed worktree (step 3) and the grant's scratchpad (step 6). Never edit, stage, commit or fix anything to make a command pass; a failing command is an observation to return. When the host denies a command, or a harness or dependency is missing, stop that command and report the denial or the missing piece as an execution gap. The claim stays unobserved.

Complete when every selected command has either run with its exit status, output path and status comparison, or stopped with its exact reason.
