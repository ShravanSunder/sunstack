# Rule Design

This reference owns step 4: turning a classified standard into a rule's design before any marker or entry is written, and designing a filter the same way. The design walks five things in order, because each decides what the next can ask: the judgment the nudge helps, the chunk, the tree, the nudge each route gives, and the proof.

**Expected input:** the marked standards from step 2, each with its `path:line`, outcome, evidence kind and gate; the cases step 3 gathered, owner rulings first; the repository's rules config and evidence project; and `domain-decision-models`, loaded.

**Return:** per marked rule or filter, the design its outcome and its nodes call for, with each field that doesn't apply marked `not applicable` and its reason.

**Complete when:** each gate below is stated as kept, with the line that shows it, or `not applicable` with its reason; a rule failing any gate goes back to step 2.

## The gates

- **The chunk is chosen for a reason:** its shape decides which pieces the standard governs, or its shape finds candidates and choosing among them takes reading.
- **The decisive content** is in the field or state the rule's nodes read, and an evidence print over real sources shows it there.
- **Each question's meaning draws the owner's line,** in the owner's terms, with the step-3 cases on each side of it named.
- **Each mechanical node** decides only what its predicate fully captures.
- **Each node that reads a model's answer** asks one proposition, and has its policy, with inequalities and routes.
- **Examples live in the `reference`, written from the standard.** None is a case, a near copy of one, or carries a case's answer; each question names the reference parts it reads.
- **A pass on a "no" about text** runs the `complete` check on that text first.
- **A route whose evidence can't settle its standard** ends in a nudge or `uncertain`, never `pass`.
- **Each finding route says what the agent receives:** what was observed, the standard, the severity, the line it points at, and where to read next.
- **The proof plan fits the outcome,** with its three observations kept apart.

## Design the rule

1. **Name the judgment, and read the standard's home and its cases.** Say which call the nudge helps and who makes it. For a placement rule: "does a skill meant for any repository route the agent into one product's own workflow?", made by the writer, the review lead or the Lead, who decides whether the text stays or the workflow moves. Then read what the standard's home teaches: its good and bad examples, its boundary cases, its exemptions. Those are the source the `reference` is written from. Read step 3's cases beside them, the owner's rulings first: they show where the owner draws the line, and the questions must draw it there. They stay in the case file.

2. **Choose the chunk.** A chunk is what one piece holds. State:
   - **the subject:** what one piece is, such as a load line, a step, or a section's own text;
   - **the denominator:** which files and pieces the rule scans; "unread" is read against it, so a rule that judges only `SKILL.md` descriptions doesn't count every reference as a gap;
   - **the context and edges:** what the questions need around the subject (the enclosing step's heading, the files the subject's own text loads), one hop, declared per rule; a field no question reads stays out, because every field repeats in every request;
   - **the fields** each node reads, and the decisive content each must hold;
   - **the budget:** the kind's size cap, and what a cut means for the answer.

   Then decide how the pieces are picked:
   - **Stay mechanical when the shape is the answer.** A description, a heading, a load line or a step is found exactly by its shape, and every match is a piece the standard governs. Asking a model which of them count adds cost and an error rate to a question nobody needed answered.
   - **Use a chunk tree when the shape finds candidates and whether a candidate is the right kind of chunk is a judgment.** The product-workflow standard governs sections that carry procedural material: steps, commands, files or state, whether the section tells the reader to use them, describes them in a worked example, lists them in a table row, or quotes them. Every section is easy to find; whether one carries that material takes reading. Judging every section of every general skill, as the held rule did, puts headings and plain rationale in front of a question about procedures, and every one of them is a request and a chance to be wrong.
   - **A selection's property covers every form its rule governs.** Its one question asks for all of it ("does this section contain procedural material, as an instruction, a worked example, a table row or a quotation?"), never for one form of it. "Does this section tell the reader to carry out steps or commands?" is one proposition, but it drops an owner-ruled warning: `practices-verification`'s `references/project-verification-selection.md` lines 39–42, a third-person worked example of one terminal app's verification setup, describes the procedure without telling the reader to do it. A selection's required inclusions (every piece a must-warn case needs) are desk-checked as carefully as its exclusions, and a narrowed selection is a coverage hypothesis until its run shows every required inclusion kept. Until then, keep the broader mechanical kind, with the rule's own gate.
   - **A gate inside the rule is not the same thing.** A gate ends one rule's piece `not_applicable` after the request; a chunk tree decides which pieces exist for every rule that reads the kind. Use a chunk tree when several rules share the same right kind of chunk, or the wrong pieces outnumber the right ones.

   On the shipped engine a chunk tree is a kind's `select`, which asks one Noul per candidate and carries no `reference`. When one question with its own wording picks the chunk, write it; it is desk-checked and reviewed on its candidates before its first run sends anything. When picking the chunk needs several questions, or examples, it waits for the engine to ship tree-shaped selection: the rule stays on its mechanical chunk with a gate, or stays unwritten, and is never bent around the gap.

   Then look at what the kind collects over files holding the intended good, bad and near-miss pieces, without sending anything: a prepared run (`--prepare`) shows each piece's fields and cuts as its request would carry them, and an evidence print does too, but only in a config with no `select` anywhere (`skill-rules-config` has the commands and what each shows). A field that can't hold the decisive content is an evidence gap, fixed in the evidence project before any question relies on it. A chunk the engine can't collect at all is an engine gap, fixed in the engine.

3. **Make the applicability decision.** Name the established fact that lets the rule's gate end a piece `not_applicable`, or state that every piece of the kind falls under the standard.
   - **A mechanical gate** fits when a field's text states the fact exactly, such as a description that opens with `Always`.
   - **A question gate** fits when telling the pieces apart takes reading, such as guidance against a quoted example.

   A gate asks what kind of piece this is, never whether it meets the standard. Its drop is a decision the agent can see, with the gate's answer, so a gate that drops too much shows up as a challengeable exclusion, not as silence.

4. **Write the nodes.**
   - **A mechanical node** names its predicate and field, its yes and no routes, and step 2's counterexample search.
   - **A question** names its type (Noul, Choice or Score, chosen by what the answer means), its proposition, the field it evaluates, and criteria that define that same proposition. The criteria are the operational definition of the owner's line: they say what puts a piece on each side of it, in the owner's terms, never the surface features that usually come with it. Name the step-3 cases on each side. Each exemption the standard states sits on the question that owns it.
   - **One property is one question,** however many kinds of material it covers: "commands, files, steps or state" are members of one property, not four questions. When the meaning draws the wrong line, change the meaning; splitting it into more questions carries the same wrong line into each.
   - **Coexisting requirements** are separate Nouls in one request, with a declared first-failure order.
   - **A worth-checking rule's questions** ask what the chunk shows, never whether the standard is broken.
   - **The reference** holds what several questions share: examples, each with its text, the right answer and why, and the definitions and boundaries between answers. Write each example from the standard: its home's own examples and exemptions, or a short one made up to illustrate them. Never take one from a case, never paraphrase a case into one, and never let one carry a case's answer. Each question names the parts it reads, such as `"context": ["body", "reference.examples"]`.
   - **The `complete` check** goes before any pass that rests on a "no" about a field: a cut field, or a loaded file whose opening was cut or didn't resolve, means absence wasn't shown, so that route ends `uncertain`.

   `domain-decision-models`' worked trees show each shape, good and bad.

5. **Draw the tree and fill the policy table.** Every route ends in a named step, `pass`, `not_applicable`, `uncertain`, or a finding at the field the standard governs. A route whose evidence can't settle its standard ends in a nudge or `uncertain`, never `pass`. Fill one row per node that reads a model's answer:

   ```text
   | node | statistic | yes when | no when | in between | precedence | severity | costs it rests on |
   ```

   A Noul reads P(yes), a Choice its top label's probability (with its label count), and a Score its normalized position. State each inequality, with or without its end. Name the costs of a false finding, a missed violation and a review. Every ask declares where its in-between answer goes. A first setting chosen before development results is provisional, then set on the development cases and recorded in the case file's `bars` with the cases that set it.

6. **Write each route's nudge.** For every route that ends in a finding, state:
   - **the message:** what the rule observed, in one sentence. The engine adds the standard's wording and line itself, so the message never restates the standard. A worth-checking route says what to check. A place the run never reads, such as another repository, goes in the message as a direction ("decide whether this belongs in the product's own repository"), never as something the rule saw.
   - **where it points:** the `at` field, and for a section-sized subject a locator whose task asks for the line the observation is about, with the same boundary as the questions.
   - **the severity:** `warn`, the nudge, for any path that reads a model's answer, a gate included; `error` only when every step on every path to the finding is mechanical. A judged nudge never fails a run.
   - **read next:** the entry's `related` fields: the loaded files for a placement nudge, the enclosing step for a branch nudge. When the finding's own place is all the agent needs, say so and why.

   Several rules can nudge about the same line, each about its own property. Keep each route's message about its own: the agent puts them together.

7. **Plan the proof,** in three observations kept apart:
   - **the collection:** an evidence print over the rule's full denominator, every intended piece found with its fields, every cut named;
   - **the tree:** for a deterministic rule, edge tests at its predicate's boundary, with no model. For a judged rule or filter, step 3's case file through `sunstack lint cases`: development first, then the frozen held-out set once, meeting the floors `cases-and-proof.md` names, with the current rule as the baseline when one exists;
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

## Worked design: product workflow, and why the held rule failed

The standard, `domain-skill-crafting/references/general-skill.md:8`: "A skill meant for any repository routes no step, branch or load into one product's own application workflow: its own procedures, run commands, state files or machine paths." Its home, `calls-and-placement.md`'s "A product's own workflow", draws the line: a tool or platform used through its supported interface is not that, and neither is domain vocabulary, the toolkit's own infrastructure, or a product named only as a labelled example.

The line it must catch: `sunstack-dev`'s `ops-observability-stack/SKILL.md:17`, "IF the work is AgentStudio debug or beta, load `references/agentstudio-loop.md` and follow that loop." The loaded file is AgentStudio's own debug and beta loop.

- **The judgment.** Does this general skill teach one application's own procedure? The writer, the review lead or the Lead decides whether the text stays (a labelled example, a public tool used as documented, the toolkit's own infrastructure) or the material moves to the application's repository. The rule gives the reason to look and the places to read; it can't see where the material should live, so it nudges.
- **The cases first.** The owner ruled nine kinds of section: an application's own command and a load of its own workflow file warn; a labelled example, the subject's own tool, a public tool used as documented, the toolkit's shared tools and an ordinary command stay quiet; an unlabelled worked example and a quoted real product mistake warn. Each ruling on a real section is a case in the case file. None is a reference example.
- **The chunk.** Each section's own text with its heading path and the openings of the files its own text loads, in folders the kind filter labels general, role or domain. The pieces the standard governs are the sections that carry procedural material in any form: an instruction, a worked example, a table row (`calls-and-placement.md`'s own example is a command in an allow-list row) or a quotation. A heading-only section or plain rationale carries none. A chunk tree can pick those sections with one Noul ("does this section contain procedural material, as an instruction, a worked example, a table row or a quotation?"), so the shipped `select` can carry it. Its coverage is untested, like the first question below: it holds only if a development run keeps every owner-ruled warning's section, the third-person worked example at `project-verification-selection.md` lines 39–42 and the quoted real mistakes among them. Until that run, the rule stays on the broader mechanical section kind, with its own gate. The held rule judged every section with no gate.
- **The reference.** Examples written from the standard's home: a step that reads one machine's application state file before tagging a release (warn); a release step that runs a hosting platform's own CLI as documented (quiet); a product named "for example" beside a generic step (quiet). None is a section any case points at.
- **Nodes.** Three Nouls and the line-finder in one request, each standing alone:
  1. `product_material`: "Does this section teach one application's own internal procedure, commands, files or state, as opposed to using a public tool through its documented interface?" The criteria put a public CLI's documented commands, a platform's supported fields and a language's toolchain on the no side, and an application's own task, loop or state file on the yes side, whatever the section's wording.
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

  A warning needs application material and one known trigger: material not all labelled, or a quoted real mistake. Both passes need the text fully read.
- **Policy.** Each Noul: P(yes) ≥ .7 is yes, ≤ .3 is no, between is the route drawn; starting bars, set on the development cases. A false nudge costs one read of the line and its load; a miss leaves an application's workflow in a general skill, which a review has let through before.
- **The nudge.** "This section teaches one application's own procedure; read the line and the loaded file, then decide whether it belongs in that application's repository." `at: "body"` with a line-finder that asks the same boundary; `warn`; `related: ["targets"]`, so the loaded file is listed to read.
- **Proof plan.** The collection over the whole denominator, showing line 17's section with `agentstudio-loop.md`'s opening in its `targets`. The tree on the case file: must-warn cases from before real fixes (line 17's section; `practices-cleanup`'s allow-list row that ran AgentStudio's own clean task), must-pass cases from the rulings and from every wrong warning an earlier version gave. The receiving agent's call: whether a writer given the line-17 nudge routes the loop to AgentStudio's repository instead of polishing the call's return. Unproven until a pressure task runs.

**What the held rule got wrong.** The evaluated entry, `general-skill.overfits-to-product-workflow` (K002), is held in `domain-skill-crafting/rules/held/general-skill.json` with the shape above but two differences, and both were taught by the skills it followed:
- its first question was "Does this section show concrete material that belongs to one product?". On the owner's five quiet public-tool rulings it answered yes at .83 to .93, because those sections do show commands and files; the line the owner draws is whose they are and how they're used. A quiet case and a real mistake got almost the same answers, so no bar could separate them;
- its `reference` held the owner's rulings as examples, each with its answer.

The desk check finds the first in a minute: read a quiet ruling, say the Demistify reference's documented `embed` commands, on its state against the first question, and the question says yes. The corrected first question above is a diagnosed correction, not a tested one: it holds only if the five quiet rulings pass on a fresh development run while the private-workflow cases still warn.

## Worked design: a filter, the kind of skill a folder holds

A filter isn't marked on a standard: it decides which folders a rule judges. It is designed the same way, with a label in place of the nudge.

- **The judgment.** What kind of skill does this folder hold? Rules for general skills read only folders labelled general, role or domain, so a product's own skill isn't judged as if it were meant for any repository.
- **The cases first.** The owner's rulings on real folders, and blind labels on the rest, each a filter case expecting a label. The rulings decide the boundaries: `decision-model-review` is domain; `practices-verification-maintenance` is repository-specific.
- **What it reads.** Each skill's description and the opening of its `SKILL.md` body, from just after the frontmatter through the end of the first H2 section. Not the folder name, which hints at the answer.
- **Labels.** `general`, `role`, `domain`, `tool_manual`, `repo_specific`; its tree ends in one of them, or `unsure`.
- **Reference.** The five definitions, written once so they can't overlap, with short examples written from them. A repository's own command-line tool or scripts count as its own procedure, not as a public tool.
- **Nodes.** Two Choices in one request, each among labels that can't both be true: `primary_work` (reusable guidance · operating a public tool · one repository's own procedure), then `reusable_guidance_kind` (general · role · domain), read only after reusable guidance.
- **Policy.** Each Choice reads its top label's probability among 3 labels, against a starting bar of .6 (a confidence of .40, not accuracy), set on development cases. A wrong label costs a whole folder: a product's skill judged as general draws false nudges on every section, and a general skill labelled a tool manual is never checked.
- **Proof plan.** Filter cases on real folders at fixed revisions, development and held-out; the held-out run must give no wrong label, and every case is scored or listed with why.

**What the held filter got wrong.** The evaluated filter, `kind`, is held in `domain-skill-crafting/rules/held/kind.filter.json`. Its tree was the one above. Its development run gave 53 right, 6 unsure and 6 wrong of 65, the wrong ones confident (.73 to .98):
- two of its examples were the real descriptions of `domain-decision-models` and Agent Studio's skill, with their labels, and both folders were scored. Both came back right, which shows nothing about folders it hadn't been shown;
- its definitions didn't draw the owner's lines. "Applying standards in a bounded task" is workflow under its definitions, so `decision-model-review` came back general; `practices-verification-maintenance` teaches a reusable practice whose product is one project's verification skill, so it came back general, against the owner's repository-specific ruling.

A desk check of the ruled folders on their description and opening finds both mismatches before the run. What it can't say alone is the cause: either the opening doesn't show what makes the folder repository-specific (an evidence fix, made first with the questions unchanged) or the definition is too narrow (a meaning fix). Neither changes the owner's label.
