# Platform

## Standards

- For Codex, shared `SKILL.md` frontmatter carries no `disable-model-invocation` or `user-invocable` field unless the active validator and target client explicitly support it.
- For Claude, frontmatter uses `disable-model-invocation: true` or `user-invocable: false` only when the user requests that behavior or the target client's contract requires it.
- A principle or domain skill carries both hide settings, by the owner's decision: `disable-model-invocation: true` in `SKILL.md` and `policy.allow_implicit_invocation: false` in `agents/openai.yaml`.
- A skill shared by Codex and Claude is checked on both before shipping: its source files, Codex metadata and validation, Claude manifest, marketplace metadata and validation, and changelog and version.
- A Codex-only or Claude-only change says why, and avoids mirrored churn.
- The Claude plugin manifest's and the Claude marketplace's versions stay in step with the source plugin's version when user-visible plugin behavior changes.
- The Codex marketplace's policy and path metadata changes only when availability, path, category or policy changes.
- A dated changelog entry stays within 20 lines, with longer proof under `docs/changelog/references/`, linked from the entry; the repository's changelog conventions own the entry's shape.
- An installed-cache or home-level refresh is never proof, on either platform.
- A refresh happens only when release or readback is explicitly in scope, and is reported as its own shipping status, not as routine validation.
- Every platform surface a change touches is reported as run, not run with its reason, or not applicable.
- When the Codex quick validator's PyYAML need isn't met, it is reported as not run with that reason; nothing is installed to make it run.

## Facts

Codex:

- A skill lives in `plugins/<plugin>/skills/<skill-name>/`.
- `SKILL.md` requires `name` and `description` in its frontmatter.
- `agents/openai.yaml` holds the Codex UI metadata (display name, short description, default prompt) and the skill's invocation policy.
- `policy.allow_implicit_invocation: false` in `agents/openai.yaml` is the Codex encoding for a skill that is user-invocable but not automatically model-invocable through prompt matching.
- `references/`, `scripts/` and `assets/` are optional.
- The Codex quick validator checks a skill's folder and frontmatter. It needs PyYAML, and its path resolves from the active Codex skill installation or the local development environment.
- Codex availability comes from the source plugin and the Codex marketplace's policy and path metadata.

Claude:

- `disable-model-invocation: true` is Claude's frontmatter encoding for a skill that should not be model-invocable, and `user-invocable: false` for one that should not be user-invocable. Both are client-specific encodings of the invocation capabilities.
- Claude skill delivery comes through the plugin source and its `.claude-plugin` metadata, when the owning plugin supports Claude.

Both:

- A skill hidden from model invocation is reached by its callers reading its `SKILL.md` by path.

## Which surfaces a change touches

Walk the change against this list and give each entry its report: `SKILL.md` frontmatter, `agents/openai.yaml`, the plugin's Codex and Claude manifests, the marketplace metadata, the version, the changelog entry, and the validators that read them.

A change to nothing but a skill's `agents/openai.yaml` default prompt is Codex-only; its report says so, and the Claude manifest stays as it is.

Running the validators, moving the versions, writing the changelog entry and any scoped refresh are shipping actions, kept by the skill that ships. This topic holds the facts and standards those actions meet.

## Reporting

```text
Codex quick validator: not run (PyYAML is not installed on this host)
Claude plugin validation: run, passed (packaging shape only)
Codex marketplace metadata: not applicable (no availability, path, category or policy change)
installed caches: not refreshed (release not in scope)
```

Each line names the validator or surface, its state, and the reason for that state.

## When to stop

Complete when each platform surface the change touches is listed with its report, and each standard above that applies is named as kept or broken. Return the list.
