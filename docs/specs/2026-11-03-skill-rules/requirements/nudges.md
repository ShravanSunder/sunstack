# nudges: what an agent gets from a rule

**Reader:** any agent that runs rules or acts on their results. **Question:** what does a rule tell me, what can I trust, and what do I do with it? **Changes when:** what a nudge carries, or how agents act on it, changes. Revision 1 settled this capability on 31 Oct; it was reviewed and accepted, and it stands here unchanged in meaning.

A rule is a nudge to whichever agent runs it. It doesn't decide for that agent. It says where it looked, what it noticed, which standard makes that a concern, how sure it is, where else to read, and what it couldn't see. The agent reads those places and makes the broader call.

**The anchor case.** On `ops-observability-stack/SKILL.md:17`, a rule run gives the agent a nudge: the line routes into AgentStudio's own debug loop, and the file it loads (`references/agentstudio-loop.md`) is that product's loop. The standard that makes this a concern is the general-skill standard, quoted with its line. Read next: the loaded file, and any other place where the same rule gave the same nudge. Where AgentStudio's workflow should live is a pointer to investigate, not a place the rule read.

| Agent | When it runs the rules | Which skill teaches it |
| --- | --- | --- |
| the writer | self-check after writing skill text | `skill-creation`, the rule-running reference |
| the review lead | the first pass of an implementation review | `skill-review`, the rule-running reference |
| the Lead | before accepting a change, and when commissioning a fix from a nudge | the review's result; the commission carries the nudge |
| the rule's writer | after writing or changing a rule file | `skill-rules` |
| the rule's reviewer | reviewing a decision model | `decision-model-review` |
| the skill orchestrator | carrying a skill change through proof | `skill-orchestrator` |
| the auditor | reading skills to decide what to create, update or skip | `skill-audit` |

### U1: A rule result is a nudge

`kind: requirement · capability: nudges · status: authorized · was: R1`

It gives the agent the location; what the rule observed, kept apart from the standard that makes it a concern (its wording and line); whether a check established it or a model's answers support it; its severity (`error` blocks, `warn` is the nudge) and outcome (a finding, or `uncertain` when the rule couldn't decide); and where else to read, in three kinds shown apart: a place the rule read (a link with a line), a place it never read (a pointer to follow, not a link), and the same rule's same nudge elsewhere (only where it really nudged).

### U2: A rule can nudge without deciding

`kind: requirement · capability: nudges · status: authorized · was: R3`

A standard that one chunk can't settle can still have a rule. Its nudge says what to check and where to read, and never claims a breach.

### U3: What was not read is shown, apart from what was decided

`kind: requirement · capability: nudges · also serves: what-rules-read · status: authorized · was: R5, R5b`

As gaps, the agent sees: per rule, the files inside its declared scope where it read nothing; each piece whose model view was cut; every unresolved selection; every incomplete part or skipped rule. Apart from the gaps, it sees what each gate decided was outside its standard, with the gate's answer. Every judged result keeps its answers, passes and gate exclusions included; the rule, the report's outcome, the model's answers and the agent's final call stay four distinct things.

### U4: A nudge never fails a run

`kind: requirement · capability: nudges · status: authorized · was: R5a`

A `warn` fails a run only under `--max-warnings`, and this repository's runner sets none. `uncertain` keeps its own run status: not clean, not failed. A run that is invalid, cancelled or incomplete says so, whatever its nudges. Our rules give `warn` to any path a model judged; `error` is for mechanical rules. A run's exit code is not the ship decision; the review decides.

### U5: A pass says one thing

`kind: requirement · capability: nudges · status: authorized · was: R6`

A pass tells the agent that one property held. No reader treats it as the skill meeting the standard as a whole.

### U6: Nudges are read, not obeyed

`kind: requirement · capability: nudges · status: authorized · was: R7`

An agent acting on a nudge reads its places, decides the broader question, and records one of: fixed; kept, with the reason; routed to the owner of the broader concern; open, naming the evidence it lacks. A change that only makes the rule's own property hold doesn't close the nudge. A commission built from a nudge passes the nudge on, not "make it pass".

### U7: Each skill makes its part of the path clear

`kind: requirement · capability: nudges · also serves: rule-making · status: authorized · was: R10`

Every skill in the change teaches its own part with a worked example (#187's line among them) and a completion check an agent can follow without this design's history. When a rule question goes to the owner, the agent explains the rule's real behavior on one simple and one harder real case before asking.

<details>
<summary>Authority and evidence for nudges</summary>

- Owner, 31 Oct: "a skill rule shodul rpvide a revwier with the ifnormation"; "rules are in enses nduges to leads and reviwe agetsn or diffrent rkoesl"; "and it msut be extrely clear how to do this with the skill". Related locations confirmed 31 Oct: "yes this amke sense".
- U7's last sentence: inventory SM050, SM053, SM054 ("not great i ahv eno idea how you gettign data what the rules are"; "make prsentation html spec fo rme on rukles i can t desicd elike this").
- Evidence notes (were E1–E10): #187's chain, where every layer answered only the narrow question it was given (`cad5f490`, withdrawn `4eb1bd02`); silent coverage (74 skills, 3,942 results, `ops-observability-stack` never read by `general-skill.taught-rule-overfits-to-one-project`); 1,713 passes and 1,020 not-applicable results seen only as totals; one location per finding (SARIF fills no `relatedLocations`); the writer's "Gaps: None" over three unproven selections; only `error` and `warn` exist (`crates/sunstack-lint/src/lint_reporting/formats.rs:29-37`).
- Proof boundary carried from revision 1: reading the skills can show each has a self-contained procedure and worked example; it can't show a fresh agent succeeds. That stays unverified until the owner's evals.

</details>
