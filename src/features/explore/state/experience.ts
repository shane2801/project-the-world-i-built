import type { World } from '../world/types.ts';

export interface ExperienceState {
  readonly activeId: string;
  readonly phaseIds: readonly string[];
  readonly view: 'overview' | 'chapter';
  readonly status: 'idle' | 'loading' | 'transitioning' | 'failed';
  readonly pendingId: string | null;
  readonly projectId: string | null;
  readonly request: number;
  readonly ready: boolean;
  readonly error: string | null;
}
export type Action =
  | { type: 'request'; phaseId: string; request: number }
  | { type: 'prepared'; request: number }
  | { type: 'rendered'; phaseId: string }
  | { type: 'arrived'; request: number }
  | { type: 'failed'; message: string; request: number }
  | { type: 'select'; projectId: string | null }
  | { type: 'overview' }
  | { type: 'restore'; phaseId: string; projectId: string | null; view: 'overview' | 'chapter' };

export function initialExperience(world: World): ExperienceState {
  return {
    activeId: world.currentId, phaseIds: world.chapters.map((chapter) => chapter.phaseId),
    view: 'overview', status: 'idle', pendingId: null, projectId: null,
    request: 0, ready: false, error: null,
  };
}
export function isTravelling(state: ExperienceState): boolean {
  return state.status === 'loading' || state.status === 'transitioning';
}
export function experienceReducer(state: ExperienceState, action: Action): ExperienceState {
  switch (action.type) {
    case 'request':
      if (isTravelling(state) || !state.phaseIds.includes(action.phaseId) || action.request <= state.request) return state;
      return { ...state, status: 'loading', pendingId: action.phaseId, projectId: null, request: action.request, ready: false, error: null };
    case 'prepared':
      return state.status === 'loading' && action.request === state.request ? { ...state, status: 'transitioning' } : state;
    case 'rendered':
      return state.status === 'transitioning' && state.pendingId === action.phaseId ? { ...state, ready: true } : state;
    case 'arrived':
      if (state.status !== 'transitioning' || !state.ready || !state.pendingId || action.request !== state.request) return state;
      return { ...state, activeId: state.pendingId, pendingId: null, status: 'idle', view: 'chapter', error: null };
    case 'failed':
      return action.request === state.request ? { ...state, status: 'failed', ready: false, error: action.message } : state;
    case 'select':
      return isTravelling(state) ? state : { ...state, projectId: action.projectId, view: action.projectId ? 'chapter' : state.view };
    case 'overview':
      return { ...state, status: 'idle', request: state.request + 1, view: 'overview', projectId: null, pendingId: null, ready: false, error: null };
    case 'restore':
      return state.phaseIds.includes(action.phaseId) ? {
        ...state, request: state.request + 1, activeId: action.phaseId, projectId: action.projectId, view: action.view,
        status: 'idle', pendingId: null, ready: false, error: null,
      } : state;
  }
}
