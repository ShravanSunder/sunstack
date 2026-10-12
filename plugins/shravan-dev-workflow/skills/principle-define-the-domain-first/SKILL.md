---
name: principle-define-the-domain-first
description: "Use when a new noun, state, or stored field appears, one word is doing two jobs, or two sources use different words for what may be one thing. Define what each term means, what makes two of them the same, and what changes its state, before choosing structure."
disable-model-invocation: true
---

# Define the Domain First

Before structure, decide what the things are. Every system has a handful of nouns that carry its meaning (an order, a run, a reminder, a session), and each one needs three answers: what it refers to, what makes two of them the same thing, and what states it moves through. Get these right and the types, tables, keys, and APIs mostly follow. Get them wrong and the structure faithfully encodes the confusion: duplicates that should have merged, merges that should have stayed apart, a status that means two things. Names are promises. `processData` is a lie; `classifyBillsByVendorCategory` is a promise. Fixing a meaning early is a rename; fixing it after it is in stored data is a migration.

## How to think it through

**Read what people say as evidence about the nouns.** The owner's sentences already decide most of the meaning if you read them that way:
- two words used for one thing, or one word for two ("account" as the company and as a person's login);
- behavior that only makes sense if two instances are different ("a fresh reminder, not the old one");
- behavior that only makes sense if they are the same ("moving the date moves it, not a second one");
- a condition that marks a state boundary ("nothing comes back after close" names a final state);
- a rule across nouns ("never touch another tenant's ticket").

**For each noun that matters, answer four things:** what it is, in words a user would recognize; its identity rule; its states and what moves it between them (and who can); and how it relates to the other nouns. States are where the meaning hides: "Waiting means the process is still alive; completed means the process we started has exited. A quiet terminal is not completion."

**The hard call is identity.** It decides deduplication, joins, primary keys, cache hits, and what "update" means. Test it both ways. If two of these were merged by mistake, would the user call it a bug? Then they are different things, and the identity has to include whatever tells them apart. If one were split into two by mistake (a second reminder for a moved date, a duplicate folder for the same path), would the user call that a bug? Then the identity must leave out whatever changed. For a watched folder that sounds like: "A new revision changes its contents but not which folder this is; a different path is a different folder. So the folder's id is its canonical path; the revision is state, and it, not the id, decides whether cached contents are still valid."

**One word, one meaning, everywhere:** in the conversation, the spec, the code, and the screen. When a word covers two meanings, split it. When two words name one thing, pick one and use it everywhere. When an authoritative contract or earlier decision already fixes a term, reuse it rather than renaming it for taste.

**Let names carry the meaning.** Important things get names of two or more words that say what they do and where they belong. Name the effect, not the mechanism: a function called `read_stored_thread` must not subscribe, and an `open` that also migrates is lying. Distinct kinds of identity get distinct type names (`AccountId`, `ReservationId`), never one `id: string` reused across kinds.

**Know when it's defined enough:** when a stranger reading only your definitions could answer every "is this the same one?" and "what state is it in?" question the work depends on. "The words are obvious" and "the team knows what it means" are the reasons nouns go undefined; neither passes that test.

## Example: the reminder

Tickets on hold get a reminder on their due date. The owner said two things in passing: "when a ticket goes back on hold, it's a fresh reminder, not the old one" and "moving the date moves it, not a second one". Read as evidence, those settle the identity: a reminder is one ticket plus the hold that created it. Changing the due date updates the same reminder; a new hold creates a new one. The states follow: pending, then moved, cancelled, or completed. With that written down, "at most one pending reminder per ticket" is testable, and the key for the table is obvious.

IF the case in front of you doesn't match the reminder example, or you are checking someone else's terms and identities, load `references/example_scenarios.md` (scenarios, simplest first: comments or annotations?; one "account", two meanings; done or just waiting?; reused run ids; cache keys that never hit; two paths to the same folder) and return the closest scenario and how its move applies to your case.

## When it doesn't apply

When an authoritative glossary or contract already fixes a term and nobody uses it differently, reopening its meaning adds nothing. Don't define every noun in a document, only the ones a decision or an obligation depends on.

## Signs you skipped it

- The same word with two meanings in one document or one codebase.
- Ids that can be reused for a different thing, or one `id` type for several kinds.
- One status answering two questions, like "done" shown for a terminal that is only idle while the process it started still runs.
- A function whose name hides its effect: `read_stored_thread` that starts a subscription, `open` that also migrates.
- A cache that never hits, or a dedup that never matches, because its key includes something that changes while the thing itself doesn't (a revision number on unchanged content).

To make these states and identities into types the compiler checks, use `principle-types-are-communication`. To decide which part owns and writes each one, use `principle-one-owner-per-truth`.
