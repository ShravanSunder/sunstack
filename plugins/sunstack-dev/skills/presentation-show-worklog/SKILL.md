---
name: presentation-show-worklog
description: "Use when the owner explicitly requests a work-log HTML page or asks to refresh one. Not for routine logging, checkpoints or progress replies."
disable-model-invocation: true
---

# Presentation: Show Worklog

A work-log page is a requested explanation of recorded work through a stated cutoff. The log owns the facts; the page groups them into meaningful episodes that explain the problem, what the agents did and why, what changed, and what remains uncertain. The log is evidence, not the page's outline. `practices-show-me-your-work` owns ongoing tracking; `presentation-html` owns HTML composition and component selection.

## 1. Check the request

Create or update a page only when the owner explicitly requests a work-log HTML page, asks to refresh one, or explicitly invokes this skill. Loading this file from another skill, starting work, reaching a checkpoint, stopping, having an existing page, or finding an owner decision does not authorize a page. A request covers the requested build only; it does not enable automatic refreshes. Without that request, return the log reference or progress in the current conversation and finish without creating or updating HTML.

A page request authorizes reading its source and writing the reader and permitted companions. It does not authorize summaries, missed rows, preparation proof or checkpoint writes back into that source. Report source gaps in the account rather than repairing the history to complete a page.

## 2. Read and account for the evidence

Take the work's Router project/tag or permitted entries files and requested page scope, including any already inspected capture, cutoff and open state. MUST load `references/read-and-summarize.md` and return the reused or reconstructed snapshot, selected evidence and its scope, backing and coverage limits, outstanding owner decisions and permitted page destination. Missing or unreadable evidence is a named gap; do not rebuild from memory.

IF an owner decision remains open in the requested page, load `../../shared-references/owner-decision-brief.md` and return the choice, tradeoffs, recommendation and dependent work to explain beside its answer control. A recommendation or unanswered control never becomes an owner decision.

## 3. Explain the work

MUST load `presentation-html` before outlining the page and return the section questions, explanation and diagram jobs, Map associations and Walkthrough decision using its composition patterns and matching guide. Supply the source-supported concerns that connect sections and any ordered question that needs several existing targets; that workflow is reused for the final build.

Open with the work's purpose and consequential recorded outcome or unresolved boundary, keeping the outcome's target and limits in that opening claim. State the snapshot cutoff briefly. Use four ordinary `h2` headings in this order:

1. **For you to decide:** open owner choices, their reasons and consequences, with no invented decision when none is recorded.
2. **What's done / what's next:** each started part, what its result means, the checks and acceptance behind its status, and the next work or blocker.
3. **What changed and why:** consequential changes, shortcuts and decisions, their reasons and authority; distinguish owner/design calls from agents' own calls.
4. **What was verified, and what was missed:** checks, results, target/version, exclusions, acceptance, second-hand reports and unresolved misses.

Within those headings, give each substantive `h3` section one coherent reader question. Explain the concrete problem, the agents' actions and reasons, and the supported outcome beside a diagram of its relevant source-supported relationships. Compose the explanation and diagram together so the text supplies context and interpretation while the diagram exposes the relationship. Keep normal heading-based contents navigation and explain shared content once, linking to it elsewhere.

Before composing each substantial topic, identify what the owner needs to understand or judge and the relationship the log actually supports. Give `presentation-html` that view requirement, rather than selecting a component for decoration:

| Work-log topic | What the view must make understandable |
| --- | --- |
| An open owner choice | The alternatives, their gains and costs, and what waits on the choice, compared on the same terms before its answer control; a settled decision shows its outcome and supported rationale without asking again |
| Progress across connected parts | Dependencies, the blocker and the next meaningful boundary; independent status facts can stay as a short list |
| A consequential change | Before and after behavior, flow or ownership, including the reason and affected consumer; distinguish proposed behavior from observed behavior |
| Verification | Each claim beside the actual target, result and remaining gap; show the order when the sequence of checks explains the conclusion |

Choose one primary view for the relationship that matters in a topic, with a short explanation beside it. For a complex relationship, show the overview and then the relevant slice instead of one crowded drawing. If the evidence does not establish a connection or before-state, mark it unknown rather than inventing it. A simple fact needs no diagram.

When reusing a historical Story, keep its stable `story_<key>` destination; keep each cited row's `entry-<id>` destination; link to an item instead of repeating its body elsewhere on the page.

For an ordered account, use explanatory Trace steps for meaningful actions, findings or decisions, rather than raw log rows. Select each step's material claim, shortest decisive supplied excerpt and evidence scope before composing it. Put that excerpt beside the claim with its attribution and limit; a link to the entire record provides optional depth, not the evidence attachment itself. Display selected commands, source, configuration, JSON or diffs in the matching guide's code/diff view, and use inline code for identifiers. Displaying commands does not authorize executing them. Do not invent unavailable evidence or code for a narrative-only observation.

Keep governing failure rules and unknowns visible, with optional backing detail one action away. Do not require Story/section cards, Happened / For you / Next rows, section counters or another repeated card layout. Where concerns connect several sections, give Map their real explanatory destinations; the outline still follows headings. A Walkthrough follows an actual ordered reader question rather than touring every heading. The loaded HTML workflow owns their composition and the matching guide owns syntax.

Build with the loaded `presentation-html` workflow and return the requested reader with its chosen views, matching guide, contents navigation, delivery method and static checker result. Before returning, check that the owner can understand each section's question, what the agents did and why, and its diagram together; see the blocker and proof limits; and inspect the decisive evidence without reading the archive. Check that Map destinations add associations beyond the outline, any Walkthrough follows its question, and evidence links reach their stated content. Repair the missing or overloaded view. A passing checker establishes markup, not understanding or runtime behavior.

## 4. Return the requested snapshot

Return the file link, the log cutoff or entries-file positions it shows, and the checker result. State any gap that affects opening or trusting the page. Reading a copied check does not make it first-hand; a page does not accept work, settle an assumption, authorize publication or change the log's history. Continue tracking without refreshing this page until the owner asks again.
