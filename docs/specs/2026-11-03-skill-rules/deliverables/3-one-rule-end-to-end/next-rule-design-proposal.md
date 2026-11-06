# Proposal (draft, not decided): how the product-workflow rule earns its warning

Status: Lead draft, 5 Nov evening, for the step after step 3's scope decision. Nothing here is adopted, and the rule set doesn't change until the owner decides.

## What two design rounds showed

The rule (`general-skill.overfits-to-product-workflow`, standard K002) asks one combined question: does this section send the agent into one product's own workflow? Two rounds with the Jev Advisor, on 26 real development passages, never got it adoptable:

| Round | Best zero-false design | Right | Unsure |
| --- | --- | --- | --- |
| 1 | two separate questions (application procedure? only the shared toolkit's?) | 17 | 9 |
| 2 | one question per source line about who owns that operation | 10 | 16 |

The Advisor's diagnosis (round 2 report): the standard's sentence covers one thing, sending the agent into a product's workflow ("routes no step, branch or load into one product's own application workflow: its own procedures, run commands, state files or machine paths"). The owner's U16 rulings added a second thing: a concrete worked example of a product's own artifact nudges (row 4), and so does teaching text that quotes a real product mistake (row 5). One question can't measure both reliably.

## Proposed: two standards, two rules

| | Standard (proposed wording, for the owner to edit) | Pieces it judges | Owner rows it carries |
| --- | --- | --- | --- |
| A, today's K002 narrowed | A skill meant for any repository routes no step, branch or load into one product's own application workflow: its own procedures, run commands, state files or machine paths. | steps, branches, loads | 1, 2, 6, 7, 8 |
| B, new | A skill meant for any repository teaches with no concrete worked artifact or procedure of one product, real or made up, unless it is labelled as an example; quoting a real product mistake counts. | worked examples and quoted text | 3, 4, 5, 9 |

Each rule gets its own questions, scenarios and bars. Today's 40 labelled development passages split between them by the labels already given, with no relabelling; the six set-aside passages stay unseen until each rule's final run.

## Owner decisions this needs

1. Split K002 into A and B as above, or keep one rule (and accept that it may not become reliable).
2. The names of the two rules (the owner sets rule names).
3. Where a warning must point: at the offending command itself, or anywhere in the labelled block (already on the scope page as a proposal).
4. A meaning the data raised: line 14 of `ops-observability-stack` hard-codes `~/dev/ai-tools/observability/README.md`, the shared stack's local path. Row 8 says the shared stack is quiet; the model consistently points at that line instead of line 17. Is a hard-coded machine path to the shared toolkit quiet, or a leak?

## Not proposed

No engine change. The two-stage line-finder stays a sketch: its first real test returned "none". The 908-line catalogue stays a named blocker for whichever rule judges it.
