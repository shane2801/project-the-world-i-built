import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveRoute, getStaticPaths } from './routes.ts';
import { projectPath } from '../features/projects/paths.ts';
import { loadPortfolio } from '../content/loadPortfolio.ts';
import { createPortfolioFixture } from '../domain/career/__fixtures__/portfolio.ts';

test('routes support direct paths, optional trailing slashes and missing content', () => {
  for (const path of ['/', '/resume', '/resume/', '/projects/', '/explore/']) {
    assert.notEqual(resolveRoute(path, null).kind, 'not-found');
  }
  for (const path of ['/unknown/', '/projects/example/', '/projects/../', '/projects/%2e%2e/', '//resume/']) {
    assert.equal(resolveRoute(path, null).kind, 'not-found');
  }
  assert.deepEqual(getStaticPaths(null), ['/', '/resume/', '/projects/', '/explore/', '/404.html']);
});

test('authored content is optional but draft and malformed facts fail publication loading', () => {
  assert.equal(loadPortfolio(null), null);
  assert.throws(() => loadPortfolio({}), /portfolio/);
  assert.throws(() => loadPortfolio(createPortfolioFixture()), /human approval/);
});

test('only known projects receive static pages and stable direct links', () => {
  const content = loadPortfolio({ ...createPortfolioFixture(), reviewStatus: 'approved' });
  assert.ok(content);
  for (const project of content.projects) {
    const path = projectPath(project.id);
    assert.deepEqual(resolveRoute(path, content), { kind: 'project', projectId: project.id });
    assert.ok(getStaticPaths(content).includes(path));
  }
  assert.equal(resolveRoute('/projects/unknown/', content).kind, 'not-found');
});

test('unsafe static directory names are rejected before writing pages', () => {
  for (const id of ['..', '../escape', 'a/b', 'a\\b', '%2f', 'a b', '']) {
    assert.throws(() => projectPath(id), /URL-safe/);
  }
  assert.equal(projectPath('project_1-a'), '/projects/project_1-a/');
});
