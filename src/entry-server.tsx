import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './app/App';

// Invoked only by the static build. No production server is required.
export function render() {
  return renderToString(<StrictMode><App /></StrictMode>);
}
