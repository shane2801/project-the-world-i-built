import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import type { Landmark } from '../world/types';

export function ProjectLandmark({ landmark, accent, selected, paused, onSelect }: {
  landmark: Landmark; accent: string; selected: boolean; paused: boolean; onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const canvas = useThree((state) => state.gl.domElement);
  useEffect(() => {
    if (!hovered || paused) return;
    canvas.style.cursor = 'pointer';
    return () => { canvas.style.cursor = ''; };
  }, [canvas, hovered, paused]);
  return <group position={[landmark.position.x, 0, landmark.position.z]}
    onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }}
    onPointerOut={() => setHovered(false)}
    onClick={(event) => { event.stopPropagation(); if (!paused) onSelect(landmark.projectId); }}>
    <mesh position={[0, .12, 0]}><boxGeometry args={[landmark.size + .5, .24, landmark.size + .5]} />
      <meshStandardMaterial color={accent} roughness={.7} /></mesh>
    <mesh position={[0, landmark.height / 2 + .24, 0]}><boxGeometry args={[landmark.size, landmark.height, landmark.size]} />
      <meshStandardMaterial color="#354f57" roughness={.6} metalness={.15} /></mesh>
    <mesh position={[0, landmark.height * .65, landmark.size / 2 + .02]}>
      <planeGeometry args={[landmark.size * .72, landmark.height * .38]} />
      <meshStandardMaterial color={landmark.color} emissive={landmark.color} emissiveIntensity={hovered || selected ? .9 : .35} /></mesh>
    <mesh position={[0, landmark.height + .65, 0]}><octahedronGeometry args={[.3, 0]} />
      <meshStandardMaterial color={landmark.color} emissive={landmark.color} emissiveIntensity={.5} /></mesh>
  </group>;
}
