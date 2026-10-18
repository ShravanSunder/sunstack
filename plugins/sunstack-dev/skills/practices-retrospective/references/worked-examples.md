# Worked Examples

You arrive at move 4 with each consequential outcome from move 2 and the owner and condition from move 3. Match each outcome to the case whose mechanism fits. Matching symptoms can mislead: case 5 is one failing check with three different destinations. Return, for each outcome, the closest case, how its reasoning applies, the row under Destinations it points to, and the tempting alternative you are declining.

Treat the details as illustrations and carry over the reasoning.

## Cases

**1. The lint that never ran.**
Evidence: three merged PRs in two weeks each imported a date library the repository had banned. Review caught two and one shipped. The lint config bans the import, but the CI workflow runs only the type checker and the tests, and no hook calls the linter.
Cause: the prevention existed and was never wired in. Each author's move was ordinary, because nothing in their run failed.
Disposition: improve the repository's checks, returned to the caller with the CI workflow's owner named: run the existing lint in CI. The proof it needs is the wired job failing on the import that shipped and passing on a clean file.
Tempting alternative: add "never import this library" to the instructions, or write a new check. Prose is the weakest guard, and a new check duplicates the rule the lint already holds. Move 3 finds this by opening the current owner.

**2. The fixture with no source code.**
Evidence: every proof run of a skill change stopped `evidence-blocked`, and so did the control run on the skill's previous revision. Each run's record shows the agent looking for the source files the request named and reporting that the fixture didn't contain them. The fixture directory holds only a README.
Cause: the fixture was wrong and the agents were right. Stopping was the behavior the skill asks for.
Disposition: correct the fixture, a repository gap returned to the caller, and change nothing in the skill. The proof it needs is the same runs again, against a fixture that holds the source.
Tempting alternative: loosen the skill so agents proceed without the source, or count the blocked runs as skill failures. Either one teaches agents to work from evidence they don't have. The previous revision stopping the same way points to the setup.

**3. The approval nobody could see.**
Evidence: an Operator's session stops mid-task on a pending sandbox approval and stays there overnight. It sent no message to its commissioner, and the approval prompt appeared only in the Operator's own session, which nobody was watching.
Cause: a tool and environment gap. The approval request surfaced where no one looked, and a blocked agent can't act until it's answered.
Disposition: improve the tool or environment, returned to the caller with the owner of that approval path named: where approvals are raised, and how a blocked one reaches someone who can answer it. It isn't an agent lapse.
Tempting alternative: tell the Operator to watch for pending approvals. An agent waiting on an approval can't follow that instruction, so the edit changes nothing and puts the blame on the one actor that couldn't move.

**4. The skill that never loaded.**
Evidence: the owner asked the agent to "babysit this PR until it's green". The agent polled the checks by hand, missed two review threads, and the owner had to correct it. A skill that covers both already exists. The session record shows it was never invoked, and its description doesn't use the words the owner used.
Cause: the guidance existed and was never discovered, a trigger gap.
Disposition: update a skill. Return to `skill-audit` the owner's words, the description revision that was offered and the skill that should have loaded. The proof it needs is fresh runs on requests that don't name the skill, which then load it.
Tempting alternative: create a new skill for babysitting PRs, or paste the steps into the repository's instructions. Both duplicate guidance that already exists, and the copy drifts. The defect is in the route to the guidance.
If the records can't show which skills were offered or loaded, because the transcript was compacted or the installed revision is unknown, the mechanism is unresolved. Return an investigation question that names the record that would decide it, not a trigger edit.

**5. One failing check, three destinations.**
Evidence: a feature's verification journey fails, and three different sets of records explain the failure:
- The adopted spec and the app agree, but the project's journey under `.agents/skills/verify-<app>/` still clicks a button the app renamed. Cause: the recipe went stale. Disposition: maintain verification, returned to `practices-verification-maintenance`.
- The journey and its driver are current, and the delivery claimed the behavior from unit tests without ever running the journey on the target. Cause: a missing observation. Disposition: returned to `practices-verification`; nothing in the recipe needs changing, so maintenance isn't the route.
- The app lists the newest items first, the journey expects the oldest first, and the sessions disagree on whether the product regressed or the expectation was wrong. Cause: a disputed expectation. Disposition: the question goes to the owner of the adopted source the journey cites.

Tempting alternative, in all three: edit the expected result until the journey passes, or change the product to match the recipe. A journey rewritten to match today's behavior turns a regression into a passing check for every later run, and a product changed to satisfy a stale recipe breaks working behavior. Only the adopted source can say which side is wrong.

**6. The final gate that caught what reviews missed.**
Evidence: on one PR, after the crafted tests passed and five review rounds converged, Cursor Bugbot flagged four interaction bugs. Each was confirmed at its anchor and fixed.
Cause: a success, with conditions. It ran last, over the whole diff, after review had converged, and the bugs it found crossed components, which slice-level tests and reviews weren't shaped to see.
Disposition: preserve it as a final gate, with those conditions and its limits. One PR shows it caught interaction bugs the earlier gates missed here. It doesn't show that it catches everything, that it replaces review, or that it pays for itself on a one-file change.
Tempting alternative: make it mandatory on every change, or decide the tests and reviews were wasted. A mandatory step adds cost to runs the evidence says nothing about, and the record shows what the earlier gates missed and says nothing about what they caught. If the caller wants it to become a standing gate, that is a skill or repository change through its own row under Destinations, carrying these conditions.

**7. Nothing to change.**
Evidence: an agent called a slice done without running its tests. The skill it loaded requires the run in its completion check, and the record shows the agent read it. Review caught the claim, and the agent ran the tests and fixed the failure in the same session. No other session in scope shows the same thing.
Cause: one lapse, with guidance that was adequate and read, and a review gate that caught it.
Disposition: execution was already corrected, so no persistent change.
Tempting alternative: add another MUST. The rule exists and reached the agent, and the review gate worked. One event with adequate guidance names no condition to change, and every added rule costs attention on every later run.
A second form: the owner first limited an age rule to plans, later extended it to specs, and the agent followed the later correction. No change: the later genuine correction governs, following it isn't a defect, and a guard that blocked it would be.

## When to stop

Stop when every outcome has a disposition you can defend from its records, or has become an investigation question because no mechanism fits what the records show. An outcome unlike every case still gets a row under Destinations, chosen with the same reasoning.
