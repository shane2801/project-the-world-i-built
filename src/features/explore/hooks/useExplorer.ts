import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import type { World } from '../world/types';
import { experienceReducer, initialExperience, isTravelling } from '../state/experience';
import { readSelection, selectionUrl, observatoryUrl } from '../state/selection';
import { loadRenderer } from '../scene/loadRenderer';

function writeUrl(url: string) {
  if (window.location.pathname + window.location.search !== url) window.history.pushState(null, '', url);
}
function writeSelection(phaseId: string | null, projectId: string | null = null) { writeUrl(selectionUrl(phaseId, projectId)); }

export function useExplorer(world: World, reducedMotion: boolean) {
  const [state, dispatch] = useReducer(experienceReducer, world, initialExperience);
  const [invalidLink, setInvalidLink] = useState(false);
  const sequence = useRef(0);
  useEffect(() => {
    const restore = () => {
      const selection = readSelection(window.location.search, world);
      setInvalidLink(selection.invalid);
      dispatch({ type: 'restore', ...selection });
    };
    restore();
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, [world]);

  useEffect(() => {
    if (state.status !== 'transitioning' || !state.ready || !state.pendingId) return;
    const destination = state.pendingId;
    const timer = window.setTimeout(() => {
      dispatch({ type: 'arrived', request: state.request });
      writeSelection(destination);
    }, reducedMotion ? 0 : 450);
    return () => window.clearTimeout(timer);
  }, [state.status, state.ready, state.pendingId, state.request, reducedMotion]);

  const travel = useCallback(async (phaseId: string) => {
    if (isTravelling(state) || !world.chapters.some((chapter) => chapter.phaseId === phaseId)) return;
    const request = Math.max(sequence.current, state.request) + 1;
    sequence.current = request;
    setInvalidLink(false);
    dispatch({ type: 'request', phaseId, request });
    try {
      await loadRenderer();
      dispatch({ type: 'prepared', request });
    } catch {
      dispatch({ type: 'failed', request, message: 'The destination could not load. Your current chapter remains available below.' });
    }
  }, [state, world]);
  const rendered = useCallback((phaseId: string) => dispatch({ type: 'rendered', phaseId }), []);
  const fail = useCallback(() => dispatch({
    type: 'failed', request: state.request,
    message: '3D is unavailable. Your current chapter and project links remain available below.',
  }), [state.request]);
  const select = (projectId: string | null) => {
    const chapter = world.chapters.find((item) => item.phaseId === state.activeId);
    if (isTravelling(state) || (projectId && !chapter?.projectIds.includes(projectId))) return;
    dispatch({ type: 'select', projectId });
    writeSelection(state.activeId, projectId);
  };
  const showChapter = (phaseId: string) => {
    if (isTravelling(state) || !world.chapters.some((chapter) => chapter.phaseId === phaseId)) return;
    dispatch({ type: 'restore', phaseId, projectId: null, view: 'chapter' });
    writeSelection(phaseId);
  };
  const overview = () => { dispatch({ type: 'overview' }); writeSelection(null); };
  const observatory = () => { dispatch({ type: 'observatory' }); writeUrl(observatoryUrl()); };
  const recover = () => dispatch({ type: 'restore', phaseId: state.activeId, projectId: state.projectId, view: state.view });
  return { state, travel, rendered, fail, select, overview, observatory, recover, showChapter, invalidLink };
}
