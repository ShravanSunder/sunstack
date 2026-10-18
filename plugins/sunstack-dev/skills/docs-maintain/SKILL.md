---
name: docs-maintain
description: "Use when updating, cleaning up, reconciling, archiving, or promoting project docs (AGENTS.md, README, changelogs, runbooks, architecture docs, workflow artifacts) from settled code or decisions. Not for authoring unsettled spec or design meaning."
---

# Docs Maintain

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

Maintain docs as durable working memory for humans and agents. This skill owns document lifecycle: keeping repo docs, `AGENTS.md`, `README.md`, changelogs, runbooks, architecture docs, and existing workflow artifacts consistent with current code and decisions.

Core pipeline:

```text
docs request
  -> inventory doc roles
  -> inspect current code/docs/session evidence
  -> classify create/update/cleanup/drift
  -> decide what drives: code, docs, plan, or user intent
  -> propose purge/update when destructive or ambiguous
  -> edit narrow docs
  -> verify references and stale links
```

## Core Rules

- Treat docs as claims. Verify important claims against current code, config, tests, release artifacts, or accepted plans.
- Separate docs for agents from docs for humans:
   - `AGENTS.md` is durable operating guidance for agents.
   - `README.md` is the human-facing advertisement and quick orientation.
   - architecture docs, runbooks, and changelogs carry durable working context.
   - specs, plans, debug notes, research packets, and handoffs are stage artifacts until this skill classifies them as durable, archived, or disposable.
- A design set's `index.md` and its HTML page are two entries over the same Markdown, so this separation never splits them: keep both pointing at the one source, and never fork a copy of its text into the page or a second doc.
- Keep `AGENTS.md` short. Move runbook detail to docs and link it.
- Do not let old plans/specs/debug notes displace current source-of-truth docs by inertia.
- Do not replace phase skills for active artifact work: `spec-design`, `program-design`, `spec-program-review`, `spec-handoff`, `plan-handoff`, `implementation-handoff`, `implementation-review` for implementation review, `implementation-pr-wrapup`, and `debug-investigation` own their lanes. Retired skill trees are provenance, not runtime routes; active planning, execution, and implementation review use their current named owners.
- Before purging or rewriting docs, propose the change and say what will be preserved.
- When code and docs disagree, identify the driver and, IF it is not obvious, load `../../shared-references/owner-decision-brief.md` and return a brief of both versions.
- The parent owns final doc edits; bounded inventory goes to a 🔧 Operator and stale-doc research to a 📚 Researcher Worker, through `practices-manage-agents`.
- Use `practices-manage-agents` only for model-agent call/session mechanics; keep doc roles, staleness, and source-of-truth classification here.
- Use progressive disclosure: load only the workflow reference that matches the docs job.

## Workflow

1. Resolve scope:
   - repo path
   - requested docs
   - whether edits are allowed
   - whether stale-doc purge is in scope
2. Inventory doc roles:
   - `AGENTS.md`
   - `README.md`
   - `docs/architecture`
   - `docs/specs` or `docs/superpowers/specs`
   - `docs/plans` or `docs/superpowers/plans`
   - `docs/wip`
   - `tmp/*-workflows`
   - `docs/changelog`
3. Classify the job:
   - create new docs
   - update existing docs
   - clean up/purge stale docs
   - classify workflow artifacts as current, historical, disposable, or promotion candidates
   - reconcile discrepancies
   - add changelog/runbook references
4. Verify source-of-truth:
   - code/config/test reality
   - accepted spec/plan
   - release or PR state
   - user decision
5. Edit narrowly:
   - concise `AGENTS.md`
   - clear `README.md`
   - detailed docs under the appropriate docs folder
   - changelog entries when meta-instructions or workflows change
   - IF the edit rewrites human sentences in a README, architecture doc, runbook, or changelog, load `../../shared-references/humanizer.md` in file mode and return the rewritten prose plus the fences, YAML, commands, and paths left unchanged. Classifying, purging, linking, or promoting without a prose rewrite does not load it. Completion: claims, names, numbers, dates, and quotes match the source, or the missing fact is named instead of invented.
   - IF an edited Markdown file is included by an embedded page (an HTML file whose `data-ex-markdown-source` records name it), load `../../shared-references/diagram-rendering-and-fallbacks.md` and return its freshness-on-edit result: the comparison `identical` or `stale`, and each derived view and dependent row rechecked. Completion: the page is reported current only after an `identical` comparison with every rechecked view and row agreeing; otherwise it is reported stale with what differs.
6. Validate:
   - no broken obvious links
   - no stale source-of-truth claims
   - no embedded page left stale against a Markdown file this change edited
   - no duplicated long detail in `AGENTS.md` and README
   - no unrelated docs churn

## Progressive Disclosure

- Before deciding where content belongs, MUST load `references/doc-roles.md` and return the file or folder it belongs in.
- IF the job is a create, update, cleanup, or discrepancy workflow, load `references/workflows.md` to follow that workflow and return the changes made or proposed.
- Before deleting, archiving, or rewriting stale plans/specs, MUST load `references/staleness-and-purge.md` and return its Proposal Shape filled for each candidate.
- IF adding `docs/changelog` or reference excerpts, load `references/changelog-runbooks.md` and return the changes made and the links updated.
- IF auditing or updating workflow skills against admired upstream sources, load `../../docs/source-inspiration-catalog.md` and return the changes made or proposed.

## Output Shape

Return:

- docs inspected
- source-of-truth driver
- changes made or proposed
- stale docs preserved, moved, or left alone
- links/references updated
- full clickable artifact links (absolute path + line) for docs or artifacts the human is expected to open
- validation performed

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `practices-show-me-your-work`.
