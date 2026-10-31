# Rule Design

This reference owns step 3: turning a classified standard into a rule's design before any marker or entry is written.

**Expected input:** the marked standards from step 2, each with its `path:line`, outcome, evidence kind and gate. Also the repository's rules config and evidence project, and `domain-decision-models`, loaded.

**Return:** per marked rule, the design its outcome and its nodes call for, with each field that doesn't apply marked `not applicable` and its reason.

**Complete when:** each gate below is stated as kept, with the line that shows it, or `not applicable` with its reason; a rule failing any gate is returned to step 2.

## The gates

- **The decisive content** is in the field or state the rule's nodes read.
- **Each mechanical node** decides only what its predicate fully captures.
- **Each node that reads a model's answer** asks one proposition that passes the standard's own bad examples, and has its policy, with inequalities and routes.
- **The proof plan fits the outcome:** edge tests for a deterministic rule; development and held-out sets with a baseline for a judged one.

## Design the rule

1. **Read the standard's own cases.** Collect the good and bad examples the standard's home gives, its boundary cases and its accepted judgments. They are the negative controls every question must pass, and the first labelled cases.
2. **Choose the kind and the fields.** For each field a node will read, say what decisive content it must hold: the attached block, the antecedent, the step's last paragraph. Print the evidence for the kind over files holding the intended good, bad and near-miss pieces. An evidence print over a selected kind, or a kind within one, sends model requests, so whoever holds the grant runs it. Read each intended piece's fields. A field that can't hold the decisive content is an evidence gap: name it, and fix the evidence project before any question relies on it.
3. **Make the applicability decision.** Name the established fact that lets the rule's gate end a piece `not_applicable`, or state that every piece of the kind falls under the standard.
   - **A mechanical gate** fits when a field's text states the fact exactly, such as a description that opens with `Always`.
   - **A question gate** fits when telling the pieces apart takes reading, such as guidance against a quoted example.

   A gate asks what kind of piece this is, never whether it meets the standard.
4. **Write the nodes.**
   - **A mechanical node** names its predicate and field, its yes and no routes, and step 2's counterexample search.
   - **A question** names its type (Noul, Choice or Score, chosen by what the answer means), its proposition, the field it evaluates, and criteria that define that same proposition with the standard's boundary cases.
   - **Coexisting requirements** are separate Nouls in one request, with a declared first-failure order.

   `domain-decision-models`' worked trees show each shape, good and bad.
5. **Draw the tree and fill the policy table.** Every route ends in a named step, `pass`, `not_applicable`, `uncertain`, or a finding at the field the standard governs. Fill one row per node that reads a model's answer:

   ```text
   | node | statistic | yes when | no when | in between | precedence | costs it rests on |
   ```

   A Noul reads P(yes), a Choice its top label's probability (with its label count), and a Score its normalized position. State each inequality, with or without its end. Name the costs of a false finding, a missed violation and a review. A first setting chosen before development results is named as provisional.
6. **Plan the proof.**
   - **A deterministic rule** plans edge tests at its predicate's boundary, with no model.
   - **A judged rule** plans development and held-out sets of real pieces, each holding good, bad and near-miss cases, with labels from people or agents independent of the rule. Its baseline is the current rule for the standard, when one exists.

## Worked design: a step's completion criterion

The standard (`domain-skill-crafting/references/steering.md`): "Each completion criterion lets the agent tell done from not done, and demands the legwork the step needs."

**What the old design got wrong.** The old rule gated on a literal `Completion:` paragraph and ended every step without one in a finding, before any question was asked. That made a format the verdict. Steps whose done state was phrased another way became findings, and authors appended labels to satisfy the check. No step needs a label: the model judges the step's own words.

**The design:**

- **Outcome and evidence.** Model-judged, over the `step` kind: its `heading`, and its `body`, which must hold the step's whole text through its last paragraph; confirm that in the evidence print.
- **Gate.** None: every step falls under the standard.
- **Nodes.** Two Nouls, in one request, in this first-failure order:
  1. `names_end`: "Does the step's text say what must be true when the step is done?"
  2. `requires_result`: "Does the step's stated end require the result the step itself says to produce?" This is bounded by the step's own stated work. "Glance at the test output, then move on" passes when the step asks only for a glance. Requiring an investigation the step never names imports another standard.
- **Policy.** P(yes) ≥ .7 is yes, ≤ .3 is no, both ends inclusive, and between is `uncertain`, for the agent running the check to decide. These bars are a first setting, provisional until development results. A false finding costs an author a needless rewrite, and pushes toward padding the owner rejected. A miss lets an empty criterion through. A review costs the checker's time.
- **Proof plan.** Development and held-out cases with independent labels, including:
  - a step whose whole job is to report an existing result;
  - a step that asks only for a glance;
  - a full return stated without any label;
  - "Understanding reached";
  - zero findings after a prescribed inspection;
  - a bare output list with no inspection required.

  The baseline is the old label-gated rule.

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
