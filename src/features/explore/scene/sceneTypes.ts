import type { Chapter, World, ExplorationView } from '../world/types';
import type { ObservatoryRoomId } from '../../observatory/rooms';
export interface FrameStats { fps: number; calls: number; triangles: number; geometries: number; textures: number }
export interface SceneProps {
  world: World;
  chapter: Chapter;
  view: ExplorationView;
  onObservatory: () => void;
  onRoom: (id: ObservatoryRoomId) => void;
  paused: boolean;
  reducedMotion: boolean;
  selectedProjectId: string | null;
  onSelect: (id: string) => void;
  onTravel: (id: string) => void;
  onReady: (id: string) => void;
  onFailure: () => void;
  onStats: (stats: FrameStats) => void;
}
