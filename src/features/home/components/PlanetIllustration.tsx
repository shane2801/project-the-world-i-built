// This decorative illustration is separate from the future interactive 3D scene.
export function PlanetIllustration() {
  return (
    <div className="planet-study" aria-hidden="true">
      <div className="orbit orbit-outer" />
      <div className="orbit orbit-inner" />
      <div className="planet" />
      <span className="satellite" />
    </div>
  );
}
