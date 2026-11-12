# Native Providers: Claude

Owns Claude Code native Task / Agent launch and workspace-access encoding. Return the host Task / Agent encoding and workspace-access encoding.

This reference applies after `references/execution-forms.md` selects the Subagent form on this host. Sidekick-form roles use their separate session route.

## Launch

Use the host Task / Agent tool for the selected Claude model. Do not substitute `claude -p` when that tool can spawn the selected model.

Task / Agent may omit plan-mode or readonly flags. Do not hop to `claude -p --permission-mode plan` to invent one.

## Models

Formal Operator subagents use the Operator catalog. Implementer and Verifier native tasks select from their relevant `SKILL.md` catalog by the bounded task's own span, within the parent grant and actual host capability. They are not separate role seats or packets. Luna remains Operator-only.

No formal Operator catalog row runs as a native Subagent on Claude: the Operator Subagent rows are OpenAI Luna. Run those helpers as Sidekicks through agent-router, as `references/execution-forms.md` says. A standalone role/model off that catalog needs the owner's named override; this does not appoint coding helpers as roles.

Resolve the exact id with the exact-id rule in `SKILL.md` under Model catalog.

## Workspace Access

Access grants: the `limits` field in `../schemas/assignment-fields.ts`.

- Readers: packet access `inspect`. Parent verifies the repo worktree is unchanged after the receipt.
- Writers: packet access `write-and-execute` with its `writePaths`. Path-scoped enforcement: `dontAsk` with `Edit(<paths>/**)` allow rules. Prefer that when enforcement matters; otherwise the scope stays declared. Parent verifies the receipt's diff stayed inside the declared scope.

## Work-direction content

Formal delegated role work, continuations and corrections contain only role/files, encoded in the native tool’s documented message/prompt argument type. Model, effort, identity, history and access settings remain separate metadata. The recipient reads its role and current governing files; do not prefix a custom preamble or append the procedure. Reports and direct pair exchanges retain their existing contracts.
