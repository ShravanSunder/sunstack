# Check: Chunk and Coverage

This check owns what the rule reads: whether its chunk is named with its edges, chosen for a reason, limited to the folders its standard governs, honest about what it didn't read, and repaired where the text is collected. Whether a sampled state holds the decisive content each question needs is `decision-model-review`'s state-and-evidence check; this one reads the chunk's design and its denominator.

**Inputs:** the rule's chunk design (subject, denominator, edges, fields, budget, and the reason for its chunk choice); the evidence kind and any `select`, `within` or filter gate in the config; the evidence print over the denominator, with its file counts; at development and later, the report's file counts, results and filter answers.

**Return:** a check record, in the review schema's shape.

**Complete when:** the chunk design and every item below were read against the config and the print. Without the print the check is `partial`, naming it.

| item | fails when | bad control | smallest correction |
| --- | --- | --- | --- |
| chunk named, with its edges | the design doesn't state the subject, the denominator, the one-hop edges or the budget, or the print shows a field the design doesn't name | a section rule whose design says "sections" but not which folders, or whether loaded files are read | state each part, and show it on the print |
| chunk chosen for a reason | the rule judges every piece of a shape when most pieces of that shape aren't what its standard governs, with no selection or gate; or it asks a model to pick pieces whose shape already decides them | a product-workflow rule asked of every section of every general skill, headings, rationale and lookup tables included, when it governs only sections that tell the reader to carry out steps or commands | add a one-question selection on the kind (shipped), or a gate in the rule; drop a selection where the shape decides; a selection that needs more than one question waits for the engine, under `lint-contract` |
| general skills only | a rule whose standard is for skills meant for any repository has no filter gate, or gates on a folder-name list, or on a filter whose own review isn't `ready` for this stage | `only_when` absent, so a product's own skill is judged as if it were general | gate with `only_when` on the kind filter's general, role and domain labels |
| unread is shown apart | the denominator isn't stated precisely enough to derive which files went unread, or a skipped folder, an unresolved selection candidate or a cut piece would be reported as passed | a full run whose filter left nine folders unsure, reported as "no findings in those skills" | state the denominator; list each skipped, unresolved and cut piece as a gap |
| a misread fixed where collected | a piece misread because the kind collected the wrong text is repaired in a question's wording or criteria instead of in the evidence project | criteria told to "assume the options follow the lead-in" because the kind sent the lead-in without its list | fix the kind or field so the state holds the content; leave the question unchanged for that comparison |
