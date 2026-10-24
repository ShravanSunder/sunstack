# Retrospective fixes: standards reach designs, commissions and second looks

Multi-run skill spec, `skill-authoring:skill-creation`. Lead: 🦁 claude-local `68844339`, 2026-10-24. Status: accepted to implement (`retro-fixes-spec-review.md`, 2 → 0). Basis: [the retrospective account](../../retro-2026-10-24-incidents/account.md), outcomes O1–O3, and its evidence packet. Focus 2 (PR 2) carries the binding-table and Implementer-stop halves of O1. None of these four runs' text depends on them, and focus 2 changes none of these four skills, so this lands as its own PR from `main`, in parallel with PR 2 (Lead's sequencing call, 2026-10-24).

## Requirement

The owner's words, 2026-10-24:

- "no do not use node do not use node sqltie you must kuse drizzle" (to the identity Lead, T:143693)
- "obviously fuckkgin drizzle eveyrwhere what teh fuck is this key value storage3?" (T:145114)
- "how the fuck is uksign dpecreated storage a chocie? and also i said sqltie ltie we kusign sqltie in fleet we kusign sqlite eveyrwhere else"
- "the adevsior totaly failed here man"
- "all skilsl are writte by opsu 5.5 xhigh or high"; "skilsl w2itten by claude reviwe dcby sol xhigh got it?"; "the catalog says nothign about skill writing … else you follwo teh fuckign defaults"

**Success:** an agent designing, commissioning, implementing or second-looking persistence finds the owner's standard in the skill it already loads, sees the repository's existing example named, and treats a deprecated API as never a choice. A Lead commissioning a skill change picks the owner's writer and reviewer models from the catalog.

## Situations

1. **A Lead commissions work that touches persistence, dependencies or check gates.** The commission names the repository's standard for it and its existing example, such as Drizzle on better-sqlite3 in `packages/oauth-broker`. If the repository has none, the commission says so.
2. **An Advisor takes a second look at a stored-data, dependency or technology point.** Before judging correctness, it checks the choice against the repository's existing way and the owner's standards, naming the example it compared with. A deprecated API is never an acceptable alternative.
3. **A TypeScript change persists data.** It uses SQLite through Drizzle, with the driver the runtime injects: `drizzle-orm/better-sqlite3` on Node, `drizzle-orm/durable-sqlite` in a Durable Object, `drizzle-orm/d1` on Workers D1. Migrations come from `drizzle-kit` and are checked in. It never uses the Durable Object key-value storage API, `node:sqlite`, hand-written SQL as the storage layer, or Kysely as the storage layer.
4. **A Rust change persists data.** It uses SQLite through SQLx, with the driver the repository already declares. A new engine or driver is the owner's call.
5. **A Lead commissions a skill change.** Skill text is written by Claude Opus 5.5 at high or xhigh. Skill review is by Sol at xhigh. Everything else follows the catalog's defaults.
6. **Not raised:** using the repository's existing library the way it already uses it, when that use meets the owner's standard.
7. **The repository's existing way conflicts with the owner's standard.** An example is code that already uses the Durable Object key-value API, or Kysely as the storage layer. The owner's standard wins, but the agent neither extends the conflicting store nor migrates it on its own. It raises the conflict to the Lead for the owner, naming both sides: the existing use, with its path, and the clause it breaks. Until the owner decides, work that doesn't touch that store continues.

## Runs

| Run | Skill | Owner plugin | Class |
| --- | --- | --- | --- |
| R1 | `role-advisor` | sunstack-dev | update, behavior-changing |
| R2 | `practices-manage-agents` | sunstack-dev | update, behavior-changing |
| R3 | `domain-typescript` | sunstack-dev | update, behavior-changing |
| R4 | `domain-rust` | sunstack-dev | update, behavior-changing |

### R1 `role-advisor`

- **Main path.** Job 1, "A second look", gains one sentence at the point where the Advisor examines a point. When the point is stored data, a dependency or a technology choice, first check it against the owner's standing standards and the repository's existing way, and name the existing example you compared with. Cite `principle-justify-the-complexity` for "the codebase's existing way wins". A deprecated API is never an alternative to bring. When the existing way itself breaks the owner's standard, say so as a conflict for the owner (situation 7), rather than endorsing either side.
- **Depth.** One worked example under Methods: the Tool Portal case. The Advisor checked the Node store's atomicity and the Durable Object core's runtime separation, and never compared either with `packages/oauth-broker`'s Drizzle. The clean case names the example and flags the key-value API before atomicity is even weighed.
- **Proof.** A source walk of A:26007 and A:34719–35090 (evidence.md, F3) through the new text: the conformance check fires before atomicity.

### R2 `practices-manage-agents`

- **Main path:** the commission packet's required content gains "the repository's standard and existing example for any persistence, dependency or check-gate work the commission touches, or 'none'". It sits where the packet names its sources.
- **Catalog:** one row for skill text, written by Claude Opus 5.5 at high to xhigh; one for skill review, by OpenAI Sol at xhigh. The catalog's other rows are unchanged.
- **Proof:** a source walk of the five commissions in evidence.md, O3 (W:10, C:10, N:10, T:92869, I:10). Each would have required the Drizzle example. A catalog lookup for "write a skill" returns Opus 5.5 high to xhigh.

### R3 `domain-typescript`

- **Main path:** a "Persistence" standard with situation 3's content, and situation 7's conflict rule, at the level of the skill's other standards.
- **Provenance:** "Drizzle everywhere" and "never node:sqlite" are the owner's words. The driver-per-runtime and `drizzle-kit` details are the owner's rule as the Tool Portal Lead recorded it (`agent-vm.design-portable-tool-portal-hosts/docs/wip/2026-10-24-identity-followups/handoff.md:186–196`, headed "owner rule"). They are cited as recorded, not as fresh owner words.
- **Proof:** read-back, plus a source walk through this incident-to-rule map (evidence.md, F1 and F6). Each incident's verdict is what the new text says about it:

| Incident | Record | What the new text says |
| --- | --- | --- |
| Durable Object key-value calls for authorization records | W:311 | breaks "never the Durable Object key-value API": raise or redesign before writing |
| Core store port shaped as key-value | C:203 (the Lead's commission, C:10) | a port design question for Program Design under focus 2's binding table. The standard says the store behind it is SQLite through Drizzle; the port shape itself is the design's |
| The volatile in-memory store for conformance tests | C:203 | outside the standard: a test double, not persistence |
| Node process-memory approval records | N:458 (the Lead's design call, T:42822) | persistence is in question, and the owner's adoption is unresolved (account, investigation question 2). Raised as a conflict under situation 7 until the owner decides |
| Hand-written D1 SQL and the Kysely adapter | S:452, S:495 | breaks "never hand-written SQL or Kysely as the storage layer": D1 through `drizzle-orm/d1` |
| `node:sqlite` for the identity store | T:142279 | breaks "never `node:sqlite`": Drizzle on better-sqlite3 |

### R4 `domain-rust`

- **Main path:** a "Persistence" standard with situation 4's content.
- **Proof:** read-back, plus a source walk of the Fleet design's storage rows (U22 Turso, U70 SQLx), which conform.

## Decisions

| # | Decision | Reason |
| --- | --- | --- |
| RF-D1 | The owner's storage standard lives in the language domain skills and the global prompt (PR 6). It doesn't go in a new skill or in memory | The domain skill loads whenever the language's code is written, so the standard reaches every design, plan and implementation. The owner: "no need for any memory" |
| RF-D2 | No Python standard yet | No owner words or evidence name Python's storage library. Adding one would invent it |
| RF-D3 | "A deprecated API is never a choice" is written beside each concrete standard (R1, R3), not as a general rule | The owner's correction concerned a concrete API. A general rule without a list gives the agent nothing to check |
| RF-D4 | The binding table and the Implementer stop are not repeated here, and the new text doesn't cite them | Focus 2's B·R3 and A·R13 own them. Not citing them keeps this PR independent of PR 2's merge |

## Security classification

None. These are skill-text edits with no scripts, network or credentials.

## Release

`sunstack-dev`: one minor bump above `origin/main`'s version when the PR is opened (2.99.0 today), with one changelog entry. Whichever of this PR and PR 2 merges second takes the next minor when it merges `main` in. Caches are refreshed after the owner merges, on the owner's go.

## Proof posture

Source walks of the real incident records named above, and the test suite. No fresh-agent behavior is claimed (the owner: no pressure testing).

## Run status

| Run | Status |
| --- | --- |
| R1–R4 | implemented on `skills/retro-fixes`, one commit per run; source walks done; independent implementation review owed |
