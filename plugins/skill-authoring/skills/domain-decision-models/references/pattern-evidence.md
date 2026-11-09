# Pattern evidence

This reference owns how a claim about a decision-model pattern, or a published result, is labelled by its evidence, and which capability profile it needs.

**Expected input:** the pattern or result being cited, and where the decision model will run.

**Return:** each cited pattern or result, with its evidence label and the capability profile it needs.

**Complete when:** every cited pattern or result carries one label below and a profile, and no provider-only capability is claimed for a client that lacks it.

## The four labels

| label | meaning | example |
| --- | --- | --- |
| **primary implemented** | a provider pattern page, or a cookbook's actual code | TypeSafe's four named patterns: fan-out, confidence routing, composite scoring and intent routing |
| **historical observation** | a reported, workload-specific metric, with its model version | a hierarchy cookbook's 4 of 4 expected leaves against greedy's 2 of 4, on four selected examples, model 1.12 |
| **our synthesis** | our engineering generalization, named as ours | the policy algebra; a retained decision record feeding pure code policy |
| **untested extension** | proposed and not demonstrated | general hysteresis and temporal state machines; provenance and freshness checks for our products |

A synthesis or an extension can be the right design. The label says how much its evidence shows, not whether to use it.

## Two capability profiles

- **The provider and model profile** is what the provider documents. Box exists, but it's experimental, behind an opt-in header, and needs 1.14; it always returns a box, so presence needs its own assessment. Older text-only pages lag the newer image pages: record that discrepancy rather than resolving it by assumption.
- **The client or driver profile** is what the client implements. Sunstack's driver supports Noul, Choice and Score text questions over one state, in a static graph, with no Box or assets.

A feature in the provider's docs isn't support in a client. Don't apply Choice or Score confidence formulas to Box confidence without a defined contract.

## Corrections to the owner's patterns summary

A twelve-pattern summary of TypeSafe patterns circulates in this project. Use it with these labels and corrections:
- **The official four** are fan-out, confidence routing, composite scoring and intent routing. The summary's later claim that its own table's first four rows (hierarchy, parallel decomposition, composite scoring, confidence routing) are the official ones contradicts its own earlier line. The twelve-pattern grouping is the summary author's useful synthesis, not a provider standard.
- **The SDE cascade's** worked bad record is hard-coded in the walkthrough, not a fresh model output; its cost and quality chart is a historical snapshot.
- **The 75-group fallback** statistics come from a filtered 60-filing example on model 1.12. Coarsening helped that sample; it isn't a guarantee.
- **The shopping cart** extracts distinct menu entries once, with a sentinel and a six-request cap. It isn't arbitrary set extraction, and it records no quantities.
- **Basic memory** implements admission (an in-memory, customer-keyed store); promotion tiers, expiry and relevance filtering are not implemented.
- **Intelliprompter** demonstrates a one-way latch over a growing transcript. General hysteresis and state machines are the summary's extension.
- **Recorded decisions replayed through pure policy** is a design synthesis, not a standard provider facility.
- **A reusable decision-graph runtime** is an opportunity the summary names, not an adopted plan.
