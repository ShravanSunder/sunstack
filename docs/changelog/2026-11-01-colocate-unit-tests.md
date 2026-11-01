# 2026-11-01 Domain skills: colocated unit tests

`sunstack-dev` 2.102.1 → 2.102.2. The owner's test layout now lives in the TypeScript and Rust domain skills. Agents kept adding unit tests to a package's existing `tests/` folder, as PR #188 did.

- `domain-typescript` gains a Tests section. A unit test sits beside its module as `<module>.test.ts`. The package's `tests/` folder holds only `tests/integration/`, `tests/e2e/` and their helpers in `tests/support/`.
- `domain-rust`'s Tests section now opens with the same layout:
  - a unit test goes in a sibling `<module>_test.rs`, declared `#[cfg(test)] #[path = "<module>_test.rs"] mod tests;`;
  - Cargo builds `tests/<name>/main.rs` as a target, which is how `tests/integration/` is found.
- In both:
  - the form holds whatever the repository does elsewhere;
  - any change to a module moves that module's own old-form unit tests beside it;
  - a repository-wide migration is its own PR;
  - the agent asks the owner only when the repository's own instructions or checks require another layout.
- "Signs you skipped it" now names the rationalization "the folder already has tests there".
- `domain-python` is unchanged; it already places tests beside their modules.
- Design set and review: `docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/` (one independent reviewer, accepted-to-implement).
- Validation: `tests/skills` vitest 268/268, typecheck exit 0, `rules --check` exit 0 (13 rules), `claude plugin validate .` passed. The planned pressure prompt hasn't run yet.
- Codex and Claude caches: not refreshed.
