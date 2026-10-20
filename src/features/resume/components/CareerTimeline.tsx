import type { Portfolio } from '../../../domain/career/types';
import { getOrderedPhases } from '../../../domain/career/queries';
import { ChapterEntry } from './ChapterEntry';

export function CareerTimeline({ portfolio, newestFirst = false }: { portfolio: Portfolio; newestFirst?: boolean }) {
  // Reverse display order only: overlapping periods and world portal order are untouched.
  const phases = getOrderedPhases(portfolio);
  const ordered = newestFirst ? [...phases].reverse() : phases;
  return <ol className="career-timeline">
    {ordered.map((phase) => <ChapterEntry key={phase.id} phase={phase} portfolio={portfolio} />)}
  </ol>;
}
