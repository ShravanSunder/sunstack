# False Greens

This reference owns how a planned check stays honest: its expected outcome, its assertion, the behavior change that turns it red, its timing control, and the shapes that let a test pass while the behavior is wrong.

Expected inputs: each scenario with its rule, layer, seam, and what is replaced; the Specification lines. Return: for each scenario, the expected outcome with its Specification line, the assertion, what turns it red, and the timing control or "n/a".

## The Check

```text
expected outcome   a literal value or observable effect, taken from the Specification line
assertion          on what a caller or user observes: a returned value, state read back through
                   the interface, an emitted event, a file, an output
goes red when      the specific behavior change that fails it
```

Write the expected outcome before the code exists, from the Specification. Then ask: would this check still pass if every function the test calls returned `undefined` or did nothing? If yes, it observes no behavior and cannot catch a defect. Rewrite it.

## Shapes That Stay Green While the Behavior Is Wrong

**Expected value recomputed like the code.** The test passes by construction.

```text
bad:   expected = items.reduce((sum, i) => sum + i.price, 0); assert total(items) == expected
good:  assert total([{price: 10}, {price: 5}]) == 15        # from the Specification's example
```

**Weak or missing assertion.** Only "is defined", "is truthy", "does not throw", "has length above 0". Assert the literal output instead.

**Only that a mock was called.** `charge` was called says nothing about what was charged. Assert the payload it received, or the state after the call.

**Constant pin.** The assertion restates a hand-maintained constant, default, table row, or prompt string. Test the mechanism that reads the constant with one input instead.

**Fixture asserts fixture.** The assertion reads data the test built, and the subject never runs in the test body. Call the subject in the body.

**Observing a helper instead of the effect.** The rule is "the user can be retrieved after sign-up", and the test checks that a query builder produced SQL. Create the user, then read it back through the interface.

**A mocked boundary standing in for the integration.** The rule is "two processes never both hold the lock", and the test mocks the filesystem. Run two real processes against a real file.

**A run that skips it.** The scenario sits behind a marker the normal run excludes, or in a package the test target leaves out. A scenario no normal run executes proves nothing; place it where the project's normal run includes it.

Also watch for a generated file checked while its generator is stale, and a migration tested only on empty state.

## Timing

A timing-sensitive scenario (concurrency, retries, timeouts, ordering, async completion) names how it controls time and how it sees completion:

- **held steps**: a gate or barrier the test releases, so the order is chosen rather than hoped for;
- **a controlled clock**: injected or fake time, advanced explicitly;
- **observable completion**: a bounded wait on the event, message, or state that marks the work done.

Not sleeps, not polling without a completion signal, and not longer timeouts.

```text
bad:   sleep(500); assert cache.size == 1
good:  advance the clock past the TTL; assert get(key) == not-found
good:  await worker.drained() (bounded at 2 s); assert queue.pending == 0
```

Every other scenario marks timing "n/a".

## Complete When

Every scenario has an expected outcome tied to its Specification line, an assertion on an observable outcome, a named behavior change that turns it red, and a timing control or "n/a"; and no scenario matches a shape above.
