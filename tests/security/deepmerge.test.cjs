const assert = require('node:assert/strict');
const { readFileSync, realpathSync } = require('node:fs');
const { createRequire } = require('node:module');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const entry = require.resolve('deepmerge');
const packageDir = path.dirname(path.dirname(entry));
const umdPath = path.join(packageDir, 'dist/umd.js');
const browser = vm.createContext({});
vm.runInContext(readFileSync(umdPath, 'utf8'), browser);

// Exercise both Node and browser distributions shipped by the patched package.
for (const [name, merge] of [
  ['CommonJS', require(entry)],
  ['UMD CommonJS', require(umdPath)],
  ['UMD browser', browser.deepmerge],
]) {
  const clean = (value) => JSON.parse(JSON.stringify(value));
  const assertSafe = (value) => {
    assert.equal(value.isAdmin, undefined);
    assert.equal(Object.hasOwn(value, '__proto__'), false);
    // The browser bundle creates objects in its own realm.
    assert.equal(Object.getPrototypeOf(Object.getPrototypeOf(value)), null);
    assert.equal({}.isAdmin, undefined);
  };

  test(`${name}: rejects source __proto__ with a null-prototype target`, () => {
    const target = Object.assign(Object.create(null), { debug: false });
    const result = merge(target, JSON.parse('{"__proto__":{"isAdmin":true},"enabled":true}'));
    assertSafe(result);
    assert.deepEqual(clean(result), { debug: false, enabled: true });
  });

  test(`${name}: rejects nested poisoning through primitive placeholders`, () => {
    for (const placeholder of [null, undefined, false, 0, 1, '', 'value']) {
      const result = merge(
        { session: placeholder },
        JSON.parse('{"session":{"__proto__":{"isAdmin":true},"enabled":true}}'),
      );
      assertSafe(result.session);
      assert.equal(result.session.enabled, true);
    }
  });

  test(`${name}: rejects an own __proto__ on either input`, () => {
    const target = JSON.parse('{"__proto__":{"isAdmin":true},"debug":false}');
    for (const source of [{ enabled: true }, JSON.parse('{"__proto__":{"isAdmin":true},"enabled":true}')]) {
      const result = merge(target, source);
      assertSafe(result);
      assert.deepEqual(clean(result), { debug: false, enabled: true });
    }
  });

  test(`${name}: filters dangerous keys before reading their values`, () => {
    const payload = Object.defineProperty({}, '__proto__', {
      enumerable: true,
      get() { throw new Error('unsafe getter must not run'); },
    });
    assertSafe(merge(payload, {}));
    assertSafe(merge(Object.create(null), payload));
  });

  test(`${name}: keeps array elements and merge.all results safe`, () => {
    const payload = JSON.parse('{"items":[{"__proto__":{"isAdmin":true},"id":1}]}');
    const result = merge({ items: [] }, payload);
    assertSafe(result.items[0]);
    assert.equal(result.items[0].id, 1);
    assertSafe(merge.all([Object.create(null), JSON.parse('{"__proto__":{"isAdmin":true}}')]));
  });

  test(`${name}: preserves config merging, symbols, custom mergers and cloning`, () => {
    const marker = Symbol('marker');
    const target = { options: { left: true }, items: [1], [marker]: 'kept' };
    const source = { options: { right: true }, items: [2] };
    const result = merge(target, source);
    assert.deepEqual(clean(result), { options: { left: true, right: true }, items: [1, 2] });
    assert.equal(result[marker], 'kept');
    assert.notEqual(result.options, target.options);
    assert.deepEqual(target.options, { left: true });
    assert.deepEqual(source.options, { right: true });
    assert.deepEqual(clean(merge(target, source, { arrayMerge: (_target, values) => values })).items, [2]);
    const custom = merge({ options: { old: 1 } }, { options: { next: 2 } }, {
      customMerge: (key) => key === 'options' ? (_left, right) => right : undefined,
    });
    assert.deepEqual(clean(custom), { options: { next: 2 } });
    const preserved = { nested: { enabled: true } };
    assert.equal(merge({}, preserved, { clone: false }).nested, preserved.nested);
    const ordinary = merge(Object.create(null), { constructor: 'data', prototype: 'data' });
    assert.equal(ordinary.constructor, 'data');
    assert.equal(ordinary.prototype, 'data');
  });
}

test('ReactPlayer uses the patched dependency and preserves video configuration', () => {
  const playerRequire = createRequire(require.resolve('react-player'));
  assert.equal(realpathSync(playerRequire.resolve('deepmerge')), realpathSync(entry));
  const { createReactPlayer } = playerRequire('./ReactPlayer');
  const Player = createReactPlayer([]);
  const player = new Player({ config: { file: { attributes: { controlsList: 'nodownload' } } } });
  const config = player.getConfig('https://example.test/video.mp4', 'file');
  assert.equal(config.attributes.controlsList, 'nodownload');
  assert.equal(typeof config.forceVideo, 'boolean');
});

test('SVGR still optimizes SVGs with the patched dependency installed', () => {
  const svgRequire = createRequire(require.resolve('@svgr/plugin-svgo'));
  assert.equal(realpathSync(svgRequire.resolve('deepmerge')), realpathSync(entry));
  const optimize = require('@svgr/plugin-svgo');
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10"/></svg>';
  const result = optimize(svg, { svgo: true, icon: true, runtimeConfig: false }, { filePath: '/tmp/security-test.svg' });
  assert.match(result, /viewBox="0 0 10 10"/);
  assert.match(result, /<svg/);
});
