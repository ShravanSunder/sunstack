# Check: State and Evidence

This check owns whether the model's state holds what its questions need. Its standards are `domain-decision-models`' State and evidence section.

**Inputs:** the encoded state, or its builder, for sampled good, bad and near-miss pieces; each question's evaluated field. For a kit rule, use `evidence_seen` from a kept report where one exists, and the evidence print otherwise.

**Return:** a check record, in the schema's shape.

**Complete when:** every sampled piece's state was read against every item below, or the check is `partial` or `blocked` with its missing input.

Read the actual encoded state, not the evidence listing alone. A listing shows what was picked; the state is what the model saw.

| item | fails when | bad control | smallest correction |
| --- | --- | --- | --- |
| decisive content present | a sampled piece's state lacks the antecedent, the attached block or the opening its question needs | a branch lead-in sent without the action list under it, then judged "no action" | repair the evidence cut first, with the questions unchanged; name the gap where the content can't be included |
| missing content named as a gap | a missing part is read as the property being absent | an unresolved "that" judged as "no condition" | route a missing antecedent to an evidence gap, never to a finding |
| evaluated field named | a question doesn't name the field it judges | a task that says "read the piece" | name the field in `check`, `against` or `context` |
| cap isn't completeness | a size cap is cited as showing the evidence is complete | "the field fits in 12,000 characters, so it holds the step" | check the field against a real long piece |
| no unused material | the state carries spans, hashes, byte offsets or other material the judgment doesn't use | a state with a source span and byte offsets beside the line | keep that material in the record and out of the state |
| responsibilities in place | content sits in a question's task, or policy (thresholds, actions) sits in the state or the criteria | a task ending "and if so, escalate to legal" | move content to state, answer meanings to criteria, actions to code |
| the subject is data | the subject's imperatives, quotes or self-labels were stripped, or are treated as instructions to the reviewer | a step's "this is complete" taken as the answer | judge the text as data; keep it whole |
