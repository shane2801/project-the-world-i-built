import type { Chapter, Point, World } from './types.ts';
import { getPortals } from './navigation.ts';

export interface Interaction { readonly kind: 'project' | 'portal'; readonly id: string; readonly label: string }

// One proximity rule drives both the on-screen hint and the E-key action.
export function interactionAt(position: Point, chapter: Chapter, world: World): Interaction | null {
  const targets = [
    ...chapter.landmarks.map((item) => ({
      kind: 'project' as const, id: item.projectId, label: item.title,
      distance: Math.hypot(position.x - item.position.x, position.z - item.position.z),
      radius: item.size / 2 + 1.6,
    })),
    ...getPortals(world, chapter.phaseId).map((item) => ({
      kind: 'portal' as const, id: item.phaseId,
      label: world.chapters.find((candidate) => candidate.phaseId === item.phaseId)?.title ?? item.label,
      distance: Math.hypot(position.x - item.position.x, position.z - item.position.z), radius: 2.1,
    })),
  ].filter((item) => item.distance < item.radius).sort((a, b) => a.distance - b.distance);
  const nearest = targets[0];
  return nearest ? { kind: nearest.kind, id: nearest.id, label: nearest.label } : null;
}
