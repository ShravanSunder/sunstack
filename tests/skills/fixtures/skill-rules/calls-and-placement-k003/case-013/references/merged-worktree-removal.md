# Merged worktree removal

Remove a worktree only after its pull request merged and nothing still uses it.

1. Confirm the branch merged.
2. Copy any evidence out of its `tmp/`.
3. Remove the worktree with the repository's worktree tool, and report the branch outcome.
