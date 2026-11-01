# Write for the Reader: layered detail

This reference owns the shape of a document a person reads in layers: what each layer holds, what stays in sight, how a folded part is labeled, and when a guided path earns its place. It is about people reading. Agents read every layer either way.

Three moves are involved, and they differ. Ordering puts the answer before the detail. Splitting breaks an explanation into pieces that each answer one question. Hiding folds a piece behind a control or a link. Ordering and splitting lower what a reader has to scan. Hiding has a cost: a folded fact is less visible and takes a click, and a reader comparing two things needs both in view. So order first, split second, and hide last, only what this reader may skip.

## The four layers

Write each chunk of a document, and the document as a whole, in this order:

1. **The answer**, to the question the chunk exists for, in the reader's words, with the assumption, risk or unknown it leans on.
2. **One view** that shows the relationship: the diagram or table whose question this chunk answers.
3. **The facts that govern it**: conditions, thresholds and failure cases, all open in the chunk.
4. **Optional depth**: rationale, evidence, derivations and examples, each behind a label that says what is inside.

A reader who stops after layer 1 knows the answer and what it rests on. One who stops after layer 3 can act on it. Layer 4 is for the reader who wants to check it.

## What stays in sight

Governing conditions, thresholds, failure obligations, risks, unknowns and the facts a reader compares stay visible, which means shown in the chunk, not folded. Only the reasoning or evidence about them may fold away. A failure obligation and its threshold stay open; the evidence for the threshold can sit in a block labeled with the case it explains.

Put compared facts side by side, in one table or comparison, never in separate folded blocks the reader has to open one at a time.

## Labels that predict their contents

A reader decides whether to open a folded part from its label alone. Name what is inside: "Evidence for the 250 ms budget", "Why retries stop at three", "The three failure cases this rule covers". "More", "Details" and "Notes" tell the reader nothing, so they either open everything or miss the part they needed.

## Staged diagrams

When one picture would carry too much, stage it: the whole map first, then one slice of it drawn larger, then the detail of one part. Each stage adds to the picture the reader already holds, so they assemble one model. Several unrelated figures that each redraw everything at a different zoom make the reader do the assembly.

## The same layers from a skill to its reference

The layers hold across files too. A skill's description says when it applies. Its `SKILL.md` holds the decision every use needs. A reference holds the next layer down, in the same order as the step that calls it. A reader who stops at any layer has a complete answer at that depth, and each layer below adds detail without changing what the layer above said.

## Walkthrough or outline

A walkthrough is for a question whose answer crosses documents, or that needs an order the documents don't give. A path through one file's own headings, in their own order, is an outline, and a page's outline and Pages menu already give the reader that. A path through one file in a different order still earns a walkthrough when it answers a named question. A failure walkthrough that visits a Program Design file's binding, call path and failure sections in the order the failure travels is one.

## Examples

**Bad: the decisions page given a walkthrough.** A design set's decisions page is one file whose questions are answered in its own order, row by row. A walkthrough that stops at each heading in turn repeats the page's outline and adds a control the reader has to learn. The owner asked why a single file had a walkthrough at all. Better: no walkthrough on that page. A walkthrough appears where a question crosses files, such as "how does a plan change mid-delivery", which visits the situation, the run, the plan record and the plan change view in four places.

**Good: the 1,700-line design, layered.** The principle's own example, seen as layers: a one-paragraph summary of what changes and why is the answer; the component diagram showing who owns what is the view; one section per decision carries the governing facts; detail moved into references is the depth. The reviewer reads the top two layers in a minute and opens a decision only where it matters.

Before you hand the document over, check it as its reader would: the opening of each chunk answers its question on its own, every folded part's label predicts what is inside, and nothing the reader must obey or compare is folded away.
