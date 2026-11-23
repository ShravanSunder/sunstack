# Companion: home/work Gemini host map

Status: for owner review. Private `devfiles` change; do not land until the catalog proposal is accepted. No private files are edited in this PR.

The catalog owns family, role, and effort. This map owns which host can run each family and the exact id.

## Routing

| Family | Work | Home |
| --- | --- | --- |
| Gemini Neon | Cursor Task | AGY |
| Gemini Hydrogen | Cursor Task (Operator) | AGY |
| Gemini Carbon | Cursor Task (Frontier) | none |

Home Cursor may advertise Neon or Hydrogen. That does not make Cursor the home Gemini route. Do not use the dropped `gemini` CLI.

Home AGY launch is the parent process: `agy --model gemini-4-neon-high --print` (or Hydrogen’s id) with a prompt file. A child Codex/Claude/Cursor CLI must not spawn `agy`. A missing AGY, auth failure, or missing model is a coverage gap.

## Proposed `model-map.md.tmpl` Cursor and AGY sections

Work Cursor native, add:

| Family | Id | Equivalence |
| --- | --- | --- |
| Gemini Neon | `gemini-4-neon-high` | catalog Gemini Neon |
| Gemini Hydrogen | `gemini-4-hydrogen-high` | catalog Gemini Hydrogen Operator |
| Gemini Carbon | confirm on work Cursor | catalog Gemini Carbon Frontier |

Home Cursor native: unchanged. Still “not a coding host” for Gemini. Keep Grok only.

New **AGY** section, home (and optionally listed on work as unused):

| Family | Id |
| --- | --- |
| Gemini Neon | `gemini-4-neon-high` |
| Gemini Hydrogen | `gemini-4-hydrogen-high` |

No Carbon row. No Argon row.

## Proposed work overlay (`private_work-agent-instructions.md.tmpl`)

Keep Wonder/Opus implementation and Grok fetch. Additive:

| Job | Add |
| --- | --- |
| Implementation | Gemini Neon high (`gemini-4-neon-high`) as a Daily-driver option |
| Operator / prescribed | Gemini Hydrogen high (`gemini-4-hydrogen-high`) beside Luna; Grok stays fetch/research |
| Reviews | Gemini Neon high |
| Frontier / demanding | Gemini Carbon (id confirmed on work) |

Existing review extras (Opus, Wonder, Kimi, Grok) stay. Do not silently substitute.

## Confirm before applying the private PR

1. Work Cursor’s actual Carbon id (`gemini-4-carbon-high` vs `gemini-4-carbon-medium`). This home session advertised medium on 2026-11-21 and no Carbon on 2026-11-23.
2. Work Cursor still advertises Neon high and Hydrogen high.
3. Targeted `chezmoi diff` then `chezmoi apply` of `~/.config/agent-context/model-map.md` (both machines) and the work overlay on the work laptop only. This home live map is still the old Worker-table format and does not match the current template.

## Private changelog

One dated `devfiles/docs/changelog/` entry: Gemini families on work Cursor and home AGY; no credentials; no public `ai-tools` duplicate of the private ids beyond this companion note.

## Non-goals

Chezmoi apply in this public PR, live `~/.config` edits, router AGY endpoint, `NESTED_AGENT_CLI` exceptions.
