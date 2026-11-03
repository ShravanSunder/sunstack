# Skill rules design

The agent entry. Humans read the page once it exists (its format belongs to the design-documents Lead). This set replaces `docs/wip/skills-authoring/2026-10-31-rules-as-nudges/` (revisions 1 and 2) for PR #188.

| Document | Entry | Status |
| --- | --- | --- |
| Requirements | [requirements/index.md](requirements/index.md) | draft |
| Specification | [specification/index.md](specification/index.md) | draft |
| Program Design | [program-design.md](program-design.md) | draft |
| Verification Design | [verification-design.md](verification-design.md) | draft |

Chunk shape (agreed with the design-documents Lead, 3 Nov): each row opens with its id, kind, links and status; decisions and assumptions live in the Lead's trace, each naming its authority.

## Through-line: rule-making

[need](requirements/rule-making.md) → [obligations R1–R5](specification/rule-making.md) → [owner and call path](program-design.md#trace) → [proof](verification-design.md#the-rows)

## Through-line: nudges

[need](requirements/nudges.md) → [obligations R6–R12](specification/nudges.md) → [Program Design](program-design.md#trace) → [Verification Design](verification-design.md#the-rows)

## Through-line: skill-kinds

[need](requirements/skill-kinds.md) → [obligations R13–R17](specification/skill-kinds.md) → [Program Design, with the engine feature](program-design.md#the-engine-feature-owner-assessment) → [Verification Design](verification-design.md#the-rows)

## Through-line: rule-tests

[need](requirements/rule-tests.md) → [obligations R18–R21](specification/rule-tests.md) → [Program Design](program-design.md#trace) → [Verification Design](verification-design.md#the-rows)

## Through-line: what-rules-read

[need](requirements/what-rules-read.md) → [obligations R22–R24](specification/what-rules-read.md) → [Program Design](program-design.md#trace) → [Verification Design](verification-design.md#the-rows)

## Reading path: line 17, end to end

1. [U16 case 2](requirements/skill-kinds.md#u16): the owner's answer for a general skill loading a product's workflow
2. [R13](specification/skill-kinds.md#r13), [R14](specification/skill-kinds.md#r14): `ops-observability-stack` is judged **any repository**, so product-leak judges it
3. [R23](specification/what-rules-read.md#r23): its chunk includes line 17 with `agentstudio-loop.md`'s opening
4. [R6](specification/nudges.md#r6): the nudge's parts
5. [R11](specification/nudges.md#r11): the agent's disposition decides the broader question, not "make it pass"
6. [R18](specification/rule-tests.md#r18): product-leak nudges only because it passed its cases, PR187's before and after among them
7. [The path from line 17 to the agent](program-design.md#the-path-from-line-17-to-the-agent): who calls whom, from the runner through the assessment and the gate to the printed nudge; [the nudge, as the agent reads it](program-design.md#the-nudge-as-the-agent-reads-it-reportts): which part comes from where
8. [Proof](verification-design.md#the-rows): the U1 · R6 row (every part on line 17, a second nudge, a quiet control) and the U13 · R13, R14 row (the kind census)

## Reading path: is this rule worth running?

1. [R1](specification/rule-making.md#r1): its named mistake → 2. [C1](specification/rule-making.md#c1): its entry → 3. [C5](specification/rule-tests.md#c5): its case set → 4. [R20](specification/rule-tests.md#r20): its bars and their cases → 5. [the derived rule state](program-design.md#the-derived-rule-state-runner) and [the case-run receipt](program-design.md#the-case-run-receipt-case-runjson-new-committed) → 6. [proof](verification-design.md#the-rows): the U17 and U18 rows

## Concept: the kind of a skill

Named by rule-making, skill-kinds, what-rules-read and nudges. Meaning: [E5](specification/entities.md#e5). Requirements: [U13](requirements/skill-kinds.md#u13). Obligations: [R13–R15](specification/skill-kinds.md). Picture: the entity map in [entities.md](specification/entities.md). The engine feature that carries it: Program Design.
