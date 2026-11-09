# Running Rules

This reference owns one run of this plugin's rules on skill files from a step that checks skill text (a writer's self-check, a review's first rule pass, a release's prove step, an audit) and the reading of its report into that step's return. Expected input: the files or skill folders the step checks, the diff of the change when there is one, and the repository's own instructions. Return: whether the rules ran, or why not; where the report is kept; the run's status; the account for each nudge, with the places you read; each `uncertain` piece with your decision; the gaps, by kind; and the decided exclusions, apart from the gaps.

Every caller reads a result the same way. A rule has run only when the engine's report, from a run on the files as they stand now, says so; whatever the report doesn't show as decided is a gap, never a pass. A rule's finding is a nudge to you: it says what it noticed and where to read, and you decide.

## The rules and the command

The rules are `domain-skill-crafting`'s marked standards, each a decision model the engine runs over the pieces of skill text its standard governs, and the filters that decide which folders each rule reads: mechanical checks run locally, and questions go to the decision model, which is on for every run. The engine finds its own key; a run it can't make is refused, and the refusal is that run's result.

The command is plain `sunstack lint` with the config the repository's own instructions name: look in its agent instructions, such as `AGENTS.md`, and its contributor docs. No wrapper stands between lint and you. IF the repository names no config, or the command fails before the engine responds, return `rules: not run` with that reason: this run ends there, and the calling step goes on with that result. A rule's state comes only from that run, so don't build an engine request of your own, or supply, replace or remove a key or a model endpoint to get a run through.

## Run it

Run `sunstack lint --config <config>` on the files or skill folders the calling step names, or with `--since <revision>` when the step checks a change, and add `--report <file>` so every result can be read in full later. Its short numbered lines (each warning, unsure result and gap, then the filter summary) are a view of that report; when they and the report differ, the report wins. For the detail behind one line, run `sunstack lint show <file> <id>`: its route, answers, bars and the places to read, without rerunning anything.

## Read the report

MUST load `requests-and-reports.md` and return what the report's status and fields mean: the statuses with their exits; a finding's line, anchor, basis and related places; a result row's path, answers and cut fields; an `uncertain` piece; an incomplete part; and how "unread" is derived. IF the run's config has a kind with `select`, also load `evidence-kinds.md` and return what a selection candidate's outcome means for the pieces that depend on it.

Read the status first, then every list, because nudges don't move the status: a `clean` or `uncertain` run can carry many.

### Each nudge, and the account it's owed

For each finding:

1. **Open its line.** With `anchor: "resolved"`, the line is the one the rule's observation is about. With `anchor: "default"`, it's the first line of the field the rule judged, and the observation can sit anywhere in that piece: read the piece.
2. **Open its read-next places.** The standard's line comes first, then each `related` place: a span of a field the rule read, or the opening of a file the line loads. These are places the run read. A place the message only points to, such as "decide whether this belongs in the product's own repository", is one the run never opened: follow it as a question, and never cite it as something the rule saw.
3. **Note its basis.** `mechanical`: every step on its path was a check that established a fact. `judged`: a model's answer sits somewhere on the path, a gate included. A probability supports an answer; it doesn't make the text wrong.
4. **Decide the broader question first.** The nudge points at one property of one line; the question it raises is usually bigger, such as whether the line belongs in this skill at all. Making the rule's own property hold is the narrowest possible fix, and often not the answer.
5. **Record the account,** one of four, saying what you checked and where:
   - **fixed,** with what changed;
   - **kept,** with why the text is right as it is: "kept: the product is named only as a labelled example" is a full answer, and a nudge never needs a repair invented for it;
   - **routed** to the owner of the broader concern, such as a product's own repository, or whoever commissioned the change when the answer changes its plan;
   - **open,** naming the evidence it lacks, when none of the three can honestly be said yet.

   A nudge that went quiet after a local edit is not an account.

By severity: an `error` finding comes from a rule whose every path is mechanical, and is a breach that must be repaired before the change completes; your step's part in the repair is under "Repair, by what the calling step may do". A `warn` finding is the nudge itself. It never fails a run unless the command sets `--max-warnings`, so the status won't raise it for you.

Several rules can nudge about one line, each about its own property. Put them together: one rule's pass doesn't cancel another's nudge, and answering one rule's property doesn't answer another's.

Nudges that are the same case, such as one label line repeated across several files, may be decided together, each still named with its file and line.

### The rest of the results

| the report shows | what you do |
| --- | --- |
| an `uncertain` piece | yours to decide. Read the piece with the step it stopped at, its answers and its state, judge it against the standard yourself, and record the same account as for a nudge. It is never a pass. |
| a piece that passed | one property held: that rule's, on that piece. It says nothing else about the skill, and a pass on a line another rule nudges about closes nothing. Its `answers`, when its path read any, show why. |
| a piece counted `not_applicable`, or a folder excluded by its filter label | a decided exclusion: the rule's gate, or the filter's label, put the piece outside its standard. Its row keeps the gate's step and, when the gate read a model's answer, that answer. Read the exclusions on the files your step checks, and challenge one whose answer you'd decide otherwise. An exclusion is neither a pass nor a gap. |

### The gaps, by kind

What the run couldn't see comes in five kinds. Say "no gaps" only when all five are empty.

- **Unread:** a rule that judged no piece in a file inside its denominator, the files and pieces its design says it scans. Derive it from the rule's denominator, the report's per-file counts and its results. A file outside a rule's denominator, such as a reference for a rule that judges only `SKILL.md` descriptions, is out of scope, not a gap.
- **Cut:** a piece whose model view a size cap cut, or a loaded file whose opening was cut or didn't resolve: a row's `cut` fields, or an unsure result saying the text wasn't fully read. Its result was reached on less than the piece holds, so read the piece yourself before leaning on it.
- **Skipped folders:** each folder a filter ended `unsure` or incomplete for, listed with its route: no rule gated on that filter ran there. A folder excluded by its label is a decided exclusion, not a gap.
- **Unresolved:** each selection candidate that ended `uncertain` (the report gives its file, line, heading and yes probability) or `incomplete` (with its reason). Pieces that exist only through it, such as the steps of a workflow candidate, are absent: their rules never ran there, and an absent step is never a passed one. Pieces of a plain kind in its range, such as loads and branches, and pieces kept through another container still exist and keep their own results (a load or branch inside it carries no step context unless an enclosing step survives through another selected container). Take what was decided from the results, not from the candidate's range. Name the candidate, say whether you read it as the kind it was asked about, and leave the pieces that depend only on it unproven; your reading is not a verdict on them. A file with candidates and none selected has its own counts: when every candidate is `not_selected`, the decision model judged none of them to be that kind, which is information, not a gap; an `uncertain`, `incomplete` or not-asked candidate in the count is no negative judgment, and stays the gap its own row says.
- **Not run:** each incomplete part (an incomplete row keeps the path it walked, and any answers it read, before it stopped), each skipped rule, and a run whose status is `invalid` (a refusal for no key included), `cancelled` or `incomplete`, or a full-scope run with `nothing_selected`: the rules didn't all run, so the return says which didn't and why.

IF the run is refused at a rule's definition (a line in a marked standard's host, a rules file or the config), load `rule-entries.md` and return each refusal's cause and fix from its repair table, then decide whether the change caused it. It did only when the diff holds the edit that produces that cause, in the refusal's own file, in the file paired with it (a host and its rules file), or in the config that pairs them. A deleted marker that leaves its untouched rules entry orphaned is change-caused, because the producing edit is the deletion in the paired Markdown; an unrelated edit beside a definition that was already invalid is not, because nothing in the diff produces that cause. A change-caused refusal is repaired as the calling step may, below; every other refusal, and a refusal for no key, stays a gap with its cause.

## Repair, by what the calling step may do

Every caller reads each result the same way. What a step does about a nudge, an `error` finding, or a refusal its change caused follows the boundary that step already has:

- a step that writes or releases the change, such as a writer's self-check or a release's prove step, fixes what its boundary admits before the step completes, runs again on the fixed files, and routes the rest to whoever commissioned the change;
- a review, which doesn't edit what it reviews, records "raised" in place of "fixed": a candidate finding with its fix. An accepted candidate from an `error` blocks the ship decision until a correction fixes it;
- an audit, which stays read-only, records "flagged" in place of "fixed": the nudge it confirms becomes a signal on its skill, with the fix in that skill's recommendation, and one it can't settle stays open. It never invents a fix, and it checks no change, so every refusal it meets is a gap.

A finding is traced to the change when the change's diff made the text at its line; one the diff didn't touch is still read and returned, but its fix belongs to the step that owns that text.

**A commission built from a nudge carries the nudge.** It names the line, what the rule observed, the standard, the read-next places, any direction the message gives, and the broader question the nudge raises. It never asks to "make the rule pass": that asks for the narrowest fix and drops the question. The receiver answers with its own account.

## Worked: #187's line, at the act stage

`sunstack-dev`'s `ops-observability-stack/SKILL.md:17` (at `89dc638e`, before its fix): "IF the work is AgentStudio debug or beta, load `references/agentstudio-loop.md` and follow that loop."

**What happened.** A full run's `call.completeness` flagged the line: "A call doesn't say what to bring back." The fix commission assigned it as call completeness. The writer added the loop's return. The independent review found the return agreed with its sources and marked transfer complete. The next run passed the line on `call.completeness` and `branch.condition`. Then the owner pointed out that the loop belongs to AgentStudio, and the change was withdrawn. Every layer answered the narrow question it was handed, and nobody opened the loaded file to ask the bigger one.

**What the reading should have said, on that same run.** The one nudge already pointed at a load. Opening `references/agentstudio-loop.md` shows AgentStudio's own debug and beta loop, so the broader question is whether a generic skill should route into it at all:

```text
nudge:  call.completeness at plugins/sunstack-dev/skills/ops-observability-stack/SKILL.md:17 (warn, judged, anchor default): A call doesn't say what to bring back.; read: calls-and-placement.md (standard), references/agentstudio-loop.md (whole) -> open: the loaded file is AgentStudio's own loop; whether a generic skill routes into it is outside this rule, so returned to the commissioner before any return is added
```

**With the product-workflow rule,** the same line carries two nudges, each about its own property:

```text
nudge:  general-skill.overfits-to-product-workflow at plugins/sunstack-dev/skills/ops-observability-stack/SKILL.md:17 (warn, judged, anchor resolved): This section teaches one application's own procedure; read the line and the loaded file, then decide whether it belongs in that application's repository.; read: calls-and-placement.md (standard), references/agentstudio-loop.md (opening, then whole) -> routed: AgentStudio's debug and beta loop belongs in AgentStudio's repository; returned to the commissioner as a change to the plan
nudge:  call.completeness at the same line -> routed with the product-workflow nudge: if the line moves, its return moves with it
```

**And the commission** should have carried line 17, the observation (the call names no return), the standard, the read-next place (`agentstudio-loop.md`), and the broader question (what this call should bring back, and whether this skill should route into AgentStudio's loop at all), instead of "call completeness".

## Return

```text
rules:      ran | not run: <reason>
command:    <the sunstack lint command, with the config the repository's instructions name> | none named
report:     <the --report path>
status:     <status>, exit <code>; usage <requests>, <cost>
nudge:      <rule> at <file>:<line> (<severity>, <basis>, anchor <resolved | default>): <message>; read: <the places you opened> -> fixed: <what changed> (a review: raised: <the candidate and its fix>; an audit: flagged: <the signal>) | kept: <why the text is right> | routed: <to whom>: <the broader concern> | open: <the evidence it lacks>
uncertain:  <rule> at <file>:<line> (stopped at <step>): <your call: pass | finding | not applicable>, <one-line reason>; read: <places> -> fixed | kept | routed | open, as for a nudge
gap:        unread | cut | skipped folder | unresolved | not run: <the rule and file, the piece, the candidate, the part or the run>: <reason>; <what depends on it, left unproven>
excluded:   <count> pieces decided outside their standards; challenged: <rule> at <file>:<line>, gate <step> answered <answer>: <why you'd decide otherwise> | none challenged
```

Give one `nudge` line per finding, one `uncertain` line per piece (or per group of identical pieces, each named) and one `gap` line per gap, with the file and line from the report, so a reviewer can check your call at that anchor. `rules: ran` means lint returned a report; the status and the gap lines say how much of it decided.

Good and bad readings:

- Good: status `uncertain`, exit 5, with two warn nudges and three uncertain pieces. The return gives the status as it is; for each nudge, the places opened and the account: one fixed in the change's own text, one kept at its line with the reason; each uncertain piece with its call; one unread gap, a rule that read nothing in a reference inside its denominator; and "no gaps" never said.
- Bad: "rules pass" read from a `clean` status, while two warn nudges sat in the list unread.
- Bad: a nudge closed by making its rule's property hold, without opening its places: #187's added return.
- Bad: a direction in a message ("check the product's repository") cited as a place the rule read.
- Bad: "Gaps: none" written under three uncertain selections whose pieces stayed unproven.
- Bad: an exclusion counted as a gap, or a gap counted as an exclusion.
- Bad: an `uncertain` piece counted as a pass, or left out of the return.
- Bad: a sentence reworded until the judge said yes, when the sentence already met the standard.
- Bad: a review or an audit that edits a 301-character description to clear its `error`. The review raises it as a candidate that blocks the ship decision; the audit flags its skill.
- Bad: a run refused for a missing key, reported as clean, or pushed through with a stand-in key or endpoint.
- Bad: a full run over a misspelt folder that selected nothing, reported as clean.
- Bad: a run that exits 5 with every rule result decided, reported as "the steps all pass", when an uncertain workflow candidate kept its steps from being judged at all.
- Bad: a branch finding inside that same uncertain workflow dropped from the return as "never judged": a branch is a plain piece, and its result stands.
- Bad: a file whose one candidate was uncertain, or failed at the provider, reported as "the model found no workflow there".

Complete when: the command and its config were found, or `rules: not run` was returned with its reason; when it ran, the report was read, every nudge has its places read and its account at its line, every `uncertain` piece has your decision and reason, every gap is named by its kind with its reason and what depends on it, the decided exclusions are counted apart with any you challenge, and "no gaps" is said only when all five kinds are empty.
