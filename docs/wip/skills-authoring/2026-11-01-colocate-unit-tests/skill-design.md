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

- A unit test sits beside the module it tests and is named for it: `report.ts` and `report.test.ts` in the same folder. Every new unit test takes this form, whatever layout the repository has elsewhere.
- The package's `tests/` folder holds only tests that aren't unit tests, `tests/integration/` and `tests/e2e/`, and the helpers they share, in `tests/support/`.

When a change adds or edits a module's unit tests and that module's existing unit tests sit in another form, such as a `tests/` or `__tests__/` folder, move them beside the module in the same change. A repository-wide migration is its own PR. A folder that already holds unit tests is the old form, not precedent. A change once added two unit-test files for `lib/skill-rules/report.ts` to `lib/skill-rules/tests/`, because that folder already held the package's tests. The new tests belonged in `report.test.ts` beside the module, with that module's existing tests moved into it. Ask the owner only when the repository's own instructions or checks require a different layout.
```

Signs list, new last line:

```markdown
- A new unit test under `tests/` or `__tests__/` because the folder already has tests there.
```

### Run 2: `domain-rust`, the Tests section

Replaces `:129`, "Integration tests live where the crate already puts them, `tests/` or `crates/*/tests/`.", with:

````markdown
The owner's test layout holds in every crate:

- A unit test sits beside the module it tests, in a sibling `<module>_test.rs` declared from that module, so it still reaches the module's private items. Every new unit test takes this form, whatever the crate's other modules do:

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

- The crate's `tests/` folder holds only tests that aren't unit tests, `tests/integration/` and `tests/e2e/`, and the helpers they share, in `tests/support/`. Cargo builds `tests/<name>.rs` and `tests/<name>/main.rs` as test targets, so `tests/integration/main.rs` declares its files and the shared helpers as modules.

When a change adds or edits a module's unit tests and that module's existing unit tests sit in another form, such as an in-file `mod tests { … }` block, `foo/tests.rs`, `_tests.rs` or a file under `tests/`, move them into its `_test.rs` in the same change. A repository-wide migration is its own PR. Ask the owner only when the repository's own instructions or checks require a different layout.
````

The section's second paragraph, on async tests, stays as it is. The `test-support` bullet under "Crates and dependencies" (`:120`) already allows a crate-only helper "in a `#[cfg(test)]` module or under `tests/`", so it agrees and stays.

Signs list, new last line:

```markdown
- A new in-file `mod tests { … }` block or a unit test under `tests/`, because the module or crate already has tests there.
```

## Calls and placement

- **Call sites:** none added. Both sections are inline teaching in `SKILL.md`, with no load or citation.
- **Callers checked for a second home:** a search of `plugins/sunstack-dev/skills` and `plugins/skill-authoring/skills` for `tests/`, `colocat`, `_test.rs`, `.test.ts`, "test placement" and "where tests go" (1 Nov 2026) found:
  - `principle-write-tests-that-can-fail`, `implement-plan` and `role-implementer` don't restate where a test file goes, so there's nothing to remove;
  - the pointer already exists: `role-implementer/references/working-with-lead.md:36`, the reference `role-implementer/SKILL.md:29` requires, says "IF your commission is code work, load `../../domain-<lang>/SKILL.md` for each language the diff touches". The owner's global instructions route the same way. No new pointer is needed (design review 1 corrected this);
  - `verification-design/references/choosing-the-observation.md:85,94` names a `drafts-store.test.ts` only as an example file.

  The domain skills stay the one home per language.
- **`domain-python`, checked for consistency:** it says "Tests run on pytest, each file beside its module as `<module>_test.py`", "Factories and mock factories live in the package's `tests/` folder; integration tests live only in `./tests/integration`" (`:80-81`). Nothing in it contradicts the owner's layout, so it's unchanged. It has no e2e line and no "ask when the repository differs" sentence; adding those isn't a fix for a contradiction, so it stays out of scope (decision D3).

## Root topics that apply

- **`steering.md`:**
  - "Guidance says what to do and what good looks like": each standard names the file and its place.
  - The signs line is the red flag in the agent's own rationalization ("the folder already has tests there").
- **`generalization.md`:** the rule is the owner's adopted layout, stated as theirs, with its transfer cases in the specification; the worked case carries no PR number.
- **`main-path.md`:** no new branch. Two conditions, each observable and each with its action:
  - **The conversion:** a touched module's unit tests sit in another form, so they move to the standard form.
  - **The one ask:** the repository's own instructions or checks require another layout, so the agent asks the owner.
- **`calls-and-placement.md`:** one home per language, no reference.

## Sensitive surfaces

None. The change edits Markdown teaching only: nothing that executes, reaches the network or handles credentials.

## Decisions

| # | Default taken | Rationale |
| --- | --- | --- |
| D1 | The Rust sibling file is declared from its module with `#[cfg(test)] #[path = "<module>_test.rs"] mod tests;` | It keeps private items reachable through `super::`. Checked 1 Nov 2026 in a scratch crate (`/private/tmp/2026-11-colocate-unit-tests/rust-path-check`): the attribute resolves the sibling both at `src/report.rs` and in a nested `src/nested/ledger.rs`, and `cargo test` passed 2 unit tests and 1 integration test. Declaring the file from the parent instead (`mod report_test;` beside `mod report;`) would hide the module's private items |
| D2 | The worked case is written without the PR number | `generalization.md`: a skill holds judgment, not task history. The number stays in this set and in the changelog |
| D3 | `domain-python` is unchanged | The Lead's commission: "Change it only where it contradicts"; it doesn't |
| D4 | The `tests/integration/main.rs` sentence names Cargo's discovery rule | Without it, a `tests/integration/foo.rs` file is silently not built. The same scratch crate showed `tests/integration/main.rs` running as one target, and its helper folder (named `tests/utils/` there; Cargo treats `tests/support/` the same, as a folder with no `main.rs`) not becoming one |
| D5 | Signs-list lines quote the rationalization | `steering.md`: a bright line names the rationalization it blocks |
| D1a, 1 Nov 2026, adds to D1 | D1's form is the owner's fixed rule for every new Rust unit test, whatever the crate's existing modules do; the Rust text offers no other form and doesn't ask about it | The owner's ruling, "beside teh fuckign file coloclated" (form A), and the Lead's "a fixed rule, not an option … so no agent asks about the form again" |
| D6 | The helpers folder is `tests/support/` in both skills (it replaces the first draft's `tests/utils/` or a lib folder) | Design review 1's F2: `tests/utils/` collided with `domain-typescript:119`'s "never … `utils/`". The owner left the name open ("utils or lib are test helpers or whatever you want to call it"), and the Lead named `tests/support/`, which `sunstack-tools`' crates already use. With it, `:119` stays as it is |
| D7 (struck 1 Nov 2026 by D7a) | TypeScript keeps "ask the owner before adding the test" when the repository's layout differs; Rust asks only when the repository's own instructions or checks require another layout | The owner's original "of repo disagrees in convention ask me" stands for TypeScript, where no form ruling was made. For Rust the owner ruled on exactly the disagreeing-repository case, so the remaining ask is the conflict the ruling doesn't settle |
| D7a, 1 Nov 2026, supersedes D7 | Both languages: the form is fixed whatever the repository does elsewhere, and the one ask is "Ask the owner only when the repository's own instructions or checks require a different layout." | The Lead's correction, quoting the owner: "in typescript its .test.ts" and "dude i said a already beside teh fuckign file coloclated", which the owner doesn't want asked again |
| D1b, 1 Nov 2026, supersedes D1a's "leave the old ones" | A module the change gives or edits unit tests for has its existing unit tests in another form moved to the standard form in the same change; a repository-wide migration is its own PR | The owner's ruling that the existing ones get converted, relayed by the Lead (`01a196e1-dd48…`) |

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

- **Review 1, at `1db08216`:** one Sol xhigh reviewer (`codex-local/01a196d6-e5db-7713-b95e-51b150b843fa`), commissioned by the Lead through `skill-review`'s design stage; `design-review-1.md` in this folder.
  - Verdict: `targeted-revision`; implementation decision `revise-first`.
  - Accepted findings:
    - F1, blocker: the pressure oracle passed a write made before the owner's answer;
    - F2: `tests/utils/` collided with `domain-typescript:119`.
  - The reviewer also corrected the caller claim: `role-implementer`'s route already loads the domain skills.
  - The reviewer named the two-reviewer coverage `skill-review` normally requires as unfulfilled. The Lead ruled, 1 Nov 2026, that one reviewer is enough for this two-skill standard change.
  - **The limit, recorded:** the design is accepted on one independent reviewer's checks (`rule-agreement` and `transfer`, plus the rubric), not the stage's usual two families across two reviewers.
- **Revision 2, at `1129415a`:**
  - F1 is fixed in `skill-verification.md`: the oracle, and a genuinely missing case.
  - F2 is fixed by D6.
  - The Rust form is fixed by D1a and D7.
  - The caller claim is corrected above.
  - Its re-check goes to the same reviewer.
- **Revision 3:**
  - D7 is struck by D7a: TypeScript's form is fixed like Rust's, with the one ask.
  - D1b adds the conversion rule to both runs' text.
  - F1's pass condition flips: writing `report.test.ts` beside `report.ts` without asking passes (`skill-verification.md`).
  - The single-reviewer limit is recorded.
  - The re-check goes to the same reviewer.
