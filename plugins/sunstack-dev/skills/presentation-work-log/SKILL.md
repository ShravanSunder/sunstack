---
name: presentation-work-log
description: "Use when the owner explicitly requests a work-log HTML page or asks to refresh one. Not for routine logging, checkpoints or progress replies."
disable-model-invocation: true
---

# Presentation: Work Log

A work-log page is a requested explanation of recorded work through a stated cutoff. The log owns the facts; the page helps the owner understand the problem, what changed, why it matters, and what remains uncertain. `practices-show-me-your-work` owns ongoing tracking; `presentation-html` owns HTML composition and component selection.

## 1. Check the request

Create or update a page only when the owner explicitly requests a work-log HTML page, asks to refresh one, or explicitly invokes this skill. Loading this file from another skill, starting work, reaching a checkpoint, stopping, having an existing page, or finding an owner decision does not authorize a page. A request covers the requested build only; it does not enable automatic refreshes. Without that request, return the log reference or progress in the current conversation and finish without creating or updating HTML.

## 2. Read and account for the evidence

Take the work's Router project and tag, or its permitted entries files, and the requested page scope. MUST load `references/read-and-summarize.md` and return the cutoff, current summaries, their backing and coverage checks, outstanding owner decisions, and the permitted page destination. Missing or unreadable evidence is a named gap; do not rebuild from memory.

IF an owner decision remains open in the requested page, load `../../shared-references/owner-decision-brief.md` and return the choice, tradeoffs, recommendation and dependent work to explain beside its answer control. A recommendation or unanswered control never becomes an owner decision.

## 3. Explain the work

Use four ordinary `h2` headings in this order:

1. **For you to decide:** open owner choices, their reasons and consequences, with no invented decision when none is recorded.
2. **What's done / what's next:** each started part, what its result means, the checks and acceptance behind its status, and the next work or blocker.
3. **What changed and why:** consequential changes, shortcuts and decisions, their reasons and authority; distinguish owner/design calls from agents' own calls.
4. **What was verified, and what was missed:** checks, results, target/version, exclusions, acceptance, second-hand reports and unresolved misses.

Within those headings, write a connected explanation in the owner's words. Use meaningful `h3` headings and the normal heading-based contents navigation. Explain the concrete problem and its consequences before the procedural detail. The stored summary fields supply evidence and meaning, not a repeated HTML row template.

Before composing each substantial topic, identify what the owner needs to understand or judge and the relationship the log actually supports. Give `presentation-html` that view requirement, rather than selecting a component for decoration:

| Work-log topic | What the view must make understandable |
| --- | --- |
| An open owner choice | The alternatives, their gains and costs, and what waits on the choice, compared on the same terms before its answer control; a settled decision shows its outcome and supported rationale without asking again |
| Progress across connected parts | Dependencies, the blocker and the next meaningful boundary; independent status facts can stay as a short list |
| A consequential change | Before and after behavior, flow or ownership, including the reason and affected consumer; distinguish proposed behavior from observed behavior |
| Verification | Each claim beside the actual target, result and remaining gap; show the order when the sequence of checks explains the conclusion |

Choose one primary view for the relationship that matters in a topic, with a short explanation beside it. For a complex relationship, show the overview and then the relevant slice instead of one crowded drawing. If the evidence does not establish a connection or before-state, mark it unknown rather than inventing it. A simple fact needs no diagram.

Keep each summary's stable `story_<key>` destination and each cited row's `entry-<id>` destination; link to an item instead of repeating its body elsewhere on the page.

Make relationships visible with supported diagrams when they explain the flow, ownership, state or failure more clearly than paragraphs; use comparisons, traces, code and evidence disclosures when they help the reader inspect the work. Keep the governing failure rules and unknowns visible, and put optional depth one action away. Do not require Story/section cards, Happened / For you / Next rows, section counters, or a separate Map. Do not replace those wrappers with a different repeated card layout.

MUST load `presentation-html` and return the requested page composed with its view chooser, matching component guide, contents navigation, delivery method and static checker result. Keep explanatory views next to their subject; a view replaces the prose that merely reconstructs the same relationship. A passing checker establishes markup, not understanding or runtime behavior.

Before returning the page, check that the owner can see the important change, dependency, tradeoff and proof gap without reconstructing those relationships from paragraphs. Repair the missing or overloaded view; adding component counts or decorative cards does not satisfy this check.

## 4. Return the requested snapshot

Return the file link, the log cutoff or entries-file positions it shows, and the checker result. State any gap that affects opening or trusting the page. Reading a copied check does not make it first-hand; a page does not accept work, settle an assumption, authorize publication or change the log's history. Continue tracking without refreshing this page until the owner asks again.
