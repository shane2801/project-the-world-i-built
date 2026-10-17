import assert from 'node:assert/strict';
import test from 'node:test';
import { createPortfolioFixture } from '../../../domain/career/__fixtures__/portfolio.ts';
import { buildWorld } from './buildWorld.ts';
import { stepPosition, nearPortal } from './movement.ts';

test('prototype selects current chapter and neighbor by authored order without mutating content', () => {
  const content = createPortfolioFixture();
  const before = structuredClone(content);
  const world = buildWorld(content);
  assert.deepEqual(world.chapters.map((chapter) => chapter.phaseId), ['abu-dhabi', 'france']);
  assert.deepEqual(content, before);
  assert.deepEqual(buildWorld({ ...content, phases: [...content.phases].reverse() }), world);
});

test('current-first and one-chapter portfolios remain usable', () => {
  const content = createPortfolioFixture({ currentPhaseId: 'mauritius' });
  assert.deepEqual(buildWorld(content).chapters.map((chapter) => chapter.phaseId), ['mauritius', 'birmingham']);
  assert.equal(buildWorld({ ...content, phases: [content.phases[0]], projects: [] }).chapters.length, 1);
  assert.throws(() => buildWorld({ ...content, currentPhaseId: 'missing' }), /current phase/);
});

test('landmark cap preserves complete project associations and deterministic placements', () => {
  const input = createPortfolioFixture();
  const projects = Array.from({ length: 24 }, (_, index) => ({ ...input.projects[0], id: 'project-' + index }));
  const world = buildWorld({ ...input, projects });
  const chapter = world.chapters[1];
  assert.equal(chapter.landmarks.length, 8);
  assert.equal(chapter.projectIds.length, 24);
  assert.deepEqual(buildWorld({ ...input, projects: [...projects].reverse() }), world);
  assert.ok(chapter.landmarks.every((landmark) => Math.abs(landmark.position.x) + landmark.size < chapter.bounds));
});

test('adding a current chapter needs no location-specific engine code', () => {
  const input = createPortfolioFixture();
  const phase = { ...input.phases[4], id: 'next', order: 5, themeId: 'new-theme' };
  const world = buildWorld({ ...input, phases: [...input.phases, phase], currentPhaseId: 'next' });
  assert.deepEqual(world.chapters.map((chapter) => chapter.phaseId), ['france', 'next']);
  assert.equal(world.chapters[1].landmarks.length, 0);
});

test('movement normalizes diagonals, caps long frames and ignores invalid deltas', () => {
  const chapter = buildWorld(createPortfolioFixture()).chapters[0];
  const origin = { x: 0, z: 4 };
  const diagonal = stepPosition(origin, new Set(['w', 'd']), 1, chapter);
  assert.ok(Math.abs(Math.hypot(diagonal.x, diagonal.z - 4) - .2) < 1e-10);
  assert.deepEqual(stepPosition(origin, new Set(['w']), 1, chapter), stepPosition(origin, new Set(['w']), .05, chapter));
  for (const delta of [0, -1, NaN, Infinity]) assert.equal(stepPosition(origin, new Set(['w']), delta, chapter), origin);
});

test('movement respects world bounds and landmark collisions while permitting sliding', () => {
  const chapter = {
    ...buildWorld(createPortfolioFixture()).chapters[0],
    landmarks: [{ projectId: 'obstacle', position: { x: 0, z: 0 }, size: 2, height: 2, color: '#fff' }],
  };
  const position = { x: -1.5, z: 0 };
  const next = stepPosition(position, new Set(['d', 's']), .05, chapter);
  assert.equal(next.x, position.x);
  assert.ok(next.z > 0);
  let edge = { x: 8.5, z: 4 };
  for (let frame = 0; frame < 100; frame++) edge = stepPosition(edge, new Set(['d']), .05, chapter);
  assert.ok(edge.x <= chapter.bounds - .4);
  assert.deepEqual(position, { x: -1.5, z: 0 });
  assert.ok(nearPortal({ x: 0, z: -7 }));
  assert.ok(!nearPortal({ x: 0, z: 4 }));
});
