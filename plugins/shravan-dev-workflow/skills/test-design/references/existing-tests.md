# Existing Tests

This reference owns what happens to tests that already cover the changed behavior.

Expected inputs: the changed rules and the overlapping tests, found by searching for the rules' entry points, entities, and current test names. Return: keep, repair, or remove for each test, with its inspected basis.

## Inspect Each One

Open each overlapping test and record:

- what it really exercises, and what it replaces;
- where its expected value comes from: the Specification, a literal, or recomputed from the code;
- its timing control;
- which behavior change turns it red today.

A test's name or file location is not its basis; what it does is.

## Decide

- **Keep** when its protection is still valid under the changed rule.
- **Repair** when the rule is still live but the test's protection is defective (a recomputed expected value, a mocked-away interaction, a sleep, a weak assertion), or when the rule changed and its expected outcome must follow the new Specification line.
- **Remove** only with one of three bases: a replacement scenario in this Test Design; another named test that already gives the same protection; or proof the contract is dead because the Specification removed the rule. A snapshot or fixture with no live contract is a candidate for removal, not an automatic delete.

Good: "`reminder_test.ts:40` · repair · recomputes the due date with the same helper the code uses; replace with the literal from R3."

Bad: "remove the old reminder tests, they're covered"; a keep decided from the test's name alone.

## Complete When

Every overlapping test has a disposition with an inspected basis, and every removal names its replacement, the test that already covers it, or the rule the Specification removed.
