# Principles Index

A principle is one engineering judgment, written to teach: the idea behind it, how to think it through including the hard call, one anchor example, when it doesn't apply, and the signs you skipped it. More scenarios sit in each skill's `references/example_scenarios.md`. Each is a skill named `principle-*`, hidden from model invocation: the owner calls one by name, and a skill cites one with a relative link at the decision it informs. Each principle opens with its read rule.

## Using a principle

- Read the principle in full before applying it. This index only helps you choose one.
- When a principle the owner called by name shaped your work, name it and the concrete decision it made, changed, ruled out, or confirmed, with the reason. A principle named with no decision behind it was not applied. A principle a skill cites serves the action its citing sentence names: apply it there, and tell the owner only when it explains an outcome, risk or decision.
- Principles compose. One task often needs two, and each principle's closing lines say where a neighbour takes over. A principle owns a question, not a file, tool, or test type.

## Understand

- `principle-hold-the-scope`. A new request arrives, a design or plan comes back from someone else, or work is about to be called done. State who it is for, what success looks like, and what stays out; then check that every owner line is carried, nothing is invented, and nothing is weakened.
- `principle-build-the-shared-model-first`. About to build on someone else's picture (a request, a spec, a resumed plan, another agent's handback), or when agreement on something complex comes too fast. Form your own picture, restate it specifically enough to be corrected, and settle the gaps before building.
- `principle-define-the-domain-first`. A new noun, state, or stored field appears, one word is doing two jobs, or two sources use different words for what may be one thing. Define what each term means, what makes two of them the same, and what changes its state, before choosing structure.

## Find out

- `principle-read-ground-truth-first`. About to claim what current code, a system, a document, or a library does, or to explain an unexpected behavior. Read the decisive source and the whole artifact, trace the real path, and label every claim as seen, inferred, or guessed.
- `principle-experiment-before-proposing`. Running something would settle a question faster than arguing about it: an unknown API behavior, a performance claim, which of two designs works better, how a prompt or classifier performs. Capture a baseline, fit the rigor to the stakes, and measure the real artifact.

## Decide

- `principle-name-the-tradeoffs`. A real choice changes complexity, risk, cost, or reversibility, or one option is presented for a decision that has others. Show the credible alternatives as changes to the current design, with concrete gains, costs, who pays, and the assumption that must hold, then recommend one.

## Shape

- `principle-one-owner-per-truth`. Truth, effects, or guarantees cross a boundary: two parts can write the same state, a copy holds data another part owns, a schema is defined twice, or stored data starts to mean something new. Give each truth one authoritative owner and state what callers may rely on.
- `principle-types-are-communication`. Designing or reviewing types, signatures, or data that crosses a boundary (network, file, environment, database, model output), especially status fields, ids, and optional fields that only make sense together. Model states as sum types, build valid shapes, parse once at the boundary, and handle every variant.
- `principle-separate-the-concerns`. Adding a module, layer, interface, or dependency, when one part changes for two unrelated reasons, or when testing one rule drags in the network, the clock, or the framework. Give each part one job and inject dependencies at real seams.
- `principle-justify-the-complexity`. Adding or keeping a layer, abstraction, option, mechanism, or second path, or when sequencing a refactor or rewrite. Double-check that each piece of complexity is justified by an outcome that needs it now; remove the rest and cut over completely.

## Stress

- `principle-design-for-failure`. A call, job, or state change has an effect someone else can see and it can time out, be retried, partly succeed, or end without you knowing. Decide every ending, which system is the truth for 'did it happen?', and who cleans up, before choosing retries or locks.
- `principle-design-for-concurrency`. Actors already overlap: two workers, retries, callbacks, background tasks, or late results can touch the same resource. Name the invariant, find the interleaving that breaks it, isolate the shared state before serializing it, and order by causal signals, not sleeps.

## Prove

- `principle-write-tests-that-can-fail`. Writing, changing, or keeping a test for a fix, a feature, or a refactor, or when a claim rests on tests passing. Name the wrong behavior the test must catch, take the expected value from somewhere independent, run it at the cheapest layer where that wrong behavior can make it fail, and see it fail for the right reason.
- `principle-prove-it-works`. About to say a feature, fix, or UI change works. A passing test proves only what it observes: proof is the feature working through the real entry point, observed where the user would see it, with anything unverified named.
- `principle-verify-before-accepting`. Accepting any result: a helper's handback, a review finding, a passing run, 'done', an agreement, or your own conclusion. Check that this evidence establishes this exact claim, at this version, observed rather than reported, and name what it doesn't cover.

## Explain

- `principle-write-for-the-reader`. Writing a design, code, an instruction, or an explanation someone else must follow: a reviewer, a future maintainer, another agent, the owner tomorrow. Write so a reader with no context can answer their question quickly, restate the point, and find where to correct it.

## Recover

- `principle-refine-mental-models`. Reality surprises the plan, a fix fails twice on the same premise, or the same correction comes twice. Stop and ask what was wrong with the understanding before touching the code: drift or a break, and which shared premise to attack.
