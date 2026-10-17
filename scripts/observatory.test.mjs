import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { getStaticPages, render } from '../.prerender/entry-server.js';
import { createPortfolioFixture } from '../src/domain/career/__fixtures__/portfolio.ts';

test('Observatory is a static route with all four rooms and complete shared content', async () => {
  const html = await readFile(new URL('../dist/observatory/index.html', import.meta.url), 'utf8');
  assert.match(html, /<h1>The Observatory<\/h1>/);
  for (const id of ['timeline', 'projects', 'skills', 'future']) assert.ok(html.includes('id="observatory-' + id + '"'));
  for (const chapter of ['mauritius', 'birmingham', 'freelance', 'abu-dhabi', 'france']) assert.ok(html.includes('id="phase-' + chapter + '"'));
  for (const project of ['ev-charger-management', 'accommodation-management', 'ai-healthcare-analytics', 'java-multiplayer-game']) {
    assert.ok(html.includes('/projects/' + project + '/'));
  }
  assert.ok(html.includes('no future employer or role is claimed'));
  assert.ok(!html.includes('<canvas'));
  assert.ok(getStaticPages().some((page) => page.path === '/observatory/'));
});

test('hub handles absent content and empty project/skill data without inventing entries', () => {
  assert.match(render('/observatory/', null, true), /Career content has not been supplied/);
  const content = createPortfolioFixture({ projects: [], skills: [] });
  const html = render('/observatory/', content, true);
  assert.match(html, /No approved projects have been supplied/);
  assert.match(html, /No approved skills have been supplied/);
});

test('skill map uses authored relationships and leaves unmatched skills unassociated', () => {
  const input = createPortfolioFixture();
  const content = { ...input, skills: [...input.skills, { id: 'unmapped', name: 'Unmapped skill' }] };
  const html = render('/observatory/', content, true);
  assert.match(html, /Skill Constellation/);
  assert.match(html, /Unmapped skill/);
  assert.match(html, /chapter association not supplied/);
  assert.ok(html.includes('/resume/#phase-france'));
});

test('all five exploration chapter choices are statically present without loading graphics', async () => {
  const html = await readFile(new URL('../dist/explore/index.html', import.meta.url), 'utf8');
  for (const id of ['mauritius', 'birmingham', 'freelance', 'abu-dhabi', 'france']) assert.ok(html.includes('data-phase-id="' + id + '"'));
  assert.match(html, /Open Observatory/);
  assert.ok(!html.includes('<canvas'));
});
