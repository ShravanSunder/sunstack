# 2026-10-31 Step 5 fixes: phase skills

`sunstack-dev` 2.101.3 → 2.101.4. The second step-5 fix PR: the findings the full rules run raised in seven phase skills.

- **Branch conditions the agent can observe:**
  - `debug-investigation`'s background monitor creates a temporary credential file only when the authorized way to pass the credential needs a file and no usable authorized file holds it. Every credential guard keeps its words.
  - It terminates the recorded process group only if the loop records a second probe result after the cancel or `stop.requested`, or runs past `max_runtime_seconds`. The stop order and target are unchanged, and there is no new deadline.
  - `plan-improve-repo`'s backlog reconciliation routes a correction when a plan's receipt verdict is `needs-refresh`.
- **New `Completion:` lines**, which add no new effect:
  - `implement-plan` step 4;
  - `implementation-pr-wrapup` step 8;
  - `plan-implementation` step 1;
  - `plan-improve-repo` validation steps 3 and 4;
  - `spec-program-review`'s Reviewer commission.
- `spec-design`'s two findings are explained as conforming at their lines, and its text is unchanged. The phase composition map is regenerated (line counts only).
- Validation:
  - a complete keyed rules run over the seven skills on the 0.8.0 kit: no incomplete part, no skipped rule, 0 errors, no description warning; ten assigned findings cleared and one explained;
  - `tests/skills`: tsc clean, vitest 268/268, `rules --check` 13 rules;
  - independent review closed three findings (3 → 0).
- Codex and Claude caches: not refreshed.
