---
name: product-loops
description: "Use when a debug run needs its loop."
---

# Product loops

Pick the loop before running anything.

## Pick the loop

- IF the work is a flaky test, rerun it until it fails.
- IF the work is AgentStudio debug or beta, run `mise -C "$agentstudio_worktree" run debug` and follow its loop.
- IF the work is a slow build, profile it first.
