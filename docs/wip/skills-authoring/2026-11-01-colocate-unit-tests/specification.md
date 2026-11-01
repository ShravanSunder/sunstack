# Specification: colocate unit tests

## What the skills must do

- `domain-typescript` tells an agent adding a TypeScript unit test to put it beside its module as `<module>.test.ts`. That is the one form, whatever the repository does elsewhere.
- `domain-rust` tells an agent adding a Rust unit test to put it beside its module as `<module>_test.rs`, declared from that module with `#[cfg(test)] #[path = "<module>_test.rs"] mod tests;`. That is the one form, whatever the crate does elsewhere.
- Both tell the agent that the package's or crate's `tests/` folder holds only non-unit tests (`tests/integration/`, `tests/e2e/`) and the helpers they share (`tests/support/`).
- Both tell the agent that any change to a module, production code or tests, converts that module's own unit tests that sit in another form, in the same change, and to leave a repository-wide migration to its own PR.
- Both tell the agent to ask the owner only when the repository's own instructions or checks require a different layout.
- Both name the rationalization "the folder already has tests there" in their "Signs you skipped it" list.

## Standards the skills state

1. A TypeScript unit test sits beside the module it tests and is named for it: `report.ts` with `report.test.ts`. Every new unit test takes this form, whatever layout the repository has elsewhere.
2. A Rust unit test sits beside the module it tests in a sibling `<module>_test.rs`, declared from that module with `#[cfg(test)] #[path = "<module>_test.rs"] mod tests;`, so it reaches the module's private items. Every new unit test takes this form, whatever the crate's other modules do.
3. A package's `tests/` folder holds only tests that aren't unit tests, in `tests/integration/` and `tests/e2e/`, and the helpers those tests share, in `tests/support/`.
4. When a change edits a module, its production code or its tests, and that module's existing unit tests sit in another form, the change moves them to the standard form. The move covers only that module's own unit tests. Other forms include a `tests/` or `__tests__/` folder, `foo/tests.rs`, an in-file `mod tests { … }` block and `_tests.rs`. A repository-wide migration is its own PR.
5. Ask the owner only when the repository's own instructions or checks require a different layout.

Where each standard lives:
- `domain-typescript` states 1, 3, 4 and 5, each worded for TypeScript's forms.
- `domain-rust` states 2, 3, 4 and 5, each worded for Rust's forms.

Each skill owns its own language's layout, so standards 3 to 5 have one home per language.

## The rule, and its transfer test

The rule is the owner's adopted layout, stated as theirs ("The owner's test layout"), with the language its domain skill already scopes. It names no product beyond the language's own test conventions.

- **Case one, where it should hold:**
  - A Rust workspace whose crates keep integration tests in `crates/*/tests/` and unit tests in in-file `mod tests` blocks. A change that adds a test to one module moves that module's in-file block into a sibling `_test.rs` beside the new test. The crate's other modules are left for a migration PR. It holds.
  - A TypeScript package using Jest with `__tests__/` folders, and no repository instruction requiring them. A new test for `parser.ts` goes in `parser.test.ts`, and `__tests__/parser.test.ts` moves beside it. It holds.
  - The same package with an `AGENTS.md` that requires `__tests__/`. The agent asks the owner. It holds.
- **Case two, a bad choice it never names:**
  - An agent puts a new unit test in a `spec/` folder beside `src/`. The rule names no `spec/` folder, and still rejects it: a unit test sits beside its module. It holds.
  - An agent adds a `test-fixtures.ts` at the package root for its integration tests. The rule rejects it: shared helpers go in `tests/support/`. It holds.
- **Verdict:** passes both ways.

## The worked case

A change added two new unit-test files for `lib/skill-rules/report.ts` (`skill-rules-report-gaps.test.ts`, `skill-rules-severity-policy.test.ts`) to `lib/skill-rules/tests/`, because that folder already held the package's other tests. The new tests belonged beside the module, in `report.test.ts`. That module's existing unit tests in that folder belonged with them, moved in the same change. Source: PR #188, recorded in the requirements.

The skills carry the case without its PR number, because a skill's text holds judgment, not task history (`domain-skill-crafting/references/generalization.md:6`). The number stays in this set and in the changelog.
