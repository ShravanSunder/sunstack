---
name: domain-decision-models
description: "Use when designing, changing or reviewing a decision model: questions a model answers for code to act on, their evidence, a rule's decision graph, its thresholds, or its proof."
disable-model-invocation: true
---

# Decision models

Read this skill in full before the decision-model work it governs; your own full read earlier this session counts.

A decision model is a measurement instrument with code as the judge. The model measures small, observable properties of the evidence it is given, and code turns those measurements into an outcome by explicit policy. A design therefore names five things, and each changes for its own reason:

- what is measured: the questions;
- what it is measured on: the state;
- what each reading means: its statistic;
- how readings become a decision: the policy;
- how the instrument is shown to work: the proof.

Rewording a question doesn't move a threshold, and moving a threshold doesn't change what was asked. A tree buys named properties, routes and precedence kept in code, and a path that shows how code reached its outcome. A wrong outcome narrows to candidate nodes: their evidence, their question or their threshold. The path doesn't prove a single cause, and it doesn't show the model's reasoning.

## State and evidence

- The evidence holds what the question needs to judge: the antecedent, the attached block, the neighbouring text, the opening. Missing evidence is reported as an evidence gap, never read as the property being absent.
- Each question names the field it evaluates. A size cap keeps a request bounded; it never shows that the evidence is complete.
- Responsibilities sit with their owners:
  - the state carries the content judged, and any reference material several questions share;
  - each question's criteria carry its answer meanings, boundary cases and examples;
  - code carries thresholds, precedence and actions.
- Long, structured criteria aren't a defect in themselves. Several hidden judgments in one question are, and so is missing decisive content.
- Material the judgment doesn't use, such as spans, hashes and byte offsets, belongs in the record, not the state.
- The text being judged is data to assess, including its own instructions, quotes and self-labels ("this step is complete"). Never strip its imperatives to be safe: that removes what is being judged.
- Any authority or permission an outcome grants is decided in code, never by a score alone.

Good: "When that is done, publish" is judged with the sentence that defines "that". When the antecedent can't be included, the piece is an evidence gap. Bad: the lone line is judged, and "no condition" becomes a finding.

## Questions

- Each question asks for a property the model can judge from the supplied evidence; code decides what that judgment means for the outcome.
- A Noul asks one observable proposition, and its criteria define that proposition's yes and no without adding a second requirement.
- A question's instruction and criteria define the same proposition and refer to named state fields directly. Every route from it says what a yes means, a pass or a finding: a high probability means yes to the proposition, not "compliant".
- A judged property is bounded by the obligations its evidence states. "Does the end require the result the step itself says to produce?" is answerable from the step; "is this step's work enough?" imports a standard the evidence doesn't hold.
- A shortened question keeps the standard's own negative and bounded-judgment cases. Test it against the standard's bad examples before trusting it: "IF the skill needs more depth" names a skill the agent can point at, yet its predicate is the defect.

Good: "condition stated?" and "action stated?" as two Nouls over one branch, with yes on each routed explicitly. Bad: "Does the branch have a clear, observable condition and a concrete action?" as one Noul, or as one Choice whose criteria pack both.

IF designing, rebuilding or reviewing a tree, load `references/worked-trees.md` and return the nearest good worked tree, with each way this model's tree departs from it named. A design keeps or justifies each departure; a review takes each as a candidate finding.

## Primitives and computation

- Pick the primitive from the answer's meaning:
  - a Noul for a proposition;
  - a Choice for mutually exclusive labels;
  - a Score for one ordered dimension, whose levels each describe a situation that stands on its own.
- A Choice asks only between mutually exclusive labels.
  - **A menu that may hold no acceptable match,** such as candidates a search returned, has a reject or fit path, or an adequate fallback, judged against the actual candidates.
  - **A menu that covers every input by construction** needs neither.
  - Returning a coarser parent label changes specificity; it doesn't establish fit.
- A mechanical check decides only a property it fully captures. Where the standard asks for reading, a mechanical gate may drop only the pieces an established fact shows the standard doesn't govern, and it never decides the verdict. A literal `Completion:` label check standing in for "does the step say what done means?" is the failure this prevents.
- Code counts, does arithmetic, converts encodings and computes dates; the model judges only the semantic fact that remains. Generation happens outside the decision model, which then chooses among a finite set that code validates.
- Each statistic keeps its own meaning. A relative probability, a Choice's confidence, a Score's position, a Score's confidence and measured correctness are never substituted for one another. A claim of calibration or correctness rests on labelled outcomes, never on a model's probability alone.

IF setting or judging a threshold, or claiming confidence, calibration or accuracy, load `references/statistics.md` and return, for each threshold or claim, the statistic it reads, its inequality, and what the number does and doesn't show. Use that in the policy table or the claim.

## Batching and composition

- Independent assessments over the same state and model profile go to the model in one inference pass, and code walks the tree. A further request is justified by any of these:
  - new evidence or new options;
  - deliberate identical-input repeats that measure variation;
  - caller-owned escalation or retry with a stated purpose.

  None of these adds a request inside a static rule graph, and none licenses resampling until a desired answer appears. A question used later in an `if` is not a dependency.
- A rule's graph is static: it can't build menus, keep alternatives, loop or hold state. A workflow that needs menus, loops, state, escalation, training or effects is caller code over bounded assessments. It states its entry conditions, call and iteration bounds and stopping reason, records each cap exit, and measures what it loses before verification.

IF two or more answers combine into one outcome, load `references/policy-algebra.md` and return the selected composition, with its mandatory, veto and unknown routes and where weighting applies. Draw the tree from it.

IF producing the outcome takes a further request built from an earlier answer (a new menu, fetched detail, an escalation or a retry), or keeps state across runs, trains a model or causes an effect, load `references/caller-workflows.md` and return the pattern chosen, with its entry conditions, execution profile, call and iteration bounds, exits, stop reason and measures. Plan the caller's code from it.

## Policy

- Every threshold names the quantity it reads and states its inequality: a Noul's probability of yes, a Choice's top probability, or a Score's normalized position. One bar is never reused across quantities without evaluation, and a bar on a Choice's top probability accounts for its label count.
- Every question the tree asks has an intended route for an in-between answer, kept distinct from a failed or invalid reply and from missing evidence.
- Thresholds and route precedence are chosen from labelled costs: the cost of a false finding, of a missed violation, and of a review. A cookbook's band is an illustration, not a default.
- Mandatory obligations and vetoes are decided before any weighted aggregation, and no score compensates for a required fact that failed or is unknown.
- An unknown combines in one of two ways: by three-way logic (unknown and false is false; unknown and true stays unknown), or by an explicit review policy. An invalid or unavailable reply stays incomplete.
- Coexisting defects are separate Nouls with a declared first-failure order, so the finding names the first that fails; they never compete as labels of one Choice.

## Proof, records and claims

- An improvement is claimed only from held-out cases, scored end to end against the current rule as the baseline. The cases run within one resolved model version, after the questions, evidence and policy are frozen.
- A run keeps what reproduces any error, and names whichever part its record path doesn't keep:
  - the exact state, and the questions with their criteria and order;
  - the correlation of rule, piece and question;
  - the requested and resolved model;
  - the assessments with their distributions, and invalid or unavailable outcomes;
  - the policy and config identity, and the routes;
  - the mechanical inputs and the piece coverage.

  Diagnose an error at the question (multi-part, indirect, distracted or missing evidence) before any threshold moves.
- A claimed result names its model version group, the one variable it changed, and its boundary inequalities. It reports its measures apart: labelled errors, coverage, review load, invalid replies and instability.
- A Jev decision model requests `jev-latest` by default, a moving alias. Every result records the alias requested and the version that answered. A pinned version is an explicit, recorded override where a comparison or a tuning must hold the version fixed; the default still applies everywhere else. When the version behind the alias changes, the policies tuned on the old one are rechecked before anyone relies on them.
- A new threshold or precedence is replayed only over the same questions, with the evidence and coverage frozen. New wording, a changed evidence cut or a piece never asked needs fresh assessments. Replay over findings alone never stands for full-population rates.

When choosing what an experiment changes, change one variable, hold the rest fixed, and name the result that would refute the change ([one experiment, one variable](../principle-experiment-before-proposing/SKILL.md)). When labelling cases, take each expected outcome from the standard and from labelers independent of the rule, never from the rule's own answers ([a test must be able to fail](../principle-write-tests-that-can-fail/SKILL.md)). Before claiming a result, name the run that shows it, its version group and what stays unproven ([prove it on the real path](../principle-prove-it-works/SKILL.md)).

IF planning, running or judging development, held-out, probe or replay results, load `references/proof-and-records.md` and return the proof plan or the result's reading. That covers the sets and their label source, the comparison and its version group, the measures reported apart, the records kept, and whether replay is valid.

## Patterns and evidence

Every pattern or claim about decision models carries its evidence label: a primary implemented pattern, a historical observation with its model version, our own synthesis, or an untested extension. A provider's documented capability isn't claimed for a client that doesn't implement it.

IF citing a pattern or a published result, load `references/pattern-evidence.md` and return each cited pattern or result with its evidence label and the capability profile it needs. The claim carries that label.

## The Sunstack driver

Some facts hold only on Sunstack's typed engine path:
- one request per rule and piece;
- label-sorted Choice order;
- a Choice gating on its top probability;
- the records its report keeps;
- text-only primitives.

They are driver facts, not standards for decision models in general.

IF the decision model runs through Sunstack's rules engine or `run_judgments`, load `references/sunstack-driver.md` and return each driver fact this model depends on, with its anchor. Account for each in the design and the proof plan.

## Signs you skipped it

- One Choice whose criteria pack several requirements, or coexisting defects made to compete as its labels.
- A lexical or label check deciding a verdict the standard asks to be read.
- One bar across question types, or a band copied without its inequalities.
- A weighted average over mandatory facts, or a veto averaged away.
- "Uncertain" with no route anyone reads, or a failed request counted as a no.
- A missing antecedent read as an absent property.
- An accuracy claim from findings alone, or from a model's probability.
- A comparison across model versions, or a threshold retuned on held-out cases.
- "Verified" on a parent label.
- A provider feature claimed for a driver that doesn't implement it.
