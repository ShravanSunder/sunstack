# Step 5 skill fixes: requirements

Draft 2, by the 🦁 Lead, 2026-10-31 (draft 1 at 04:29 EDT; draft 2 after the design review's F1–F4, from `date`). Part one of the design set: requirements, [specification](specification.md), [skill design](skill-design.md), [skill verification](skill-verification.md). The batches, runs and findings are in [runs.json](runs.json).

## The change

- **Class:** behavior-changing (`change-classes.md`: "An edit to SKILL.md prose, a reference's rules or a description is behavior-changing, whatever its size").
- **What changes:** descriptions, branch conditions, step completions, teaching sections and call lines, in 39 distinct skills.
- **How it is cut:** 44 single-skill authoring runs (`update`). Five skills appear in two batches: scaffold-project, peekaboo, presentation-tui, presentation-webui and role-advisor. The runs are grouped into six serial PR batches, one fix PR per batch.
- **Reusable behavior:** the skills meet the creation-skill standards wherever step 5's rules run found a real failure. Agents then load each skill at the right moment, take each branch on something they can see, know when each step is done, and know what each call returns.
- **Who reaches it:** every agent that loads one of the 39 skills in [runs.json](runs.json).
- **Existing owner:** none. No skill owns this cleanup; each run edits its own skill's text in place.

## The need, in the owner's words

- 30 Oct: "what i care to review is after you redo creaion skills assession,ent pahse skillsetc etc does that maek sense?"
- 29 Oct 21:18: "ji eean tclean ukp pahse sand practice seperset prs ... prioritce one at a tiem dont distract youkrself okeep focused".
- 28 Oct, descriptions: "Trigger wen, Always trigger when is also ok"; "100 to 200 charcters"; "300 means it fails its a failure ... lets have warnigns after 225 chars. lets have guidance below 200 is ideaq."
- The owner-confirmed pipeline page (29 Oct): a step with no completion is a finding at its heading.

**Success definition:**
- Each of the 89 real findings in [runs.json](runs.json) is fixed with the smallest repair that meets its standard. If the writer, reading the text, finds one conforming, it is explained at its line quoting the standard.
- No description is over 225 characters.
- The 81 steps held on the owner's completion-phrasing decision (D4) are left as they are.
- Nothing else about the skills' behavior changes. That includes every existing guard on the sensitive text the edits touch.

## Evidence

- **Basis:** observed failure. **Reproduction:** reproduced (static).
  - The full rules run at sunstack `f747b37e` (step-5 run 1, 3494 requests, 0 incomplete) found each at its line.
  - The run on the kit-precision PR at ea63f604 still finds 83 of the 89. Of the other six, two pass (f073, f132) and four are uncertain (f108, f111, f127, f268) under its reworded questions.
  - "Reproduced" is a claim about text and rule observations, not fresh-agent behavioral evidence.
- **Signals:**
  - step-5 run 1 (31 Oct 02:35 EDT);
  - W2's dispositions of all 300 findings (31 Oct);
  - the blind labels: two Sol labelers and a settler on 39 frozen cases, which overturned 13 of W2's 102 "real" to pass (31 Oct);
  - the Lead's spot checks at source;
  - this set's independent design review (31 Oct).
- **What the rules measured about themselves:** judged rules move near their thresholds between runs, and blind labelers judged 13 "real" findings conforming. So a judged finding is a candidate, confirmed at its line by the writer, never a verdict.

## Scope and non-goals

- **In scope:** the six PR batches in [runs.json](runs.json):
  1. creation: domain-skill-crafting, 4 findings;
  2. phase: 7 skills, 11;
  3. practice: 1 skill, 1;
  4. principle descriptions: 16 skills, 24;
  5. other descriptions: 10 skills, 16;
  6. step text: 9 skills, 33.
- **Not in scope:**
  - the 81 completion steps held on D4, until the owner decides;
  - the 130 kit mistakes (the rules kit, sunstack #181, and an engine release);
  - any marked standard sentence (`<!-- K00N -->`) or anything under `domain-skill-crafting/rules/`;
  - changing any skill's purpose, route, called skills, return or route tokens;
  - weakening any existing guard on a credential, process, scan authority or operational effect;
  - rewriting text only to clear a judged warning the writer finds conforming.
