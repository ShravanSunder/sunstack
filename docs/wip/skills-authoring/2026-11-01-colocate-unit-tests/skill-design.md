# Skill design: colocate unit tests

## Targets and runs

Owner plugin: `sunstack-dev`.

| Run | Skill | Surface | Status |
| --- | --- | --- | --- |
| 1 | `domain-typescript` | main path: a new `## Tests` section between "Shapes and names" and "Gates"; one line added to "Signs you skipped it" | proposed |
| 2 | `domain-rust` | main path: the first sentence of `## Tests` (`:129`) replaced by the layout; one line added to "Signs you skipped it" | proposed |

No other surface changes:
- **Trigger:** both descriptions already load for writing or changing code in the language.
- **Depth:** no reference changes; the standard is all-run detail for test work, so it stays in `SKILL.md`.
- **Proof:** carried by skill verification.

## Trigger

Unchanged and hidden: `disable-model-invocation: true` in both. Agents read them in full before work in the language, by the owner's global instruction.

## Main path

The lens doesn't change. The new text is a section of each skill's existing teaching, in the form those sections already use: a short standard, one example, a "when" sentence with its action, and a line in the signs list. No new call site; no reference is loaded.

### Run 1: `domain-typescript`, the new section

```markdown
## Tests

The owner's test layout holds in every package:

- A unit test sits beside the module it tests and is named for it: `report.ts` and `report.test.ts` in the same folder.
- The package's `tests/` folder holds only tests that aren't unit tests, `tests/integration/` and `tests/e2e/`, and the helpers they share, in `tests/utils/` or a `lib/` folder.

When the repository's existing layout differs, such as unit tests under `tests/` or `__tests__/`, ask the owner before adding the test: don't follow the old layout, and don't convert it unasked. A folder that already holds unit tests is the old layout, not precedent. A change once added two unit-test files for `lib/skill-rules/report.ts` to `lib/skill-rules/tests/`, because that folder already held the package's tests; they belonged beside the module as `report.test.ts`, and the existing folder was a question for the owner.
```

Signs list, new last line:

```markdown
- A new unit test under `tests/` or `__tests__/` because the folder already has tests there.
```

### Run 2: `domain-rust`, the Tests section

Replaces `:129`, "Integration tests live where the crate already puts them, `tests/` or `crates/*/tests/`.", with:

````markdown
The owner's test layout holds in every crate:

- A unit test sits beside the module it tests, in a sibling file named for it and declared from that module behind `#[cfg(test)]`, so it still reaches the module's private items:

  ```rust
  // src/report.rs
  fn count_words(text: &str) -> usize {
      text.split_whitespace().count()
  }

  #[cfg(test)]
  #[path = "report_test.rs"]
  mod tests;

  // src/report_test.rs
  use super::count_words;

  #[test]
  fn counts_words_split_by_whitespace() {
      assert_eq!(count_words("a b  c"), 3);
  }
  ```

- The crate's `tests/` folder holds only tests that aren't unit tests, `tests/integration/` and `tests/e2e/`, and the helpers they share, in `tests/utils/` or a lib folder. Cargo builds `tests/<name>.rs` and `tests/<name>/main.rs` as test targets, so `tests/integration/main.rs` declares its files and the shared helpers as modules.

When the crate's existing layout differs, such as in-file `mod tests { … }` blocks or unit tests under `tests/`, ask the owner before adding the test: don't follow the old layout, and don't convert it unasked. A module that already has an in-file test block is the old layout, not precedent.
````

The section's second paragraph, on async tests, stays as it is. The `test-support` bullet under "Crates and dependencies" (`:120`) already allows a crate-only helper "in a `#[cfg(test)]` module or under `tests/`", so it agrees and stays.

Signs list, new last line:

```markdown
- A new in-file `mod tests { … }` block, or a unit test under `tests/`, because the module or crate already has tests there.
```

## Calls and placement

- **Call sites:** none added. Both sections are inline teaching in `SKILL.md`, with no load or citation.
- **Callers checked for a second home:** a search of `plugins/sunstack-dev/skills` and `plugins/skill-authoring/skills` for `tests/`, `colocat`, `_test.rs`, `.test.ts`, "test placement" and "where tests go" (1 Nov 2026) found:
  - `principle-write-tests-that-can-fail`, `implement-plan` and `role-implementer` say nothing about where a test file goes, so there's nothing to point at the domain standard and nothing to remove;
  - `verification-design/references/choosing-the-observation.md:85,94` names a `drafts-store.test.ts` only as an example file.

  The domain skills stay the one home per language.
- **`domain-python`, checked for consistency:** it says "Tests run on pytest, each file beside its module as `<module>_test.py`", "Factories and mock factories live in the package's `tests/` folder; integration tests live only in `./tests/integration`" (`:80-81`). Nothing in it contradicts the owner's layout, so it's unchanged. It has no e2e line and no "ask when the repository differs" sentence; adding those isn't a fix for a contradiction, so it stays out of scope (decision D3).

## Root topics that apply

- **`steering.md`:**
  - "Guidance says what to do and what good looks like": each standard names the file and its place.
  - The signs line is the red flag in the agent's own rationalization ("the folder already has tests there").
- **`generalization.md`:** the rule is the owner's adopted layout, stated as theirs, with its transfer cases in the specification; the worked case carries no PR number.
- **`main-path.md`:** no new branch. The "when the existing layout differs" sentence is guidance with an observable condition (the repository's layout) and its action (ask the owner).
- **`calls-and-placement.md`:** one home per language, no reference.

## Sensitive surfaces

None. The change edits Markdown teaching only: nothing that executes, reaches the network or handles credentials.

## Decisions

| # | Default taken | Rationale |
| --- | --- | --- |
| D1 | The Rust sibling file is declared from its module with `#[cfg(test)] #[path = "<module>_test.rs"] mod tests;` | It keeps private items reachable through `super::`. Checked 1 Nov 2026 in a scratch crate (`/private/tmp/2026-11-colocate-unit-tests/rust-path-check`): the attribute resolves the sibling both at `src/report.rs` and in a nested `src/nested/ledger.rs`, and `cargo test` passed 2 unit tests and 1 integration test. Declaring the file from the parent instead (`mod report_test;` beside `mod report;`) would hide the module's private items |
| D2 | The worked case is written without the PR number | `generalization.md`: a skill holds judgment, not task history. The number stays in this set and in the changelog |
| D3 | `domain-python` is unchanged | The Lead's commission: "Change it only where it contradicts"; it doesn't |
| D4 | The `tests/integration/main.rs` sentence names Cargo's discovery rule | Without it, a `tests/integration/foo.rs` file is silently not built. The same scratch crate showed `tests/integration/main.rs` running as one target and `tests/utils/` not becoming one |
| D5 | Signs-list lines quote the rationalization | `steering.md`: a bright line names the rationalization it blocks |

## Coordination

- **Base:** `origin/main` at `3511b587`, worktree `skills/colocate-unit-tests` (`/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests`).
- **Pending edits:** none on these two files. PR #188 (`skills/rules-as-nudges`) doesn't touch them.
- **Landing:**
  - bump `sunstack-dev` from 2.102.1 to 2.103.0 in its Codex, Claude and Cursor manifests, and in the Claude marketplace entry;
  - add a changelog entry `docs/changelog/2026-11-01-colocate-unit-tests.md`, with a line in `docs/changelog/README.md`;
  - one PR; the owner merges.

## Run status

- Run 1: proposed.
- Run 2: proposed.

## Review record

None yet. One Sol xhigh reviewer, commissioned by the Lead through `skill-review`'s design stage.
