# Merged Worktree Removal

This reference owns removing one merged worktree that your task created. It is the only home of these commands; callers pass in what they know and come here.

Expected inputs: the worktree path, the repository's main checkout path, the PR number and GitHub repository, and the caller's merge evidence when it has some.

Return: `removed`, with the helper's JSON result, the branch outcome and where the `tmp/` evidence went; or `held`, with the blocker and the output that shows it.

Complete when every step below passed and the removal was checked, or the first step that failed is named as the blocker.

```sh
ASW=/Applications/AgentStudio.app/Contents/Helpers/agentstudio
```

Run every command from outside the worktree, such as from the main checkout.

## 1. Confirm the merge and that the work is done

Before acting on a merge, match it to this worktree's current HEAD using GitHub state read after the merge ([verify before accepting](../../principle-verify-before-accepting/SKILL.md)). The caller's evidence counts when it was read that way; a receipt from before the merge or a matching branch name describes a different moment or commit, so read it again.

```sh
gh pr view "$pr" --repo "$github_repo" --json state,mergedAt,headRefOid
git -C "$worktree" rev-parse HEAD
```

`state` is `MERGED` and HEAD equals `headRefOid`. A different HEAD is a hold until you account for every commit between the two.

Then confirm the assignment is finished and nothing uses the tree: no build, test, server or debugger started from it, no open pane on it, and no other session's commission names it.

## 2. Inventory the worktree

```sh
du -sh "$worktree"
df -h "$repo"
"$ASW" worktree list "$worktree" --repo "$repo" --no-fetch --json
"$ASW" worktree remove "$worktree" --repo "$repo" --dry-run --no-fetch --archive-to-main --json
```

`list` reports working changes, `tmp/` evidence, blockers and readiness. The dry run previews this exact removal without fetching. A blocker in either is a hold until you resolve its cause. A clean preview still knows nothing about whether the work is finished or what runs from the tree; step 1 settles those.

## 3. Inventory the files

```sh
git -C "$worktree" status --porcelain=v1 --untracked-files=all
git -C "$worktree" ls-files --others --ignored --exclude-standard
git -C "$worktree" rev-list --count HEAD --not --remotes
```

Read each result:

- A tracked, staged or conflicted change is a hold. It is work the PR doesn't have.
- Classify each untracked file as disposable (generated output, scratch whose result is recorded) or kept, and move each kept file to its home now.
- Ignored files disappear with the directory, and ignored only means Git skips them. A local env file, a captured binary or a proof receipt can be ignored, so classify every ignored file that isn't build output.
- A nonzero count of commits missing from remote refs is accounted for when HEAD equals the merged `headRefOid`, because the PR holds those commits even after a squash merge or a deleted remote branch. Otherwise hold.

`--archive-to-main` copies the worktree's `tmp/` to `<main checkout>/tmp/<worktree folder>/`. It is a copy, so it needs free space for everything in `tmp/`, and it is not durable retention: proof the work needs goes to its real home. `--discard-tmp` drops `tmp/` with the tree and needs the owner's yes while that evidence is unclassified.

## 4. Remove and check

```sh
"$ASW" worktree remove "$worktree" --repo "$repo" --archive-to-main --json
```

Add `--force` only when step 3 found nothing tracked, staged or conflicted and you classified every untracked file disposable. `--force` discards working changes, so it needs that complete inventory every time; a clean preview or a merged PR does not stand in for it. Never pass `-D`, which deletes a branch that still has contribution; post-merge cleanup never needs it.

Check each effect on its own: the directory is gone, `git -C "$repo" worktree list` no longer shows it, the JSON names what happened to the branch, the archived `tmp/` is at its destination, and `df -h "$repo"` shows the space back.

## 5. When the helper fails

A refusal names a blocker, such as a dirty tree, unclassified `tmp/` evidence or a Git lock. Resolve that blocker and rerun the helper. When the helper errors partway through, the state is unknown: before running anything else, look at what it left (whether the directory is there, whether Git still lists it, how much of `tmp/` reached the archive) and decide from that whether to rerun or finish by hand ([design for failure](../../principle-design-for-failure/SKILL.md)).

On 2026-10-06, `--archive-to-main` failed with `archiveFailed (partialCopy)` on a stale named pipe in `tmp/`. Under this procedure the agent compares what the archive holds with `tmp/`, removes the stale pipe, which holds no evidence and which the removal would delete anyway, and reruns the helper. Newer helper source skips such entries and reports them, but an installed helper may predate that. Switching to `git worktree remove --force` would have discarded whatever `tmp/` evidence the archive had not copied.

A failed or uncertain helper result is never permission to skip preservation with a backup. Use the backups, in this order, only when the helper is missing or keeps failing after you have checked its state, with steps 1 to 3 passed and the `tmp/` evidence copied to its home yourself, since neither backup archives it:

```sh
git -C "$repo" worktree remove "$worktree"
wt -C "$repo" remove --no-delete-branch --foreground --no-hooks -y "$worktree"
```

`git worktree remove` removes only a clean worktree. Its `--force` needs the same complete inventory as the helper's, and passing it twice overrides a lock, which needs the owner. `wt` keeps the branch with `--no-delete-branch` and runs in the foreground without hooks; never add `--reap` or `-D`.
