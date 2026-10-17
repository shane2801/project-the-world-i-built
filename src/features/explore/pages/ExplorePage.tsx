import { useMemo } from 'react';
import type { Portfolio } from '../../../domain/career/types';
import { buildWorld } from '../world/buildWorld';
import { PrototypeExplorer } from '../components/PrototypeExplorer';
import '../explore.css';

export function ExplorePage({ portfolio }: { portfolio: Portfolio | null }) {
  const world = useMemo(() => portfolio ? buildWorld(portfolio) : null, [portfolio]);
  return <>
    <header className="page-heading">
      <p className="eyebrow">An internal world in progress</p>
      <h1>Explore the world</h1>
      <p>Five connected chapters and an Observatory. The geometry is a stand-in for future artwork, not a finished likeness or environment.</p>
      <p><a href="/resume/">Read résumé</a> · <a href="/projects/">All projects</a></p>
    </header>
    {portfolio && world ? <PrototypeExplorer portfolio={portfolio} world={world} /> :
      <p>Career content is needed before a world can be generated. The information pages remain available.</p>}
  </>;
}
