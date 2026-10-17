import type { Chapter, World } from '../world/types';
export interface FrameStats { fps: number; calls: number; triangles: number; geometries: number; textures: number }
export interface SceneProps {
  world: World;
  chapter: Chapter;
  overview: boolean;
  paused: boolean;
  reducedMotion: boolean;
  selectedProjectId: string | null;
  onSelect: (id: string) => void;
  onTravel: (id: string) => void;
  onReady: (id: string) => void;
  onFailure: () => void;
  onStats: (stats: FrameStats) => void;
}
