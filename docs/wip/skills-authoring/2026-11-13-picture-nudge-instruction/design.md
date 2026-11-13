# Design set (scaled): presentation-html runs the picture-before-choice nudge

Run: `update` of `sunstack-dev:presentation-html`. Class: behavior-changing — adds one `IF` sentence to the main path (`SKILL.md` step 5). No trigger, description, schema or completion condition changes; step 6's return gains the nudge's brief result. Execution surface: see below. Basis: user-directed intent.

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

## Execution surface

The instruction has the author fetch and run a pinned package (`pnpm dlx @sunstack/cli@0.16.0`, the command `rules/README.md` owns), so it does touch a package/subprocess execution surface. It adds no new kind of surface: this branch already prescribes that pinned invocation in `rules/README.md` (activated in e52ca793), and the unmerged `skills/v2-design-rules` branch's design-review prescribes the same pattern (`@sunstack/cli@0.11.0`); main does not yet carry it. The change adds one more pinned invocation, run by the author, on the author's own page. Provenance of the allowed decision: the owner's standing approval of `@sunstack/cli` installs and runs exists only in an agent-written memory note dated 2026-10-27, which is secondary; the Lead's note recording this was written at review request, after the instruction was written. No gate record preceded the write.

## Verification

- S1–S3 route: eval (receiver behavior) — not run; owner has deferred behavior comparisons, so named unverified.
- S4: review-only (one command owner).
- Static: `pnpm --dir tests/skills test`, `claude plugin validate .`.
- Description unchanged: two-prompt trial not applicable.
- Design review: not run by the author; the Lead commissions an independent review before any PR.
