# Design Page

This reference owns how a design set's page is made and inspected. The page is how the user reads the set, and it is a view of the four parts, never a second copy that can drift.

Expected inputs: the four Markdown parts, as files for a set written as a document or as the run's messages for a set in the conversation (`design-set.md` decides which).

Return: the page and where it is, how it was built (through a host practice, or as the fallback file below), each inspection's result, and the host checker's result when one ran.

## What the page holds

- **The answer first.** Before any part, a few plain sentences: what the change does, to which skills, and what is still open.
- **The four parts, unchanged.** Each part as its Markdown says it, in reading order: requirements, specification, skill design, skill verification.
- **A walkthrough.** The reader can step through the four parts in that order, with one short line per part saying what it holds.
- **Terms explained where they first appear.** A term the answer or the walkthrough introduces is explained there. The page never edits a part, so a term that first appears inside a part is explained in that part's Markdown.

The page sits beside the part files when the set is a document; for a set in the conversation, it goes wherever the host shows the user a page, and the review packet carries it. When a part changes, rebuild the page from the parts and inspect it again.

## Through a host practice

Some host repositories have a practice for building HTML pages, in their instructions or their skills: the page's components, how a page carries a Markdown file, how the page is viewed, and a checker. This plugin names no skill from another plugin, so find the practice by what it does: read the host repository's instructions, and look through the skills the session offers.

IF the host repository's instructions or skills provide an HTML presentation practice, build the page through it and return its checker result. Follow the practice for everything it owns: its components, how it carries each part, how the page is viewed, and its checker. What stays with this reference: what the page holds, the inspections and the stop.

## The fallback: one self-contained file

Otherwise, write one HTML file that needs nothing else: its styles inline, no script, nothing loaded from the network. Name it `index.html` when it sits beside the part files.

- Open it with the answer, then the walkthrough as a list of links to each part's section.
- Carry each part in from its Markdown, never retyped or summarized: the part's text exactly as its source holds it, escaped for HTML (`&` as `&amp;`, `<` as `&lt;`, `>` as `&gt;`), in its own section headed with the part's name, inside a `<pre>` styled `white-space: pre-wrap` so long lines wrap. Markdown reads as plain text, so the part reads as its author wrote it.
- Set the viewport (`<meta name="viewport" content="width=device-width, initial-scale=1">`), and give nothing a fixed width wider than a phone.

## The inspections

1. **Each part on the page equals its Markdown.** Where the page holds a copy of a part (the fallback's escaped text, or a copy a practice embeds), take it back out, undo the escaping, and compare it with the part's current source; any difference fails. Where a practice reads the file itself, check that the page points at that part's own file.
2. **The answer comes first.** The reader meets the answer before any part.
3. **The walkthrough reaches every part,** in reading order.
4. **The page reads at phone width.** About 400 pixels wide, its text wraps and the page body never scrolls sideways; only a table or code block may scroll inside its own box. View the page at that width where the host can show it. Where it can't, read the page's source for the viewport setting and for anything with a fixed width, and say that this is how you checked.

## Cases

Failed: the page summarizes the specification in its own words instead of carrying the part. After the next revision the summary still describes the old obligations, and the reviewer accepts what the page says rather than what the set says.

Failed: the page opens with the requirements part and puts the answer in its last section. The reader works through four parts before learning what the change does.

Clean: the host's practice carries each part from its file, the page opens with a three-sentence answer and a four-stop walkthrough, the practice's checker reports no errors, and the narrow view shows every part wrapping.

Clean: no practice is found, so the page is the fallback file: the answer, four links, and each part's escaped text in its own wrapping section. Each part taken back out of the page compares equal to its file.

## When to Stop

Stop when every inspection holds and the host's checker, when one ran, reports no errors. Return the page and where it is, how it was built, each inspection's result with how it was checked, and the checker's result.
