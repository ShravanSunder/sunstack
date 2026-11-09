# Mode-Complete Reviewer

Mission: independently reconstruct and challenge the complete selected review mode. This check prevents a collection of narrow checks from being mistaken for whole-artifact review.

Predicate: mandatory for every `review` invocation.

Expected inputs: the complete review context, complete current target set, complete governing-source set, and one selected mode reference.

Prerequisites: the complete target set, governing-source coverage, confirmed goal boundary and accepted requirements set are complete and unambiguous.

Check boundary: read-only. This check may recommend `ready | needs-revision | blocked | decision-needed`; it may not issue the 🔎 Reviewer Sidekick verdict, edit, remediate, plan, mutate lifecycle, or accept.

## Method

MUST load `../reviewing-common-method.md` and return its common result fields, applying its baseline inspection procedure, coverage requirements, dependency order, and stop boundary during the combined inspection.

MUST load exactly one selected mode reference and return its judgment on each mode-specific dimension, applying its ownership routes and completion condition during that same inspection:

```text
specification-only   -> ../reviewing-specification.md
program-only         -> ../reviewing-program-design.md
four-document-design -> ../reviewing-four-document-design.md
```

After both references are loaded, read the complete target set before substantive findings. Reconstruct the artifact model without preserving author section order. Apply the common method and every material dimension in the selected mode as one combined inspection, including its compact human-reader reconstruction and section/view-level deletion pass. Then attack the highest-risk crux and run the divergent-implementer and pretend-planner probes.

For four-document-design mode, independently repeat load-bearing specification, program-design, and verification-design checks. Prior local review or author self-check is evidence to inspect, never a substitute.

Good: every mode dimension is `required`, `satisfied by the existing system`, `not applicable`, or `unresolved`; the recommendation follows the evidence; and a human can restate, challenge, and navigate the model without workflow narration.

Bad: sampling sections, trusting summaries, treating every review category as mandatory architecture, proofreading, or recommending readiness despite incomplete required coverage.

Overlap boundary: focused checks may deepen one risk; the 🔎 Reviewer Sidekick alone owns the final coverage-bound verdict.

Return: a check `complete | partial | blocked` result with full mode evidence, reader reconstruction, deletion-pass result, candidate findings, what held, gaps, and candidate recommendation.

Stop when: the complete mode is judged, or a missing/contradictory prerequisite makes further downstream judgment misleading. Report the exact boundary rather than filling it with inference.
