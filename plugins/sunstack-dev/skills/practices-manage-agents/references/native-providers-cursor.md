# Native Providers: Cursor

Owns Cursor native Task launch and workspace-access encoding. Return the host Task encoding and workspace-access encoding.

This reference applies after `references/execution-forms.md` selects the Worker form on this host. Sidekick-form roles use their separate session route.

## Launch

Use the host Task tool for a model listed below. Do not substitute Cursor CLI or ACPX when Task can spawn the selected model.

Task may omit a sandbox or `workspace_readonly` flag. Do not hop to Cursor CLI to invent one.

## Models

| Role | Model | Route |
| --- | --- | --- |
| 📚 Researcher Worker | xAI Grok 4.6, medium, in place of the Sol medium Daily-driver row | native Task |

The Operator and Luna Researcher rows run through agent-router as Sidekicks when Task can't select their model.

Resolve the exact id with the exact-id rule in `SKILL.md` under Model catalog. Treat `agent --list-models` short names as CLI labels, not native Task ids, unless the host requires them.

## Workspace Access

Access grants: the `limits` field in `agent-job-packet.md`.

- Readers: packet access `inspect`, spawned as a new Task with no `resume` — `resume: "self"` forks the parent's history and is never used for review. Parent verifies the repo worktree is unchanged after the receipt.
- Writers: packet access `write-and-execute`, its `writePaths` declared. Cursor Task does not path-scope writes. Parent verifies the receipt's diff stayed inside the declared scope.
