# Verifying a Bug Fix

This reference owns verification before and after a bug fix: reproducing the symptom on the unfixed code, then showing it gone with the same command. Finding the cause stays with `debug-investigation`.

Expected inputs: the bug report, the Requirements line or rule the bug breaks, and access to the unfixed code. Return: the reproduction plan.

## Reproduce Before Fixing

1. Write the reproduction from the report and the rule, without knowing the fix, so it tests the symptom and not the patch.
2. Run it on the unfixed code and see the symptom. Run it again and see it again. A symptom seen once may be noise.
3. Record the exact command, the input, and what was observed both times.

## Then the Same Command After

After the fix, run the same command on the same input and observe the expected outcome from the Specification. A different command after the fix proves a different thing.

When the symptom cannot be reproduced on the unfixed code, say so: the fix is unverified for that symptom, and the reason goes on the check.

Good: "`agent-run --hook stop fixture-12` on a1b2c3d: event missing from pane 2, twice. After the fix on d4e5f6a: event in pane 2."

Bad: a new test written after the fix that passes; "couldn't reproduce, but the fix looks right".

## Complete When

The reproduction is written without the fix, has been run twice on the unfixed code with the symptom seen both times (or the failure to reproduce is recorded), and the same command is planned for after the fix.
