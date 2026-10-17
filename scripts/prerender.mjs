import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { getStaticPages } from '../.prerender/entry-server.js';

const output = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', output), 'utf8');
const marker = '<!--app-html-->';
const headMarker = '<!--page-head-->';
for (const expected of [marker, headMarker]) {
  if (template.split(expected).length !== 2) throw new Error(`Expected one ${expected} marker.`);
}
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}
const pages = getStaticPages();
for (const page of pages) {
  const relative = page.path === '/404.html' ? '404.html' :
    page.path === '/' ? 'index.html' : `${page.path.slice(1)}index.html`;
  const destination = new URL(relative, output);
  if (!destination.href.startsWith(output.href)) throw new Error('Static page escaped output directory.');
  await mkdir(new URL('./', destination), { recursive: true });
  const head = page.draft ? '<meta name="robots" content="noindex,nofollow" />' : '';
  const html = template.replace('<title>The World I Built</title>', () => `<title>${escapeHtml(page.title)}</title>`).replace(headMarker, () => head).replace(marker, () => page.html);
  await writeFile(destination, html, 'utf8');
}
console.log(`Prerendered ${pages.length} static pages, including the 404 fallback.`);
