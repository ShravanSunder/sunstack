---
name: domain-python
description: "Use when writing, changing or reviewing Python code, especially choosing a Pydantic model or a dataclass, typing collections and generics, imports, tagged unions, pytest layout and mocking, and which uv commands to run."
disable-model-invocation: true
---

# Python

Read this skill in full before the Python work it governs; your own full read earlier this session counts.

MUST load `../domain-code-standards/SKILL.md` and return the set this repository's Standards line names, with the shared standards that apply, before the sections below. This skill's choices are the owner's and apply under the owner's set.

Python's annotations promise nothing until something enforces them, so each value gets the cheapest enforcer that fits. basedpyright checks every annotation. A Pydantic `BaseModel` validates data where validation or consistency matters: at boundaries, on the wire, and in anything persisted. A plain `dataclass` holds an internal container that needs neither.

## Typing

- A collection always says what it holds. `list[Row]` and `t.List[Row]` are both fine; a bare `list`, `dict` or `t.Dict` is not. `t.Any` belongs only on a raw value before it is parsed.
- Reach typing names through `import typing as t`: `t.Literal`, `t.Annotated`, `t.ClassVar`.
- Use the 3.12 generic syntax with descriptive names, `def find_record_by_key[TRecord](records: list[TRecord], *, key: str) -> TRecord | None`, and `X | None` rather than `t.Optional[X]`. No `from __future__ import annotations`.
- Imports live at the top of the module. A function-level import appears only when the owner asked for one or the file already works that way. "A local import breaks the cycle" is not a reason: fix the dependency between the two modules.

When basedpyright flags a value from an untyped library, parse it into a model if it carries domain data; otherwise annotate the variable with the type you expect and silence only that rule, `# pyright: ignore[reportUnknownVariableType]`, never a bare `# type: ignore` ([prove it to the checker, or mark the escape as a known hazard](../principle-types-are-communication/SKILL.md)).

## Model or dataclass

The mistake runs both ways: a `BaseModel` wrapped around values it can't validate, or a `dataclass` receiving JSON nobody checked.

When a value is parsed from outside the process, sent, pickled or persisted, or must keep an invariant across its fields, make it a `BaseModel` configured through `model_config = ConfigDict(...)` and build it once where it enters ([parse untrusted data once, where it enters](../principle-types-are-communication/SKILL.md)). Everything else, including a props class for a function with more than three parameters, is a `dataclass`. `TypedDict` and `NamedTuple` appear only when a library demands them.

```python
# before
@dataclass
class ImportRequest:  # webhook JSON lands here unchecked
    account_id: str
    statement_uri: str
    requested_at: datetime


class ReconcileBatchProps(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)  # validates nothing it holds
    batch: pa.Table
    ledger: LedgerRepository
    as_of: datetime
    dry_run: bool
```

```python
# after
class ImportRequest(BaseModel):
    model_config = ConfigDict(frozen=True, extra="forbid")

    account_id: str
    statement_uri: str
    requested_at: AwareDatetime


@dataclass(frozen=True, kw_only=True)
class ReconcileBatchProps:
    batch: pa.Table
    ledger: LedgerRepository
    as_of: datetime
    dry_run: bool


def reconcile_batch(props: ReconcileBatchProps) -> ReconcileResult: ...
```

`arbitrary_types_allowed=True` is the tell for the first mistake: the model has stopped validating the fields it exists for. Configure models through `model_config`; `class Config` is the deprecated Pydantic v1 form.

When a result or record has several states, give each state its own model with a `t.Literal` `kind`, join them with `Field(discriminator="kind")`, and `match` on `kind` instead of an `isinstance` ladder or `.get("error")` ([model the states as a sum and narrow by the tag](../principle-types-are-communication/SKILL.md)).

## Strings, time and data

- f-strings over `str.format` or Jinja; a multi-line f-string goes through `textwrap.dedent`.
- Datetimes are timezone-aware: `datetime.now(UTC)`, never `datetime.now()` or `datetime.utcnow()`.
- pyarrow with batch or stream processing before pandas; pandas only when a third-party API hands you a DataFrame.

## Modules and tests

Modules are snake_case: `transaction_processor.py`, never `process.py` or `utils.py`.

Under the owner's set:

- Tests run on pytest. A unit test for `foo.py` is `foo_test.py` beside it. The older form is unit tests under `tests/`, such as `tests/test_<module>.py`.
- Factories and mock factories are the helpers tests share, in the package's `tests/` helpers folder. Integration tests live in `./tests/integration`.
- In a monorepo, don't create an `__init__.py` unless the user asks; these files are only for package roots.
- Mark tests that call real model APIs `integration_llm` and tests that need an external database `integration_db`; unmarked tests are unit tests.
- Mock with pytest-mock's `mocker` fixture, never `unittest.mock`.

When a test reaches for `mocker.patch`, patch only a dependency outside the behavior under test, such as a remote API or the clock, and make the stand-in return the real failure replies as well as the happy one ([a mock is an assumption about the real contract](../principle-write-tests-that-can-fail/SKILL.md)).

## Gates

When the repo defines no commands, run exactly these from the repo root against the changed path, with no `cd` first and no `| cat`:

```bash
uv run pytest <path>
uv run basedpyright <path>
uv run ruff check <path>
uv run ruff format --check <path>
```

## Signs you skipped it

- A bare `list`, `dict` or `t.Dict` annotation, or `t.Any` past the point where the value was parsed.
- An import inside a function body.
- `class Config:` in a model, or `arbitrary_types_allowed=True` to fit a `pa.Table` into a `BaseModel`.
- A `dataclass` built straight from request JSON.
- `if result.get("error")` or an `isinstance` chain to find out which variant you hold.
- A bare `# type: ignore`, a naive `datetime.now()`, or `from unittest.mock import patch`.
