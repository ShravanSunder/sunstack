# 2026-10-16 Cross-language standards move into principles

`sunstack-dev` 2.83.0 → 2.84.0.

- `principle-write-for-the-reader`: conventional short locals and idiomatic trait or method names are fine, a public API isn't renamed for taste, and documentation skips sections that only repeat the signature.
- `principle-justify-the-complexity`: your own pattern beside the codebase's is a second path, and preference doesn't justify one. Conflicting codebase patterns: follow the configured one or raise it. A defective convention gets the smallest bounded repair only when the agreed work needs it; otherwise it is followed and recorded.
- `principle-write-tests-that-can-fail`: the test comes first, and fails for the expected reason before implementation, for fixes, features, refactors and behavior changes. A refactor's pinning test is written or identified first and passes before and after. Speed targets (unit p95 under 25 ms, integration p95 under 250 ms) move into the main text. Unverified mock assumptions, or a scenario mocked away, move the test up to integration or E2E.
- `principle-prove-it-works`: smoke boots the real surface and performs essential behavior, and mocks aren't smoke. Docs, config, prompt-only, generated and throwaway work may use the smallest real check. A required proof gate is never deleted, weakened or disabled without the owner's explicit approval and a documented rationale.
- Where `my_agents.md` and a principle conflicted, the owner's text won. The `my_agents.md` side, one pointer per topic, lands in the devfiles PR.
- Validation: `git diff --check` clean; `pnpm --dir tests/skills run test` 166/166; `typecheck` exit 0; citation check passed; `claude plugin validate .` passed.
- Proof: static checks and an independent Sol implementation review (great at 8a7ca804), at the owner's direction. No behavior runs.
- Codex, Claude and Cursor cache refresh: not run.
