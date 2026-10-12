---
name: principle-tradeoffs-are-the-work
description: "Use when a real choice changes complexity, risk, cost, or reversibility, or when one option is presented for a decision that has others. Lay out the credible alternatives, what each gains and costs, who pays, and the assumption that must hold."
disable-model-invocation: true
---

# Tradeoffs Are the Work

**Apply when** a real choice changes complexity, risk, cost, or reversibility, or when only one option is being presented for a decision that has others.

**Rule.** Lay out the credible alternatives as changes to the current design. For each, say what we gain, what we pay, and who pays: the user, the operator, the next developer. Name the load-bearing assumption out loud, with the signal that would prove it wrong. Recommend one. Scale the rigor to reversibility: a one-way door (a stored format, a public contract, a new process boundary) gets more; a reversible, low-stakes step gets a sentence.

**Why.** Every design decision is a tradeoff, and the dangerous ones are those nobody noticed making. An unstated assumption is a load-bearing wall nobody labeled.

**The test.**

1. Is there a credible option you didn't show?
2. Who bears the cost of the chosen option?
3. Which assumption, if wrong, flips the choice, and what would tell you?

**Distinct from.**

- `principle-dont-over-engineer` removes what no outcome needs; this card weighs options that each meet the outcome.
- `principle-one-owner-per-truth` takes over when a boundary is settled and only needs a named owner; there is no tradeoff to weigh.

**Applied means** you name the alternatives you weighed, the assumption you made explicit, and the choice it changed or confirmed.

## Worked case

A design adds fuzzy search by putting the index in the app's existing database, "because it's already there". The unstated assumption is that the database's text matching can rank typo-tolerant results fast enough at the expected size. It can't, and the feature is rebuilt. Better: show the options (the database's full-text search, an in-memory index, a search service) with their gains and costs, and name the assumption, "typo-tolerant ranking over 100,000 rows in under 50 ms", with the five-minute check that would refute it.

## Overkill

When one feasible option meets the settled requirements and no assumption would change the conclusion, a comparison table is ceremony. A reversible, local choice needs one sentence.
