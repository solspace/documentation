const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const path = join(__dirname, '../plugins/docusaurus-github-remote-content.ts');
const source = readFileSync(path, 'utf8');
const parsed = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true);
const transformer = parsed.statements.find(
  node => ts.isFunctionDeclaration(node) && node.name?.text === 'transformer'
);
assert.ok(transformer);
const code = ts.transpileModule(`${transformer.getText(parsed)}; transformer;`, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
}).outputText;
const transform = vm.runInNewContext(code);

test('a complete changelog generates only the requested major version', () => {
  const source = `# Changelog

## Unreleased
- Pending release

## 3.3.11 - 2026-11-17
- Third major

## 2.0.2 - 2023-01-16
- Second major

## 1.8.4 - 2021-05-27
- First major
`;
  for (const version of [1, 2, 3]) {
    const result = transform({ version, meta: { title: 'Changelog' } }, source);
    assert.match(result, /^---\ntitle: Changelog\n---/);
    const headings = [...result.matchAll(/^## (\d+)\./gm)];
    assert.equal(headings.length, 1);
    assert.equal(Number(headings[0][1]), version);
    assert.doesNotMatch(result, /Unreleased|Pending release/);
    assert.match(result, /<TitleDate date="\d{4}-\d{2}-\d{2}" \/>/);
  }
});

test('prerelease dates and legacy warning labels retain their doc formatting', () => {
  const result = transform({ version: 3 }, `## 3.0.0-b.3 - 2022-10-27

> **Warning:** Upgrade carefully.
> Back up your forms first.

### Added
- Beta feature
`);
  assert.match(result, /## 3\.0\.0-b\.3<TitleDate date="2022-10-27" \/>/);
  assert.match(result, /:::warning\nUpgrade carefully\.\nBack up your forms first\.\n:::/);
  assert.match(result, /### Added\n- Beta feature/);
});
