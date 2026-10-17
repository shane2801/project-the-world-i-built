import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import type { World } from '../world/types';

export function PlanetOverview({ world, onTravel, onObservatory }: {
  world: World; onTravel: (id: string) => void; onObservatory: () => void;
}) {
  const camera = useThree((state) => state.camera);
  useEffect(() => { camera.position.set(0, 9, 17); camera.lookAt(0, 0, 0); }, [camera]);
  return <>
    <color attach="background" args={['#0b1c27']} /><ambientLight intensity={1.4} />
    <directionalLight position={[-5, 10, 8]} intensity={2} />
    <mesh><sphereGeometry args={[4, 32, 24]} /><meshStandardMaterial color="#27474b" /></mesh>
    <mesh rotation={[Math.PI / 2.4, .3, 0]}><torusGeometry args={[6, .025, 6, 80]} />
      <meshBasicMaterial color="#dfbb75" /></mesh>
    {world.chapters.map((chapter, index) => {
      const angle = (world.chapters.length === 1 ? 0 : index / (world.chapters.length - 1) - .5) * Math.PI * .9;
      const x = Math.sin(angle) * 3.5;
      const y = 1.2 + Math.cos(angle) * 2;
      const z = Math.sqrt(Math.max(0, 16 - x * x - y * y)) + .5;
      return <mesh key={chapter.phaseId} position={[x, y, z]}
        onClick={(event) => { event.stopPropagation(); onTravel(chapter.phaseId); }}>
        <dodecahedronGeometry args={[.65, 0]} /><meshStandardMaterial color={chapter.accent} />
      </mesh>;
    })}
    <mesh position={[0, 5.8, 0]} onClick={(event) => { event.stopPropagation(); onObservatory(); }}>
      <octahedronGeometry args={[.7]} /><meshStandardMaterial color="#f1eee4" emissive="#dfbb75" emissiveIntensity={.3} />
    </mesh>
  </>;
}
