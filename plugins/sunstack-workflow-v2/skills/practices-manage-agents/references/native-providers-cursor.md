# Native Providers: Cursor

Owns Cursor native Task launch and workspace-access encoding. Return the host Task encoding and workspace-access encoding.

This reference applies after `references/execution-forms.md` selects the Subagent form on this host. Sidekick-form roles use their separate session route.

## Launch

Use the host Task tool for a model listed below. Do not substitute Cursor CLI when Task can spawn the selected model.

Task may omit a sandbox or `workspace_readonly` flag. Do not hop to Cursor CLI to invent one.

## Models

The rows below select formal Operator subagents. Native coding helpers are bounded children of the assigned Implementer Sidekick, using its approved model/access context through the host interface. They are not separately commissioned Implementer/Verifier/Reviewer seats and create no new catalog row. Luna remains Operator-only.

| Role | Model | Route |
| --- | --- | --- |
| 🔧 Operator Subagent | the model of the catalog row in `SKILL.md` | native Task when Task can select that model; otherwise agent-router as a Sidekick, or report the exact gap |

A model off the catalog, such as xAI Grok in place of the Luna Operator row, needs the owner's explicit, named override; this manual is not one.

Resolve the exact id with the exact-id rule in `SKILL.md` under Model catalog. Treat `agent --list-models` short names as CLI labels, not native Task ids, unless the host requires them.

## Workspace Access

Access grants: the `limits` field in `../schemas/assignment-fields.ts`.

- Readers: packet access `inspect`, spawned as a new Task with no `resume`, because `resume: "self"` forks the parent's history and is never used for review. Parent verifies the repo worktree is unchanged after the receipt.
- Writers: packet access `write-and-execute`, its `writePaths` declared. Cursor Task does not path-scope writes. Parent verifies the receipt's diff stayed inside the declared scope.

## Work-direction content

Formal delegated role work, continuations and corrections contain only role/files, encoded in the native tool’s documented message/prompt argument type. Model, effort, identity, history and access settings remain separate metadata. The recipient reads its role and current governing files; do not prefix a custom preamble or append the procedure. Reports and direct pair exchanges retain their existing contracts.
