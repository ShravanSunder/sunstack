# Role relationships, one Reviewer, and an owner-opened Advisor

Lead-authored spec, 2026-10-15. Owner `sunstack-dev`. User-directed intent. The design was settled with the owner on 2026-10-15 and is recorded in `ai-tools.sdlc-learning-coverage/docs/wip/skills-authoring/2026-10-13-skill-system-decisions/decisions.md`, section 2.

## What the owner asked for

- "in leads skill, its one role relating oot other. so implementor sidekick -> how they talk to verifieyr whoud lbe referenc ein taht skill"
- "Must load if talking to lead. yes it just allows us to decompseil files make it easier to maintain"
- "if anytnhign is really redundinta thats what shared-references are for"
- "i also sid this repeadedly that references on how to itnearct especialy for lead with otehr agent"
- "yeah i agreew ith teh reviwer role, its idnependant and same for sesign and spec reivew tec will refrence the role"
- "i want to be able to talk to advisro optionaly"
- For skill writing: "sicne this skills you can use opus 5.5 worker with all teh skilsl to write isntad of a sidekickick and tehy msut follow the rules"
- On review fan-out (2026-10-15): "fan out with sol for all reviews so the agents can handle it make srue its sol xhigh. and one sol agent liek advisor revbiew2ing everyhtign else and getitn gtheo tehr agents reports two. all agesnt shokdu use teh skilsl for writing and reivew". This is the owner's adoption of a review lead starting its own stage reviewers (RL8).

## Success

A Lead that loads `role-lead` and works with any other role knows how to commission it, what to send, what to keep out of its context, how to read its handback and when to stop. It doesn't learn this by trial. An Implementer and its Verifier each know how to work with the other and with the Lead. One Reviewer role serves design, spec, code and skill review. The owner can open the Advisor directly.

## Where each relationship lives

```text
role-lead/references/working-with-advisor.md       IF the Lead works with an Advisor
                    working-with-implementer.md    IF the Lead commissions an Implementer
                    working-with-verifier.md       IF the Lead commissions a Verifier
                    working-with-reviewer.md       IF the Lead commissions a Reviewer
                    working-with-researcher.md     IF the Lead commissions a Researcher
                    working-with-operator.md       IF the Lead commissions an Operator
role-implementer/references/working-with-verifier.md   MUST (always paired)
                           working-with-lead.md        MUST
role-verifier/references/working-with-implementer.md   MUST (always paired)
                        working-with-lead.md           MUST
role-reviewer/references/working-with-lead.md          MUST
role-advisor/references/working-with-lead.md           IF the Lead commissioned you
                       working-with-owner.md           IF the owner opened you directly
role-researcher/references/working-with-operator.md    IF you commission an Operator
shared-references/implementer-verifier-pairing.md      loaded by both paired files
```

Each file teaches only its own side. A rule both sides need lives once in `shared-references/`. `practices-manage-agents` keeps the shared mechanics: forms, models, launch routes, packets and schemas. Relationship guidance that sits in it today moves to these files with no stub left behind.

## What the Lead files must teach

Write each one from the role skill it pairs with, `practices-manage-agents`, and these cases from the 2026-10-15 delivery:

- **Implementer:** a form override isn't a pairing waiver. Give the write scope, stop condition and paired Verifier. Send corrections to the same Implementer. When the job is writing skills, the owner's direction applies: "especially if they are writing the skill then inventory for slop and infractions". The Implementer walks its files against `shared-references/humanizer.md`, read as a list of tells and never called from the skill, and against `skill-review`'s placement, steering, pruning, trigger and depth checks. It returns each item fixed or kept with a reason.
- **Verifier:** give it the adopted reference and one kind of work. When the Verifier runs a held-out evaluation of skill or agent behavior, fix its cases, checks and deciding rule before the run, and keep the cases and checks out of everything the writers read, including the plan (`skill-creation`'s `proof-and-claims.md` owns held-out evaluation). Ordinary product proof stays visible to its Implementer. While the Verifier observes a declared target, don't change that target. Narrow a check only with a recorded reason, keeping both results. When corrections keep failing, find the premise they share before another round (the Lead file cites `principle-refine-mental-models` at that decision).
- **Reviewer:** start a fresh session with no authoring history. Lineage follows `practices-manage-agents`: at least one reviewer per review comes from a different lineage than the author or the Lead. Corrections go back to the same review lead. Dispose of each finding with its anchor. When the review returns `not-converging`, stop and bring the owner the decision. Public claims (PR body, changelog) are reviewed text too.
- **Advisor:** the Advisor challenges and the Lead decides. Its agreement isn't review or acceptance. Send it the current files and anchors to challenge.
- **Researcher:** name the method (`practices-how`, `practices-why` or `practices-research`) in the commission's approach, and read the anchors behind the basis labels the handback returns.
- **Operator:** give an exact procedure and the observations it should return. The Lead interprets them.

## Runs, one skill each

RL2 is folded into RL3 as support work (review finding F6).

| Run | Skill | Change |
| --- | --- | --- |
| RL1 | `role-lead` | Add the six `working-with-*` references and one IF line each in Methods. Keep everything else. |
| RL3 | `role-implementer` | Add `working-with-verifier` and `working-with-lead` as MUST loads, and move the pairing paragraph into them. As support work, create `shared-references/implementer-verifier-pairing.md`: the expected outcome comes from the governing sources, never from the pair agreeing; disputes go to the Lead; setup, facts and reproductions are shared directly. This run also carries verification-practice R3. As second support work, add the skill-writing Implementer to the consumer list at the top of `shared-references/humanizer.md`: it reads the file as a tell catalog for its slop and infractions pass and never calls it from the skill it writes. |
| RL4 | `role-verifier` | Starts after RL3, because it loads the shared pairing file RL3 creates. Add `working-with-implementer` and `working-with-lead` as MUST loads. This run also carries verification-practice R2 and R7. R7's dependency, `practices-verification-maintenance`, is already written in this branch. |
| RL5 | `role-reviewer` | Add `working-with-lead` as a MUST load. Make The work target-neutral, with a design or spec case and a skill case next to the code case. The review phases and `skill-review` keep their methods; the role keeps independence and anchor-checked findings. |
| RL6 | `role-advisor` | Add `working-with-lead` and `working-with-owner`. New description: "Use when a Lead commissions you as the Advisor Sidekick, or the owner opens a session and names you as their Advisor, to challenge a design or an acceptance argument with a competing picture and tradeoffs. Not for the owner's ordinary conversation with the Lead, governing authorship or independent review findings." The owner-selection predicate is observable: the owner's own message names this session as the Advisor. In that case the owner is the commissioner. The Advisor still never authors the governing design, and its advice is neither review nor acceptance. |
| RL7 | `role-researcher` | Add `working-with-operator` as an IF load. |
| RL8 | `practices-manage-agents` | Remove the relationship guidance now owned by the role references. Let the Advisor be opened by the owner as well as commissioned by the Lead. In the Reviewer row, name a second commissioner: a review lead may start the stage reviewers its review procedure prescribes, each with no authoring history. The Lead still commissions the review lead. Keep the mechanics, model policy (including reviewer lineage), packets and schemas unchanged. Form rules don't change in this spec (see the open item). |
| RL9 | `skill-review` (skill-authoring plugin) | Add one consumer adapter. IF the host repository provides an agent-management practice with a Reviewer role, the review lead starts each stage reviewer through it, as that practice's permitted review-lead commissioner (RL8), so the reviewer loads that role and its `working-with-lead` reference. Otherwise use the host's own way, as today. Keep the two check families, the review-lead reduction and the correction loop. The plugin stays repository-generic, so it names no sunstack skill. |

`role-operator` gets no reference: no relationship of its own was decided.

## Boundaries

- Layer rule: a role may name practices, principles and its own references. Phases still reach roles only through `practices-manage-agents`.
- The typed schemas stay. Whether the Implementer contract should admit the Worker form is a schema change for the owner, recorded under open items.
- No pressure tests in this delivery (owner, 2026-10-15). Proof is static checks plus an adversarial Sol review.

## Coordination

- **Base:** branch `skills/practices-how-why` (PR #135 to `main`), worktree `ai-tools.skills-practices-principles`. Other Workers are editing phase skills and practices in parallel. The role runs touch only `role-*`, `practices-manage-agents`, `shared-references/implementer-verifier-pairing.md`, `shared-references/humanizer.md` (its consumer list only) and `skill-review`.
- **Order:** RL1, RL5, RL6, RL7 and RL9 can run in parallel. RL3 comes before RL4. RL8 runs last, after RL1–RL7, so that it removes only guidance that now has a home.
- **Run states:** RL1–RL9 proposed.
- **Landing:** the Lead commits each reviewed run and does the single `sunstack-dev` and `skill-authoring` version bump at the end of the PR.
- **Outside this spec:** the Implementer and Verifier contract changes in the open item below, and any change to model policy.

## Open items for the owner

- **Native Worker pairs.** The owner directed Opus native Workers for skill writing, with a paired Verifier. The retained contracts can't represent that pair: the Implementer contract admits only `executionForm: sidekick`, and the Verifier contract's `pairedImplementer` needs a real Router address, which a native Worker doesn't have. Options: change both contracts to allow a native Implementer plus a named relay through the Lead, or keep skill-writing Workers outside the typed contract as a recorded owner exception. Until the owner decides, this spec changes no form rule.
