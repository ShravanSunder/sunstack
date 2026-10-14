# Existing Test Quality

This reference owns judging the existing tests that cover behavior a design changes: keep, repair or remove, and why.

Expected inputs: the changed obligations and their wrong behaviors, Program Design's seams, and the existing tests that exercise the affected behavior, read in full.

Return: a keep, repair or remove decision for each affected test, grounded in protection, determinism and diagnosis, with each proposed repair routed to the Implementer.

## Four Questions per Test

Open the test and the code it calls. Ask:

- **Protection.** Would it fail for the wrong behavior the changed obligation forbids? Trace the assertion back to the subject; a mock that answers before the subject runs protects nothing.
- **Determinism.** Does it pass or fail for the same code every time? Sleeps, wall-clock waits, shared global state and dependence on test order make a green or red mean little.
- **Diagnosis.** When it fails, does the failure point at the cause? A journey that fails for a rounding rule makes someone search the whole stack.
- **Contract currency.** Does it encode a rule the contract still holds? After the change, a test can protect a promise the Specification no longer makes, or require an order or wording it never made.

## Decisions

Keep a test that protects a current obligation, runs deterministically and points at its cause.

Repair a test whose claim is right but whose form is weak, and say exactly what the repair is:

- it asserts a global event order the Specification now leaves undefined; repair it to assert per-pane order;
- it sleeps 500 ms before reading a background result; repair it to wait on the job's completion record for its id, with a bound;
- its oracle is computed by the production helper; repair it with the literal from the contract's table.

Remove a test only with a replacement, proof that another test already protects the same wrong behavior at an honest layer, or proof that its contract is dead. A test that duplicates every edge case of a pure rule through the browser is a removal candidate once the focused tests hold those cases.

Some tests stay useful while proving less than their name says. A router unit test with a mocked pane writer keeps value for diagnosing the router's own branching; it does not protect routing. Keep it, rename the claim it makes if needed, and make sure the routing scenario lives at the integration layer.

## Who Changes the Suite

Test Design proposes. Each repair or removal goes to the Implementer as a proposed change with its reason; the Implementer edits the product suite, and the paired Verifier later checks the delivered tests against this design. Test Design never edits tests and never infers permission to.

Complete when: every existing test that exercises changed behavior has a decision with its reason drawn from the four questions, every repair says what changes, every removal carries its replacement or proof, and each change is routed to the Implementer.
