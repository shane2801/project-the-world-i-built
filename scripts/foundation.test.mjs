import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { once } from 'node:events';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { createServer, preview } from 'vite';

const root = new URL('../', import.meta.url);

function originFor(server) {
  const address = server.address();
  assert.ok(address && typeof address === 'object');
  return `http://127.0.0.1:${address.port}`;
}

async function closeServer(server) {
  const closed = once(server, 'close');
  server.close();
  server.closeAllConnections?.();
  await closed;
}

test('production HTML contains readable content without running JavaScript', async () => {
  const html = await readFile(new URL('dist/index.html', root), 'utf8');
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<main[^>]+id="main"/);
  assert.match(html, /<h1>Every chapter leaves something behind\.<\/h1>/);
  assert.ok(!html.includes('<!--app-html-->'));
  assert.match(html, /href="#main"/);
  const entries = await readdir(new URL('dist/', root));
  assert.ok(!entries.includes('docs') && !entries.includes('project-context'));
  assert.ok(!entries.includes('entry-server.js'));
});

test('development starts and transforms the TypeScript React entry', async () => {
  const server = await createServer({
    root: fileURLToPath(root),
    logLevel: 'error',
    server: { host: '127.0.0.1', port: 0, strictPort: true },
  });
  try {
    await server.listen();
    const origin = originFor(server.httpServer);
    const response = await fetch(origin);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /src="\/src\/main\.tsx"/);
    const entry = await fetch(new URL('/src/main.tsx', origin));
    assert.equal(entry.status, 200);
    assert.match(await entry.text(), /hydrateRoot/);
    const sourceDocument = await fetch(new URL('/docs/theworldibuild-01.txt', origin));
    assert.equal(sourceDocument.status, 403);
  } finally {
    await server.close();
  }
});

test('production preview serves the static page and its JS/CSS assets', async () => {
  const server = await preview({
    logLevel: 'error',
    preview: { host: '127.0.0.1', port: 0, strictPort: true },
  });
  try {
    const origin = originFor(server.httpServer);
    const response = await fetch(origin);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /Every chapter leaves something behind/);
    const assetPaths = [...html.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)];
    assert.ok(assetPaths.length >= 2, 'Production page must reference JS and CSS.');
    for (const [, assetPath] of assetPaths) {
      const asset = await fetch(new URL(assetPath, origin));
      assert.equal(asset.status, 200);
      assert.ok((await asset.text()).length > 0);
    }
  } finally {
    await closeServer(server.httpServer);
  }
});
