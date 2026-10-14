# Classifying Review Requirement

This reference owns deterministic, reviewer-free local-review classification. Its typed return is `ReviewClassificationSchema` in `../schemas/review-classification.ts`.

Expected inputs:

```text
requested mode: requirements-only | specification-only | program-only | test-only | verification-only
the mode's covered documents (see the mode table in SKILL.md)
scope and claimed semantic effect
complete scoped governing-source inventory
matched material-risk predicates
caller requirement: required | none; defaults to `none` when absent
prior review coverage plus a parent semantic-change record when coverage may be reused
```

Return either a complete classification:

```text
invocationState: complete
requestedMode and targets
classification: review-required | non-substantial
decisionBranch: forced | matched-risk | non-substantial | semantic-fallback
basis: what changed, whether meaning changed (yes | no | uncertain), the evidence,
       the affected mode and focused-check predicates, and any coverage reused
callerRequirement
```

or a blocked one, with no classification:

```text
invocationState: blocked
missingInputs: each missing or ambiguous input, exactly
```

Apply after blocking incomplete inputs:

1. `review-required / forced` when the user requests review or caller requirement is `required`. A producer passes `required` on each document's first or substantive local cycle, so that review cannot be classified away.
2. `review-required / matched-risk` for Requirements work when a row's authority, a priority, an affected class, the goal boundary or a non-goal changes, or a row is added or removed.
3. `review-required / matched-risk` for Specification work when product meaning is load-bearing; multiple requirements, consumers or contracts change; public or security-sensitive behavior changes; decisions or surfaces interact; or material ambiguity was resolved.
4. `review-required / matched-risk` for Program Design work when multiple components, owners or interfaces change; state, failure, concurrency, trust, platform, data, compatibility or proof architecture is material; or ownership or dependency direction changes.
5. `review-required / matched-risk` for Test Design work when a scenario's wrong behavior, oracle source, layer, real interaction or completion signal changes, a scenario is added or dropped, or an existing test's keep, repair or remove decision changes.
6. `review-required / matched-risk` for Verification Design work when the declared reference, target, route, observation point, passing condition or a named limit changes, or a case is added or dropped.
7. `non-substantial` only for copy, whitespace or formatting, link repair, review or process metadata, typo-only work with no meaning change, or one bounded factual clarification making no readiness claim. A public contract version, a reference version, or another load-bearing value is semantic even when it looks like metadata.
8. `review-required / semantic-fallback` for every remaining semantic change. An uncertain semantic effect is never non-substantial.

An absent `caller requirement` is `none`. `caller requirement` only escalates. It never suppresses a user request, a risk match, or semantic fallback.

`five-artifact-design` is never classified here: the first integrated readiness always needs the whole-set review. After that review, the parent may carry coverage across a non-semantic edit only by recording the semantic-change evidence above. This deterministic classification dispatches no model reviewer.

Complete when: one total semantic-effect decision exists and validates against the classification schema, reused coverage is named when applicable, or the exact missing input blocks without a fabricated classification.
