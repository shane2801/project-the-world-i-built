import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import type { Portal as PortalDescriptor } from '../world/navigation';

export function Portal({ portal, color, paused, reducedMotion, onTravel }: {
  portal: PortalDescriptor; color: string; paused: boolean; reducedMotion: boolean; onTravel: (id: string) => void;
}) {
  const ring = useRef<Mesh>(null);
  useFrame((_, delta) => { if (ring.current && !paused && !reducedMotion) ring.current.rotation.z += delta * .2; });
  return <group position={[portal.position.x, 1.8, portal.position.z]} onClick={(event) => {
    event.stopPropagation(); if (!paused) onTravel(portal.phaseId);
  }}>
    <mesh ref={ring}><torusGeometry args={[1.4, .16, 8, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={.8} /></mesh>
    <mesh><circleGeometry args={[1.25, 24]} /><meshBasicMaterial color={color} transparent opacity={.18} /></mesh>
  </group>;
}
