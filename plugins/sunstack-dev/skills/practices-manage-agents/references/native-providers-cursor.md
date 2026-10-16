# Native Providers: Cursor

Owns Cursor native Task launch and workspace-access encoding. Return the host Task encoding and workspace-access encoding.

This reference applies after `references/execution-forms.md` selects the Worker form on this host. Sidekick-form roles use their separate session route.

## Launch

Use the host Task tool for a model listed below. Do not substitute Cursor CLI or ACPX when Task can spawn the selected model.

Task may omit a sandbox or `workspace_readonly` flag. Do not hop to Cursor CLI to invent one.

## Models

| Role | Model | Route |
| --- | --- | --- |
| 📚 Researcher Worker, 🔧 Operator Worker | the model of the catalog row in `SKILL.md` | native Task when Task can select that model; otherwise agent-router as a Sidekick, or report the exact gap |

A model off the catalog, such as xAI Grok in place of the Sol medium Researcher row, needs the owner's explicit, named override; this manual is not one.

Resolve the exact id with the exact-id rule in `SKILL.md` under Model catalog. Treat `agent --list-models` short names as CLI labels, not native Task ids, unless the host requires them.

## Workspace Access

Access grants: the `limits` field in `../schemas/assignment-fields.ts`.

- Readers: packet access `inspect`, spawned as a new Task with no `resume`, because `resume: "self"` forks the parent's history and is never used for review. Parent verifies the repo worktree is unchanged after the receipt.
- Writers: packet access `write-and-execute`, its `writePaths` declared. Cursor Task does not path-scope writes. Parent verifies the receipt's diff stayed inside the declared scope.
