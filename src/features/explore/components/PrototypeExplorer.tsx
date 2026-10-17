import { useState } from 'react';
import type { Portfolio } from '../../../domain/career/types';
import { getProjectById } from '../../../domain/career/queries';
import type { World } from '../world/types';
import type { FrameStats } from '../scene/sceneTypes';
import { isTravelling } from '../state/experience';
import { useExplorer } from '../hooks/useExplorer';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { usePageVisible } from '../hooks/usePageVisible';
import { ObservatoryHub } from '../../observatory/components/ObservatoryHub';
import type { ObservatoryRoomId } from '../../observatory/rooms';
import { ExplorerViewport } from './ExplorerViewport';
import { ExplorerControls } from './ExplorerControls';
import { PerformancePanel } from './PerformancePanel';
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
    if (enabled && desktop) void explorer.travel(id); else explorer.showChapter(id);
  };
  const retry = () => {
    setRevision((value) => value + 1);
    if (state.pendingId) void explorer.travel(state.pendingId); else explorer.recover();
  };
  const focusRoom = (id: ObservatoryRoomId) => document.getElementById('observatory-' + id)?.focus();
  return <>
    <ExplorerControls world={world} state={state} desktop={desktop} enabled={enabled}
      systemReduced={systemReduced} reduceMotion={reduceMotion} invalidLink={explorer.invalidLink}
      onToggle3D={() => { if (enabled) { explorer.overview(); setEnabled(false); } else setEnabled(true); }}
      onCancel={explorer.recover} onOverview={explorer.overview} onObservatory={explorer.observatory} onTravel={travel}
      onReduceMotion={setReduceMotion} onRetry={retry} />
    {enabled && desktop && state.status !== 'failed' && <div className="explore-stage">
      <ExplorerViewport revision={revision} world={world}
        chapter={state.status === 'transitioning' ? candidate : active}
        view={state.status === 'transitioning' ? 'chapter' : state.view}
        paused={!!selected || busy || !visible} reducedMotion={systemReduced || reduceMotion}
        selectedProjectId={state.projectId} onSelect={explorer.select} onTravel={travel}
        onObservatory={explorer.observatory} onRoom={focusRoom}
        onReady={explorer.rendered} onFailure={explorer.fail} onStats={setStats} />
      {state.status === 'transitioning' && <div className={'wormhole-overlay' + (systemReduced || reduceMotion ? ' reduced' : '')} aria-hidden="true" />}
    </div>}
    {selected && <ProjectPanel project={selected} onClose={() => explorer.select(null)} />}
    {state.view === 'observatory' ? <ObservatoryHub portfolio={portfolio} /> :
      <ChapterContent portfolio={portfolio} phaseId={state.activeId} onSelect={explorer.select} interactive={!busy} />}
    <PerformancePanel stats={stats} />
  </>;
}
