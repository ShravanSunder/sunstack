# Topology mental model — October 10 sync

Later direction: the [October 11 working design](2026-10-11-delivery-topology-and-verification-design.md) supersedes this note's Verifier-verdict wording. The Verifier reports evidence and findings; the Lead decides acceptance. It also adds the owner's separate Test Design input to implementation. The original sync below is preserved as historical context.

Saved at the owner's request after the owner called this a “great sync and starting point of mental model.” This records the shared starting direction for further design. It is not an implementation plan or a claim that skills or runtime behavior have changed. Moving the owner's usual conversation to an outer agent remains a possibility, not a selected change.

**The Sidekick and Verifier should be peers for the same delivery, with review coming later.** This is the owner's selected direction, replacing the earlier conditional-verifier proposal.

The resulting flow is:

| Stage | Who works | Owned result |
|---|---|---|
| Design | Owner + 🦁 Lead, challenged by 🦉 Advisor | Agreed outcome, boundaries and proof expectations |
| Build and verify | 🐒 Sidekick ↔ independent Verifier | Implementation plus evidence that the feature works |
| Assessment | 🦁 Lead | Source-backed assessment of behavior, integration and remaining gaps |
| Independent review | Fresh 🔎 Reviewer | Code-quality and test-quality findings |
| Corrections and acceptance | Pair, reviewer and 🦁 Lead | Fresh affected proof, resolved findings and accepted delivery |

The watchdog supervises this workflow throughout. It can be a system of mechanical and reasoning processes, using Jev or other tools. It checks whether work stays owned, required checks happen, evidence remains current and failures receive follow-up. Engineering acceptance stays with the Lead.

**The reviewer must explicitly challenge tautological tests.** That means checking whether assertions establish the intended behavior, whether expected results are independent of the implementation, whether mocks remove the interaction being proved, and whether the test could stay green while the feature is defective. Mocking alone does not make a test tautological.

The Verifier also rejects inadequate evidence when forming its behavioral verdict. The distinction is ownership: the reviewer audits test-code quality; the Verifier owns demonstrating the feature through appropriate scenarios and real boundaries.

**Advisor versus reviewer becomes clearer when we separate their relationship to the work.**

| | 🦉 Advisor | 🔎 Reviewer |
|---|---|---|
| Relationship | Works alongside the Lead during design and delivery | Enters independently after implementation and verification |
| Context | Knows the discussion, alternatives and design history | Reads governing artifacts and current work without inheriting the author's conclusions |
| Main question | “Are we solving and judging this the right way?” | “Is this implementation well built, and are its tests meaningful?” |
| Output | Challenges, alternatives and tradeoffs | Concrete findings against the deliverable |
| Limitation | Its participation in design means it cannot replace fresh independent review | It does not silently redesign the product or take acceptance authority |

For example: the Advisor challenges **which Git version should define compatibility**. The Verifier exercises behavior against that reference. The reviewer checks the matcher implementation and whether its tests independently establish compatibility. All can notice problems outside their primary mission and pass the evidence along.

**Lauren did describe moving her usual conversation to an outer agent.** In the Peter Yang interview—not the Matt livestream—she says: “I actually mostly talk to my chief of staff,” which then talks to the engineering lead ([25:33 onward](https://www.youtube.com/watch?v=xZ5TEaleUdg&t=1533s)). She describes this hierarchy:

**Human → Chief of Staff → engineering lead → engineering bots → cloud coding agents.**

That establishes a human-facing intake and coordination tier. It does not establish that the agent replaces the human's product authority, or exactly who makes every acceptance decision. The quotation was checked against the public auto-captions; names and exact wording may contain recognition errors.

The public pstack workflows vary too:

- [`orchestrate`](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/orchestrate.md#L87) uses dedicated verifiers selectively.
- [`autopilot-full`](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/autopilot-full.md#L8) requires independent verification rounds before autonomous merges.

The selected pair is closer to the second workflow's emphasis on independent verification, though it is a different topology. These links identify the inspected source pin, not a claim about the latest upstream version. They do not grant local autonomous merge authority.

The eventual goal under discussion is **reliable delegated delivery, with the owner's attention concentrated on design, consequential decisions and sampling outcomes**. A trusted outer agent could become the owner's general intake point across projects while preserving direct design conversations with project Leads.

That outer interface should earn trust by preserving intent and reporting verified outcomes. Moving the conversation upward before those handbacks work would add another place for information to disappear. Lauren's own preferred metaphor is the **Michelin kitchen**: capable people and tools, maintained standards, and observable quality.

## Relationship to earlier notes

The [October 9 role and acceptance agreement](role-and-acceptance-agreement.md) retains the earlier responsibility and evidence context. For the current paired-Verifier direction and Advisor/reviewer distinction, start with this sync. Earlier conditional-verifier discussion is historical input; active skill implementation remains unchanged.
