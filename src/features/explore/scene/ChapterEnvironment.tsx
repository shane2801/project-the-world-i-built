import type { Chapter } from '../world/types';

// Authored symbolic scenery stays outside the walking bounds, avoiding hidden collisions.
export function ChapterEnvironment({ chapter }: { chapter: Chapter }) {
  const positions = [-1, 1].flatMap((side) => [-5, 1, 7].map((z) => ({ x: side * 10.8, z })));
  return <group>
    {positions.map(({ x, z }, index) => <group key={index} position={[x, 0, z]} rotation={[0, x < 0 ? .3 : -.3, 0]}>
      {chapter.environment === 'island' ? <>
        <mesh position={[0, 1.3, 0]} rotation={[0, 0, .12]}><cylinderGeometry args={[.13, .23, 2.6, 6]} /><meshStandardMaterial color="#96784d" /></mesh>
        <mesh position={[0, 3, 0]} scale={[1.6, .5, 1.3]}><icosahedronGeometry args={[1.2, 0]} /><meshStandardMaterial color="#78a87a" flatShading /></mesh>
        <mesh position={[.6, .3, .5]}><dodecahedronGeometry args={[.65, 0]} /><meshStandardMaterial color="#8b9b81" flatShading /></mesh>
      </> : chapter.environment === 'campus' ? <>
        <mesh position={[0, 1.3, 0]}><boxGeometry args={[2.6, 2.6, 2]} /><meshStandardMaterial color="#b87c7b" /></mesh>
        <mesh position={[0, 3, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[2, 1, 4]} /><meshStandardMaterial color="#39354b" flatShading /></mesh>
        {[-.65, .65].map((offset) => <mesh key={offset} position={[offset, 1.6, 1.015]}><boxGeometry args={[.45, .9, .04]} /><meshStandardMaterial color="#f1dba6" emissive="#dfbb75" emissiveIntensity={.25} /></mesh>)}
      </> : chapter.environment === 'network' ? <>
        <mesh position={[0, .25, 0]}><cylinderGeometry args={[1.4, 1.6, .5, 6]} /><meshStandardMaterial color="#39455d" /></mesh>
        <mesh position={[0, 1.2, 0]}><cylinderGeometry args={[.15, .25, 2, 6]} /><meshStandardMaterial color="#a3a4bc" /></mesh>
        <mesh position={[0, 2.5, 0]}><octahedronGeometry args={[1, 0]} /><meshStandardMaterial color={chapter.accent} emissive={chapter.accent} emissiveIntensity={.25} wireframe /></mesh>
      </> : <>
        <mesh position={[0, 1.7 + index % 2 * .6, 0]}>
          {chapter.environment === 'intelligence' ? <cylinderGeometry args={[.65, 1.2, 3.4 + index % 2 * 1.2, 6]} /> :
            <boxGeometry args={[1.8, 3.4 + index % 2 * 1.2, 1.8]} />}
          <meshStandardMaterial color={chapter.environment === 'intelligence' ? '#387b7f' : '#506981'} metalness={.25} roughness={.5} />
        </mesh>
        <mesh position={[0, 2.6 + index % 2, 1]}><boxGeometry args={[1.25, .16, .08]} />
          <meshStandardMaterial color={chapter.accent} emissive={chapter.accent} emissiveIntensity={.5} /></mesh>
        <mesh position={[0, .15, 0]}><cylinderGeometry args={[1.5, 1.7, .3, 6]} /><meshStandardMaterial color="#8e9a93" /></mesh>
      </>}
    </group>)}
    {[-1, 1].map((side) => <mesh key={side} position={[side * 5, 1.5, -11]}>
      <coneGeometry args={[2, 3, 5]} /><meshStandardMaterial color={chapter.ground} flatShading /></mesh>)}
  </group>;
}
