# Requirements: rules as nudges

31 Oct 2026. Author: 🦁 Lead. Co-designed with the 🦉 Advisor (`codex-local/01a14e6a`), whose independent view is folded in where marked. Base: `3511b587`. Status: draft, not yet reviewed.

This set governs one change across the skill system and the sunstack engine. The skill runs live in this folder; the engine change gets its own design in `sunstack-tools` and answers to these requirements.

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

  A related location is a place the run collected. A place it didn't collect, such as another repository's instructions, is named as a direction to investigate. "The same nudge elsewhere" means the same rule gave it there, not that the text looks alike.
- **R2. A rule names its chunk and its edges.** Each rule declares the evidence its judgment needs:
  - its subject (a line, or a section's own text);
  - which relationships it follows, such as the enclosing section, its siblings and the files its own text loads, one hop and no further unless the rule says so;
  - whether a section includes its descendants;
  - what an omission or a cut means for its answer.

  The evidence module collects exactly that. Collected completeness (every field gathered) and model-visible completeness (what Jev actually saw after the size cap) are reported apart.
- **R3. A rule can nudge without deciding.** A standard that one chunk can't settle can still have a rule. Its nudge says what to check and where to read, and never claims a breach.
- **R4. Generalization and placement read every section.** Their chunks cover every section of a skill and its references, from the H1's introduction down, tables included, each with the files its own text loads.
- **R5. What wasn't read is shown, apart from what was decided.** As gaps, the agent sees:
  - per rule, the files under review inside the rule's declared denominator where the rule read nothing. A file outside it, such as a reference for a rule that reads only `SKILL.md` descriptions, is out of scope, not a gap;
  - each piece whose model view a cap cut;
  - every unresolved selection;
  - every incomplete part or skipped rule.

  Apart from the gaps, it sees what each gate decided was outside its standard, with the gate's answer, so a wrong exclusion can be challenged without treating every exclusion as unknown.
- **R5a. A nudge (`warn`) never fails our rule runs.** A `warn` fails a run only under `--max-warnings`, and this repository's runner sets none. There's no new level: the engine's advisory severity is the nudge.
  - An `uncertain` result keeps its own run status: decisions are owed to the agent, so the run isn't clean, and it isn't a failure either.
  - A run that is invalid, cancelled or incomplete says so, whatever its nudges.
  - An `error` finding blocks only when every step on its path was mechanical. A path that a judged gate let through never blocks on its own, even when its last step is a mechanical check.
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

## Open meaning, with provisional answers

These need the owner's word. Until then each provisional answer is labelled as such wherever it's used.

1. **What "related locations" covers.** *Provisional:*
   - the standard's own line;
   - the parts of the chunk the rule judged (the loaded file, the enclosing section);
   - other places in the files under review where the rule raised the same nudge.

   Places outside the checked repository, such as AgentStudio's own instructions, come in as text the nudge tells the agent to go and read, not as locations the engine finds.
2. **What shows the whole thing worked.** *Provisional:*
   - now: the rule run on the anchor cases gives the nudges in the success definition;
   - later, with evals: an agent receiving the nudge makes a justified placement call on line 17.
