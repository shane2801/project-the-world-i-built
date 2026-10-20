import type { RefObject } from 'react';
import type { Point } from '../world/types';
import type { SceneProps } from './sceneTypes';
import { getPortals } from '../world/navigation';
import { Character } from './Character';
import { ChapterEnvironment } from './ChapterEnvironment';
import { ChapterTerrain } from './ChapterTerrain';
import { ProjectLandmark } from './ProjectLandmark';
import { Portal } from './Portal';

interface Props extends SceneProps { keys: RefObject<Set<string>>; position: RefObject<Point> }
export function ChapterScene({ chapter, keys, position, ...props }: Props) {
  return <>
    <color attach="background" args={['#0b1c27']} /><fog attach="fog" args={['#0b1c27', 32, 65]} />
    <hemisphereLight args={['#e6ead0', '#203948', 2]} />
    <directionalLight position={[-8, 14, 6]} intensity={2.5} color="#ffe6b4" />
    <ChapterTerrain chapter={chapter} />
    <ChapterEnvironment chapter={chapter} />
    {chapter.landmarks.map((landmark) => <ProjectLandmark key={landmark.projectId}
      landmark={landmark} accent={chapter.accent} paused={props.paused}
      selected={props.selectedProjectId === landmark.projectId} onSelect={props.onSelect} />)}
    {getPortals(props.world, chapter.phaseId).map((portal) => <Portal key={portal.phaseId} portal={portal}
      color={chapter.accent} paused={props.paused} reducedMotion={props.reducedMotion} onTravel={props.onTravel} />)}
    <Character chapter={chapter} keys={keys} position={position} paused={props.paused} reducedMotion={props.reducedMotion} />
  </>;
}
