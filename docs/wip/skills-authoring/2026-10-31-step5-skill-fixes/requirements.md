# Step 5 skill fixes: requirements

Draft 1, by the 🦁 Lead, 2026-10-31 04:29 EDT. Part one of the design set: requirements, [specification](specification.md), [skill design](skill-design.md), [skill verification](skill-verification.md). The finding list per run is in [runs.json](runs.json).

## The change

- **Class:** behavior-changing (`change-classes.md`: "An edit to SKILL.md prose, a reference's rules or a description is behavior-changing, whatever its size"). Descriptions, branch conditions, step completions, teaching sections and call lines change in 44 skills across six runs, one fix PR per run. Runs: `update`.
- **Reusable behavior:** the skills meet the creation-skill standards wherever step 5's rules run found a real failure, so agents load each skill at the right moment, take each branch on something they can see, know when each step is done, and know what each call returns.
- **Who reaches it:** every agent that loads one of the 44 skills listed in [runs.json](runs.json).
- **Existing owner:** none. No skill owns this cleanup; each run edits its own skills' text in place.

## The need, in the owner's words

- 30 Oct: "what i care to review is after you redo creaion skills assession,ent pahse skillsetc etc does that maek sense?"
- 29 Oct 21:18: "ji eean tclean ukp pahse sand practice seperset prs ... prioritce one at a tiem dont distract youkrself okeep focused".
- 28 Oct, descriptions: "Trigger wen, Always trigger when is also ok"; "100 to 200 charcters"; "300 means it fails its a failure ... lets have warnigns after 225 chars. lets have guidance below 200 is ideaq."
- The owner-confirmed pipeline page (29 Oct): a step with no completion is a finding at its heading.

**Success definition:**
- Each of the 89 real findings in [runs.json](runs.json) is fixed with the smallest repair that meets its standard. If the writer, reading the text, finds one conforming, it is explained at its line quoting the standard.
- No description is over 225 characters.
- The 81 steps held on the owner's completion-phrasing decision (D4) are left as they are.
- Nothing else about the skills' behavior changes.

## Evidence

- **Basis:** observed failure. **Reproduction:** reproduced (static). The full rules run at sunstack `f747b37e` (step-5 run 1, 3494 requests, 0 incomplete) found each at its line. The later run on the kit-precision PR (ea63f604) still finds 83 of the 89; the other 6 sit at the model's threshold (3 uncertain) or clear under its reworded questions (3). The failures are static text failures, so the reproduction is the rule run at the line, not a session replay.
- **Signals:**
  - step-5 run 1 (31 Oct 02:35 EDT);
  - W2's dispositions of all 300 findings (31 Oct);
  - the blind labels: two Sol labelers and a settler on 39 frozen cases, which overturned 13 of W2's 102 "real" to pass (31 Oct);
  - the Lead's spot checks at source.
- **What the rules measured about themselves:** judged rules move near their thresholds between runs, and blind labelers judged 13 "real" findings conforming. So a judged finding is a candidate, confirmed at its line by the writer, never a verdict.

## Scope and non-goals

- **In scope:** the six runs in [runs.json](runs.json):
  1. creation, domain-skill-crafting, 4;
  2. phase, 7 skills, 11;
  3. practice, 1 skill, 1;
  4. principle descriptions, 16 skills, 24;
  5. other descriptions, 10 skills, 16;
  6. step text, 9 skills, 33.
- **Not in scope:**
  - the 81 completion steps held on D4, until the owner decides;
  - the 130 kit mistakes (the rules kit, sunstack #181, and an engine release);
  - any marked standard sentence (`<!-- K00N -->`) or anything under `domain-skill-crafting/rules/`;
  - changing any skill's purpose, route, called skills, return or route tokens;
  - rewriting text only to clear a judged warning the writer finds conforming.
