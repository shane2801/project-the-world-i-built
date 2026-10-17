import { useRef } from 'react';
import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { Chapter, Point } from '../world/types';
import { stepPosition } from '../world/movement';

interface Props {
  chapter: Chapter; keys: RefObject<Set<string>>; position: RefObject<Point>;
  paused: boolean; reducedMotion: boolean;
}
export function Character({ chapter, keys, position, paused, reducedMotion }: Props) {
  const character = useRef<Group>(null);
  useFrame(({ camera }, delta) => {
    if (!paused) position.current = stepPosition(position.current, keys.current, delta, chapter);
    const { x, z } = position.current;
    if (character.current) character.current.position.set(x, 0, z);
    const blend = reducedMotion ? 1 : 1 - Math.exp(-6 * delta);
    camera.position.x += (x - camera.position.x) * blend;
    camera.position.y += (10 - camera.position.y) * blend;
    camera.position.z += (z + 13 - camera.position.z) * blend;
    camera.lookAt(x, 0, z);
  });
  return <group ref={character} position={[0, 0, 4]}>
    <mesh position={[0, .7, 0]}><capsuleGeometry args={[.3, .65, 4, 8]} />
      <meshStandardMaterial color={chapter.characterColor} /></mesh>
    <mesh position={[0, 1.5, 0]}><sphereGeometry args={[.3, 12, 8]} />
      <meshStandardMaterial color="#e7cbb1" /></mesh>
  </group>;
}
