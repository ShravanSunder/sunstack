# Rule Design

This reference owns step 3: turning a classified standard into a rule's design before any marker or entry is written, and designing a filter the same way. The design walks five things in order: the judgment the nudge helps, the chunk, the tree, the nudge each route gives, and the proof.

**Expected input:** the marked standards from step 2, each with its `path:line`, outcome, evidence kind and gate. Also the repository's rules config and evidence project, and `domain-decision-models`, loaded.

**Return:** per marked rule, the design its outcome and its nodes call for, with each field that doesn't apply marked `not applicable` and its reason.

**Complete when:** each gate below is stated as kept, with the line that shows it, or `not applicable` with its reason; a rule failing any gate is returned to step 2.

## The gates

- **The decisive content** is in the field or state the rule's nodes read, and an evidence print over real sources shows it there.
- **Each mechanical node** decides only what its predicate fully captures.
- **Each node that reads a model's answer** asks one proposition that passes the standard's own bad examples, and has its policy, with inequalities and routes.
- **Examples and definitions live in the `reference`,** written once, and each question names the fields and reference parts it reads; its wording says what its answers mean.
- **A pass on a "no" about text** runs the `complete` check on that text first.
- **A route whose evidence can't settle its standard** ends in a nudge or `uncertain`, never `pass`.
- **Each finding route says what the agent receives:** what was observed, the standard, the severity, the line it points at, and where to read next.
- **The proof plan fits the outcome,** with its three observations kept apart.

## Design the rule

1. **Name the judgment, and read the standard's own cases.** Say which call the nudge helps and who makes it. For a placement rule: "does a skill meant for any repository route the agent into one product's own workflow?", made by the writer, the review lead or the Lead, who decides whether the text stays or the workflow moves. Then collect the good and bad examples the standard's home gives, its boundary cases, its exemptions and its accepted judgments. They are the negative controls every question must pass, the first worked examples for the `reference`, and the first cases, each at the real revision and lines it comes from.
2. **Design the chunk.** State five things:
   - **the subject:** what one piece is, such as a load line, a step, or a section's own text;
   - **the denominator:** which files and which pieces the rule scans. "Unread" is read against it, so a rule that judges only `SKILL.md` descriptions doesn't count every reference as a gap;
   - **the context and edges:** what the questions need around the subject, such as the enclosing step's heading, the parent section's heading, or the files the subject's own text loads. Edges are one hop and declared per rule. A field the questions don't read stays out: every field repeats in every request;
   - **the fields** each node reads, and the decisive content each must hold: the attached block, the antecedent, the loaded file's opening;
   - **the budget:** the kind's size cap, and what a cut means for the answer. A judgment made on a cut view was made on less than was collected.

   Then print the evidence for the kind over files holding the intended good, bad and near-miss pieces. An evidence print over a selected kind, or a kind within one, sends model requests, so whoever holds the grant runs it. Read each intended piece's fields and its cut marks (`check-and-reports.md` names them). A field that can't hold the decisive content is an evidence gap: name it, and fix the evidence project before any question relies on it. A chunk the engine can't collect at all is an engine gap, fixed in the engine, never worked around in the rule.
3. **Make the applicability decision.** Name the established fact that lets the rule's gate end a piece `not_applicable`, or state that every piece of the kind falls under the standard.
   - **A mechanical gate** fits when a field's text states the fact exactly, such as a description that opens with `Always`.
   - **A question gate** fits when telling the pieces apart takes reading, such as guidance against a quoted example.

   A gate asks what kind of piece this is, never whether it meets the standard. Its drop is a decision the agent can see, with the gate's answer, so a gate that drops too much shows up as a challengeable exclusion, not as silence.
4. **Write the nodes.**
   - **A mechanical node** names its predicate and field, its yes and no routes, and step 2's counterexample search.
   - **A question** names its type (Noul, Choice or Score, chosen by what the answer means), its proposition, the field it evaluates, and criteria that define that same proposition with the standard's boundary cases. Each exemption the standard states sits on the question that owns it, not copied into every question.
   - **Coexisting requirements** are separate Nouls in one request, with a declared first-failure order.
   - **A worth-checking rule's questions** ask what the chunk shows, never whether the standard is broken.
   - **The reference** holds what several questions share: worked examples, each with its text, the right answer and why; the definitions and boundaries between answers. Each question names the parts it reads, such as `"context": ["body", "reference.examples"]`. An example comes from the standard's home or the owner's rulings, never from the piece being judged.
   - **The `complete` check** (`mechanical_check: {tool: "complete", field: "<field>"}`) goes before any pass that rests on a "no" about a field: a cut field, or a loaded file whose opening was cut or didn't resolve, means absence wasn't shown, so that route ends `uncertain`.

   `domain-decision-models`' worked trees show each shape, good and bad.
5. **Draw the tree and fill the policy table.** Every route ends in a named step, `pass`, `not_applicable`, `uncertain`, or a finding at the field the standard governs. A route whose evidence can't settle its standard ends in a nudge or `uncertain`, never `pass`. Fill one row per node that reads a model's answer:

   ```text
   | node | statistic | yes when | no when | in between | precedence | severity | costs it rests on |
   ```

   A Noul reads P(yes), a Choice its top label's probability (with its label count), and a Score its normalized position. State each inequality, with or without its end. `severity` is the severity of each finding the node can reach. Name the costs of a false finding, a missed violation and a review. Every ask declares where its in-between answer goes; the engine refuses one that doesn't. A first setting chosen before development results is named as provisional, then set on the development cases and recorded in the case file's `bars` with the cases that set it.
6. **Write each route's nudge.** For every route that ends in a finding, state:
   - **the message:** what the rule observed, in one sentence. The engine adds the standard's wording and line itself, so the message never restates the standard. A worth-checking route says what to check. A place the run never reads, such as another repository, goes in the message as a direction ("decide whether this belongs in the product's own repository"), never as something the rule saw.
   - **where it points:** the `at` field. A finding points at that field's first line by default. For a section-sized subject, add a locator: a Choice over the `at` field's lines inside the piece, sent with the piece's one request, whose selected line becomes the finding's line when its probability reaches the locator's bar. A locator that isn't sent, or isn't sure enough, leaves the default line, and the report says so.
   - **the severity:** `warn`, the nudge, for any path that reads a model's answer, a gate included; `error` only when every step on every path to the finding is mechanical. The engine keeps the severity you author and reports each result's basis beside it; this split is our rules' policy.
   - **read next:** the entry's `related` fields. Every finding lists the standard's line first, then each span of each related field, and each loaded file whose opening the run read. Name the fields the agent must open to decide: the loaded files for a placement nudge, the enclosing step for a branch nudge. The list belongs to the entry, so every finding route of the rule shares it. When the finding's own place is all the agent needs, say so and why, and the standard's line stands alone.

   Several rules can nudge about the same line, each about its own property. Keep each route's message about its own: the agent puts them together.
7. **Plan the proof,** in three observations kept apart:
   - **the collection:** an evidence print over the rule's full denominator, every intended piece found with its fields, every cut named;
   - **the tree:** for a deterministic rule, edge tests at its predicate's boundary, with no model. For a judged rule or filter, a case file run through `sunstack lint cases`: each case is real skill text at a fixed revision and lines (a folder, for a filter), expecting `warn` or `pass` (a label, for a filter), labelled from the owner's fixes or by agents labelling blind, never from the rule. A development set sets the bars; a held-out set, from other sources, runs once after the freeze. The cases meet the floors `SKILL.md` step 7 names, with the counter-examples the standard's own exemptions name among the must-pass cases. Its baseline is the current rule for the standard, run on the same cases, when one exists;
   - **the receiving agent's call:** whether an agent given the nudge makes a justified call. That is a pressure task on the same real source; the design names it as unproven until one has run.

## Worked design: a step's completion criterion

The standard (`domain-skill-crafting/references/steering.md`): "Each completion criterion lets the agent tell done from not done, and demands the legwork the step needs."

**What the old design got wrong.** The old rule gated on a literal `Completion:` paragraph and ended every step without one in a finding, before any question was asked. That made a format the verdict. Steps whose done state was phrased another way became findings, and authors appended labels to satisfy the check. No step needs a label: the model judges the step's own words.

**The design:**

- **The judgment.** Does this step let whoever follows it tell done from not done? The writer decides whether to sharpen the step's end.
- **The chunk.** The `step` kind: its `heading`, and its `body`, which must hold the step's whole text through its last paragraph; confirm that in the evidence print. One hop: nothing outside the step.
- **Gate.** None: every step falls under the standard.
- **Nodes.** Two Nouls, in one request, in this first-failure order:
  1. `names_end`: "Does the step's text say what must be true when the step is done?"
  2. `requires_result`: "Does the step's stated end require the result the step itself says to produce?" This is bounded by the step's own stated work. "Glance at the test output, then move on" passes when the step asks only for a glance. Requiring an investigation the step never names imports another standard.
- **Policy.** P(yes) ≥ .7 is yes, ≤ .3 is no, both ends inclusive, and between is `uncertain`, for the agent running the check to decide. These bars are a first setting, provisional until the development cases set them. Both findings are `warn`: both paths read a model's answer. A false finding costs an author a needless rewrite, and pushes toward padding the owner rejected. A miss lets an empty criterion through. A review costs the checker's time.
- **The nudge.** Each finding points at `body`, whose first line opens the step, and needs no locator: a step is small enough to read whole. No `related` field: the step is the finding's own place, and the standard's line is the only other thing the agent needs.
- **Proof plan.** The evidence print over every selected step. Development and held-out cases on real steps at fixed revisions, labelled independently, including:
  - a step whose whole job is to report an existing result;
  - a step that asks only for a glance;
  - a full return stated without any label;
  - "Understanding reached";
  - zero findings after a prescribed inspection;
  - a bare output list with no inspection required.

  The baseline is the old label-gated rule, on the same cases. The writer's call on a finding waits for a pressure task.

```json
"K001": {
  "name": "completion.criterion",
  "evidence": "step",
  "questions": {
    "names_end": { "type": "noul", "instructions": { "check": "body", "context": "heading", "task": "Does the step's text say what must be true when the step is done?" }, "criteria": { "true": "The text states an end an agent could check, in any wording.", "false": "The text says what to do but never what being done looks like." } },
    "requires_result": { "type": "noul", "instructions": { "check": "body", "context": "heading", "task": "Does the step's stated end require the result the step itself says to produce?" }, "criteria": { "true": "Reaching the stated end takes producing the result the step names.", "false": "The stated end can be reached without producing the result the step names." } }
  },
  "decision": {
    "start": "names_end",
    "steps": {
      "names_end": { "ask": "names_end", "yes_at_or_above": 0.7, "no_at_or_below": 0.3, "yes": "requires_result", "no": { "finding": "Step doesn't say what done looks like.", "at": "body" }, "uncertain": "uncertain" },
      "requires_result": { "ask": "requires_result", "yes_at_or_above": 0.7, "no_at_or_below": 0.3, "yes": "pass", "no": { "finding": "Step's end can be reached without the result it names.", "at": "body" }, "uncertain": "uncertain" }
    }
  },
  "severity": "warn"
}
```

Both questions go in the entry's one request, and the walk reads `requires_result` only when `names_end` is yes. This is a worked design, not a delivered or measured rule; its accuracy is unproven until its case runs on real steps are in.

## Worked design: product workflow, on #187's line

This is the author's stage of the one example every skill in this change teaches. `decision-matrix.md` classified the standard as worth checking; here it becomes a design. `domain-decision-models`' worked trees draw the same tree with its departures.

The line it must catch: `sunstack-dev`'s `ops-observability-stack/SKILL.md:17`, in the skill's introduction: "IF the work is AgentStudio debug or beta, load `references/agentstudio-loop.md` and follow that loop." In #187 no rule asked this of line 17: the one that read it judged its call's return, and passed the line once a return was added.

- **The judgment.** Does this general skill carry one product's own material? The writer, the review lead or the Lead decides: keep the text (a labelled example, a tool used as meant, the toolkit's own infrastructure), or move the material to the product's repository. The rule gives the reason to look and the places to read; it can't see where the material should live.
- **The chunk.**
  - **Subject:** each section's own text, its introduction and tables included, without its child sections' text. A section that loads nothing is a piece too: an inline command is as much product material as a load.
  - **Denominator:** every section of every skill the kind filter labels general, role or domain. The rule's `only_when` names those labels, so a product's own skill, labelled tool manual or repository-specific, is excluded, not judged.
  - **Context and edges:** the heading path, and the opening of each file or skill the section's own text loads. One hop: a loaded file's own loads aren't followed.
  - **Fields:** `heading`, `headings`, `body` and `targets`. No question names `where`, so the file's name and location stay out of the request.
  - **Not context:** the skill's description, which has its own standard and rule.
- **Gate.** The kind filter's label, applied before any question: the rule runs only where the label is general, role or domain.
- **Reference.** The owner's rulings, as examples, each with its text, its answer and why: a product's own command (warn); a load of a product's own workflow file (warn); a product named as a labelled example (pass); a worked example that isn't labelled (warn); a quoted real product mistake (warn); the subject's own tool, a tool used as meant, the toolkit's shared tools and an ordinary command (pass). All three questions read them.
- **Nodes.** Three Nouls and the line-finder in one request, each standing alone:
  1. `product_material`: "Does this section show concrete material that belongs to one product?"
  2. `all_labelled_examples`: "Is all of that material shown only as labelled examples?"
  3. `quotes_real_product_mistake`: "Does the section quote a real product's own mistake?"
- **Tree.**

  ```text
  product_material? → no      → [complete: body and targets fully read?] → yes: pass · no: uncertain
                    → between → uncertain
                    → yes     → quotes_real_product_mistake? → yes     → nudge
                                                             → no      → all_labelled_examples? → no: nudge · between: uncertain
                                                                                                → yes → [complete?] → yes: pass · no: uncertain
                                                             → between → all_labelled_examples? → no: nudge · otherwise: uncertain
  ```

  A warning needs product material and one known trigger: material not all labelled, or a quoted real mistake. An unknown on one trigger doesn't hide a known yes on the other. Both passes need the text fully read.
- **Policy.**

  ```text
  | node                        | statistic | yes when | no when | in between | precedence | severity | costs it rests on |
  | product_material            | P(yes)    | ≥ .7     | ≤ .3    | uncertain  | first      | none     | a false nudge costs one read of the line and a load; a miss leaves one product's material in a general skill, which #187 showed survives a review |
  | quotes_real_product_mistake | P(yes)    | ≥ .7     | ≤ .3    | ask all_labelled_examples; only its known no warns | second | warn | a false nudge on a quoted generic mistake costs a read and a "kept" |
  | all_labelled_examples       | P(yes)    | ≥ .7     | ≤ .3    | uncertain  | third      | warn     | a false nudge on a labelled example costs a read and a "kept"; a miss is as above |
  ```

  These are starting bars, set on the development cases and recorded in the case file's `bars` before the held-out run.
- **The nudge.**
  - **Message:** "This section shows one product's own material; read the line and the loaded file, then decide whether it belongs in that product's repository." The repository is a direction: the run never reads it.
  - **Where:** `at: "body"`, with the line-finder, a locator whose task asks which line shows that material, with the same boundary as the questions, so it doesn't pick a labelled example or a tool used as meant. Line 17's section has generic loads on lines 14 to 16 before it, so a pattern can't pick the line. Below the locator's bar, the warning stays at the body's first line, marked default.
  - **Severity:** `warn`: every path to it reads a model's answer.
  - **Read next:** `related: ["targets"]`, so the warning lists each loaded file whose opening the run read, `agentstudio-loop.md` among them.
- **Proof plan.**
  - **The collection:** an evidence print over the whole denominator, showing line 17's section with `agentstudio-loop.md`'s opening in its `targets`, and every cut named.
  - **The tree:** a case file for the rule. Must-warn cases at revisions from before real fixes: line 17's section, and `practices-cleanup/SKILL.md`'s allow-list row that ran AgentStudio's own clean task, a second family. Must-pass cases from the exemptions and the owner's rulings: a product named only as a labelled example, the toolkit's own observability queries, a platform's supported command, and every wrong warning an earlier version of the rule gave. Development first, then the frozen held-out set once, with the previous version of the rule as the baseline on the same cases.
  - **The receiving agent's call:** whether a writer given the line-17 nudge reads the loop and routes it to AgentStudio's repository, instead of polishing the call's return as #187 did. That is a pressure task, unproven until one has run.

The delivered entry is `general-skill.overfits-to-product-workflow` in `domain-skill-crafting/rules/general-skill.rules.json`; read it there rather than from a copy. Its question names and wording may differ from this page's; the shape is the design.

## Worked design: a filter, the kind of skill a folder holds

A filter isn't marked on a standard: it decides which folders a rule judges. It is designed the same way, with a label in place of the nudge.

- **The judgment.** What kind of skill does this folder hold? Rules that govern general skills read only folders labelled general, role or domain, so a product's own skill isn't judged as if it were meant for any repository.
- **What it reads.** Each skill's description and the opening of its `SKILL.md` body: from just after the frontmatter through the end of the first H2 section, so the H1 introduction, if any, and the whole first `##` section, where a skill says what it is for and how it starts. Not the folder name, which hints at the answer: a filter never sends its folder's location.
- **Labels.** `general`, `role`, `domain`, `tool_manual`, `repo_specific`, declared on the filter. Its tree ends in one of them, or `unsure`.
- **Reference.** The five definitions, written once so they can't overlap, with worked examples. One boundary carries most of the weight: a repository's own command-line tool or scripts count as its own procedure, not as a public tool.
- **Nodes.** Two Choices in one request, each among labels that can't both be true:
  1. `primary_work`: reusable guidance · operating a public tool · one repository's own procedure.
  2. `reusable_guidance_kind`: general · role · domain.
- **Tree.**

  ```text
  primary_work? → reusable guidance        → reusable_guidance_kind? → general · role · domain → that label
                                                                    → below its bar → unsure
                → operating a public tool  → tool_manual
                → one repository's own     → repo_specific
                → below its bar            → unsure
  ```

  `reusable_guidance_kind` is asked in the same request and read only after reusable guidance. Labels come only from tree endings: "reusable guidance" is a question's option, never a filter label.
- **Policy.** Each Choice reads its top label's probability among 3 labels, against a starting bar of .6 (a confidence of .40, not accuracy), set on development cases. An unsure folder is skipped for every gated rule and listed with its route. A wrong label costs a whole folder: a product's skill judged as general draws false nudges on every section, and a general skill labelled a tool manual is never checked at all.
- **Proof plan.** Filter cases, each a real folder at a fixed revision expecting a label, in development and held-out sets, labelled from the owner's rulings or by blind agents. The held-out run must give no wrong label; every case is scored right, wrong label, unsure or incomplete, or listed with why.

The delivered filter is `kind` in the config's `filters`; read it there.
