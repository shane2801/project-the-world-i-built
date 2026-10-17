import assert from 'node:assert/strict';
import test from 'node:test';
import { createPortfolioFixture } from './__fixtures__/portfolio.ts';
import { getAdjacentPhases, getCurrentPhase, getOrderedPhases, getPhaseContent, getProjectById, getProjectsByTag, getProjectsForPhase } from './queries.ts';
import { validatePortfolio } from './validate.ts';

function deepFreeze(value: unknown): void {
  if (typeof value !== 'object' || value === null) return;
  Object.values(value).forEach(deepFreeze);
  Object.freeze(value);
}

test('explicit order overrides array order and period labels without mutation', () => {
  const fixture = createPortfolioFixture();
  const portfolio = {
    ...fixture,
    phases: fixture.phases.map((phase, index) => ({ ...phase, order: 20 - index })).reverse(),
  };
  const before = JSON.stringify(portfolio);
  deepFreeze(portfolio);
  const phases = getOrderedPhases(portfolio);
  assert.deepEqual(phases.map((phase) => phase.id), ['france', 'abu-dhabi', 'freelance', 'birmingham', 'mauritius']);
  assert.equal(JSON.stringify(portfolio), before);
  assert.notEqual(phases, portfolio.phases);
});

test('current phase is independent of sorting and position', () => {
  const portfolio = createPortfolioFixture({ currentPhaseId: 'birmingham' });
  assert.equal(getCurrentPhase(portfolio)?.id, 'birmingham');
});

test('phase content joins experiences, projects, achievements and deduplicated skills', () => {
  const portfolio = createPortfolioFixture();
  deepFreeze(portfolio);
  const content = getPhaseContent(portfolio, 'france');
  assert.ok(content);
  assert.deepEqual(content.experiences.map((item) => item.id), ['example-role']);
  assert.deepEqual(content.projects.map((item) => item.id), ['example-project']);
  assert.deepEqual(content.achievements.map((item) => item.id), ['example-achievement']);
  assert.deepEqual(content.skills.map((item) => item.id), ['systems', 'software']);
  assert.equal(getPhaseContent(portfolio, 'birmingham')?.projects.length, 0);
  assert.equal(getPhaseContent(portfolio, 'unknown'), undefined);
});

test('queries use IDs and authored tags rather than presentation categories', () => {
  const portfolio = createPortfolioFixture();
  assert.equal(getProjectById(portfolio, 'example-project')?.id, 'example-project');
  assert.equal(getProjectById(portfolio, 'missing'), undefined);
  assert.equal(getProjectsForPhase(portfolio, 'france').length, 1);
  assert.equal(getProjectsForPhase(portfolio, 'missing').length, 0);
  assert.equal(getProjectsByTag(portfolio, 'AI').length, 1);
  assert.equal(getProjectsByTag(portfolio, 'client work').length, 1);
  assert.equal(getProjectsByTag(portfolio, 'software').length, 0);
  assert.equal(getProjectsByTag(portfolio, 'ai').length, 0);
});

test('adjacent phases follow explicit order and handle timeline boundaries', () => {
  const portfolio = createPortfolioFixture();
  assert.equal(getAdjacentPhases(portfolio, 'mauritius')?.previous, undefined);
  assert.equal(getAdjacentPhases(portfolio, 'mauritius')?.next?.id, 'birmingham');
  assert.equal(getAdjacentPhases(portfolio, 'freelance')?.previous?.id, 'birmingham');
  assert.equal(getAdjacentPhases(portfolio, 'france')?.next, undefined);
  assert.equal(getAdjacentPhases(portfolio, 'unknown'), undefined);
});

test('reordering keeps project associations and current phase stable', () => {
  const fixture = createPortfolioFixture();
  const result = validatePortfolio({
    ...fixture, phases: fixture.phases.map((phase, index) => ({ ...phase, order: fixture.phases.length - index })),
  });
  assert.ok(result.ok);
  assert.equal(getCurrentPhase(result.value)?.id, 'france');
  assert.equal(getAdjacentPhases(result.value, 'france')?.next?.id, 'abu-dhabi');
  assert.equal(getPhaseContent(result.value, 'france')?.projects[0].id, 'example-project');
});

test('queries do not mutate parsed content or create unknown phases', () => {
  const parsed = validatePortfolio(createPortfolioFixture());
  assert.ok(parsed.ok);
  const before = JSON.stringify(parsed.value);
  deepFreeze(parsed.value);
  getOrderedPhases(parsed.value);
  getPhaseContent(parsed.value, 'france');
  getProjectsByTag(parsed.value, 'AI');
  getAdjacentPhases(parsed.value, 'france');
  assert.equal(JSON.stringify(parsed.value), before);
  assert.equal(getPhaseContent(parsed.value, 'future-not-authored'), undefined);
});
