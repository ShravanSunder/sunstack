# presentation-html — observed authoring proof

16 October 2026. Subject: the new Sunstack skill on `feat/presentation-html-cloudflare`, based on main `fc86a941`. This is manual application/reference characterization of an owner-requested skill, not causal improvement or installed-plugin trigger proof. The skill source was unchanged across the positive runs; the later loopback-command correction is identified below. Independent implementation review returned great: all nine selected checks complete, zero open accepted findings.

## Subject identity and actual reads

The two fresh read-only subjects were gpt-6-luna with high effort and gpt-6.1-sol with xhigh effort. They received the same synthetic session-reconnection brief, task-local skill and matching library guide. The request asked them to apply presentation-html and return HTML; it did not expose checks or ask which files they used. Normal hooks remained enabled. No provider session files were read. The supported ACP adapter's live action stream, captured by the parent process, supplied tool read evidence.

For each initial subject, the returned tool output contained the complete bytes of all four sources below, verified against the source files rather than inferred from the command name or author summary. The canonical guide was available as a matching local copy. Sol attempted its public URL first; a web-reader attempt supplied no usable body, and the complete local guide/code reference was then read. This is fallback proof, not proof of that web reader fetching the guide.

| Source | UTF-8 bytes | o200k_base source tokens | SHA-256 |
| --- | ---: | ---: | --- |
| presentation-html/SKILL.md | 3,722 | 660 | a9721b789c6c46628df5531c2374778b0684d55d62735243f00bcf6645555b58 |
| presentation-html/references/demistify.md | 5,027 | 1,019 | 21a4d49e8092ec573dbaa481f12760829df5884f8d4c76dffa3983c3caf6d80d |
| matching Demistify authoring/SKILL.md | 4,833 | 1,242 | a9e5a4b9bb4bfddb764395141fb4bd92d41d6ba7ccc8c74657d13e6ab8f6c822 |
| matching authoring/references/code.md | 563 | 160 | 608fa82d1be524c4c8cc059780b2c2980eece1ac223a88ac1a2e619a5abf0781 |

No installed cache was modified for this proof. The source copy was supplied explicitly, so automatic discovery remains unproved. A separate Router observation path returned only session metadata; those records were not treated as opened-file evidence. The live ACP action stream closed that specific evidence gap.

## Authored HTML, first failures and correction

Artifacts and screenshots are preserved in [Sunstack tools round 15](https://github.com/ShravanSunder/sunstack-tools/tree/feat/demistify-distribution-authoring-experiments/apps/demistify-poc/experiments/agent-written/round-15-presentation-skill). Each model has a separate page. The parent extracted the complete doctype-through-html response verbatim and appended one newline; no style, content or API repair was made by the parent.

| Subject | Initial bytes / source tokens | First checker result | One correction request | Corrected bytes / source tokens |
| --- | --- | --- | --- | --- |
| Luna high | 4,922 / 1,099 | 2 errors: unsupported tone=option on two cards | Only substitute an allowed tone; preserve all other content | 4,924 / 1,099; 0 errors, 0 warnings |
| Sol xhigh | 6,102 / 1,416 | 1 warning: missing blank line after Markdown heading | Only repair heading spacing; preserve all other content | 6,103 / 1,416; 0 errors, 0 warnings |

The corrections used fresh contexts supplied with the existing HTML and exact checker feedback; they were not continuations carrying the first run's context. Luna returned only the two tone substitutions. Sol inserted only the requested blank line. Matching checker command: `node packages/demistify/bin/demistify.ts check <page.html>` from a dependency-installed Node 26 Sunstack tools checkout. Initial combined exit 1; corrected combined exit 0. Both first-pass failures remain inspectable.

These are source tokens measured with the existing js-tiktoken 1.0.21 o200k_base tokenizer, not billed model output tokens. Authored usage excludes the runtime, theme, engines, fonts and packaging. The brief is a separate 1,497-byte / 293-token input. Skill workflow plus delivery reference is 1,679 source tokens; selected reusable API documentation is another 1,402. Do not hide these documentation inputs when discussing context efficiency.

The adapter emitted used-context snapshots: Luna 38,559 → 45,708; Sol 32,393 → 38,293, each reporting size 731,500. These are observed protocol counters with different initial harness context and effort, not billed usage or an isolated task cost. No latency, billing, repeated-run distribution or universal model ranking is established.

## Actual browser observations

Both corrected pages were first opened over an authorized local HTTP preview in Chrome using computer use, with theme/runtime from the exact public c96a72e pin. The source itself needed no framework install. Observed on each: Markdown became headings/prose, heading navigation changed the fragment, code and line comments rendered, Mermaid produced actual SVG (Luna 1; Sol 2), and the document had no horizontal overflow at the observed wide viewport. Screenshots are in round 15.

On the corrected Luna page, opening the code sidebar retained 9 main code rows and showed 9 panel rows, without a moved-content placeholder. Separately, the independently authored Luna revision page preserved its initial IDs, breadcrumb, brief link and asset pin, passed its independent verifier's checker, rendered one sequence SVG, and passed sidebar retention and fullscreen-close restoration in the Lead's Chrome observation. Its raw HTML prose departed from the skill's Markdown preference and two wording nits remain recorded; it is evidence, not a perfectly compliant exemplar. The verifier observed source/static/HTTP identity, not a browser.

A separate Sol revision page passed static checks but its file URL was refused by the browser tool. It was not mirrored to bypass that refusal and carries no browser completion claim. Browser viewport override did not establish a narrow viewport; narrow layout remains unverified across this proof. No screenshot substitutes for that gap.

## Near misses and existing-page continuity

- A chat-only Luna request naming a brief file did not open the HTML skill or create HTML, but also declined to read the brief. Overall request completion failed; this is not counted as a passing comprehension case.
- A fresh inline-facts Luna request answered in three sentences without opening a skill or emitting HTML.
- A fresh Markdown README-maintenance Sol request returned ordinary replacement prose without opening the HTML skill or emitting HTML.
- A focused Luna content-only revision changed the title and h1 visible text from Planning map to Planning dependencies. Exact byte comparison matched only those two replacements; the runtime/theme pin, external planning.json reference, stable IDs, breadcrumb, details link and unrelated prose were unchanged. It read the existing page and skill/guide, but omitted the mandatory delivery-reference read; this is successful continuity with a method-conformance limit. It did not run the graph or prove explorer interactions.

The negative cases offered the skill description/path in the prompt, not a real installed catalog. They establish bounded behavior under that description, not general automatic trigger accuracy.

## Static integration and proof limits

Claude plugin validate passed. JSON manifests and matching source marketplace versions are checked separately. The quick validator was not run because its existing Python environment lacks PyYAML; no dependency was installed only for that validator. Codex available-catalog readback parsed but does not advertise this unpublished 2.81.0 source branch. Installed-cache refresh, default-branch merge and marketplace propagation are outside this delivery boundary.

No extra unit suite was added for Markdown/JSON. The existing real checker and browser journeys provide the appropriate scoped evidence. Public URL/body/CORS proof for the deployed library and canonical guides is recorded in the Sunstack tools inspection deployment report; this skill change does not deploy infrastructure.

## Bounded review correction and targeted proof

The implementation review identified that Python's default server binding is all interfaces, contrary to the local-viewing intent. The reference now adds `--bind 127.0.0.1` and uses an explicit `http://127.0.0.1:<port>/page.html` URL. The positive-run table above retains the actual pre-correction reference hash; it is not relabelled as a read of this new file. Current reference SHA-256: `5082b5a9e728991c06fad26daab40ee7b7e23c97ba09a490c6a70c3d1183581b`.

The corrected command was run with an unused port and the existing corrected Luna artifact directory. HTTP returned 200 and body SHA-256 f7a0b0c06ab82c2dbf24e01c93917f70e985b31219aa04479786f6c72bfeba8e, identical to source. Inspection of that exact child process showed only 127.0.0.1:4188 listening. The owned child was stopped after proof. This is real CLI/HTTP proof of the changed recipe; unchanged HTML rendering was not repeated. No API, task, storage or publishing boundary changed.

## Lead assessment before independent implementation review

Need and spec: current source implements accepted S2's standalone-HTML trigger, revision-preservation branch, shared-library mental model, mandatory binding/reference retrieval, semantic composition, checker/browser distinction and public-loading-versus-publishing boundary. The current SKILL.md matches its complete-byte proof hash. The delivery reference has only the loopback correction above; its API and authoring obligations are unchanged. No sibling skill, library implementation, API, credential, installed cache or default branch was changed.

Ownership and complexity: one workflow skill, one mandatory delivery/reference module and ordinary platform UI metadata. API vocabulary remains in the version-matched library guide. Three existing plugin and marketplace version homes change together to 2.81.0; inventory/README/changelog describe the new surface. No wrapper, copied runtime or compatibility path is introduced. No source deletion occurs. Unrelated copied WIP directories are excluded from delivery.

Evidence fit: two positive reference-application cases establish successful HTML construction and observable, cheap error repair; they do not establish first-pass validity or reliable obedience to every instruction. The checker caught real API/Markdown errors. Read evidence, source measurement and browser output are separate. Revision and near-miss cases characterize the boundaries above without hiding misses.

Merge risk: the skill can still be misapplied or skip a guide/check step; the static checker is currently source-only, and the experimental asset URL has no promised retention/alias service. Worst case is an unreadable or invalid generated explainer rather than a production application change. The skill requires reporting those gaps and forbids deployment/credential discovery as presentation work. Narrow layout, automatic installed routing, performance and full explorer parity remain explicitly unverified; no broader completion claim is made. Submit this source and fitting proof for independent implementation review before pushing it.


## Independent acceptance and delivery boundary

The independent review lead read all 15 owned paths and reduced teaching, structure, and proof/safety checks from separate reviewers without authoring history. All nine selected checks are complete. Verdict: great. The sole accepted issue, loopback binding, is closed against the corrected command, exact HTTP body/listener receipt and refreshed source assessment. No semantic source edits are required. Mechanical shipping-status and evidence-link updates preserve that result.

Final source validation: Claude plugin validate passes; all six plugin/marketplace version homes parse and agree on 2.81.0; frontmatter/local-reference/UI/inventory checks pass; git diff --check passes. Quick validator remains not-run because existing PyYAML is absent. No cache installation or marketplace propagation is inferred. The requested delivery is commit/push of feat/presentation-html-cloudflare; main merge, installed availability and hosted CI remain outside this claim.
