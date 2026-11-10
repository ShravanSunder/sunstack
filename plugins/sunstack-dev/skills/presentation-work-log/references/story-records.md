# Story summary records

This reference owns the existing Story row shape used by requested page composition. Input: the subject, its current Story and the cited log rows. Return: a complete summary with stable key and Covers, or the exact missing source. The fields are stored evidence, not an HTML layout.

**Story.** The Lead writes or refreshes one only while fulfilling an explicit owner request for a work-log page, for each subject the owner follows. Its lines, in this order:

| Line | Holds |
| --- | --- |
| the title | the subject's name in the owner's words, such as "How the new skill was checked" |
| `Key:` | a short id kept across rewrites; the page gives the Story the element id `story_<key>` |
| `Section:` | one of the page's four sections: For you to decide; What's done / what's next; What changed and why; What was verified, and what was missed |
| `Subject:` | the part of the work it belongs to, such as "The skill" |
| `Routine: yes` | marks routine work; it does not prescribe the page's layout or disclosure state |
| `Headline:` | one sentence: what it means for the owner |
| `Happened:`, `For you:`, `Next:` | one short line each; `For you:` says "Nothing." when nothing is asked |
| `Show:` | optional: `table`, a diagram or a before-after, followed by its lines; at most one |
| `More:` | optional paragraphs the owner can open |
| `Covers:` | the full row id of every row the Story cites, comma-separated |

**`Covers:` decides what a Story cites, not its links.** Router takes at most 16 links on one row, and a Story often covers more. So the Story cites exactly the rows `Covers:` names, linked or not, and every line must be said by one of them. A first Story links up to 16 of them. A rewrite is a new `story` row tagged `supersedes` whose first link is the Story it replaces, which it doesn't cite, so it links up to 15 cited rows after it. Which cited rows get the links changes nothing about what the Story cites.

Good, `01a1b5e6-d173` (2:1960), a rewrite whose first link is the Story it replaces (`01a1b5dd-5cfe`), with 16 links and 55 rows in `Covers:`:

```text
How the new skill was checked
Key: checked
Section: What was verified, and what was missed
Subject: The skill
Headline: Four reviewers found four problems; all are fixed, and they checked the fixes.
Happened: Each reviewer wrote down its own checks as it went; the reviewer who checked the others' work checked every problem at its line.
For you: Nothing.
Next: Checked again once the page part is redone.
Show: table
| Problem found | Fixed |
| Two places pointed to the wrong step | Yes |
| New parts of the work got no group on the page | Yes |
| A count of three opened only one item | Yes |
| A refused note could be taken as a lost one | Yes, after two more checks |
Covers: 01a1b412-aac2-7459-b952-9e41a92c1baa, 01a1b412-aac3-7c7b-bdd3-ba9d84e9adf3, …
```

Bad: an early story such as `01a1b5b0-6f51` (2:1827), which named the rows it covered only by its four links. A reader can't tell a cited row from a linked one, and a Story covering 55 rows can't link them all. A current Story like this gets a new version in this shape before the page uses it, as `read-and-summarize.md`'s "Write the Stories" step 3 says; the old row is never edited.

Complete when every summary field is backed by its Covers rows and an update preserves the existing identity and append-only history.
