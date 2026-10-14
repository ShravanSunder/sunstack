# Alternatives and Crux

This reference owns the structural crux, forces, credible alternatives, selection tradeoff, and revisit signals.

Expected inputs: authoritative requirements, current-system model, constraint degree, and open feasibility evidence.

Return the crux, the credible alternatives, the chosen boundary, its cost and who pays, the evidence that could overturn it, and any decision or evidence gap that blocks the choice.

## Find the Crux

Ask which few structural decisions determine most of the design:

- where authoritative state lives;
- which component owns coordination or policy;
- whether a boundary is local, process, network, trust, or lifecycle;
- whether consistency, latency, compatibility, or failure isolation dominates;
- which seam must be real for proof.

For each preferred claim, invert it: what evidence or scenario would make the opposite boundary correct?

## Build Credible Alternatives

Use minimal-change, clean-boundary, pragmatic, and risk lenses only when they produce materially different structures. For each viable option:

```text
component/owner shape
interfaces and state placement
requirements served well/poorly
complexity introduced and removed
failure/security/proof consequences
migration/cutover implications
accepted debt and payer
falsifier or revisit signal
```

Do not pad a non-choice into two labels. A first design has no predecessor-improvement burden. A redesign must name what materially improves and where cost moves.

Good: options differ on a real owner, boundary, consistency, lifecycle, or proof decision.

Clean case: the existing `InvoiceLedger` already owns invoice state and the change adds one field to its settled event. No credible alternative moves that ownership, so the design says so in one sentence and spends its attention on the event's consumers.

Bad: “simple vs scalable,” the preferred design plus a strawman, or alternatives that share the same load-bearing structure.

Complete when: selection follows from named forces, rejected options remain credible, debt has a payer/revisit signal, and missing product meaning routes back rather than being decided here.
