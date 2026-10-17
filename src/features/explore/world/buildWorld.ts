import type { Portfolio } from '../../../domain/career/types.ts';
import { getOrderedPhases } from '../../../domain/career/queries.ts';
import type { Chapter, World } from './types.ts';

const palettes: Readonly<Record<string, readonly [string, string, string]>> = {
  'theme-abu-dhabi': ['#183f46', '#69dfd0', '#c2ebe4'],
  'theme-france': ['#24354c', '#dfbb75', '#698cb3'],
};
const colors = { software: '#dfbb75', ai: '#69dfd0', client: '#acb0ef', 'open-source': '#91cfa3' };

// Only layout descriptors are generated. These are not commissioned environments.
export function buildWorld(portfolio: Portfolio): World {
  const ordered = getOrderedPhases(portfolio);
  const currentIndex = ordered.findIndex((phase) => phase.id === portfolio.currentPhaseId);
  if (currentIndex < 0) throw new Error('A prototype requires a valid current phase.');
  const start = Math.min(Math.max(0, currentIndex - 1), Math.max(0, ordered.length - 2));
  const chapters: Chapter[] = ordered.slice(start, start + 2).map((phase) => {
    const [ground, accent, characterColor] = palettes[phase.themeId] ?? ['#28413d', '#dfbb75', '#9cc3ab'];
    const projects = portfolio.projects.filter((project) => project.phaseId === phase.id)
      .sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
    return {
      phaseId: phase.id, title: phase.title, ground, accent, characterColor, bounds: 9,
      projectIds: projects.map((project) => project.id),
      landmarks: projects.slice(0, 8).map((project, index) => ({
        projectId: project.id,
        position: { x: (index % 4 - 1.5) * 4, z: -2 - Math.floor(index / 4) * 3.5 },
        size: project.importance === 'major' ? 1.8 : project.importance === 'medium' ? 1.3 : .8,
        height: project.importance === 'major' ? 3 : project.importance === 'medium' ? 2 : 1,
        color: colors[project.presentationKind],
      })),
    };
  });
  return { chapters, currentId: portfolio.currentPhaseId };
}
