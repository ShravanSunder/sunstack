# Rules in use: requirements

Draft 1, by the 🦁 Lead, 2026-10-28, written with the branch's `skill-design`. Part one of the design set: requirements, [specification](specification.md), [skill design](skill-design.md), [skill verification](skill-verification.md). It is Project 1's second milestone 2 slice: it finishes the kit the first checked rules started, so later pull requests are made with it and checked by it.

## The change

- **Class:** behavior-changing. It alters descriptions (the trigger of seven skills), four skills' rule sites, `skill-rules`' procedure, the root's standards and their checks, and the rule runner. Runs: `update` on seven skills, plus repository code, a calibration and a consumer run.
- **Reusable behavior:** this change helps skill-authoring agents reliably check every skill they write, review, release or audit against the root's standards, with the real engine deciding the checked rules and Jev judging the rest as advisory warnings, whenever a skill changes in any pull request.
- **Who reaches it:** `skill-creation` at its self-check, `skill-review` at its first rule pass, `skill-orchestrator` at its prove step, `skill-audit` over the skills it audits, each through the repository's rule runner; a person runs the runner with one command.

## The need, in the owner's words

- 24 October: "start twith the high priority oens and ksill creaiton parts and impvoements to skill audits etc. teh skil adut can have all the rules we can run them easily then".
- 28 October, on the stack: "we were skukppsed ot skue pr1 to make  future prs and use the rules and audits and eisng htem in"; "we need to fix pr1 agree on it.  then we can merge ti and use int all the folow up prs"; "ci is les simprotant thatn using it for pr1"; "we stil figurign thigns out".
- 28 October, on descriptions: "we want fornt mateter deisgn not jsut rules as it sjusdgement of reviwer and creator.  descriptiosn shoduk be suscint"; "So lets keep this forngmatter diesn.  Trigger wen, Always trigger when is also ok"; "300 means it fails its a failure.  we shoudl check thos good skilsl are working. so lets have warnigns after 225 chars.  lets have guidance below 200 is ideaq. lets have 300 as ahrd rule with jev or rules etc."; "why not? why can we use the markdown and yaml grep ast to get forntmatter for rule?".
- 28 October, on removed files: "make srue any creation skill file yo uremove dis acuratley represented aska dvisor to check in that pr1".
- 28 October, on the runner: "tests/skills/scripts/run-skill-rules.mjs can this not be mts?".
- 28 October, agreeing the fix list item by item: "1. yes, 2. yes, 3. yes we have exisitn sampels for korhcset diesgtn sesiosn forma dvisior.  we ahve for skilsl current skills to audit and claibrate and talk about we will go though html presetnation samlpes.  4. yes, good start, 5. yes.  6yes, 7 lets go?".

**Success definition:** an agent writing, reviewing, releasing or auditing a skill in a later pull request runs the root's rules with the repository's one command. The checked rules decide: a description outside the owner's openers, or over 225 characters, warns; one over 300 fails and is fixed before the step completes. With the repository's permission and a key, the judged rules run through Jev on the units their standards govern, and come back as advisory warnings with their calibration state. A rule that didn't run, an input too large to judge, or a missing key shows as a named gap, never as a pass. #171's own skills pass their checked rules, and one ordinary later-PR skill change shows all of this end to end, including a planted failure caught.

**What "passes" means** (the Lead's default A, offered to the owner on 28 October; the owner may change it): the checked rules pass; the judged rules actually run on eligible units, and each warning a person confirms is fixed or explained; anything incomplete is named. Clearing every judged warning is not the bar, because the judged rules are not calibrated yet.

## Evidence

- The #171 inventory (`tmp/project-1-fix/inventory.md`, 28 October, Researcher `codex-local/01a1822d`), read by the Lead:
  - #171's seven descriptions are 264 to 411 characters; five fail the 300 limit and two warn.
  - The six model-visible ones load 2/2 on their real prompt and stay quiet 2/2 on a near miss.
  - The runner checks only `plugins/skill-authoring/skills` (`run-skill-rules.mjs:19`), strips the key (`:206-207`) and evaluates only the metadata RuleSet.
  - The audit and the orchestrator still say `rules: pending`.
  - Of the root's 235 standard units: 2 mechanical, 31 judged, 110 review-only, 88 eval, 4 prose.
  - Across all 74 skills, the owner's description policy gives 25 failures, 33 warnings and 16 passes.
- The hosted judged run, from the Lead's session with the owner's "yes", 28 October:
  - 327 requests, $0.148, model `typesafe/jev-1.14-20261014`.
  - 2,739 judged passages: 2,005 warned and 734 passed; one request was over budget.
  - Sampling 30 warnings: 11 judged the wrong kind of unit, 17 were stricter than the standard, 2 were possible wording fixes.
- The 🦉 Advisor's second look (`tmp/project-1-fix/finishing-plan-advisor.md`, `codex-local/01a14e6a`), adopted:
  - (1) prove the kit on one ordinary later-PR skill change through the normal route, not a Lead-run campaign;
  - (2) don't rewrite text to clear an uncalibrated judge: give each rule an eligibility gate and calibrate it;
  - (3) markers only where a rule fits.
- The Advisor's removed-files check (`tmp/project-1-reviews/removed-files-advisor.md`): 282 kept, 5 changed on recorded decisions, 1 lost. L1, "Name that validator and test the representation it consumes" (`shared-shape-design.md:11` at base), was verified by the Lead at source.
- The judge probe (`tmp/frontmatter-judge-probe/report.md`, 28 October): a judged rule can read a description as extra evidence beside a Markdown target; a frontmatter field can't be a judged target in the published engine (`invalid_target`).
- The `.mts` report (`tmp/mts-check/report.md`): convert, using Node's built-in type stripping.
- **Authoring basis:** user-directed intent, for every part, with observed failures as its evidence: the inventory's description failures, the pending rule sites, the runner's scope and key handling, and L1.

## Non-goals

- CI. The owner: "ci is les simprotant thatn using it for pr1".
- Making any judged rule block. Judged rules warn until calibrated, and they don't block afterwards either without the owner's later decision.
- Rewriting text to clear judged warnings.
- Marking standards the decision matrix routes to review, eval or prose.
- The other 67 skills' descriptions: #172's 17 follow in #172 after this merges, and the remaining 50 get their own descriptions pass.
- Reading the OS keychain from the runner. The runner reads the key only from its environment until a released CLI does the lookup (`sunstack-tools` #94, merged, not yet released).
- A rule-discovery mode in the engine's CLI (later, as the owner said on 27 October).
