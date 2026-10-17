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
    {portfolio ? <ObservatoryHub portfolio={portfolio} /> : <p>Career content has not been supplied yet.</p>}
  </>;
}
