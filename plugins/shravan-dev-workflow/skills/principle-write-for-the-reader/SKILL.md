---
name: principle-write-for-the-reader
description: "Use when writing a design, code, an instruction, or an explanation someone else must follow: a reviewer, a future maintainer, another agent, the owner tomorrow. Write so a reader with no context can answer their question quickly, restate the point, and find where to correct it."
disable-model-invocation: true
---

# Write for the Reader

Code is communication, and so are designs, instructions, and explanations. They are read far more often than they are written, mostly by someone without your context: a reviewer, the next engineer, another agent, the owner tomorrow. Writing for the reader means they can answer the question they came with (what is this for, where does this value come from, what can change it, what do I need to decide) quickly, and find the place to disagree. Every line, layer, and piece of state costs the reader something. Jargon, process narration, and repetition don't just waste their time; they hide mistakes from the people best placed to catch them.

## How to think it through

**Start from the reader's question.** What will they decide or do after reading? An explanation that doesn't help the owner make the choice in front of them has failed, however accurate it is.

**Order by what the reader needs:** purpose, then meaning, then procedure. Lead with the conclusion, then the reasoning; show the normal path before the exceptions. A reader who meets the mechanics before knowing what they are for can't tell which parts matter.

**Use words the reader already uses.** Explain a boundary by what it owns and what crosses it ("the plugin talks to the VM only through one interface we can swap"), not by a label like "adapter seam". Keep a specialized term only when it carries a stable meaning the reader knows.

**Say what to do, not only what to avoid.** An instruction that lists prohibitions leaves the reader, especially a model, to guess the desired path and fixate on the forbidden one.

**Let names do the explaining.** Important things get names of two or more words that say what they do: `classifyBillsByVendorCategory`, not `processData`. Name the effect, not the mechanism. Name files and folders for their responsibility. Then comments can explain why, rather than restating what the code says.

**In code, count what the reader has to hold.** Two costs: layers to trace between a question and its answer, and state to keep in mind. Collapse layers that only pass calls through. Keep state as narrow as you can: locals over fields, fields over module state, and module state over globals. Derive values instead of keeping copies in sync. State an invariant once, where the boundary is, not in every consumer.

**Draw it where structure matters.** Ownership, flow, and state are clearer in a small diagram than in paragraphs. Use one view per question; a diagram that tries to show everything shows nothing.

**Say each thing once.** Give a rule or a decision one home and link to it elsewhere. Cut narration of how the work went and summaries that repeat the section above. Point the next contributor to the existing code that already does the thing, so they don't build a second one.

**The hard call is what to leave out.** Completeness is cheap to write and expensive to read. Keep what the reader needs to understand and decide; move detail to references they can open when they need it. Three things never get cut for brevity: the assumption the work leans on, the risk, and what is still unverified. Put them near the top, where a skimming reader will see them.

**Write only commands and examples you have run or read at their source.** A command with the wrong option name or order, written from memory, sends every reader into the same failure. Check the tool's help or an accepted run first.

**Test it on a cold reader.** After thirty seconds, can they restate the main point in a sentence, answer "where does this come from and what can change it?", and point to the line they would correct?

## Example: the 1,700-line design

A design came back marked "ready" at 1,700 lines across five files, with no diagram. The reviewer couldn't find the component boundaries without reading all of it. Better: a one-paragraph summary of what changes and why, a component diagram showing who owns what, then one section per decision, with detail moved into references. The reviewer found the first real flaw in minutes instead of an afternoon.

IF the case in front of you doesn't match the design example, or you are reviewing someone else's writing for its reader, load `references/example_scenarios.md` (scenarios, simplest first: `processData`; "Adapter seam"; the rule in five places; the command written from memory; the instruction that said what not to do; Six layers to find a value; the explanation that didn't help choose) and return the closest scenario and how its move applies to your case.

## When it doesn't apply

When a simple module already makes its flow and ownership clear, rearranging it to look simpler only creates reader work. A two-line fix needs no diagram and no summary.

## Signs you skipped it

- The main point arrives in the last paragraph.
- Names that need a comment to explain what they are.
- Terms the reader doesn't use, left undefined.
- Walls of text where a small diagram or table would do.
- The same rule restated in several places, or narration of how the work was done.
- A reviewer asking "what is this for?"

A clear write-up can still describe the wrong model; checking that the picture is shared is `principle-build-the-shared-model-first`. When the difficulty comes from one module doing several jobs, fix the structure with `principle-separate-the-concerns`, not the prose.
