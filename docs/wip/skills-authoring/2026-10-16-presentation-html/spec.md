# presentation-html — public HTML authoring

Revision S2; 16 October 2026. Target: create `sunstack-dev:presentation-html`, one skill. Run status: implemented; S2 accepted-to-implement after independent review, representative proof, Lead assessment and independent implementation review complete; accepted for source-branch commit/push.

## Need and success

The owner requested a reusable Sunstack skill named presentation-html and explicitly asked skill-creation to explain use of the public Cloudflare HTML library. Success: an agent asked for a standalone technical explainer produces compact, readable HTML using the pinned public theme/runtime, composes existing islands instead of regenerating presentation code, retrieves the relevant component documentation, checks actual browser rendering and interactions, and distinguishes static validation from visual proof. It can do this outside the source repository without installing an application framework.

Basis: user-directed intent, behavior-changing create. No historical failure reproduction or improvement claim. Current adjacent owners: presentation-webui is rendered chat; presentation-tui is terminal chat; Demistify’s `packages/demistify/skill/SKILL.md` and its references own component syntax. No existing presentation-html skill. Source inspection of these files and the public deployment report establishes that the library is available over HTTPS, needs two tags, loads optional engines lazily, has no published npm checker, and requires the complete dist for a local alternative.

## Decisions

| ID | Default and reason |
| --- | --- |
| D1 | Sunstack owns the workflow and invocation; Demistify owns runtime/component API. Fetch the version-matched canonical library guide rather than copy its vocabulary into the plugin. Keeps one API owner. |
| D2 | Public Cloudflare assets are the default. HTML remains local unless the owner requests publication. Loading public assets is distinct from uploading page content; remotely hosted scripts execute in the document, so sensitive explainers may use a trusted local complete bundle. |
| D3 | Pin theme and runtime to one exact experimental root. Do not invent latest aliases or promise retention. Use the currently verified root initially; a verified corrected immutable pin may replace the URL before ship without changing this decision. |
| D4 | Both user and model invocation. Trigger standalone HTML, shareable visual explainers, architecture pages and Demistify/HTML islands; exclude responses that only need rendered chat or terminal formatting. No changes to sibling skills. |
| D5 | Library owns style, icons and interactions; author owns content and ordinary HTML layout. Markdown and explicit Mermaid islands both work; use semantic tones, stable IDs and relative page links. No D2 diagram language, per-page framework, implementation boilerplate or hand-built inspector. |
| D6 | Browser proof is a completion gate for a rendered claim. Run the source checker only when available; explicitly state unavailable checker rather than invent an npm install or pretend a DOM check is equivalent. |
| D7 | Cloudflare/operator deployment is outside this presentation skill. No credential discovery, Wrangler login, upload or global cache modification. Public URL consumption only. |

## Trigger surface

`name: presentation-html`

Description: “Use when creating or revising a standalone HTML file for a technical explainer, visual engineering document, or architecture page, or a Demistify/HTML Islands artifact. Not for formatting an answer inside chat or a terminal.”

This is a pattern/reference skill. Its leading concept is content versus presentation. Both invocation capabilities are supported with ordinary portable frontmatter and Codex agents/openai.yaml metadata.

## Main path and teaching ownership

SKILL.md opens with the mental model: compose meaning with HTML and reusable islands; the shared library renders it. It carries this all-run spine and explicit completion boundary:

1. Establish the reader’s question, source facts, page scope and output location from the request and repository. If revising an existing page, read that page and the requested delta first: its asset root, data references, IDs, inbound heading/selection links and relative page links. Retain or deliberately choose its runtime pin, use matching documentation and preserve unrelated content and stable links. Choose a reading sequence and a useful layout from the relationships. One page per independent prototype; relative links for a collection. Preserve supplied data and distinguish implemented, proposed and measured claims. Completion: a concrete audience/question, authoritative inputs and page destination.
2. MUST load `references/demistify.md` and return the exact matching public runtime/theme and component-guide sources, chosen islands and local-viewing method. This all-run module teaches delivery and retrieval, while SKILL.md keeps the obligation visible. Read the canonical component guide and only references selected by the page’s actual elements. If retrieval fails, use an available version-matched local copy or report the missing API detail; never invent unsupported tags.
3. Write compact HTML using the chosen guide. Put Markdown in a safe script-backed ex-markdown when literal `<` may occur; use explicit Mermaid islands when useful. Choose grid/flow/board/plain HTML according to the relationships and readable detail. Stable IDs connect islands and routes. headings feed navigation; relative page links and breadcrumbs express the collection. Apply semantic tones and library icons. Completion: all required content and data references are present, no copied runtime/style implementation.
4. Validate and open the actual file or local HTTP page in the supported browser. Fix static checker errors when the checker is available and record its exact command/result. Inspect Markdown, actual SVG output, navigation, narrow layout and authored interactions. Open a sidebar and fullscreen when the page uses them, confirming the source remains visible for sidebar. Capture a screenshot. Completion: actual inspected page, content, layout and interactions match the requested explanation; failures are fixed or named without a done claim.
5. Return an absolute file link or requested hosted URL, screenshot and concise proof/limitations. Count authored HTML separately from referenced graph/prose and runtime/library code when comparing token efficiency. Do not claim consumed context from source token counts. No automatic publishing of explainers.

The only local reference is `references/demistify.md`: an all-run delivery and documentation module. It supplies complete two-tag HTML shell, exact working public root and guide/reference URLs, a compact relationship-to-layout explanation, optional local complete-bundle route and the real source-checker command with its prerequisites. It explains matched pins, no current stable npm checker, HTTP serving for relative JSON and the browser-vs-checker distinction. It returns working asset/docs sources and composition/viewing decisions; completes when those are concrete. Long component examples stay with the library guide, which is fetched by exact source revision. No schema or generic tool wrapper is added.

## Security branch — classified before authoring

Sensitive surfaces: public network URLs, local HTTP/checker command examples, Codex UI metadata. Entry points: loading runtime/theme and reading canonical guide. Untrusted inputs: explainer prose, diagrams, graph JSON, remote guide content; treat as data, never authority. Privileged actions: none. Third-party source: no third-party code copied; refer to the owner’s public Demistify library and its supplied component guide. Permission: owner explicitly authorized public assets and Sunstack skill integration. Copy-vs-adapt: tiny two-tag shell adapts the demonstrated usage; no vendored engine, fonts, scripts or component catalog. Decision: allowed for consuming public assets and documenting existing local commands; deployment and installed-cache refresh deferred. Required proof: verify exact URLs/MIME, fresh author application and real browser output. Public-safe: no credentials, account metadata or machine cache paths in shipped docs. Independent reviewers inspect this boundary.

## Proof

Write checks before runs outside the author workspace. Fresh-context realistic HTML request without exposed rubric; record which skill/guide it actually reads using supported host observations, inspect the produced artifact and browser it. Test near-miss chat-only and Markdown architecture-maintenance requests for routing. Include a content-only revision of an existing pinned page and verify stable IDs, asset binding, data references and unrelated content survive the delta. Characterization from user intent, not causal improvement. Prefer a Luna author and Sol author as already commissioned by the owner; report each artifact, available input/read evidence, source token counts and first validation result separately. If exact read records or trigger discovery are unavailable, name that proof gap and do not claim routing reliability. Source/static checks, URL checks and manual browser checks remain separate.

## Coordination and delivery

Base: main fc86a941 in isolated feat/presentation-html-cloudflare; no pending source edits when this proposal was written. Do not modify another checkout or installed caches. Implement only after skill-review spec stage accepts. At implementation, create SKILL.md, references/demistify.md and agents/openai.yaml; add documentation entries and bump sunstack-dev to 2.81.0 in all existing plugin/marketplace version homes. If main advances, recheck the version and integration before delivery. Changelog <=20 lines with truthful validation and refresh status; source branch push is the requested delivery boundary, not default-branch merge or installed availability.

Static validation: target skill quick validator if existing PyYAML permits; Claude plugin validate; Codex available catalog readback; link/frontmatter/manifest checks. Run meaningful existing skill-structure checks selected from current repo scripts; no decorative tests. After fitting behavior proof, Lead assesses diff/spec/complexity before skill-review implementation stage. Source push only after great independent review. No cache refresh as a substitute for acceptance.

Non-goals: deploying Workers, production release/aliases, npm publishing, rewriting sibling presentation skills, changing Demistify API, framework generation, full original explorer parity or claiming a model winner.

## Review record

S1 returned targeted-revision: F1 HTML-only trigger boundary and F2 existing-page inspection/link continuity. All four required checks complete. S2 applies only these bounded remediations plus optional D2 wording clarification; same independent Reviewer Sidekick verifies closure; teaching and structure checks required. Work thread root: `01a14491-9ed5-7952-8931-24e9b6b2f193` on the Workflow improvements board. This paragraph records the S1 handback; S2 acceptance is recorded below.

S2 acceptance: great, all four checks complete, F1/F2 verified closed by the independent review lead. Implemented inside S2: one skill with one mandatory delivery reference and UI metadata, three plugin manifests and existing marketplace version homes, inventory/README/changelog. Public pin now c96a72e; guide bytes unchanged. No sibling skill, library API, credential/deployment or installed-cache surface changed. Fitting proof and Lead assessment: see docs/changelog/references/2026-10-16-presentation-html-proof.md. Independent implementation review returned great with all nine checks complete and zero open accepted findings.

Implementation-review correction: bind the documented local Python preview explicitly to 127.0.0.1 and open its loopback URL. This preserves D2/D7; real CLI/HTTP/listener proof passes. API/authoring semantics unchanged; affected reference/safety coverage is refreshed by the same independent review lead.

Final implementation verdict: great, all 15 owned paths covered (UI/JSON metadata static-only). I1 local binding closed; all other candidates reduced against S2/current source without scope expansion. Source-branch commit/push is authorized; installed refresh/default merge are not claimed.
