# open.rooster.cv

**A vendor-neutral, open JSON standard for résumés and CVs.** Companion to
[open.rooster.jobs](https://github.com/open-rooster/open-rooster-jobs).

A résumé on `open.rooster.cv` is a single, portable JSON document: structured,
consent-aware, provenance-aware career data supplied directly by the job seeker.
It replaces brittle PDF and Word parsing with data a machine can read and a human
can still review — and it is designed for the era where **AI agents**, not just
people, read and match hiring data.

- **Protocol:** `open.rooster.cv`
- **Version:** `0.1` (draft)
- **Schema:** [`schemas/open-rooster-cv-v0.1.schema.json`](schemas/open-rooster-cv-v0.1.schema.json) (JSON Schema 2020-12)
- **Canonical `$id`:** `https://open.rooster.cv/schemas/open-rooster-cv-v0.1.schema.json`

## What's here

| Path | Purpose |
|---|---|
| [`SPEC.md`](SPEC.md) | The conceptual v0.1 specification — scope, privacy boundaries, extension model, rendering contract. |
| [`schemas/`](schemas) | The normative JSON Schema. |
| [`types/`](types) | Self-contained TypeScript types for adopters. |
| [`examples/`](examples) | Complete documents (a professional résumé and an academic CV using an extension). |
| [`guides/implementer-guide.md`](guides/implementer-guide.md) | Adoption notes for ATS vendors, HR teams, job boards, résumé builders, and job seekers. |
| [`validate.mjs`](validate.mjs) | Reference validator. |

## The envelope

Every payload uses the same top-level structure:

```jsonc
{
  "protocol": { "name": "open.rooster.cv", "version": "0.1" },
  "profile":  { /* reusable career data controlled by the job seeker */ },
  "application": { /* job-specific submission info */ },
  "consent":  { /* how the recipient may use and retain the data */ },
  "metadata": { /* created time, language, source system, integrity */ }
}
```

See [`SPEC.md`](SPEC.md) for the full field reference and privacy model, and
[`examples/`](examples) for complete documents.

## Validate a résumé

```bash
npm install                    # ajv + ajv-formats
npm run validate               # validate every examples/*.json
node validate.mjs my-cv.json   # validate your own document
npm test                       # conformance test (examples pass, a bad doc is rejected)
```

You can also point any JSON Schema 2020-12 validator at the schema directly.

## TypeScript

```ts
import type { ResumeDocument } from "open-rooster-cv/types/open-rooster-cv";
```

## A family with open.rooster.jobs

`open.rooster.cv` and [open.rooster.jobs](https://github.com/open-rooster/open-rooster-jobs)
share conventions and a byte-identical `provenance` object and vocabularies,
defined canonically in
[open-rooster-common](https://github.com/open-rooster/open-rooster-common), so a
résumé and a job posting speak the same language and can be matched losslessly.

## Status & versioning

`0.1` is a **draft**; breaking changes may land before `1.0` and will be gated
behind a new `protocol.version`. See [`CHANGELOG.md`](CHANGELOG.md) and
[`VERSIONING.md`](VERSIONING.md).

## License

MIT — see [`LICENSE`](LICENSE). Adopt it freely.
