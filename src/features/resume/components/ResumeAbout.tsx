import { useId, useState } from 'react';

// Show the original paragraphs on first load; minimising keeps the opening sentence readable.
export function ResumeAbout({ biography }: { biography: string }) {
  const [expanded, setExpanded] = useState(true);
  const contentId = useId();
  const paragraphs = biography.split(/\n\s*\n/).filter(Boolean);
  const first = paragraphs[0] ?? '';
  const opening = /^([\s\S]*?[.!?])(?:\s+|$)([\s\S]*)$/.exec(first);
  const summary = opening?.[1] ?? first;
  const canMinimise = paragraphs.length > 1 || first !== summary;
  return <div className="cv-profile-description">
    {canMinimise && <button className="cv-description-toggle" type="button"
      aria-expanded={expanded} aria-controls={contentId} onClick={() => setExpanded(!expanded)}>
      {expanded ? 'Minimise' : 'Read more'}
      <svg viewBox="0 0 12 12" width={11} height={11} fill="none" stroke="currentColor"
        strokeWidth={1.2} aria-hidden="true"><path d={expanded ? 'm3 8 3-3 3 3' : 'm3 4 3 3 3-3'} /></svg>
    </button>}
    <div id={contentId} className="cv-description-copy">
      <p className="cv-description">{expanded ? first : summary}</p>
      <div className="cv-description-additional" hidden={!expanded}>
        {paragraphs.slice(1).map((paragraph, index) => <p className="cv-description" key={index}>{paragraph}</p>)}
      </div>
    </div>
  </div>;
}
