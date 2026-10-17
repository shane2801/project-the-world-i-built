import assert from 'node:assert/strict';
import test from 'node:test';
import { createPortfolioFixture } from './__fixtures__/portfolio.ts';
import type { ValidationCode } from './types.ts';
import { validatePortfolio } from './validate.ts';

function rejects(input: unknown, path: string, code: ValidationCode) {
  const result = validatePortfolio(input);
  assert.ok(!result.ok, 'Expected invalid input to be rejected.');
  assert.ok(result.issues.some((issue) => issue.path === path && issue.code === code),
    JSON.stringify(result.issues, null, 2));
}

test('accepts a five-phase draft with overlapping labels and multiple project tags', () => {
  const fixture = createPortfolioFixture();
  const result = validatePortfolio(fixture);
  assert.ok(result.ok);
  assert.equal(result.value.phases.length, 5);
  assert.deepEqual(result.value.projects[0].tags, ['AI', 'client work', 'open source']);
  assert.equal(result.value.projects[0].presentationKind, 'software');
  assert.equal(result.value.phases[0].period, result.value.phases[4].period);
  assert.notEqual(result.value, fixture);
  assert.notEqual(result.value.projects, fixture.projects);
});

test('publication requires explicit human content approval', () => {
  const draft = validatePortfolio(createPortfolioFixture(), { forPublication: true });
  assert.ok(!draft.ok);
  assert.ok(draft.issues.some((issue) => issue.code === 'unapproved-content'));
  const approved = validatePortfolio(createPortfolioFixture({ reviewStatus: 'approved' }), { forPublication: true });
  assert.ok(approved.ok);
});

for (const input of [null, undefined, true, 42, 'portfolio', []]) {
  test(`rejects a malformed root: ${String(input)}`, () => {
    rejects(input, 'portfolio', 'invalid-type');
  });
}

test('reports field paths for missing, blank and misspelled data', () => {
  const fixture = createPortfolioFixture();
  rejects({ ...fixture, name: undefined }, 'portfolio.name', 'invalid-type');
  rejects({ ...fixture, headline: '  ' }, 'portfolio.headline', 'invalid-type');
  rejects({ ...fixture, currentPhase: 'france' }, 'portfolio.currentPhase', 'unknown-field');
});

test('rejects malformed collections, records, sparse slots and primitive list entries', () => {
  const fixture = createPortfolioFixture();
  rejects({ ...fixture, projects: {} }, 'portfolio.projects', 'invalid-type');
  rejects({ ...fixture, projects: [null] }, 'portfolio.projects[0]', 'invalid-type');
  rejects({ ...fixture, skills: new Array(1) }, 'portfolio.skills[0]', 'invalid-type');
  rejects({
    ...fixture, experiences: [{ ...fixture.experiences[0], responsibilities: [42] }],
  }, 'portfolio.experiences[0].responsibilities[0]', 'invalid-type');
});

for (const collection of ['phases', 'experiences', 'projects', 'skills', 'achievements'] as const) {
  test(`rejects duplicate IDs in ${collection}`, () => {
    const fixture = createPortfolioFixture();
    rejects({
      ...fixture, [collection]: [...fixture[collection], fixture[collection][0]],
    }, `portfolio.${collection}[${fixture[collection].length}].id`, 'duplicate-id');
  });
}

test('rejects identifier whitespace and duplicate skill references', () => {
  const fixture = createPortfolioFixture();
  rejects({
    ...fixture, skills: [{ ...fixture.skills[0], id: ' systems ' }],
  }, 'portfolio.skills[0].id', 'invalid-value');
  rejects({
    ...fixture, projects: [{ ...fixture.projects[0], skillIds: ['software', 'software'] }],
  }, 'portfolio.projects[0].skillIds[1]', 'duplicate-reference');
});

test('phase order must be unique and finite; gaps and explicit reordering are valid', () => {
  const fixture = createPortfolioFixture();
  rejects({
    ...fixture, phases: fixture.phases.map((phase) => ({ ...phase, order: 0 })),
  }, 'portfolio.phases[1].order', 'duplicate-order');
  for (const order of [-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    rejects({
      ...fixture, phases: [{ ...fixture.phases[0], order }, ...fixture.phases.slice(1)],
    }, 'portfolio.phases[0].order', 'invalid-value');
  }
  const reordered = fixture.phases.map((phase, index) => ({ ...phase, order: (10 - index) * 10 }));
  assert.ok(validatePortfolio({ ...fixture, phases: reordered }).ok);
});

test('current phase is an explicit valid reference, not the last array element', () => {
  const fixture = createPortfolioFixture();
  assert.ok(validatePortfolio({ ...fixture, currentPhaseId: fixture.phases[0].id }).ok);
  rejects({ ...fixture, currentPhaseId: 'missing' }, 'portfolio.currentPhaseId', 'unknown-reference');
  rejects({ ...fixture, phases: [] }, 'portfolio.currentPhaseId', 'unknown-reference');
});

test('rejects dangling phase and skill references', () => {
  const fixture = createPortfolioFixture();
  for (const collection of ['experiences', 'projects', 'achievements'] as const) {
    rejects({
      ...fixture, [collection]: [{ ...fixture[collection][0], phaseId: 'missing' }],
    }, `portfolio.${collection}[0].phaseId`, 'unknown-reference');
  }
  for (const collection of ['phases', 'experiences', 'projects'] as const) {
    rejects({
      ...fixture, [collection]: [{ ...fixture[collection][0], skillIds: ['missing'] }],
    }, `portfolio.${collection}[0].skillIds[0]`, 'unknown-reference');
  }
});

test('experience associations must exist and belong to the same phase', () => {
  const fixture = createPortfolioFixture();
  for (const collection of ['projects', 'achievements'] as const) {
    rejects({
      ...fixture, [collection]: [{ ...fixture[collection][0], experienceId: 'missing' }],
    }, `portfolio.${collection}[0].experienceId`, 'unknown-reference');
    rejects({
      ...fixture, [collection]: [{ ...fixture[collection][0], phaseId: 'birmingham' }],
    }, `portfolio.${collection}[0].experienceId`, 'inconsistent-reference');
  }
});

test('presentation, importance, media kind and review status are validated independently', () => {
  const fixture = createPortfolioFixture();
  rejects({ ...fixture, reviewStatus: 'unknown' }, 'portfolio.reviewStatus', 'invalid-value');
  rejects({
    ...fixture, projects: [{ ...fixture.projects[0], presentationKind: 'AI client' }],
  }, 'portfolio.projects[0].presentationKind', 'invalid-value');
  rejects({
    ...fixture, projects: [{ ...fixture.projects[0], importance: 'huge' }],
  }, 'portfolio.projects[0].importance', 'invalid-value');
  rejects({
    ...fixture, projects: [{ ...fixture.projects[0], media: [{ kind: 'unknown', src: '/assets/a.svg', alt: 'Example' }] }],
  }, 'portfolio.projects[0].media[0].kind', 'invalid-value');
});

test('optional experience associations can be omitted', () => {
  const fixture = createPortfolioFixture();
  assert.ok(validatePortfolio({
    ...fixture,
    projects: fixture.projects.map((project) => ({ ...project, experienceId: undefined })),
    achievements: fixture.achievements.map((achievement) => ({ ...achievement, experienceId: undefined })),
  }).ok);
});

test('rejects unsafe contact and media URLs without resolving against the current host', () => {
  const fixture = createPortfolioFixture();
  for (const href of ['javascript:alert(1)', 'data:text/html,test', '//example.invalid', '/\\example.invalid', '/a\nb', 'relative/path']) {
    rejects({
      ...fixture, contacts: [{ label: 'Example', href }],
    }, 'portfolio.contacts[0].href', 'invalid-value');
  }
  rejects({
    ...fixture, projects: [{ ...fixture.projects[0], media: [{ kind: 'image', src: 'mailto:test@example.invalid', alt: 'Example' }] }],
  }, 'portfolio.projects[0].media[0].src', 'invalid-value');
  rejects({
    ...fixture, projects: [{ ...fixture.projects[0], media: [{ kind: 'image', src: '/assets/a.svg', alt: '' }] }],
  }, 'portfolio.projects[0].media[0].alt', 'invalid-type');
});

test('rejects removal of a referenced phase; allows coordinated removal and a new chapter', () => {
  const fixture = createPortfolioFixture();
  rejects({ ...fixture, phases: fixture.phases.slice(0, -1) }, 'portfolio.currentPhaseId', 'unknown-reference');
  const removed = createPortfolioFixture({
    phases: fixture.phases.slice(0, -1), currentPhaseId: 'mauritius',
    experiences: [], projects: [], achievements: [],
  });
  assert.ok(validatePortfolio(removed).ok);
  assert.ok(validatePortfolio({
    ...fixture, phases: [...fixture.phases, {
      ...fixture.phases[0], id: 'future-example', order: 20, title: 'Synthetic new chapter',
    }],
  }).ok);
});

test('IDs resembling object prototype keys remain normal IDs', () => {
  const fixture = createPortfolioFixture();
  assert.ok(validatePortfolio({
    ...fixture, skills: [...fixture.skills, { id: '__proto__', name: 'Synthetic skill' }],
    projects: [{ ...fixture.projects[0], skillIds: ['__proto__'] }],
  }).ok);
});

test('telephone contact links accept numbers and reject malformed schemes and media use', () => {
  const input = createPortfolioFixture();
  const contact = { ...input, contacts: [{ label: 'Phone', href: 'tel:+23058189945' }] };
  assert.ok(validatePortfolio(contact).ok);
  for (const href of ['tel:', 'tel:abc', 'tel:+123;ext=4', 'tel://example.invalid/123']) {
    assert.equal(validatePortfolio({ ...input, contacts: [{ label: 'Phone', href }] }).ok, false);
  }
  const project = input.projects[0];
  assert.equal(validatePortfolio({
    ...input, projects: [{ ...project, media: [{ kind: 'image', src: 'tel:+23058189945', alt: 'Invalid image' }] }],
  }).ok, false);
});
