# Merged Worktree Removal

This reference owns removing one merged worktree that your task created.

Expected inputs: the worktree path, the repository's main checkout path, the PR and its GitHub repository, and the caller's merge evidence when it has some.

Return: `removed`, with the branch outcome and where the `tmp/` evidence went; or `held`, with the blocker and what shows it.

Complete when every step below passed and the removal was checked, or the first step that failed is named as the blocker.

Use the owner's tools: the Agent Studio worktree helper, with `git worktree remove` and then `wt` as backups. Learn each tool's syntax from its own help. Act from outside the worktree, such as from the main checkout.

## 1. Confirm the merge and that the work is done

Before acting on a merge, read the PR's state from GitHub after the merge and match its merged head to this worktree's current HEAD ([verify before accepting](../../principle-verify-before-accepting/SKILL.md)). The caller's evidence counts when it was read that way; a receipt from before the merge or a matching branch name describes a different moment or commit, so read it again. A different HEAD is a hold until you account for every commit between the two.

Then confirm the assignment is finished and nothing uses the tree: no build, test, server or debugger started from it, no open pane on it, and no other session's commission names it.

## 2. Inventory before removing

Note the tree's size and the volume's free space. Read the helper's own report on the worktree (working changes, `tmp/` evidence, blockers and readiness) and a preview of this exact removal that doesn't fetch. A blocker in either is a hold until you resolve its cause. A clean preview knows nothing about whether the work is finished or what runs from the tree; step 1 settles those.

Then classify the files:

- A tracked, staged or conflicted change is a hold. It is work the PR doesn't have.
- Each untracked file is disposable (generated output, scratch whose result is recorded) or kept. Move each kept file to its home now.
- Ignored files disappear with the directory, and ignored only means Git skips them. A local env file, a captured binary or a proof receipt can be ignored, so classify every ignored file that isn't build output.
- Commits missing from the remotes are accounted for when HEAD equals the merged head, because the PR holds them even after a squash merge or a deleted remote branch. Otherwise hold.

The helper's archive copies the worktree's `tmp/` into the main checkout's `tmp/`, under the worktree's folder name. It is a copy, so it needs free space for everything in `tmp/`, and it is not durable retention: proof the work needs goes to its real home. Dropping `tmp/` with the tree while its evidence is unclassified needs the owner's yes.

## 3. Remove and check

Remove the worktree with the helper, archiving `tmp/` to the main checkout. Forcing past working changes discards them, so it needs the complete inventory every time: nothing tracked, staged or conflicted, and every untracked file classified disposable. A clean preview or a merged PR doesn't stand in for it. Never force the deletion of a branch that still has contribution; post-merge cleanup never needs it.

Check each effect on its own: the directory is gone, Git no longer lists the worktree, the helper's result names what happened to the branch, the archived `tmp/` is at its destination, and the free space came back.

## 4. When the helper fails

A refusal names a blocker, such as a dirty tree, unclassified `tmp/` evidence or a Git lock. Resolve that blocker and rerun the helper. When the helper errors partway through, the state is unknown: before running anything else, look at what it left (whether the directory is there, whether Git still lists it, how much of `tmp/` reached the archive) and decide from that whether to rerun or finish by hand ([design for failure](../../principle-design-for-failure/SKILL.md)).

On 2026-10-06 the helper's archive to the main checkout failed with `archiveFailed (partialCopy)` on a stale named pipe in `tmp/`. Under this procedure the agent compares what the archive holds with `tmp/`, removes the stale pipe, which holds no evidence and which the removal would delete anyway, and reruns the helper. Newer helper source skips such entries and reports them, but an installed helper may predate that. Switching to a forced `git worktree remove` would have discarded whatever `tmp/` evidence the archive had not copied.

A failed or uncertain helper result is never permission to skip preservation with a backup. Use the backups only when the helper is missing or keeps failing after you have checked its state, with steps 1 and 2 passed and the `tmp/` evidence copied to its home yourself, since neither backup archives it. `git worktree remove` removes only a clean worktree. A backup runs in the foreground, keeps the branch, runs no hooks and ends no process. Forcing one past working changes needs the same complete inventory, and overriding a lock needs the owner.
