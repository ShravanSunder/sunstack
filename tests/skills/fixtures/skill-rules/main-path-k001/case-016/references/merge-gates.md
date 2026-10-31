# Merge Gates

Before saying "ready", "merge-clear", "green", "fixed", or "complete", match each gate below to the output of the fresh command or API query that shows it, and count any gate without that output as not ready ([evidence must observe this exact claim, at this version](../../principle-verify-before-accepting/SKILL.md)). Other people, bots and CI change checks, comments, threads, mergeability, the head and the body without any action of yours. An earlier read of any of them does not replace the final re-fetch, even when nothing you did since could have changed it.

## Ready-To-Merge Gates

- Local branch/worktree state inspected.
- Local `HEAD` equals PR head SHA, unless the user explicitly leaves local-only work out.
- Branch is pushed.
- PR exists and is not draft unless draft is intended.
- PR `baseRefName` matches the user's intended base branch, or the repo-default base when no specific base was requested.
- Required checks are green from a fresh query.
- Comments and review threads have been inspected from fresh GitHub state.
- Unresolved threads are fixed and resolved, rejected with evidence and replied to, or explicitly left open by user decision.
- Mergeability is clean, not blocked or conflicting.
- The body gate reads the live GitHub PR body against the current HEAD and diff. It passes only when the body has `## Why the change`, `## Special things to note` and `## Change outline`, the Change outline is non-empty and is not a file-list changelog (`- path — note` bullets as the outline), the body is current against HEAD/diff, and it passes public-artifact safety. Any one miss is not ready.
- One quiet poll passed after all gates first became clear.
- Final re-fetch confirms checks, comments, threads, mergeability and head SHA, and applies the whole body gate again to the re-fetched body.

If the PR base branch is wrong or uncertain, stop and ask or update the PR base before claiming readiness.

## Authorization Gate

Ready-to-merge is not allowed-to-merge. Read the merge authority the wrap-up recorded at entry, as settled again by any later answer or correction, with its sources and scope. Merge only when the grant covers this PR (it names this PR, its stack or this work, and a grant tied to an exact head names the final re-fetched head), and:

- the state is `merge-now`; or
- the state is `merge-when-ready: <exact conditions>`, such as "merge when green and comments are handled", and every condition, including any a standing instruction added, holds on fresh evidence from the final re-fetch.

A head change doesn't reset the recorded authority, and it doesn't excuse a condition. Under `readiness-only`, or when the grant doesn't cover this PR or a condition doesn't hold, stop merge-ready and unmerged, and say in the report which of these holds.
