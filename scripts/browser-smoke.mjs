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
const pausedRequests = [];
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
  // Match physical letter-key events, including Chrome's native key codes.
  if (method === 'Input.dispatchKeyEvent' && /^Key[A-Z]$/.test(params.code ?? '')) {
    const keyCode = params.code.charCodeAt(3);
    params = { ...params, windowsVirtualKeyCode: keyCode, nativeVirtualKeyCode: keyCode };
  }
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
    } else if (message.method === 'Fetch.requestPaused') pausedRequests.push(message.params.requestId);
    else if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails);
    else if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      errors.push(message.params.args.map((argument) => argument.value ?? argument.description).join(' '));
    }
  });
  await command('Page.enable');
  await command('Runtime.enable');
  await command('Network.enable');
  await command('Network.setCacheDisabled', { cacheDisabled: true });
  await command('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await command('Page.navigate', { url: origin + '/' });
  await waitFor("document.querySelector('h1')?.textContent === 'Kavish Muthoora' && document.readyState === 'complete'", 'resume root');
  assert.ok(await evaluate("Math.abs(document.querySelector('.resume-intro').getBoundingClientRect().left - (document.querySelector('.masthead').getBoundingClientRect().left + parseFloat(getComputedStyle(document.querySelector('.masthead')).paddingLeft))) < 2"), 'Resume aligns to the header left edge');
  assert.ok(await evaluate("!document.querySelector('.home-hero') && !document.querySelector('.planet-artwork') && document.querySelectorAll('.career-timeline > li').length === 5"));
  assert.deepEqual(await evaluate("[...document.querySelectorAll('.timeline-chapter')].map(el => el.id)"), ['phase-france', 'phase-abu-dhabi', 'phase-freelance', 'phase-birmingham', 'phase-mauritius']);
  assert.ok(await evaluate("!document.getElementById('phase-freelance').open && document.getElementById('phase-france').open"));
  assert.ok(await evaluate("(() => { const summary = document.querySelector('#phase-freelance > summary'); summary.focus(); return document.activeElement === summary; })()"), 'Native summary takes keyboard focus');
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13, text: '\r', unmodifiedText: '\r' });
  await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 });
  await waitFor("document.getElementById('phase-freelance').open", 'consulting keyboard expansion');
  await evaluate("document.querySelector('#phase-freelance > summary').click()");
  await evaluate("document.querySelector('.project-marker > a').scrollIntoView({ block: 'center' })");
  const star = await evaluate("(() => { const r = document.querySelector('.project-marker > a').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()");
  await command('Input.dispatchMouseEvent', { type: 'mouseMoved', ...star });
  await waitFor("getComputedStyle(document.querySelector('.project-preview')).display === 'block'", 'project hover preview');
  await command('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 0, y: 0 });
  await evaluate("document.querySelector('.project-marker > a').focus()");
  await waitFor("getComputedStyle(document.querySelector('.project-preview')).display === 'block'", 'project focus preview');
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
  await waitFor("getComputedStyle(document.querySelector('.project-preview')).display === 'none'", 'preview Escape dismissal');
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13, text: '\r', unmodifiedText: '\r' });
  await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 });
  await waitFor("location.pathname === '/projects/ev-charger-management/' && !!document.querySelector('h1')", 'project star detail navigation');
  await command('Page.navigate', { url: origin + '/resume/#phase-freelance' });
  await waitFor("document.getElementById('phase-freelance')?.open && document.getElementById('career').open", 'direct hidden-chapter reveal');
  await command('Page.navigate', { url: origin + '/#contact' });
  await waitFor("document.getElementById('contact')?.open", 'direct contact reveal');
  await command('Page.navigate', { url: origin + '/' });
  await waitFor("document.querySelector('h1')?.textContent === 'Kavish Muthoora' && document.readyState === 'complete'", 'resume review screenshot');
  if (process.env.ASSET_SCREENSHOT_BASE) {
    const height = await evaluate('document.documentElement.scrollHeight');
    const shot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: 1280, height, scale: 1 } });
    await writeFile(process.env.ASSET_SCREENSHOT_BASE + '-resume.png', Buffer.from(shot.data, 'base64'));
  }
  assert.ok(!await evaluate("performance.getEntriesByType('resource').some(item => item.name.includes('PrototypeScene-'))"));
  for (const path of ['/', '/resume/', '/projects/', '/observatory/']) {
    await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await command('Page.navigate', { url: origin + path });
    await waitFor("!!document.querySelector('h1') && document.readyState === 'complete'", 'responsive static page ' + path);
    assert.ok(await evaluate("document.documentElement.scrollWidth <= innerWidth"), 'No horizontal overflow: ' + path);
  }
  await command('Page.navigate', { url: origin + '/' });
  await waitFor("document.querySelector('.project-marker > a') && document.readyState === 'complete'", 'mobile resume');
  if (process.env.ASSET_SCREENSHOT_BASE) {
    const height = await evaluate('document.documentElement.scrollHeight');
    const shot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: 390, height, scale: 1 } });
    await writeFile(process.env.ASSET_SCREENSHOT_BASE + '-phone.png', Buffer.from(shot.data, 'base64'));
  }
  await evaluate("document.querySelector('.project-marker > a').click()");
  await waitFor("location.pathname === '/projects/ev-charger-management/'", 'mobile project star');
  await command('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  console.log('PASS Chrome: resume root, newest-first disclosures, consulting, previews, star links and fragment reveal');

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
  await delay(150);
  await evaluate("document.querySelector('.explore-canvas').focus()");
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'a', code: 'KeyA' });
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'w', code: 'KeyW' });
  try {
    await waitFor("document.querySelector('.world-interaction')?.textContent.includes('Inspect')", 'nearby project hint');
  } finally {
    await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'a', code: 'KeyA' });
    await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'w', code: 'KeyW' });
  }
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'e', code: 'KeyE' });
  await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'e', code: 'KeyE' });
  await waitFor("document.activeElement?.id === 'selected-project-title'", 'keyboard proximity inspection');
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
  await waitFor("!document.querySelector('.explore-project-panel')", 'keyboard inspection closes');
  assert.ok(await evaluate("document.activeElement?.classList.contains('explore-canvas')"));
  console.log('PASS Chrome: nearby-project prompt, E inspection and scene focus restoration');
  await evaluate("document.querySelector('[data-phase-id=\"abu-dhabi\"]').click()");
  await waitFor("location.search === '?phase=abu-dhabi' && document.querySelector('[role=status]')?.textContent.includes('Current chapter')", 'Abu Dhabi arrival');
  await evaluate("history.back()");
  await waitFor("location.search === '?phase=france' && document.querySelector('#active-chapter-title')?.textContent.includes('France')", 'URL back navigation');
  assert.deepEqual(errors, []);
  console.log('PASS Chrome: movement key events, project focus/Escape, travel and history');


  for (const phaseId of ['mauritius', 'birmingham', 'freelance', 'abu-dhabi', 'france']) {
    await evaluate("document.querySelector('[data-phase-id=\"" + phaseId + "\"]').click()");
    await waitFor("location.search === '?phase=" + phaseId + "' && document.querySelector('[role=status]').textContent.includes('Current chapter') && !!document.querySelector('canvas')", phaseId + ' scene');
    await delay(1200);
    const counters = await evaluate("document.querySelector('.explore-performance').textContent");
    const sample = counters.match(/(\d+) calls.*?(\d+) triangles.*?(\d+) geometries/);
    assert.ok(sample, 'Live counters for ' + phaseId);
    assert.ok(Number(sample[1]) <= 100 && Number(sample[2]) <= 100000 && Number(sample[3]) <= 100, 'Provisional scene-work budget: ' + phaseId);
    console.log('SCENE ' + phaseId + ': ' + sample[0]);
    if (process.env.BROWSER_SCREENSHOT) {
      await evaluate("document.querySelector('.explore-canvas').scrollIntoView({ block: 'center' })");
      const capture = await command('Page.captureScreenshot', { format: 'png' });
      await writeFile(process.env.BROWSER_SCREENSHOT.replace(/\.png$/, '-' + phaseId + '.png'), Buffer.from(capture.data, 'base64'));
    }

  }
  await evaluate("document.querySelector('[data-phase-id=\"mauritius\"]').click()");
  await waitFor("location.search === '?phase=mauritius' && document.querySelector('[role=status]').textContent.includes('Current chapter')", 'first chapter');
  assert.equal(await evaluate("[...document.querySelectorAll('button')].some(button => button.textContent === 'Previous chapter')"), false);
  await click('Next chapter');
  await waitFor("location.search === '?phase=birmingham' && document.querySelector('[role=status]').textContent.includes('Current chapter')", 'next chronological chapter');
  await click('Previous chapter');
  await waitFor("location.search === '?phase=mauritius' && document.querySelector('[role=status]').textContent.includes('Current chapter')", 'previous chronological chapter');
  await click('Open Observatory');
  await waitFor("location.search === '?view=observatory' && !!document.querySelector('.observatory-hub') && !!document.querySelector('canvas')", 'Observatory hub');
  await delay(200);
  assert.deepEqual(errors, []);
  if (process.env.BROWSER_SCREENSHOT) {
    await evaluate("document.querySelector('.explore-canvas').focus()");
    const capture = await command('Page.captureScreenshot', { format: 'png' });
    await writeFile(process.env.BROWSER_SCREENSHOT, Buffer.from(capture.data, 'base64'));
  }
  await evaluate("document.querySelector('[href=\"#observatory-skills\"]').click()");
  await waitFor("location.hash === '#observatory-skills'", 'skill room anchor');
  await evaluate("document.querySelector('canvas').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext()");
  await waitFor("!!document.querySelector('.explore-error') && !!document.querySelector('.observatory-hub')", 'hub context loss fallback');
  await click('Retry 3D');
  await waitFor("location.search === '?view=observatory' && !!document.querySelector('canvas') && !document.querySelector('.explore-error')", 'hub graphics recovery');
  await command('Page.navigate', { url: origin + '/observatory/' });
  await waitFor("document.querySelector('h1')?.textContent === 'The Observatory' && document.querySelectorAll('.observatory-hub > section').length === 4", 'standalone Observatory');
  assert.ok(!await evaluate("performance.getEntriesByType('resource').some(item => item.name.includes('PrototypeScene-'))"));
  await command('Page.navigate', { url: origin + '/explore/?view=observatory' });
  await waitFor("!!document.querySelector('.observatory-hub') && ![...document.querySelectorAll('button')].find(b => b.textContent === 'Enable 3D prototype')?.disabled", 'direct hub reload');
  assert.equal(await evaluate("document.querySelectorAll('canvas').length"), 0);
  await click('Enable 3D prototype');
  await waitFor("!!document.querySelector('canvas')", 'reloaded hub graphics');
  await evaluate("document.querySelector('[data-phase-id=\"france\"]').click()");
  await waitFor("location.search === '?phase=france' && document.querySelector('[role=status]').textContent.includes('Current chapter')", 'return from hub');
  console.log('PASS Chrome: five chapters, chronological travel, Observatory rooms, direct hub URL and hub recovery');

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

  // Hold the real renderer response instead of simulating an immediate network error.
  await command('Fetch.enable', { patterns: [{ urlPattern: '*PrototypeScene-*', requestStage: 'Request' }] });
  await command('Page.navigate', { url: origin + '/explore/' });
  await waitFor("!![...document.querySelectorAll('button')].find(b => b.textContent === 'Enable 3D prototype' && !b.disabled)", 'stalled explorer startup');
  await click('Enable 3D prototype');
  await retry(() => pausedRequests.length > 0, 'intercepted renderer request');
  await evaluate("document.querySelector('[data-phase-id=\"abu-dhabi\"]').click()");
  await waitFor("!![...document.querySelectorAll('button')].find(b => b.textContent === 'Cancel travel')", 'cancel available during stalled travel');
  await click('Cancel travel');
  assert.ok(await evaluate("location.search === '' && !document.querySelector('.explore-error') && document.querySelector('#active-chapter-title').textContent.includes('France')"));
  for (const requestId of pausedRequests.splice(0)) await command('Fetch.continueRequest', { requestId });
  await waitFor("!!document.querySelector('canvas')", 'late renderer result');
  assert.ok(await evaluate("location.search === '' && ![...document.querySelectorAll('button')].some(b => b.textContent === 'Cancel travel') && !document.querySelector('.explore-error')"));

  await command('Page.navigate', { url: origin + '/explore/' });
  await waitFor("!![...document.querySelectorAll('button')].find(b => b.textContent === 'Enable 3D prototype' && !b.disabled)", 'deadline explorer startup');
  await click('Enable 3D prototype');
  await retry(() => pausedRequests.length > 0, 'stalled first activation');
  await retry(() => evaluate("!!document.querySelector('.explore-error') && !document.querySelector('canvas')"), 'bounded renderer deadline', 30000);
  assert.ok(await evaluate("!!document.querySelector('.explore-project-list a') && !![...document.querySelectorAll('button')].find(b => b.textContent === 'Retry 3D')"));
  for (const requestId of pausedRequests.splice(0)) await command('Fetch.continueRequest', { requestId });
  await command('Fetch.disable');
  await click('Retry 3D');
  await waitFor("!!document.querySelector('canvas') && !document.querySelector('.explore-error')", 'retry after stalled response');
  console.log('PASS Chrome: stalled-request cancellation, late completion, loading deadline and retry');

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
