import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import type { Portfolio } from './domain/career/types';
import { portfolio, contentIsDraft } from './content/portfolio';
import { getStaticPaths, resolveRoute, routeTitle } from './app/routes';
import App from './app/App';

// Invoked only by the static build. Injected content is also used by SSR tests.
export function render(pathname = '/', content: Portfolio | null = portfolio, draft = contentIsDraft) {
  return renderToString(<StrictMode><App pathname={pathname} portfolio={content} draft={draft} /></StrictMode>);
}

export function getStaticPages(content: Portfolio | null = portfolio, draft = contentIsDraft) {
  return getStaticPaths(content).map((path) => ({
    path,
    title: routeTitle(resolveRoute(path, content), content),
    html: render(path, content, draft),
    draft,
  }));
}
