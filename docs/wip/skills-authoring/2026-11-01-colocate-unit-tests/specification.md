# Specification: colocate unit tests

## What the skills must do

- `domain-typescript` tells an agent adding a TypeScript unit test to put it beside its module as `<module>.test.ts`.
- `domain-rust` tells an agent adding a Rust unit test to put it beside its module as `<module>_test.rs`, declared from that module behind `#[cfg(test)]`.
- Both tell the agent that the package's or crate's `tests/` folder holds only non-unit tests (`tests/integration/`, `tests/e2e/`) and the helpers they share (`tests/utils/` or a lib folder).
- Both tell the agent to ask the owner when the repository's existing layout differs, and to neither copy that layout nor convert it.
- Both name the red flag, "the folder already has tests there", in their "Signs you skipped it" list.

## Standards the skills state

1. A TypeScript unit test sits beside the module it tests and is named for it: `report.ts` with `report.test.ts`.
2. A Rust unit test sits beside the module it tests in a sibling `<module>_test.rs`, declared from that module with `#[cfg(test)] #[path = "<module>_test.rs"] mod tests;`, so it reaches the module's private items.
3. A package's `tests/` folder holds only tests that aren't unit tests, `tests/integration/` and `tests/e2e/`, and the helpers those tests share, `tests/utils/` or a lib folder.
4. When a repository's existing layout differs from this one, the agent asks the owner before adding the test, and neither follows the old layout nor converts it unasked. An existing folder of unit tests is the old layout, not precedent.

Standards 1, 3 and 4 appear in `domain-typescript`; 2, 3 and 4 in `domain-rust`. Each skill owns its own language's layout, so standards 3 and 4 have one home per language, each worded for that language's tools.

## The rule, and its transfer test

The rule is the owner's adopted layout, stated as theirs ("The owner's test layout"), with the language its domain skill already scopes. It names no product beyond the language's own test conventions.

- **Case one, where it should hold:**
  - A Rust workspace whose crates keep integration tests in `crates/*/tests/` and unit tests in in-file `mod tests` blocks. The rule asks the owner before a new unit test copies the in-file block. It holds.
  - A TypeScript package using Jest with `__tests__/` folders. The rule asks before a new test goes into `__tests__/`. It holds.
- **Case two, a bad choice it never names:**
  - An agent puts a new unit test in a `spec/` folder beside `src/`. The rule names no `spec/` folder, and still rejects it: a unit test sits beside its module. It holds.
  - An agent adds a `test-fixtures.ts` at the package root for its integration tests. The rule rejects it: shared helpers go in `tests/utils/` or a lib folder. It holds.
- **Verdict:** passes both ways.

## The worked case

A change added two new unit-test files for `lib/skill-rules/report.ts` (`skill-rules-report-gaps.test.ts`, `skill-rules-severity-policy.test.ts`) to `lib/skill-rules/tests/`, because that folder already held the package's other tests. They belonged beside the module, as `report.test.ts`. The existing folder was the question for the owner. Source: PR #188, recorded in the requirements.

The skills carry the case without its PR number, because a skill's text holds judgment, not task history (`domain-skill-crafting/references/generalization.md:6`). The number stays in this set and in the changelog.
