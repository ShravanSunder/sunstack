# Record entries

This reference owns the shape of one entry in the work's record: its kind, its tags, its text and links, how a later entry closes it, and the command that writes it. `scripts/build-live-page.ts` reads this shape, and its tests check it, so a change here is a change to the builder in the same commit.

Expected inputs: the fact you are recording, the work's record (Router project and work tag, or the entries file `no-board-trace.md` returned), and the part identifiers of the design or plan the work follows.

Return: the entry filled in its shape and the command that writes it; after the write, the entry's id.

## One entry

An entry is one fact, written by the agent that has it, at the moment it has it. Its first line says the fact so it can be read alone. The lines after it carry the authority, the source and any detail. It carries no secrets, credential paths or account data.

Every entry carries these tags:

| Tag | Meaning |
| --- | --- |
| its kind | one of the seven below |
| `who:owner`, `who:lead` or `who:sidekick` | who did, decided or assumed it: an owner decision the Lead records is `who:owner` |
| `part:<id>` | the requirement, design element or plan slice it belongs to, by that part's identifier; `part:none` when it belongs to none |
| the work's tag | the tag every entry of this piece of work carries, such as `design-documents` |

## The seven kinds

| Kind tag | Records | Its text and extra tags must carry |
| --- | --- | --- |
| `action` | what happened | what was done and where: the commit, path or command |
| `decision` | a choice made | the choice, then `Authority:` with its source: the owner's words quoted with where they were said, the contract or design it rests on (path and identifier), or `own call`. Add `core` when it changes or fills in the design or the plan. A reversible choice inside existing authority, decided without asking, adds `door:two-way` |
| `assumption` | something taken as true and not yet settled | what is assumed and what depends on it; `state:open`; `next:owner`, `next:lead`, `next:sidekick` or `next:advisor` for who acts on it next, set by its stop treatment |
| `design-change` | a change from the design or plan | what the design said, what changed, and why |
| `proof` | a check and its result | the claim, the command or check, its result with exit code or counts, the commit or target it ran on, and what stays unverified |
| `lead-acceptance` | the Lead accepting finished work | the commit, each check the Lead read with its result, and what stays unverified |
| `owner-ask` | one ask, question, constraint or correction of the owner's | the owner's words with where they were said, and `state:open`, `state:done` with its evidence, or `state:deferred` with its reason and follow-up owner |

A stand-in is an `assumption`: the seam, the stand-in, what it assumes, what it gains, what it costs, and what closes it. It never proves the real interaction: "the adapter stand-in passes; the real provider remains unobserved" cannot become "provider complete" on resume.

The owner saw an assumption on a page and didn't mark it wrong: it stays an `assumption` and gets a new entry with `state:not-marked-wrong`, closing the old one. It is still open, and never a decision.

## Closing an entry

An entry is never edited. A correction, a resolution, an answer, a new state of an owner ask, or a replacement is a new entry:

- It carries `resolves` (it answers, confirms or corrects the entry) or `supersedes` (it replaces the entry), beside its own kind when it has one: the owner's answer to an assumption is `decision` and `resolves`.
- Its **first** link is the entry it closes.
- Its other links are authority or context. No other link closes, accepts or confirms anything: an entry that only links to an assumption leaves it open.

Reopening accepted work is a new entry whose first link is the Lead acceptance, tagged `supersedes`.

## Links

A link is a JSON evidence pointer:

- another entry: `{"kind":"record","record":{"kind":"workTrailRow","id":"<entry id>"}}`
- a page or document, such as the owner's decision page: `{"kind":"url","url":"https://…"}` or `{"kind":"url","url":"file:///…"}`

Put a commit or a repository path in the text when the entry needs it.

## Write it

To the work trail:

```sh
agent-collaboration work-trail add --project-id <project id> --actor self --subject '{"kind":"project"}' \
  --tag <kind> --tag who:<who> --tag part:<id> [--tag core | --tag state:<state> --tag next:<actor> | --tag door:two-way] \
  --tag <work tag> [--link '<entry it closes>'] [--link '<authority or context>'] --json "<text>"
```

The result's decision is `accepted` and carries the new row's id; keep that id for later links. To make a retry safe, pass your own `--request-id` (a UUIDv7) and reuse it when you retry the same write, so it never lands twice.

To an entries file, before the work has a Router project: append one line holding `{"rowId":"<id>","recordedAt":"<ISO-8601 time>","text":"…","tags":[…],"links":[…]}`. Make the id with `node -e 'console.log(require("node:crypto").randomUUIDv7())'`, so it can move to the work trail unchanged with `--row-id`.

## Good and bad entries

From this skill's first record (Router project `01a1635f…`, tag `design-documents`):

- Good: `resolves`, `who:owner`, first link the Lead's open assumption S1, second link the owner's storage decision: "Resolves S1: the owner chose the store (the work trail, confirming the 11 Oct design)…". It closes one entry, names its authority by link, and reads alone.
- Bad: `decision`, `door:two-way`: "Lead decision made without asking: keep this project's trace in memory-logs…". Where the record lives is a choice about stored data, which no authority covered, so it was an assumption waiting for the owner, not a two-way door. The owner superseded it.
- Bad: `assumption`, `state:open`: "S4: nothing gets built before the owner's promised paste." An agent-added hold on work nothing depended on; the owner marked it wrong. Record what the work assumes, not a wait you invented.
- Good: `proof`, `who:sidekick`: "Proof: the show-me-your-work design set passed independent design review: verdict great, implementation decision…", naming the reviewers, the revision and the push that carried it.

## When to stop

Done when the entry is written and accepted and you hold its id, or its line is appended to the entries file; or, when the write fails, the exact error is your gap and you keep the entry text to write once the record is reachable.
