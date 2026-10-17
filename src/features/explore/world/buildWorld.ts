import type { Portfolio } from '../../../domain/career/types.ts';
import { getOrderedPhases } from '../../../domain/career/queries.ts';
import type { Chapter, World } from './types.ts';
import { getPreset } from './presets.ts';

const colors = { software: '#dfbb75', ai: '#69dfd0', client: '#acb0ef', 'open-source': '#91cfa3' };

// Data changes affect descriptors; chapter identities never branch inside the engine.
export function buildWorld(portfolio: Portfolio): World {
  const ordered = getOrderedPhases(portfolio);
  if (!ordered.some((phase) => phase.id === portfolio.currentPhaseId)) throw new Error('A world requires a valid current phase.');
  const chapters: Chapter[] = ordered.map((phase) => {
    const projects = portfolio.projects.filter((project) => project.phaseId === phase.id)
      .sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
    return {
      phaseId: phase.id, title: phase.title, ...getPreset(phase.themeId), bounds: 9,
      projectIds: projects.map((project) => project.id),
      landmarks: projects.slice(0, 8).map((project, index) => ({
        projectId: project.id,
        // Reserve the rear strip for chronological portals, including at the cap.
        position: { x: (index % 4 - 1.5) * 4, z: -1 - Math.floor(index / 4) * 3 },
        size: project.importance === 'major' ? 1.8 : project.importance === 'medium' ? 1.3 : .8,
        height: project.importance === 'major' ? 3 : project.importance === 'medium' ? 2 : 1,
        color: colors[project.presentationKind],
      })),
    };
  });
  return { chapters, currentId: portfolio.currentPhaseId };
}
