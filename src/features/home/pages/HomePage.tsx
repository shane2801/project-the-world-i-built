import { PlanetIllustration } from '../components/PlanetIllustration';
import '../home.css';

// SiteLayout supplies the main landmark; this page owns only the home content.
export function HomePage() {
  return (
    <>
      <div className="introduction-copy">
        <p className="eyebrow">Ideas become places</p>
        <h1>Every chapter leaves something behind.</h1>
        <p className="introduction-description">
          A world of ideas, projects, and the work that connects them.
        </p>
        <div className="chapter-line" aria-hidden="true"><span /> <span /> <span /> <span /> <span /></div>
      </div>
      <PlanetIllustration />
    </>
  );
}
