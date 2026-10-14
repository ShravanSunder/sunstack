# Native Providers: Claude

Owns Claude Code native Task / Agent launch and workspace-access encoding. Return the host Task / Agent encoding and workspace-access encoding.

This reference applies after `references/execution-forms.md` selects the Worker form on this host. Sidekick-form roles use their separate session route.

## Launch

Use the host Task / Agent tool for the selected Claude model. Do not substitute `claude -p` or ACPX when that tool can spawn the selected model.

Task / Agent may omit plan-mode or readonly flags. Do not hop to `claude -p --permission-mode plan` to invent one.

## Models

No catalog row runs as a native Worker on Claude: the Operator and Researcher Worker rows are OpenAI Luna or Sol. Run those helpers as Sidekicks through agent-router, as `references/execution-forms.md` says. A Claude model in Worker form needs the owner's named override.

Resolve the exact id with the exact-id rule in `model-catalog.md`.

## Workspace Access

Access grants: the `limits` field in `agent-job-packet.md`.

- Readers: packet access `inspect`. Parent verifies the repo worktree is unchanged after the receipt.
- Writers: packet access `write-and-execute` with its `writePaths`. Path-scoped enforcement: `dontAsk` with `Edit(<paths>/**)` allow rules. Prefer that when enforcement matters; otherwise declared. Parent verifies the receipt's diff stayed inside the declared scope.
