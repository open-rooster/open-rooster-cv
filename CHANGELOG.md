# Changelog

All notable changes to the open.rooster.cv standard are documented here. The
protocol version lives in `protocol.version` (currently `0.1`); the
repository/package version tracks editorial releases of that draft.

## [0.1.0] — 2026-07-04

- Restructured to the open.rooster family layout: `schemas/` (was `schema/`),
  top-level `SPEC.md` (was `docs/protocol-v0.1.md`), plus self-contained
  TypeScript `types/`, a reference validator (`validate.mjs`), a conformance test
  (`test.mjs`), and CI.
- Shared `provenance` object and vocabularies aligned with
  [open-rooster-common](https://github.com/open-rooster/open-rooster-common) and
  enforced by a drift check.
- Existing protocol spec, implementer guide, and examples preserved.

## [0.1] — initial draft

Initial draft of `open.rooster.cv/0.1`: the JSON Schema, protocol specification,
implementer guide, and professional + academic examples.

`0.1` is a **draft**. Breaking changes may still land before `1.0`; they will be
gated behind a new `protocol.version`.
