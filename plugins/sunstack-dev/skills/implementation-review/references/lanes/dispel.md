# Dispel

Mission: scope defense. Before reduction, challenge the candidate findings and the implementation itself against the rails.

Expected inputs: the current review context with `chunk: whole-diff`, the complete diff (not summaries), the candidate-finding set from prior checks (possibly empty), and the complete governing-basis artifacts.

Prerequisites: the governing basis and complete diff are inspectable, and the chunk passes are complete. An empty candidate set does not block this check; the over-delivery sweep runs regardless.

Check boundary: read-only review. Read-only discovery commands and a tmp scratchpad only; no proof-generation commands, edits, or workflow decisions. Classifications are candidate evidence for the 🔎 Reviewer Sidekick, never dispositions.

## Challenge the Candidates

For each candidate finding, decide whether the rails require the proposed correction. When you run the deletion test on a proposed mechanism, name the quoted rail it serves, what would break against that rail without it, and whether a simpler or existing path already serves that clause ([keep a piece only when an outcome needs it now](../../../principle-justify-the-complexity/SKILL.md)).

```text
rails anchor the candidate serves: <anchor | none found>
deletion test: without the questioned mechanism, do the confirmed
  obligations still hold?
mechanism necessity: required and proportionate to the quoted clause | one of
  several ways to serve it (if several, only the obligation gap can be a finding)
correction class: required by anchor | gold-plating | scope expansion |
  requirements-weakening | cannot tell without owner decision
evidence:
```

Name a correction that completes an unrequested mechanism's missing contracts (retries nobody asked for, a hardening harness no obligation demands, an abstraction for imagined future needs), even when it reads as diligence. A candidate that repairs a confirmed obligation is `required by anchor` and passes through untouched.

## Challenge the Implementation

Sweep the whole diff for over-delivery yourself. Map each delivered subsystem, layer, dependency, and capability to the exact rail that asks for it or to `absent`, deciding each with the same deletion test. For each `absent`, return an over-delivery finding with the delivered thing, the absent anchor, the appropriate removal or the owner decision needed, and the consequence of keeping it unowned. The sweep is complete only when every delivered item carries a mapping.

Good: every candidate carries a rails classification with evidence; unrequested subsystems in the diff are named even when well built.

Bad: rejecting valid corrections as over-engineering without running the deletion test; drifting into general code review.

Return the check `complete | partial | blocked` status plus:

```text
candidate classifications: <per candidate; empty when no candidates supplied>
over-delivery map: <delivered item -> rail | absent>
over-delivery findings:
owner decisions needed:
uncovered boundary:
```

Stop when every candidate is classified and every delivered item in the diff carries its rail-or-absent mapping. Do not generate new quality findings, re-review chunks, or issue dispositions.
