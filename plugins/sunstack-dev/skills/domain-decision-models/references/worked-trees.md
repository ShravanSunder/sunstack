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
Bad:  quality 1–5, whose levels mix clarity, length and accuracy
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
      same question → pass, finding or uncertain on what is actually there
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
