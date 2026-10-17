import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../.prerender/entry-server.js';

const htmlPath = new URL('../dist/index.html', import.meta.url);
const template = await readFile(htmlPath, 'utf8');
const marker = '<!--app-html-->';

if (template.split(marker).length !== 2) {
  throw new Error('Expected exactly one static-render marker in the HTML template.');
}

await writeFile(htmlPath, template.replace(marker, () => render()), 'utf8');
console.log('Prerendered the application shell into dist/index.html.');
