# Fixtures and Completion

This reference owns two ways a test goes wrong before its assertion means anything: a fixture that never reaches the case, and a test that decides it is done at the wrong time.

Expected inputs: the scenario, its layer and what stays real, the asynchronous signals the system emits, and the existing fixture helpers.

Return: for each affected scenario, a fixture that reaches the intended assertion and the correlated completion signal the test waits on, with its bound.

## The Fixture Reaches the Case

Build the state the scenario needs and nothing that hides it. A routing test needs pane B to exist and pane A to hold focus; with only one pane, "routes to the focused pane" and "routes to B" are the same outcome, and the wrong behavior cannot show. A branch-label test needs a commit on the branch. A rejection test needs the malformed input to reach the validator, not a parser earlier in the path that rejects it for another reason.

Check by asking what the test would observe if the subject did the wrong thing. If the answer is "the same thing as the right thing", the fixture does not reach the case.

## Setup Failure Is Not the Intended Red

A test can be red before the behavior runs: a missing module, an import error, a fixture that throws, a database that is not up, a discovery pattern that matched no test. Each of these is red for the wrong reason. The design names the intended red (the wrong value, the wrong effect) so the executor can tell the difference; a setup failure followed by a pass after the fix shows only that the setup was repaired.

## Correlated Completion

Wait for the signal that says this case finished, tied to this case, with a bound:

```text
Weak:   sleep 500 ms, then read pane B's input.
Weak:   wait for the next input-changed event from any pane.
Right:  wait up to 2 s for pane B's input-changed event carrying this send's id;
        on timeout, fail with the send id and what pane B holds.
```

The first passes or fails by machine speed. The second can wake on an unrelated event and read too early. The third finishes when the case does and reports something useful when it does not.

Choose the signal the system already owns: a completion record for a job id, a protocol acknowledgement for a request id, a state transition the owner emits. When no such signal exists for an asynchronous obligation, return a `program-design-gap` for the missing observation point instead of falling back to a sleep.

## Time and Interleaving

Control time when time is the policy: a due-date rule runs with a controlled clock and literal times. Keep the interleaving real when a race is the claim: use barriers or the system's own coordination points so the two actors overlap in the order the scenario names. Running the steps one after another tests no race.

## A Correct Implementation Finishes

The completion signal must be one a correct implementation emits. A test that waits for the client's retry, written against code where the router now owns retry, hangs on a correct fix. Check each wait against the design Program Design chose.

Complete when: each scenario's fixture would show the wrong behavior if it happened, each asynchronous case waits on a bounded signal correlated to that case, setup failures are named apart from the intended red, and every wait is one a correct implementation reaches.
