# Gemini families in the v2 model catalog

Status: for owner review. No skill file has changed.

Run: `update` of `sunstack-workflow-v2:practices-manage-agents`. Class: behavior-changing. Basis: user-directed intent (2026-11-21). Companion private map: [companion-host-map.md](companion-host-map.md).

## Success, in the owner's words

- Add AGY Gemini Neon high for reviews.
- Add the Neon family in general when the host has it.
- Work Cursor has Neon, Hydrogen as Operator, and Carbon as Frontier.
- Home uses AGY for Neon and Hydrogen.

## Evidence

Current v2 catalog (`plugins/sunstack-workflow-v2/skills/practices-manage-agents/SKILL.md`) has no Gemini rows. Operator is Luna high only; implementation is Terra/Sol/Opus; verification is Terra/Sol; independent review is Sol/Opus. Frontier is defined and unused. Line 133 still says Luna remains Operator-only.

Host ids in the private model-map template currently list no Gemini family. Work Cursor extras (Wonder, Kimi, Grok) stay overlay-only, as on 2026-11-03.

Observed availability (home machine, not work):

| Surface | Neon | Hydrogen | Carbon |
| --- | --- | --- | --- |
| AGY 1.5.14 (`agy models`) | low–xhigh | low–xhigh | absent |
| This Cursor Task list, 2026-11-23 | `gemini-4-neon-high` | `gemini-4-hydrogen-high` | absent |
| This Cursor Task list, 2026-11-21 | `gemini-4-neon-high` | absent | `gemini-4-carbon-medium` |

There is no `agpy` binary; home Gemini is `agy`. Nested `agy` from a child CLI is blocked. Router has `codex-local`, `claude-local`, `cursor-local`; no AGY endpoint. The `gemini` CLI stays unused.

## Target catalog

Families stay unversioned in the skill. Exact ids stay in the host map. A missing family or id is a gap, not a silent substitute.

| Family | Tier | Role use |
| --- | --- | --- |
| Gemini Hydrogen | Workhorse | Operator, Exact Steps, high, beside Luna |
| Gemini Neon | Daily driver | Independent review high; implementation high for Local and Cross-domain when the host has Neon |
| Gemini Carbon | Frontier | Demanding judgment / extra review, work Cursor only |

### Operator

| Model | Thinking effort |
| --- | --- |
| OpenAI Luna | high |
| Gemini Hydrogen | high |

### Implementation (add)

| Model | Thinking effort | Span |
| --- | --- | --- |
| Gemini Neon | high | Local, Cross-domain |

Terra remains the Local default. Neon does not take Cross-system.

### Independent review (add)

| Model | Thinking effort |
| --- | --- |
| Gemini Neon | high |

Google is a review lineage next to OpenAI and Claude. At least one different-lineage reviewer remains required.

### Frontier (new table)

| Model | Thinking effort | Use |
| --- | --- | --- |
| Gemini Carbon | high | Work Cursor only. Report a gap if the host does not advertise Carbon high. |

### Also in the same skill run

- Replace “Luna remains Operator-only” with: Operator families are Luna and Hydrogen.
- Launch: if the selected Gemini family has no native host id, home AGY is a parent-run `agy --model <id> --print` route, not a nested child CLI and not a silent Cursor Task spawn. Work Gemini uses Cursor Task.
- No Neon verification row. No Argon. No Gemini CLI.

## Decisions (owner may strike any row)

| Decision | Rationale |
| --- | --- |
| Catalog names families; the map names ids | Existing split. `gemini-4-neon-high` does not belong in the skill. |
| Hydrogen is Operator only | Owner: Hydrogen (operator). Not an Implementer. |
| Neon is Daily driver for Local and Cross-domain implementation, plus review high | Owner: Neon in general when available, and AGY Neon high for reviews. Cross-system stays Sol/Opus. |
| Carbon is the first v2 Frontier row, work Cursor only | Owner: Carbon frontier. AGY does not list Carbon. Home Cursor advertising Carbon is not the home route. |
| Home Gemini route is AGY even when Cursor Task lists Neon or Hydrogen | Owner: home AGY for Neon and Hydrogen. |
| Work extras (Wonder, Kimi, Grok) stay overlay-only | Already the 2026-11-03 pattern; this change does not promote them into the catalog. |
| Home AGY is parent-run CLI until a router endpoint exists | Nested `agy` is blocked; no `agy` Sidekick endpoint today. |
| Carbon high is a gap if Task only advertises medium | Exact-id rule: do not substitute effort. Confirm the work Cursor id before ship. |
| Frozen v1 is untouched | Archive rule. |

## Runs in sequence

| # | File | Change |
| --- | --- | --- |
| 1 | `plugins/sunstack-workflow-v2/skills/practices-manage-agents/SKILL.md` | Catalog tables and Operator/launch sentences above |
| 2 | `plugins/sunstack-workflow-v2/skills/practices-manage-agents/references/delegation-examples.md` | Operator may be Luna or Hydrogen; Neon is an eligible different-lineage reviewer |
| 3 | `plugins/sunstack-workflow-v2/AGENTS.md` | “Luna high is Operator-only” → Operator families are Luna and Hydrogen |
| 4 | Plugin manifests and marketplaces | `sunstack-workflow-v2` 0.5.1 → 0.6.0; dated public changelog |

Companion (separate private PR, after this catalog is accepted): [companion-host-map.md](companion-host-map.md).

## Proof

- Static: the three Gemini families appear in the catalog; Argon and `gemini -p` do not; v1 is unchanged; `claude plugin validate .`; `git diff --check`.
- Behavior: unverified until an agent picks Neon review, Hydrogen Operator, and reports Carbon/AGY gaps correctly. Named gap: no live eval authorized.

## Non-goals

New router AGY endpoint, Neon verification, replacing work Wonder/Kimi/Grok, reviving Argon, Gemini CLI allows, cache refresh, merge.
