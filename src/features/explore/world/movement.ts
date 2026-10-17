import type { Chapter, Point } from './types.ts';

export const movementKeys = new Set(['w', 'a', 's', 'd', 'arrowup', 'arrowleft', 'arrowdown', 'arrowright']);

export function stepPosition(position: Point, keys: ReadonlySet<string>, delta: number, chapter: Chapter): Point {
  if (!Number.isFinite(delta) || delta <= 0) return position;
  let x = Number(keys.has('d') || keys.has('arrowright')) - Number(keys.has('a') || keys.has('arrowleft'));
  let z = Number(keys.has('s') || keys.has('arrowdown')) - Number(keys.has('w') || keys.has('arrowup'));
  const length = Math.hypot(x, z);
  if (length === 0) return position;
  // Clamp long frames and normalize diagonals: tab changes cannot teleport players.
  const distance = 4 * Math.min(delta, .05);
  x = x / length * distance; z = z / length * distance;
  const limit = chapter.bounds - .4;
  const allowed = (candidate: Point) => Math.abs(candidate.x) <= limit && Math.abs(candidate.z) <= limit
    && !chapter.landmarks.some((landmark) =>
      Math.abs(candidate.x - landmark.position.x) < landmark.size / 2 + .4
      && Math.abs(candidate.z - landmark.position.z) < landmark.size / 2 + .4);
  let next = position;
  const horizontal = { x: Math.max(-limit, Math.min(limit, next.x + x)), z: next.z };
  if (allowed(horizontal)) next = horizontal;
  const vertical = { x: next.x, z: Math.max(-limit, Math.min(limit, next.z + z)) };
  if (allowed(vertical)) next = vertical;
  return next;
}
