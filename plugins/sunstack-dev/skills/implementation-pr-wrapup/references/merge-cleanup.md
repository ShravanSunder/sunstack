# Merge Cleanup

This reference owns when wrap-up cleans up and what it passes on. `practices-cleanup` owns every removal command and its checks.

Expected inputs: the PR number and GitHub repository, the worktree path, the repository's main checkout path, and which moment this run reached: PR-ready, or a merge it held authority for.

Return: what `practices-cleanup` returned, each path removed or held with its reason.

## At PR-ready

IF the merge gates came back clear, load `practices-cleanup` for the bulky build output this branch's work created and return each path removed or held. The worktree stays until its PR merges. Record the worktree path and PR number in the trace checkpoint, so `practices-preflight` in a later session can find the worktree once the owner merges.

## After a merge

IF a merge this run held authority for has landed (the user said to merge, or set a condition that fresh evidence satisfied), read the merge state from the worktree:

```sh
gh pr view <n> --json state,mergedAt,headRefOid
git rev-parse HEAD
```

IF `state` is `MERGED` and local HEAD equals `headRefOid`, load `practices-cleanup` with the worktree path, the main checkout path and that evidence, and return the worktree removed or held with its blocker. Otherwise return the mismatch as the blocker.
