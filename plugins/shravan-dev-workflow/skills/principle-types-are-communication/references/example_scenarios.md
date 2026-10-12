# Types Are Communication: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. They run from the simplest to the hardest. Find the one closest to your case and apply its move.

## A Python tagged union

**What happened.** A Python result was a dict with `ok`, `data`, and `error` keys, and callers branched with `if result.get("error")`.

**The move.** Narrow by the tag, never by casting or guessing.

**Better.**

```python
import typing as t
from pydantic import BaseModel, ConfigDict, Field

class QuerySucceeded(BaseModel):
    model_config = ConfigDict(frozen=True)
    kind: t.Literal["succeeded"]
    rows: list[Row]

class QueryFailed(BaseModel):
    model_config = ConfigDict(frozen=True)
    kind: t.Literal["failed"]
    error: QueryError

QueryResult = t.Annotated[QuerySucceeded | QueryFailed, Field(discriminator="kind")]
```

A `match` on `result.kind` narrows to the right model, with no `isinstance` and no missing keys.

## Config from the environment

**What happened.** A service read `PORT`, `DATABASE_URL`, `FEATURE_X`, and an admin API key straight from `process.env` wherever it needed them. A typo in `PORT` surfaced as a crash an hour after deploy.

**The move.** Parse untrusted data once, at the boundary, and fail closed.

**Better.** At startup, one parse turns the environment into a typed `Config`: a port with a range-checked constructor, a URL newtype, a real boolean for the flag. A bad value stops the service at boot with an error naming the variable. Inside, code takes `Config` values and never reads the environment again.

## Commands that should not compile

**What happened.** Command specifications were plain objects with optional flags. Combinations that the command didn't support compiled fine and failed only at runtime.

**The move.** Name the states, so invalid combinations can't be written.

**Better.** Each command is a variant with exactly the fields it accepts. An unsupported combination is a type error, and adding a command forces every dispatcher to handle it.

## Two shapes for one quota

**What happened.** A quota response carried both a legacy field and a newer limits field for the same thing. The refresh parser accepted both, they disagreed, and every account showed as exhausted.

**The move.** Derive from one authority, and keep one representation per fact.

**Better.** One schema owns the quota shape. The legacy field is translated once at the boundary into the same domain type, so there is never a second representation for the code to disagree with.

## The id that meant two things

**What happened.** Heartbeat messages addressed people by bare numeric ids. The parser read every bare number as a channel id, so each heartbeat failed with "Unknown Channel" while ordinary direct messages worked.

**The move.** Give semantic ids their own types, and parse them at the boundary.

**Better.** Targets are typed and parsed where they enter: `user:<id>` and `channel:<id>` become two variants of a `Target` type. The destination is explicit, and sending a channel message to a user id no longer compiles.
