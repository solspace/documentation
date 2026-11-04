const assert = require('node:assert/strict');
const { mkdtemp, mkdir, writeFile, rm } = require('node:fs/promises');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const vm = require('node:vm');
const { test } = require('node:test');

async function listen(t, handler) {
  const server = http.createServer(handler);
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
    server.closeAllConnections();
  }));
  return `http://127.0.0.1:${server.address().port}`;
}

function get(client, url, options = {}) {
  return new Promise((resolve, reject) => {
    const request = client.get(url, options, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => { body += chunk; });
      response.on('end', () => resolve({ status: response.statusCode, headers: response.headers, body }));
      response.on('error', reject);
    });
    request.on('error', reject);
    request.setTimeout(5000, () => request.destroy(new Error('request timed out')));
  });
}

test('redirects strip cross-realm custom credentials only when crossing origins', async (t) => {
  const redirects = require('follow-redirects').http;
  const echo = (_request, response) => response.end(JSON.stringify(_request.headers));
  const destination = await listen(t, echo);
  const source = await listen(t, (request, response) => {
    if (request.url === '/same' || request.url === '/cross') {
      response.writeHead(302, { Location: request.url === '/same' ? '/echo' : destination });
      response.end();
    } else {
      echo(request, response);
    }
  });
  const sensitive = vm.runInNewContext("['X-API-Key', 'X-Credential+Token']");
  assert.equal(sensitive instanceof Array, false);
  for (const route of ['/same', '/cross']) {
    const result = await get(redirects, source + route, {
      sensitiveHeaders: sensitive,
      headers: { 'X-API-Key': 'secret', 'X-Credential+Token': 'second-secret', 'X-Harmless': 'keep' },
    });
    const headers = JSON.parse(result.body);
    assert.equal(headers['x-api-key'], route === '/same' ? 'secret' : undefined);
    assert.equal(headers['x-credential+token'], route === '/same' ? 'second-secret' : undefined);
    assert.equal(headers['x-harmless'], 'keep');
  }
});

test('Joi validates multiple emails and rejects whitespace payloads without blocking', () => {
  const Joi = require('joi');
  assert.equal(Joi.string().email({ multiple: true }).validate('a@example.com, b@example.org').error, undefined);
  assert.equal(Joi.string().email({ multiple: true, separator: ';' }).validate('a@example.com ; b@example.org').error, undefined);
  assert.ok(Joi.string().email({ multiple: true }).validate('invalid@example').error);
  // Isolate the synchronous validation so a regression cannot hang the test runner.
  const result = spawnSync(process.execPath, ['-e', `
    const Joi = require('joi');
    for (const separator of [undefined, ';']) {
      const schema = Joi.string().email({ multiple: true, separator });
      if (!schema.validate(' '.repeat(200000)).error) process.exit(1);
    }
  `], { cwd: process.cwd(), encoding: 'utf8', timeout: 5000 });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
});

test('minimatch handles amplification-shaped patterns within a bounded runtime', () => {
  const result = spawnSync(process.execPath, ['-e', `
    const { minimatch } = require('minimatch');
    for (const repetitions of [20, 40]) {
      const pattern = ('a/**/../').repeat(repetitions) + 'target';
      if (minimatch('unrelated-file', pattern, { optimizationLevel: 2 })) process.exit(1);
    }
  `], { cwd: process.cwd(), encoding: 'utf8', timeout: 5000 });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
});

test('preview server preserves rewrites, redirects, clean URLs and glob headers', async (t) => {
  const serve = require('serve-handler');
  const root = await mkdtemp(path.join(os.tmpdir(), 'documentation-preview-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, 'assets'));
  await Promise.all([
    writeFile(path.join(root, 'index.html'), '<h1>Documentation</h1>'),
    writeFile(path.join(root, 'guide.html'), '<h1>Guide</h1>'),
    writeFile(path.join(root, 'assets/style.css'), 'body { color: black; }'),
    writeFile(path.join(root, 'assets/script.js'), 'console.log("docs");'),
  ]);
  const origin = await listen(t, (request, response) => {
    serve(request, response, {
      public: root,
      cleanUrls: ['/**'],
      rewrites: [{ source: '/app/**', destination: '/index.html' }],
      redirects: [{ source: '/old/:page', destination: '/new/:page', type: 302 }],
      headers: [{ source: '/assets/**/*.@(css|js)', headers: [{ key: 'X-Preview', value: 'matched' }] }],
    }).catch((error) => {
      response.statusCode = 500;
      response.end(error.message);
    });
  });
  const guide = await get(http, origin + '/guide');
  assert.equal(guide.status, 200);
  assert.match(guide.body, /Guide/);
  const rewritten = await get(http, origin + '/app/nested/page');
  assert.equal(rewritten.status, 200);
  assert.match(rewritten.body, /Documentation/);
  const redirected = await get(http, origin + '/old/intro');
  assert.equal(redirected.status, 302);
  assert.equal(redirected.headers.location, '/new/intro');
  for (const asset of ['/assets/style.css', '/assets/script.js']) {
    const result = await get(http, origin + asset);
    assert.equal(result.status, 200);
    assert.equal(result.headers['x-preview'], 'matched');
  }
  const missing = await get(http, origin + '/missing');
  assert.equal(missing.status, 404);
});
