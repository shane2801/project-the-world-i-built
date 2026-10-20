import type { CSSProperties } from 'react';
import type { Portfolio } from '../../../domain/career/types';
import { getOrderedPhases } from '../../../domain/career/queries';
import { getPreset } from '../../explore/world/presets';

// The atlas uses the same authored order and palette as the interactive chapters.
export function CareerAtlas({ portfolio }: { portfolio: Portfolio }) {
  return <section className="career-atlas" aria-labelledby="atlas-title">
    <div className="home-section-heading">
      <div><p className="eyebrow">The coordinates of a career</p><h2 id="atlas-title">Different places. One unfolding story.</h2></div>
      <a className="quiet-link" href="/observatory/">View the whole story <span aria-hidden="true">↗</span></a>
    </div>
    <ol className="atlas-chapters">
      {getOrderedPhases(portfolio).map((phase, index) => <li key={phase.id}
        style={{ '--chapter-accent': getPreset(phase.themeId).accent } as CSSProperties}>
        <a href={'/explore/?phase=' + encodeURIComponent(phase.id)}>
          <span className="atlas-number">{String(index + 1).padStart(2, '0')} <span aria-hidden="true">↗</span></span>
          <span className="atlas-landscape" data-environment={getPreset(phase.themeId).environment} aria-hidden="true"><i /><i /><i /></span>
          <strong>{phase.title.split(' — ')[0]}</strong>
          <span className="atlas-period">{phase.period}</span>
          {phase.id === portfolio.currentPhaseId && <span className="atlas-current">Current chapter</span>}
        </a>
      </li>)}
    </ol>
  </section>;
}
