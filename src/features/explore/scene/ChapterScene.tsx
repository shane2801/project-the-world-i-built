import type { RefObject } from 'react';
import type { Point } from '../world/types';
import type { SceneProps } from './sceneTypes';
import { getPortals } from '../world/navigation';
import { Character } from './Character';
import { ChapterEnvironment } from './ChapterEnvironment';
import { Portal } from './Portal';

interface Props extends SceneProps { keys: RefObject<Set<string>>; position: RefObject<Point> }
export function ChapterScene({ chapter, keys, position, ...props }: Props) {
  return <>
    <color attach="background" args={['#0b1c27']} /><fog attach="fog" args={['#0b1c27', 28, 65]} />
    <ambientLight intensity={1.2} /><directionalLight position={[5, 12, 6]} intensity={2} />
    <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[20, 20]} />
      <meshStandardMaterial color={chapter.ground} /></mesh>
    <gridHelper args={[20, 10, chapter.accent, chapter.ground]} position={[0, .015, 0]} />
    <ChapterEnvironment chapter={chapter} />
    {chapter.landmarks.map((landmark) => <group key={landmark.projectId}
      position={[landmark.position.x, 0, landmark.position.z]}>
      <mesh position={[0, landmark.height / 2, 0]} onClick={(event) => {
        event.stopPropagation(); if (!props.paused) props.onSelect(landmark.projectId);
      }}>
        <boxGeometry args={[landmark.size, landmark.height, landmark.size]} />
        <meshStandardMaterial color={landmark.color} emissive={landmark.color}
          emissiveIntensity={props.selectedProjectId === landmark.projectId ? .7 : .08} />
      </mesh>
      <mesh position={[0, .08, 0]}><cylinderGeometry args={[landmark.size, landmark.size, .16, 12]} />
        <meshStandardMaterial color={chapter.accent} /></mesh>
    </group>)}
    {getPortals(props.world, chapter.phaseId).map((portal) => <Portal key={portal.phaseId} portal={portal}
      color={chapter.accent} paused={props.paused} reducedMotion={props.reducedMotion} onTravel={props.onTravel} />)}
    <Character chapter={chapter} keys={keys} position={position} paused={props.paused} reducedMotion={props.reducedMotion} />
  </>;
}
