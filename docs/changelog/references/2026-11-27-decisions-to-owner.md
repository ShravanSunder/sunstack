# Receipts: decisions go up the chain to the owner (2026-11-27)

## Design review

Six rounds by one independent review lead (open findings 6 → 2 → 1 → 1 → 2 → 0). Round 4's F2 needed an owner ruling (no-Lead route); the owner ruled on one-way and two-way doors. Round 5 stopped as not-converging with F2 (reachability evidence, stop-treatment caller route) and F7 (authority before reversibility); the Lead chose a bounded restart; round 6 returned `accepted-to-implement`. The review record is in `docs/wip/skills-authoring/2026-11-27-decisions-to-owner/skill-design.md`.

## Tests

- `pnpm --dir tests/skills test`: first run 10 failed / 339 passed / 2 skipped, run in the same command right after `pnpm install`; the next two runs, unchanged tree: 34 files, 349 passed / 2 skipped, exit 0.
- New `lib/contracts/owner-decision-routing-contract.test.ts`: 4 tests pass. Against the base text it fails: the base brief contains "Chief of Staff", "recipient gap" and "keep the brief unsent", and the base stop treatments say "bring the owner the choice in the current conversation".
- Frozen v1 routing test in `spec-program-design-user-requirements-contract.test.ts` passes unchanged.

## Checked rules

`sunstack lint` (0.25.0) on the four changed skill files: exit 5 (uncertain), 0 errors, 1 warning: `design-program` description over 225 characters, pre-existing, description untouched. 16 `load-call.names-when-where-and-result` pieces unsure; one is on a changed line (`design-program/SKILL.md:70`), judged by the Lead: it names the moment (`IF returning decision-needed`), the target and the result (the brief for the recipient the reference names), the same form as `design-specification/SKILL.md:99`; kept. The other 15 are unchanged lines where the caller context was cut.

## Manifests

`claude plugin validate .` passed.

## Not verified

Agent behavior under the new route (no behavior comparison ran). Codex and Claude cache refresh happens after merge.
