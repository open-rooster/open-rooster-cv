# Open Rooster CV Protocol

This repository contains a draft v0.1 implementation of an open JSON-based protocol for resumes and CVs. The goal is to replace brittle PDF and Word parsing with structured, portable, consent-aware career data that still supports human review.

## Artifacts
- `docs/protocol-v0.1.md`: conceptual v0.1 specification, scope, privacy boundaries, extension model, and rendering contract.
- `schema/open-rooster-cv-v0.1.schema.json`: JSON Schema skeleton for validating protocol payloads.
- `examples/professional.open-rooster-cv.json`: standard professional resume example.
- `examples/academic-cv.open-rooster-cv.json`: academic CV-style example using an extension.
- `guides/implementer-guide.md`: adoption notes for ATS vendors, HR teams, job boards, resume builders, and job seekers.

## Protocol Envelope
Every payload uses the same top-level structure:

```json
{
  "protocol": {
    "name": "open.rooster.cv",
    "version": "0.1"
  },
  "profile": {},
  "application": {},
  "consent": {},
  "metadata": {}
}
```

## Suggested Next Work
- Add conformance tests for schema validation.
- Define extension specifications for academic CVs, healthcare licenses, and creative portfolios.
- Build a small renderer that turns protocol JSON into accessible HTML.
- Create import/export adapters for existing resume-builder and ATS data models.
