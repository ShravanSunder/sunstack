### 2. Model the problem and its domain before proposing obligations

Name what happens today, who bears the cost, where it is observable, what proves it, and what would remain wrong if the requested feature existed only nominally. Keep implementation root cause separate from the observable problem.

Using the already-loaded `references/authority-and-problem-framing.md`, complete problem modeling and return its second result: the authority/problem model with current reality, desired gap, important decisions, conflicts, and evidence gaps. Retain it in working state for the artifact and terminal return.

MUST load `references/domain-entities.md` and return the entity table (stable `E` identifier, canonical term, identity rule, relationships with cardinality, invariants, observable states, the source terms it canonicalizes, and the authorizing U rows when present or otherwise the settling source or decision record) with every slot filled from the sources or marked as an exact gap, plus undefined-noun gaps and any term routed to `discuss-pathfinding` with its exact same-instance question. Define an entity when the settled sources let two readers decide the same-instance question the same way; route a term only when they cannot. Deriving an identity rule or state from settled owner behavior statements is Specification authoring. The inference `references/authority-and-problem-framing.md` forbids is filling in owner meaning the sources leave missing. Two rationalizations leave nouns undefined at this stage and both are rejected: "the data model is design's problem", and "the source did not define enough entity semantics, so I must ask", which is a stop only when two readers would answer differently. An entity definition names no type, schema, table, package, or payload field; that binding is `program-design`'s work.

When revising existing artifacts, classify the requested correction before editing: Requirements, Specification, Program Design, or a named combination. Removing unrelated concurrency, cleanup, reporter, or lifecycle machinery is a Program Design correction unless the authorized owner also changes users, outcomes, requirements, scenarios, defaults, observable obligations, or proof obligations. A Program Design-only correction routes to `program-design` and does not authorize narrowing the governing Requirements or Specification. When upstream meaning and Program Design both change, settle Requirements and Specification first.

For a semantic correction to an existing Requirements or Specification view, re-open its governing sources, re-run correction classification and the affected view predicate and semantic-field check, update affected trace links, and run artifact self-review. Skip unrelated stages unless the correction invalidates their source or decision result. Pure rendering-format changes route to `docs-maintain`.

Using the comparison taught by `references/authority-and-problem-framing.md`, build the accepted requirements set from the current owner-confirmed requirements record and confirmed goal boundary. If unavailable, recover the last inspectable owner-accepted governing source. If neither exists or the sources conflict, return `decision-needed` with the authority conflict; mutually narrowed current files never establish the accepted starting point by themselves.

Reuse the existing identities and coverage links for:

- affected classes and stable U/E/P/O/R/C/V identities;
- priorities and assigners;
- named variants such as skills or scenarios;
- customer defaults;
- observable contracts, constraints, and proof obligations.

Do not create a separate ledger or duplicate document. Every removed or superseded item needs explicit owner authority.

Produce inspectable per-item coverage that names each accepted identity, authoritative meaning, and specification destination or owner-authorized supersession. A count or an assertion that coverage is intact is not coverage evidence.

Re-anchor before deriving or revising normative requirements: compare the proposed meaning with the confirmed goal, accepted requirements, permitted and protected systems, owner-set package limits, non-goals, and existing foundation from the confirmed goal boundary. Return `aligned` or the exact mismatch. On mismatch, stop normative authoring and return the existing owner decision, or use `discuss-clarify-mental-models` when the shared model itself drifted. Keep the comparison in returned workflow state, not durable specification prose.

Completion: the current/desired gap is inspectable, each causal claim is evidenced or labeled as a hypothesis, every noun the desired outcomes name is a defined entity with an `E` identifier and every slot filled or marked as an exact gap, accepted-requirements coverage is inspectable when applicable, and the Re-anchor comparison is aligned or has returned the exact mismatch and owner route.
