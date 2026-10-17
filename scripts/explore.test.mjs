import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import test from 'node:test';
import { render } from '../.prerender/entry-server.js';

test('explorer static HTML contains chapter and project access without WebGL', async () => {
  const html = await readFile(new URL('../dist/explore/index.html', import.meta.url), 'utf8');
  assert.match(html, /<h1>Explore the world<\/h1>/);
  assert.match(html, /Enable 3D prototype/);
  assert.match(html, /Abu Dhabi/);
  assert.match(html, /France/);
  assert.match(html, /ev-charger-management/);
  assert.match(html, /href="\/resume\/#phase-abu-dhabi"/);
  assert.ok(!html.includes('<canvas'));
  assert.match(render('/explore/', null, true), /Career content is needed/);
});

test('renderer is a separate on-demand chunk within the provisional compressed budget', async () => {
  const assets = new URL('../dist/assets/', import.meta.url);
  const names = await readdir(assets);
  const scene = names.filter((name) => /^PrototypeScene-.*\.js$/.test(name));
  assert.equal(scene.length, 1);
  const bytes = await readFile(new URL(scene[0], assets));
  assert.ok(gzipSync(bytes).length <= 350 * 1024, 'Renderer must stay within its provisional 350 KiB gzip budget.');
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.ok(!html.includes(scene[0]), 'Home HTML must not preload the renderer.');
});
