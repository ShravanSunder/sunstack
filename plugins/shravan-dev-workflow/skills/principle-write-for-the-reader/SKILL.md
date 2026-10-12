---
name: principle-write-for-the-reader
description: "Use when writing a design, code, or an explanation someone else must follow: a reviewer, a future maintainer, another agent, the owner tomorrow. Write so a reader with no context can restate it and find where to correct it."
disable-model-invocation: true
---

# Write for the Reader

**Apply when** you write a design, code, or an explanation someone else must follow: a reviewer, a future maintainer, another agent, the owner tomorrow.

**Rule.** Write so a reader with no context can restate it and find where to correct it. Plain words; the conclusion first, then the reasoning; one idea per paragraph; names that say what things do. Order by what the reader needs: purpose, then meaning, then procedure. Use a picture where structure, flow, or state matters. Before adding a layer, a section, or a piece of state, ask whether it lowers reader load elsewhere by at least as much as it adds.

**Why.** Every reader pays for every line. Writing that makes the reader reconstruct the author's path hides mistakes from the people best placed to catch them. Code and designs are read far more often than they are written.

**The test.**

1. Could a cold reader restate the main point in one sentence after thirty seconds?
2. Can they find the place to disagree?
3. Does each section, layer, or name earn its reading cost?

**Distinct from.**

- `principle-shared-mental-model-first`: a clear write-up can still describe the wrong model; a read-back with the owner checks the picture.
- `principle-separation-of-concerns`: when the difficulty comes from one module doing several jobs, fix the structure, not the prose.

**Applied means** you name what you cut, reordered, or drew, and the reader question it answers.

## Worked case

A design comes back "ready" at 1,700 lines across five files with no diagram, and the reviewer can't find the component boundaries without reading all of it. Better: a one-paragraph summary and a component diagram up front, then one section per decision, with detail moved to references. The reviewer finds the first real flaw in minutes instead of an afternoon.

## Overkill

When a simple module already makes its flow and ownership clear, rearranging it to look simpler only creates reader work. A two-line fix needs no diagram.
