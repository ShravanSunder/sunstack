Complete Response Walkthrough: TUI Presentation Reference
══════════════════════════════════════════════════════════════════════

This reference owns: one complete hybrid response composed in one
worked example (title, framing, sections, shapes, markdown mixing,
cordoning, and closing synthesis).
Expected inputs: the response content being composed.
Return: the section rhythm and closing-synthesis placement applied to
the current response.
Complete when: the response follows the heading → block → heading
rhythm with one shape per block and a prose synthesis at the end.

See also (routing stays with the SKILL.md callers; this file opens no
other reference):

  ▸ per-shape geometry: shape-catalog.md
  ▸ indentation, overflow, alignment, verification: build-discipline.md
  ▸ markdown set, bright line, table threshold: ../../../shared-references/markdown-presentation-baseline.md


─── Golden example: a complete hybrid response ──────────────────────

Use as a template: swap the content, keep the structure.

````markdown
How we're handling the cache-invalidation race
══════════════════════════════════════════════

Short framing — 1-2 sentences on what this response is about.

─── Context ──────────────────────────────────────────────────────────

┌─ What's happening today ────────────────────────────────────────────┐
│                                                                     │
│  Writer commits.  Cache asynchronously invalidates on a separate    │
│  worker.  Reader between commit and invalidation sees stale data    │
│  — the classic TOCTOU window.                                       │
│                                                                     │
│  Rare under low load.  At scale, hits ~5% of reads.                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

─── Option comparison ────────────────────────────────────────────────

| Option | Gain | Cost, and who pays |
|---|---|---|
| keep async invalidation | no work | ~5% of reads stale at scale; users |
| A: sync invalidation | every read current | each write waits on the cache; writers |
| B: read-through TTL | writers untouched | reads up to 30s stale; users |
| C: version token | writers untouched; reads current | token in API responses; API clients |

─── Decision flow ────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────┐
│ 1. write hits primary                                               │
├─────────────────────────────────────────────────────────────────────┤
│ 2. writer bumps version token atomically                            │
├─────────────────────────────────────────────────────────────────────┤
│ 3. cache write-through fires in the background                      │
├─────────────────────────────────────────────────────────────────────┤
│ 4. reader fetches                                                   │
│      token matches?    ──► serve cached                             │
│      token mismatch?   ──► bypass cache, serve from primary         │
└─────────────────────────────────────────────────────────────────────┘

The reader-side check is two lines in `CacheClient.fetch`:

```ts
const cached = await cache.get(key);
return cached?.token === head.token ? cached : primary.fetch(key);
```

─── My read ──────────────────────────────────────────────────────────

**Option C.** Writers stay fast and every read is current.  It rests
on one assumption: all reads go through `CacheClient.fetch`, which a
search for direct `cache.get` calls can check; revisit C if a read
path outside it appears.  The token in API responses changes a
public contract that API clients carry, so this one is your call.
B leaves users reading 30s-old data, and A makes every writer pay
for a read-side problem.
````

What the example teaches:

  ▸ Title line + ═══ underline (H1-style), framing prose below
  ▸ ─── Section label ─── carries separator + heading (no stacked ---)
  ▸ Framed card (context): prose body, title-in-border, breathing
  ▸ GFM table (comparison): the default comparison medium; standalone,
    never inside a frame; narrow enough to stay readable; doing nothing
    is a row, and each cost says what it is and who pays
  ▸ Pipeline box (decision flow): numbered steps with ├──┤ separators,
    sub-items indented with ──► arrows; short plain labels only
  ▸ Fenced code with a language tag for the copyable atom, placed
    outside the frames with an inline-code pointer (`CacheClient.fetch`)
  ▸ Closing "My read" synthesis: prose with bold on the verdict only;
    it names the assumption, its check, whose decision it is and the
    signal to revisit

The title is your response's topic, not the skill's name. Never emit "Presentation: TUI" as a title.

  Wrong:  response begins with the skill name as its title.
  Right:  response begins with the actual topic, e.g. "How we're
          handling the cache-invalidation race".
