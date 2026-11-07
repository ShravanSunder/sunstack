# Worked trees

This reference owns the worked good and bad trees: one for every step type, and the shapes that recur when a tree is rebuilt.

**Expected input:** the model's standard or decision, its evidence, and its current or proposed tree.

**Return:** the nearest good tree below, and each way the model's tree departs from it, named.

**Complete when:** every node of the model's tree has been matched to a shape here, or named as a departure with its reason.

Each tree reads top to bottom. `→` is a route, `?` marks a question the model answers, and `[ ]` marks a mechanical step. Every tree here is an illustration of its shape, not a delivered rule or a measured result.

## A mechanical gate on an established fact

A gate asks what kind of piece this is, from a fact a field states exactly; it never decides the verdict.

```text
Good: [description opens with "Always"]
        no  → not_applicable (the standard governs only Always openers)
        yes → skipping the skill would break the work? → yes: pass · no: finding · between: uncertain
Bad:  [paragraph contains "Completion:"]
        no  → finding "step has no completion criterion"
```

The bad gate turns a format into the verdict. A step whose done state is phrased another way becomes a finding, and authors pad steps with labels to satisfy it. The fix judges the step's own words, below.

## A Noul, and two coexisting properties

```text
Good: one request {condition stated?, action stated?} over the branch with its attached action block
        condition stated? → no: finding at the condition
                           yes: action stated? → yes: pass · no: finding at the action
        either between its bars → uncertain
Bad:  "Does the branch have a clear, observable condition and a concrete action?" → one Noul
```

The bad question packs two propositions, so a no can't say which part failed, and a middling answer may mean either. The two good Nouls go in one request; their logical order is in code.

## The branch condition, with the standard's own negative case

A shortened question must keep what the standard rejects. "IF the skill needs more depth" names a skill the agent can point at; the defect is the undefined predicate.

```text
Good: different path from the rest of the step? → no: not_applicable
      yes → condition states a checkable fact, or cites a recorded result or decision?
              no → finding at the condition
              yes → names different work? → yes: pass · no: finding
      any between its bars → uncertain
Bad:  condition names a file, result or request? → yes: accepted
```

The bad node accepts "IF the skill needs more depth" because it names a skill. The good node asks whether the predicate can be decided; it doesn't ask whether the runtime result will be true. Keep the standard's accepted bounded judgment, such as a value the standard itself allows the agent to judge, passing.

## Coexisting defects: from one Choice to separate Nouls

```text
Bad:  which single gap? {none, when, where, work, result} → top label ≥ .6 → its route
      (two real gaps split the probability, so a certain defect looks uncertain)
Good: one request {moment named?, destination named?, work named?, return named?}
        code applies a declared first-failure order: moment → destination → work → return
        the first no → finding at it; the other answers are kept
        an unknown required fact → uncertain before any absence verdict
```

A Choice stays right for a true category, where one label applies. Coexisting defects are separately true propositions.

## A Choice over an exhaustive menu, and over candidates

```text
Good, exhaustive: intent? {refund, cancel, other: any other request} → route per label
      no fit question: "other" makes the menu cover every input
Good, candidates: which of these three search results is the product meant?
        + this candidate is the product meant? (asked of each) → none fits: no match
Bad:  act on the top candidate when none of them is the one meant
Bad:  add a fit question to a menu "other" already makes exhaustive
```

Returning the parent category when the child is uncertain changes specificity, not fit: the parent is not verified by having been returned.

## A Score, with levels that stand alone

```text
Good: how fully is the argument supported? none · one claim · most claims · all claims
      code reads the normalized position against its bars
Bad:  quality 1 to 5, whose levels mix clarity, length and accuracy
Bad:  position .5 read as "half the work done"
```

A Score's position is a probability-weighted place on the scale, not a count, a percentage or a magnitude.

## A Combine, after the mandatory facts

```text
Good: [required fields present] → no: finding
      yes → disqualifier present? → yes: finding
      no  → Combine: .6 × clarity + .4 × completeness (Noul P and normalized Score)
              ≥ bar: pass · ≤ lower bar: finding · between: uncertain
Bad:  Combine: .5 × "identity verified" (.99) + .5 × "sanctions clear" (.50) = .745 → pass
```

The bad tree lets a strong yes compensate for an obligation that hasn't held. Weighting is for preferences that may trade off; obligations and vetoes route first.

## A changed evidence cut

```text
Bad:  state = the lead-in line "When retrofitting, handle existing files:"
      names different work? → no (.66) → finding
      (the two options listed under it were never sent)
Good: state = the lead-in with its attached list
      same question → pass, finding or uncertain on what is there
      attached block unavailable → evidence gap, never "no action"
```

Repair the evidence first, with the questions unchanged; only then compare questions, and only then thresholds.

## Completion, judged from the step's own words

```text
Good: full step names a checkable end? → no: finding · between: uncertain
      yes → the end requires the result the step itself says to produce?
              yes: pass · no: finding · between: uncertain
Bad:  [Completion: label present] → no: finding
```

No label is required: the model judges the step's own words. The second question is bounded by the step's stated work. "Glance at the test output, then move on" passes when the step asks only for a glance; requiring an investigation the step never names imports another standard.

## A legitimate uncertain

A step's end is "the return for its class is complete", and its body spells out each class's return two paragraphs earlier. The evidence holds both, and the two readings are close.

```text
Good: answer between the bars → uncertain → the agent running the check decides,
      against the standard, and records the call
Bad:  the same answer forced to pass at ≥ .5
```

An uncertain answer is a successful assessment with too little separation. It differs from a failed request (incomplete) and from missing evidence (a gap).

## A nudge tree: the product-workflow rule

The standard: a skill meant for any repository doesn't carry one product's own material: its procedures, run commands, state files or machine paths. The evidence can show that material. It can't show where it should live, because no piece holds the product's repository. So the rule nudges, and the agent decides.

The piece is one section of a general skill: its body, heading and headings, plus the opening of every file or skill it loads. The rule's `reference` holds examples written from the standard, each with its text, its answer and why; the owner's rulings on real sections are its cases, kept in the case file. Three Nouls and the line-finder go in one request, and each Noul names the body, the openings and `reference.examples`:

1. `product_material`: "Does this section teach one application's own internal procedure, commands, files or state, as opposed to using a public tool through its documented interface?"
2. `all_labelled_examples`: "Is all of that material shown only as labelled examples?"
3. `quotes_real_product_mistake`: "Does the section quote a real product's own mistake?"

```text
Good: product_material? → no      → [complete: body and loads fully read?] → yes: pass · no: uncertain
                        → between → uncertain
                        → yes     → quotes_real_product_mistake?
                                      → yes     → nudge at the found line, warn
                                      → no      → all_labelled_examples? → no: nudge · between: uncertain
                                                                         → yes → [complete?] → yes: pass · no: uncertain
                                      → between → all_labelled_examples? → no: nudge · yes or between: uncertain
Bad:  routes_product? → yes → example_or_own_infrastructure? → no → nudge
      (the old two-question rule: its first question packed three facts, a procedure,
       whose it is and whether it's a public tool, and its passes ran on cut text)
Bad:  belongs in this repository? → between its bars → pass
      (a question the evidence can't settle, reported as held)
Bad:  product_material = "does this section show concrete material that belongs to one product?"
      (the same tree, with the held rule's first question: the right shape, the wrong meaning)
```

Each bar is a Noul's P(yes): ≥ .7 is yes, ≤ .3 is no, both ends inclusive, and between is the route drawn. Those are starting bars, set on the development cases and recorded beside them, not defaults.

On `ops-observability-stack/SKILL.md:17`, "IF the work is AgentStudio debug or beta, load `references/agentstudio-loop.md` and follow that loop.", the section shows AgentStudio's own loop through the loaded file's opening, and nothing labels it an example. The walk reads yes, then no, then no, and ends in a `warn` nudge at line 17: "this section shows one product's own material; read the line and the loaded file, then decide whether it belongs in that product's repository".

What the tree keeps, and why:

- **Each question holds one fact.** "Is there product material?", "is it all labelled?" and "is a real product's mistake quoted?" can each be answered alone, so they can't contradict each other inside one answer.
- **The warning is an OR of two known triggers:** material not all labelled, or a quoted real mistake. An unknown on one doesn't hide a known yes on the other, and an unknown that decides the outcome ends `uncertain`.
- **Both passes need the text fully read.** The `complete` check runs before each pass: a "no" about a cut body, or a loaded file whose opening was cut or didn't resolve, isn't a measured absence.
- **The examples live in the reference, not in the questions,** and none of them is a case. Each question stays one sentence with short criteria, and all three read the same examples.
- **Its line comes from the line-finder, not a pattern.** The section's generic loads come before line 17, so "the first load line" points at the wrong one. Below its bar, the warning stays at the body's first line, marked default.
- **Its finding is a nudge:** the message says what to check and where to read, and nothing in it says the line is wrong.

**What the run showed.** The held rule had this tree with the bad first question, and the owner's rulings in its `reference`. Its second development run, on 29 cases, gave 12 right, 12 unsure and 5 false warnings. All five false warnings took `product_material → all_labelled_examples → finding`, with the first answer at .83 to .93, on sections the owner ruled quiet: a public CLI's documented embed commands, routing to a public security workflow, a TypeScript toolchain, a component guide and a platform's supported fields. No field was cut and every loaded opening was present, so the evidence was there; the question asked for commands and files, which those sections do show, while the owner's line is whose they are and how they're used. A quiet ruling (`demistify.md` lines 45–73, a public CLI used as documented) and a real mistake (`project-verification-selection.md` lines 39–42, one terminal app's setup taught as the general way) got almost the same answers (.93/.07 and .93/.14), so no bar on that question could separate them: the defect was the meaning, not the threshold. The second question was right to say those tool instructions aren't labelled examples; making it call them examples would have repaired the wrong fact.

The first question above is the diagnosed correction. It is untested: it holds only if the five quiet rulings pass on a fresh development run while the real private-workflow cases (AgentStudio's own clean task, line 17's loop) still warn.

## A filter as a tree: the kind filter

A filter decides one label per folder, here the kind of skill a folder holds, and rules gate on that label (`only_when`). It is judged once per folder, and every rule gated on it uses that one result.

The state is the skill's description and the opening of its `SKILL.md` (the body from just after the frontmatter through the end of the first H2 section: the H1 introduction, if any, and the whole first `##` section), plus a `reference` holding the five kind definitions and worked examples written from them, none of them a folder the filter is scored on. It holds no folder name, which would hint at the answer. Two Choices go in one request:

1. `primary_work`: reusable guidance · operating a public tool · one repository's own procedure.
2. `reusable_guidance_kind`: general · role · domain.

```text
Good: primary_work? → reusable guidance       → reusable_guidance_kind? → general · role · domain → that label
                                                                       → below its bar → unsure
                    → operating a public tool → tool_manual
                    → one repository's own    → repo_specific
                    → below its bar           → unsure
      unsure → the folder is skipped, and listed with its route
Bad:  one Choice over all five labels, whose criteria pack every boundary between them
      (the old filter: one question, one cut-off, no tree)
```

Each Choice reads its top label's probability among 3 labels. A starting bar of .6 is a confidence of (.6 − 1/3) ÷ (2/3) = .40, which is not accuracy; the bar is set on development cases. The walk reads `reusable_guidance_kind` only when `primary_work` picked reusable guidance; otherwise it's asked in the same request and unused.

What the tree keeps, and why:

- **Each Choice picks between labels that can't both be true.** Packing all five kinds into one menu made each label's criteria carry every other label's boundary.
- **The boundaries are written once, in the reference.** "A repository's own command-line tool counts as its own procedure, not as a public tool" is a definition both questions share, not a sentence repeated in each.
- **A label comes only from a tree ending.** A question's own option, such as "reusable guidance", is never a filter label.
- **Unsure skips and lists the folder.** The rules gated on the filter don't run there, and the skip is visible, so a wrong skip can be challenged.

**What the run showed.** The held filter had this tree, and a valid tree shape didn't make it a valid measurement. Its second development run sorted 65 folders: 53 right, 6 unsure, 6 wrong, and the wrong ones were confident (.73 to .98).
- **Two examples were cases.** Its `reference.examples` held the real descriptions of `domain-decision-models` (labelled domain) and Agent Studio's skill (labelled tool manual), and both folders were scored. Both came back right, which shows nothing about text the filter hasn't seen.
- **Its meanings didn't draw the owner's lines.** The owner ruled `decision-model-review` domain; the filter said general at .78, because its definitions call applying standards in a bounded task a workflow. The owner ruled `practices-verification-maintenance` repository-specific; the filter said general at .98 on two revisions, because its opening teaches a reusable practice whose product is one project's verification skill. Two principles the blind labellers called general came back domain, because "a subject's reusable standards and judgments" also describes a principle.

Every one of those was visible before the run: read each ruled folder's description and opening, as the request would carry them, against the definitions, and the definitions give the wrong label. What that reading can't say alone is the cause: either the state lacks what makes the folder repository-specific, or the definition is too narrow. Check the evidence first, with the questions unchanged; then change the definition, never the owner's label.

This is not the hierarchy below. Both menus are fixed and asked together, and code only chooses which answer to read; nothing is built from an earlier answer.

## A hierarchy is caller code

```text
Good (caller code over run_judgments):
      root Choice over direct children → clear: descend
                                       → ambiguous: keep the plausible paths, or review
      each new menu is a new request; at a leaf, apply the caller's fit policy
Bad (inside a static graph): pick the broad winner, discard the other path,
      take the deepest leaf whatever the ambiguity
```

A cycling bottle plausibly belongs under sports and under kitchen. Child menus tell a bike bottle from general drinkware only if the walk doesn't discard one path at the root. A static rule graph can't build those menus; `caller-workflows.md` owns the pattern.
