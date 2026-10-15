# Dispel

Mission: scope defense for design review. Before reduction, challenge each candidate correction against the rails (the accepted requirements set, Specification obligations, and confirmed goal boundary), and sweep the design itself for over-delivery.

Predicate: mandatory for every review invocation; runs after the mode-complete and chunk passes are complete. An empty candidate set does not block it; the over-delivery sweep runs regardless.

Expected inputs: the complete review context with the complete target set (not summaries), the candidate-finding set from prior checks (possibly empty), and the complete governing-source set with the confirmed goal boundary and accepted requirements set.

Check boundary: read-only. A tmp scratchpad may hold working notes. Classifications are candidate evidence for the 🔎 Reviewer Sidekick, never dispositions.

## Challenge the Candidates

For each candidate, decide whether the rails require the proposed correction. When you run the deletion test on a proposed mechanism, name the quoted rail it serves, what would break against that rail without it, and whether a simpler or existing path already serves that clause ([keep a piece only when an outcome needs it now](../../../principle-justify-the-complexity/SKILL.md)).

```text
rails anchor the candidate serves: <accepted requirement identity | Specification obligation | goal-boundary field | none found>
governing source and exact section:
deletion test: without the questioned mechanism, do the confirmed obligations still hold?
mechanism necessity: smallest change that serves the quoted clause | one of
  several ways to serve it (if several, only the obligation gap can be a finding)
correction class: required by anchor | gold-plating | scope expansion |
  requirements-weakening | cannot tell without owner decision
evidence:
```

Name a correction that completes an unrequested mechanism's missing contracts (retries no obligation demands, a hardening layer no requirement names, an abstraction for imagined future consumers), even when it reads as diligence. A candidate that repairs a confirmed obligation is `required by anchor` and passes through untouched.

## Challenge the Design

Sweep the whole target set for over-delivery yourself. Map every material component, layer, mechanism, external dependency, and public contract in the design to the exact rail that asks for it, or to `absent`, deciding each with the same deletion test. A component that no requirement, obligation, failure policy, or authorized constraint calls for maps to `absent`, however well drawn. For each `absent`, return an over-delivery finding with the delivered element, the absent anchor, the smallest removal or the owner decision needed, and the consequence of keeping it unowned. The sweep is complete only when every material element carries a mapping.

Good: every candidate carries a rails classification with evidence; unrequested design elements are named even when they look like best practice.

Bad: rejecting valid corrections as over-engineering without the deletion test; blessing an unanchored subsystem because the diagram is clean; drifting into general design review.

Return: a check `complete | partial | blocked` result plus:

```text
candidate classifications: <per candidate; empty when none supplied>
over-delivery map: <design element -> rail | absent>
over-delivery findings:
owner decisions needed:
uncovered boundary:
```

Stop when every candidate is classified and every material design element carries its rail-or-absent mapping. Do not generate new design findings, re-review the mode, or issue dispositions.
