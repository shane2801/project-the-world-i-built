import type { Portfolio } from '../../../domain/career/types';
import { PlanetIllustration } from '../components/PlanetIllustration';
import { CareerAtlas } from '../components/CareerAtlas';
import { SelectedWork } from '../components/SelectedWork';
import '../home.css';

// Page composition stays independent of the optional renderer.
export function HomePage({ portfolio }: { portfolio: Portfolio | null }) {
  return <>
    <section className="home-hero" aria-labelledby="home-title">
      <div className="introduction-copy">
        <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> A career, mapped as a world</p>
        <h1 id="home-title">Every chapter leaves something behind.</h1>
        <p className="introduction-description">
          {portfolio ? <><strong>{portfolio.name}</strong><br />{portfolio.headline}</> :
            'A world of ideas, projects, and the work that connects them.'}
        </p>
        <div className="home-actions">
          <a className="primary-link" href="/explore/">Explore my world <span aria-hidden="true">↗</span></a>
          <a className="quiet-link" href="/resume/">Read the résumé <span aria-hidden="true">→</span></a>
        </div>
        <p className="home-footnote">Take the scenic route. Or go straight to the work.</p>
      </div>
      <div className="home-world">
        <PlanetIllustration />
        <p className="world-caption"><span aria-hidden="true">01 / ∞</span> A world still being built</p>
      </div>
    </section>
    {portfolio && <CareerAtlas portfolio={portfolio} />}
    {portfolio && <SelectedWork portfolio={portfolio} />}
  </>;
}
