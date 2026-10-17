import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import type { World } from '../world/types';
import { observatoryRooms } from '../../observatory/rooms';
import type { ObservatoryRoomId } from '../../observatory/rooms';

const roomColors = ['#dfbb75', '#69dfd0', '#b0aff0', '#91cfa3'];
export function ObservatoryScene({ world, onTravel, onRoom }: {
  world: World; onTravel: (id: string) => void; onRoom: (id: ObservatoryRoomId) => void;
}) {
  const camera = useThree((state) => state.camera);
  useEffect(() => { camera.position.set(0, 10, 18); camera.lookAt(0, 0, 0); }, [camera]);
  return <>
    <color attach="background" args={['#0b1c27']} />
    <ambientLight intensity={1.3} /><directionalLight position={[5, 12, 8]} intensity={2} />
    <mesh position={[0, -.6, 0]}><cylinderGeometry args={[5.4, 6.2, 1.2, 32]} /><meshStandardMaterial color="#24354c" /></mesh>
    <mesh><sphereGeometry args={[2.4, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color="#dfbb75" metalness={.25} roughness={.5} /></mesh>
    {observatoryRooms.map((room, index) => {
      const angle = index * Math.PI / 2 + Math.PI / 4;
      return <mesh key={room.id} position={[Math.cos(angle) * 4.1, .7, Math.sin(angle) * 4.1]}
        onClick={(event) => { event.stopPropagation(); onRoom(room.id); }}>
        <octahedronGeometry args={[.75]} /><meshStandardMaterial color={roomColors[index]} />
      </mesh>;
    })}
    {world.chapters.map((chapter, index) => {
      const angle = index / world.chapters.length * Math.PI * 2;
      return <mesh key={chapter.phaseId} position={[Math.cos(angle) * 7.2, 0, Math.sin(angle) * 7.2]}
        onClick={(event) => { event.stopPropagation(); onTravel(chapter.phaseId); }}>
        <cylinderGeometry args={[.35, .7, 1.8, 6]} /><meshStandardMaterial color={chapter.accent} />
      </mesh>;
    })}
  </>;
}
