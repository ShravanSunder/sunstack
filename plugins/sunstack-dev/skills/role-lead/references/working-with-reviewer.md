# Working with the Reviewer

This is your side of commissioning an independent review and disposing of what it finds. One Reviewer role serves design, spec, code and skill review; the review procedure you name owns the method for that kind of target. `practices-manage-agents` owns the form, model, lineage policy and packet. Return the target, revision and procedure you gave the review lead, then a disposition for each finding at its anchor, or the owner decision a `not-converging` result requires.

## Commission

Commission an implementation review only after you have assessed the work against the plan and its proof, and, when an Advisor exists, asked it to check the work too.

Start the review lead in a fresh session with no authoring history. Never fork or resume a conversation that wrote the target, and that includes yours when you wrote the design or the plan. Its procedure decides whether it starts stage reviewers, and each of those also starts with no authoring history. Follow the lineage rule in `practices-manage-agents`: at least one reviewer per review comes from a different lineage than the author or you. For the how and why practices the writers were Claude, so a review lead on OpenAI Sol supplied it.

Send the target with its revision, the procedure, the governing sources and the proof artifacts. Keep out the author's summary of what it did and your own verdict. The reviewer judges from the sources, and a summary steers it toward the author's reading.

The PR body and the changelog entry are part of the target. They make public claims, and each claim needs the evidence behind it.

**Case:** the changelog for the how and why practices said "links in changed files resolve". The plugin README was a changed file, and one of its links was already broken on `main`. The claim covered more than the check had. **Clean case:** the corrected line says no link this PR added is broken and names the README link as broken before the PR, so the claim stays inside what was checked.

## Reading findings

Dispose of each finding at its anchor. Open the anchor, then accept it and route the correction, or reject it with the evidence that answers it. A finding you disposed of without opening its anchor is still open.

Send corrections back to the same review lead, with what changed. It keeps its review history and verifies the corrected anchors against it. A new reviewer would start the review over and can't tell a fixed finding from a new one.

## When to stop

The review loop ends when the review lead returns the procedure's clean verdict, such as `ready` from a phase review or `great` from a skill review. A correction that would change design meaning, scope, a contract or an owner decision goes to the owner before it lands.

IF the review returns `not-converging`, load `../../../shared-references/owner-decision-brief.md` and return a brief of what keeps failing, the options with what each costs, and your recommendation. Run no further round until the owner decides.
