import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import type { Point } from '../world/types';
import { movementKeys } from '../world/movement';
import { interactionAt } from '../world/interaction';
import type { Interaction } from '../world/interaction';
import { ChapterScene } from './ChapterScene';
import { PlanetOverview } from './PlanetOverview';
import { ObservatoryScene } from './ObservatoryScene';
import { SceneLifecycle } from './SceneLifecycle';
import { InteractionProbe } from './InteractionProbe';
import type { SceneProps } from './sceneTypes';

export default function PrototypeScene(props: SceneProps) {
  const controls = useRef<HTMLDivElement>(null);
  const keys = useRef(new Set<string>());
  const position = useRef<Point>({ x: 0, z: 4 });
  const [interaction, setInteraction] = useState<Interaction | null>(null);
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
    aria-label="3D world controls" aria-describedby="movement-instructions world-interaction"
    onPointerDown={() => controls.current?.focus()} onBlur={() => keys.current.clear()}
    onKeyDown={(event) => {
      if (props.paused || props.view !== 'chapter') return;
      const key = event.key.toLowerCase();
      if (movementKeys.has(key)) { event.preventDefault(); keys.current.add(key); }
      if (key === 'e' && !event.repeat) {
        const target = interactionAt(position.current, props.chapter, props.world);
        if (target) {
          event.preventDefault();
          if (target.kind === 'portal') props.onTravel(target.id); else props.onSelect(target.id);
        }
      }
    }}
    onKeyUp={(event) => keys.current.delete(event.key.toLowerCase())}>
    {/* The DOM overlay keeps instructions readable without a WebGL text/font dependency. */}
    <div className="world-hud" aria-hidden="true"><span>{props.view === 'chapter' ? props.chapter.title :
      props.view === 'observatory' ? 'The Observatory' : 'The career atlas'}</span><span>WASD · E · Tab</span></div>
    {/* Canvas fallback children mount even with WebGL: keep them side-effect free. */}
    <Canvas camera={{ position: [0, 10, 17], fov: 48, near: .1, far: 100 }}
      dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'default' }} frameloop={props.paused ? 'demand' : 'always'}
      fallback={<p>WebGL is unavailable. Use the information controls below.</p>}>
      {props.view === 'overview' ? <PlanetOverview world={props.world} onTravel={props.onTravel} onObservatory={props.onObservatory} /> :
        props.view === 'observatory' ? <ObservatoryScene world={props.world} onTravel={props.onTravel} onRoom={props.onRoom} /> :
          <><ChapterScene key={props.chapter.phaseId} {...props} keys={keys} position={position} />
            <InteractionProbe key={'probe-' + props.chapter.phaseId} position={position}
              chapter={props.chapter} world={props.world} onChange={setInteraction} /></>}
      <SceneLifecycle key={props.view + '-' + props.chapter.phaseId} phaseId={props.chapter.phaseId}
        onReady={props.onReady} onFailure={props.onFailure} onStats={props.onStats} />
    </Canvas>
    <p className="world-interaction" id="world-interaction" aria-live="polite" aria-atomic="true">
      {props.paused ? 'Exploration paused' : props.view !== 'chapter' ? 'Choose a destination or use the chapter controls.' :
        interaction ? <><kbd>E</kbd> {interaction.kind === 'project' ? 'Inspect' : 'Travel to'} {interaction.label}</> :
          'Follow the paths. Approach a project or portal to interact.'}
    </p>
  </div>;
}
