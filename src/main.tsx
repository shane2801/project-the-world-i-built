import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { resolveRoute, routeTitle } from './app/routes';
import { portfolio } from './content/portfolio';
import App from './app/App';
import './styles/global.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('The application root is missing.');
}

// The browser and build resolve the same pathname; query/hash never select pages.
document.title = routeTitle(resolveRoute(window.location.pathname, portfolio), portfolio);
const application = <StrictMode><App pathname={window.location.pathname} /></StrictMode>;
if (container.childElementCount > 0) {
  hydrateRoot(container, application);
} else {
  createRoot(container).render(application);
}
