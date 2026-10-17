import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './app/App';
import './styles/global.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('The application root is missing.');
}

const application = <StrictMode><App /></StrictMode>;

// Production contains build-time HTML; development starts with an empty root.
if (container.childElementCount > 0) {
  hydrateRoot(container, application);
} else {
  createRoot(container).render(application);
}
