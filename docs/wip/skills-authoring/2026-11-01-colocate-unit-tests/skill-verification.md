# Skill verification: colocate unit tests

## Routes, per requirement and standard

| Item | Route | Decided on |
| --- | --- | --- |
| Standards 1–5 as written in each skill (file, place, naming, form, ask) | review check (`skill-review`'s implementation stage) | Each is a property of the skill's text: present, worded as its specification says, in the owning section. No checked rule judges test placement, and a new rule for one standard in two skills earns no marker (`decision-matrix.md`: review-only when no evidence kind picks the property) |
| `tests/support/` is allowed while a production `utils/` stays rejected (F2) | review check | Implementation review reopens `domain-typescript`'s Tests section and `:119` together and checks that a shared test helper under `tests/support/` breaks no naming rule, while a production catch-all `utils/` folder is still rejected. A wording search alone doesn't show the distinction |
| D1's Rust declaration compiles and reaches private items | already shown | a scratch crate, `cargo test`: 2 unit tests and 1 integration test passed (`skill-design.md` D1). Design review 1 confirmed it against the Rust reference's path and privacy rules |
| A TypeScript agent adding a unit test where the folder already holds the package's tests writes it beside its module without asking, and converts that module's existing tests | eval: the pressure prompt below | It's about what an agent does under pressure, which only a fresh run shows |
| The existing kit rules on the changed `SKILL.md` text (guidance, branch, completion, generalization) | mechanical and judged rules, in the writer's self-check | Both `SKILL.md` files are in the kit's denominator (`plugins/*/skills/*/SKILL.md`). The keyed run goes to the Lead, who holds the key |
| Repository gates | static checks | `pnpm --dir tests/skills test`, `pnpm --dir tests/skills rules --check`, `claude plugin validate .` |
| `domain-python` agrees | review check | a read of `:80-81` against standards 3–5. Its helpers sit in "the package's `tests/` folder", which `tests/support/` is part of, so they agree |

## Proof plan

- **Posture:** `user-directed intent`, so the draft needn't wait on a RED run. The pressure prompt runs after the draft, with a baseline on main's text and a run on the change's text, so the comparison shows what the new wording changes.
- **Runner:** Luna, in two fresh sessions commissioned through Router, one per text. Test runs use Luna or Jev, never Opus.
- **The material:** a throwaway checkout of `ai-tools` at `74e18127`, real text, nothing invented. Its `tests/skills/lib/skill-rules/` holds `report.ts`, and `tests/skills/lib/skill-rules/tests/` already holds eight `*.test.ts` files for that package.
- **The case is genuinely missing at that revision.** `formatAssembledKind` (`report.ts:231`) is exported, and no `*.test.ts` file names it (`git grep -l formatAssembledKind 74e18127 -- 'tests/skills/**/*.test.ts'` finds none). So the task needs a new test, and a reply that writes nothing can't be explained as finding the case already covered.

**The pressure prompt.** It's the same in both sessions; only the skill file it points at differs:

> You're working in `<checkout>` (TypeScript, vitest). Read `<path to domain-typescript/SKILL.md>` in full first. Then add a unit test for `formatAssembledKind` in `tests/skills/lib/skill-rules/report.ts`: a selected kind with `shared` names prints its bars and the shared names. The package's other tests are in `tests/skills/lib/skill-rules/tests/`, so keep things consistent and get it done quickly; I'm stepping away. Write the test file and tell me its path.

**Reading each run.** Read action order from the host's record of the run (its tool calls in order), never from the final reply alone. At `74e18127`, `tests/skills` has no instruction requiring unit tests under `tests/`, and its Vitest config includes `lib/**/*.test.ts` (`tests/skills/vitest.config.ts:13`). So standard 5's ask doesn't fire, and the colocated file is the answer. Standard 4 also applies: `report.ts`'s existing unit tests sit in `lib/skill-rules/tests/`, so the full answer moves them into `report.test.ts` in the same change. That conversion is recorded in its own column, so the placement reading stays clear.

| Outcome, in the record's order | Placement reading |
| --- | --- |
| `report.test.ts` written beside `report.ts` with the `formatAssembledKind` test, without asking | pass |
| A file written in `tests/skills/lib/skill-rules/tests/` | fail: the old layout copied |
| A question to the owner instead of writing | not a pass: over-asking, which the owner ruled out; recorded apart |
| No test file written and no question about placement, such as a reply that only reads the code or stops on another issue | not exercised: placement untested; reported, never counted a pass or a fail |

| Conversion, recorded apart | Reading |
| --- | --- |
| `report.ts`'s existing unit tests moved from `lib/skill-rules/tests/` into `report.test.ts` | done, as standard 4 asks |
| Left where they are | not done: a partial answer to standard 4 |
| Other modules' tests, or the whole folder, moved too | over-reach: a repository-wide migration belongs in its own PR |

Which files in `lib/skill-rules/tests/` count as `report.ts`'s unit tests is the run's own judgment. `skill-rules-report-gaps.test.ts` imports `report.ts` and `denominators.ts`; `run-skill-rules.test.ts` runs the rule runner as a process. The reading records which files the run moved and why, and names any file whose class is contestable instead of scoring it.

- **Baseline:** main's `domain-typescript` at `3511b587`, which has no Tests section. The expected baseline is a file in `tests/`, as #188 did. A baseline that already colocates is reported as such, and the claim then shrinks to "the change shows no added value on this case".
- **Kept for each run:**
  - the skill file's path and revision it was told to read;
  - the host's action record;
  - the checkout's state after the run, read outside both run workspaces;
  - the manual reading, as `proof-claims.md:28` requires.
- **Claim boundary:** two single runs show what the wording can do under this pressure, not a rate. One run per text is a smoke check, named as one.

## Trigger trial

`not applicable`: both skills are hidden from model invocation, and neither description changes.

## What stays unverified

- How often agents follow the new text: one run per text measures no rate.
- The Rust wording under pressure: no Rust pressure prompt runs, so the review check is its only proof.
- The `sunstack-tools` drift the owner names: not read in this run, and outside this change's files.
- Design review's two-reviewer coverage: one reviewer ran. The Lead ruled that enough for this change, and the limit is recorded in the review record.
