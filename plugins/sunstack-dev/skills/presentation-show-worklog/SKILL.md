---
name: presentation-show-worklog
description: "Use when the owner explicitly requests a work-log HTML page or asks to refresh one. Not for routine logging, checkpoints or progress replies."
disable-model-invocation: true
---

# Presentation: Show Worklog

A work-log page is a dated view of recorded work through a stated cutoff, with two reader destinations. The view answers four questions; the full account holds every record in the declared snapshot. Step 2 decides whether the view links into an existing full account or a companion is written. The four question sections are a frame, not a form: each topic is explained once, under the question it answers, with the view its evidence earns, and in plain prose when no view fits. The log owns the facts; it is evidence, not the page's outline. `practices-show-me-your-work` owns ongoing tracking. `presentation-html` owns the binding, the composition inside this skill's page contract, and the check.

## 1. Check the request

Create or update a page only when the owner explicitly requests a work-log HTML page, asks to refresh one, or explicitly invokes this skill. None of these authorizes a page:

- loading this file from another skill;
- starting work, reaching a checkpoint or stopping;
- an existing page;
- finding an owner decision.

A request covers the requested build only; it does not enable automatic refreshes. Without that request, return the log reference or progress in the current conversation and finish without creating or updating HTML.

A page request authorizes reading its source and writing the view and permitted companions. It does not authorize writing summaries, missed rows, preparation proof or checkpoints back into that source. Report source gaps in the account rather than repairing the history to complete a page.

## 2. Read and account for the evidence

Take the source and the requested page scope, including any already inspected capture, cutoff and open state. The source is the work's Router project and tag, permitted entries files, or an explicitly supplied dated report or full account.

MUST load `references/read-and-summarize.md` and return:

- the reused or reconstructed snapshot and its topics;
- the selected evidence and its scope;
- the claim inventory: every recorded check or proof claim, each with its target, exact result and limit;
- the material decisions and relied-on assumptions, with their current state;
- the backing and coverage limits;
- the outstanding owner decisions;
- the permitted page destination.

Missing or unreadable evidence is a named gap; do not rebuild from memory.

Then settle where detail lives. Reuse a stable full account at the snapshot's cutoff when it carries the backing evidence, and return its path and existing anchors. Otherwise plan a companion, and return its planned path and the `entry-<row-id>` anchor of every row in the snapshot.

This step writes nothing.

Completion: the snapshot, its topics, and the full account's path and destinations, existing or planned, are returned.

## 3. Build the pages

The view has four sections, in this order, each with its tone and icon override (`stories.md#sections` at the page's binding). They are the owner's adopted house style for work-log pages.

| Section | The question it answers | Tone | Icon override |
| --- | --- | --- | --- |
| For you to decide | open owner choices and what waits on each, with no invented decision when none is recorded | `question` | `user` |
| What's done / what's next | each started part, what its result means, the checks and acceptance behind its status, and the next work or blocker | `note` | none |
| What changed and why | consequential changes, corrections, shortcuts, decisions and relied-on assumptions, with their reasons, costs, who made each call and the authority behind it | `decision` | none |
| What was verified, and what was missed | checks, results, target and version, exclusions, acceptance, observations without a verdict, second-hand reports and unresolved misses | `note` | `test-tube` |

Typed-decision routing (`holds`, `record=`) is for typed decisions, never for styling these sections or their items.

Each topic is one section item under the section whose question it answers. Its face, in order:

1. an `h4` title;
2. a badge row (`small-parts.md#short-status-labels`), only for a status or consequence chip the source supports;
3. one or two sentences of outcome and next work;
4. its backing-evidence links into the full account, a decision page or a receipt.

Detail lives once, in the full account, and the item links to it rather than repeating it. A decisive excerpt beside its claim is evidence, not repeated detail; everything else links. A separately labelled related link may point to another item or row on the view. After the face, an item may carry explanatory paragraphs, a Trace or a native disclosure.

The structure frames the explanation and never replaces it. A topic with no evidence for a badge, a Flow or cards is plain prose under its title. A topic that fits no view is still explained under the section whose question it answers. A minor topic gets a short item, or a sentence inside its section's item; it is never left to the full account alone. Three excuses fail here:

- "It doesn't fit a template, so the full account covers it" drops the topic from the view.
- "It's minor, and the page is long enough" drops the topic too.
- "The face looks bare without a badge" invents a fact.

Explain the material decisions agents made and the assumptions the work relies on under What changed and why. Each one shows:

- the actual choice or belief, and who made it;
- its reason, and its material cost or consequence;
- its authority, or the evidence gap where none is recorded;
- the work that depends on it.

Whether one also appears under For you to decide follows the membership rule in `section-views.md`. Name missing rationale or cost evidence rather than inventing it. Keep later corrections and settlements current; incomplete source coverage is a named gap. An agent's core design choice belongs here as much as a routine one. Name each material correction and each relied-on assumption individually; a category such as "other corrections" explains none of them.

Work in this order:

1. **Assign sections.** Assign each topic from step 2 to its section, using the table above.
2. **Bind.** MUST load `presentation-html` once each topic has its section, before writing either page. Return:
   - the binding, with its trust choice;
   - the guide references this step cites (`stories.md`, `small-parts.md`, `maps.md`, `tables.md`, `traces.md`, `cards-and-callouts.md`) and any the remaining forms need;
   - its composition and check route.

   The section table, the item face and the section views in this step are the page contract `presentation-html` keeps.
3. **Choose each item's view.** MUST load `references/section-views.md` and return, for each item:
   - its section;
   - its face: the title and its link, each badge with the source fact behind it, the outcome sentence, and its backing-evidence and related links;
   - its view: plain prose, a Flow, before and after cards, or verification rows, with the source fact that earns it;
   - for each verification row, its planned links, and each ordered sequence that needs a Trace in the full account.
4. **Write the companion, if planned.** IF step 2 planned a companion, load `references/full-account.md`, write the companion with the Traces step 3 planned, and return:
   - its path, its section groups and the topics in each;
   - the `entry-<row-id>` anchor of every row it carries, and each Trace's anchor;
   - its provenance and cutoff lines;
   - each row it could not carry, with the reason.
5. **Write the view.** Open with the work, the date and the cutoff, then the recorded outcome that changes how the reader uses the page, with that outcome's target and limits in the same claim. The four sections and their items follow.

When reusing a historical Story, keep its stable `story_<key>` destination and each cited row's `entry-<id>` destination, and link to an item instead of repeating its body elsewhere.

For an ordered account, use explanatory Trace steps for meaningful actions, findings or decisions, not raw log rows.

- **Select first.** Before composing each step, select its material claim, the shortest decisive supplied excerpt, and the evidence scope.
- **Attach the evidence.** Put that excerpt beside the claim, with its attribution and limit. A link to the entire record is optional depth, not the evidence attachment itself.
- **Show technical material.** Display selected commands, source, configuration, JSON or diffs in the matching guide's code/diff view, and use inline code for identifiers. Displaying commands does not authorize executing them.
- **Invent nothing.** Do not invent evidence or code that a narrative-only observation doesn't supply.
- **Width.** A Trace whose steps hold text, including quoted excerpts, uses Reading width. A Trace with rich evidence (code, diffs, tables or images) uses Canvas (`traces.md`).

A Trace lives after an item's face or in the full account.

Build with the loaded `presentation-html` workflow. Return the view, and any companion, with its chosen views, binding, delivery method and static checker result.

Before returning, check each of these:

- each topic from step 2 is named with the item that explains it and its section;
- every badge, Flow and before-and-after pair is named with the source fact behind it;
- for each claim in the inventory, its row (or permitted group) is named, and its status, target, exact result and limit match the source;
- the verification table carries its layout marker and three columns, with no authored CSS;
- every backing-evidence link resolves;
- when the companion was written, its anchor count equals the snapshot's row count;
- each material decision shows its actor, reason, cost and authority;
- each relied-on assumption shows its dependent work and what would settle it, or the named source gap;
- the owner can inspect the decisive evidence without reading the archive.

Repair the missing or overloaded view. A passing checker establishes markup, not understanding or runtime behavior.

Completion: every check above holds, and the static check passed for each page written, or its failure is named.

## 4. Return the requested snapshot

Return:

- the view's link;
- the full account's link, or the existing account it reused;
- the log cutoff or entries-file positions the page shows;
- the checker result for each page written.

State any gap that affects opening or trusting a page. Reading a copied check does not make it first-hand. A page does not accept work, settle an assumption, authorize publication or change the log's history. Continue tracking without refreshing this page until the owner asks again.
