# Review Schema

This reference owns the fields and labels `decision-model-review` fills: check statuses, verdicts, finding fields, reduction fields and round deltas, and how each maps into a routing review. It holds no judgment: the checks decide what they find, and the review's Reduce step decides duplicates and scope.

**Consumers:** each check reference fills a check record; the Reduce step fills the finding and reduction fields; the verdict and the round delta close the return.

## Check record

```text
check: state-and-evidence | questions | primitives-and-statistics | policy-and-composition | proof-and-claims | patterns-and-capability
status: complete | partial | blocked
inputs read: <the supplied inputs this check read, whole>
missing: <none | the input a partial or blocked check lacks, and who restores it>
candidates: <each candidate finding, in the finding shape below>
```

- `complete`: the check ran on every input it needs.
- `partial`: it ran on what was supplied, and names what it couldn't read.
- `blocked`: it couldn't run, and names why.

## Finding

```text
anchor: <file and line, or entry, question or step name>
standard: <the domain-decision-models standard it breaks, quoted>
failure: <the failure form, in one line>
evidence: <the bad control matched, or the failure condition observed>
blocking: yes | no
correction: <the smallest change that would make the check pass>
source: <the check or checks that raised it>
```

A finding's identity is its anchor plus its failure form.

## Reduction

```text
disposition: kept | merged | rejected
merged with: <the finding it joined, when merged>
rejected as: scope expansion | not supported by the material | outside the reviewed model
reason: <one line>
```

## Round delta (direct commission, with a previous return supplied)

```text
new: <findings absent from the previous return>
recurring: <findings present in both, by identity>
closed: <previous findings no longer found>
```

## Verdict

```text
verdict: ready | needs-revision | blocked-input | not-converging
probes owed: <each probe request, or none>
unavailable proof: <each claim the records can't support, or none>
```

Precedence, first match wins:
1. `blocked-input`: nothing supplied supports any check.
2. `not-converging`: the commissioner's supplied policy, or the routing review's rule, says so.
3. `needs-revision`: any kept blocking finding; or, at the delivery stage, a required check that is `partial` or `blocked`.
4. `ready`: none of the above.

## Into a routing review

A routing review reads each kept finding as a candidate under its own contract. The fields map onto the router's:
- anchor → anchor;
- standard → rail;
- failure → failure form;
- blocking → severity;
- correction → smallest correction.

The routing review's convergence rule governs the rounds. This schema doesn't import its contract, and it doesn't import this one.
