# Name the Tradeoffs: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. They run from the simplest to the hardest. Find the one closest to your case and apply its move.

## "Too handwavy"

**What happened.** An agent compared two designs as "A is cleaner, B is simpler". The owner asked what each one costs in complexity; the comparison was too vague to decide on.

**The move.** Concrete gains and costs, and who pays.

**Better.** For each option: files and modules touched, new states and failure modes, operational work, migration, and who maintains it. Then say which assumption would flip the choice.

## Try A and B

**What happened.** For an interaction where feel mattered, the owner wanted to try both options and see how each felt, without writing tests until one was chosen.

**The move.** When the question is how something feels or performs, try both instead of arguing.

**Better.** Build both quickly behind a switch, try them on real content, and pick one. Then write tests for the chosen behavior, so tests don't lock in an option that was still being explored.

## The workaround that became permanent

**What happened.** A temporary path was added to unblock a release, with no note of why or until when. A year later nobody knew whether it could be removed.

**The move.** Temporary decisions say why and for how long.

**Better.** Record it as a stand-in: what it stands in for, the assumption it encodes, what it gains now, what it costs, and the event that removes it (for example, "the real provider API ships").

## The faster build that slowed startup

**What happened.** A build-time optimization moved work from build to launch. Builds got faster and the app started slower. The owner cared more about startup time than build time, so the trade went the wrong way.

**The move.** Put what you're trading away on the table, especially what the owner already cares about.

**Better.** State it as "build is 30% faster, cold startup is 200 ms slower", and let that comparison decide. Here it decides against the change.

## The new process nobody asked about

**What happened.** To speed up one step, an agent rewrote it as a separate helper process in a different language. The owner pointed out that a change that big should have been brought to them first.

**The move.** A new process boundary is a one-way door, so it's the owner's decision.

**Better.** Show the current design and the helper-process option. It gains speed; it costs a second toolchain, inter-process messaging, crash handling, packaging, and ongoing ownership. Recommend one, and let the owner choose before building.

## The search assumption, named up front

**What happened.** A design put fuzzy search on the app's existing SQLite database "because it's already there". The unstated assumption was that the database's matching could find typo-tolerant results fast enough. Review later found its trigram index couldn't return typo-only matches at all.

**The move.** Find the load-bearing assumption and its cheapest falsifier before choosing.

**Better.** Show the options: the database's full-text search, an in-memory index off the main thread, a search service. Name the assumption ("typo matches like 'agvmoa' are found, under 50 ms at 10,000 items") and run the five-minute query that would refute it before committing.
