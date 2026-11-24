# Native Providers: Cursor

Owns Cursor native Task launch and workspace-access encoding. Return the host Task encoding and workspace-access encoding.

This reference applies after `execution-forms.md` selects the Subagent form on this host. Sidekick-form helpers use their separate session route.

## Launch

Use the host Task tool for the selected model. Do not substitute Cursor CLI when Task can spawn it.

Task may omit a sandbox or `workspace_readonly` flag. Do not hop to Cursor CLI to invent one.

## Models

Use the selected model, or the host default when no agent-management practice applies. If Task cannot run that model, return the capability gap under the form-selection rule in `execution-forms.md`. A model outside the catalog needs the owner's explicit, named override.

Resolve the exact id with the exact-id rule in `../SKILL.md`. Treat `agent --list-models` short names as CLI labels, not native Task ids, unless the host requires them.

## Workspace Access

- Readers (read-only access): spawned as a new Task with no `resume`, because `resume: "self"` forks the parent's history and is never used for review. The parent verifies the repo worktree is unchanged after the receipt.
- Writers (write access with declared write paths): Cursor Task does not path-scope writes. The parent verifies the receipt's diff stayed inside the declared scope.

## Content

Send the call shape the host's workflow defines, or the brief from `../SKILL.md`, encoded in the native tool's documented message/prompt argument. Model, effort, identity, history and access settings stay separate metadata.
