import { DecorativeImage } from '../../../components/ui/DecorativeImage';

// CSS geometry remains behind the generated image if artwork cannot be loaded.
export function PlanetIllustration() {
  return (
    <div className="planet-study" aria-hidden="true">
      <div className="orbit orbit-outer" />
      <div className="orbit orbit-inner" />
      <div className="planet" />
      <span className="satellite" />
      <DecorativeImage className="planet-artwork" src="/assets/artwork/planet-620.jpg"
        srcSet="/assets/artwork/planet-620.jpg 620w, /assets/artwork/planet-1160.jpg 1160w"
        sizes="(max-width: 700px) 360px, (max-width: 1200px) 45vw, 580px"
        width={1160} height={1160} decoding="async" />
    </div>
  );
}
