# Amendment D24: prove rules on real skills, pinned by Git

1 Nov 2026. Author: 🦁 Lead. **Status: accepted by the owner on 1 Nov, for decisions 1 and 2.**
- Decision 1, adopt: "but rule tests shoud lbe done we align on this?"
- Decision 2, pressure tasks in the next stacked PR, not gating #188: "i agree".
- Decision 3 is still open.

So #188 is gated on D24a–c and D24e–h. D24d moves to the next stacked PR. It amends [skill-design.md](skill-design.md) (adds D24) and [skill-verification.md](skill-verification.md) (replaces its proof routes for the judged rules). Built on [Advisor view 9](../../../../../memory-logs/projects/2026/2026-10-skills-and-sessions/scratch-root-01a1635f/skill-rules/rules-purpose/advisor-view-9.md). That path is outside this repository; the Lead's trace records it.

## Why

At Gate 3 the held-out result read 25 matched, 8 unsure, 1 missed, 0 wrong. Split by source:
- 13 of the 25 held-out matches came from synthetic inputs: invented mini-skills and invented rule files.
- On the held-out set, the description rule never met a real positive, and the decision-model rules met only synthetic rule files.
- On real held-out text, the result was 12 matched, 4 unsure, 1 missed out of 17.

The owner, 1 Nov:
- "ok your fixtures for skilsl are nto real this is the reason why this is failing";
- "this is very bad unrealzitic tests taht are not good skil tests";
- "a skill can just use git as snaphtot with helper? okr some method isntead of peperign the rpeo with fixtures?";
- "Only susntack-toosl needs fixtures because its testing mechncial apsect of the thool";
- "we want pressure tests not theses";
- "we need rule tests, so yes we need tests to check the rukels against real skills".

## D24: three claims, three owners, all on real skills

| Claim | What shows it | Where |
| --- | --- | --- |
| The engine runs a rule correctly: parsing, pieces, the tree, line picks, report fields | Fixtures that test mechanics | sunstack-tools only |
| An authored rule asks a useful question of real skill text | Rule checks on real skills pinned by Git (D24a–c) | sunstack, beside the rules |
| An agent that receives a nudge acts well on it | Pressure tasks on the same real skills (D24d) | sunstack |

The engine can't prove that an authored question is a good one; that stays with the skill authors. A rule check and a pressure task can share one real snapshot: the check's nudges become the pressure task's input.

### D24a: sources are pinned by Git, not copied

- **What a source is.** A source names a repository, a commit and the paths it needs, including the files those paths load. A small TypeScript helper beside the rules runner unpacks it (`git archive`) into a temporary folder outside the repository, runs there, and deletes the folder. It uses no worktrees, so there are no registrations to go stale.
- **No copies.** No skill text is committed as a test input. A missing commit is a setup gap to fix: fetch the commit, or name the repository. It's never a reason to copy.
- **Choosing sources.** Pick them for distinct failure modes and their counter-examples, not for size. One source family counts once: `ops-observability-stack` and #187's line 17 are the same family.
- **Where sources come from:**
  - this repository's history, especially versions from before a real fix;
  - the owner's other repositories;
  - upstream skill collections.

### D24b: expectations sit beside each rule file

Where expectations are stored is the Lead's choice, not something the owner's naming rule implies. `rules/<file>.rules.json` gets a sibling `rules/<file>.expect.json`, so they sit beside the rule they test. The Lead owns their meaning and who reads them:
- The expectation run (D24c) is the one reader. It reads every entry for the rule files it runs.
- An entry is a claim about one rule at one source place. It's never a copy of text: the text always comes from the pinned commit.
- A run reports each entry separately. An entry can't be dropped or rewritten in order to pass; changing one is a recorded decision with its basis.

Each entry records:
- the rule and the source (repository, commit, path, lines);
- the expected call: must fire, must pass, not applicable, or unknown (unknown is allowed);
- the kind:
  - a breach is an established mistake;
  - "worth reading" is a place an agent should look at;
  - a regression example is a historical mistake. It is not a fresh holdout.
- the basis: why, and which context supports the call;
- who decided it.

Two rules govern how expectations are kept:
- **Expectations come first.** They're written before a semantic rule change, never after.
- **Disputed or acceptance-critical calls go to independent judges**, either two agents labelling blind or the owner. Agreement between two judges isn't truth by itself, so the basis stays recorded. Routine labels don't need the owner.

A "must pass" holds for one rule at one commit. A skill is never "clean" across the board: an earlier `practices-cleanup` had two real placement findings.

#### The `.expect.json` contract (Lead-owned)

One file per rules file, beside it. Its top level is `{ "expectations": [ … ] }`. Each entry:

```json
{
  "id": "placement-ops-observability-loop",
  "rule": "placement.product-workflow",
  "source": {
    "repository": "self",
    "commit": "4d909fd3…40 hex…",
    "path": "plugins/sunstack-dev/skills/ops-observability-stack/SKILL.md",
    "context": ["plugins/sunstack-dev/skills/ops-observability-stack/references"]
  },
  "piece_first_line": 6,
  "expect": "must_fire",
  "lines": [17, 18],
  "kind": "regression_example",
  "basis": "Lines 17–18 route any agent into AgentStudio's own debug loop; the loaded agentstudio-loop.md is that product's workflow.",
  "decided_by": { "how": "independent", "who": ["step 6 round 2: two blind labellers disagreed, settled by an independent Sol settler"] },
  "added": "2026-11-01"
}
```

This example is development case-001's real source, with the commit hash elided. Its labels came out of step 6's blind labelling, settled by the Sol settler.

What each field means:

| Field | Meaning |
| --- | --- |
| `id` | Stable. Never reused. |
| `rule` | Must name an entry in the sibling rules file. |
| `source.repository` | `"self"` for this repository. Any other value names a repository the runner knows how to fetch. If it can't be fetched, that's a setup gap, never a pass. |
| `source.commit` | A full commit hash on that repository's main history. |
| `source.path` and `source.context` | The file judged, and the files and folders it loads. All of them are unpacked from the same commit. |
| `piece_first_line` | Picks the judged piece the way the engine does. It's omitted for kinds judged once per file, such as descriptions. |
| `expect` | `must_fire`, `must_pass`, `not_applicable` or `unknown`. |
| `lines` | For `must_fire`, the lines a finding may point at. Absent otherwise. |
| `kind` | `breach` (an established mistake), `worth_reading` (a place an agent should look at), or `regression_example` (a historical mistake, never a fresh holdout). |
| `basis` | Why, and which context supports the call. |
| `decided_by.how` | `owner`, `independent` (two or more blind judges, named in `who`) or `author`. A `must_fire` that a run's acceptance rests on needs `owner` or `independent`. |

The rules for whoever reads these files. The expectation run is the only reader:
1. It reads every entry for the rules files it runs.
2. It reports each entry on its own line, with the outcome against `expect`, whether the locator hit `lines`, and any gaps. A source it can't unpack, or a piece the engine cut, left unread or failed on, is a gap and never counts as a pass.
3. An entry is never deleted or rewritten to make a run pass. Changing `expect`, `lines` or `kind` is a commit that records a new `basis`.
4. New entries are added before a semantic change to the rule they cover, never after.

### D24c: two kinds of run

1. **Expectation run, on every rule change.** Unpack each pinned source, run the rules, and compare at the expected lines. Each rule reports three things separately, counted on real text only:
   - **the outcome against the expectation:** caught, missed, false nudge or unsure;
   - **the locator:** whether a finding pointed at an expected line;
   - **execution and coverage gaps:** pieces cut, unread, incomplete or in error. A gap is never counted as a pass.
2. **Current-skills run, on every rule change.** Run the rules over this repository's skills at HEAD. Every nudge gets an account. Also review places the rule passed or found not applicable, the cuts and exclusions, and the known mistakes, so a rule that never looked is caught. Clear outcomes join the expectations. This run is supporting evidence: not a holdout and not an accuracy rate.

### D24d: pressure tasks for the agent that receives a nudge

- **The setup.** A fresh agent (Luna or Jev for test runs) works on a real source unpacked from Git. It gets a realistic task that carries a conflicting instruction or a shortcut incentive. Example: #187's "fix the return and ignore ownership", with the nudge from the rule check in its context.
- **What's observed** is what it actually does: which files it reads, what it does or decides, and its justification. Its own report of compliance doesn't count, and neither does a matching rule outcome.
- **What passes:** it reads the nudge's places and makes the right broader call.
- **Machinery, and the adaptation it needs.** The existing pressure library finds scenarios as `.md`/`cases.ts` files, not Git pins, and its configured scenarios folder is currently absent. So D24 adds a scenario record. Each records:
  - the pinned source: repository, commit, and paths with their load context;
  - the task, with its conflicting instruction or shortcut;
  - the nudge it gets;
  - what will be observed: expected reads, the action or decision, and the justification.

  The pressure entry and its tests stay. Scripts, discovery and the README are reconciled to the scenario record.
- **The subject route is a precondition.** No verified route yet runs a tool-using test agent for these tasks (a Luna or Jev subject that can read files and act). Preflight has to establish one before a pressure result is claimed. Until then it's a named gap.

### D24e: real "must fire" cases, and gaps

| Rule | Real must-fire cases today |
| --- | --- |
| Placement | Historical `ops-observability-stack` loop (one family); historical `practices-cleanup` AgentStudio paragraph and table (another family) |
| Generalization | Historical `domain-python`: "Modules and tests" and "Gates" |
| Description loading scope | None established yet. A pre-#172 product-loading description is a candidate to check. |
| One proposition, criteria match | None established yet. Search the history of real `.rules.json` files. |

Search history, the other repositories and upstream first. Where a rule still has no real must-fire case, it says so: "no real positive found". Its readiness claim then narrows to exactly what its runs on real skills showed, with their scope and uncertainty. A missing positive doesn't by itself establish "no false nudges". That claim holds only if the runs actually show it, with their gaps named. The owner decides whether such a rule ships. Nothing is invented to fill a count.

### D24f: what is removed, and what is kept

**Removed from sunstack, with every caller closed:**
- the excerpt corpus `tests/skills/fixtures/skill-rules/` (260 files at #188, 174 on main);
- `evals/skill-rules.eval.ts` and the four modules in `lib/skill-rules/evaluation/`;
- `tests/skills/evals/rule-strata.json`;
- the evaluation-harness tests in `skill-rules-evaluation.test.ts` and `skill-rules-evaluation-engine.test.ts`;
- `fixtures/run-skill-rules/eval-data`, `eval-anchors` and `eval-selection`;
- `package.json`'s `test:evals`, Vitest discovery and the README, all reconciled.

**Kept:**
- tests of local TypeScript code: the report formatter, gaps, runner adapters, cancellation, the repository's severity policy. Unit tests are colocated as `.test.ts`; integration tests go in `tests/integration/`.
- other runner fixtures, only where they test local code. Replace any invented skill-tree input with an unpacked real source.
- the engine's generic mechanics, which stay in sunstack-tools.

### D24g: the skills that teach proof change with it

`skill-rules` teaches the real-skill recipe, D24a–d. That covers its proof plan and checks, and the "labelled development and held-out cases" in SKILL.md at lines 103, 106, 115, 132 and 161:
- real sources pinned by Git;
- expectations beside the rule;
- the two runs, with outcome, locator and gaps reported apart;
- pressure tasks for the receiving agent;
- no invented skills as proof, and no committed copies.

`domain-decision-models` serves every decision-model consumer, not only skill rules. Its generic proof reference doesn't take on Git snapshots, expectation sidecars or pressure tasks. It changes only where it currently points skill-rule proof at excerpt cases, and there it points to `skill-rules`. Synthetic controls for engine mechanics stay allowed in sunstack-tools.

The 🐒 writer (Opus) writes this through `skill-creation`.

### D24h: Gate 3, redone

Gate 3 passes when:
- every judged rule's expectation run and current-skills run are in, on real text;
- every rule with no real must-fire case has its gap named, with the owner's call on whether it ships.

Pressure tasks (D24d) are not part of #188's gate. The owner moved them to the next stacked PR.

## Owner decisions

1. Adopt D24: Git-pinned real sources and no committed copies. Recommended: yes.
2. Do the pressure tasks (D24d) gate #188, or come in a follow-up PR? Recommended: gate #188, since the owner asked for pressure tests and nothing yet shows the receiving agent's behavior.
3. A rule with no real must-fire case after the search: ship it as a nudge with the narrowed claim, or hold it back? Recommended: decide per rule once the search is done.

## Not decided here

The plan and the Implementer (Sol high) decide how the helper is built, the field spelling within the contract D24b fixes, and the run commands. They must keep D24a–d. Before the plan, the Lead writes the `.expect.json` contract (its fields and meanings, and the consumer rules in D24b) into the program design. It isn't handed to the Implementer.

Also: `.expect.json` replaces the eval harness's case manifests. The pressure entry stays (D24d), so `package.json`'s `test:evals` is reconciled, not removed wholesale.
