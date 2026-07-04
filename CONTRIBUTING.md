# Contributing to open.rooster.cv

Thanks for helping shape the standard. It is an open, vendor-neutral protocol —
proposals are welcome from résumé builders, job boards, ATS vendors, HR teams,
and job seekers.

## Ground rules

- **The schema is normative.** Any change to the contract is a change to
  [`schemas/open-rooster-cv-v0.1.schema.json`](schemas/open-rooster-cv-v0.1.schema.json),
  with matching updates to [`SPEC.md`](SPEC.md), the TypeScript types, and examples.
- **Keep it a family.** The `provenance` object and shared vocabularies are
  defined canonically in
  [open-rooster-common](https://github.com/open-rooster/open-rooster-common) and
  are byte-identical across `open.rooster.cv` and `open.rooster.jobs`. Do not
  diverge them here; propose the change in `open-rooster-common` first.
- **Every change ships with a passing conformance test.** Run `npm test` before
  opening a PR: all `examples/*.json` must validate, and the bundled bad document
  must still be rejected.
- **Respect versioning.** See [`VERSIONING.md`](VERSIONING.md). Contract changes
  bump `protocol.version`; editorial changes do not.

## How to propose a change

1. Open an issue describing the problem and the documents it affects.
2. For contract changes, include before/after example documents.
3. Submit a PR updating the schema, SPEC, types, examples, and CHANGELOG together.
