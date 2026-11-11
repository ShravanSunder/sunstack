---
name: presentation-work-log
description: "Use when the owner explicitly requests a work-log HTML page or asks to refresh one. Not for routine logging, checkpoints or progress replies."
disable-model-invocation: true
---

# Presentation: Work Log

Explain what the recorded work means: the problem, consequential changes, how understanding developed, what the evidence supports and what remains. The log is evidence, not the page's outline. Group related records into meaningful episodes and give the reader an account they can follow, with evidence where a conclusion needs checking. `practices-show-me-your-work` owns ongoing tracking; `presentation-html` and its matching Demistify guide own supported visual composition and markup.

## 1. Check the request

Create or update a page only when the owner explicitly requests a work-log HTML page, asks to refresh one, or explicitly invokes this skill. Loading this file from another skill, starting work, reaching a checkpoint, stopping, having an existing page, or finding an owner decision does not authorize a page. One request covers one requested build, not automatic refreshes. Without that request, return the log reference or progress in the current conversation and finish without HTML.

A page request authorizes reading the source and writing the requested reader and its permitted companions; it does not authorize adding, correcting or refreshing the source project's log records. Report source gaps and conflicts instead of rewriting the history to make a page complete.

## 2. Read and understand the record

Take the work's project/tag or permitted source files and requested scope. MUST load `references/read-and-summarize.md` and return the source cutoff, provenance and closure interpretation, consequential episodes, claim backing, material gaps, internal coverage account and permitted reader/source-companion destinations. Missing evidence is a gap; do not reconstruct it from memory. Existing summaries are leads to check against the original and later records, not a prerequisite or a format the page must reproduce.

## 3. Organize the explanation

MUST load `presentation-html` before outlining the page and return the section composition, explanation and diagram jobs, Map associations and Walkthrough decision, using its page patterns and matching guide. Supply the concerns or work subjects that connect sections and their real destinations, and any ordered question or journey that needs several existing chunks. This is the composition workflow used again at final build.

Open with the work's purpose and most consequential recorded outcome or unresolved boundary, carrying the report's target and limitations into that claim. A later caveat does not qualify an unconditional success claim in the opening. State the snapshot date/cutoff briefly. Use ordinary `h2` headings in this order, with meaningful `h3` topics inside them and normal heading-based contents:

1. **For you to decide:** actual open owner choices, their consequences and what depends on them; settled decisions are explained without asking again.
2. **What's done / what's next:** meaningful parts and their dependencies, supported results, blockers and next boundaries.
3. **What changed and why:** the episodes that changed behavior, ownership, the plan or the team's understanding, with their reasons and authority.
4. **What was verified, and what was missed:** claims beside their actual targets, reported results, limits, acceptance and unresolved evidence or misses.

Use those questions to organize subjects, not one paragraph or component for every stored row. Several records can explain one step; one consequential record may affect several subjects. Show each explanation once and link to it elsewhere. Omit routine repetition from the reading path while preserving its source and checking whether it changes a conclusion.

Within them, give each substantive section one coherent question about the work. Name what the reader needs to understand, then gather the related actions, decisions, mistakes, corrections and outcomes into that section. Explain who did what and why; a status or test total alone does not explain the work. Keep enough context to understand technical terms and the consequence of the change without opening the archive.

IF an open owner choice needs a decision brief, load `../../shared-references/owner-decision-brief.md` and return the current picture, alternatives, tradeoffs, recommendation and dependent work to explain beside its answer control. No response control or recommendation is an owner decision.

## 4. Compose each part with explanation, diagrams and evidence

For each substantive section, give `presentation-html` its reader question, explanatory content and source-supported relationships to draw. Compose the explanation and diagram together: the text explains the context, agents' actions and reasons; the diagram makes the relevant ownership, change, dependency, sequence or failure understandable beside it. Keep the actual outcome and its remaining limit with that account. A one-line empty status or simple fact is not a substantive explanatory section and needs no fabricated relationship.

For an ordered account of how work or understanding changed, request an explanatory **Trace**: steps are meaningful actions, findings or decisions, not raw log rows. Before composing a step, select its material claim, the supplied excerpt that supports it and that evidence's scope. Distinguish recorded observation, inference, proposal, failure and not-run work. Use the matching guide's Trace composition for the actual markup and attachments; its expandable steps do not replace the section's explanation and relevant diagram with a folded report.

Attach the relevant evidence to the step it supports: a concise quoted observation, comparison, exact code/command/diff or result, and a clearly named disclosure or source link for depth. A record's machine timestamp, full identifier or raw JSON envelope is optional source metadata, not its headline. Keep consequential failure conditions, uncertainty and the current blocker visible; open the step needed to understand a stop rather than hiding its meaning behind a generic title.

A link to an entire source record alone is not the evidence attachment. Include the shortest decisive supplied excerpt beside the material claim, with its attribution and scope; keep the complete record as optional depth. If the source contains no supporting excerpt or linked artifact, say what is unavailable rather than manufacturing one.

A sequence of steps cannot represent every relationship. Use supported flow/sequence/state/ownership views where branches, participants, dependencies or lifecycle matter, and comparisons where alternatives share attributes. Give the renderer the source-supported participants, relations and question to explain. Mark absent relationships unknown; do not invent arrows or code to fill a component. A simple fact can remain prose.

## 5. Present technical material as technical material

Classify material by its meaning, not by the fact that the log stored it as a string. Show source, commands, configuration, JSON or diffs that the reader must inspect or copy in the matching guide's code/diff view, or its fenced-block form for a short excerpt. Use a language label when known and inline code for identifiers in prose. Preserve quoted content and distinguish a verbatim excerpt from an explicitly labelled conceptual illustration. Displaying a command is not permission to execute it.

When an important change concerns an interface, command, configuration or code behavior and the supplied record contains relevant technical material, show that supporting excerpt beside its explanation. Preserve selected source fences as rendered code and identifiers as inline code; do not leave them as literal Markdown inside a raw-text dump. This selects useful evidence, not a quota of code blocks; do not invent code when only a narrative report is available.

Do not substitute a code block containing the entire event envelope for an explained finding with relevant technical evidence. Preserve the complete original log as a source companion; bring the particular material that supports the account into its appropriate Trace step or view.

## 6. Build and inspect the requested reader

Build with the `presentation-html` workflow loaded at step 3 and return the page composed from its section questions, explanations, diagrams and evidence, with the chosen navigation, source carriers, concrete delivery method and static checker. Its page patterns own composition, and the matching guide owns markup; apply the selected references before authoring the constructs.

The primary page is the explanation. Provide one clearly labelled route to the complete source companion and state its cutoff and unavailable linked artifacts. Do not satisfy coverage by displaying every unsummarized row as a long disclosure list, even if the individual rows are folded. Keep selected evidence addressable with original source IDs; a link must reach the evidence it claims to expose, rather than an unrelated headline or unsupported fragment in a raw file.

Before returning, read the page as its owner: can they understand each part's question, what the agents did and why, follow its diagram with the explanation beside it, see the blocker and proof limits, and inspect the relevant evidence without reading the archive? Check that Map's associations reach the related content rather than repeat the outline, any Walkthrough follows its actual question, displayed technical excerpts are in their technical view, and evidence links work. A passing markup check alone does not establish those properties. Perform browser inspection only under the HTML skill's authorized conditions.

## 7. Return one snapshot

Return the reader link, source cutoff and checker result, with gaps affecting opening or trusting it. A page does not accept work, resolve assumptions, authorize publication or change original history. Continue tracking without refreshing the page until the owner asks again.
