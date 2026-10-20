import type { World } from '../world/types';
import type { ExperienceState } from '../state/experience';
import { isTravelling } from '../state/experience';
import { getPortals } from '../world/navigation';

interface Props {
  world: World; state: ExperienceState; desktop: boolean; enabled: boolean;
  systemReduced: boolean; reduceMotion: boolean; invalidLink: boolean;
  onCancel: () => void; onToggle3D: () => void; onOverview: () => void; onObservatory: () => void;
  onTravel: (id: string) => void; onReduceMotion: (value: boolean) => void; onRetry: () => void;
}
export function ExplorerControls(props: Props) {
  const { state, world } = props;
  const busy = isTravelling(state);
  const active = world.chapters.find((chapter) => chapter.phaseId === state.activeId);
  return <section className="explore-controls" aria-labelledby="world-controls-title">
    <h2 id="world-controls-title">World controls</h2>
    <p>Choose any chapter directly, follow its chronological portals, or visit the Observatory.</p>
    <div className="explore-actions">
      <button type="button" disabled={!props.desktop} onClick={props.onToggle3D}>
        {props.enabled ? 'Turn 3D off' : 'Enable 3D prototype'}
      </button>
      <button type="button" disabled={busy} onClick={props.onOverview}>Planet overview</button>
      <button type="button" disabled={busy} onClick={props.onObservatory}>Open Observatory</button>
      <label><input type="checkbox" checked={props.systemReduced || props.reduceMotion} disabled={props.systemReduced}
        onChange={(event) => props.onReduceMotion(event.target.checked)} /> Reduce motion{props.systemReduced ? ' (system setting)' : ''}</label>
    </div>
    {busy && <button type="button" onClick={props.onCancel}>Cancel travel</button>}
    <p className="muted">3D is desktop-only for now. All career information and the <a href="/observatory/">Observatory</a> remain available on phones and without graphics.</p>
    <ul className="explore-chapters">
      {world.chapters.map((chapter) => <li key={chapter.phaseId}>
        <a href={`/resume/#${encodeURIComponent('phase-' + chapter.phaseId)}`}>{chapter.title}</a>
        <button type="button" disabled={busy} data-phase-id={chapter.phaseId} aria-label={'Enter ' + chapter.title}
          aria-pressed={state.view === 'chapter' && state.activeId === chapter.phaseId}
          onClick={() => props.onTravel(chapter.phaseId)}>Enter chapter</button>
      </li>)}
    </ul>
    {state.view === 'chapter' && <div className="explore-actions" aria-label="Chronological travel">
      {getPortals(world, state.activeId).map((portal) => <button type="button" key={portal.phaseId}
        disabled={busy} onClick={() => props.onTravel(portal.phaseId)}>{portal.label}</button>)}
    </div>}
    {props.enabled && state.view === 'overview' && !busy &&
      <button type="button" onClick={() => props.onTravel(state.activeId)}>Skip introduction — enter current chapter</button>}
    <p id="movement-instructions">Focus a chapter scene to walk with WASD or arrows. Click a landmark to inspect it.
      Approach a project or ring and press E to inspect or travel. Chapter buttons allow direct travel. Tab leaves the scene.
      In the Observatory, click a room marker to focus its information below.</p>
    <p role="status" aria-live="polite" aria-atomic="true">
      {state.status === 'loading' ? 'Loading destination. Your current view remains below.' :
        state.status === 'transitioning' ? 'Travelling through the wormhole…' :
          state.view === 'observatory' ? 'The Observatory. Choose a room or chapter.' :
            state.view === 'overview' ? 'Planet overview. Choose a chapter.' : 'Current chapter: ' + active?.title}
    </p>
    {props.invalidLink && <p role="alert">This link has an unknown chapter, project or view. Use the chapter choices or full project catalogue.</p>}
    {state.error && <div className="explore-error" role="alert">
      <p>{state.error}</p>{props.enabled && <button type="button" onClick={props.onRetry}>Retry 3D</button>}
      <p><a href="/explore/">Reload explorer</a> · <a href="/observatory/">Open Observatory information</a></p>
    </div>}
  </section>;
}
