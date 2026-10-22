# How the skill system fits together

The repository distributes instructions through plugins. An agent reads a skill when the task matches its trigger, follows its main path, opens the references that path requires, and returns the result that path defines. The skills guide an agent's decisions; the Markdown files are not an executable scheduler. Tools, scripts, schemas and tests enforce the mechanical properties they actually check.

The system has two related workflows. `sunstack-dev` guides software engineering. The independent `skill-authoring` plugin guides changes to instructions, including the engineering skills themselves. Plugin installation and client discovery determine which copy an agent can read. A change in this repository does not update an installed copy automatically.

The Codex marketplace is `.agents/plugins/marketplace.json`, Claude's is `.claude-plugin/marketplace.json`, and Cursor's is `.cursor-plugin/marketplace.json`. Codex local paths and Claude sources point to `./plugins/<directory>`. Cursor sources are directory names beneath its `metadata.pluginRoot: "plugins"`; repeating that prefix changes resolution. The plugin's own client manifests identify the distributed package/version. A repository skill, an installed cache and a project-local `verify-<app>` recipe are separate copies with different owners.

## Layers and calls

The `sunstack-dev` layers separate decisions that change for different reasons. They describe allowed dependencies, rather than a requirement to run every skill on every task. The standalone `skill-authoring` package has its own workflow and does not import these engineering practices automatically.

| Family | Owns | Example |
| --- | --- | --- |
| `orchestrator-*` | Routing a whole bounded job and interpreting phase returns | `orchestrator-design` carries one design cycle |
| Phases | One engineering step, its artifact and its judgment | `spec-design`, `program-design`, `implement-plan`, `implementation-review` |
| `role-*` | The assigned agent's responsibility, relationships and authority boundary | `role-lead`, `role-implementer`, `role-verifier` |
| `practices-*` | Reusable methods used when the work calls for them | Research, tracing behavior, verification, collaboration and cleanup |
| `ops-*`, `audit-*`, `presentation-*` | Operational, audit and presentation methods alongside practices | Linear tracking, security review, HTML explainers |
| Tool manuals | Exact calls, identities, receipts and errors for a tool | `agent-collaboration` |
| `domain-*` | Subject-specific knowledge a caller loads | TypeScript, Python and Rust standards |
| `principle-*` | One engineering judgment applied at a concrete decision | One owner per truth; verify before accepting |

The [plugin namespace map](../../plugins/sunstack-dev/README.md#namespace-map) is the skill inventory. The [principles index](../../plugins/sunstack-dev/docs/principles-index.md) explains the judgment each principle teaches. Neither index replaces reading the selected skill.

An orchestrator calls phases. A phase may use other skills at its own layer and methods below it, but does not call an orchestrator to decide its own continuation. Practices and tool manuals do not route upward into phases or roles. They return the supported result or a gap. A [phase return token](../../plugins/sunstack-dev/shared-references/phase-return-tokens.md) carries the gap and its evidence to the caller, which selects its owner within the existing task. A token never grants new scope.

Roles sit above practices. A role skill can call practices, operations, presentation, tool manuals, domains and principles, plus the phase its no-commission route names. Phases and orchestrators commission agents through `practices-manage-agents`; the packet's charter identifies the role skill. Management's role table is data, not an upward workflow call. Skills in one layer may refer to one another; cycles within a layer are permitted.

Principles are the bottom layer. They are hidden from model invocation, teach one judgment, and cite only sibling principles. A citing sentence supplies the moment and concrete action; the relative link supplies the depth. The agent reads the principle in full before applying it. Merely listing a principle's name does not apply it. Domains sit just above principles, are also hidden from model invocation, and are reached by an ordinary load call. Only principles use the citation form. Session-level instructions sit outside this graph and can supply additional authority or constraints.

### A skill's four surfaces

The [skill-creation model](../../plugins/skill-authoring/skills/skill-creation/SKILL.md#great-skill-frame) separates:

1. The YAML trigger: when the skill should load and where adjacent skills take over.
2. The `SKILL.md` main path: the mental model, decisions, required actions and finish conditions.
3. `references/`: detail reached by an explicit call. A branch is conditional; an always-required module can still have its own maintenance boundary.
4. Proof: evidence that the other surfaces change the behavior they promise.

`MUST load <reference> and return <result>` names work for the current agent. A conditional load adds an observable predicate. A dispatch names a prescribed helper procedure and its observed result; it does not delegate an unnamed judgment. A principle citation supplies judgment at the action it qualifies. These forms, their exact wording and their exceptions belong to [skill-creation's call grammar](../../plugins/skill-authoring/skills/skill-creation/SKILL.md#call-grammar).

## Roles and execution forms

A role answers what the agent owns. A form answers how the agent is hosted and continued. A model is selected separately for the commissioned job.

| Role | Responsibility | Handback |
| --- | --- | --- |
| 🦁 Lead | Work with the owner, author governing design and plans, integrate contributions and accept delivery | A decision supported by inspected source and proof |
| 🦉 Advisor | Independent second looks, owner questions and permitted unblocking | Checked judgments, limits and recommendations |
| 🐒 Implementer | Assigned changes, product tests, associated proof and corrections | The change and its evidence |
| 🔬 Verifier | The project's verification apparatus and observation of a declared target; challenge offered tests | Observations and proof gaps |
| 🔎 Reviewer | Independent judgment of a declared artifact without authoring history | Anchored candidate findings |
| 📚 Researcher | A bounded question or continuing investigation | A checked answer with sources and gaps |
| 🔧 Operator | A prescribed procedure with no intervening design judgment | Actions, observations, exceptions and exit codes |

A Worker is a native bounded subagent. A Sidekick is a separately managed session reused by address. The [management skill](../../plugins/sunstack-dev/skills/practices-manage-agents/SKILL.md) classifies direction, span and horizon, selects the permitted role/form/model, preflights the assignment and validates its packet. Its schemas encode packet structure; they do not confer authority beyond the commission. Model names and transport details remain in management's current catalog and provider references.

For an implementation workstream, the Implementer and Verifier are paired and receive one another's addresses before starting. The Implementer owns repairs; the Verifier observes and maintains the allowed verification apparatus. The Reviewer remains independent of authorship. The Lead opens the decisive source and evidence before adopting a handback or accepting the integrated result. A delivery receipt proves delivery at its reported stage; it is not acceptance.

The current role contracts are the source of detail: [Lead](../../plugins/sunstack-dev/skills/role-lead/SKILL.md), [Implementer](../../plugins/sunstack-dev/skills/role-implementer/SKILL.md), [Verifier](../../plugins/sunstack-dev/skills/role-verifier/SKILL.md) and [Reviewer](../../plugins/sunstack-dev/skills/role-reviewer/SKILL.md). Loading a role file changes no filesystem or publication permission. Merge authority is established through the current request and [PR wrap-up](../../plugins/sunstack-dev/skills/implementation-pr-wrapup/SKILL.md); readiness alone never grants it.

## The four-document design

[Design orchestration](../../plugins/sunstack-dev/skills/orchestrator-design/SKILL.md) has the Lead author four separately identifiable documents, then obtain independent review of their current meaning:

| Document | Decision it owns | Next consumer |
| --- | --- | --- |
| Requirements | Authorized needs, users, outcomes and limits | Specification |
| Specification | Domain entities and observable obligations, including failure, reference and proof constraints | Program Design |
| Program Design | Owners, homes, interfaces, state, flows and observation seams | Verification Design |
| Verification Design | How each requirement will be shown to hold on a target, against its reference, with a failing condition and explicit limits | Review, planning and verification |

The [shared design-document contract](../../plugins/sunstack-dev/shared-references/design-documents.md) owns these meanings. Specification defines the nouns before obligations. Program Design binds them to structural homes. Verification Design plans an observation; it never reports that the observation has occurred. The former five-document drafts, with a separate Test Design phase, are historical proposals and do not describe this runtime.

For several concerns, a capability key connects each need to obligations, realization and proof. Each `U` and `R` has one home capability, plus links to anything it also serves. Entity definitions belong to the set. A single concern stays flat. The document owners extend the same through-line rather than copying a requirement into several homes.

A document may be one Markdown file or an ordered index over cohesive chunks. A chunk earns its boundary by answering a reader's question and changing for its own reason. File length does not decide it. The set's `index.md` is the agent entry and names the documents and task/capability reading paths. When an HTML page is warranted, it is a human entry over those same sources. Markdown keeps the full detail; HTML controls how much is visible at once.

The [rendering reference](../../plugins/sunstack-dev/shared-references/diagram-rendering-and-fallbacks.md) selects Markdown or HTML and owns source composition, diagram placement, freshness and visual checks. The owning phase selects what a view must mean. [Diagram semantics](../../plugins/sunstack-dev/shared-references/diagram-semantics.md) chooses a relationship family before syntax; [Mermaid usage](../../plugins/sunstack-dev/shared-references/mermaid-usage.md) decides whether Mermaid earns use. HTML delivery and the matching Demistify guide belong to [presentation-html](../../plugins/sunstack-dev/skills/presentation-html/SKILL.md). An embedded page is regenerated and compared after source edits; matching text does not prove a side view is semantically correct.

## From design to delivery

Design-only work ends at its reviewed design or exact gap. Planning does not begin simply because a preceding phase finished. When delivery is authorized, [plan-implementation](../../plugins/sunstack-dev/skills/plan-implementation/SKILL.md) creates the canonical proof-bearing plan from a current admitted design basis, and [implement-plan](../../plugins/sunstack-dev/skills/implement-plan/SKILL.md) executes that plan's slices. The implementation orchestrator owns continuation within the requested delivery boundary.

The executor supplies fitting change proof. The Lead assesses the diff and evidence before [independent implementation review](../../plugins/sunstack-dev/skills/implementation-review/SKILL.md). Corrections return to their cause's owner. [PR wrap-up](../../plugins/sunstack-dev/skills/implementation-pr-wrapup/SKILL.md) handles publication, checks, comments, mergeability and the authorized terminal. Source review, tests, real-system observation, installed delivery, PR readiness and merge are separate claims.

`practices-verification` observes the adopted outcome through the project's own `verify-<app>` skill when available. [Verification maintenance](../../plugins/sunstack-dev/skills/practices-verification-maintenance/SKILL.md) builds and updates that recipe. Lasting journeys use self-describing scripts in the project's own script location; the skill indexes when, why and how to use them. Temporary probes stay with task evidence until their results are retained. The apparatus's owner does not repair product code or redefine the expected outcome to make a run pass.

## Skill authoring

The [skill-authoring plugin](../../plugins/skill-authoring/README.md) is a separate package, designed to work beside other workflows without importing their practices. This repository's operating instructions supply its trace, Git and delivery conventions.

For a broad portfolio question, `skill-audit` examines current instructions, real usage evidence and selected upstream sources, then classifies update, create, merge or skip. Each recommendation identifies the fix owner: teaching, a code check, or the tool. A single skill's design and writing belongs to `skill-creation`; independent judgment belongs to `skill-review`. `skill-orchestrator` carries one admitted change through spec, implementation, proof, assessment, review and the scoped release. `skill-rules` handles the subset of standards that should become executable checks.

The [proof-and-claims reference](../../plugins/skill-authoring/skills/skill-creation/references/proof-and-claims.md) bounds what a fresh run establishes. The plugin ships no general semantic eval runner or stored pressure-scenario corpus. The repository's historical test harness is a separate surface. A static check, scenario catalogue or successful named example does not establish general skill reliability.

### Follow one concrete change

Suppose a named skill's trigger sends a requirements interview to implementation. The first check is the current description, its neighboring triggers and an actual recorded task. That distinguishes a wording defect from a client that never offered the intended skill. The Lead uses `skill-creation` to state the intended routing and proof before editing; a domain standard applies only if the change also touches that subject. A principle such as read-ground-truth-first informs that investigation at its citing decision, while `practices-research` supplies the source-gathering method. These are different responsibilities within the same work.

After spec review, the executor changes the owned trigger and any affected metadata/reference. Proof observes an eligible fresh task against the intended and neighboring routes, rather than checking only that YAML parses. The Lead assesses it, independent skill review judges the change, and the authorized release updates the owning plugin's version and changelog. If the source is already correct and the installed copy is stale, repair delivery at that boundary instead of rewriting the teaching. This example follows the existing authoring workflow; it adds no new approval or test requirement.

## Source and artifact homes

| Material | Home |
| --- | --- |
| Runtime skill instructions | Owning plugin's `skills/<name>/SKILL.md` and its references |
| Runtime procedure with real shared consumers | Owning plugin's `shared-references/` |
| Maintainer explanation of this repository | `docs/architecture/` |
| Plugin-local maintainer index | Owning plugin's `docs/` and README |
| Current skill-change spec | `docs/wip/skills-authoring/<date-name>/` |
| Curated failure, investigation, lesson, authoring evidence or portfolio backlog | The configured private memory-log repository's `skills/` lanes |
| Conversations and conversational handoffs | The configured private session-log repository's project lanes |
| Raw build output, caches and disposable working material | Task-scoped system temporary storage |
| User-visible shipped changes | `docs/changelog/` |

Shared references are runtime dependencies and should remain small. Similar headings alone do not justify sharing a packet whose fields mean different things in different skills. Keep phase-specific schemas, reducers, proof contracts and examples with their owner. Architecture links those owners without becoming another runtime contract.
