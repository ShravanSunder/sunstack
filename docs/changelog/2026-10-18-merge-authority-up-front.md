# 2026-10-18 Merge authority up front

`sunstack-dev` 2.88.0 → 2.89.0.

- `implementation-pr-wrapup` gains a first step, "Establish merge authority". It records `merge-now`, `merge-when-ready` with the exact conditions, or the default `readiness-only`, and finds every applicable source before reconciling them. The newest genuine owner word governs, a standing restriction or condition limits any grant, and a grant covers only what it names (an exact head included). An unresolved conflict grants nothing.
- When nothing settles it, the agent asks once in its first report, names the PR (or the repository and branch before a PR exists) and the default, and keeps doing readiness work. The default `pr-ready-unmerged` terminal and a standing "don't merge unless asked" rule are not answers. Plan-only work and an explicit no-merge instruction get no question. The ask travels with the work: an inherited, unanswered ask is not repeated.
- The authorization gate reads the recorded state. A head change neither resets authority nor excuses a condition. `orchestrator-implementation-goal` settles authority at delivery-goal entry, carries it into the wrap-up assignment, and merges only after the Lead verifies the returned gate evidence.
- Validation: `tests/skills` lib tests, `tsc --noEmit` and `claude plugin validate .` pass. Behavior: fresh runs in named examples, judged by hand against checks written first: 18/18 across nine cases (absent, quoted grant, grant for other work, continuation, orchestrated entry, receiving executor, plan-only, newer correction, standing condition). The prior revision named the requirement but asked no up-front question. End-gate behavior after real GitHub readiness is unverified.
- Codex, Claude and Cursor cache refresh: not run.
