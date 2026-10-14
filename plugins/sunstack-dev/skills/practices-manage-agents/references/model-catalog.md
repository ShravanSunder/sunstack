# Model catalog

| Tier | Definition |
|---|---|
| Workhorse | procedures, repeatable work, guided execution |
| Daily driver | execution or synthesis that needs judgment |
| Frontier | demanding judgment, design, or review |

A Daily-driver row needs one recorded reason: the owner recommends it, the commissioner says what the Workhorse lacks, or the Workhorse failed after corrections. Rows marked `User must authorize` are used only when the owner names them. Thinking Effort lists the allowed range for the row. A job that matches no row is not ready: cut it until it matches one, or bring it to the owner, who can name a model. An executor the owner assigned keeps its model and effort.

Exact id: the host's row in `~/.config/agent-context/model-map.md`; otherwise the host's current-generation id for the catalog row, never an older generation or a `-fast` variant; otherwise report the gap.

### 🔧 Operator

| Tier | Model | Thinking Effort | Direction | Span |
|---|---|---|---|---|
| Workhorse | OpenAI Luna | medium | Exact | any |
| Workhorse | OpenAI Luna | high | Complete, guided collection under supplied criteria | Local |

### 📚 Researcher

| Tier | Form | Model | Thinking Effort | Direction | Span |
|---|---|---|---|---|---|
| Workhorse | Worker, or a Sidekick when the model needs Router | OpenAI Luna | high | Complete | Local |
| Daily driver | Worker | OpenAI Sol | medium | Complete | Cross-domain |
| Daily driver | Sidekick, continuing investigation | OpenAI Sol | high to xhigh | Complete, Partial | Local, Cross-domain, Cross-system |

A Researcher Sidekick started only because its model needs Router keeps the bounded job's row and closing check, with no fan-out of its own. A continuing Researcher Sidekick may use Luna Operators or Researcher Workers for collection. Opus is not a research row; it needs the owner's override.

### 🐒 Implementer Sidekick

| Tier | Model | Thinking Effort | Direction | Span |
|---|---|---|---|---|
| Workhorse | OpenAI Luna | xhigh | Exact, Complete | Local |
| Workhorse | OpenAI Luna | high | Exact, Complete | Local |
| Daily driver | OpenAI Sol | medium | Complete | Cross-domain |
| Daily driver | Claude Opus | medium | Complete | Cross-domain |
| Daily driver | OpenAI Sol | high to xhigh | Partial | Cross-domain, Cross-system |
| Daily driver | Claude Opus | high to xhigh | Partial | Cross-domain, Cross-system |

### 🔬 Verifier Sidekick

| Tier | Model | Thinking Effort |
|---|---|---|
| Daily driver | OpenAI Sol | high to xhigh |
| Daily driver | Claude Opus | high to xhigh |

Choose a different lineage from the paired Implementer when one is available. A missing eligible route is a named gap, never a reason to drop the Verifier.

### 🔎 Reviewer Sidekick

Implementation review comes after the 🦁 Lead has assessed the work against the plan and its proof, asking the 🦉 Advisor to check it too when one exists. Reviewer Sidekicks then review each Project and Milestone, never a single Task or Subtask. Design and proposal reviews happen where their owning phase says and use the same reviewers. Every review has at least one reviewer from a different lineage (OpenAI, Claude, xAI) than the Lead or author.

| Tier | Model | Thinking Effort | Use |
|---|---|---|---|
| Daily driver | xAI Grok | high | |
| Daily driver | OpenAI Sol | xhigh | |
| Daily driver | Claude Opus | xhigh | |
| Frontier | OpenAI Astra | high to xhigh | User must authorize |

Beyond the rows above, another reviewer joins only when the owner asks for one and names its model.

### 🦉 Advisor Sidekick

| Tier | Model | Thinking Effort | Use |
|---|---|---|---|
| Daily driver | OpenAI Sol | xhigh | |
| Daily driver | Claude Opus | xhigh | |
| Frontier | OpenAI Astra | xhigh | User must authorize |
| Frontier | Claude Fable | high | User must authorize |

### 🦁 Lead

The owner chooses the Lead's model. Nothing here escalates it.
