import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import type { Point } from '../world/types';
import { movementKeys } from '../world/movement';
import { getPortals, portalAt } from '../world/navigation';
import { ChapterScene } from './ChapterScene';
import { PlanetOverview } from './PlanetOverview';
import { ObservatoryScene } from './ObservatoryScene';
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
    controls.current?.focus();
  }, [props.chapter.phaseId, props.view]);
  useEffect(() => { if (props.paused) keys.current.clear(); }, [props.paused]);
  return <div className="explore-canvas" ref={controls} tabIndex={0} role="region"
    aria-label="3D world controls" aria-describedby="movement-instructions"
    onPointerDown={() => controls.current?.focus()} onBlur={() => keys.current.clear()}
    onKeyDown={(event) => {
      if (props.paused || props.view !== 'chapter') return;
      const key = event.key.toLowerCase();
      if (movementKeys.has(key)) { event.preventDefault(); keys.current.add(key); }
      if (key === 'e' && !event.repeat) {
        const portal = portalAt(position.current, getPortals(props.world, props.chapter.phaseId));
        if (portal) props.onTravel(portal.phaseId);
      }
    }}
    onKeyUp={(event) => keys.current.delete(event.key.toLowerCase())}>
    {/* Canvas fallback children mount even with WebGL: keep them side-effect free. */}
    <Canvas camera={{ position: [0, 10, 17], fov: 48, near: .1, far: 100 }}
      dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'default' }} frameloop={props.paused ? 'demand' : 'always'}
      fallback={<p>WebGL is unavailable. Use the information controls below.</p>}>
      {props.view === 'overview' ? <PlanetOverview world={props.world} onTravel={props.onTravel} onObservatory={props.onObservatory} /> :
        props.view === 'observatory' ? <ObservatoryScene world={props.world} onTravel={props.onTravel} onRoom={props.onRoom} /> :
          <ChapterScene key={props.chapter.phaseId} {...props} keys={keys} position={position} />}
      <SceneLifecycle key={props.view + '-' + props.chapter.phaseId} phaseId={props.chapter.phaseId}
        onReady={props.onReady} onFailure={props.onFailure} onStats={props.onStats} />
    </Canvas>
  </div>;
}
