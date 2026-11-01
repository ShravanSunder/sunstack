---
name: domain-swift
description: "Use when writing, changing or reviewing Swift or SwiftUI code, especially types and optionals, view state and view models, Swift Testing, formatting, or which commands to run."
disable-model-invocation: true
---

# Swift

Read this skill in full before the Swift work it governs; your own full read earlier this session counts.

MUST load `../domain-code-standards/SKILL.md` and return the set this repository's Standards line names, with the shared standards that apply, before the sections below. This skill's choices are the owner's and apply under the owner's set.

Let the compiler hold what the code promises: explicit, narrow types, optionals unwrapped where they're read, value types unless reference semantics are needed, and view state that SwiftUI observes through the Observation framework.

## Types

- No `Any`: use an explicit, narrow type or a generic (`<T>`, `<T: SomeProtocol>`).
- No force unwraps (`!`): use `guard let`, `if let` or nil coalescing (`??`).
- No force casts (`as!`): use a conditional cast (`as?`) and handle its failure.
- Prefer the Observation framework: `@Observable` over `ObservableObject` (iOS 17+, macOS 14+).
- Enable strict concurrency checking, and mark types `Sendable` where it requires.
- A function with more than three parameters takes a dedicated configuration struct.

## Data models

- Data transfer types implement `Codable`.
- Persistent models use SwiftData's `@Model` macro.
- Prefer `struct` over `class` unless the type needs reference semantics.
- A model unwraps every optional property safely.
- Dates are timezone-aware `Date` values.

## Formatting

SwiftFormat formats the code, configured in `.swiftformat`. The scaffold's defaults indent with 4 spaces and cap lines at 160 characters; the repository's own config overrides them. Use a trailing closure for a single closure parameter.

## SwiftUI patterns

- MVVM: business logic goes in view models marked `@Observable`.
- Break a complex view into smaller, focused subviews.
- Mark every `@State` and `@StateObject` property `private`.
- Inject shared state through `@Environment` rather than passing it by hand.
- Give images accessibility labels and buttons their traits.
- Give every view a `#Preview`.

## Architecture

- Define contracts with protocols, and implement them with concrete types.
- Inject dependencies through initializers or `@Environment`.
- Throw typed errors (`enum AppError: Error`), not a bare `Error`.

## Tests

Under the owner's set, Swift's unit tests live in the package's SPM `Tests/<Target>Tests/` targets, not beside the module. The base's beside-the-module standard, and its `tests/`, move-on-touch and old-form standards, don't apply to Swift's tests; its Arrange / Act / Assert and test-mix standards do.

- Use Swift Testing: `import Testing`, `@Test` for test functions and `@Suite` to group them.
- Use XCTest only for UI tests (`XCUITest`) and performance tests.
- Unit tests cover view models and business logic; integration tests cover the data layer; UI tests cover only critical user flows.

## Commands

When the repository defines no commands of its own, run these:

```bash
swift build          # build
swift test           # test
swiftlint --strict   # lint
swiftformat .        # format
```

## Signs you skipped it

- `Any`, a force unwrap or a force cast where a narrow type, `guard let` or `as?` fits.
- `ObservableObject` in new code, or a `@State` property that isn't `private`.
- A Swift unit test put beside its module instead of in its `Tests/` target.
