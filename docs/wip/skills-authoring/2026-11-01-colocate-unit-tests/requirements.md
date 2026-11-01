# Requirements: colocate unit tests

## The change

- **Class:** `behavior-changing`. It adds a standard to two domain skills' teaching (`domain-typescript/SKILL.md`, `domain-rust/SKILL.md`): where a test file goes. An edit to `SKILL.md` prose is behavior-changing whatever its size.
- **Run kind:** `update`, two runs, one per skill.
- **Reusable behavior:** these skills help agents reliably put each new test where the owner's layout says, when they add or move a TypeScript or Rust test. A unit test goes beside its module. Integration tests, end-to-end tests and test helpers go in the package's `tests/` folder. When the repository's layout differs, the agent asks the owner.

## The need, in the owner's words

From the owner, 1 Nov 2026, as the Lead's commission quotes them:

- "ok we need fixes for both i have releaded this to kmultiplagnets and tonsof rework, use sol to fix and fix the skill in general we eitehr colcoate uknit tests. of repo disagrees in convention ask me"
- "in typescript its .test.ts"
- "in rukst its _test.rs"
- "tests/integraion/* tests/e2e/* tests/utils or whatever or lib to help systems"
- "utils or lib are test helpers or whatever you want to call it"

The owner's ruling on the Rust form, 1 Nov 2026, relayed by the Lead after design review 1: "beside teh fuckign file coloclated". That is form A of the three the Lead put to the owner:
- **A:** a sibling `foo_test.rs` beside `foo.rs`, declared `#[cfg(test)] #[path = "foo_test.rs"] mod tests;`.
- **B:** `foo/foo_test.rs`.
- **C:** keep `tests.rs`.

The Lead's instruction is to write it "as a fixed rule, not an option", so that "no agent asks about the form again". "Ask the owner" stays only for genuine conflicts the rule doesn't settle.

The helpers folder's name: the owner left it open ("utils or lib are test helpers or whatever you want to call it"). The Lead named it `tests/support/` after design review 1. It doesn't collide with `domain-typescript`'s "never … `utils/`" naming rule, and `sunstack-tools`' Rust crates already use it (`crates/sunstack-decisions/tests/support/mod.rs`, `crates/sunstack-lint/tests/support/lint_fixture.rs`).

**Success definition.** An agent adding a unit test in TypeScript or Rust puts it beside the module it tests:
- TypeScript: `report.ts` with `report.test.ts`.
- Rust: `foo.rs` with `foo_test.rs`.

It puts only integration tests, end-to-end tests and their helpers under the package's `tests/` folder: `tests/integration/`, `tests/e2e/` and `tests/support/`.

When a TypeScript repository already lays its unit tests out another way, the agent asks the owner before adding the test, instead of copying the old layout or converting it. In Rust the form is settled whatever the crate already does. The agent asks only when the repository's own instructions or checks require a different layout.

## Who reaches the skill, and when

Both domain skills are hidden from model invocation (`disable-model-invocation: true`). Agents read them in full before TypeScript or Rust work, because the owner's global instructions say "Before writing or reviewing TypeScript, Python, or Rust, read that language's `domain-typescript`, `domain-rust`, or `domain-python`". The standard is read whenever an agent writes or moves a test in those languages.

## Evidence

| Signal | Date | Source |
| --- | --- | --- |
| The owner's direction above | 1 Nov 2026 | the Lead's commission (Router, `claude-local/68844339`), quoting the owner |
| The owner's Rust ruling, and the helpers folder's name | 1 Nov 2026 | the Lead's two Router messages after design review 1 (`01a196de-337e…`, `01a196de-8389…`) |
| Design review 1: revise-first, with F1 (the proof oracle) and F2 (the `utils/` collision) | 1 Nov 2026 | `design-review-1.md` in this folder |
| PR #188 added two new unit-test files for `tests/skills/lib/skill-rules/report.ts` to the existing `tests/skills/lib/skill-rules/tests/` folder: `skill-rules-report-gaps.test.ts` and `skill-rules-severity-policy.test.ts` | 31 Oct 2026 | `git diff --name-status origin/main...skills/rules-as-nudges -- tests/skills` (status `A` for both) |
| The same drift in `sunstack-tools`, which the owner names as "both" | 1 Nov 2026 | the owner's first quote. Not read in this run; the owner's report is the source |
| `domain-rust`'s only test-location sentence is about integration tests: "Integration tests live where the crate already puts them, `tests/` or `crates/*/tests/`." It says nothing about unit tests | read 1 Nov 2026 | `plugins/sunstack-dev/skills/domain-rust/SKILL.md:129` at `3511b587` |
| `domain-typescript` has no Tests section and says nothing about where tests go | read 1 Nov 2026 | `plugins/sunstack-dev/skills/domain-typescript/SKILL.md` at `3511b587` |

## Authoring basis

`user-directed intent`: the owner stated the standard directly. The #188 drift is a recorded instance of the failure the standard prevents, but it isn't a reproduced failure of the skill text, because neither skill said anything about unit-test placement. So no reproduction is owed before the draft.

## Non-goals

- Converting any existing test layout, in this repository or another.
- Changing `domain-python`. It already places a test beside its module as `<module>_test.py` and keeps integration tests in `./tests/integration`; it's checked for consistency only.
- Restating the standard in phase, practice or role skills.
- Any test runner configuration (vitest `include` globs, `[[test]]` targets) beyond what the layout needs to be found.
- Fixing #188's or `sunstack-tools`' test files: separate work, assigned elsewhere.
