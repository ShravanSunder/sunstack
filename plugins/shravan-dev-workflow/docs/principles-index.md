# Principles Index

A principle is one engineering judgment, written as a short card: when it applies, the rule, why, a test of two or three questions, the nearest principle it is easily confused with, what applying it means, one worked case, and when it is overkill. Each card is a skill named `principle-*` that the owner calls by name; none load on their own.

## Using a principle

- Read the card in full before applying it. This index chooses the card; it does not replace it.
- When a principle shaped your work, name it and the concrete decision it made, changed, ruled out, or confirmed, with the reason. A principle cited with no decision behind it was not applied.
- Principles compose. One task often needs two, and each card's "Distinct from" line says where its neighbour takes over. A principle owns a question, not a file, tool, or test type.

## Understand

- `principle-hold-the-scope`. A new request or a design handback. State who it's for, the outcome, and what stays out; then check that every owner line is carried, nothing is invented, and nothing is weakened.
- `principle-build-the-shared-model-first`. About to build on someone else's picture, or agreement came too fast. Restate the model in your own words with what would prove it wrong; align on the question before the answer.
- `principle-define-the-domain-first`. A new noun, state, or stored field, or a word doing two jobs. Define what each term means, what counts as the same thing, and what changes its state.

## Find out

- `principle-read-ground-truth-first`. Before any claim about current code, behavior, or a source. Read the current source and the whole artifact, trace the real path, and keep what you saw apart from what you infer.
- `principle-experiment-before-proposing`. Running something would settle a question faster than arguing. Fit the rigor to the question: a timeboxed spike, a measurement with a named workload and comparator, or an evaluation with labels and a baseline.

## Decide

- `principle-name-the-tradeoffs`. A real choice changes complexity, risk, cost, or reversibility. Lay out the real alternatives, what each gains and costs, who pays, and the unstated assumption; one-way doors get more rigor.

## Shape

- `principle-one-owner-per-truth`. Truth, effects, or guarantees cross a boundary, or stored data changes meaning. Give each truth and effect one authoritative owner, and state what callers may rely on.
- `principle-constrain-states-and-authority`. Variants, external input, or authority cross a boundary. Make invalid states unrepresentable, validate once at the edge, and give each crossing the least authority it needs.
- `principle-separate-the-concerns`. Adding a module, layer, interface, or dependency, or a part changes for two reasons. One job and one reason to change per part; inject dependencies only at real seams.
- `principle-justify-the-complexity`. Adding or keeping a layer, option, mechanism, or second path. Each piece of complexity is justified by an outcome that needs it now; remove the rest, no dual paths.

## Stress

- `principle-design-for-failure`. An effect someone else can see can time out, be retried, partly succeed, or end unseen. Decide every ending, the truth for "did it happen?", and who cleans up, before choosing retries or locks.
- `principle-design-for-concurrency`. Actors already overlap: retries, callbacks, or late results can touch the same resource. Name the invariant, find the interleaving that breaks it, separate the shared thing before serializing it, and order by causal signals, not sleeps.

## Prove

- `principle-tests-are-executable-claims`. Behavior changes, or a claim rests on tests. Design the scenario that fails if the behavior is wrong, at the cheapest layer that exercises the real interaction, and see it go red first.
- `principle-prove-it-works`. Before saying it works. A passing test is evidence, not proof: drive the real entry point and observe the result where the user would.
- `principle-verify-before-accepting`. Accepting any result, including your own conclusion. Ask whether this evidence establishes this conclusion, not just whether a receipt exists.

## Explain

- `principle-write-for-the-reader`. Writing a design, code, or explanation someone else must follow. A cold reader can restate it and find where to correct it.

## Recover

- `principle-refine-mental-models`. Reality surprises you, a fix fails twice on one premise, or the same correction comes twice. Ask what was wrong with the understanding before touching the code; when several fixes share a premise, write the premise down and attack it.
