import { lazy, Suspense, useMemo } from 'react';
import { loadRenderer } from '../scene/loadRenderer';
import type { SceneProps } from '../scene/sceneTypes';
import { SceneBoundary } from './SceneBoundary';

export function ExplorerViewport({ revision, ...props }: SceneProps & { revision: number }) {
  const Renderer = useMemo(() => lazy(loadRenderer), [revision]);
  return <SceneBoundary key={revision} onFailure={props.onFailure}>
    <Suspense fallback={<p role="status">Loading 3D… The chapter information is available below.</p>}>
      <Renderer {...props} />
    </Suspense>
  </SceneBoundary>;
}
