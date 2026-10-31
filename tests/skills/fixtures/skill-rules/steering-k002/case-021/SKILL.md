## Plan Validation Flow

Use this for `validate-plan`, `next`, and pre-execution checks.

1. Read the full plan artifact. Do not require a separate reading receipt. Apply the conditional canonical-plan load call in the main workflow and return the unchanged plan record, governing basis, delivery context, and any discrepancy.
2. Verify the plan's `current-four-document-design-ready` or `implementation-mechanics-only` basis against current evidence. A missing, stale, or contradicted basis is `blocked` and routes to the exact semantic owner.
3. Verify the planned-at SHA, current branch, and changed target files.
4. Re-open all cited source files and commands from the plan.
5. Classify each task:
   - ready: evidence current and proof gate runnable
   - needs-refresh: paths, commands, or assumptions drifted
   - blocked: dependency or external state prevents execution
   - rejected: obsolete, duplicate, or no longer valuable
6. Check proof integrity:
   - red/green proof required or explicit user-approved exception
   - focused validation and full validation listed separately
   - when you choose or check the proof for an obligation, name the failure the improvement removes and confirm the planned check runs where that failure can make it fail ([write tests that can fail](../principle-write-tests-that-can-fail/SKILL.md))
   - on a design-ready basis, each Verification Design row is scheduled with a runnable command, and its observation and passing condition are unchanged
7. Return a separate readiness receipt. Do not edit source code, the canonical plan record, planning result, governing basis, or delivery context.
