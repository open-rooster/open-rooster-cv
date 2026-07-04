# Versioning

`open.rooster.cv` uses two related version numbers:

- **Protocol version** — the value of `protocol.version` in a document (currently
  `0.1`). This is what producers and consumers negotiate on. It changes only when
  the document contract changes.
- **Release version** — the git tag / npm `version` (e.g. `0.1.0`). This tracks
  editorial releases of a given protocol version (typo fixes, clarified prose,
  new examples) without changing the contract.

## Compatibility rules

- **Editorial releases** (`0.1.0` → `0.1.1`) MUST NOT change the document
  contract: no removed fields, no newly-required fields, no narrowed enums.
- **Protocol changes** bump `protocol.version` (`0.1` → `0.2`, eventually `1.0`).
  A new `$id` and schema file are published alongside the old one; the old schema
  remains available at its original URL so existing documents keep validating.
- Consumers MUST ignore unknown members inside `extensions` and unknown
  `extensions` identifiers.

`0.1` is a **draft**: until `1.0`, breaking changes may still occur between
protocol versions. Each is recorded in [`CHANGELOG.md`](CHANGELOG.md).
