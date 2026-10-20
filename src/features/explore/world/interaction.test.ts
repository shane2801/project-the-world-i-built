import assert from 'node:assert/strict';
import test from 'node:test';
import { buildWorld } from './buildWorld.ts';
import { createPortfolioFixture } from '../../../domain/career/__fixtures__/portfolio.ts';
import { interactionAt } from './interaction.ts';

const world = buildWorld(createPortfolioFixture());
const chapter = world.chapters.find((item) => item.phaseId === 'france')!;

test('project interaction uses authored title and is reachable outside collision bounds', () => {
  const landmark = chapter.landmarks[0];
  const position = { x: landmark.position.x, z: landmark.position.z + landmark.size / 2 + .6 };
  assert.deepEqual(interactionAt(position, chapter, world), {
    kind: 'project', id: landmark.projectId, label: landmark.title,
  });
  assert.equal(interactionAt({ x: 0, z: 4 }, chapter, world), null);
});

test('portal interaction names the actual authored neighbor and rejects distant positions', () => {
  const target = interactionAt({ x: -3, z: -7.5 }, chapter, world);
  assert.equal(target?.kind, 'portal');
  assert.equal(target?.id, 'abu-dhabi');
  assert.equal(target?.label, world.chapters.find((item) => item.phaseId === 'abu-dhabi')?.title);
  assert.equal(interactionAt({ x: -3, z: -10 }, chapter, world), null);
});

test('closest target wins without mutating descriptor order', () => {
  const first = chapter.landmarks[0];
  const custom = { ...chapter, landmarks: [
    { ...first, projectId: 'farther', position: { x: 1, z: 0 } },
    { ...first, projectId: 'nearer', position: { x: .4, z: 0 } },
  ] };
  const before = structuredClone(custom);
  assert.equal(interactionAt({ x: 0, z: 0 }, custom, world)?.id, 'nearer');
  assert.deepEqual(custom, before);
});

test('invalid positions and chapters with no nearby targets expose no action', () => {
  for (const position of [{ x: NaN, z: 0 }, { x: Infinity, z: 0 }]) {
    assert.equal(interactionAt(position, chapter, world), null);
  }
  assert.equal(interactionAt({ x: 0, z: 4 }, { ...chapter, landmarks: [] }, world), null);
});
