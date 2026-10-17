import { DecorativeImage } from '../../../components/ui/DecorativeImage';
import type { Portfolio } from '../../../domain/career/types';
import { ObservatoryHub } from '../components/ObservatoryHub';

export function ObservatoryPage({ portfolio }: { portfolio: Portfolio | null }) {
  return <>
    <header className="page-heading">
      <p className="eyebrow">The world at a glance</p>
      <h1>The Observatory</h1>
      <p>Career history, projects and skills in one place, independent of 3D.</p>
      <a href="/explore/?view=observatory">Enter the Observatory in the world →</a>
    </header>
    {/* Decorative scene, never a replacement for the four readable rooms. */}
    <DecorativeImage className="observatory-artwork" src="/assets/artwork/observatory-720.jpg"
      srcSet="/assets/artwork/observatory-720.jpg 720w, /assets/artwork/observatory-1440.jpg 1440w"
      sizes="(max-width: 700px) 90vw, 1120px" width={1440} height={480}
      decoding="async" loading="lazy" />
    {portfolio ? <ObservatoryHub portfolio={portfolio} /> : <p>Career content has not been supplied yet.</p>}
  </>;
}
