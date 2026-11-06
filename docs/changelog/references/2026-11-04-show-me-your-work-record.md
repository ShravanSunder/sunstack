# Show me your work: the record and the live page — validation notes

Branch `skills/design-documents-html`. Design set: `docs/wip/skills-authoring/2026-11-04-show-me-your-work/`, accepted at `0111a3ef`. Implementation `d8b8f60a..45f36cc7`, then the ship commit.

## Proof

| Check | Result |
| --- | --- |
| `node --test plugins/sunstack-dev/skills/practices-show-me-your-work/scripts/` | 13 pass, 0 fail (at `d71e9682`; `45f36cc7` changes no script) |
| Mutation harness, nine deliberate breaks (no escaping, closure without its tag or by the last link, anchors on references, routine decision shown, every assumption waiting, a seen assumption shown as decided, first page only, recorded time dropped) | each fails its target test |
| `tsc --noEmit --strict` over the scripts; `oxlint`; `oxfmt --check` | exit 0 |
| Rules with the decision model, explicit paths, on every changed skill folder and the shared reference | status `uncertain` (exit 5), 0 errors; the warnings are the pre-existing missing per-step completion lines in `implement-plan`, `orchestrator-implementation-goal` and `plan-implementation`, which this change didn't introduce |
| `--since <rev>` form of the rule runner | refused before reading (`cannot resolve change scope: SourceChanged`), a limit of the 0.4.0 engine, not this change |
| Live page from this project's real record | built from more than 100 entries; Demistify check 0 errors, 0 warnings; headless render at desktop width |
| `claude plugin validate .` | passed |
| Codex quick validator | not run: it is a Python script, and the owner's repositories run TypeScript or Rust only |

## Reviews

- Design review (skill-review design stage, three Sol reviewers): `great`, findings 5 → 2 → 0.
- Implementation review (skill-review implementation stage, review lead plus teaching, structure and proof/safety reviewers, all non-Claude): `great` at `45f36cc7`, findings 7 → 1 → 0. The seven: a checkpoint that couldn't finish without a thread; malformed-entry guidance that promised an impossible repair; a worked example still recording on the thread; owner-waiting assumptions losing their part on the page; an incomplete decision-page route; the first trail read missing its cursor; a loaded reference still making the live page optional.

## Known limits

- An entries-file line the builder can't parse blocks that page's builds; the guidance reports it as the exact blocker and promises no repair.
- Behavior proof (trigger trial, pressure tests) is deferred by the owner; the claim is "drafted from approved intent; behavior not yet evaluated".
- The live page at phone width and in the owner's own browser is not checked.
