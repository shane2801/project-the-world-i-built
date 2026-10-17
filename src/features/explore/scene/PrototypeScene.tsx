import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import type { Point } from '../world/types';
import { movementKeys, nearPortal } from '../world/movement';
import { ChapterScene } from './ChapterScene';
import { PlanetOverview } from './PlanetOverview';
import { SceneLifecycle } from './SceneLifecycle';
import type { SceneProps } from './sceneTypes';

export default function PrototypeScene(props: SceneProps) {
  const controls = useRef<HTMLDivElement>(null);
  const keys = useRef(new Set<string>());
  const position = useRef<Point>({ x: 0, z: 4 });
  useEffect(() => {
    const clear = () => keys.current.clear();
    window.addEventListener('blur', clear);
    document.addEventListener('visibilitychange', clear);
    return () => { window.removeEventListener('blur', clear); document.removeEventListener('visibilitychange', clear); };
  }, []);
  useEffect(() => {
    keys.current.clear(); position.current = { x: 0, z: 4 };
    // Bring the activated scene into view and make walking available immediately.
    controls.current?.focus();
  }, [props.chapter.phaseId, props.overview]);
  useEffect(() => { if (props.paused) keys.current.clear(); }, [props.paused]);
  return <div className="explore-canvas" ref={controls} tabIndex={0} role="region"
    aria-label="3D prototype controls" aria-describedby="movement-instructions"
    onPointerDown={() => controls.current?.focus()}
    onBlur={() => keys.current.clear()}
    onKeyDown={(event) => {
      if (props.paused || props.overview) return;
      const key = event.key.toLowerCase();
      if (movementKeys.has(key)) { event.preventDefault(); keys.current.add(key); }
      if (key === 'e' && !event.repeat && nearPortal(position.current)) {
        const destination = props.world.chapters.find((item) => item.phaseId !== props.chapter.phaseId);
        if (destination) props.onTravel(destination.phaseId);
      }
    }}
    onKeyUp={(event) => keys.current.delete(event.key.toLowerCase())}>
    {/* Canvas fallback children mount even with WebGL: keep them side-effect free. */}
    <Canvas camera={{ position: [0, 10, 17], fov: 48, near: .1, far: 100 }}
      dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'default' }}
      frameloop={props.paused ? 'demand' : 'always'}
      fallback={<p>WebGL is unavailable. Use the information controls below.</p>}>
      {props.overview ? <PlanetOverview world={props.world} onTravel={props.onTravel} /> :
        <ChapterScene key={props.chapter.phaseId} {...props} keys={keys} position={position} />}
      <SceneLifecycle key={(props.overview ? 'overview-' : '') + props.chapter.phaseId}
        phaseId={props.chapter.phaseId} onReady={props.onReady} onFailure={props.onFailure} onStats={props.onStats} />
    </Canvas>
  </div>;
}
