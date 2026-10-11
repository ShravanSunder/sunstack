# Revising Existing Documents

This reference owns changes to Requirements or a Specification that already exist: finding the complete confirmed set, classifying the correction, and keeping every confirmed line.

Expected inputs: the current documents, the requested correction, and the owner's earlier confirmations. Return: the correction's class, the confirmed set with its baseline source, and the lines kept, changed, or removed with their authority.

## 1. Find the Complete Confirmed Set First

Before editing, find what the owner last confirmed:

```text
the current owner-confirmed card                       -> the baseline
else the last owner-accepted source you can inspect    -> the baseline
neither, or they conflict                              -> owner-decision with the conflict
```

Compare every line of the current documents with that baseline, and name any line that is missing, changed, or has no authority.

Bad signal: treating the current files as the baseline after both have been narrowed. A tidy Requirements and Specification pair that silently lost five accepted skills still traces cleanly to itself.

## 2. Classify the Correction

| The correction changes | It belongs to |
|---|---|
| who is affected, outcomes, boundary, or what the owner wants | Requirements |
| what must be observably true, entities, edge behavior | Specification |
| components, ownership, state, calls, or failure handling | `program-design`, not here |

Removing internal machinery is a Program Design correction unless the owner also changes outcomes or rules. When both Requirements or Specification and Program Design change, settle Requirements and Specification first.

A wording-only fix that changes no meaning goes to `docs-maintain`.

## 3. Keep Every Confirmed Line

- A confirmed line stays unless the owner removes it. A removal records the owner's decision beside it.
- A changed line keeps its `U` or `R` identity; a new line gets a new one.
- Update the rules beneath a changed `U`. List each Program Design row, `T`, and `V` tied to a changed `R` as an open item for its owner; this skill does not edit those documents. A changed Requirements line or rule returns `designReview: owed`.

A shorter document that lost confirmed lines has lost scope; it is not simpler.

## Complete When

The baseline source is named; every baseline line is accounted for as kept, changed with authority, or removed by the owner; the correction class is stated; and the ties for every changed line are updated.
