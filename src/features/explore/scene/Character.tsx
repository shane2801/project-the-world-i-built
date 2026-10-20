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
  const stride = useRef(0);
  useFrame(({ camera }, delta) => {
    const previous = position.current;
    if (!paused) position.current = stepPosition(previous, keys.current, delta, chapter);
    const { x, z } = position.current;
    const walking = x !== previous.x || z !== previous.z;
    if (walking) stride.current += Math.min(delta, .05) * 12;
    if (character.current) {
      character.current.position.set(x, walking && !reducedMotion ? Math.sin(stride.current) * .045 : 0, z);
      if (walking) character.current.rotation.y = Math.atan2(x - previous.x, z - previous.z);
    }
    const blend = reducedMotion ? 1 : 1 - Math.exp(-6 * delta);
    camera.position.x += (x - camera.position.x) * blend;
    camera.position.y += (9 - camera.position.y) * blend;
    camera.position.z += (z + 12 - camera.position.z) * blend;
    camera.lookAt(x, .3, z - 1);
  });
  // A deliberately stylized explorer, not an approved likeness or character rig.
  return <group ref={character} position={[0, 0, 4]}>
    <mesh position={[0, .85, 0]}><capsuleGeometry args={[.28, .5, 4, 8]} /><meshStandardMaterial color={chapter.characterColor} /></mesh>
    <mesh position={[0, 1.45, 0]}><sphereGeometry args={[.27, 12, 8]} /><meshStandardMaterial color="#d0ae8f" /></mesh>
    <mesh position={[0, 1.6, -.04]} scale={[1, .6, 1]}><sphereGeometry args={[.29, 12, 8]} /><meshStandardMaterial color="#293b3c" /></mesh>
    {[-1, 1].map((side) => <group key={side}>
      <mesh position={[side * .15, .26, 0]}><capsuleGeometry args={[.11, .3, 3, 6]} /><meshStandardMaterial color="#273a4a" /></mesh>
      <mesh position={[side * .36, .82, 0]} rotation={[0, 0, side * .12]}><capsuleGeometry args={[.1, .35, 3, 6]} /><meshStandardMaterial color={chapter.characterColor} /></mesh>
    </group>)}
    <mesh position={[0, .9, -.27]}><boxGeometry args={[.38, .48, .2]} /><meshStandardMaterial color="#a68c60" /></mesh>
  </group>;
}
