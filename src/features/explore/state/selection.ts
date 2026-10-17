import type { World } from '../world/types.ts';

export function readSelection(search: string, world: World) {
  const params = new URLSearchParams(search);
  const id = params.get('phase');
  const chapter = world.chapters.find((item) => item.phaseId === id);
  const project = params.get('project');
  return {
    phaseId: chapter?.phaseId ?? world.currentId,
    projectId: chapter && project && chapter.projectIds.includes(project) ? project : null,
    view: chapter ? 'chapter' as const : 'overview' as const,
    invalid: (id !== null && !chapter) || (project !== null && (!chapter || !chapter.projectIds.includes(project))),
  };
}
export function selectionUrl(phaseId: string | null, projectId: string | null = null): string {
  const params = new URLSearchParams();
  if (phaseId) params.set('phase', phaseId);
  if (phaseId && projectId) params.set('project', projectId);
  const query = params.toString();
  return '/explore/' + (query ? '?' + query : '');
}
