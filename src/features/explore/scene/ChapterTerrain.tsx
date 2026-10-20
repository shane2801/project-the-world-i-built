import type { Chapter } from '../world/types';

export function ChapterTerrain({ chapter }: { chapter: Chapter }) {
  return <group>
    {/* A solid top covers every reachable corner; the cliff is visual, not collision geometry. */}
    <mesh position={[0, -.65, 0]}><cylinderGeometry args={[14, 12.5, 1.3, 12]} />
      <meshStandardMaterial color={chapter.ground} roughness={1} flatShading /></mesh>
    <mesh position={[0, -3.3, 0]}><cylinderGeometry args={[12.5, 4, 4, 12]} />
      <meshStandardMaterial color="#233b3c" roughness={1} flatShading /></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, .012, 0]}>
      <planeGeometry args={[3.2, 18]} /><meshStandardMaterial color="#b8b49a" roughness={1} /></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, .018, -1]}>
      <planeGeometry args={[17, 2.2]} /><meshStandardMaterial color="#b8b49a" roughness={1} /></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, .025, 4]}>
      <ringGeometry args={[1.8, 2, 32]} /><meshBasicMaterial color={chapter.accent} /></mesh>
    {chapter.environment === 'island' && <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.35, 0]}>
      <ringGeometry args={[14, 19, 48]} /><meshStandardMaterial color="#277d86" roughness={.45} /></mesh>}
  </group>;
}
