---
name: ops-observability-stack
description: Use when starting, checking, using, debugging, or verifying the shared local OpenTelemetry and Victoria stack for AgentStudio, Agent VM, OpenClaw, beta apps, debug apps, or any repo that emits OTLP locally.
---

# Ops Observability Stack

The runnable stack source of truth is `~/dev/ai-tools/observability`. App repos are telemetry producers: they may own launch flags, markers, state files, and source-side scrubbing, but they must not own Docker Compose, Victoria service lifecycle, or generic Victoria query cookbooks.

IF shared-stack lifecycle or producer ownership is disputed, load `principle-one-owner-per-truth` and return the existing owner from current sources. Inspect the shared stack and the producer contract before assigning the change; keep app emission work at the producer and shared lifecycle work at the stack.

Choose the smallest loop first:

- Stack lifecycle only: use `~/dev/ai-tools/observability/README.md`.
- Producer requirements: read `references/producer-contract.md`.
- Resource labels, marker/state-file keys, or service names: read `references/resource-naming.md`.
- AgentStudio debug or beta: read `references/agentstudio-loop.md`.
- Agent VM, OpenClaw, or `shravan-claw-beta`: read `references/resource-naming.md` and `references/agent-vm-loop.md`.
- Victoria proof or debugging queries: read `references/victoria-queries.md`.

IF health or telemetry observations will be relied on to close a proof claim, load `principle-verify-before-accepting` and return the actual target, correlated observation and supported scope. Collector health supports a health claim; a stale sample from another worktree cannot establish current app emission. Use the selected query loop to match the producer, resource labels and fresh marker to the target. Query access failure or timeout leaves emission inconclusive. Reuse an adequate current correlated observation for its specific claim without another equivalent app run.

## Operating Model

Use one shared local Victoria stack and separate producers with resource attributes:

```bash
~/dev/ai-tools/observability/observability-stack up
~/dev/ai-tools/observability/observability-stack status
~/dev/ai-tools/observability/observability-stack smoke
```

Explicit observability launchers are strict: if the collector is absent, they should fail with a clear `Run: mise run observability:up` or equivalent message. Ordinary app startup is fail-open and must not crash when the collector is down.

Never move the shared stack to `devfiles`, and do not create per-app Victoria Compose files unless the user explicitly asks for a separate managed stack.

## Separation Rule

Keep these responsibilities apart:

- `ai-tools/observability`: shared Docker Compose, collector config, retention, smoke checks, and lifecycle commands.
- This skill: agent-facing workflow, Victoria query recipes, producer schema, and debugging loops.
- App repos: minimal producer adapters, strict debug/beta launchers, state files, marker emitters, and app-specific smoke tests.
- Agent VM managed mode: deployment-owned Victoria stack for that runtime only.
- Agent VM external mode: local development points to this shared ai-tools stack.

## Guardrails

- Accept only loopback OTLP endpoints and health URLs for shared local mode.
- Use `dev.repo.hash` and `dev.worktree.hash` as grouping keys.
- Keep branch names searchable but out of VictoriaLogs stream fields.
- Do not export prompts, payloads, raw paths, raw errors, tokens, passwords, or API keys.
- Treat collector redaction as defense-in-depth; producer code must scrub first.
- Do not use stale logs as proof. Fresh runs need fresh markers and state files.

Complete when the requested operational loop has an observed result or an exact access or evidence gap, and the report stays within what that target's observations establish.
