# 2026-10-31 Step 5 fixes: phase skills

`sunstack-dev` 2.101.3 → 2.101.4. The second step-5 fix PR: branch conditions the full rules run flagged in the phase skills, made observable.

- **Branch conditions the agent can observe:**
  - `debug-investigation`'s background monitor creates a temporary credential file only when the authorized way to pass the credential needs a file and no usable authorized file holds it. Every credential guard keeps its words.
  - It terminates the recorded process group only if the loop records a second probe result after the cancel or `stop.requested`, or runs past `max_runtime_seconds`. The stop order and target are unchanged, and there is no new deadline.
  - `plan-improve-repo`'s backlog reconciliation routes a correction when a plan's receipt verdict is `needs-refresh`.
- `spec-design`'s bounded-evidence branch is explained as conforming at its line; its text is unchanged.
- **Not in this PR:** the seven `completion.criterion` findings in `implement-plan`, `implementation-pr-wrapup`, `plan-implementation`, `plan-improve-repo`, `spec-design` and `spec-program-review`. Under the owner's D4 decision (the model judges a step's own words), no step gets an appended `Completion:` line. They stay findings until the new completion rule lands.
- Validation:
  - `tests/skills`: tsc clean, vitest 268/268, `rules --check` 13 rules;
  - independent review of the branch fixes closed (3 → 0);
  - the keyed rules run is redone on this head.
- Codex and Claude caches: not refreshed.
