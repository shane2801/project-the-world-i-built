import type { FrameStats } from '../scene/sceneTypes';

export function PerformancePanel({ stats }: { stats: FrameStats | null }) {
  return <details className="explore-performance">
    <summary>Performance targets and live counters</summary>
    <p>Provisional Chrome desktop targets at 1920×1080: 55–60 FPS walking, at most 100 draw calls,
      100,000 triangles, 100 geometries and 16 textures. Renderer download target: 350 KiB gzip.
      First usable frame target: 4 seconds on a 10 Mbps connection. These require hardware validation.</p>
    <p>{stats ? `${stats.fps} FPS · ${stats.calls} calls · ${stats.triangles} triangles · ${stats.geometries} geometries · ${stats.textures} textures` :
      'Enable 3D to collect counters. No hardware benchmark has been recorded yet.'}</p>
    <p>Counters pause with the scene. They are diagnostic samples, not a completed benchmark.</p>
  </details>;
}
