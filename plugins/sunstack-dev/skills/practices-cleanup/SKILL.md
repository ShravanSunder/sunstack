---
name: practices-cleanup
description: "Use when a slice, milestone, PR or investigation ends, when your own merged worktree is still on disk, or when disk runs low, to remove the large residue your own task created: build output, large logs, task temp folders and merged worktrees. Not for archiving documents or managing PR state."
---

# Practices: Cleanup

Remove only what your own task created, once nothing needs it, with its evidence kept. The target is bulk: build output, large logs, task temp folders and finished worktrees. Small Markdown, plans and specs stay.

Size, age, a folder name such as `tmp`, and a merged PR each tell you where to look. None of them makes a deletion safe. A path is safe to remove when all four checks hold:

1. Exact and yours: one canonical absolute path that the trace, the commission or your own command shows this task created. Never a glob, a root folder, a symlink, a shared cache or another agent's checkout.
2. Rebuildable or finished with: a command recreates it, or the work it served is done.
3. Unused: no running build, test, server, debugger, executable or other session uses it.
4. Evidence kept: any failure excerpt, receipt or proof inside it is already copied where the work keeps evidence.

An unknown on any check means hold the path and report it: holding costs disk, while a wrong deletion can cost the only copy of proof or someone's running build.

## When to run

- At slice and PR boundaries, inspect with `du -sh` and `df -h`. Size is a trigger, never permission.
- At milestone end, at PR-ready, or when free disk is low, clean your bulky build output.
- At investigation close, remove large logs once the proving excerpt is kept.
- When your own worktree's PR has merged, remove the worktree.

Don't clean after every proof. Cleaning `target/` after each proof once forced a full rebuild every time, at a machine load near 300.

## Prefer the project's own clean task

Look for a cleanup policy in the repository's AGENTS.md and task runner first; a project task knows its own locks and what to keep. AgentStudio's `mise -C "$agentstudio_worktree" run clean-artifacts` refuses while a build holds the slot, keeps `.build-ci` and vendor output, and also removes the local `AgentStudio.app`; honor a refusal, and never swap it for a blanket `.build-*` delete. Router's AGENTS.md sets its Cargo policy.

## The allow list

These run without asking once the four checks hold. Each variable is an exact absolute path you inspected.

| Command | Also needs |
|---|---|
| `du -sh "$owned_target" "$owned_build" "$owned_task_temp"` and `df -h "$repo"` | Nothing; read-only. |
| `cargo clean --manifest-path "$repo/Cargo.toml" --workspace --profile dev --target-dir "$owned_target" --dry-run`, then the same command without `--dry-run` | No open executable from that target, and a preview that removes only what you meant. |
| `mise -C "$agentstudio_worktree" run clean-artifacts` | The app and debug server it built are not running or needed. |
| `rm -f -- "$owned_log"` | Its writer closed; no credentials inside. |
| `rm -rf -- "$owned_task_temp"` | A folder this agent created under `/private/tmp` or `$TMPDIR`, with every file in it this task's. |
| `rm -rf -- "$owned_output"` | A generated `node_modules`, `dist`, test-results or experiment build folder that its command and lockfile recreate. |
| merged worktree removal | `references/merged-worktree-removal.md`. |

## Never without asking

Ask the owner first unless they gave an equally explicit grant for that exact action:

- `rm -rf /private/tmp`, `rm -rf "$TMPDIR"`, or deleting by age (`find ... -mtime ...`);
- shared caches: `rm -rf "$HOME/.cargo"`, broad `DerivedData` deletion, `pnpm store prune`;
- repository-wide sweeps: `"$ASW" worktree prune --apply`, `git clean -fdx`, blanket force removal, `-D`;
- `"$ASW" worktree remove ... --discard-tmp` while `tmp/` holds unclassified evidence;
- killing builds or services, `wt remove --reap`, or deleting a stale lock to force progress;
- runtime databases, accounts, credentials, source experiments, unmerged or unpushed work, another agent's checkout, or the only copy of proof.

## Main path

1. List each candidate your task created, from the trace, the commission and your own commands, with its `du -sh` size, and take `df -h`. Completion: each candidate has a path, a size and the step that created it.
2. Before removing a candidate, list what it holds, look for a process or session using it, and read the project's policy for it, because a name like `target` or `tmp` only says what the folder was meant for ([read ground truth first](../principle-read-ground-truth-first/SKILL.md)). Copy evidence out. Completion: each candidate is marked remove, with its command, or hold, with the check that failed.
3. Remove with the project's clean task, or else the allow-list command exactly as written. IF a candidate is a worktree whose PR has merged, load `references/merged-worktree-removal.md` and return the worktree removed, with the helper's result, or held, with its blocker. Ask the owner about anything outside the allow list, naming the path, its size and what would make it safe.
4. Confirm each removed path is gone and take `df -h` again. Report the change in free space from `df`; a sum of `du` sizes overstates it, because nested folders overlap and APFS clones share blocks.

## Return

Each candidate removed, with its command and the free space after, or held, with the check that failed; and any question for the owner.

## Worked example: 54 GiB in a merged worktree

On 2026-09-26 an agent found the Mac down to 14 GiB free, mostly from 54 GiB of Rust build output in `target/` inside one of its own worktrees whose PR had already merged. `cargo clean` brought free space back to 72 GiB.

Under this practice the merge is the trigger and the checks still run: fresh merge evidence, the worktree is this task's, nothing runs from `target/`, evidence is out of `tmp/`. Then the reference removes the whole worktree, `target/` with it. The consumer check can change the answer: on 2026-10-05, in another merged tree, two executables built from its `target/` were still running, so a full clean would have broken them; a package-scoped clean freed 31.9 GiB instead.

## Completion

Not done while a candidate has no remove-or-hold decision, a removal skipped a check, a command outside the allow list ran without the owner's yes, or the reported free space comes from `du`.
