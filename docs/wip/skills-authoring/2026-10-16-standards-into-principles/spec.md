# Cross-language standards move into principles

Lead-authored spec, 2026-10-16. Owner `sunstack-dev`, plus a devfiles edit that needs the owner's OK before commit (approved in principle). User-directed intent. Branch `skills/standards-into-principles`, from #136's branch.

## What the owner asked for

- "are we moving standards or cross-language into principles?", then "let's make that change and reference them in my agents, that's what I want".
- "same for language references": `my_agents.md` points to the `domain-*` language skills too (M1 of #136's spec).

## Evidence

`/private/tmp/2026-10-domain-language-skills/standards-mapping.md` maps the `my_agents.md` Standards section (L376–584) sentence by sentence against the 17 principles. Types, Structure and Hard cutover are fully covered, and Testing and Proof almost fully. Four topics carry content their principle lacks (section 3). Its reduced Standards text is in section 4.

## Success

Each cross-language engineering standard has one home, its principle, and `my_agents.md` keeps a one-line "Before X, read `principle-Y`" pointer per topic, plus the owner-wide lines that aren't engineering judgment. No principle grows beyond what the standard actually adds. Where `my_agents.md` and a principle conflict, the owner's text wins.

## Runs

One skill per run.

| Run | Skill | Change |
| --- | --- | --- |
| N1 | `principle-write-for-the-reader` | Names: it already teaches two-word names for important things. Add the limits from "Names are promises": conventional short locals and idiomatic trait or method names are fine, a public API isn't renamed for taste, and documentation skips sections that only repeat the signature. |
| N2 | `principle-justify-the-complexity` | Respect the codebase: following your own pattern beside the codebase's is a second path, and preference doesn't justify one. Two cases: preference against the codebase, and the codebase wins; two codebase patterns that conflict, so follow the configured one or raise it. When the existing convention is itself a defect: if fixing it is needed to deliver the agreed work, make the smallest bounded repair at its owning boundary (the owner's scope gate, `my_agents.md` Act Mode); otherwise follow it and record the defect as a deferred improvement. |
| N3 | `principle-write-tests-that-can-fail` | Test-first order: write or identify the scenario test and confirm it fails for the expected reason before implementing. The owner's text wins over the principle's current allowance of a test written after the fix; that revert-the-fix check stays as the way to prove a test written for existing code can fail. Add the speed targets (unit p95 under 25 ms, ideally under 10 ms; integration p95 under 250 ms, ideally under 100 ms), now only in a reference. Keep the owner's mock rule as a firm one, not a "when it matters": when a mock's assumptions are unverified, or so much is mocked that the scenario is no longer exercised, move up to an integration or E2E test with real components (`my_agents.md` Testing). |
| N4 | `principle-prove-it-works` | Smoke checks boot the real surface and perform essential behavior; mocks aren't smoke. Docs, config, prompt-only, generated and throwaway work may use the smallest real check. A required proof gate is never deleted, weakened or disabled without the owner's explicit approval and a documented rationale. |

Companion: the reduced Standards section of `devfiles/shared/my_agents.md` (mapping section 4) joins M1 and M2 in one devfiles PR, applied after the sunstack PRs merge and caches refresh. One `sunstack-dev` version bump and changelog entry.

## Boundaries

- Principles keep their shape: one judgment, taught with cases. Add only what the standard adds, at the decision it informs. Not pedantic.
- Language-specific lines are the domain skills' (#136), not part of this change.
- No pressure tests (owner). Proof is static checks plus Sol review.

## Coordination

- Base: `skills/preflight-cleanup-domain` (#136). Version and stack position are set at PR time.
- Run states: all proposed.
