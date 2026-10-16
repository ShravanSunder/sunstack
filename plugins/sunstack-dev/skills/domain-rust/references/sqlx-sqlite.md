# SQLx and SQLite

This reference owns the rules for SQLx queries, migrations and pools in the owner's Rust crates. Guidance marked "on SQLite" applies when SQLite is the selected backend and the repo has no convention of its own for it; the rest holds on any backend.

Expected inputs: the changed queries, migration files or pool setup, and the selected backend.

Return: the rules below that apply to the change, each one met or named as a gap, and the checked-query metadata command when the repo uses checked queries.

## Migrations

The schema lives in `migrations/*.sql` and runs through `sqlx::migrate!`. DDL never sits in Rust, and `open()` never runs `CREATE TABLE IF NOT EXISTS`. Migrations run on an owned transaction (on SQLite, `BEGIN IMMEDIATE`, then `run_direct`), and a data migration ships with the schema change that needs it.

A legacy database file is rejected or adopted with proof that its schema matches; an unknown database never gets migrated into a half-registered `_sqlx_migrations` history.

Schema and migration tests assert the data cleanup and the rejection of invalid rows, beyond checking that the tables exist.

## Queries

When a query returns rows, read them with `query!` or `query_as!` into a private row struct and build the public domain type from that row, never deriving `FromRow` on the domain type or reading columns by position ([keep the storage row private and let one owner decide what stored data means](../../principle-one-owner-per-truth/SKILL.md)).

```rust
let row = sqlx::query_as!(
    StoredMessageRow,
    "SELECT m.message_id, m.board_id, m.topic_id FROM board_messages m WHERE m.message_id=?",
    message_id.as_str(),
)
.fetch_optional(&mut **transaction)
.await?;
// then MessageId / TopicId::try_from, cross-field checks, and fail closed
```

Reading by position, `row.get::<T, _>(3)`, still compiles after a column moves in the `SELECT`, and then reads the wrong value.

Checked queries prove the SQL matches the schema; the domain constructors still validate the values. When the repo uses checked queries, keep `SQLX_OFFLINE=true` and commit the `.sqlx/` metadata, and after any SQL or migration change regenerate it and run the repo's check, for example `python3 scripts/tooling/prepare-sqlx.py --check`.

## Columns and constraints

Serialize a domain type into a JSON column (`TEXT` on SQLite) and deserialize a domain type out of it, never a `serde_json::Value` row model. Enums, lengths, ranges and cross-field rules stay in the Rust constructors; on SQLite, `CHECK` constraints cover only boolean storage (`0` or `1`) unless the repo already encodes more.

## Pools

Reuse long-lived pools, and never open a state store per request. On SQLite, when the hot path must not wait on writes, give reads and writes separate pools.

Complete when: each changed query, migration and pool setup is matched to its rules above, and the metadata check has run where the repo uses checked queries.
