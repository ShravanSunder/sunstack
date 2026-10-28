# Rules in use: requirements

Draft 2, by the 🦁 Lead, 2026-10-28. Part one of the design set: requirements, [specification](specification.md), [skill design](skill-design.md), [skill verification](skill-verification.md). It finishes the kit the first checked rules started, so later pull requests are made with it and checked by it. Draft 2 replaces draft 1, which kept Jev off by default (`--judge`), wrote eligibility gates into prompts the engine can't run, invented calibration states and routed descriptions through the title section. It depends on the engine change in Project 2's amendment A22 (slice P10) and its eval operation (slice P8b), shipped in one tagged release.

## The change

- **Class:** behavior-changing. It alters descriptions (the trigger of seven skills), four skills' rule sites, `skill-rules`' procedure, the root's standards and their rules, and the rule runner. Runs: `update` on seven skills, plus repository code, an eval and a consumer run.
- **Reusable behavior:** skill-authoring agents check every skill they write, review, release or audit against the root's standards, as decision models the engine runs through Jev, whenever a skill changes in any pull request.
- **Who reaches it:** `skill-creation` at its self-check, `skill-review` at its first rule pass, `skill-orchestrator` at its prove step, `skill-audit` over the skills it audits, each through the repository's rule runner; a person runs the runner with one command.

## The need, in the owner's words

- 24 October: "start twith the high priority oens and ksill creaiton parts and impvoements to skill audits etc. teh skil adut can have all the rules we can run them easily then".
- 25 October, the pipeline: "soruces go thorugh -> trigger (otouf scope) -> inputs -> mechiancialf itler -> possilbe jev fileter decision tree -> the judge".
- 26 October, descriptions: the selected answer "A small engine change, so Jev can judge it".
- 27 October: "yes release for 1. we can sue a script with righ tparameters to help with pnpm." (the mechanical-first start, approved); "ok get all prs reayd after testign dog foodign rules with our new skillreation set of ksills".
- 28 October, on the stack: "we were skukppsed ot skue pr1 to make  future prs and use the rules and audits and eisng htem in"; "we need to fix pr1 agree on it.  then we can merge ti and use int all the folow up prs"; "ci is les simprotant thatn using it for pr1".
- 28 October, on descriptions: "we want fornt mateter deisgn not jsut rules as it sjusdgement of reviwer and creator.  descriptiosn shoduk be suscint"; "100 to 200 charcters"; "so soft rulle is 100 to 200"; "Trigger wen, Always trigger when is also ok"; "300 means it fails its a failure.  we shoudl check thos good skilsl are working. so lets have warnigns after 225 chars.  lets have guidance below 200 is ideaq. lets have 300 as ahrd rule with jev or rules etc.".
- 28 October, on removed files: "make srue any creation skill file yo uremove dis acuratley represented"; on the runner: "tests/skills/scripts/run-skill-rules.mjs can this not be mts?".
- 28 October, the fix list: "1. yes, 2. yes, 3. yes we have exisitn sampels for korhcset diesgtn sesiosn forma dvisior.  we ahve for skilsl current skills to audit and claibrate and talk about we will go though html presetnation samlpes.  4. yes, good start, 5. yes.  6yes, 7 lets go?".
- 28 October, the correction this draft answers: "the whole fuckign poitn of this is deiciosn models"; "how teh fuck we gonna fix this without stupid shiims and hot patches"; "in sunstack and this process of skill rules and rules engien i dont want worka orudsn"; "fix the fuckign engine"; "jev is teh whole fuckign poitn . we wnat to use decion models eveyrwehre"; "it is not afuckign afterhogiuht"; "luna and jev thats fuckign it for test runs of skills. use opus for fuckign creating skills only. and sol for evyerhting else".

**Success definition:** an agent writing, reviewing, releasing or auditing a skill in a later pull request runs the root's rules with the repository's one command, and Jev judges them by default. Each judged standard is a decision model: it selects the units its standard governs, asks whether each one is the kind the standard covers, and judges only those. A description outside the owner's openers, or over 225 characters, warns; one over 300 fails and is fixed before the step completes. Judged findings are confirmed at their anchor; anything uncertain, unresolved or not processed is a named gap, never a pass. #171's own skills pass, and one ordinary later-PR skill change shows all of this end to end, with a planted failure caught.

**What "passes" means** (the Lead's default A, offered on 28 October and not objected to): the mechanical limits pass; the judged rules ran on the units they govern, and each finding a person confirms is fixed or explained; anything incomplete is named. Clearing every judged warning is not the bar until a rule's eval shows it is accurate.

## Evidence

- **What went wrong in draft 1 and the first slice** (the 🦉 Advisor's independent inventory, `tmp/project-1-reviews/lead-additions-inventory-advisor.md`, 52 items, with one correction: its item 25 missed the owner's "100 to 200" messages). The mechanical-first start was approved; what failed was the finish: the shipped run procedure says the step "never evaluates a judged RuleSet" (`skill-rules/references/running-rules.md:9`), and the runner deletes the key (`run-skill-rules.mjs:207`), points Jev at a dead port (`:341`), evaluates only the metadata RuleSet (`:333-335`), binds a stand-in file when no references are selected (`:313-314`) and scans one plugin (`:19`).
- **Why the engine couldn't run skill standards as decision models** (the 📚 Researcher's report, `tmp/project-1-fix/engine-decision-models-research.md`, decisive claims reopened by the Lead): a candidate can't be a skill unit; a marked rule can't carry a mechanical pass, gates or a tree; a judged rule refuses a frontmatter field; checking rules needs a target binding; an eval case needs a session. Project 2's amendment A22 fixes each in the engine.
- **The #171 inventory** (`tmp/project-1-fix/inventory.md`): #171's seven descriptions are 264 to 411 characters (five fail 300, two warn); of the root's 235 standard units, 2 are mechanical, 31 judged, 110 review-only, 88 eval and 4 prose; across all 74 skills the owner's description policy gives 25 failures, 33 warnings and 16 passes.
- **The hosted run of the six flat judged rules** (owner's "yes", 28 October): 327 requests, $0.148, 2,739 judged passages, 2,005 warned. Of 30 sampled warnings, 11 judged the wrong kind of unit and 17 were stricter than the standard. The flat rules had no way to ask whether a unit was theirs to judge.
- **The removed-files check** (`tmp/project-1-reviews/removed-files-advisor.md`): one standard lost, L1, "Name that validator and test the representation it consumes" (`shared-shape-design.md:11` at base).
- **The trigger campaigns:** 82 headless Claude Code runs on default Opus, $33.14, against the owner's model rules. Their receipts stay as evidence; the method is not reused.
- **Authoring basis:** user-directed intent for every part, with the observed failures above as evidence.

## Non-goals

- CI. The owner: "ci is les simprotant thatn using it for pr1".
- Any switch, mode or flag that turns Jev off or makes it opt-in.
- Any caller-side substitute for an engine capability: no placeholder endpoint, deleted credential, stand-in binding, prompt-written gate or parallel calibration procedure.
- Rewriting text to clear judged warnings.
- Making a judged rule block before its eval shows it accurate, and afterwards without the owner's decision.
- Marking standards the decision matrix routes to review, eval or prose.
- The other 67 skills' descriptions: #172's 17 follow in #172 after this merges; the remaining 50 get their own pass.
- A rule-discovery mode in the engine's CLI (later, as the owner said on 27 October).
