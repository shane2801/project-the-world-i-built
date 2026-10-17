import { useState } from 'react';
import type { Portfolio } from '../../../domain/career/types';
import { getProjectById } from '../../../domain/career/queries';
import type { World } from '../world/types';
import type { FrameStats } from '../scene/sceneTypes';
import { isTravelling } from '../state/experience';
import { useExplorer } from '../hooks/useExplorer';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { usePageVisible } from '../hooks/usePageVisible';
import { ExplorerViewport } from './ExplorerViewport';
import { ChapterContent } from './ChapterContent';
import { ProjectPanel } from './ProjectPanel';

export function PrototypeExplorer({ portfolio, world }: { portfolio: Portfolio; world: World }) {
  const desktop = useMediaQuery('(min-width: 701px)');
  const systemReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const visible = usePageVisible();
  const [enabled, setEnabled] = useState(false);
  const [revision, setRevision] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [stats, setStats] = useState<FrameStats | null>(null);
  const explorer = useExplorer(world, systemReduced || reduceMotion);
  const { state } = explorer;
  const busy = isTravelling(state);
  const active = world.chapters.find((chapter) => chapter.phaseId === state.activeId) ?? world.chapters[0];
  const candidate = world.chapters.find((chapter) => chapter.phaseId === state.pendingId) ?? active;
  const selected = state.projectId ? getProjectById(portfolio, state.projectId) : undefined;
  const travel = (id: string) => {
    if (enabled && desktop) void explorer.travel(id);
    else explorer.showChapter(id);
  };
  const retry = () => { setRevision((value) => value + 1); void explorer.travel(state.pendingId ?? state.activeId); };
  return <>
    <section aria-labelledby="prototype-controls-title">
      <h2 id="prototype-controls-title">Prototype controls</h2>
      <p>Two chapters are connected here. The full five-chapter world and Observatory come later.</p>
      <div className="explore-actions">
        <button type="button" disabled={!desktop} onClick={() => {
          if (enabled) { explorer.overview(); setEnabled(false); } else setEnabled(true);
        }}>{enabled ? 'Turn 3D off' : 'Enable 3D prototype'}</button>
        <button type="button" disabled={busy} onClick={explorer.overview}>Planet overview</button>
        <label><input type="checkbox" checked={systemReduced || reduceMotion} disabled={systemReduced}
          onChange={(event) => setReduceMotion(event.target.checked)} /> Reduce motion{systemReduced ? ' (system setting)' : ''}</label>
      </div>
      <p className="muted">3D is desktop-only in this prototype. All career information remains available on phones and without graphics.</p>
      <ul className="explore-chapters">
        {world.chapters.map((chapter) => <li key={chapter.phaseId}>
          <a href={`/resume/#${encodeURIComponent('phase-' + chapter.phaseId)}`}>{chapter.title}</a>
          <button type="button" disabled={busy} aria-pressed={state.view === 'chapter' && state.activeId === chapter.phaseId}
            onClick={() => travel(chapter.phaseId)}>Enter chapter</button>
        </li>)}
      </ul>
      {enabled && state.view === 'overview' && !busy && <button type="button" onClick={() => {
        void explorer.travel(state.activeId);
      }}>Skip introduction — enter current chapter</button>}
      <p id="movement-instructions">
        Focus the scene to walk with WASD or arrow keys. Click a landmark to inspect it.
        Walk to the ring and press E to travel, or use the chapter buttons. Tab leaves the scene.
      </p>
      <p role="status" aria-live="polite" aria-atomic="true">
        {state.status === 'loading' ? 'Loading destination. Your current chapter remains below.' :
          state.status === 'transitioning' ? 'Travelling through the wormhole…' :
            state.view === 'overview' ? 'Planet overview. Choose a chapter.' : 'Current chapter: ' + active.title}
      </p>
      {explorer.invalidLink && <p role="alert">This link refers to content outside the two-chapter prototype. Use the full résumé or project catalogue.</p>}
      {state.error && <div className="explore-error" role="alert">
        <p>{state.error}</p>
        {enabled && <button type="button" onClick={retry}>Retry 3D</button>}
        <p><a href="/explore/">Reload explorer</a> · <a href="/projects/">Open all projects</a></p>
      </div>}
    </section>
    {enabled && desktop && state.status !== 'failed' && <div className="explore-stage">
      <ExplorerViewport revision={revision} world={world}
        chapter={state.status === 'transitioning' ? candidate : active}
        overview={state.view === 'overview' && state.status !== 'transitioning'}
        paused={!!selected || busy || !visible} reducedMotion={systemReduced || reduceMotion}
        selectedProjectId={state.projectId} onSelect={explorer.select} onTravel={travel}
        onReady={explorer.rendered} onFailure={explorer.fail} onStats={setStats} />
      {state.status === 'transitioning' && <div className={'wormhole-overlay' + (systemReduced || reduceMotion ? ' reduced' : '')} aria-hidden="true" />}
    </div>}
    {selected && <ProjectPanel project={selected} onClose={() => explorer.select(null)} />}
    <ChapterContent portfolio={portfolio} phaseId={state.activeId} onSelect={explorer.select} interactive={!busy} />
    <details className="explore-performance">
      <summary>Prototype performance targets and live counters</summary>
      <p>Provisional Chrome desktop targets at 1920×1080: 55–60 FPS walking, at most 100 draw calls,
        100,000 triangles, 100 geometries and 16 textures. Renderer download target: 350 KiB gzip.
        First usable frame target: 4 seconds on a 10 Mbps connection. These require hardware validation.</p>
      <p>{stats ? `${stats.fps} FPS · ${stats.calls} calls · ${stats.triangles} triangles · ${stats.geometries} geometries · ${stats.textures} textures` :
        'Enable 3D to collect counters. No browser benchmark has been recorded yet.'}</p>
      <p>Counters pause with the scene. They are diagnostic samples, not a completed benchmark.</p>
    </details>
  </>;
}
