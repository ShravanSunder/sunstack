## Types

- Domain states are enums with payload variants, Serde-tagged with tag and field names that match the wire contract. `Result` for expected failures, `Option` for absence; no string states or boolean bags.
- No production `.unwrap()`, `.expect()`, `panic!`, `todo!` or `unimplemented!`, and no re-allowing those clippy lints outside tests. Tests may unwrap where the repo relaxes the lints for test code.
- `serde_json::Value` only at an unknown or partial envelope, and classify it into an enum straight away. Substring search on model text is not a protocol. A pass-through protocol checks size, auth and malformed JSON only, and reads `"type"` out of a `Value` only when this crate owns that schema.
- Wire codes and human copy are separate channels, so a CLI phrase never ships as JSON:

```rust
impl RoutingReason {
    pub const fn as_str(self) -> &'static str { /* snake_case wire code */ }
    pub const fn human_phrase(self) -> &'static str { /* CLI copy */ }
}
```

When a new kind of identity or validated string appears, give it its own newtype whose constructor returns `Result` and rejects the empty string, and keep kinds apart (`AccountId`, `ReservationId`) even when both serialize as UUID strings ([build valid shapes instead of checking loose ones](../principle-types-are-communication/SKILL.md)).

```rust
impl AccountId {
    pub fn new(value: impl Into<String>) -> Result<Self, IdError> {
        let value = value.into();
        if value.is_empty() {
            return Err(IdError::Empty);
        }
        Ok(Self(value))
    }
}
```

Where bytes arrive from the wire, a file or a row, deserialize into the wire shape with Serde, build the domain value through its constructor, and fail closed with a field-tagged error such as `CorruptAccount { field }` ([deserializing proves the shape, not the meaning](../principle-types-are-communication/SKILL.md)). An unknown stored `status` never defaults to enabled, and a sentinel `Unknown` or `Default` never persists as a terminal state.
