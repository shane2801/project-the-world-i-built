import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import { getStaticPages, render } from '../.prerender/entry-server.js';
import { createPortfolioFixture } from '../src/domain/career/__fixtures__/portfolio.ts';
import { validatePortfolio } from '../src/domain/career/validate.ts';

const output = new URL('../dist/', import.meta.url);

test('draft routes are readable static HTML with owner content and no synthetic facts', async () => {
  for (const path of ['index.html', 'resume/index.html', 'projects/index.html', 'explore/index.html', '404.html']) {
    const html = await readFile(new URL(path, output), 'utf8');
    assert.match(html, /Draft portfolio/);
    assert.match(html, /name="robots" content="noindex,nofollow"/);
    assert.match(html, /href="\/resume\/#contact"/);
    assert.equal((html.match(/<main\b/g) ?? []).length, 1);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.equal((html.match(/<title>/g) ?? []).length, 1);
    assert.ok(!html.includes('<!--app-html-->') && !html.includes('<!--page-head-->'));
    assert.ok(!html.includes('Synthetic test owner') && !html.includes('example.invalid'));
  }
  const resume = await readFile(new URL('resume/index.html', output), 'utf8');
  assert.match(resume, /id="contact"/);
  assert.match(resume, /Kavish Muthoora/);
  assert.match(resume, /Accenture/);
  assert.match(resume, /href="tel:\+23058189945"/);
  assert.match(render('/resume/', null, true), /Career details are being prepared/);
  assert.match(resume, /aria-current="page">Résumé/);
  assert.equal((await readdir(new URL('projects/', output))).length, 5);
});

test('all generated internal links and script/style assets resolve within dist', async () => {
  for (const page of getStaticPages()) {
    const relative = page.path === '/' ? 'index.html' :
      page.path === '/404.html' ? '404.html' : page.path.slice(1) + 'index.html';
    const html = await readFile(new URL(relative, output), 'utf8');
    for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (href.startsWith('#') || !href.startsWith('/')) continue;
      const [path, anchor] = href.split('#');
      const target = path.endsWith('/') ? path.slice(1) + 'index.html' : path.slice(1);
      const content = await readFile(new URL(target, output), 'utf8');
      if (anchor) assert.ok(content.includes(`id="${anchor}"`), href);
    }
  }
});

test('approved structured content renders ordered résumé sections and project details', () => {
  // Explicit injection exercises components without putting fictional data in production.
  const fixture = createPortfolioFixture({ reviewStatus: 'approved' });
  const checked = validatePortfolio(fixture, { forPublication: true });
  assert.ok(checked.ok);
  const content = checked.value;
  const resume = render('/resume/', content, false);
  assert.ok(!resume.includes('Draft portfolio'));
  assert.match(resume, /Synthetic test owner/);
  const sorted = [...content.phases].sort((a, b) => a.order - b.order);
  assert.ok(resume.indexOf(`id="phase-${sorted[0].id}"`) < resume.indexOf(`id="phase-${sorted[1].id}"`));
  const project = content.projects[0];
  const path = `/projects/${project.id}/`;
  assert.ok(getStaticPages(content, false).some((page) => page.path === path && !page.draft));
  const html = render(path, content, false);
  for (const heading of ['Problem', 'Solution', 'Architecture', 'My contribution', 'Impact', 'Technologies']) {
    assert.ok(html.includes(`<h2>${heading}</h2>`));
  }
  assert.match(html, /View this career chapter/);
  assert.match(render('/projects/unknown/', content), /Page not found/);
});

test('authored text is escaped and content associations survive reordering', () => {
  const fixture = createPortfolioFixture({ reviewStatus: 'approved', name: '<script>fake</script>' });
  const content = { ...fixture, phases: [...fixture.phases].reverse() };
  const html = render('/resume/', content, false);
  assert.ok(html.includes('&lt;script&gt;fake&lt;/script&gt;'));
  assert.ok(!html.includes('<script>fake</script>'));
  const project = content.projects[0];
  assert.ok(render(`/projects/${project.id}/`, content).includes(project.title));
});
