# Record entries

This reference owns the shape of one row in the work's log: its kind, its tags, its fixed parts, the two-step command that writes it, how a later row closes it, and how a write is retried. Every agent that writes the log, and the Lead who reads it to build the owner's page, works from this one shape. (Older text calls a row an "entry"; they are the same thing.)

Expected inputs: the fact you are logging; your packet's `workLog` (its project, work tag, workstream and `writeCommand`), or the entries file `no-board-trace.md` returned.

Return: the row filled in its shape, and the step-two command with this row's minted ids; after the write, the row's id.

## One row

A row is one fact, written by the agent that has it, at the moment it has it, before work that builds on it continues. Its first line says the fact so it can be read alone. The lines after it are its fixed parts. It carries no secrets, credential paths or account data.

Router stamps who wrote the row and when; nothing in the text replaces that stamp. The owner sees the writer beside every row, so a row you write about someone else's act shows as yours.

Every row carries these tags:

| Tag | Meaning |
| --- | --- |
| its kind | one of the ten below |
| `who:<role>` | who decided, did or assumed it: `owner`, `lead`, `advisor`, `implementer`, `verifier`, `reviewer`, `researcher` or `operator`. An owner decision the Lead writes is `who:owner`; the writer stamp still shows the Lead. Older rows' `who:sidekick` reads as a helper |
| `stream:<workstream>` | the workstream it belongs to: the plain label the Lead gave the part of the design or plan, such as `stream:page-experiments` (lower case, spaces as hyphens). Your packet's `workLog` names yours. Older rows carry `part:<id>` instead; read it as their workstream |
| the work's tag | the tag every row of this work carries, such as `design-documents` |

Some kinds add `core`, `door:two-way`, `state:` or `next:`, as the table says.

## The ten kinds

| Kind tag | Logs | Its fixed parts, after the first line |
| --- | --- | --- |
| `action` | what happened | none; say what was done and where: the commit, path or command |
| `decision` | a choice made | `Choice:`, `Authority:` (the owner's words quoted with where they were said, the contract or design it rests on with its path, or `own call`). Add `core` when it changes or fills in the design or plan; add `door:two-way` for a reversible choice inside existing authority, made without asking |
| `assumption` | something taken as true and not yet settled | `Assumed:`, `What depends on it:`; tags `state:open` and `next:owner`, `next:lead`, `next:sidekick` or `next:advisor` for who acts next, set by its stop treatment |
| `shortcut` | a departure from the plan, the design or a required step | `Planned:` (what the plan, design or rule said), `Did instead:`, `Why:`, `Authority:` (`none` when nothing covered it). Older rows tagged `design-change` read as shortcuts |
| `proof` | one check that ran | `Claim:`, `Check:` (what ran, on which commit or revision), `Result:` (exit code or counts), `Not covered:`. Add `Ran by:` when you didn't run it yourself |
| `lead-acceptance` | the Lead accepting finished work | the commit or revision, each check the Lead read with its result, and what stays unverified |
| `owner-ask` | one ask, question, constraint or correction of the owner's | the owner's words with where they were said; `state:open`, `state:done` with its evidence, or `state:deferred` with its reason and follow-up owner |
| `story` | what one subject amounts to for the owner, written by the Lead | the title on the first line, then `Section:` (one of the page's four sections: For you to decide; What's done / what's next; What changed and why; What was verified, and what was missed), `Headline:`, `Happened:`, `For you:`, `Next:`, and optionally `Show:` (a table or a diagram source); its links name the rows it covers |
| `missed` | something the log should have held and didn't, or a claim it can't back | `Missed:`, `Found by:`, `Affects:`; its first link is the row it concerns, when there is one |
| `audit` | your comparison of your own stretch of work with what happened | `Stretch:` (from and to: positions, commits or times), `Compared against:`, `Couldn't see:`, `Found:` (a count, with each Missed row linked) |

A stand-in is an `assumption`: the seam, the stand-in, what it assumes, what it gains, what it costs, and what closes it. It never proves the real interaction: "the adapter stand-in passes; the real provider remains unobserved" can't become "provider complete" on resume.

The owner saw an assumption on a page and didn't mark it wrong: it stays an `assumption`, and a new row with `state:not-marked-wrong` closes the old one. It is still open, and never a decision.

## Fixed parts

Each fixed part is one labelled line, in the table's order. A reader finds the claim, the authority or what was done instead in the same place every time, and a missing part shows at a glance. Rows written before these parts existed stay as written; the log is never edited.

**Proof.** Good, `01a1b0f3-2a00` (position 2:959):

```text
Proof: the guides-only spec's review findings are closed.
Claim: spec review 1's four findings (F1 authority, F2 story procedure, F3 own-call oracle, F4 proof cases) are fixed in the spec.
Check: review lead codex-local/01a1a6f7 verified correction 1 (F1, F3, F4 closed) and correction 2 (F2 closed, spec sha256 480ada263b1b); …
Result: no open finding. …
Not covered: the skill files themselves (not written yet); any behavior run.
```

Bad, `01a1ac6a-40f2` (2:843): "Proof: Terra's eighteenth check found page N covering the record exactly … What ran: … Comprehension: 5 stories yes, 14 partly … Findings, worst first: … Not covered: small screens, …". The claim, the check and the result run together, so a reader can't tell what was claimed from what was found. It is also Terra's check written by the Lead: written today, it carries `Ran by: Terra (codex-local/01a1a97a)` and comes with a Missed row.

**A check you didn't run.** When you write a check another agent ran, because it couldn't reach the log or didn't log it, add `Ran by:` naming that agent, and write a `missed` row that says why the runner didn't write it. The page then shows the check as reported second-hand. Good, written by the evaluator itself, `01a1b2e1-a152` (2:1137): "Proof: independent owner-page check of the Program and Verification Design pages. Claim: … Check: … real Chrome mouse clicks on all four count nodes … Result: five findings … Not covered: …". It needs no `Ran by:`, because its writer ran it.

**Decision.** Good on content, `01a1a787-3817` (2:687), written today with its label:

```text
Owner decision D6: a choice is answered on its own decision page.
Choice: option A, as built; the live page links to it.
Authority: owner selection d6-a on owner-pages/decide-show-me-your-work-d6-d7-2026-11-04.html, review b2b8fe90, 2026-11-04.
```

Bad, `01a1a1b9-273a` (2:478): "Lead decision made without asking: keep this project's trace in memory-logs …, per the owner's standing rule, although practices-show-me-your-work says a work thread or session-logs." Its authority is a paraphrase with nothing quoted or linked, and the choice departs from the skill it names.

**Assumption.** Good, `01a1a761-26da` (2:641): "Runner gap: pnpm --dir tests/skills rules --since d8b8f60a is refused … / Assumed: an engine 0.4.0 or runner limit, not this change. What depends on it: nothing (the run on explicit paths covers the change)." Written today, `What depends on it:` starts its own line.

Bad, `01a1a1b9-24bf` (2:472): "S4: nothing gets built before the owner's promised paste about implementing plans." It says neither what is assumed nor what depends on it, so nobody could see that nothing did; the owner marked it wrong.

**Shortcut.** Good, `01a1b33e-f175` (2:1255):

```text
Shortcut: the design pages ignored the presentation the skills already define.
Planned: presentation-html's engineering-documents reference: a collection with a home page and one page per document, …
Did instead: four unlinked pages, each with page-written callouts and a whole monolithic document inline.
Why: the Lead never loaded the engineering-documents reference; it built pages from habit.
Authority: none. The owner caught it; fixed at 3ed51483.
```

Bad: a shortcut nobody logged when it was taken. PR #194's merge proof ran typecheck, the rules and static checks but not the repository's test suite, and nothing said so until two tests went red on main (proof `01a1b226-4508`, 2:1016). Logged when taken, it is one `shortcut` row with `Planned:` the suite passing before merge and `Authority: none`; found later by someone else, it is one shortcut plus one `missed` row, never two shortcuts.

**Missed.** Good, `01a1b3e2-27fb` (2:1346): "Missed: the skill spec (c4d752af) followed skill-authoring 0.5.0's route … / Found by: review lead codex-local/01a1a6f7, asking for the skill-design and skill-verification parts (push 01a1b3da-e1e1). / Affects: the spec-stage review target; fixed at ecf2f095." It says what was missed, who found it and how, and what it touches.

**Audit.** No audit row exists in this log yet, so here is the shape `SKILL.md`'s audit step fills in, as a template:

```text
Audit: <whose> stretch for <what>.
Stretch: from <position, commit or time> to <position, commit or time>.
Compared against: <your own session history; the packet's or plan's required checks>.
Couldn't see: <what you couldn't read, or nothing>.
Found: <count>, each Missed row linked.
```

`Couldn't see:` names what you couldn't read, such as a transcript you have no access to. Then the page shows that stretch "not audited", never "nothing missed".

## Closing a row

A row is never edited. A correction, a resolution, an answer, a new state of an owner ask, or a replacement is a new row:

- It carries `resolves` (it answers, confirms or corrects the row) or `supersedes` (it replaces the row), beside its own kind when it has one: the owner's answer to an assumption is `decision` and `resolves`.
- Its **first** link is the row it closes.
- Its other links are authority or context. No other link closes, accepts or confirms anything: a row that only links to an assumption leaves it open.

Reopening accepted work is a new row whose first link is the Lead acceptance, tagged `supersedes`. A rewritten story is a new `story` row tagged `supersedes`, whose first link is the story it replaces.

## Links

A link is a JSON evidence pointer:

- another row: `{"kind":"record","record":{"kind":"workTrailRow","id":"<row id>"}}`
- a page or document, such as the owner's decision page: `{"kind":"url","url":"https://…"}` or `{"kind":"url","url":"file:///…"}`

Put a commit or a repository path in the text when the row needs it.

## Write it

Your packet's `workLog.writeCommand` is the command, with the project, subject, work tag and workstream already filled in. You add only the minted ids, the kind and the tags its kind takes (`core`, `door:two-way`, `state:`, `next:`, `resolves` or `supersedes`), `who:`, the text and, when it closes a row, that row as its first link. Nothing is looked up. It has two steps, run as two separate commands:

```text
step 1 (once per row):  node -e 'const c=require("node:crypto");console.log("request", c.randomUUIDv7(), "row", c.randomUUIDv7())'
step 2 (and any retry): agent-collaboration work-trail add --project-id <project> --actor self --subject '{"kind":"project"}' --request-id <request> --row-id <row> --tag <work tag> --tag stream:<workstream> --tag <kind> --tag who:<who> [--tag <tag its kind takes> ...] [--link '<the row it closes>'] --json "<text>"
```

Step one prints a request id and a row id. Step two writes the row with them, and its result's decision is `accepted`, carrying the row's id.

Step two ends one of three ways, and each needs a different move:

- **Accepted:** a readable answer whose decision is `accepted`. Keep the row id.
- **Unknown outcome:** no readable Router answer, because the command timed out, the connection dropped after sending, or its output can't be read. Run step two again with the same request id and row id, and read its answer:
  - `accepted` carries the row id, whether the first send landed or not.
  - A readable answer that isn't `accepted` follows the next ending, because a first send Router rejected replays that rejection.
  - No readable answer again leaves it unknown: read the trail for the row id, and keep the same ids for any later resend.

  Never mint new ids for this retry: "it failed, so this is a new write" is the mistake, because a new pair writes a second copy of the same fact. Reading the trail only reconciles; the same ids are what keep the row from landing twice.
- **Router answers but doesn't accept:** a readable answer that isn't `accepted`, such as a rejection like `conflictingRequest`, a writer, lease or schema gate, or an access denial. A refusal never proves the row is missing, so don't take the fact as missing, and write nothing new until the trail shows it is:
  1. Look in the trail for this row id. After `conflictingRequest`, look for the row whose request is this request id, because that request already wrote one.
  2. Found: the fact is logged, so stop. A correction is a new row that closes it.
  3. Not found: fix what the answer names. When the words and tags stay the same (a lease or writer gate, say), resend them with the same ids once it's fixed: Router doesn't record a gate result, and checks it again. When the words or tags must change, start again at step one with new ids: a recorded rejection replays, so the same words get the same answer.
  4. An access denial: keep the row for your handback with the exact answer, as for an unreachable write below, and never switch identity or transport to get past it.

A new row, even with the same words, always starts again at step one.

**When the write can't reach Router** (the command fails to connect, as a sandboxed Worker's can), keep each row's text and kind and list them in your handback with the exact error. Your commissioner writes them with `Ran by:` naming you, plus a `missed` row for each, saying you couldn't write it and why. Don't stop work for this.

**Before the work has a Router project**, write to the entries file `no-board-trace.md` names: append one line holding `{"rowId":"<row id>","recordedAt":"<ISO-8601 time>","text":"…","tags":[…],"links":[…]}`, with the row id from step one, so it moves to the work trail unchanged with `--row-id` and every link still holds. Make each line with a JSON serializer such as `JSON.stringify`, never by hand: a line that isn't one JSON entry can't be read back, by you or by the next agent.

## Good and bad rows

From this skill's own log (Router project `01a1635f…`, tag `design-documents`):

- Good: `resolves`, `who:owner`, first link the Lead's open assumption S1, second link the owner's storage decision: "Resolves S1: the owner chose the store (the work trail, confirming the 11 Oct design)…". It closes one row, names its authority by link, and reads alone.
- Bad: `decision`, `door:two-way`: "Lead decision made without asking: keep this project's trace in memory-logs…". Where the log lives is a choice about stored data, which no authority covered, so it was an assumption waiting for the owner, not a two-way door. The owner superseded it.
- Bad: `assumption`, `state:open`: "S4: nothing gets built before the owner's promised paste." An agent-added hold on work nothing depended on; the owner marked it wrong. Log what the work assumes, not a wait you invented.
- Bad: 25 of the Lead's 49 check rows through 2:1101 mention an evaluator, and the two opened (`01a1a98d-0d00`, `01a1ab35-77b3`) are Terra's runs written by the Lead. The evaluator could have logged them itself; each is now a second-hand check and a Missed item.

## When to stop

Done when the row is written and accepted and you hold its id, or its line is appended to the entries file; or, when the write can't reach Router, the row is kept for your handback with the exact error.
