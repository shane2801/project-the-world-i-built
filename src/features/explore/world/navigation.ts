import type { Point, World } from './types.ts';

export interface Portal {
  readonly phaseId: string;
  readonly label: 'Previous chapter' | 'Next chapter';
  readonly position: Point;
}
export function getPortals(world: World, phaseId: string): readonly Portal[] {
  const index = world.chapters.findIndex((chapter) => chapter.phaseId === phaseId);
  if (index < 0) return [];
  const previous = world.chapters[index - 1];
  const next = world.chapters[index + 1];
  return [
    ...(previous ? [{ phaseId: previous.phaseId, label: 'Previous chapter' as const, position: { x: -3, z: -7.5 } }] : []),
    ...(next ? [{ phaseId: next.phaseId, label: 'Next chapter' as const, position: { x: 3, z: -7.5 } }] : []),
  ];
}
export function portalAt(position: Point, portals: readonly Portal[]): Portal | undefined {
  return portals.find((portal) => Math.hypot(position.x - portal.position.x, position.z - portal.position.z) < 2.1);
}
