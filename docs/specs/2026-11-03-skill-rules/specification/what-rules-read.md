# what-rules-read: the text each rule judges

**Reader:** a rule's writer, and an agent puzzled by a nudge. **Question:** what text did the rule read, and is that the text its standard is about? **Changes when:** a rule's chunk or the evidence collection changes. Requirements: [what-rules-read](../requirements/what-rules-read.md). Entities: [E6 Chunk](entities.md#e6), [E1 Skill](entities.md#e1).

<a id="p5"></a>**P5 · Problem.** 117 of 195 wrong nudges on 30 Oct came from what the rule read. No current piece reads table rows, so `practices-cleanup` line 40 was invisible to the sentence-level rules; `guidance.positive` judged whole-guidance balance one sentence at a time.

<a id="o5"></a>**O5 · Outcome.** For any nudge, the agent can see the exact text the rule read and the text the model saw, and that text is the text the standard is about.

<a id="r22"></a>
### R22 · A rule declares its chunk and edges

`kind: obligation · capability: what-rules-read · links: U20, E6, C1, C6, V22 · status: authorized`

Each rule declares its subject, the relationships it follows (one hop unless it says more), whether a section includes its descendants, and what a cut or an omission means for its answer. The collection gathers exactly that, and the report shows collected and model-visible text apart.

<a id="r23"></a>
### R23 · Generalization and product-leak read every section

`kind: obligation · capability: what-rules-read · also serves: skill-kinds · links: U21, E6, V23 · status: authorized`

On every skill of kind **any repository**, product-leak's chunks (and generalization's, until R17's merge is decided) together cover every section of `SKILL.md` and its references, from the text under the title down, tables included, each with the openings of the files its own text loads, plus the description.

<a id="r24"></a>
### R24 · A rule's chunk is the size of its standard

`kind: obligation · capability: what-rules-read · also serves: rule-tests · links: U22, E6, V24 · status: authorized`

A standard about guidance as a whole is judged on the whole guidance; a step's standard on the step with its body; a reference's on the reference with its outline. When a wrong nudge traces to what the rule read, the fix lands in the collection, and the rule's question is unchanged by it.

<a id="c6"></a>
### C6 · What the rule read

`kind: contract · capability: what-rules-read · links: R22–R24 · status: authorized`

For any result, the agent can see the chunk's subject span, each followed span, and which of them the model saw.

### Proof obligations

| V | For | What decides pass and fail | Reference |
| --- | --- | --- | --- |
| <a id="v22"></a>V22 | R22 | every rule declares all four; every report shows collected and seen apart | the rule files; a run's report |
| <a id="v23"></a>V23 | R23 | `practices-cleanup/SKILL.md:40` (a table row) and `ops-observability-stack/SKILL.md:17` (a load) are both read; no section of a general skill is outside every chunk | the 1 Nov run's two right nudges; a per-section coverage count |
| <a id="v24"></a>V24 | R24 | `guidance.positive`'s chunk is the whole guidance; its 30 Oct wrong nudges caused by sentence pieces are quiet after the collection fix | the 30 Oct dispositions |
