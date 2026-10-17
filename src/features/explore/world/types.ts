import type { EnvironmentKind } from './presets.ts';
export type ExplorationView = 'overview' | 'chapter' | 'observatory';

export interface Point { readonly x: number; readonly z: number }
export interface Landmark {
  readonly projectId: string;
  readonly position: Point;
  readonly size: number;
  readonly height: number;
  readonly color: string;
}
export interface Chapter {
  readonly phaseId: string;
  readonly title: string;
  readonly ground: string;
  readonly accent: string;
  readonly characterColor: string;
  readonly bounds: number;
  readonly environment: EnvironmentKind;
  readonly landmarks: readonly Landmark[];
  readonly projectIds: readonly string[];
}
export interface World { readonly chapters: readonly Chapter[]; readonly currentId: string }
