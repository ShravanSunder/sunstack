# Reviewing Requirements

This reference owns `requirements-only` mode judgment: whether the Requirements says what the owner adopted, for whom, and within which boundary, with authority a reader can inspect. No Specification is required for this mode.

Return: the authority, adoption and scope judgment, with each finding anchored to the row and the source it cites.

MUST load `../../../shared-references/requirements-specification-program-design.md` and return whether the Requirements identity is present and resolvable, and, when a Specification exists, whether it is a different document.

## Authority Before Coverage

Open each normative-eligible U row's authority and follow it to its source. Authority belongs to whoever adopted the row: an owner decision, an adopted record, a binding contract. An author's restatement, a convincing proposal or current code behavior is not authority, however well the rest of the document connects to it.

The most dangerous Requirements defect is fully connected and wrong:

```text
U4   "Operators want sends retried automatically until they arrive."
     authority: authorized, citing the design thread
     traces:    R3 retry obligation -> router retry owner -> retry tests -> retry verification
Thread:     the owner wrote "a failed send should be visible so I can resend",
            and the agent summarized it as automatic retry.
```

Every link downstream holds, and the row still promises an outcome the owner never adopted. Traceability cannot catch this; only opening the cited source can. The finding is a Requirements correction to `spec-design`: restate U4 from the owner's words, or bring the retry question to the owner as a decision.

## What to Inspect

- affected classes are distinct (end users, developers, buyers, operators, downstream agents), with each class's job, current pain and evidence, or the pain marked unknown;
- each adopted outcome is separate from any requested mechanism;
- each row's authority state is inspectable, and only `authorized` rows are normative-eligible;
- the confirmed goal boundary names the existing foundation, the missing outcomes, permitted and protected surfaces, owner-set package limits, non-goals and acceptable complexity, and the owner confirmed or corrected it;
- each non-goal blocks a scope guess a capable implementer would make;
- the Requirements confirmation, or an explicit owner waiver, exists for this document;
- unresolved hypotheses are visible as hypotheses, never as requirements;
- a revision keeps every accepted identity or carries owner-authorized supersession, judged against the owner-confirmed or last inspectable owner-accepted baseline;
- user-visible moments that change a screen are shown or recorded as `no current UI`.

Use the pretend Specification author: could someone write observable obligations from this document without inventing who the work serves or what the owner adopted? A required invention is a readiness failure.

Good: each row names a class, an outcome, its evidence and its adopter; the boundary would reject the nearest plausible expansion.

Bad: "users want reliable routing"; a row marked authorized because it reads well; an aggregate authority label over mixed rows; a mechanism stated as a need; a boundary of "production-ready and complete".

Route Requirements corrections to `spec-design`, and meaning only the owner can supply to `discuss-pathfinding` with return owner `spec-design`.

Complete when: every normative-eligible row's authority was opened at its source, the goal boundary and its confirmation are judged, the strongest fully-connected-but-wrong risk was checked against the cited sources, and the pretend Specification author's inventions, if any, are findings.
