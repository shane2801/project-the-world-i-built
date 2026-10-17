import type { Portfolio } from '../../../domain/career/types';
import { PlanetIllustration } from '../components/PlanetIllustration';
import '../home.css';

// SiteLayout supplies the main landmark; this page owns only the home content.
export function HomePage({ portfolio }: { portfolio: Portfolio | null }) {
  return (
    <>
      <div className="introduction-copy">
        <p className="eyebrow">Ideas become places</p>
        <h1>Every chapter leaves something behind.</h1>
        <p className="introduction-description">
          {portfolio ? `${portfolio.name} · ${portfolio.headline}` :
            'A world of ideas, projects, and the work that connects them.'}
        </p>
        <div className="home-actions">
          <a className="primary-link" href="/resume/">Read the résumé</a>
          <a href="/projects/">Browse projects →</a>
        </div>
        <div className="chapter-line" aria-hidden="true"><span /> <span /> <span /> <span /> <span /></div>
      </div>
      <PlanetIllustration />
    </>
  );
}
