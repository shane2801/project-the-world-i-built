import assert from 'node:assert/strict';
import test from 'node:test';
import { buildWorld } from '../world/buildWorld.ts';
import { createPortfolioFixture } from '../../../domain/career/__fixtures__/portfolio.ts';
import { experienceReducer as reduce, initialExperience, isTravelling } from './experience.ts';
import { readSelection, selectionUrl } from './selection.ts';

const world = buildWorld(createPortfolioFixture());

test('travel retains active chapter until matching destination is prepared and rendered', () => {
  let state = initialExperience(world);
  state = reduce(state, { type: 'request', phaseId: 'abu-dhabi', request: 1 });
  assert.ok(isTravelling(state));
  assert.equal(state.activeId, 'france');
  assert.equal(reduce(state, { type: 'arrived', request: 1 }), state);
  state = reduce(state, { type: 'prepared', request: 1 });
  assert.equal(reduce(state, { type: 'arrived', request: 1 }), state);
  assert.equal(reduce(state, { type: 'rendered', phaseId: 'france' }), state);
  state = reduce(state, { type: 'rendered', phaseId: 'abu-dhabi' });
  state = reduce(state, { type: 'arrived', request: 1 });
  assert.equal(state.activeId, 'abu-dhabi');
  assert.equal(state.pendingId, null);
  assert.equal(state.view, 'chapter');
  assert.equal(state.status, 'idle');
});

test('duplicate requests, unknown destinations and stale completions do not change state', () => {
  const initial = initialExperience(world);
  assert.equal(reduce(initial, { type: 'request', phaseId: 'missing', request: 1 }), initial);
  const loading = reduce(initial, { type: 'request', phaseId: 'abu-dhabi', request: 1 });
  assert.equal(reduce(loading, { type: 'request', phaseId: 'france', request: 2 }), loading);
  assert.equal(reduce(loading, { type: 'prepared', request: 0 }), loading);
  assert.equal(reduce(loading, { type: 'select', projectId: 'anything' }), loading);
  assert.equal(reduce(loading, { type: 'failed', request: 0, message: 'stale' }), loading);
});

test('failed loading retains current chapter and destination for retry', () => {
  const initial = initialExperience(world);
  let state = reduce(initial, { type: 'request', phaseId: 'abu-dhabi', request: 1 });
  state = reduce(state, { type: 'failed', request: 1, message: 'offline' });
  assert.equal(state.activeId, 'france');
  assert.equal(state.pendingId, 'abu-dhabi');
  assert.equal(state.error, 'offline');
  assert.ok(!isTravelling(state));
  state = reduce(state, { type: 'request', phaseId: 'abu-dhabi', request: 2 });
  assert.equal(state.status, 'loading');
  assert.equal(state.error, null);
  assert.equal(reduce(state, { type: 'prepared', request: 1 }), state);
});

test('overview and URL restore cancel pending travel and reject late callbacks', () => {
  const loading = reduce(initialExperience(world), { type: 'request', phaseId: 'abu-dhabi', request: 1 });
  for (const state of [
    reduce(loading, { type: 'overview' }),
    reduce(loading, { type: 'restore', phaseId: 'france', projectId: 'example-project', view: 'chapter' }),
  ]) {
    assert.equal(state.status, 'idle');
    assert.equal(state.pendingId, null);
    assert.equal(reduce(state, { type: 'prepared', request: 1 }), state);
    assert.equal(reduce(state, { type: 'failed', request: 1, message: 'stale' }), state);
  }
});

test('URL selection validates chapter ownership and supports shareable project links', () => {
  const url = selectionUrl('france', 'example-project');
  assert.equal(url, '/explore/?phase=france&project=example-project');
  const selected = readSelection(url.slice(url.indexOf('?')), world);
  assert.equal(selected.phaseId, 'france');
  assert.equal(selected.projectId, 'example-project');
  assert.equal(selected.invalid, false);
  assert.equal(readSelection('?phase=abu-dhabi&project=example-project', world).projectId, null);
  assert.ok(readSelection('?phase=mauritius', world).invalid);
  assert.ok(readSelection('?project=example-project', world).invalid);
  assert.equal(selectionUrl(null), '/explore/');
});

test('URL restore cannot select unknown chapters and state updates do not mutate inputs', () => {
  const state = initialExperience(world);
  const before = structuredClone(state);
  assert.equal(reduce(state, { type: 'restore', phaseId: 'missing', projectId: null, view: 'chapter' }), state);
  const selected = reduce(state, { type: 'select', projectId: 'example-project' });
  assert.equal(selected.projectId, 'example-project');
  assert.deepEqual(state, before);
});
