const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { dirname, join } = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Exercise the installed provider rather than reimplementing its storage
// behavior: a dependency upgrade must retain this transient API contract.
const provider = join(dirname(require.resolve('@docusaurus/theme-common')), '../src/contexts/ColorMode.tsx');
const source = readFileSync(provider, 'utf8');
const parsed = ts.createSourceFile(provider, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let callback;
function findSetter(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText(parsed) === 'setColorMode' && ts.isCallExpression(node.initializer)) {
    callback = node.initializer.arguments[0];
  }
  ts.forEachChild(node, findSetter);
}
findSetter(parsed);
assert.ok(callback, 'Docusaurus exposes the expected theme setter');
const setterCode = ts.transpileModule(`const setter = ${callback.getText(parsed)}; setter;`, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
}).outputText;

for (const preference of ['light', 'dark', null]) {
  test(`intro transient Dark preserves ${preference ?? 'system'} preference`, () => {
    let saved = preference;
    let writes = 0;
    const state = {};
    const setter = vm.runInNewContext(setterCode, {
      respectPrefersColorScheme: true,
      defaultMode: 'light',
      getSystemColorMode: () => 'light',
      ColorModeAttribute: { set: mode => { state.mode = mode; } },
      ColorModeChoiceAttribute: { set: choice => { state.choice = choice; } },
      setColorModeState: mode => { state.mode = mode; },
      setColorModeChoiceState: choice => { state.choice = choice; },
      persistColorModeChoice: choice => { saved = choice; writes++; },
    });
    setter('dark', { persist: false });
    assert.equal(state.mode, 'dark');
    assert.equal(saved, preference);
    assert.equal(writes, 0);
    setter(preference, { persist: false });
    assert.equal(state.mode, preference ?? 'light');
    assert.equal(state.choice, preference);
    assert.equal(saved, preference);
    assert.equal(writes, 0);
  });
}
