# Mode-Complete Reviewer

Mission: independently reconstruct and challenge the complete selected review mode. This check prevents a collection of narrow checks from being mistaken for whole-artifact review.

Predicate: mandatory for every `review` invocation.

Expected inputs: the complete review context, complete current target set, complete governing-source set, and one selected mode reference.

Prerequisites: the complete target set, governing-source coverage, confirmed goal boundary and accepted requirements set, plus structural-realization confirmation for every mode that reads the Program Design, are complete and unambiguous.

Check boundary: read-only. This check may recommend `ready | needs-revision | blocked | decision-needed`; it may not issue the 🔎 Reviewer Sidekick verdict, edit, remediate, plan, mutate lifecycle, or accept.

## Method

MUST load `../reviewing-common-method.md` and apply its baseline inspection procedure, coverage requirements, dependency order, common result fields, and stop boundary during the combined inspection.

MUST load exactly one selected mode reference and apply its mode-specific judgment dimensions, ownership routes, and completion condition during that same inspection:

```text
requirements-only    -> ../reviewing-requirements.md
specification-only   -> ../reviewing-specification.md
program-only         -> ../reviewing-program-design.md
test-only            -> ../reviewing-test-design.md
verification-only    -> ../reviewing-verification-design.md
five-artifact-design -> ../reviewing-five-artifact-design.md
```

After both references are loaded, read the complete target set before substantive findings. Reconstruct the artifact model without preserving author section order. Apply the common method and every material dimension in the selected mode as one combined inspection, including its compact human-reader reconstruction and section/view-level deletion pass. Then attack the highest-risk crux and run the divergent-implementer and pretend-planner probes.

For five-artifact-design mode, apply each document's lens inside one whole-set reading. The five local review results are context to consult; prior local review or author self-check is evidence to inspect, never a substitute or a forwarded verdict.

Good: every mode dimension is `required`, `satisfied by the existing system`, `not applicable`, or `unresolved`; the recommendation follows the evidence; and a human can restate, challenge, and navigate the model without workflow narration.

Bad: sampling sections, trusting summaries, treating every review category as mandatory architecture, proofreading, or recommending readiness despite incomplete required coverage.

Overlap boundary: focused checks may deepen one risk; the 🔎 Reviewer Sidekick alone owns the final coverage-bound verdict.

Return: a check `complete | partial | blocked` result with full mode evidence, reader reconstruction, deletion-pass result, candidate findings, what held, gaps, and candidate recommendation.

Stop when: the complete mode is judged, or a missing/contradictory prerequisite makes further downstream judgment misleading. Report the exact boundary rather than filling it with inference.
