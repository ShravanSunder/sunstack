# Readable views standard: skill verification

Part four of four: [requirements](requirements.md), [specification](specification.md), [skill design](skill-design.md), skill verification. How each standard and obligation will be shown, decided with `skill-rules`' decision matrix (`plugins/skill-authoring/skills/skill-rules/references/decision-matrix.md`), and what stays unverified.

## The answer

Five of the seven standards can become rules Jev judges on the section of a design document that holds the view. Standard 3 can too, where the rule's target says which document it is reading; rules only ever target documents, so a chat map never meets it. Standard 4 needs your actual words from another file, so it stays a review check. The new label call is shown by its form and by the two routes traced in the specification. None of the rules exist yet: each waits for U8 to mark it and U10 to calibrate it, and agent behavior waits for the next real design cycle (settled decision 3).

## Each standard's route

The matrix's questions in order: a requirement, not stance; about a text, not an agent's actions; a unit the engine can select (the section that holds the view); visible in that unit's text, with a counterexample search; and whether the marked words alone make a good question.

- **1. The question in the heading or caption: judged rule.** The engine selects the view's section. A mechanical check that the heading or caption ends in "?" is only a proxy: "Who owns retries" keeps the standard and fails it, and "Any questions?" breaks it and passes. Deciding that the heading states the question this view answers needs reading comprehension, and the sentence reads as its own question. Pending U8.1; eval in U10.
- **2. One question: judged rule,** on the view's section, against the question its heading or caption states. Counting edge kinds or colors is no proxy for it: the timeout sequence with owner labels keeps the standard with two kinds of mark, and the overlay case breaks it whatever its count. Its eval set needs the three separating cases (a screen picture, a sequence with the ownership and error path its question needs, an unrelated overlay). Pending U8.1; eval in U10.
- **3. A durable document's level of detail: judged rule where the rules entry targets one kind of document** (Requirements, Specification, Program Design), so the question knows which level applies. A view with `document medium: none` is never a rule's target, and the standard doesn't apply to it. Where a rule can't say which document holds the view, it's a review check. Pending U8.1; eval in U10.
- **4. The reader's own words: review check.** One section doesn't show what words its reader uses; that needs your words from the Requirements or the intent, which is outside evidence (the matrix's third question). It could become a judged rule if the engine lets a rule carry another file as background for Jev; that's unverified (the spec found only HTML background).
- **5. The smallest view that answers: judged rule,** on the view's section. Pending U8.1; eval in U10.
- **6. Beside its text: judged rule.** The section holds both the view and the text around it, so a view with no text explaining it is visible there. Pending U8.1; eval in U10.
- **7. It changes what the reader concludes: judged rule,** on the view's section. Pending U8.1; eval in U10.
- **Every required field shown (`:79`, unchanged): review check** for the general sentence, because the required fields are in the consuming skill, not in the document. Each view's own rule (U3 to U6 write the sentence, U8 marks it) carries its fields and is judged.
- **Reads where it's shown (`:87-93`, unchanged): review check and browser look,** as today; the engine can't see pixels.

## Each obligation's route

Numbered as in the specification.

- **1. One sentence per standard, stated once, applied where each applies:** review check (a read-back of the section), then structural once U8.1 runs: the real engine lists one rule per marked sentence.
- **2. Loads `diagram-semantics.md` for a relationship view:** the call's form is a review check (one literal `IF …, load`, an observable condition, a named return). Whether agents reach it is behavior: shown in the next real design cycle, where the session record shows the loaded file.
- **3. A required view becomes a gap, never prose:** behavior, shown in the next real design cycle; U9's proof case "an otherwise valid document missing an entire required view must report a missing-view gap" covers the reporting side.
- **4. Loads `markdown-presentation-baseline.md` when a label would carry a technical form, and applies its decision:** the call's form is a review check. The specification traces both routes (a page, and Markdown alone) for a reader's own code name and a plain label; a reviewer re-walks them. Whether agents reach the call is behavior, next real design cycle. The label rule itself is the baseline's sentence (`:54`), so any checked rule for it would be marked there; the baseline isn't among Project 3's U8 hosts, so that stays a review check for now.
- **5. `pass` requires the standards that apply, the baseline's decision and every field:** the completion line is a review check; agents honoring it is behavior, next real design cycle.
- **6. Focus never removes a required field or a needed annotation:** review check, because it compares the view with the consuming skill's field list; each view's own rule (U8) carries its fields.
- **7. No product, tool, repository or incident named:** review check, with `skill-review`'s transfer check. The root's generalization rule is already marked (`domain-skill-crafting/references/generalization.md:5`), but Project 1's RuleSets select only skill-authoring's skills, not this plugin's references; it becomes a judged run here only if a later RuleSet selects them.
- **8. One home per meaning:** review check; it compares files.
- **9. Ownership described where it's described:** review check; it compares files.

Nothing above is a mechanical rule. Each judged rule stays pending until `skill-rules` has made it, and reports rather than blocks until its calibration passes (spec section 3).

## Proof plan

**Run 1 (U2).** Authoring basis: user-directed intent, so the honest claim before any evaluation is "drafted from user intent; behavior not yet evaluated". The proof shape for a reference: the pointer reaches the right detail, and the detail is applied correctly.

- Structural, at implementation: the contract test file still passes with its eight pinned strings (`pnpm --dir tests/skills exec vitest run lib/spec-program-design-user-requirements-contract.test.ts --config vitest.config.ts`; 16 of 16 pass on `66e8adae`, run 2026-10-27); a search shows the new section once, the `Good:` and `Bad:` lines gone, and both loads in their literal `IF …, load` form; each of the seven list items is one sentence.
- Behavior: the next real design cycle (settled decision 3). The phase's session record shows it loaded `diagram-semantics.md` for its relationship views and the baseline when a label carried a technical name, and review finds its views meeting the standards that apply. Until then, agent behavior is named unverified.
- Rule quality: U10 evals for standards 1, 2, 3, 5, 6 and 7, at least 15 true and 15 false cases per question as a floor, labeled before scoring, with a held-out set.

**Run 2 (U2b).** Mechanical: structural only. The consumer line names the rendering reference, and nothing else in the file changed.

## What this set can give U10's labels

Only the criteria your words were about: Bad 1, standard 2 false; Bad 2, the rendered check false; Bad 3, standard 5 false; Good 1, standard 2 true; Good 2, standard 2 true for the whole. Two cases are explicitly unknown and unscored: Bad 2 for standard 2 (a count of edge kinds doesn't decide it, and your words are about dashes), and Good 2's Operator row for standard 4 (your words ask for a better explanation, which doesn't settle whose words the row uses). Bad 2 and Bad 3 also have only an approximate revision, which settled decision 2 doesn't allow for a label, so they need a recovered revision or your label. Everything else is unlabeled.

## What stays unverified

- That agents apply the standards and reach the two new loads: until the next real design cycle.
- That Jev can judge standard 3 from one section once the rules entry names the document, and standard 4 at all.
- How well Jev judges a view from its Mermaid source rather than its picture (the spec's own open question, settled only by U10).
- The exact revisions you saw for Bad 2 and Bad 3.
- That today's renderer draws Bad 1's source on this page the way it looked to you on 26 October. Drawn again here with Demistify 1.15.4 (a headless capture on 27 October), it still hides edge labels behind boxes and cuts one off; whether the layout matches yours exactly isn't checked.
- Whether a third good view exists among your pages: this search found none, which doesn't show there is none.
