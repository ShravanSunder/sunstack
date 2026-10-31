# Caller workflows

This reference owns decision models that need more than one fixed assessment: menus, loops, state, escalation, training or effects. Each is caller code over bounded assessments, not a static rule graph.

**Expected input:** the decision, what it must produce, and the assessments it can ask for.

**Return:** the pattern chosen, with its entry conditions, execution profile, call and iteration bounds, uncertainty and error exits, stopping reason, and what it measures.

**Complete when:** the chosen pattern has each of those named, and no loop or menu is left without its bound and recorded stop.

The native graph supplies each bounded fixed assessment. Menus, loops, state, model escalation, training and side effects stay with the application that owns them. No generic workflow runtime and no new persistence contract follows from these patterns; any real storage or ownership change is a design decision for its owner.

## The patterns

| pattern | enter when | good | bad | bound, stop and measure |
| --- | --- | --- | --- | --- |
| **Hierarchy with kept alternatives** | real parent-child categories, where an early choice can be ambiguous | direct-child Choice at each node; descend when clear; keep the plausible paths, or review, when ambiguous; a one-child hop adds no evidence | overlapping properties forced into exclusive categories; the losing path discarded at the root | width and depth bound; stop at a leaf or at review; measure leaf accuracy against labels. A path rank such as a geometric mean is a ranking statistic, not the probability the leaf is right |
| **Wide → top-K → detail and fit** | many candidates, too many to judge in detail | rank all → keep the top K → fetch each one's real detail → fit and relative choice → "none" allowed | only the first winner rechecked | K and the request count bound it; measure candidates lost before verification, since a candidate the shortlist dropped can't be recovered by any later answer |
| **Verify → escalate** | a cheap first answer that can be checked | cheap candidate → structural and grounded field checks → escalate what fails → validate the replacement too | "schema valid" treated as "semantically trusted"; the replacement never checked | one escalation per item; record why each escalated; measure fidelity of the final answer, not of the schema |
| **Shrinking menu** (iterative set extraction) | a set of distinct items to pick from a known menu | remaining menu plus a `nothing else` sentinel → each chosen item removed → stop on the sentinel or the menu running out | an unbounded loop; the same item repeated | a request cap. A stop at the cap is recorded as such, never as "exhaustive", and the loop picks distinct items, never quantities |
| **Learned composition** | a learned model over many semantic features beats fixed weights | development-only feature proposal and fitting → frozen features and model → evaluation on untouched final labels | test labels steering feature search; feature importance called accuracy | rounds bound the search; measure only on held-out labels |
| **Memory admission** | facts worth keeping for later requests | only source-stated facts are admitted; code owns per-entity storage, provenance, updates and bounded relevant retrieval | a model's inference saved as a source fact, then fed back and amplified | size and expiry bounds; measure what was admitted against its source |
| **Temporal latch** | a judgment over a growing stream | snapshot judgments → a caller-owned legal transition, latch or reset → an explicit error policy | each sampled output overwriting durable state | only a one-way latch is demonstrated in the sources; a general state machine or hysteresis is an untested extension |

## Further requests, and what licenses them

Independent assessments over the same state go in one inference pass. A caller makes a further request for one of three reasons:
- new evidence or new options, such as the next menu or the fetched detail;
- a deliberate identical-input repeat that measures variation;
- an escalation or retry with a stated purpose.

Never resample until a desired answer appears.
