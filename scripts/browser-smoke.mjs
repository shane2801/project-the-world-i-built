import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { access, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { preview } from 'vite';

const chrome = process.env.CHROME_PATH ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
await access(chrome);
const profile = await mkdtemp(join(tmpdir(), 'theworld-phase4-'));
const server = await preview({ logLevel: 'error', preview: { host: '127.0.0.1', port: 0, strictPort: true } });
const address = server.httpServer.address();
assert.ok(address && typeof address === 'object');
const origin = 'http://127.0.0.1:' + address.port;
// Software rendering checks behavior without relying on this host's GPU.
const child = spawn(chrome, [
  '--headless', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', '--remote-debugging-address=127.0.0.1',
  '--user-data-dir=' + profile, '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
  'about:blank',
], { windowsHide: true, stdio: 'ignore' });
let socket;
let nextId = 0;
const pending = new Map();
const errors = [];
const delay = (ms) => new Promise((done) => setTimeout(done, ms));
async function retry(operation, label, timeout = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try { const value = await operation(); if (value) return value; } catch { /* Startup or navigation may still be pending. */ }
    await delay(100);
  }
  throw new Error('Timed out: ' + label);
}
function command(method, params = {}) {
  const id = ++nextId;
  return new Promise((done, fail) => {
    const timer = setTimeout(() => { pending.delete(id); fail(new Error('CDP timeout: ' + method)); }, 20000);
    pending.set(id, { done, fail, timer });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? 'Browser evaluation failed');
  return result.result.value;
}
async function waitFor(expression, label) {
  return retry(() => evaluate(expression), label);
}
async function click(text) {
  assert.ok(await evaluate("(() => { const button = [...document.querySelectorAll('button')].find(item => item.textContent.trim() === " +
    JSON.stringify(text) + "); if (!button || button.disabled) return false; button.focus(); button.click(); return true; })()"), 'Clickable button: ' + text);
}
async function removeProfile(path) {
  if (dirname(resolve(path)) !== resolve(tmpdir()) || !basename(path).startsWith('theworld-phase4-')) throw new Error('Unexpected browser profile path');
  await rm(path, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
try {
  const port = await retry(async () => (await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0], 'Chrome startup');
  const targets = await (await fetch('http://127.0.0.1:' + port + '/json/list')).json();
  socket = new WebSocket(targets.find((target) => target.type === 'page').webSocketDebuggerUrl);
  await once(socket, 'open');
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const entry = pending.get(message.id);
      if (entry) {
        clearTimeout(entry.timer); pending.delete(message.id);
        if (message.error) entry.fail(new Error(message.error.message)); else entry.done(message.result);
      }
    } else if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails);
    else if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      errors.push(message.params.args.map((argument) => argument.value ?? argument.description).join(' '));
    }
  });
  await command('Page.enable');
  await command('Runtime.enable');
  await command('Network.enable');
  await command('Network.setCacheDisabled', { cacheDisabled: true });
  await command('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await command('Page.navigate', { url: origin + '/explore/' });
  await waitFor("document.querySelector('h1')?.textContent === 'Explore the world' && ![...document.querySelectorAll('button')].find(b => b.textContent === 'Enable 3D prototype')?.disabled", 'hydrated desktop explorer');
  assert.equal(await evaluate("document.querySelectorAll('canvas').length"), 0);
  assert.ok(!await evaluate("performance.getEntriesByType('resource').some(item => item.name.includes('PrototypeScene-'))"));
  await click('Enable 3D prototype');
  await waitFor("document.querySelector('canvas')?.width > 0", 'WebGL canvas', 20000);
  await click('Skip introduction — enter current chapter');
  await waitFor("location.search === '?phase=france' && document.querySelector('[role=status]')?.textContent.includes('Current chapter')", 'France arrival');
  await waitFor("document.querySelector('.explore-performance').textContent.includes(' calls ·')", 'renderer counters');
  if (process.env.BROWSER_SCREENSHOT) {
    const capture = await command('Page.captureScreenshot', { format: 'png' });
    await writeFile(process.env.BROWSER_SCREENSHOT, Buffer.from(capture.data, 'base64'));
  }
  console.log('PASS Chrome: hydration, lazy activation, introduction skip and France scene');

  await evaluate("document.querySelector('.explore-canvas').focus()");
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'w', code: 'KeyW' });
  await delay(250);
  await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'w', code: 'KeyW' });
  await click('Inspect project');
  await waitFor("document.activeElement?.id === 'selected-project-title'", 'project focus');
  assert.ok(await evaluate("location.search.includes('project=ev-charger-management')"));
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
  await waitFor("!document.querySelector('.explore-project-panel')", 'Escape closes project');
  assert.equal(await evaluate("document.activeElement?.textContent"), 'Inspect project');
  await evaluate("document.querySelector('.explore-chapters li button').click()");
  await waitFor("location.search === '?phase=abu-dhabi' && document.querySelector('[role=status]')?.textContent.includes('Current chapter')", 'Abu Dhabi arrival');
  await evaluate("history.back()");
  await waitFor("location.search === '?phase=france' && document.querySelector('#active-chapter-title')?.textContent.includes('France')", 'URL back navigation');
  assert.deepEqual(errors, []);
  console.log('PASS Chrome: movement key events, project focus/Escape, travel and history');

  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await waitFor("document.querySelector('input[type=checkbox]')?.checked && document.querySelector('input[type=checkbox]')?.disabled", 'system reduced motion');
  await evaluate("document.querySelector('canvas').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext()");
  await waitFor("document.querySelector('.explore-error') && !document.querySelector('canvas')", 'context loss fallback');
  assert.ok(await evaluate("document.querySelector('#active-chapter-title').textContent.includes('France') && document.querySelector('.explore-project-list a').href.includes('/projects/')"));
  await click('Retry 3D');
  await waitFor("document.querySelector('canvas') && !document.querySelector('.explore-error') && document.querySelector('[role=status]').textContent.includes('Current chapter')", 'context recovery');
  console.log('PASS Chrome: reduced-motion preference, context-loss fallback and retry');

  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await waitFor("!document.querySelector('canvas') && [...document.querySelectorAll('button')].find(b => b.textContent === 'Turn 3D off')?.disabled", 'phone information mode');
  assert.ok(await evaluate("document.querySelector('.explore-project-list a') && document.documentElement.scrollWidth <= innerWidth"));
  await command('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await command('Page.navigate', { url: origin + '/explore/' });
  await waitFor("!![...document.querySelectorAll('button')].find(b => b.textContent === 'Enable 3D prototype' && !b.disabled)", 'fresh explorer');
  await command('Network.setBlockedURLs', { urls: ['*PrototypeScene-*'] });
  await click('Enable 3D prototype');
  await waitFor("!!document.querySelector('.explore-error')", 'blocked renderer fallback');
  assert.ok(await evaluate("!!document.querySelector('.explore-project-list a')"));
  await command('Network.setBlockedURLs', { urls: [] });
  console.log('PASS Chrome: phone layout and renderer network-failure fallback');
} catch (error) {
  console.error(JSON.stringify(errors, null, 2));
  if (socket?.readyState === WebSocket.OPEN) console.error(await evaluate("document.body.innerText.slice(0, 1800)").catch(() => 'Browser diagnostic unavailable'));
  throw error;
} finally {
  if (socket?.readyState === WebSocket.OPEN) {
    await command('Browser.close').catch(() => {});
    socket.close();
  }
  for (const entry of pending.values()) { clearTimeout(entry.timer); entry.fail(new Error('Browser closed')); }
  if (child.exitCode === null) {
    const stopped = once(child, 'exit');
    child.kill();
    await stopped;
  }
  const closed = once(server.httpServer, 'close');
  server.httpServer.close(); server.httpServer.closeAllConnections?.(); await closed;
  await removeProfile(profile);
}
