# Separate the Concerns: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. Find the one closest to your case and apply its move.

## Startup that broke a neighbour

**What happened.** A web framework's default startup replaced the process-global `Request` and `Response` constructors. A secrets SDK loaded later failed deterministically on two Node versions.

**The move.** Watch shared state: no part changes process-wide state that another part relies on.

**Better.** Start the framework without overriding the globals, and verify it with a clean install. The framework's job is serving requests, not redefining the process's web primitives.

## Injection everywhere

**What happened.** A refactor put every class behind an interface and wired them all through a container. Each interface had one implementation, and reading any call meant chasing the container. The owner's question: "not everything should be injected, no? Or do you want DI for everything?"

**The move.** Inject at real seams only.

**Better.** Inject the two real seams, the external provider and the clock. Call everything else directly.

## Parse once at the boundary

**What happened.** A review-apply path re-parsed each update deep inside its merge loop.

**The move.** Translate at the boundary and keep the core working on typed values.

**Better.** Parse once at intake and merge typed values in batches. A 5,000-item apply went from 728 ms to 42 ms, and the core got simpler as well as faster.

## The page that fetched, reshaped, and rendered

**What happened.** A page component fetched its data, reshaped it for display, and rendered it, all in one component. Adding caching meant touching every part of it.

**The move.** Name the jobs: transport, shaping, presentation, caching.

**Better.** A pure function reshapes the data and is tested with literal inputs. Fetching and caching live in one data-loading owner (a loader or a query hook) with its own cache policy. The component only renders what it is given. A cache change no longer touches rendering.

## The CLI that became the client

**What happened.** A command-line tool grew its own copy of the client's logic: retries, auth refresh, response parsing. Behavior drifted from the library other callers used.

**The move.** Treat the CLI as an interface over the client, and extend the owning adapter instead of building a parallel one.

**Better.** The CLI parses arguments and formats output. Everything else calls the shared client, so both callers get the same semantics and fixes.
