# Scenarios, Oracles, and Layers

This reference owns how a Test Design turns obligations into scenarios: what must stay real, which layer is honest and cheapest, where the expected outcome comes from, and how the set distributes across layers.

Expected inputs: the Specification's material obligations with their wrong behaviors and undefined behavior, Program Design's seams and must-stay-real constraints, and the repository's existing test layers.

Return: the case coverage, with each scenario's independent oracle, honest layer, and the interactions that must remain real; plus the distribution and its reasoning, and any obligation that needs an upstream seam or meaning.

## Three Placements

The same design often holds three kinds of claim. Each sets a different floor.

### A pure rule: keep it small

```text
Obligation:  a send request carries a pane id and text; a request without a pane id is rejected
             as invalid-payload and causes no write.
Wrong:       the serializer drops paneId; the validator accepts a missing paneId.
Real:        the real serializer and the real validator. Nothing else takes part.
Layer:       focused test calling the serializer and validator directly.
Oracle:      the literal request from the Specification's example; the invalid-payload variant
             named in the contract.
```

This is the clean case. Adding the router, a pane or a transport would make the test slower and its failures harder to read while proving nothing more about the rule. Every edge case of the rule (empty text, a pane id of the wrong kind, an extra field) belongs here, not in a journey.

### An interaction: keep the interaction real

```text
Obligation:  text sent to pane B appears in B's input and in no other pane.
Wrong:       the router acknowledges and writes to the focused pane.
Real:        the router-to-pane write and two real pane buffers, A focused and B targeted.
Layer:       integration in one process.
Oracle:      B's input holds exactly the sent text; A's input is unchanged.
Completion:  B's input-changed event for this send's id, with a bound.
```

A test that replaces the pane writer with a fake that records `write(B)` passes for the wrong router: the router passes B to the fake while resolving the real target from focus, and the fake never shows the difference. The double erased the very interaction the obligation is about. Keep a unit test of the router's own branching if it helps diagnosis, and know it does not prove routing.

### What the user sees: keep the rendering real

```text
Obligation:  a failed send shows "Not delivered" beside that message in the operator's view.
Wrong:       the failure is stored but never rendered; it renders beside the wrong message.
Real:        the real view rendering from the real message state.
Layer:       component render test that reads the visible text in the row for that message id.
Oracle:      the contract's label, in the row whose message id failed, and no label elsewhere.
```

A snapshot is an oracle only after someone checked it against the contract; regenerating it to turn red to green makes it circular again. Whether the label is visible on a real screen, unclipped and readable, is a real-surface question for Verification Design, not this layer.

## Independent Oracles

The expected outcome comes from somewhere the code under test did not produce: the contract text, the Specification's worked example, a literal, a reviewed table of cases, or a property the rule implies. An oracle computed by the production helper stays green when that helper is wrong.

When no independent source exists for an outcome, the obligation is underspecified. Return a `specification-gap` with the exact question rather than copying the current output into the test.

## Distribution

Place each case at the cheapest layer that keeps its floor real. Many focused tests take the detailed cases of pure rules. Fewer integration tests cross the real boundaries the claims depend on: serialization against the real consumer, storage, processes, protocols, components working together. A small number of journeys cover what only the whole system shows, such as startup wiring or composition across languages. When a journey would only repeat cases a cheaper layer already holds, leave it out.

State the reason for each layer in the design. "Integration because the routing claim needs the real write" is a reason; "integration for coverage" is not.

## Correct Implementations Pass

Check every scenario against a correct implementation as well as the wrong one. A test that waits for a retry the fix removed, or asserts an intermediate state a correct implementation skips, fails correct code. Someone then "fixes" the code to match the test.

Complete when: every material obligation has scenarios whose claimed interactions stay real, each at the cheapest honest layer with its reason, each with an independent oracle; a correct implementation would finish and pass each one; and every obligation that needs a missing seam or meaning is returned upstream.
