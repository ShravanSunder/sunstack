# Check: State and Evidence

This check owns whether the model's state holds what its questions need. Its standards are `domain-decision-models`' State and evidence section.

**Inputs:** the encoded state, or its builder, for sampled good, bad and near-miss pieces; each question's evaluated field; the shared reference; the labelled development cases, never held-out ones. For a lint rule, use `evidence_seen` from a kept report where one exists, and the evidence print otherwise, with the rule's chunk design (its subject, denominator, edges and budget).

**Return:** a check record, in the schema's shape.

**Complete when:** every sampled piece's state was read against every item below, or the check is `partial` or `blocked` with its missing input.

Read the actual encoded state, not the evidence listing alone. A listing shows what was picked; the state is what the model saw.

| item | fails when | bad control | smallest correction |
| --- | --- | --- | --- |
| decisive content present | a sampled piece's state lacks the antecedent, the attached block or the opening its question needs | a branch lead-in sent without the action list under it, then judged "no action" | repair the evidence cut first, with the questions unchanged; name the gap where the content can't be included |
| missing content named as a gap | a missing part is read as the property being absent | an unresolved "that" judged as "no condition" | route a missing antecedent to an evidence gap, never to a finding |
| evaluated field named | a question doesn't name the field it judges | a task that says "read the piece" | name the field in `check`, `against` or `context` |
| the chunk holds what each question needs | a question's proposition depends on a file the subject loads, its enclosing section or a sibling, and the state lacks it | a placement question asked of the section holding line 17 without `agentstudio-loop.md`'s opening in its `targets`: the line alone only says "load" | add the edge to the kind, one hop, and show it with an evidence print before any question relies on it |
| cap isn't completeness | a size cap is cited as showing the evidence is complete | "the field fits in 12,000 characters, so it holds the step" | check the field against a real long piece |
| collected and model-visible completeness both checked | the review reads the collected fields but not what the model saw after the cap, or reads a cut field as whole | a pass on a section whose sent state lists `body` under `"cut-fields"`, accepted without reading what the cut left out | read the state's `"cut-fields"` and each loaded file's `opening_cut`; a result reached on a cut view stays a gap until the decisive content is shown to survive the cut |
| examples aren't cases | a reference example is a labelled case's text, or a near-identical summary of it, or carries a case's expected answer; or an owner's ruling sits in the reference instead of the case set | a kind filter whose examples hold the real descriptions of two skills it is scored on, each with the label it expects; both score right | rewrite the example from the standard, keep the case and its label, and compare every example with every case again |
| no unused material | the state carries spans, hashes, byte offsets or other material the judgment doesn't use | a state with a source span and byte offsets beside the line | keep that material in the record and out of the state |
| responsibilities in place | content sits in a question's task, or policy (thresholds, actions) sits in the state or the criteria | a task ending "and if so, escalate to legal" | move content to state, answer meanings to criteria, actions to code |
| the subject is data | the subject's imperatives, quotes or self-labels were stripped, or are treated as instructions to the reviewer | a step's "this is complete" taken as the answer | judge the text as data; keep it whole |
