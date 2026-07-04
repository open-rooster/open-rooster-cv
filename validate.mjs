#!/usr/bin/env node
// Reference validator for open.rooster.cv/0.1.
//
// Usage:
//   node validate.mjs                     # validate every examples/*.json
//   node validate.mjs path/to/cv.json [more.json ...]
//
// Exits non-zero if any document fails validation.
//
// Depends on: ajv (2020) + ajv-formats.  Run `npm install` first.

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const here = dirname(fileURLToPath(import.meta.url));
const schema = JSON.parse(
  readFileSync(join(here, 'schemas', 'open-rooster-cv-v0.1.schema.json'), 'utf8'),
);

const ajv = new Ajv2020({ allErrors: true, strict: false, allowUnionTypes: true });
addFormats(ajv);
const validateFn = ajv.compile(schema);

/** Map an AJV error to a dotted path + friendly message. */
function issueFromError(error) {
  const segments = error.instancePath.split('/').filter(Boolean);
  let path = segments.join('.');
  if (error.keyword === 'required' && error.params?.missingProperty) {
    path = path ? `${path}.${error.params.missingProperty}` : error.params.missingProperty;
  }
  path = path || '(root)';
  let message;
  switch (error.keyword) {
    case 'required': message = 'This field is required.'; break;
    case 'enum': message = `Must be one of: ${(error.params?.allowedValues ?? []).join(', ')}.`; break;
    case 'const': message = `Must equal ${JSON.stringify(error.params?.allowedValue)}.`; break;
    case 'additionalProperties': message = `Unexpected field "${error.params?.additionalProperty}" is not allowed by the protocol.`; break;
    case 'pattern': message = `Has an invalid format (${error.message ?? 'pattern mismatch'}).`; break;
    case 'format': message = `Must be a valid ${error.params?.format ?? 'value'}.`; break;
    case 'minLength': message = 'Must not be empty.'; break;
    case 'minItems': message = 'Add at least one item.'; break;
    default: message = error.message ?? 'Invalid value.';
  }
  return { path, message };
}

/** Validate one file. Returns { file, valid, issues }. */
export function validateFile(file) {
  let data;
  try {
    data = JSON.parse(readFileSync(file, 'utf8'));
  } catch (err) {
    return { file, valid: false, issues: [{ path: '(root)', message: `Invalid JSON: ${err.message}` }] };
  }
  const valid = validateFn(data);
  const issues = valid ? [] : (validateFn.errors ?? []).map(issueFromError);
  return { file, valid, issues };
}

function resolveTargets(argv) {
  if (argv.length) return argv.map((a) => resolve(a));
  const dir = join(here, 'examples');
  return readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => join(dir, f));
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('validate.mjs')) {
  const targets = resolveTargets(process.argv.slice(2));
  let failures = 0;
  for (const file of targets) {
    const { valid, issues } = validateFile(file);
    const name = file.replace(`${here}/`, '').replace(`${here}\\`, '');
    if (valid) {
      console.log(`  ok   ${name}`);
    } else {
      failures += 1;
      console.log(`  FAIL ${name}`);
      for (const i of issues) console.log(`         ${i.path}: ${i.message}`);
    }
  }
  console.log(`\n${targets.length - failures}/${targets.length} valid.`);
  process.exit(failures ? 1 : 0);
}
