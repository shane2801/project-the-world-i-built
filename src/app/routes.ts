import type { Portfolio } from '../domain/career/types.ts';
import { getProjectById } from '../domain/career/queries.ts';

export type Route =
  | { readonly kind: 'home' | 'resume' | 'projects' | 'explore' | 'observatory' | 'not-found' }
  | { readonly kind: 'project'; readonly projectId: string };

import { projectPath } from '../features/projects/paths.ts';

export function resolveRoute(pathname: string, portfolio: Portfolio | null): Route {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (path === '/') return { kind: 'home' };
  if (path === '/resume/') return { kind: 'resume' };
  if (path === '/projects/') return { kind: 'projects' };
  if (path === '/observatory/') return { kind: 'observatory' };
  if (path === '/explore/') return { kind: 'explore' };
  const match = /^\/projects\/([a-zA-Z0-9][a-zA-Z0-9_-]*)\/$/.exec(path);
  if (match && portfolio && getProjectById(portfolio, match[1])) {
    return { kind: 'project', projectId: match[1] };
  }
  return { kind: 'not-found' };
}

export function getStaticPaths(portfolio: Portfolio | null): readonly string[] {
  return ['/', '/resume/', '/projects/', '/explore/', '/observatory/', ...(
    portfolio?.projects.map((project) => projectPath(project.id)) ?? []
  ), '/404.html'];
}

export function routeTitle(route: Route, portfolio: Portfolio | null): string {
  switch (route.kind) {
    case 'home': return 'The World I Built';
    case 'resume': return 'Résumé | The World I Built';
    case 'projects': return 'Projects | The World I Built';
    case 'observatory': return 'Observatory | The World I Built';
    case 'explore': return 'Explore | The World I Built';
    case 'project': return `${portfolio && getProjectById(portfolio, route.projectId)?.title} | The World I Built`;
    case 'not-found': return 'Page not found | The World I Built';
  }
}
