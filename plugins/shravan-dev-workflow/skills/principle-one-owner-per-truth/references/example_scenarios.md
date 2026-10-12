# One Owner per Truth: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. Find the one closest to your case and apply its move.

## Two services, one status

**What happened.** The payments service set `order.status` to "paid" and the fulfillment service set it to "shipped". A late "paid" arrived after "shipped" and overwrote it, and customers saw shipped orders as merely paid.

**The move.** Pick one owner for the truth; the others ask.

**Better.** The order service owns the status. Payments and fulfillment send events ("payment captured", "parcel shipped"), and the order service applies them in its own state machine, which refuses to move backwards.

## Whose identity?

**What happened.** A gateway assigned an identity to each incoming connection. When an agent reconnected, it got a new identity and lost its history.

**The move.** An identity belongs to the thing it identifies.

**Better.** The agent owns its identity and presents it when connecting. The gateway maps connections to that identity instead of minting one, and the connection's cardinality (one active connection per agent, or several) is written into the contract.

## The menu nobody owned

**What happened.** Right-clicking tab pills in a native toolbar showed no menu, even after the menu was moved between UI components twice. The event was being dropped at the boundary between the native toolbar and the UI framework's scroll view.

**The move.** Put the behavior in the owner that can actually perform it.

**Better.** The native host takes ownership of secondary-click routing and presents the menu. Focused tests and a live check confirmed the menu appears and normal tab selection still works.

## The schema written twice

**What happened.** A request shape was defined in the API handler and again in the client, by hand. A field was renamed in one and not the other.

**The move.** One shape, one schema, and everything else derives from it.

**Better.** Move the common schema into a shared module that both sides import, deriving the request and response types from it. The rename then happens once.

## A required field with no version bump

**What happened.** A new required field was added to a stored manifest while the format kept the same version number. Older command-line tools reading newer manifests failed with "invalid data" instead of a clear version error.

**The move.** Own what stored data means, and version it when the meaning changes.

**Better.** Bump the format version when a required field is added, so older readers report a clear version mismatch. Pair the change with a migration or a defined default for existing files.

## Two contracts in conflict

**What happened.** A change made the development server work by altering how the production bridge loaded the front end. The owner set the priority: the production bridge wins, and the dev server adapts to it, not the other way round.

**The move.** When contracts conflict, decide explicitly which one wins.

**Better.** Keep the production bridge's contract as it is, and adapt the development server to it, so a developer convenience can't break the shipped path.

## The field one side didn't know

**What happened.** A Swift producer added a field to a message. The TypeScript consumer's strict schema didn't declare it, rejected the frame, and broke the recovered stream for everything behind it.

**The move.** One schema across a language boundary, tested with the real producer's output against the real consumer.

**Better.** Keep one authoritative definition and generate or validate both sides from it. A test feeds the real producer's serialized message to the real consumer's validation, so a producer change can't silently break the consumer. Because this failure also broke stream recovery, a transport test that covers recovery stays as well.

## The delete that skipped the owner

**What happened.** A plan retired pane state through one shared method. Two other code paths discarded panes directly, so those panes kept accepting late input after they were gone.

**The move.** Every path that changes the truth is a writer.

**Better.** Inventory every discard and delete route first. Retire the state at the one shared boundary every route passes through, before assigning the change.
