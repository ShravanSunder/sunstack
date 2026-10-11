# Findings and the Review Result

This reference owns how candidate findings become verified findings: checking each one, its shape and route, scope defense, mental-model breaks, filling the `DesignReviewResult`, verifying corrections, and the convergence rule.

Expected inputs: candidate findings from the document checks, the tie table, and any proof-claim or focused check; the unavailable sources; and on later rounds, the earlier review's findings. Return: every finding with its disposition and route, one `DesignReviewResult`, and after corrections, each finding marked closed or open.

## Verify Each Candidate

1. Open the target at its anchor.
2. Name the line it puts at risk (a `U`, an `R`, or a confirmed boundary), quote it, and say in plain words what fails if the concern stays.
3. Reproduce the contradiction or the failure path.
4. When reading cannot settle one factual question, make one bounded source lookup and record its anchors.
5. Merge duplicates by root cause, and keep conflicting evidence side by side.

Re-anchor before accepting a finding: name the line it serves, whether the existing design already satisfies it, the concrete failure, the smallest correction, and whether that correction stays inside the confirmed boundary. Then return the existing `accepted | rejected | contested | unverified` disposition; do not create a second checkpoint status.

Missing evidence makes a finding `unverified`, not `rejected`. A category name ("the reliability requirement") is not an anchor until the exact line is opened and quoted. A style preference with no reader or behavior effect is rejected.

## The Finding

Each accepted finding fills the `Finding` shape: its `id`, the `document`, the `anchor` (path and line), the `problem` in plain words, the `U` or `R` it `affects`, the smallest `correction`, its `route`, and its `state`. Write it so the owner of the fix can act without the review's history.

Good: "F3 · verification-design · vd.md:41 · U4's only check is the version handshake; nothing observes the event reaching the pane · affects U4, R6 · add a core-outcome check on the installed agent · route: verification-design · open"

Bad: "F3 · verification seems thin · consider more tests"; a correction that offers three alternatives; a route left for the reader to infer.

## Routes

```text
Requirements or Specification      -> spec-design
structure                          -> program-design
tests                              -> test-design
proof                              -> verification-design
missing owner meaning, or a break  -> lead (owner brief)
```

A correction that spans the Specification and a document below it routes to `spec-design` first; the lower document is corrected after the rule is settled.

## Scope Defense

Two cases, two outcomes:

- **A candidate that adds something no line asks for** (retries no rule demands, a hardening layer, an abstraction for imagined future callers) is `rejected: scope expansion` and listed as an observation for the owner, never as an owner decision. When several mechanisms could serve a rule, the finding names the unmet rule, never the reviewer's preferred mechanism.
- **An element already in the design with nothing above it** (an orphan from the tie table) is an accepted finding. Its default correction is deletion, routed to the document's owner. If the owner may want it kept, route it to the Lead for a brief.

Before accepting a finding that asks the design to complete a questioned mechanism, test deletion first: if removing the mechanism keeps every rule, deletion is the correction.

## When the Model Breaks

A candidate whose correction cannot be written inside the current design, because an assumption the design relies on is false (an interface, ordering, ownership, or guarantee the current system does not provide), is a break, not an ordinary finding. Route it to the Lead with the failed assumption, the evidence, and its consequence. It does not consume a correction round.

## The Result

Fill one `DesignReviewResult`:

- `result`: the first that applies, in this order: `not-converging`, `owner-decision`, `evidence-gap`, `corrections-routed`. `ready` only when every reviewed document is `checked`, no finding is open, no tie is unchecked, no source or confirmation is missing, and no owner decision is pending. A `partial` or `blocked` document makes the result `evidence-gap`, with the exact unfinished boundary, unless an earlier result applies.
- `reviewed`: every target with `checked`, `partial`, or `blocked`, and what was not checked.
- `unavailableSources`: every governing source that could not be read.
- `ties`: the tie table.
- `findings`: every finding, open and closed.

The result states findings and limits. It is not acceptance and carries no edit or plan.

## After Corrections

The same Reviewer reopens each accepted finding at its current anchor and marks it `closed` or `open`, citing the anchor. It does not rerun the whole review: the changed documents and everything tied below them are checked again. A concrete, source-backed finding that remains or was introduced inside the accepted boundary admits another round; pedantic, stylistic, already-satisfied, confidence-only, and generic-freshness concerns do not.

## Convergence

> After each correction pass, compare this review with the previous one using the existing finding identity (anchor plus failure form). Return `not-converging` when either holds:
> 1. **Recurrence.** A finding the Reviewer verified closed in an earlier review is accepted again. A finding whose correction never closed is still open, which is not a recurrence.
> 2. **No progress.** The count of open accepted findings did not drop in two adjacent comparisons in a row: it stayed equal or rose from review N−1 to N, and again from N to N+1.
>
> When earlier review history is unavailable, the current review sets the baseline, and both conditions count from there. A correction outside the accepted boundary is not a pass.

Accepted boundary:

> A correction is inside the accepted boundary when it changes no design meaning, scope, contract, or owner decision. Only those corrections get further review rounds automatically. A correction that changes, or might change, any of those returns to the Lead, which brings the owner a brief. Once the owner settles it, review continues under the convergence rule without a permission prompt.

## Complete When

Every candidate has a disposition with its evidence; every accepted finding fills the `Finding` shape with a single route; scope expansion is rejected and orphans carry a deletion default; breaks went to the Lead; the `DesignReviewResult` lists every target's status, every unavailable source, the tie table, and every finding; and after corrections, each finding is marked closed or open at its current anchor.
