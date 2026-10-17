import assert from 'node:assert/strict';
import test from 'node:test';
import { withLoadingDeadline } from './loading.ts';

test('a responsive renderer preserves its result or original error', async () => {
  assert.equal(await withLoadingDeadline(Promise.resolve('ready'), 1000), 'ready');
  const failure = new Error('Network blocked');
  await assert.rejects(withLoadingDeadline(Promise.reject(failure), 1000), (error) => error === failure);
});

test('a stalled renderer fails within the recovery deadline', async () => {
  await assert.rejects(withLoadingDeadline(new Promise<never>(() => {}), 5), /loading timed out/);
});

test('late renderer success or rejection is handled after its deadline expires', async () => {
  let succeed!: (value: string) => void;
  let fail!: (reason: Error) => void;
  const lateSuccess = withLoadingDeadline(new Promise<string>((resolve) => { succeed = resolve; }), 5);
  const lateFailure = withLoadingDeadline(new Promise<string>((_, reject) => { fail = reject; }), 5);
  await Promise.all([assert.rejects(lateSuccess, /timed out/), assert.rejects(lateFailure, /timed out/)]);
  succeed('too late');
  fail(new Error('late rejection'));
  await new Promise((resolve) => setTimeout(resolve, 0));
});
