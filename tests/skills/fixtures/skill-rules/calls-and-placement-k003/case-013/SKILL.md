---
name: cleanup-runs
description: "Use when a task ends and its build output, logs and worktrees are still on disk."
---

# Cleanup runs

Remove only what your task created.

## Remove what your task created

1. List each folder your task created, with its size.
2. IF a candidate is a worktree whose PR has merged, load `references/merged-worktree-removal.md` and return the worktree removed, or held with its blocker.
3. For an AgentStudio checkout, run `mise -C "$agentstudio_worktree" run clean-artifacts`, which keeps `.build-ci` and removes the local `AgentStudio.app`.
4. Confirm each removed path is gone and take `df -h` again.
