# Tracking and requested presentation

Revision r2. Behavior-changing, user-directed intent. Two runs: update `practices-show-me-your-work`; create `presentation-work-log`, both in sunstack-dev.

The owner confirmed that show-me-your-work tracks and uses logs during ordinary work, and that no page is created or refreshed until explicitly requested. The owner approved splitting these responsibilities and requested skill-creation, the skill-rules CLI and a separate reviewer afterwards.

Success: qualifying work continues to record decisions, assumptions, outcomes, owner asks, audit and acceptance without creating HTML or requiring a page to finish. An explicit owner request creates or refreshes a work-log page through unchanged presentation-html. Having an old page, a checkpoint, a stop, an unresolved question, or a skill load is not a request.

The page preserves four h2 topics, heading-based contents, evidence and uncertainty, while allowing helpful visual components and free-form explanation. Fixed Story wrappers and labelled rows no longer dictate its HTML. Pressure testing and further example generation are explicitly out of scope for this split; the owner will follow up later.

Evidence: installed and main-source logger requires rendering at every checkpoint and terminal response; its no-board fallback also requires a page. The current experiment yielded text-heavy pages after wrapper removal. The latter is an observed example, not proof of a causal skill improvement.

Non-goals: changing log storage, row identity/retry/closure semantics, broad log cleanup, frozen workflow-v1 edits, changing presentation-html, Router product work, merging, releasing or refreshing installed caches. This run creates no owner/status HTML page; the owner explicitly withheld automatic page creation.
