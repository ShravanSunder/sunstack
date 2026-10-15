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

IF this run reaches a `principle-*` call, load `../../shared-references/principle-reading.md` before that call and return the principle file to read and whether a read you already made counts.

1. Frame one to five researchable questions. Name the decision target, non-goals, source classes, freshness requirement, and what would support, refute, or complicate each question.
2. Re-anchor locally when a repo is involved: read current code, docs, specs, plans, runbooks, findings, and relevant sibling repos. Treat memory and session summaries as discovery.
   IF a claim rests on a summary, memory, quote or label whose source you haven't opened, load `principle-read-ground-truth-first` and return that source, opened, with the claim labeled by a Boundaries class.
3. MUST load `references/tool-routing.md` and return the source routes for the questions. MUST load `references/lane-packets.md` as source-class checklists and return the selected classes in order with a reason for each skipped class.
4. Walk selected source classes one at a time. Record verbatim queries, opened sources, null results, and unsearched classes. Use current web or docs sources where freshness matters. Keep evidence classes separate from inference.
5. IF a conclusion is load-bearing, load `principle-verify-before-accepting` and return the conclusion, the anchor you opened for it and what that anchor doesn't cover. Read surrounding text, compare stale memory with live files, and surface contradictions or competing hypotheses. Separate what a source proposes from evidence of adoption; absent adoption, report only that it was proposed. IF a conclusion is load-bearing or embeds the user's own hypothesis, the assignment owner may commission or resume one independent 🔎 Reviewer Sidekick through `practices-manage-agents`. IF the countercheck is commissioned, MUST load `references/countercheck.md` for its handoff and return per-claim `complete | partial | blocked` results before synthesis. Otherwise record why it was not selected.
6. Synthesize by question. Findings move from `lead` to `investigated`, then `accepted | refuted | unresolved`. Zero accepted findings is valid. Say per question whether the evidence supports, refutes or complicates it. IF the answer combines several sources or competing findings for another reader, load `principle-write-for-the-reader` and return the answer ordered for the decision named in step 1. State the conclusion first, with the anchors and uncertainty that affect it; a small anchored transcription needs no broader synthesis or survey.

For substantial research, MUST load `references/evidence-ledger.md` and write a repo-local ledger under `tmp/practices-research/<date>-<slug>/`, unless the user asked for chat-only or no files or the tool surface cannot write. Name the exception in the result. Send progress after re-anchor, after source-class coverage, and before synthesis.

## Return

Return the checked answer to the commissioner, with the anchors it rests on and its limits. Give the questions, source-class coverage, verbatim queries, every null result, competing hypotheses and gaps in the ledger when one is written, otherwise in the reply; include countercheck results only when selected. IF the evidence shows a missing requirement, specification or design decision that another owner must fill, load `../../shared-references/phase-return-tokens.md` and return that gap token with its evidence. A completed answer returns without a phase token; the caller decides what follows.
