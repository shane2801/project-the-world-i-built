import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { SceneProps } from './sceneTypes';

export function SceneLifecycle({ phaseId, onReady, onFailure, onStats }: {
  phaseId: string; onReady: SceneProps['onReady']; onFailure: SceneProps['onFailure']; onStats: SceneProps['onStats'];
}) {
  const gl = useThree((state) => state.gl);
  const reported = useRef(false);
  const sample = useRef({ seconds: 0, frames: 0 });
  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    gl.domElement.addEventListener('webglcontextlost', lost);
    return () => gl.domElement.removeEventListener('webglcontextlost', lost);
  }, [gl, onFailure]);
  useFrame((_, delta) => {
    if (!reported.current) {
      reported.current = true;
      queueMicrotask(() => onReady(phaseId));
    }
    sample.current.seconds += delta; sample.current.frames++;
    if (sample.current.seconds >= 1) {
      onStats({
        fps: Math.round(sample.current.frames / sample.current.seconds),
        calls: gl.info.render.calls, triangles: gl.info.render.triangles,
        geometries: gl.info.memory.geometries, textures: gl.info.memory.textures,
      });
      sample.current = { seconds: 0, frames: 0 };
    }
  });
  return null;
}
