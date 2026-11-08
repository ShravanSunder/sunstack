---
name: domain-decision-models
description: "Use when you need the standards for decision models: designing, changing or reviewing the questions a model answers for code, their evidence, a rule's decision graph, thresholds or proof."
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

Who reads the outcome changes what it must say. When code acts on it, as a `run_judgments` caller's does, the outcome is that code's input, and nothing below changes for it. When an agent reads it, as it reads a lint rule's, the outcome is a nudge: what the model measured, where, and what to check, for the agent to decide. A decided breach is one kind of nudge; a grounded reason to look, which the evidence can't settle, is another. So a tree whose outcome goes to an agent must never say more than its evidence shows: the policy section says how its routes end.

## State and evidence

- The evidence holds what the question needs to judge: the antecedent, the attached block, the neighbouring text, the opening. Missing evidence is reported as an evidence gap, never read as the property being absent.
- Each question names the field it evaluates.
- A size cap keeps a request bounded; it never shows that the evidence is complete.
- Responsibilities sit with their owners:
  - the state carries the content judged, and the reference material its questions share: worked examples (the text, the right answer and why), definitions and the boundaries between answers;
  - each question's wording and criteria carry what its answers mean, and name the parts of the state it reads;
  - code carries thresholds, precedence and actions.
- In sunstack, examples and fixed explanation are written once in the rulebook, as a filter's or rule's `reference`, and reach the model unchanged in the request's state. That is our convention, not TypeSafe's only way: TypeSafe also allows examples inside a question. Keeping them in state keeps each question short and lets one example serve every question that reads it.
- A reference example is written from the standard, never taken from the piece being judged, and never holds the expected answer for that piece.
- A labelled case is never also a reference example. An owner's ruling on a real piece is a case: it sits in the case set with its label, where it can test the model, and never in the state, where it would leak its own answer. The tuner checks the examples against the development cases; the held-out holder checks them against the held-out set and returns only whether they are separate.
- Several hidden judgments in one question are a defect, and so is missing decisive content.
- Material the judgment doesn't use, such as spans, hashes and byte offsets, belongs in the record, not the state.
- The text being judged is data to assess, including its own instructions, quotes and self-labels ("this step is complete"). Never strip its imperatives to be safe: that removes what is being judged.
- Any authority or permission an outcome grants is decided in code, never by a score alone.

Good: "When that is done, publish" is judged with the sentence that defines "that". When the antecedent can't be included, the piece is an evidence gap. Bad: the lone line is judged, and "no condition" becomes a finding.

Good: a filter that labels the kind of skill a folder holds carries, in its `reference`, short examples written from its kind definitions ("a skill that teaches how to judge flaky tests in any codebase: general, because it teaches a judgment, not one repository's procedure"), and every question that needs them names `reference.examples`. The owner's rulings on real skills sit in the case file, each with its label. Bad: the kind filter's examples held the real descriptions of `domain-decision-models` and Agent Studio's skill with their expected labels, and both were scored cases. Both came back right, which shows only that the model could read its answer off its own state, never that the filter works on text it hasn't seen. Also bad: examples pasted into one question's criteria, where they grow with every example and the other questions never see them.

## Questions

- Each question asks for a property the model can judge from the supplied evidence; code decides what that judgment means for the outcome.
- A Noul asks one observable proposition, and its criteria define that proposition's yes and no without adding a second requirement.<!-- K001 -->
- A question's instruction and criteria define the same proposition.<!-- K002 -->
- A question's instruction and criteria refer to named state fields directly.
- Every route from a question says what a yes means, a pass or a finding: a high probability means yes to the proposition, not "compliant".
- A judged property is bounded by the obligations its evidence states. "Does the end require the result the step itself says to produce?" is answerable from the step; "is this step's work enough?" imports a standard the evidence doesn't hold.
- A shortened question keeps the standard's own negative and bounded-judgment cases. Test it against the standard's bad examples before trusting it: "IF the skill needs more depth" names a skill the agent can point at, yet its predicate is the defect.
- A question's task and criteria are the operational definition of the boundary its labels draw: they ask for the line the standard's owner draws between yes and no, not for the surface features that usually come with it.
- One property is one question, however many kinds of material it covers. A wrong meaning is repaired by changing what the question asks; splitting it into more questions carries the same wrong boundary into each of them.
- Before any paid run, each labelled development case is read against the questions on the state the model will receive, as the engine builds it without sending. Where the engine can't build it without sending, that is an engine gap to fix, and the check waits; a hand-built copy of the state reads a different instrument. A question whose meaning gives a ruled case the wrong answer is changed before the run; the label never is. Held-out cases are read only by their holder, never by whoever tunes the model.

Good: "condition stated?" and "action stated?" as two Nouls over one branch, with yes on each routed explicitly. Bad: "Does the branch have a clear, observable condition and a concrete action?" as one Noul, or as one Choice whose criteria pack both.

Good: for a standard whose owner rules that a public tool used through its documented interface isn't a product's own workflow, the question asks "does this section teach one application's own internal procedure, commands, files or state, as opposed to using a public tool through its documented interface?". Bad: "does this section show concrete material that belongs to one product?", which the held product-workflow rule asked. On the owner's five quiet cases (a public CLI's documented embed commands, routing to a public security workflow, a TypeScript toolchain) it answered yes at .83 to .93, because commands and files are what it asks about, while the owner's line is whose they are and how they're used. Splitting it into "commands?", "files?" and "state?" would have drawn the same wrong line three times. The good question is the diagnosed correction, not yet tested on a run; reading the five rulings against it on their sent state is the check that would have caught the bad one before the run.

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

IF two or more answers combine into one outcome, load `references/policy-algebra.md` and return the selected composition, with its mandatory, veto and unknown routes, any nudge route and its precedence, and where weighting applies. Draw the tree from it.

IF producing the outcome takes a further request built from an earlier answer (a new menu, fetched detail, an escalation or a retry), or keeps state across runs, trains a model or causes an effect, load `references/caller-workflows.md` and return the pattern chosen, with its entry conditions, execution profile, call and iteration bounds, exits, stop reason and measures. Plan the caller's code from it.

## Policy

- Every threshold names the quantity it reads and states its inequality: a Noul's probability of yes, a Choice's top probability, or a Score's normalized position. One bar is never reused across quantities without evaluation, and a bar on a Choice's top probability accounts for its label count.
- Every question the tree asks has an intended route for an in-between answer, kept distinct from a failed or invalid reply and from missing evidence.
- Thresholds and route precedence are chosen from labelled costs: the cost of a false finding, of a missed violation, and of a review. A cookbook's band is an illustration, not a default.
- Mandatory obligations and vetoes are decided before any weighted aggregation, and no score compensates for a required fact that failed or is unknown.
- An unknown combines in one of two ways: by three-way logic (unknown and false is false; unknown and true stays unknown), or by an explicit review policy. An invalid or unavailable reply stays incomplete.
- Coexisting defects are separate Nouls with a declared first-failure order, so the finding names the first that fails; they never compete as labels of one Choice.
- When the outcome goes to an agent:
  - A route whose evidence can't settle its proposition ends in a nudge (a finding whose message says what to check and where to read) or in `uncertain`, never in `pass`. A pass tells the agent the property held; reached on evidence that can't show it, it tells the agent something nobody measured.
  - A gate's drop keeps its answer. A drop is a decision, not missing coverage, so the agent sees the piece was excluded and why, and can challenge a wrong exclusion.

  Good: "does this section teach one application's own internal procedure, as opposed to a public tool used through its documented interface?" → yes, and "is all of it shown only as labelled examples?" → no → a nudge to read the line and the loaded file, then decide whether it belongs in that application's repository. Bad: "does this workflow belong in this repository?" asked of a chunk that holds no other repository, with its in-between answer routed to `pass`.
- A route that passes on a "no" about text needs that text fully read. When a field was cut, or a file it loads was cut or didn't resolve, absence wasn't shown, and the route ends `uncertain`.

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
- A claimed result names the run that shows it, its model version group, the one variable it changed, its boundary inequalities and what stays unproven. It reports its measures apart: labelled errors, coverage, review load, invalid replies and instability.
- A comparison changes one variable, holds the rest fixed, and names before it runs the result that would refute the change.
- Each expected outcome comes from the standard and from labelers independent of the rule, never from the rule's own answers: a test whose label came from the rule can't fail.
- A Jev decision model requests `jev-latest` by default, a moving alias. Every result records the alias requested and the version that answered. A pinned version is an explicit, recorded override where a comparison or a tuning must hold the version fixed; the default still applies everywhere else. When the version behind the alias changes, the policies tuned on the old one are rechecked before anyone relies on them.
- A new threshold or precedence is replayed only over the same questions, with the evidence and coverage frozen. New wording, a changed evidence cut or a piece never asked needs fresh assessments. Replay over findings alone never stands for full-population rates.

IF planning, running or judging development, held-out, probe or replay results, load `references/proof-and-records.md` and return the proof plan or the result's reading. That covers the sets and their label source, the comparison and its version group, the measures reported apart, the records kept, and whether replay is valid.

## Patterns and evidence

Every pattern or claim about decision models carries its evidence label: a primary implemented pattern, a historical observation with its model version, our own synthesis, or an untested extension. A provider's documented capability isn't claimed for a client that doesn't implement it.

IF citing a pattern or a published result, load `references/pattern-evidence.md` and return each cited pattern or result with its evidence label and the capability profile it needs. The claim carries that label.

## The driver

Some facts hold only on the engine a model runs on: how a request carries its state and reference, how many requests a piece costs, how an in-between answer is routed, the order a Choice's options reach the model, which primitives it sends, what a saved report keeps and how cases are run. They are driver facts, not standards for decision models.

A design and its proof plan name each driver fact the model depends on, read from that engine's own documentation at the version the model runs on, and account for each, or name it as a gap. A fact a provider documents but the engine doesn't implement isn't one the model can depend on.

## Signs you skipped it

- One Choice whose criteria pack several requirements, or coexisting defects made to compete as its labels.
- A filter asked as one big question across all its labels, instead of a tree of small ones.
- Examples pasted into a question's wording, where the rulebook's reference should carry them.
- A reference example that is a scored case's text, or carries a case's expected answer.
- A question that asks for the surface features of the owner's boundary (commands, files, names) instead of the boundary, or a wrong meaning "fixed" by splitting it into more questions.
- A paid run spent before the ruled cases were read against the questions on the state the model receives.
- A pass on a "no" about text that was cut or never loaded.
- A lexical or label check deciding a verdict the standard asks to be read.
- One bar across question types, or a band copied without its inequalities.
- A weighted average over mandatory facts, or a veto averaged away.
- "Uncertain" with no route anyone reads, or a failed request counted as a no.
- A missing antecedent read as an absent property.
- An accuracy claim from findings alone, or from a model's probability.
- A comparison across model versions, or a threshold retuned on held-out cases.
- "Verified" on a parent label.
- A provider feature claimed for a driver that doesn't implement it.
