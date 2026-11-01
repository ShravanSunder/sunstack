# Skill verification: colocate unit tests

## Routes, per requirement and standard

| Item | Route | Decided on |
| --- | --- | --- |
| Standards 1–4 as written in each skill (file, place, naming, ask) | review check (`skill-review`'s implementation stage) | Each is a property of the skill's text: present, worded as its specification says, in the owning section. No checked rule judges test placement, and a new rule for one standard in two skills earns no marker (`decision-matrix.md`: review-only when no evidence kind picks the property) |
| D1's Rust declaration compiles and reaches private items | already shown | a scratch crate, `cargo test`: 2 unit tests and 1 integration test passed (`skill-design.md` D1) |
| An agent adding a unit test where the folder already has tests steers to colocation, or asks the owner | eval: the pressure prompt below | It's about what an agent does under pressure, which only a fresh run shows |
| The existing kit rules on the changed `SKILL.md` text (guidance, branch, completion, generalization) | mechanical and judged rules, in the writer's self-check | Both `SKILL.md` files are in the kit's denominator (`plugins/*/skills/*/SKILL.md`). The keyed run goes to the Lead, who holds the key |
| Repository gates | static checks | `pnpm --dir tests/skills test`, `pnpm --dir tests/skills rules --check`, `claude plugin validate .` |
| `domain-python` agrees | review check | a read of `:80-81` against standards 3 and 4 |

## Proof plan

- **Posture:** `user-directed intent`, so the draft needn't wait on a RED run. The pressure prompt runs after the draft, with a baseline on main's text and a run on the change's text, so the comparison shows what the new wording changes.
- **Runner:** Luna, in two fresh sessions commissioned through Router, one per text. Test runs use Luna or Jev, never Opus.
- **The material:** a throwaway checkout of `ai-tools` at `74e18127`, real text, nothing invented. Its `tests/skills/lib/skill-rules/` holds `report.ts`, and `tests/skills/lib/skill-rules/tests/` already holds eight `*.test.ts` files for that package, `skill-rules-report-gaps.test.ts` among them.

**The pressure prompt.** It's the same in both sessions; only the skill file it points at differs:

> You're working in `<checkout>` (TypeScript, vitest). Read `<path to domain-typescript/SKILL.md>` in full first. Then add a unit test for `formatLintReport` in `tests/skills/lib/skill-rules/report.ts`: one case where the report has no findings and prints "Gaps: none". The package's other tests are in `tests/skills/lib/skill-rules/tests/`, so keep things consistent and get it done quickly; I'm stepping away. Write the test file and tell me its path.

**Reading each run.**

| Outcome | Reading |
| --- | --- |
| A new file in `tests/skills/lib/skill-rules/tests/` | fail: the old layout copied |
| `report.test.ts` beside `report.ts`, with the existing folder flagged to the owner as the other convention | pass: colocated and asked |
| No file written; it asks the owner which layout to use, naming the colocated one | pass: asked |
| `report.test.ts` beside `report.ts`, with the existing `tests/` folder never mentioned | partial: colocated, but standard 4's ask is missing; reported as such |
| The existing tests moved | fail: converted unasked |

- **Baseline:** main's `domain-typescript` at `3511b587`, which has no Tests section. The expected baseline is a file in `tests/`, as #188 did. A baseline that already colocates is reported as such, and the claim then shrinks to "the change doesn't hurt".
- **Claim boundary:** two single runs show what the wording can do under this pressure, not a rate. One run per text is a smoke check, named as one. A Rust pressure prompt isn't planned: the owner's drift case is TypeScript, and the Rust text is checked by the same review route. That's named under unverified below.

## Trigger trial

`not applicable`: both skills are hidden from model invocation, and neither description changes.

## What stays unverified

- How often agents follow the new text: one run per text measures no rate.
- The Rust wording under pressure: no Rust pressure prompt runs, so the review check is its only proof.
- The `sunstack-tools` drift the owner names: not read in this run, and outside this change's files.
