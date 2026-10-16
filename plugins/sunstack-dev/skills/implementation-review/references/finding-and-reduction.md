# Finding And Reduction

This reference owns parent verification, the rails re-anchor, finding semantics, cause-based routing, affected coverage, and the final review result. `parent` means the immediate 🔎 Reviewer Sidekick for the ordered checks; the orchestrator later owns final disposition and delivery routing.

Expected inputs: the current review context, per-check results including the dispel classification, current governing sources and diff, proof evidence, and any prior coverage record.

Return: candidate dispositions with rails anchors, merged duplicates and conflicts, accepted findings, routes, scope effects, coverage and evidence boundaries, first correction, and `ready | needs-revision | blocked-input | decision-needed | not-converging`.

## Re-anchor on the Rails

Before any disposition, anchor each candidate to the rails:

```text
rails anchor: confirmed requirement | Specification obligation |
              Program Design element | confirmed goal-boundary field |
              domain-skill rule (code findings)
governing source identity and exact section/field:
quoted or faithful obligation text:
plain-language meaning of that anchor:
observable outcome that fails if unresolved:
deletion test: without the questioned mechanism, do the confirmed obligations still hold?
mechanism necessity: is the proposed mechanism required and proportionate to
  the quoted clause, or one of several ways to serve it?
scope effect: inside confirmed boundary | requires owner expansion decision
```

A domain-skill rule anchors a code finding when it comes from a `domain-<lang>` skill loaded for a language the diff touches, because those skills hold the owner's language standards. Where the repository's own conventions or gates differ, the repository wins and the finding doesn't stand.

A category name is not an anchor. "The reliability requirement" fails the anchor check until the exact governing clause is opened and quoted. A candidate whose anchor fields cannot be filled from an inspectable source is `unverified`, never `accepted`; it is advice awaiting investigation and carries no implementation authority. When the deletion test says the obligations hold without the mechanism, prefer deletion over completing the mechanism's missing contracts.

Two kinds of scope expansion get two different dispositions. Confusing them lets a gold-plating reviewer steer the verdict.

- A reviewer candidate that proposes adding scope with no rail anchor (a circuit breaker, a hardening layer, an abstraction for imagined consumers) is `rejected: scope expansion` and listed for the owner as an observation. It never produces `decision-needed`, because a suggestion is not a decision the owner owes an answer to. Anchoring it one altitude up ("the spec says return a typed error on provider outage") does not rescue it when `mechanism necessity` says the mechanism is one of several ways to serve the clause. Then the accepted finding, if any, names the unrealized obligation and its failure and routes to its owner. The mechanism choice is not the reviewer's to make and never rides into the handoff.
- A delivered item the diff already contains that dispel mapped `absent` (or spec-compliance classified `extra` or `scope overreach`) is never `rejected` as non-defective, since being well built is not a disposition. Its only dispositions are `accepted` (removal, owner `implement-plan`) or `decision-needed` with deletion as the default recommendation when the owner may want to adopt it as a scope expansion.

## Verify Before Accepting

For every candidate, reopen the cited governing and implementation anchors and inspect the claimed proof. Before you dispose of a candidate, match its claim and the proof behind it to the source and output you opened: for each piece of proof, the commit and target it ran against, whether the reviewed diff changed anything it depended on, and what it doesn't cover ([accept only evidence that observed this claim at this version](../../principle-verify-before-accepting/SKILL.md)). Assign exactly one disposition:

```text
accepted    current source proves the defect and consequence, and the rails
            anchor holds
rejected    current source contradicts the candidate, makes it non-defective,
            or the correction fails the rails (over-engineered, out of scope,
            requirements-weakening) with the evidence stated
duplicate   another candidate has the same root cause and route
unverified  missing evidence prevents acceptance or rejection
conflict    candidates disagree in a decision-relevant way
```

Weigh the dispel check's classification as candidate evidence like any other check result. When the parent's disposition contradicts dispel's correction class, record the quoted rail text that overrides it. Merge duplicates by root cause. Preserve conflicts only when they change the result, then state what source or owner decision would settle them.

## Ordinary Finding or Broken Premise

Before you accept and route a candidate, decide whether its correction fits inside the current governing basis. Name the assumption the basis relies on, what the current source shows, and whether that assumption still holds ([fix the understanding before the code](../../principle-refine-mental-models/SKILL.md)).

A defect the basis already forbids, with a fix the basis can name, routes to its semantic owner as usual. A mental-model break is a candidate whose correction cannot be expressed inside the basis because an assumption the basis itself relies on is false, such as an interface, ordering, ownership, or guarantee the current system does not provide. A break stops reduction. Return the failed assumption, the evidence, and the consequence to the orchestrator (the Lead), which brings the owner a brief. The reviewer does not author the brief or push the break through remediation. Routing a break to `program-design` and continuing is the failure to catch.

## Record an Accepted Finding

Each accepted finding contains:

```text
severity: blocker | important | minor
exact anchor:
governing obligation or invariant:
rails anchor and deletion-test result:
scope effect:
concrete consequence:
appropriate correction within the task boundary:
owner:
confirmation evidence:
coverage invalidated:
```

Route by cause, not severity:

- Requirements or observable-contract meaning -> `spec-design`.
- Structural ownership, interface, state, failure, concurrency, trust, compatibility, or proof seam -> `program-design`.
- Slice, sequence, dependency, collision, write scope, or plan-proof mapping -> the plan record's `plan-implementation` or `plan-improve-repo` origin.
- Code, test, fixture, implementation-proof evidence, or a domain-skill rule -> `implement-plan`.
- Missing authority or unresolved owner choice -> caller.

## Decide the Review Result

This reference owns the review-result labels. Return exactly one using precedence `not-converging -> blocked-input -> needs-revision -> decision-needed -> ready`:

```text
ready
  complete current coverage, no accepted finding requiring correction, and no
  decision-relevant unresolved risk

needs-revision
  at least one accepted finding requires correction and has an exact owner and
  confirmation proof

blocked-input
  required source, identity, access, runtime, or proof is unavailable

decision-needed
  current evidence leaves a real owner-controlled choice or conflict, including
  a correction that would expand scope or weaken a requirement

not-converging
  the correction loop meets the convergence rule below: a verified-closed
  finding recurred, or open accepted findings did not drop in two adjacent
  comparisons
```

Convergence (this reference is its home for implementation review):

> After each correction pass, compare this review with the previous one using the existing finding identity (anchor plus failure form). Return `not-converging` when either holds:
> 1. **Recurrence.** A finding the Reviewer Sidekick verified closed in an earlier review is accepted again. A finding whose correction never closed is still open, which is not a recurrence.
> 2. **No progress.** The count of open accepted findings did not drop in two adjacent comparisons in a row: it stayed equal or rose from review N−1 to N, and again from N to N+1.
>
> When earlier review history is unavailable, the current review sets the baseline, and both conditions count from there. A correction outside the accepted boundary is not a pass.

Accepted boundary:

> A correction is inside the accepted boundary when it changes no design meaning, scope, contract, or owner decision. Only those corrections get further review rounds automatically. A correction that changes, or might change, any of those returns to the Lead, which brings the owner a brief. Once the owner settles it, review continues under the convergence rule without a permission prompt.

The result includes reviewed authority, unchanged plan/governing-basis/delivery-context records, base and reviewed identities, diff and proof freshness, prior review findings, obligation coverage, normal/failure-path coverage, runtime reachability when applicable, accepted/rejected/unverified findings, conflicts, weaker-substitute risks, first correction, exact route, and uncovered boundary.

A proof claim whose proof-challenge check returned only challenges (nothing executed because every command would write into the worktree or no grant was recorded) cannot support `ready` when that claim is the sole proof for a changed contract; it is `needs-revision` to `implement-plan` (supply runnable, scratchpad-safe proof) or `blocked-input`.

Accepted corrections to source or proof invalidate affected coverage. A remediation report, green proof, or focused-only result does not restore it; require a new meaningful review with fresh chunk coverage for the corrected source and affected proof. State which coverage became invalid and bind the new result to the corrected source.

Complete when: every candidate has one verified disposition; duplicates and conflicts are reduced; each accepted finding has every required field and one semantic owner; the result follows the labels above; uncovered boundaries are explicit; and no stale coverage supports `ready`.
