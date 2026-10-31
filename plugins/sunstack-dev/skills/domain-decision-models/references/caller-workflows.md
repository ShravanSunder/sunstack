# Caller workflows

This reference owns decision models that need more than one fixed assessment: menus, loops, state, escalation, training or effects. Each is caller code over bounded assessments, not a static rule graph.

**Expected input:** the decision, what it must produce, and the assessments it can ask for.

**Return:** the pattern chosen, with these parts named:
- its entry conditions and execution profile;
- its call, iteration and token bounds;
- its uncertainty and error exits;
- its stopping reason;
- what it measures.

**Complete when:** the chosen pattern has each of those parts named with the caller's values, and no loop or menu is left without its bound and its recorded stop.

The native graph supplies each bounded fixed assessment. Menus, loops, state, model escalation, training and side effects stay with the application that owns them. No generic workflow runtime and no new persistence contract follows from these patterns; any real storage or ownership change is a design decision for its owner.

## Bounds and exits, for every pattern

**Execution profile.** Every pattern below is caller orchestration over `run_judgments` or a compatible client. Inside one round, the fixed assessments can be one batched request, or a static rule graph where the caller runs one.

**Set the budget before the first call.** The caller owns these values:
- the most requests per item;
- the most rounds or iterations;
- a size bound per request (tokens, or characters where the client measures those), within the client's own limit;
- a total per item.

**Every assessment ends one of three ways:**
- **decided** (past its bar): the pattern's next transition;
- **uncertain** (between its bars): the pattern's declared uncertain exit. It is never treated as a yes or a no, and never resampled until it gives one;
- **invalid or unavailable reply:** incomplete. A retry with a stated purpose fits only within the budget. Then the item stops, with that reason.

**Every stop is recorded with its reason:** done, uncertain, invalid or unavailable, or budget. A stop at a bound is never reported as complete.

## The patterns

Each pattern carries its evidence label (`pattern-evidence.md`).

**Hierarchy with kept alternatives** (primary implemented: the hierarchical classification cookbook)
- **Enter when:** real parent-child categories, where an early choice can be ambiguous.
- **Good:** a direct-child Choice at each node; descend when clear; keep the plausible paths, or review, when ambiguous. A one-child hop adds no evidence.
- **Bad:** overlapping properties forced into exclusive categories; the losing path discarded at the root.
- **Exits:**
  - an uncertain child Choice keeps up to its width of paths, or routes to review;
  - an invalid reply makes that path incomplete;
  - no kept path reaching a leaf ends in review.
- **Bounds:** the width of kept paths, the depth, and requests per item.
- **Stop:** every kept path at a leaf, review, or the budget.
- **Measure:** leaf accuracy against labels, paths dropped, and review load. A path rank such as a geometric mean is a ranking statistic, not the probability the leaf is right.

**Wide → top-K → detail and fit** (primary implemented: the skill-suggestion cookbook)
- **Enter when:** many candidates, too many to judge in detail.
- **Good:** rank all, keep the top K, fetch each one's real detail, then judge fit and relative choice, with "none" allowed.
- **Bad:** only the first winner rechecked.
- **Exits:**
  - no candidate fits returns none, a valid outcome;
  - an uncertain fit routes to review;
  - an invalid reply makes the item incomplete.
- **Bounds:** K, the detail fetches, and the requests per item.
- **Stop:** a fitting winner, none, or review.
- **Measure:** candidates lost before verification, since a candidate the shortlist dropped can't be recovered by any later answer; fit precision; the none rate.

**Verify → escalate** (primary implemented: the SDE cascade, whose demo bad record is hard-coded)
- **Enter when:** a cheap first answer that can be checked.
- **Good:** a cheap candidate, then structural and grounded field checks; escalate what fails, and validate the replacement too.
- **Bad:** "schema valid" treated as "semantically trusted"; the replacement never checked.
- **Exits:**
  - an uncertain verification is a flag that escalates, or review, by declared policy;
  - an invalid reply is incomplete, never "verified";
  - an escalated answer that still fails, or is uncertain, goes to review.
- **Bounds:** one escalation per item, the model tiers allowed, and the requests per item.
- **Stop:** verified, escalated and revalidated, or review.
- **Measure:** fidelity of the final answer, not of the schema; the escalation rate; cost per item.

**Shrinking menu** (iterative set extraction; primary implemented: the shopping-cart cookbook)
- **Enter when:** a set of distinct items to pick from a known menu.
- **Good:** the remaining menu plus a `nothing else` sentinel; each chosen item is removed.
- **Bad:** an unbounded loop; the same item repeated.
- **Exits:**
  - an uncertain pick stops with "uncertain", or goes to review; never take the top label anyway;
  - an invalid reply stops the item, incomplete.
- **Bounds:** a request cap, the menu size, and the size bound per request.
- **Stop:** the sentinel, the menu running out, the cap (recorded as "cap reached"), or an uncertain pick. A stop at the cap is never "exhaustive", and the loop picks distinct items, never quantities.
- **Measure:** items found against labels, the cap-exit rate, and repeats (expected zero).

**Learned composition** (primary implemented: the autoresearch cookbook; its gains are workload-specific)
- **Enter when:** a learned model over many semantic features beats fixed weights.
- **Good:** development-only feature proposal and fitting, then frozen features and model, then evaluation on untouched final labels.
- **Bad:** test labels steering the feature search; feature importance called accuracy.
- **Exits:**
  - an uncertain answer stays as its feature value, not forced to an end;
  - an invalid reply is a missing value with its mask, never zero.
- **Bounds:** proposal rounds, the feature count, and requests per item.
- **Stop:** the features and model frozen after the development rounds.
- **Measure:** held-out error on untouched labels against the current model.

**Memory admission** (admission is primary implemented by the basic-memory cookbook; promotion tiers are an untested extension)
- **Enter when:** facts worth keeping for later requests.
- **Good:** only source-stated facts are admitted; code owns per-entity storage, provenance, updates and bounded relevant retrieval.
- **Bad:** a model's inference saved as a source fact, then fed back and amplified.
- **Exits:**
  - an uncertain admission isn't admitted, or goes to review;
  - an invalid reply isn't admitted, and is logged.
- **Bounds:** the store's size and expiry, the retrieval count, and the size bound per request.
- **Stop:** each request ends at admit or don't admit.
- **Measure:** each admitted fact traced to its source; inferences found in the store.

**Temporal latch** (a one-way latch is primary implemented by Intelliprompter; general state machines and hysteresis are untested extensions)
- **Enter when:** a judgment over a growing stream.
- **Good:** snapshot judgments, then a caller-owned legal transition, latch or reset.
- **Bad:** each sampled output overwriting durable state.
- **Exits:**
  - an uncertain snapshot makes no transition and keeps the state, or goes to review;
  - an invalid reply makes no transition and is logged.
- **Bounds:** the snapshot rate, the stream window, and the size bound per snapshot.
- **Stop:** the latch set (one-way), the stream ending, or the reset policy.
- **Measure:** false and missed latches against labelled streams.

## Further requests, and what licenses them

Independent assessments over the same state go in one inference pass. A caller makes a further request for one of three reasons:
- new evidence or new options, such as the next menu or the fetched detail;
- a deliberate identical-input repeat that measures variation;
- an escalation or retry with a stated purpose.

Never resample until a desired answer appears.
