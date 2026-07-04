#!/usr/bin/env node
// Conformance test for open.rooster.cv/0.1:
//   1. every examples/*.json validates, and
//   2. a known-bad document is rejected.
import { readdirSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { validateFile } from './validate.mjs';

const here = dirname(fileURLToPath(import.meta.url));
let failed = 0;

// 1. All examples must be valid.
const exDir = join(here, 'examples');
for (const f of readdirSync(exDir).filter((n) => n.endsWith('.json'))) {
  const { valid, issues } = validateFile(join(exDir, f));
  if (!valid) {
    failed += 1;
    console.log(`FAIL example should be valid: ${f}`);
    for (const i of issues) console.log(`   ${i.path}: ${i.message}`);
  }
}

// 2. A deliberately-broken document must be rejected (missing required
//    application/consent/metadata and an empty identity).
const badPath = join(here, '.bad.tmp.json');
writeFileSync(
  badPath,
  JSON.stringify({
    protocol: { name: 'open.rooster.cv', version: '0.1' },
    profile: { identity: {} },
  }),
);
const bad = validateFile(badPath);
rmSync(badPath, { force: true });
if (bad.valid) {
  failed += 1;
  console.log('FAIL broken document was accepted but should have been rejected.');
} else {
  console.log(`ok   broken document rejected with ${bad.issues.length} issue(s).`);
}

if (failed) {
  console.log(`\n${failed} test(s) failed.`);
  process.exit(1);
}
console.log('\nAll conformance tests passed.');
