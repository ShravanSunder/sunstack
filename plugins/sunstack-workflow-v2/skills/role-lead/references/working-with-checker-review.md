# Working with the Checker

This is your side of commissioning an independent review and disposing of what it finds. One Checker role serves design, spec, code and skill review; the review procedure you name owns the method for that kind of target. `practices-manage-agents` owns the form, model, lineage policy and packet. Return the target, revision and procedure you gave the review lead, then a disposition for each finding at its anchor, or the owner decision a `not-converging` result requires.

## Commission

Select existing governing assignment/plan/procedure files that establish the inputs below, then send only role/files for this role. The recipient reads its own preamble and resolves the rich context; these input obligations do not require an inline packet or a newly recreated packet file. Continuations and corrections use the same two-field content with current governing correction sources.

Keep the Reviewer outside the implementation loop. MUST load `accepting-work.md` and return your completed five-condition acceptance artifact after required proof, before commissioning full independent delivery review as the last quality check. If a required condition/HOLD is open, obtain the missing work from the pair instead of asking the Reviewer to rescue the handoff.

Start the review lead in a fresh session with no authoring history. Never fork or resume a conversation that wrote the target, and that includes yours when you wrote the design or the plan. Its procedure decides whether it starts stage reviewers, and each of those also starts with no authoring history. Follow the lineage rule in `practices-manage-agents`: at least one reviewer per review comes from a different lineage than the author or you. For the how and why practices the writers were Claude, so a review lead on OpenAI Sol supplied it.

Reference governing files that name the target and revision, procedure and proof artifacts; send only checker/files. Include original owner decisions and complete scoped requirements/specification/design/verification material and workstream plan, current target/diff, the original Verifier report and deciding proof, your acceptance artifact with its completed checklist, unresolved-items state and review scope. Your assessment is a claim under review, not governing authority. The Reviewer checks admission and returns review-not-started for missing Lead work; it does not author that acceptance or obtain missing basic proof.

The PR body and the changelog entry are part of the target. They make public claims, and each claim needs the evidence behind it.

**Case:** the changelog for the how and why practices said "links in changed files resolve". The plugin README was a changed file, and one of its links was already broken on `main`. The claim covered more than the check had. **Clean case:** the corrected line says no link this PR added is broken and names the README link as broken before the PR, so the claim stays inside what was checked.

## Reading findings

Dispose of each finding at its anchor. Open the anchor, then accept it and route the correction, or reject it with the evidence that answers it. A finding you disposed of without opening its anchor is still open.

For accepted findings, route repairs to Implementer/Verifier and recheck only affected acceptance and deciding proof first. Record the whole correction pass in its governing file as the procedure defines, then send only checker/files back to the same review lead once. It keeps its review history and verifies the corrected anchors against it. A new reviewer would start the review over and can't tell a fixed finding from a new one.

## When to stop

A clean review is the last quality gate; no new wholesale Lead acceptance phase follows. The Lead remains responsible for finding disposition and unresolved obligations. The review loop ends when the review lead returns the procedure's clean verdict, such as `ready` from a phase review or `great` from a skill review. A correction that would change design meaning, scope, a contract or an owner decision goes to the owner before it lands.

IF the review returns `not-converging`, load `sunstack-dev/shared-references/owner-decision-brief.md` and return a brief of what keeps failing, the options with what each costs, and your recommendation. Run no further round until the owner decides.
