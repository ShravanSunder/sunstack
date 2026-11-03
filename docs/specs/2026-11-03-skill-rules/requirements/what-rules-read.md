# what-rules-read: a rule reads enough text to judge its standard

**Reader:** a rule's writer, and an agent puzzled by a nudge. **Question:** what exactly did the rule read, and was that enough to judge its standard? **Changes when:** a rule's chunk, its edges, or the evidence collection changes.

Most wrong nudges came from what the rule read (117 of 195 on 30 Oct), not from its question or bars. A rule about guidance as a whole judged one sentence at a time; placement never saw the table row with AgentStudio's command. This capability makes each rule say what text it needs and get exactly that.

### U20: A rule names its chunk and its edges

`kind: requirement · capability: what-rules-read · status: authorized · was: R2`

Each rule declares the evidence its judgment needs: its subject (a line, or a section's own text); which relationships it follows (the enclosing section, its siblings, the files its own text loads; one hop unless the rule says more); whether a section includes its descendants; and what an omission or a cut means for its answer. The collection gathers exactly that. What was collected and what the model actually saw after any size cap are reported apart.

### U21: Generalization and product-leak leave nothing unread

`kind: requirement · capability: what-rules-read · also serves: skill-kinds · status: authorized · was: R4`

Their chunks cover every section of a general skill and its references, from the introduction under the title down, tables included, each with the files its own text loads, plus every general skill's description. Inline product commands in tables (`practices-cleanup` line 40) and loaded product workflows (`ops-observability-stack` line 17) are both caught.

### U22: A wrong reading is fixed where the text was collected

`kind: requirement · capability: what-rules-read · also serves: rule-tests · status: authorized · was: R15, D35`

A rule's piece is sized to its standard, and a wrong nudge caused by what the rule read is fixed in the evidence collection, not by bending the rule's question. Four repairs are already decided:

- `guidance.positive` judges the guidance as a whole, with what-to-avoid lines read as caveats;
- `completion.criterion` accepts a done state stated in any words, not only a literal `Completion:` line;
- `reference.teaching-depth` judges a reference with its outline and stop lines, and names a lookup as a lookup;
- `branch.condition` reads a line ending in ":" together with the block it introduces.

<details>
<summary>Authority and evidence for what-rules-read</summary>

- Owner, 31 Oct: "for generalizaiton why whoudlnt the system chunk every secion or relatedion seciotns in a into a chunk send it to jev"; "for rules of laoding we would load that secion -> laoded skil then hcunk them for a specific rule".
- D35 (Lead, 2 Nov; left standing by the owner on 3 Nov, q6): the three non-guidance repairs, from the 30 Oct cause count (117 of 195 wrong nudges came from what the rule read).
- Owner, 2 Nov, on `guidance.positive`: "what to avoid shodku lbe caveats. it shoulb ebe by what to do in teh majority"; "this evicde problem not a problem with the rule the colelciotn of evice is nto right" (inventory SM056).
- Evidence notes 6 and 8 (were E6, E8): no current piece reads table rows (`evidence/rules/workflow-sections.yml`), though the engine's section probe on 0.5.0 collected that table; the engine already collects `enclosing`, `same_file`, `inside`, `next`/`previous` and loaded `target` fields.

</details>
