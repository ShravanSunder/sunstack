# False-Green Test Shapes

This reference owns how a test check stays honest, and the shapes that let a test pass while the behavior is wrong. `test-design` uses it to plan checks; reviewers use it to judge planned or written tests.

Expected inputs: one planned or written check, with the rule it protects, its layer and seam, and what it replaces. Return: for each check, where its expected outcome comes from, its assertion, the behavior change that turns it red, its timing control or "n/a", and any shape below it matches.

## The Check

```text
expected outcome   a literal value or observable effect, taken from the Specification line
assertion          on what a caller or user observes: a returned value, state read back through
                   the interface, an emitted event, a file, an output
goes red when      the specific behavior change that fails it
```

Write the expected outcome from the Specification, before the code exists when planning. Then ask: would this check still pass if every function the test calls returned `undefined` or did nothing? If yes, it observes no behavior and cannot catch a defect.

## Shapes That Stay Green While the Behavior Is Wrong

**Expected value recomputed like the code.** The test passes by construction.

```text
bad:   expected = items.reduce((sum, i) => sum + i.price, 0); assert total(items) == expected
good:  assert total([{price: 10}, {price: 5}]) == 15        # from the Specification's example
```

**Weak or missing assertion.** Bad: only "is defined", "is truthy", "does not throw", "has length above 0". Good: assert the literal output.

**Only that a mock was called.** Bad: `charge` was called. Good: the payload `charge` received, or the state after the call.

**A constant pinned to what the code returned.** Bad: the expected value was copied from the code's own output, or restates a hand-maintained constant, default, table row, or prompt string. Good: a value taken from the Specification, or a test of the mechanism that reads the constant with one input.

**Fixture asserts fixture.** Bad: the assertion reads data the test built, and the subject never runs in the test body. Good: call the subject in the body.

**Observing a helper instead of the effect.** Bad: the rule is "the user can be retrieved after sign-up", and the test checks that a query builder produced SQL. Good: create the user, then read it back through the interface.

**A mocked boundary standing in for the integration.** Bad: the rule is "two processes never both hold the lock", and the test mocks the filesystem. Good: two real processes against a real file.

**A run that skips it.** Bad: the scenario sits behind a marker the normal run excludes, or in a package the test target leaves out. Good: place it where the project's normal run includes it.

**A stale generated file.** Bad: the test checks a generated file while its generator is stale. Good: regenerate in the test, or assert on the generator's output.

**A migration tested only on empty state.** Bad: the migration runs against an empty store. Good: run it against state shaped like production data, including the edge rows the rule names.

## Timing

A timing-sensitive check (concurrency, retries, timeouts, ordering, async completion) names how it controls time and how it sees completion:

- **held steps**: a gate or barrier the test releases, so the order is chosen rather than hoped for;
- **a controlled clock**: injected or fake time, advanced explicitly;
- **observable completion**: a bounded wait on the event, message, or state that marks the work done.

Not sleeps, not polling without a completion signal, and not longer timeouts.

```text
bad:   sleep(500); assert cache.size == 1
good:  advance the clock past the TTL; assert get(key) == not-found
good:  await worker.drained() (bounded at 2 s); assert queue.pending == 0
```

Every other check marks timing "n/a".

## Complete When

Every check has an expected outcome tied to its Specification line, an assertion on an observable outcome, a named behavior change that turns it red, and a timing control or "n/a", and each check matching a shape above is named with that shape.
