# Design set (scaled): presentation-html runs the picture-before-choice nudge

Run: `update` of `sunstack-dev:presentation-html`. Class: behavior-changing — adds one `IF` sentence to the main path (`SKILL.md` step 5). No trigger, description, reference, schema, completion condition or security surface changes. Basis: user-directed intent.

## Requirements

- Owner, 2026-11-13T14:33Z (export `owner-messages-claude-7b19bb47.jsonl`, the span after `❯`): "i cant trust a skill to jukst workk, we nee dto hav rules to run with skills and easily this the whoel point (barrign figuring out the way tot trigger the krulke check)".
- Owner, 2026-11-13T12:10Z, same export: "I think it’s about nudging the main agent, not passing or failing."
- Success: an author finishing a page that asks the reader to answer a question runs the active picture-before-choice rule on it and treats each finding as a nudge they judge.
- Non-goals: no trigger, hook or schedule (owner undecided); no gate; no edit to `owner-decision-brief.md`; no change to the rule or its README.

## Specification

- S1. When a page asks the reader to answer a question with a native choice, the author runs the nudge on the final page.
- S2. The author reads each finding as worth checking: no picture may be needed, a picture may sit under another heading, the author decides.
- S3. `uncertain` means the layout could not be read.
- S4. The command lives in one place (`rules/README.md`, which pins the CLI version); the skill points there.

## Skill design

Placement: `SKILL.md` step 5, after the static `check` sentence. The command needs finished HTML; step 5 is where the author already lints the final file. `references/options-and-decisions.md` is loaded during composition (step 4), before the page is final, and carries held-rule markers (O001, O002); an instruction there would arrive before there is a page to run it on.

Steering: one conditional sentence; the "not as a failure" framing answers the owner's nudge-not-gate words. No restated standard (the picture standard stays in the owner-decision brief and the rule).

## Verification

- S1–S3 route: eval (receiver behavior) — not run; owner has deferred behavior comparisons, so named unverified.
- S4: review-only (one command owner).
- Static: `pnpm --dir tests/skills test`, `claude plugin validate .`.
- Description unchanged: two-prompt trial not applicable.
- Design review: not run by the author; the Lead commissions an independent review before any PR.
