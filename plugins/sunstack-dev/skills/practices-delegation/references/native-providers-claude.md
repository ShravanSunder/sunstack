# Native Providers: Claude

Owns Claude Code native Task / Agent launch and workspace-access encoding. Return the host Task / Agent encoding and workspace-access encoding.

This reference applies after `execution-forms.md` selects the Subagent form on this host. Sidekick-form helpers use their separate session route.

## Launch

Use the host Task / Agent tool for the selected Claude model. Do not substitute `claude -p` when that tool can spawn the selected model.

Task / Agent may omit plan-mode or readonly flags. Do not hop to `claude -p --permission-mode plan` to invent one.

## Models

Use the model the delegating skill chose: from the host's agent-management practice when there is one, otherwise the host default. A model the host can't run natively, such as an OpenAI model, runs as a Sidekick through agent-router, as `execution-forms.md` says. Resolve the exact id with the exact-id rule in `../SKILL.md`.

## Workspace Access

- Readers (read-only access): the parent verifies the repo worktree is unchanged after the receipt.
- Writers (write access with declared write paths): path-scoped enforcement is `dontAsk` with `Edit(<paths>/**)` allow rules. Prefer that when enforcement matters; otherwise the scope stays declared. The parent verifies the receipt's diff stayed inside the declared scope.

## Content

Send the call shape the host's workflow defines, or the brief from `../SKILL.md`, encoded in the native tool's documented message/prompt argument. Model, effort, identity, history and access settings stay separate metadata.
