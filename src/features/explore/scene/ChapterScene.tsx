import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import type { RefObject } from 'react';
import type { Point } from '../world/types';
import type { SceneProps } from './sceneTypes';
import { Character } from './Character';

interface Props extends SceneProps { keys: RefObject<Set<string>>; position: RefObject<Point> }
export function ChapterScene({ chapter, keys, position, ...props }: Props) {
  const portal = useRef<Mesh>(null);
  const destination = props.world.chapters.find((item) => item.phaseId !== chapter.phaseId);
  useFrame((_, delta) => {
    if (portal.current && !props.reducedMotion && !props.paused) portal.current.rotation.z += delta * .2;
  });
  return <>
    <color attach="background" args={['#0b1c27']} />
    <fog attach="fog" args={['#0b1c27', 28, 65]} />
    <ambientLight intensity={1.2} />
    <directionalLight position={[5, 12, 6]} intensity={2} />
    <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[20, 20]} />
      <meshStandardMaterial color={chapter.ground} /></mesh>
    <gridHelper args={[20, 10, chapter.accent, chapter.ground]} position={[0, .015, 0]} />
    {chapter.landmarks.map((landmark) => <group key={landmark.projectId}
      position={[landmark.position.x, 0, landmark.position.z]}>
      <mesh position={[0, landmark.height / 2, 0]} onClick={(event) => {
        event.stopPropagation(); if (!props.paused) props.onSelect(landmark.projectId);
      }}>
        <boxGeometry args={[landmark.size, landmark.height, landmark.size]} />
        <meshStandardMaterial color={landmark.color}
          emissive={landmark.color} emissiveIntensity={props.selectedProjectId === landmark.projectId ? .7 : .08} />
      </mesh>
      <mesh position={[0, .08, 0]}><cylinderGeometry args={[landmark.size, landmark.size, .16, 12]} />
        <meshStandardMaterial color={chapter.accent} /></mesh>
    </group>)}
    <group position={[0, 1.8, -7]}>
      <mesh ref={portal} onClick={(event) => {
        event.stopPropagation(); if (!props.paused && destination) props.onTravel(destination.phaseId);
      }}>
        <torusGeometry args={[1.5, .18, 8, 32]} />
        <meshStandardMaterial color={chapter.accent} emissive={chapter.accent} emissiveIntensity={.8} />
      </mesh>
      <mesh><circleGeometry args={[1.3, 32]} />
        <meshBasicMaterial color={chapter.accent} transparent opacity={.18} /></mesh>
    </group>
    <Character chapter={chapter} keys={keys} position={position}
      paused={props.paused} reducedMotion={props.reducedMotion} />
  </>;
}
