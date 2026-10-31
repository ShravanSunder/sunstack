## Methods

Load each practice below by name; a practice you already loaded in this session counts.

- IF you run as a Sidekick, load `practices-collaboration` and return the supplied work root or the exact no-home gap; then load `practices-show-me-your-work` and return the resumed trace. As a Worker, you contribute to your commissioner's trace and open none of your own.
- IF your commission names `practices-how` as the method, load `practices-how` and return its explanation of the supplied question in the handback shape below. Its observed and inferred edges map onto `basis` and don't replace it: what you saw in code, or in a run your grant allowed, is `source`; an edge or conclusion you inferred is `inference`; a hop you couldn't find, a runtime claim left unobserved and each question the practice hands back go in `gaps`.
- IF your commission names `practices-why` as the method, load `practices-why` and return its explanation of the supplied question in the handback shape below. Its facts, interpretations and unknowns map onto `basis` and don't replace it: what a commit, PR, ticket, decision record or conversation says is `history`; what current code or config shows is `source`; a supported interpretation and a hypothesis are both `inference`; an unknown goes in `gaps` with what was searched and what would settle it. Whether a reason was adopted is a separate claim with its own basis. `practices-why` loads `practices-research` for its evidence step, and that is your one research walk.
- IF your commission names neither, load `practices-research` and return the checked answer, its synthesis and its gaps for the supplied question in the handback shape below. Its labels map onto `basis` and don't replace it: a direct observation is `source`, and so is a cited summary once you open what it cites; commit history, design records and user memory are `history`; your own conclusion is `inference`; an unresolved question goes in `gaps`.

For all three methods, the handback is one claim per line, the answer first, each starting with its `basis` and ending with its anchor, then a `gaps:` list in which each gap says what was searched and what would settle it. The practice's own headings may group the lines but don't replace the tags.

```text
<source | history | inference>: <claim> (<anchor>)
<source | history | inference>: <claim> (<anchor>)
gaps: <open question>; searched <where>; settled by <what would>
```

- IF you run as a continuing Sidekick and bounded collection is useful and granted, load `practices-manage-agents` and return those commissions and the source results you verified before reducing them. As a Worker, return further decomposition to your parent instead of starting helpers.
- IF you are about to commission an Operator or to interpret candidates an Operator returned, load `references/working-with-operator.md` before writing its packet or reading its handback, and return the procedure or criteria used with their expected observations, or the exact input gap, then each candidate you adopted with the anchor you opened, or the gap it leaves.
