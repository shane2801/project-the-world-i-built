import assert from 'node:assert/strict';
import test from 'node:test';
import { createPortfolioFixture } from '../../../domain/career/__fixtures__/portfolio.ts';
import { validatePortfolio } from '../../../domain/career/validate.ts';
import { buildWorld } from './buildWorld.ts';
import { stepPosition } from './movement.ts';
import { getPortals, portalAt } from './navigation.ts';

test('all authored chapters render in explicit order without mutation', () => {
  const content = createPortfolioFixture();
  const before = structuredClone(content);
  const world = buildWorld(content);
  assert.deepEqual(world.chapters.map((chapter) => chapter.phaseId), content.phases.map((phase) => phase.id));
  assert.deepEqual(content, before);
  assert.deepEqual(buildWorld({ ...content, phases: [...content.phases].reverse() }), world);
  assert.equal(new Set(world.chapters.map((chapter) => chapter.environment)).size, 5);
});

test('current-first and one-chapter portfolios retain all valid chapters', () => {
  const content = createPortfolioFixture({ currentPhaseId: 'mauritius' });
  assert.equal(buildWorld(content).chapters.length, 5);
  const world = buildWorld({ ...content, phases: [content.phases[0]], projects: [] });
  assert.equal(world.chapters.length, 1);
  assert.deepEqual(getPortals(world, 'mauritius'), []);
  assert.throws(() => buildWorld({ ...content, currentPhaseId: 'missing' }), /current phase/);
});

test('landmark cap preserves all project associations and deterministic placements', () => {
  const input = createPortfolioFixture();
  const projects = Array.from({ length: 24 }, (_, index) => ({ ...input.projects[0], id: 'project-' + index }));
  const world = buildWorld({ ...input, projects });
  const chapter = world.chapters.find((item) => item.phaseId === 'france');
  assert.ok(chapter);
  assert.equal(chapter.landmarks.length, 8);
  assert.equal(chapter.projectIds.length, 24);
  assert.deepEqual(buildWorld({ ...input, projects: [...projects].reverse() }), world);
  assert.ok(chapter.landmarks.every((landmark) => Math.abs(landmark.position.x) + landmark.size < chapter.bounds));
});

test('adding, reordering and removing valid content needs no engine edits', () => {
  const input = createPortfolioFixture();
  const phase = { ...input.phases[4], id: 'sixth', order: 5, themeId: 'new-theme' };
  const project = { ...input.projects[0], id: 'sixth-project', phaseId: phase.id, experienceId: undefined };
  const added = validatePortfolio({ ...input, phases: [...input.phases, phase], projects: [...input.projects, project] });
  assert.ok(added.ok);
  const world = buildWorld(added.value);
  assert.equal(world.chapters.length, 6);
  assert.equal(world.chapters[5].environment, 'generic');
  assert.deepEqual(world.chapters[5].projectIds, ['sixth-project']);
  const reordered = {
    ...added.value,
    phases: added.value.phases.map((item) => ({ ...item, order: item.id === 'france' ? 0 : item.id === 'sixth' ? 6 : item.order + 1 })),
  };
  const checked = validatePortfolio(reordered);
  assert.ok(checked.ok);
  const changed = buildWorld(checked.value);
  assert.equal(changed.chapters[0].phaseId, 'france');
  assert.equal(changed.currentId, 'france');
  assert.deepEqual(changed.chapters.find((item) => item.phaseId === 'france')?.projectIds, ['example-project']);
  const removed = validatePortfolio({
    ...checked.value,
    phases: checked.value.phases.filter((item) => item.id !== 'sixth'),
    projects: checked.value.projects.filter((item) => item.id !== 'sixth-project'),
  });
  assert.ok(removed.ok);
  assert.equal(buildWorld(removed.value).chapters.length, 5);
  assert.ok(!buildWorld(removed.value).chapters.some((item) => item.phaseId === 'sixth'));
});

test('portals follow authored neighbors at either end and in the middle', () => {
  const world = buildWorld(createPortfolioFixture());
  assert.deepEqual(getPortals(world, 'mauritius').map((portal) => portal.phaseId), ['birmingham']);
  assert.deepEqual(getPortals(world, 'france').map((portal) => portal.phaseId), ['abu-dhabi']);
  const middle = getPortals(world, 'birmingham');
  assert.deepEqual(middle.map((portal) => portal.phaseId), ['mauritius', 'freelance']);
  assert.equal(portalAt(middle[0].position, middle)?.phaseId, 'mauritius');
  assert.equal(portalAt(middle[1].position, middle)?.phaseId, 'freelance');
  assert.equal(portalAt({ x: 0, z: 4 }, middle), undefined);
  assert.deepEqual(getPortals(world, 'unknown'), []);
});

test('maximum landmark layouts leave every portal accessible', () => {
  const input = createPortfolioFixture();
  const projects = Array.from({ length: 8 }, (_, index) => ({ ...input.projects[0], id: 'p-' + index, phaseId: 'birmingham' }));
  const world = buildWorld({ ...input, projects });
  const chapter = world.chapters[1];
  for (const portal of getPortals(world, chapter.phaseId)) {
    assert.ok(chapter.landmarks.every((item) => Math.abs(portal.position.z - item.position.z) > item.size / 2 + .4));
  }
});

test('movement normalizes diagonals, caps long frames and ignores invalid deltas', () => {
  const chapter = buildWorld(createPortfolioFixture()).chapters[0];
  const origin = { x: 0, z: 4 };
  const diagonal = stepPosition(origin, new Set(['w', 'd']), 1, chapter);
  assert.ok(Math.abs(Math.hypot(diagonal.x, diagonal.z - 4) - .2) < 1e-10);
  assert.deepEqual(stepPosition(origin, new Set(['w']), 1, chapter), stepPosition(origin, new Set(['w']), .05, chapter));
  for (const delta of [0, -1, NaN, Infinity]) assert.equal(stepPosition(origin, new Set(['w']), delta, chapter), origin);
});

test('movement respects bounds and collisions while permitting sliding', () => {
  const chapter = {
    ...buildWorld(createPortfolioFixture()).chapters[0],
    landmarks: [{ projectId: 'obstacle', title: 'Test obstacle', position: { x: 0, z: 0 }, size: 2, height: 2, color: '#fff' }],
  };
  const position = { x: -1.5, z: 0 };
  const next = stepPosition(position, new Set(['d', 's']), .05, chapter);
  assert.equal(next.x, position.x);
  assert.ok(next.z > 0);
  let edge = { x: 8.5, z: 4 };
  for (let frame = 0; frame < 100; frame++) edge = stepPosition(edge, new Set(['d']), .05, chapter);
  assert.ok(edge.x <= chapter.bounds - .4);
  assert.deepEqual(position, { x: -1.5, z: 0 });
});
