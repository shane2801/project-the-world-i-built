import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import type { World } from '../world/types';

export function PlanetOverview({ world, onTravel }: { world: World; onTravel: (id: string) => void }) {
  const camera = useThree((state) => state.camera);
  useEffect(() => { camera.position.set(0, 9, 17); camera.lookAt(0, 0, 0); }, [camera]);
  return <>
    <color attach="background" args={['#0b1c27']} />
    <ambientLight intensity={1.4} />
    <directionalLight position={[-5, 10, 8]} intensity={2} />
    <mesh><sphereGeometry args={[4, 32, 24]} /><meshStandardMaterial color="#27474b" /></mesh>
    <mesh rotation={[Math.PI / 2.4, .3, 0]}><torusGeometry args={[6, .025, 6, 80]} />
      <meshBasicMaterial color="#dfbb75" /></mesh>
    {world.chapters.map((chapter, index) => <mesh key={chapter.phaseId}
      position={[index === 0 ? -2.3 : 2.3, 2.5, 2]} rotation={[.2, 0, index === 0 ? .3 : -.3]}
      onClick={(event) => { event.stopPropagation(); onTravel(chapter.phaseId); }}>
      <dodecahedronGeometry args={[1.3, 0]} /><meshStandardMaterial color={chapter.accent} />
    </mesh>)}
  </>;
}
