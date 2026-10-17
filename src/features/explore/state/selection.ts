import type { World, ExplorationView } from '../world/types.ts';

export function readSelection(search: string, world: World) {
  const params = new URLSearchParams(search);
  const id = params.get('phase');
  const project = params.get('project');
  const view = params.get('view');
  const chapter = world.chapters.find((item) => item.phaseId === id);
  const hub = view === 'observatory' && id === null && project === null;
  const invalidView = view !== null && !hub;
  return {
    phaseId: chapter?.phaseId ?? world.currentId,
    projectId: !invalidView && chapter && project && chapter.projectIds.includes(project) ? project : null,
    view: (hub ? 'observatory' : !invalidView && chapter ? 'chapter' : 'overview') as ExplorationView,
    invalid: invalidView || (id !== null && !chapter) || (project !== null && (!chapter || !chapter.projectIds.includes(project))),
  };
}
export function selectionUrl(phaseId: string | null, projectId: string | null = null): string {
  const params = new URLSearchParams();
  if (phaseId) params.set('phase', phaseId);
  if (phaseId && projectId) params.set('project', projectId);
  const query = params.toString();
  return '/explore/' + (query ? '?' + query : '');
}
export function observatoryUrl(): string { return '/explore/?view=observatory'; }
