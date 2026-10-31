# Rule Design

This reference owns step 3: turning a classified standard into a rule's design before any marker or entry is written. The design walks five things in order: the judgment the nudge helps, the chunk, the tree, the nudge each route gives, and the proof.

**Expected input:** the marked standards from step 2, each with its `path:line`, outcome, evidence kind and gate. Also the repository's rules config and evidence project, and `domain-decision-models`, loaded.

**Return:** per marked rule, the design its outcome and its nodes call for, with each field that doesn't apply marked `not applicable` and its reason.

**Complete when:** each gate below is stated as kept, with the line that shows it, or `not applicable` with its reason; a rule failing any gate is returned to step 2.

## The gates

- **The decisive content** is in the field or state the rule's nodes read, and an evidence print over real sources shows it there.
- **Each mechanical node** decides only what its predicate fully captures.
- **Each node that reads a model's answer** asks one proposition that passes the standard's own bad examples, and has its policy, with inequalities and routes.
- **A route whose evidence can't settle its standard** ends in a nudge or `uncertain`, never `pass`.
- **Each finding route says what the agent receives:** what was observed, the standard, the severity, the line it points at, and where to read next.
- **The proof plan fits the outcome,** with its three observations kept apart.

## Design the rule

1. **Name the judgment, and read the standard's own cases.** Say which call the nudge helps and who makes it. For a placement rule: "does a skill meant for any repository route the agent into one product's own workflow?", made by the writer, the review lead or the Lead, who decides whether the text stays or the workflow moves. Then collect the good and bad examples the standard's home gives, its boundary cases, its exemptions and its accepted judgments. They are the negative controls every question must pass, and the first labelled cases.
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

   `domain-decision-models`' worked trees show each shape, good and bad.
5. **Draw the tree and fill the policy table.** Every route ends in a named step, `pass`, `not_applicable`, `uncertain`, or a finding at the field the standard governs. A route whose evidence can't settle its standard ends in a nudge or `uncertain`, never `pass`. Fill one row per node that reads a model's answer:

   ```text
   | node | statistic | yes when | no when | in between | precedence | severity | costs it rests on |
   ```

   A Noul reads P(yes), a Choice its top label's probability (with its label count), and a Score its normalized position. State each inequality, with or without its end. `severity` is the severity of each finding the node can reach. Name the costs of a false finding, a missed violation and a review. A first setting chosen before development results is named as provisional.
6. **Write each route's nudge.** For every route that ends in a finding, state:
   - **the message:** what the rule observed, in one sentence. The engine adds the standard's wording and line itself, so the message never restates the standard. A worth-checking route says what to check. A place the run never reads, such as another repository, goes in the message as a direction ("decide whether this belongs in the product's own repository"), never as something the rule saw.
   - **where it points:** the `at` field. A finding points at that field's first line by default. For a section-sized subject, add a locator: a Choice over the `at` field's lines inside the piece, sent with the piece's one request, whose selected line becomes the finding's line when its probability reaches the locator's bar. A locator that isn't sent, or isn't sure enough, leaves the default line, and the report says so.
   - **the severity:** `warn`, the nudge, for any path that reads a model's answer, a gate included; `error` only when every step on every path to the finding is mechanical. The engine keeps the severity you author and reports each result's basis beside it; this split is our rules' policy.
   - **read next:** the entry's `related` fields. Every finding lists the standard's line first, then each span of each related field, and each loaded file whose opening the run read. Name the fields the agent must open to decide: the loaded files for a placement nudge, the enclosing step for a branch nudge. The list belongs to the entry, so every finding route of the rule shares it. When the finding's own place is all the agent needs, say so and why, and the standard's line stands alone.

   Several rules can nudge about the same line, each about its own property. Keep each route's message about its own: the agent puts them together.
7. **Plan the proof,** in three observations kept apart:
   - **the collection:** an evidence print over the rule's full denominator, every intended piece found with its fields, every cut named;
   - **the tree:** for a deterministic rule, edge tests at its predicate's boundary, with no model. For a judged rule, development and held-out sets of real pieces, each holding good, bad and near-miss cases and the countercases the standard's own exemptions name, with labels from people or agents independent of the rule, each expecting an outcome at a line. Its baseline is the current rule for the standard, when one exists;
   - **the receiving agent's call:** whether an agent given the nudge makes a justified call. That is an eval: it waits for the owner's evals, and the design names it as unproven.

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
- **Policy.** P(yes) ≥ .7 is yes, ≤ .3 is no, both ends inclusive, and between is `uncertain`, for the agent running the check to decide. These bars are a first setting, provisional until development results. Both findings are `warn`: both paths read a model's answer. A false finding costs an author a needless rewrite, and pushes toward padding the owner rejected. A miss lets an empty criterion through. A review costs the checker's time.
- **The nudge.** Each finding points at `body`, whose first line opens the step, and needs no locator: a step is small enough to read whole. No `related` field: the step is the finding's own place, and the standard's line is the only other thing the agent needs.
- **Proof plan.** The evidence print over every selected step. Development and held-out cases with independent labels, including:
  - a step whose whole job is to report an existing result;
  - a step that asks only for a glance;
  - a full return stated without any label;
  - "Understanding reached";
  - zero findings after a prescribed inspection;
  - a bare output list with no inspection required.

  The baseline is the old label-gated rule. The writer's call on a finding waits for evals.

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
      "names_end": { "ask": "names_end", "yes_at_or_above": 0.7, "no_at_or_below": 0.3, "yes": "requires_result", "no": { "finding": "Step doesn't say what done looks like.", "at": "body" } },
      "requires_result": { "ask": "requires_result", "yes_at_or_above": 0.7, "no_at_or_below": 0.3, "yes": "pass", "no": { "finding": "Step's end can be reached without the result it names.", "at": "body" } }
    }
  },
  "severity": "warn"
}
```

Both questions go in the entry's one request, and the walk reads `requires_result` only when `names_end` is yes. This is a worked design, not a delivered or measured rule; its accuracy is unproven until its labelled cases run.

## Worked design: placement, on #187's line

This is the author's stage of the one example every skill in this change teaches. `decision-matrix.md` classified the standard as worth checking; here it becomes a design.

The standard (`domain-skill-crafting/references/calls-and-placement.md:22`): "A skill meant for any repository routes no step, branch or load into one product's own application workflow: its own procedures, run commands, state files or machine paths. That workflow lives in the product's repository. A tool or platform the work uses, through its supported interface, is not that, and neither is domain vocabulary, this toolkit's own infrastructure, or a product named only as a labelled example."

The line it must catch: `sunstack-dev`'s `ops-observability-stack/SKILL.md:17`, in the skill's introduction before its first H2: "IF the work is AgentStudio debug or beta, load `references/agentstudio-loop.md` and follow that loop." In #187 no rule asked this of line 17: the one that read it judged its call's return, and passed the line once a return was added.

- **The judgment.** Does this generic skill route the agent into one product's own workflow? The writer, the review lead or the Lead decides: keep the text (it's a labelled example, a tool, the toolkit's own stack), or route the workflow to the product's repository. The rule gives them the reason to look and the places to read; it can't see where the workflow should live.
- **The chunk.**
  - **Subject:** each section's own text from the H1 down, its introduction and tables included, without its child sections' text.
  - **Denominator:** every section of every checked `SKILL.md` and reference in a plugin meant for any repository.
  - **Context and edges:** the parent's heading, and the files the section's own text loads, each with its opening. One hop: a loaded file's own loads aren't followed. A child section's loads belong to the child, so one load is never blamed on the H1, the parent and the child at once.
  - **Fields:** `heading`, `parent`, `body` and `targets`.
  - **Budget:** the kind's cap. A cut `body`, or a loaded file's opening cut at its limit, is marked in the state and on the result, and a pass on a cut view is a gap, not a clean read.
  - **Not context:** the skill's description. Given as context, a description that names its products read as declaring them in scope, and product sections passed. The description is judged as its own subject, by a second entry over the `skill` kind.
  - **The print:** the H1 introduction of `ops-observability-stack/SKILL.md` is one piece. Its `body` holds line 17, and its `targets` hold `references/agentstudio-loop.md` with its opening, "AgentStudio Loop", beside the section's other loads.
- **Gate.** None: every section in the denominator falls under the standard. Which plugins are meant for any repository is the config's checked files, not a question per piece.
- **Nodes.** Two Nouls in one request, in this first-failure order. Each exemption sits on the question that owns it.
  1. `routes_product`: "Does this section's own text send the agent into one named product's or application's own workflow: its own procedures, run commands, state files or machine paths?" Its criteria own the tool and vocabulary exemptions: yes includes loading a file whose content is that product's own workflow; no includes work that applies in any repository, a tool or platform used through its supported interface (querying a metrics store's HTTP API, running `claude plugin validate .`), and a mention that sends the agent nowhere.
  2. `example_or_own_infrastructure`: "Is every product this section sends the agent into named only as a labelled example, or part of this toolkit's own shared infrastructure?" Its criteria own the other two exemptions: "for example, AgentStudio's beta channel" is yes, and so is this toolkit's own observability stack.
- **Tree.**

  ```text
  routes_product? → no: pass (no product workflow on this section's own text and loads)
                  → yes: example_or_own_infrastructure? → yes: pass
                                                         → no: finding at body, located (warn)
  either between its bars → uncertain, for the agent to decide
  ```

  The pass on `no` settles only what the chunk shows; it says nothing about the section's other properties.
- **Policy.**

  ```text
  | node                         | statistic | yes when | no when | in between | precedence | severity | costs it rests on |
  | routes_product               | P(yes)    | ≥ .7     | ≤ .3    | uncertain  | first      | none     | a false nudge costs one read of a loaded file; a miss leaves one product's workflow in a generic skill, which #187 showed survives a review |
  | example_or_own_infrastructure | P(yes)    | ≥ .7     | ≤ .3    | uncertain  | second     | warn     | a false nudge on a labelled example costs a read and a "kept"; a miss is the same as above |
  ```

  The bars are a first setting, provisional until development results.
- **The nudge.**
  - **Message:** "This routes the agent into one product's own workflow: read the loaded files, then decide whether it belongs in that product's own repository." The repository is a direction: the run never reads it.
  - **Where:** `at: "body"`, with a locator `product_line`, "Which line sends the agent into the product's own workflow?", at `min_probability` .5, a provisional bar on the top line's probability over the section's lines. Line 17's section has more than one load, and generic ones on lines 14 to 16, `producer-contract.md` among them, come first, so a pattern can't pick the line: the locator does, or the finding stays at the body's first line, marked default.
  - **Severity:** `warn`: both paths read a model's answer.
  - **Read next:** `related: ["targets"]`. The finding lists the standard's line, then each loaded file whose opening the run read, `agentstudio-loop.md` among them. The list names every file the section loads; the locator, not the list, says which line the nudge is about.
- **Proof plan.**
  - **The collection:** an evidence print over the whole denominator, showing line 17's section with `agentstudio-loop.md`'s opening in its `targets`, `practices-cleanup`'s allow-list table whole, and every cut named.
  - **The tree:** development cases. Line 17's section expects a finding at line 17, anchored by the locator. `practices-cleanup/SKILL.md`'s allow list, whose table row at line 40 runs AgentStudio's own `mise ... run clean-artifacts`, expects a finding, from the section's own text, with no load in it. The countercases expect no nudge: a section that names a product only as a labelled example; this toolkit's own observability queries in `victoria-queries.md`; `domain-skill-crafting/references/platform.md`'s platform contracts. Held-out cases from other plugins, labelled by agents independent of the rule, run once after the freeze. No current rule judges this standard, so there is no baseline: name that.
  - **The receiving agent's call:** whether a writer given the line-17 nudge reads the loop and routes it to AgentStudio's repository, instead of polishing the call's return as #187 did. That is an eval, and stays unproven until the evals run.

```json
"K001": {
  "name": "placement.product-workflow",
  "evidence": "section",
  "questions": {
    "routes_product": { "type": "noul", "instructions": { "check": "body", "context": ["heading", "parent", "targets"], "task": "Does this section's own text send the agent into one named product's or application's own workflow: its own procedures, run commands, state files or machine paths?" }, "criteria": { "true": "The text tells the agent to go into, run or follow something that belongs to one named product or application: its own procedure, loop, command, script, state file or machine path. Loading a file whose content is that product's own workflow counts.", "false": "The text describes work that applies in any repository; or it uses a tool, platform or service through its own supported interface, such as querying a metrics store's HTTP API or running a platform's documented CLI command; or it uses the subject's own vocabulary; or it mentions a product without sending the agent into that product's own workflow." } },
    "example_or_own_infrastructure": { "type": "noul", "instructions": { "check": "body", "context": ["heading", "parent", "targets"], "task": "Is every product this section sends the agent into named only as a labelled example, or part of this toolkit's own shared infrastructure?" }, "criteria": { "true": "Each product the agent is sent into is presented as an example of a general case (\"for example\", \"such as\"), or is this toolkit's own shared infrastructure, such as its own local observability stack.", "false": "At least one product the agent is sent into is one product's own workflow, command, state or path, given as a step, branch or load the agent follows, not as a labelled example." } }
  },
  "decision": {
    "start": "routes_product",
    "steps": {
      "routes_product": { "ask": "routes_product", "yes_at_or_above": 0.7, "no_at_or_below": 0.3, "yes": "example_or_own_infrastructure", "no": "pass" },
      "example_or_own_infrastructure": { "ask": "example_or_own_infrastructure", "yes_at_or_above": 0.7, "no_at_or_below": 0.3, "yes": "pass",
        "no": { "finding": "This routes the agent into one product's own workflow: read the loaded files, then decide whether it belongs in that product's own repository.", "at": "body",
                "locate": { "name": "product_line", "task": "Which line sends the agent into the product's own workflow?", "min_probability": 0.5 } } }
    }
  },
  "related": ["targets"],
  "severity": "warn"
}
```

The entry uses the nudge fields `markers-and-rules.md` describes. Its section kind, its fields and its marker are the rules folder's to deliver; this is a worked design, not a delivered or measured rule.
