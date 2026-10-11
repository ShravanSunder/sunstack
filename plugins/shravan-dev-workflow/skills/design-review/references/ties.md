# Ties

This reference owns the tie table: following every Requirements line and Specification rule down, following every downstream item up, telling a missing tie from an invented element, and marking a tie unchecked when its source is unavailable.

Expected inputs: the five documents as available, read whole, and the list of unavailable sources. Return: the tie table, with each row in the `Tie` shape of `DesignReviewResult`.

## The Tie Rules

```text
down   every U has at least one R, or a stated reason
       every R has a Program Design trace row, at least one T or "not regression-tested: <why>",
         and is covered by a V
       every U's core outcome has a V on the real surface
up     every R, Program Design element, T, and V names the line above it
       anything with nothing above it was invented
```

## Scope

Walk down only into documents that are review targets. A document below the targets that is not under review is outside this review: it is neither a gap nor unchecked. A Requirements-only review stops at whether each line is sound; a Requirements and Specification review checks `U` to `R`; and so on. The full rules above apply when all five documents are targets, as in the design cycle. "Unchecked" is only for a governing source above a target that cannot be read.

## Walk Down

Each row of the tie table fills the `Tie` shape in `DesignReviewResult`: a `down` tie names its `from` line, the items `to` below it, and its `status` (`tied`, `gap`, or `unchecked`); an `orphan` names the `item`, its `document`, and its `missingParent`. A `gap` tie is also a finding.


For each `U`, then each `R`, list what sits below it and say `tied`, `gap`, or `unchecked`. A tie is more than a link: open the downstream item and confirm it does the job. A trace row whose cells are filled, a scenario whose expected outcome comes from that rule, a check that observes the core outcome on the real surface.

```text
U3 -> R4, R5 -> trace rows R4, R5 -> T2, T3 -> V1 (core outcome, real surface)    tied
U5 -> R7 -> trace row R7 -> no T, no reason -> V2                                 gap: R7 has no test or reason
```

## Walk Up

Walk every row and every cell of Program Design's trace table; do not sample.

- A blank cell is a finding, and so is "see above" or "see interfaces".
- `gap: <why>` is an honest marking of missing design. Report it only when it leaves a rule unrealized that the design should have settled.
- `none: <why>` is valid in the `E` cell and for values that do not apply. The `U` cell always names a Requirements line: a rule with nothing above it was invented.
- There is one row per rule; two rules sharing a contract keep separate rows.
- Each cell agrees with the section it summarizes, and a cross-cutting row names the mechanism's owner.

Route a defective cell to `program-design`. Route a row whose `U`, `R`, or `E` points at something the Requirements or Specification do not contain to `spec-design`.

Then take every Program Design element, every `T`, and every `V`, and name the line above it.

## Missing or Invented

- **Missing:** a line above with nothing below it. The finding routes to the owner of the document that should carry it.
- **Invented:** something below with nothing above it. List it as an orphan with its missing parent. The default correction is deletion; if it seems needed, the Lead brings the owner a brief. It is never quietly adopted.
- **An invented top:** a Requirements line whose source does not say it. A clean trace below does not rescue it: a rule tracing neatly to a line the owner never wrote still traces to nothing.

## Unchecked

When a governing source is unavailable, mark every tie that depends on it "unchecked: <source> unavailable". It is neither tied nor invented, and any unchecked tie keeps the result from `ready`.

## Complete When

Every `U` and `R` has been followed down with each tie marked `tied`, `gap`, or `unchecked`; every trace-table row and cell has been walked; every Program Design element, `T`, and `V` has been followed up or listed as an orphan with its missing parent; and no tie that depends on an unavailable source is counted as tied or invented.
