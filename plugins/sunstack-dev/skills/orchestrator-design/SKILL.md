---
name: orchestrator-design
description: "Use when a user asks to run, resume, or finish one design cycle: Requirements, Specification, Program Design, Verification Design, their independent review, and the first implementation plan reviewed with them. Not for a direct design phase, changing a plan during delivery, implementation delivery, or PR work."
---

# Design Orchestration

One design cycle produces four documents in order: Requirements and Specification (`spec-design`), Program Design (`program-design`), then Verification Design (`verification-design`). One independent review then judges them together, and a first cycle ends with the first implementation plan, which the owner reviews beside the design. The orchestrator is the Lead. It writes every document in this session by loading each phase, assigns only the review out, routes each correction to the owner of the defect, and ends at an honest design terminal: reviewed and design-ready, or stopped at the exact decision or blocker. Phases own their judgment, the review owns its findings, and the orchestrator owns the route and the final claim.

MUST load `../../shared-references/design-documents.md` and return the four document identities and the boundaries each handoff is checked against.

MUST load `practices-show-me-your-work` at the start and return the work reference, or the unshared checkpoint path, and whether this run owns the whole work or contributes to it. If tracking can't start, report the gap and keep designing; tracking never gates review unless the user made it a gate.

MUST load `practices-preflight` at entry and return `ready` or the gap list; route only the work no open gap blocks.

## Who Writes

The Lead writes every governing document, section, diagram and visual brief in this session. Helpers bring evidence only; never assign one to author a design document. IF assigning research or independent review, load `practices-manage-agents` and return the responsibility, continuity and assignment boundary.

When the user says to write it, load the phase and write.

| Rationalization | Reality |
| --- | --- |
| "spec-design owns the document, so spawn a Sidekick" | the phase owns judgment; this session loads it and writes |
| "the section is settled, so delegating it is just wording" | choosing structure and prose for governing content is authorship; helpers return evidence, not sections |
| "the handoff says continue, so this session is the new Lead" | authorship moves only on the user's explicit direction naming the successor Lead and the transferred scope, recorded in the successor packet |
| "I'll patch the skills so this route is allowed first" | the phase skill is the instruction; load it and write |

## Orient and Route

Reopen the user's intent, the governing sources, each design document, and any current phase or review result. The trail says where to look; verify each load-bearing claim in its current source, because a recorded event never proves current state.

Load the smallest owner that can advance the current state, and verify its return below:

| Current state | Owner |
| --- | --- |
| fresh design request, or Requirements or Specification missing or stale | `spec-design` |
| Requirements and Specification current; Program Design missing or stale | `program-design` |
| the first three current; Verification Design missing or stale | `verification-design` |
| all four current; no current review | the persistent 🔎 Reviewer Sidekick runs `spec-program-review` in `four-document-design` mode |
| unmade owner meaning blocks a phase | `discuss-pathfinding`, returning to that phase |
| review `ready`; no current delivery plan | `plan-implementation`, for the first plan (Design Terminal) |
| review `ready`; an existing delivery plan | the delivery caller, with the corrected identities and that plan's path (Design Terminal) |
| review `ready`; the user asked for design only | the design terminal, `ready-for-planning` |

Accept a producer's recommended next owner only from this table, and a producer's stop as the run's exact stop. MUST load `../../shared-references/phase-return-tokens.md` and return each returned token with its payload, mapped to its next owner here:

| Token | Next owner |
| --- | --- |
| `requirements-gap` | `discuss-pathfinding` |
| `specification-gap` | `spec-design` |
| `program-design-gap` | `program-design` |
| `verification-design-gap` | `verification-design` |
| `ready-for-planning` | the design terminal below |

A destination neither table allows blocks the run; don't invent a route.

For a new file-backed document, pass `new artifact home: <project-root>/docs/specs/` to `spec-design`, `program-design` and `verification-design`, and check that each returns its own path beneath that home. Leave authoritative existing documents where they live. Decisions and their detail go to the central trail; the project gets no lifecycle ledger, replay store, digest or per-turn report.

## Verify Each Return

Before routing on, check what the phase returned: the document's identity and path, its result and next owner, the evidence behind it, and the finding or decision that justifies the route. Require an exact source identity, such as a reviewed commit, only where correctness depends on it.

For each newly written or substantively revised document, check its own rendering result from the shared rendering owner: the document medium, and for every fired view a `pass` or an exact gap. A missing result, or a view marked complete without one, goes back to that phase. The medium is the shared owner's choice; don't re-judge it here.

Keep going across phase boundaries. A phase return is a checkpoint, not the end of the run.

## Review and Correction

Prefer one review-and-correction round. Further rounds follow `spec-program-review`'s convergence rule in its `references/finding-and-reduction-schema.md`; pedantic, stylistic or already-satisfied findings don't earn one. IF the review returns `not-converging`, load `../../shared-references/owner-decision-brief.md` and return a brief of what keeps failing.

Dispose of each review result against the sources:

| Result | Action |
| --- | --- |
| `ready` | the design terminal |
| a non-semantic or unsupported finding | reject it with evidence |
| a mental-model break or unmade owner meaning | stop dependent work; load `../../shared-references/owner-decision-brief.md` and return the brief with the failed assumption, evidence and consequence |
| accepted bounded findings | correct them through their owners; the same 🔎 Reviewer Sidekick verifies the corrected anchors |

A round runs the affected owners in document order, `spec-design`, `program-design`, then `verification-design`, and corrects each affected document once. A downstream document is affected when an upstream correction changes an obligation, seam or row it uses. The retained Reviewer Sidekick then checks the corrected anchors and current affected evidence; that check belongs to the same review and starts no new round. Authoring before the first review uses no round. If earlier review results are missing, commission an ordinary review; it sets the baseline.

## Design Terminal

`ready` requires four distinct current documents, an independent `four-document-design` review, the retained Reviewer Sidekick's verification of every corrected anchor, and the Lead's acceptance. It means design-ready, not implemented. Short of `ready`, return the exact decision or blocker and its owner.

At `ready`, the entry context chooses the terminal:

| Entry context | Terminal |
| --- | --- |
| no current delivery plan (a first design cycle) | load `plan-implementation` with the four reviewed identities, the requested terminal and every repository the design touches, and return its result with the first plan's path. That one plan covers all of those repositories, never one repository's plan with a handoff to the rest. Then give the owner one page over the design and the plan. For a new feature, wait for the owner to approve or change the plan, then return `ready-for-implementation` with the four design identities and the plan path; the approval goes on the work thread, never in the plan file. For improvement work, record the page and the decision to proceed on the work thread, and return the same result unless the owner objects. |
| an existing delivery plan (a design correction during delivery) | write no plan. Return the corrected, reviewed design identities and the existing plan's path to the delivery caller, which loads `plan-update`; that skill judges the completed slices and when the update reaches the owner. |
| design only, as the user asked | return `ready-for-planning` with the four reviewed identities |

While the owner hasn't answered a new-feature gate, the gate holds: keep working on anything the plan doesn't touch, and start no Implementer.

IF the user asked for continued delivery, load `orchestrator-implementation-goal` with the terminal's result and the requested terminal, and return its delivery result. It owns plan updates, implementation, review and PR work from there; continue into it in the same run instead of stopping at the design terminal.

At each owner return and at the terminal, checkpoint the decision, reason, evidence and result through `practices-show-me-your-work`, including blocked, deferred or stopped work.
