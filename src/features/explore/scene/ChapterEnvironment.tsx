import type { Chapter } from '../world/types';

// Symbolic props use presets, not claims about real schools, offices or clients.
// Keep them outside the bounded walking area so decorative meshes need no physics.
export function ChapterEnvironment({ chapter }: { chapter: Chapter }) {
  const positions = [-1, 1].flatMap((side) => [-5, 1, 7].map((z) => ({ x: side * 10.8, z })));
  return <group>
    {positions.map(({ x, z }, index) => <group key={index} position={[x, 0, z]}>
      {chapter.environment === 'island' ? <>
        <mesh position={[0, 1.5, 0]}><cylinderGeometry args={[.15, .22, 3, 6]} /><meshStandardMaterial color="#806347" /></mesh>
        <mesh position={[0, 3.2, 0]}><coneGeometry args={[1.4, 1.4, 5]} /><meshStandardMaterial color={chapter.accent} /></mesh>
      </> : chapter.environment === 'network' ? <>
        <mesh position={[0, .4, 0]}><dodecahedronGeometry args={[1.4, 0]} /><meshStandardMaterial color={chapter.ground} /></mesh>
        <mesh position={[0, 1.8, 0]}><octahedronGeometry args={[.8]} /><meshStandardMaterial color={chapter.accent} /></mesh>
      </> : chapter.environment === 'campus' ? <>
        <mesh position={[0, 1.2, 0]}><boxGeometry args={[2, 2.4, 1.4]} /><meshStandardMaterial color={chapter.accent} /></mesh>
        <mesh position={[0, 2.9, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[1.6, 1.1, 4]} /><meshStandardMaterial color={chapter.ground} /></mesh>
      </> : <>
        <mesh position={[0, 1.4 + index % 2, 0]}>
          {chapter.environment === 'intelligence' ? <cylinderGeometry args={[.65, 1, 2.8 + index % 2 * 2, 6]} /> :
            <boxGeometry args={[1.4, 2.8 + index % 2 * 2, 1.4]} />}
          <meshStandardMaterial color={chapter.accent} metalness={.2} roughness={.6} />
        </mesh>
      </>}
    </group>)}
  </group>;
}
