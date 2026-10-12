---
name: principle-domain-meaning-first
description: "Use when a new noun, state, or stored field appears, one word is doing two jobs, or two sources use different words for what may be one thing. Define what each term means, what makes two of them the same, and what changes its state."
disable-model-invocation: true
---

# Domain Meaning First

**Apply when** a new noun, state, or stored field appears; one word is doing two jobs; or two sources use different words for what may be one thing.

**Rule.** Define each important term by what it means to the people who use it:

- what it refers to;
- what makes two of them the same thing (its identity);
- what changes its state.

Use one word for one meaning everywhere: the conversation, the spec, the code, the screen. When a word covers two meanings, split it. When two words name one thing, pick one. Names are promises: a name says what the thing does and where it belongs.

**Why.** A word with two meanings lets two people agree and build different things. A stored field whose meaning shifts silently corrupts everything stored before. Fixing a meaning early is a rename; fixing it after it is in schemas, APIs, and stored data is a migration.

**The test.**

1. Can you say what makes two of these the same thing?
2. Is any word used for two different things, or two words for one?
3. Would a reader guess what this name does without reading its body?

**Distinct from.**

- `principle-types-and-trust-boundaries` picks a representation that keeps a meaning; this card fixes the meaning first.
- `principle-one-owner-per-truth` decides who writes a truth; this card decides what the truth is.

**Applied means** you name the term you defined, split, or merged, and what it changed downstream: a type, a field, an identifier, a label.

## Worked case

An experiment log reuses the ids X8 and X9 for different runs on different days. A later comparison joins results from two runs under one id and draws a conclusion from mixed data. Better: define what a run is and what makes two runs the same (configuration, date, attempt), and make the id carry that identity, so an id never names a different run. The same move applies to a status like "done" that means both "the process exited" and "the terminal is waiting for input": two meanings, two states.

## Overkill

When an authoritative glossary or contract already fixes a term and nobody uses it differently, reopening its meaning adds nothing. Don't rename a stable public API for taste.
