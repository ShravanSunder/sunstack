---
name: practices-research
description: "Use when a task needs source gathering, prior-art research, current docs or web evidence, or memory, session-log, or saved-reader research before design, planning, review, or discussion can continue. Not for extracting unwritten owner meaning."
---

# Practices: Research

Turn a fuzzy evidence need into bounded questions, walk relevant source classes in order, and return a checked answer with inspectable support and limits. The assigned researcher owns the entire walk. Research gathers evidence; the receiving owner decides design, plans, implementation, and review verdicts.

## Boundaries

- Stay read-only against product code unless the user explicitly switches to implementation.
- Start with current local code and docs when the question affects a local repo. Memory and older notes help locate sources but do not replace live evidence.
- Preserve user-named systems, repos, tools, articles, and URLs.
- Label every claim as direct observation, cited source summary, user-memory evidence, inference, or unresolved. A load-bearing supported conclusion needs a primary anchor or an explicitly labeled gap.
- Record null results with the verbatim query and distinguish `searched, nothing found` from `not searched` and `no route available`.
- Return material design decisions to the commissioner. The researcher may synthesize evidence within the assignment but does not author the next phase's artifact.

## Ordered Workflow

1. Frame one to five researchable questions. Name the decision target, non-goals, source classes, freshness requirement, and what would support, refute, or complicate each question.
2. Re-anchor locally when a repo is involved: read current code, docs, specs, plans, runbooks, findings, and relevant sibling repos. Treat memory and session summaries as discovery.
   IF a material claim depends on indirect material, version, path or decision origin, load `principle-read-ground-truth-first` and return what the decisive source establishes versus inference. Carry that distinction into the source walk: an authentic excerpt may quote a proposal without showing that anyone adopted it.
3. MUST load `references/tool-routing.md` and return the source routes for the questions. MUST load `references/lane-packets.md` as source-class checklists and return the selected classes in order with a reason for each skipped class.
4. Walk selected source classes one at a time. Record verbatim queries, opened sources, null results, and unsearched classes. Use current web or docs sources where freshness matters. Keep evidence classes separate from inference.
5. Before adopting a load-bearing conclusion, MUST load `principle-verify-before-accepting` and return the precise conclusion, inspected support and limit. Read surrounding text, compare stale memory with live files, and surface contradictions or competing hypotheses. Separate what a source proposes from evidence of adoption; absent adoption, report the narrower fact. That establishes provenance, not authority to choose the architecture. IF a conclusion is load-bearing or embeds the user's own hypothesis, the assignment owner may commission or resume one independent 🔎 Reviewer Sidekick through `practices-manage-agents`. IF the countercheck is commissioned, MUST load `references/countercheck.md` for its handoff and return per-claim `complete | partial | blocked` results before synthesis. Otherwise record why it was not selected.
6. Synthesize by question. Findings move from `lead` to `investigated`, then `accepted | refuted | unresolved`. Zero accepted findings is valid. IF several sources or competing findings must be explained to another reader, load `principle-write-for-the-reader` and return the answer arranged around that receiving decision. State the conclusion first, with the anchors and uncertainty that affect it; a small anchored transcription needs no broader synthesis or survey.

For substantial research, MUST load `references/evidence-ledger.md` and write a repo-local ledger under `tmp/practices-research/<date>-<slug>/`, unless the user asked for chat-only or no files or the tool surface cannot write. Name the exception in the result. Send progress after re-anchor, after source-class coverage, and before synthesis.

## Return

Return the checked answer to the commissioner, with its decisive anchors and limits. For a substantial walk, link the ledger with questions, coverage, verbatim queries and consequential nulls, competing hypotheses and gaps; include countercheck results only when selected. A completed bounded answer needs no phase verdict. IF the research exposes an applicable gap or transition for another owner, load `../../shared-references/phase-return-tokens.md` and return that token with its supported payload. Evidence completion alone grants no planning or implementation readiness; the caller decides what follows.
