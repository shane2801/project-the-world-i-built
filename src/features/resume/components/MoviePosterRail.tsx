import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import catalog from '../../../content/movie-posters.json';
import '../movie-poster-rail.css';

// Seeded shuffling keeps the initial server/client render identical.
function shuffledPosters(seed: number) {
  const posters = [...catalog.movies];
  let state = seed >>> 0;
  for (let index = posters.length - 1; index > 0; index--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const other = state % (index + 1);
    [posters[index], posters[other]] = [posters[other], posters[index]];
  }
  return posters;
}

export function MoviePosterRail({ shuffleToken, opacity }: { shuffleToken: number; opacity: number }) {
  const [sessionSeed, setSessionSeed] = useState(1);
  const [tileCount, setTileCount] = useState(100);
  const railRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    // Collapsing resume sections changes the document height; keep enough fixed-size rows.
    const observer = new ResizeObserver(() => {
      setTileCount(Math.max(2, Math.ceil(rail.clientHeight / 120) * 2));
    });
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setSessionSeed(crypto.getRandomValues(new Uint32Array(1))[0]));
    return () => cancelAnimationFrame(frame);
  }, []);
  const posters = useMemo(() => shuffledPosters(sessionSeed + shuffleToken), [sessionSeed, shuffleToken]);

  return <div className="cv-movie-rail" ref={railRef} aria-hidden="true"
    style={{ '--poster-opacity': opacity / 100 } as CSSProperties}>
    <div className="cv-movie-tiles">
      {Array.from({ length: tileCount }, (_, index) => {
        const movie = posters[index % posters.length];
        return <img key={index} src={movie.poster} alt=""
          width={80} height={120} loading="lazy" decoding="async" />;
      })}
    </div>
  </div>;
}
