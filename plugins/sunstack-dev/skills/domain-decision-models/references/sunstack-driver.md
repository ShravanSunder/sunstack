# The Sunstack driver

This reference owns the facts that hold only on Sunstack's typed engine path: the rules engine (`sunstack lint`) and the native `run_judgments` operation. They are driver facts, not standards for decision models in general. Anchors are in the `sunstack-tools` repository at engine 0.5.0.

**Expected input:** the decision model and which path it runs on: a rule, or a `run_judgments` caller.

**Return:** each driver fact this model depends on, with its anchor.

**Complete when:** the design and the proof plan account for every fact the model depends on, or name it as a gap.

## What the judge receives

- **No model call until a question.** A piece whose walk reaches no question sends nothing to the model.
- **One request per rule and piece.** Once the walk reaches its first ask or combine step, every question in the rule's entry goes to the model in one request. The request carries one state: the standard's wording, the piece's location (`where`), and the fields its evidence kind exposes to the model, with the longest text cut first when it's over the evidence limit (`crates/sunstack-rules/src/rulebook_planning/decision_walking.rs`, `piece_state`).
- **Code walks only the routes the answers lead to.** A question gate therefore saves no request. What it buys is the outcome: a piece the gate rejects never reaches the verdict, whatever the verdict's answer says.
- **A field a mechanical step reads that is unavailable makes the piece incomplete,** never uncertain.

## Routing

- **A Noul or a Score** routes on its normalized answer against `yes_at_or_above` and `no_at_or_below`; an answer between them is in between.
- **A Choice** routes on its top label's probability against `min_probability`, one route per label. It gates on p_max, not on the confidence the provider returns, and no native step can branch on a returned confidence field. A policy on confidence is caller code.
- **A Combine** takes weighted Noul probabilities and normalized Score positions (positive weights summing to one) against the same two bars.
- **An in-between answer ends `uncertain` by default.** From engine 0.5, an ask or combine step can add an `"uncertain"` route to a named step instead (`crates/sunstack/README.md`). An answer that couldn't be parsed is incomplete.
- **The graph is acyclic and static.** It has no sort, top-K or numeric-max step, and can't build a new request from an answer.

## Choice order on the wire

A Choice's criteria are a `BTreeMap` keyed by label (`crates/sunstack-decisions/src/decision_protocol/decision_contracts.rs`), so options reach the model in label-sorted order, whatever order the rules file uses. Reordering a rules file's keys changes nothing the model sees, and renaming a label to move it in the sort changes what the model sees. Whether option order affects this model version is a hypothesis for a direct transport probe, not a known fact.

## Primitives

The driver sends Noul, Choice and Score text questions over one state. It has no Box, image or asset request contract, whatever the provider documents.

## What each layer records

| layer | keeps | doesn't keep |
| --- | --- | --- |
| the engine's run (`RulebookRun.requests`) | every request with its outcome; a completed outcome carries the answers and a receipt naming the resolved model | it's internal; the lint report projects part of it |
| lint report `evidence_seen` | the exact state of every dispatched request, passes included, keyed by the rule-and-piece pair index | answers, path, model |
| lint report `results` | each rule and piece's outcome and last step | answers and full path for passes and `not_applicable` |
| lint report `findings[].judgment` and `uncertain[]` | a finding's answers, value and path; an uncertain piece's state, answers and step | the resolved model |
| lint report `usage` | request and token totals | the resolved model of each request |
| `run_judgments` | returns answers and a receipt with the resolved model to its caller | anything the caller doesn't store; calling it again resamples |

So on the rules path, full-population policy replay and the resolved version per result are unavailable until a capture route exists; name that gap in any proof that needs them. A `run_judgments` caller can keep its own records and replay over them.

## Credentials

A rules run sends model requests and needs the key. So does an evidence print over a kind with a model `select`, or a kind that lies `within` one. A print with no selected kind sends nothing and needs no key (`crates/sunstack/README.md`). Whoever lacks the grant to send model requests prepares the exact command and hands it to whoever holds it.
