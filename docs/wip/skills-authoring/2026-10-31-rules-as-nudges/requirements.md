# Requirements: rules as nudges

31 Oct 2026. Author: 🦁 Lead. Co-designed with the 🦉 Advisor (`codex-local/01a14e6a`), whose independent view is folded in where marked. Base: `3511b587`. Status: draft, not yet reviewed.

This set governs one change across the skill system and the sunstack engine. The skill runs live in this folder; the engine change gets its own design in `sunstack-tools` and answers to these requirements.

**Revision 2, 2 Nov 2026 07:17 EST, by the 🦁 Lead.** Revision 1 settled what a rule gives an agent: a nudge with its places, its gaps and the account the agent records. It was reviewed and accepted, and it stands. Revision 2 settles the rules themselves: which rules exist and why, which skills each one judges, how sure each must be, and how each is tested. It starts at [Revision 2: the rules themselves](#revision-2-the-rules-themselves) below; everything after that section is revision 1, unchanged unless a revision 2 decision names it.

## Revision 2: the rules themselves

### Why it reopened

The owner read every rule in plain words (owner page `rules-spec-2026-11-02.html`, in the owner's memory-logs under `scratch-root-01a1635f/owner-pages/`) and found the set doesn't hold together: most rules were picked because a model could judge them, not because they catch real mistakes, and the evals mostly check that rules stay quiet.

### The need, in the owner's words

All 2 Nov 2026, typed in the Lead's session or in the owner's review of the rules page.

- "none of the rkules seem kuseufl? kor how you set them kup so now i htink i n eed fkull escrpiton of each rule you feel confident in and hwy and what they do so i can decide oen by one"
- "Lets focus on skill creation skills and how to create rules tehre and what issues w2e fase dint eh past and what kind of skills are tehy for not all rules apply for all skiklls"
- "it seems liek we3 need to do better for evals now it doesnt look liek we did a good job"; earlier: "did we use descripition for prior bad descriptiosn to test as evasl? how di dyou create evals?"
- On thresholds: "1. yes then eveyr rkule shoud configure it no /" and "6. no override wierd stuff".
- On which skills a rule judges: "we have domain -* but we can no thsi frorm diescripiton too? descripton is filter"; on the product-loading rule: "shoukd valdiate if this is about a product or domain and ahve that as input no?"; on how: "2. yes this is ot done well go reserach and get advsiro help".
- On `guidance.positive`: "what to avoid shodku lbe caveats. it shoulb ebe by what to do in teh majority", and "5. this evicde problem not a problem with the rule the colelciotn of evice is nto right".
- On `rule.generalization`: "we need to redo teh filter and teh rule".
- On placement: "4. this is very confskuign and not clearn we shoud ltalk about it mroe we can make sure that we dont trigger on examples what are all the branches erhe what are teh scnarios mayb ethis isf follow ukp".
- On `question.names-field`: "ok iname fiels seem suelss".
- On the description rules for hidden skills, he picked "Yes, all of them, as today".
- On this revision: "redo the deisgn docs. we talk alter fix the stuff that is obviosu and nto confsuign we talk about all the rest. i think its clear what i want but i fm wrong we talk mroe".

### What revision 2 adds to the success definition

6. **Every rule exists because of a real mistake.** It names the failure it catches: a commit, a pull request or one of the owner's corrections. A written standard checked by count or pattern, such as description length, names that standard.
7. **A rule judges only the skills its standard is about.** A decision model reads each skill's description once and says what kind of skill it is; every rule that needs the kind takes that answer as input. A rule about general skills never judges a product's own skill.
8. **Each rule sets its own bars from its own cases.** There is no override of any kind, per skill or otherwise.
9. **A rule nudges no one until it passes real cases.** The text before a real fix makes it fire, the text after keeps it quiet, and the near misses it once got wrong stay quiet.
10. **A rule reads enough to judge its standard.** A standard about guidance as a whole ("mostly what to do") is judged on that guidance, not one sentence at a time.

### Evidence added in revision 2

- **E11. Wrong nudges came from what rules read and asked, never from their bars.** The 30 Oct run on 74 skills (main `f747b37e`): 300 nudges, 102 right, 195 wrong, 3 held. The wrong ones came from what the rule read (117), the question's wording (62) and which piece was selected (16); none from a threshold (`scratch-root-01a1635f/skill-rules/evidence-selection/step5/dispositions.md`).
- **E12. Placement's misses are product skills and examples.** The 1 Nov run of #188's six rules: placement made 11 nudges, 2 right (`practices-cleanup/SKILL.md:40`; `ops-observability-stack/references/agentstudio-loop.md:51-59`) and 9 wrong. 4 of the wrong ones were product skills' own text (Peekaboo 3, AgentStudio 1); 5 were worked or fictional examples or a domain's own tool (`verify-tui`, `verify-notes`, the fictional `ledger`, shadcn in `domain-typescript`, the worked tree quoting line 17). `rule.generalization` made 45 nudges, all wrong (`ai-tools.skills-rules-as-nudges/tmp/d24/accounts/result-accounts.json`).
- **E13. The evals mostly check silence.** 245 recorded cases in six `*.expect.json` files. Cases a rule must fire on: 0 to 7 per rule, and four judged rules have none. Every fire case is current text at a pin; none comes from a past mistake.
- **E14. Real past mistakes exist and went unused.** This repository's history has 125 commits that changed a skill's `description:` line, replacing 167 lines (`git log -G'^description:' -- 'plugins/*/skills/*/SKILL.md'`).
- **E15. Bars are per rule already, and untuned.** The engine requires every decision step to state its own bars (`sunstack-tools` `crates/sunstack-rules/src/rulebook_planning/decision_graph_contracts.rs:121-122` at `1a87fd7`, whose engine source equals release v0.6.0); every value in use is the starting 0.7/0.3, or 0.6 for a choice (`skill-rules/jev-advisor/threshold-inventory.tsv`).
- **E16. Why the rules exist today.** 3 of the 18 trace to real failures (#187, #166), 3 are written standards checked by count or pattern, 3 came from the owner's ask to check rule files, and 9 were picked because a model could judge them from one piece. The first six of those the Lead proposed and the owner approved on 26 Oct (the Project 1 spec; `2026-10-27-first-checked-rules/skill-design.md:27-38`, where line 38 records them as the owner's choice). The approval is recorded; their usefulness was never measured.
- **E17. The description can mislead.** In the 2x2 probe (D18b), a description that names products, given to placement as context, made product sections pass. A filter that reads descriptions has to handle the same case: `ops-observability-stack`'s description names AgentStudio, Agent VM and OpenClaw, and the skill is the toolkit's shared stack.

### Requirements added in revision 2

- **R11. A rule names the mistake it catches.** Each rule records the real failure it exists for (commit, pull request or owner correction), or the written standard it checks by count or pattern. A judged rule with neither stays held (R14) until the owner decides it, one by one.
- **R12. A rule judges only its kinds of skills.** Each skill's kind comes from one decision-model judgment of its description, made once per skill. Each rule declares the kinds it applies to and takes the judged kind as input; the run shows each skill's judged kind and how sure it was. A product's own skill is never judged by a rule about general skills. How the engine carries this is open (open meaning 3).
- **R13. Each rule's bars are its own.** Every decision step's bars are set from that rule's own cases and recorded beside the cases that set them. Nothing overrides them: not a skill, a kind or a config.
- **R14. Real cases come before any nudge.** Each rule's cases come from real history first: the text before a real fix must fire, the text after it must pass, and every nudge the rule got wrong on real skills becomes a must-pass case. Where the owner made the fix, the fix is the label; otherwise agents label blind, and their disagreements go to the owner. Some cases are held back and never tuned on. A rule nudges no one until it passes its cases; until then the run lists it as held.
- **R15. A rule reads the text its standard is about.** Its piece is sized to its standard: guidance judged as a whole, a step judged with its body, a reference judged with its outline. A wrong nudge caused by what the rule read is fixed in the evidence collection, not by bending the rule's question.
- **R16. Description standards apply to every skill.** Hidden skills included (the owner's pick). Descriptions are also the kind filter's input, so their quality carries every rule.
- **R17. The rule list changes as the owner decides.** `question.names-field` is dropped. Every other rule's keep, rework or drop is decided with the owner, rule by rule, against R11.

### Non-goals added in revision 2

- No threshold overrides of any kind ("no override wierd stuff").
- Placement's scenarios: they get their own conversation with the owner, maybe a follow-up. This revision states only that an example never triggers it.
- No new rules. A new rule starts from a failure under R11, in a later change.

### Open meaning in revision 2

3. **How the kind filter is built.** The 🦉 Advisor researches it (`scratch-root-01a1635f/skill-rules/rule-redesign/advisor-filter-research-commission.md`): how one per-skill answer reaches the rules on every piece, references included; how it composes with Jev; which kinds the rules need; how the description misleads (E17); how the filter is evaluated on the 78 skills.
4. **Placement's scenarios.** Every case where a skill names a product, and what the rule does in each, so it never fires on an example. Owner: "what are all the branches erhe what are teh scnarios".
5. **How many real cases a rule needs before it nudges.** Set per rule, once history mining shows what each rule has.
6. **The 9 rules with no failure behind them.** Keep and find their failure, rework, or retire: one by one, with the owner.

## The change

- **Class:** behavior-changing. It changes what a rule is for, so it changes how rules are designed, run, read, acted on and reviewed.
- **Runs:** `update` on each skill that designs, runs, reads or reviews rules (named in the skill design part), plus the rules folder in `domain-skill-crafting/rules/`, the runner in `tests/skills`, and an engine change in `sunstack-tools`.
- **The reusable behavior:** rules help agents reliably notice what is off in a skill, and where to read about it, whenever they write, review or accept skill text or a rule.

## The need, in the owner's words

All 31 Oct 2026, typed in this session unless marked.

- "a skill rule shodul rpvide a revwier with the ifnormation"
- "skill rules are soposed ot help models and reviwer know what has gone wrong for the skill reviwer skill rule is runnign is part of revieign skill. even the sunhstack litning tool which sir ealted to skill is about providign formation to a agentic reviwer and the direcitons of reateidnh locations. the current ssytem is fucked if its not we dont udneand teach otehr somethign si off"
- To the Advisor: "rules are in enses nduges to leads and reviwe agetsn or diffrent rkoesl"
- "we have rules that need to check json to amek srue its doen well thesrar eall nduges to agesnt"
- "for generalizaiton why whoudlnt the system chunk every secion or relatedion seciotns in a into a chunk send it to jev wthih ad eicon tre for generalizaiotn?"
- "for rules of laoding we would load that secion -> laoded skil then hcunk them for a specific rule, the whoel piotn of ast greand evice colector and jev in evencie modkule is to allow colelciotn of data?"
- "then feed taht for soemthing like generalizaiton?"
- "our system was to be generic enokugh that any evidence and rules shoudl have been able to go in, so why would we not able to extend it for ruels too"
- "park teh rest this is core to how the sytem shodul work fo rulres, dkill creastion and skill revie wrule reivw"
- "and it msut be extrely clear how to do this with the skill"

## The picture

```text
standard        a taught standard in domain-skill-crafting, with its marker
   │
rule            names the chunk it needs and the decision tree that judges it
   │
evidence        ast-grep patterns + the collector + Jev's selection gather the chunk:
   │            the section, the files it loads, neighbouring text, tables included
decision        Jev answers the tree's questions; code turns the answers into an outcome
   │
nudge           what the rule noticed, where, why it matters, how sure, and where else to read
   │
agent           the writer, the review lead, the Lead, the rule's writer, or the rule's reviewer:
                reads the nudge and its places, and decides
```

A rule is a nudge to whichever agent runs it. It does not decide for that agent. A decided breach is one kind of nudge; "worth checking, and here is where to read" is another.

## Success definition

In the owner's words: rules are "nudges to leads and reviwe agetsn or diffrent rkoesl", giving "the ifnormation" about "what has gone wrong" and "the direcitons of reateidnh locations", for skills and for the JSON rule files, and "it msut be extrely clear how to do this with the skill".

Observable, on the anchor cases below:

1. **The nudge reaches the agent.** A rule run on `ops-observability-stack/SKILL.md` gives the agent who runs it a nudge at line 17. It keeps two things apart:
   - **what the rule observed:** the line routes into AgentStudio's own debug loop, and the file it loads (`references/agentstudio-loop.md`) is that product's loop;
   - **the policy that makes this a concern:** the placement standard, with its own line.

   Its read-next places are the loaded file, plus any other place in the files under review where the same rule gave the same nudge. Where AgentStudio's own workflow should live is a direction to investigate, not a location the run has read. A product named as a labelled example gets no nudge.
2. **Nothing unread looks fine.** The same run tells the agent, as gaps:
   - which rules read nothing in the files under review;
   - which pieces' model views were cut;
   - which selections stayed unresolved.

   Separately, and not as gaps, it shows what each rule's gate decided was outside its standard, with the reason.
3. **The agent acts on the nudge, not the property.** A writer, review lead or Lead receiving a nudge reads its places and decides the broader question before changing the line. A change that only makes the rule's own property hold does not close the nudge.
4. **Rule files get nudges too.** A rule file gets a nudge to whoever wrote it when:
   - a question asks two things;
   - a question's criteria define a different proposition from its task;
   - a question names no field it judges.

   The check accepts all three today (the Advisor's admission probes on 0.5.0). An omitted in-between route isn't one of them: the engine already routes it to `uncertain` by default.
5. **The skills make it extremely clear.** An agent with no history of this design, following only the skill it reached:
   - can design a nudge rule end to end with `skill-rules` (name the standard, the chunk, the tree, the nudge, the proof);
   - can run the rules and read the nudges with the rule-running reference;
   - can act on a nudge as a writer (`skill-creation`), as a review lead (`skill-review`), and as a Lead commissioning a fix;
   - can review a rule as a nudge with `decision-model-review`.

   Each skill shows its path with a worked example, #187's line among them, and none of them needs another skill's internals to follow it.

   *Proof boundary:* reading the skills' source can show that each one has a self-contained procedure and worked example. It can't show that a fresh agent succeeds. That behavioral outcome stays a requirement, and stays unverified until the owner's evals, which come later.

## Who receives a nudge, and when

| Agent | When it runs the rules | Which skill teaches it |
| --- | --- | --- |
| the writer | self-check after writing skill text | `skill-creation`, the rule-running reference |
| the review lead | the first pass of an implementation review | `skill-review`, the rule-running reference |
| the Lead | before accepting a change, and when commissioning a fix from a nudge | the review's result; the commission carries the nudge |
| the rule's writer | after writing or changing a rule file | `skill-rules` |
| the rule's reviewer | reviewing a decision model | `decision-model-review` |
| the skill orchestrator | when it carries a skill change through proof and assesses the writer's calls | `skill-orchestrator` |
| the auditor | when it reads skills to decide what to create, update or skip, read-only | `skill-audit` |

## Evidence

Each signal is from 31 Oct 2026 unless marked.

1. **#187's chain** (checked at source by the Lead, traced by the Advisor):
   - `call.completeness` flagged `ops-observability-stack/SKILL.md:17` with "A call doesn't say what to bring back" (step-5 run report);
   - the Lead's commission assigned it as call completeness (`step5-fix-step-text-commission.md:21`);
   - the writer added the AgentStudio return (`cad5f490`);
   - the independent review found the return "agrees with its actual sources" and marked transfer complete (`step5/batch6-review.md:25-27`);
   - the after-run passed `call.completeness` and `branch.condition` on that line;
   - the owner raised that the content belongs to AgentStudio, and the change was withdrawn (`4eb1bd02`).

   Every layer answered the narrow question it was given.
2. **What a rule never read is silent.** In the step-5 run (74 skills, 3,942 results), `ops-observability-stack/SKILL.md` has 0 sentence, step and workflow pieces in `file_counts`, so `rule.generalization` never read it. The runner's printout shows no per-rule coverage (`tests/skills/lib/skill-rules/report.ts`, `formatLintReport`).
3. **Passes and gate drops are silent.** 1,713 passes and 1,020 not-applicable results reach the agent only as totals. The rule-running reference reads a pass as "it meets that rule's standard". Result rows keep no answers (their fields are name, marker, file, lines, outcome, step).
4. **A finding has one location.** The JSON finding carries one file and line; the SARIF output fills one `physicalLocation` and no `relatedLocations` (`crates/sunstack-lint/src/lint_reporting/sarif_format.rs`).
5. **Gaps get narrowed.** The writer's self-check listed three uncertain selections whose pieces stayed unproven, then wrote "Gaps: None" (`step5/batch6-self-check-dispositions.md:154-161`).
6. **No piece in today's rules reads table rows.** `practices-cleanup/SKILL.md:40` (`mise -C "$agentstudio_worktree" run clean-artifacts`) is in a table, and the `sentence` unit admits list items and paragraphs only (`evidence/rules/workflow-sections.yml`). This is a choice in our rules' evidence units, not an engine limit: the Advisor's section probe on the signed 0.5.0 engine collected that table in full.
7. **"Can't decide from one piece" means no rule.** `skill-rules`' classification sends a claim needing intent, history or outside evidence to "review-only", which gets no marker and no rule (`skill-rules/references/decision-matrix.md`, question 3).
8. **The engine already collects chunks.** Evidence fields can come from `enclosing`, `same_file`, `inside`, `next`/`previous`, and `target` with `resolve` and `as_kind`; the `load` kind already follows a load to its file, and Jev received `agentstudio-loop.md`'s opening on line 17 (report `evidence_seen` pair 2144). The engine's README states these sources.
9. **Lint's evidence projects are Markdown-only; the engine isn't.** Lint's project loading refuses other languages (`crates/sunstack-evidence/src/evidence_planning/evidence_project_loading.rs:184-188, 225-228`). A scratch lint config over the rule files was refused with "only Markdown evidence is supported". The native `sunstack exec prepare_evidence` did parse JSON: the Advisor's probe on 0.5.0 returned the whole `rule.generalization` K001 entry, its questions and graph, with exact spans. So lint can't check the rule files today, but the collection already exists.
10. **Only two severities exist:** `error` and `warn` (`crates/sunstack-lint/src/lint_reporting/formats.rs:29-37`). A warning counts toward the run's warning limit.

## Authoring basis

Both kinds apply:
- **observed failure:** #187's chain and the silent-coverage evidence, reproduced from retained records and reports rather than re-run;
- **user-directed intent:** the owner's words above.

The proof posture each run can honestly claim goes in the verification part.

## Requirements

- **R1. A rule result is a nudge.** It gives the agent:
  - the location;
  - what the rule observed, kept apart from the standard that makes it a concern (its wording and line);
  - whether a check established it or Jev's answers support it;
  - its severity: `error`, which blocks, or `warn`, the nudge (the engine called it `nudge` until the 18 Oct rename), and its outcome: a finding, or `uncertain` when the rule couldn't decide;
  - the related locations to read.

  "Where else to read" comes in three kinds, shown apart so the agent knows which it can trust. Take line 17:
  - **A place the rule read:** line 17 loads `references/agentstudio-loop.md`, and the rule read that file's opening, so the nudge links to it with a line number.
  - **A place the rule never read:** AgentStudio's own repository, where that workflow should live. The rule didn't open it, so the nudge can only say "check whether this belongs in AgentStudio's repo"; it's a pointer for the agent to follow, not a link.
  - **The same problem elsewhere:** if the same rule also nudged `practices-cleanup:40`, the nudge says so. It says this only when the rule really nudged there, never because other text merely looks similar.
- **R2. A rule names its chunk and its edges.** Each rule declares the evidence its judgment needs:
  - its subject (a line, or a section's own text);
  - which relationships it follows, such as the enclosing section, its siblings and the files its own text loads, one hop and no further unless the rule says so;
  - whether a section includes its descendants;
  - what an omission or a cut means for its answer.

  The evidence module collects exactly that. Collected completeness (every field gathered) and model-visible completeness (what Jev actually saw after the size cap) are reported apart.
- **R3. A rule can nudge without deciding.** A standard that one chunk can't settle can still have a rule. Its nudge says what to check and where to read, and never claims a breach.
- **R4. Generalization and placement leave nothing unread.** Generalization's chunks cover every section of a skill and its references, from the H1's introduction down, tables included, each with the files its own text loads. Placement judges every section's own text, every section with its loaded files' openings, and every skill description (D18c). The section units catch inline product commands, such as the AgentStudio rows in `practices-cleanup`; the section-with-loads unit caught line 17 in every probe condition; uncertain answers on a loaded file's own sections go to the agent.
- **R5. What wasn't read is shown, apart from what was decided.** As gaps, the agent sees:
  - per rule, the files under review inside the rule's declared denominator where the rule read nothing. A file outside it, such as a reference for a rule that reads only `SKILL.md` descriptions, is out of scope, not a gap;
  - each piece whose model view a cap cut;
  - every unresolved selection;
  - every incomplete part or skipped rule.

  Apart from the gaps, it sees what each gate decided was outside its standard, with the gate's answer, so a wrong exclusion can be challenged without treating every exclusion as unknown.
- **R5a. A nudge (`warn`) never fails our rule runs.** A `warn` fails a run only under `--max-warnings`, and this repository's runner sets none. There's no new level: the engine's advisory severity is the nudge.
  - An `uncertain` result keeps its own run status: decisions are owed to the agent, so the run isn't clean, and it isn't a failure either.
  - A run that is invalid, cancelled or incomplete says so, whatever its nudges.
  - Our rules give any path a model judged `warn`; `error` is for mechanical rules. The engine doesn't forbid an authored `error` on a judged path, since severity is set per rule (the owner's U26); it reports each result's basis so the agent can see a judged one. A run's exit code is not the ship decision: the review decides.
- **R5b. Every judged result keeps its answers,** passes and gate exclusions included, so the agent can see why. The rule's identity, the report's outcome, Jev's answers and the agent's final call stay four distinct things.
- **R6. A pass says one thing.** A pass tells the agent that one property held. No reader treats it as the skill meeting the standard as a whole.
- **R7. Nudges are read, not obeyed.** An agent acting on a nudge reads its places and decides the broader question. It records one of:
  - fixed;
  - kept, with the reason;
  - routed to the owner of the broader concern;
  - open, naming the evidence it lacks.

  A change that only makes the rule's own property hold doesn't close the nudge. A commission built from a nudge passes the nudge on, rather than "make it pass". Each rule stays narrow: a nudge about one property is integrated with other rules' nudges by the agent, and no single rule has to raise every concern about its line.
- **R8. Rule files get rules.** The JSON rule files are checked by rules whose nudges go to the rule's writer and the rule's reviewer.
- **R9. The engine stays generic.** Nothing in `sunstack-tools` knows about skills. Chunks, nudge kinds and related locations are declared by the caller's config and rules, and any engine gap is fixed in the engine, not worked around in the skills or rules.
- **R10. Each skill makes its path extremely clear.** Every skill in the change teaches its own part with a worked example and a completion check an agent can follow without this design's history.

## Non-goals

- **No pressure tests, trigger trials or behavior comparisons in this change.** The owner put them after evals: "we will rpessure test later afetrr we figure out evals".
- **Not settling whether a whole skill goes to Jev as one request.** Chunk size is decided per rule.
- **Not the app-specific move.** Moving AgentStudio, Agent VM and OpenClaw content to their own repos is a parked follow-up. This change only makes the rules nudge about it.
- **Not changing who decides.** Judged results never accept or block a change by themselves, as today. Mechanical `error` rules keep blocking.
- **Not the parked work.** The step-5 fix PRs and the earlier placement-rule commission are parked; this design supersedes the placement commission.
- **Not yet: rules in `AGENTS.md` files, and linting skills in other repositories.** The owner, 31 Oct: "eventaully we will want the agents.md to have rules and also skilsl in repos to force linting". The owner, on how: "agents.md would be aource like skills if tha tmake sense?". It does: an `AGENTS.md` plays both roles a skill plays. Its own instructions can carry markers and a rules file, so agents working in that repository get nudges from it; and it can be a checked file, judged by the same rules that check skills. This design must not block it: the engine stays generic, any marked Markdown can be a rulebook, and checked files, evidence kinds and denominators are declared by config. When a product repository's own skills are checked, the placement standard (which applies to skills meant for any repository) needs its denominator to declare which skills are generic; a product's own skills aren't judged against it.

## Open meaning

1. **What "related locations" covers.** *Confirmed by the owner, 31 Oct* ("yes this amke sense"), as R1 states it with line 17: links to places the rule read (the loaded file, the standard, the enclosing section), pointers to places it never read ("check whether this belongs in AgentStudio's repo"), and other places where the same rule gave the same nudge.
2. **What shows the whole thing worked.** *Provisional:*
   - now: the rule run on the anchor cases gives the nudges in the success definition;
   - later, with evals: an agent receiving the nudge makes a justified placement call on line 17.
