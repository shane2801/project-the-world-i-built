import { useEffect, useState } from 'react';
import { bannerQuotes } from '../content/bannerQuotes';
import '../quote-banner.css';

export function QuoteBanner({ paused, speed }: { paused: boolean; speed: number }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (paused || bannerQuotes.length < 2) return;
    const timer = window.setInterval(() => setIndex((previous) => (previous + 1) % bannerQuotes.length), 30000);
    return () => window.clearInterval(timer);
  }, [paused]);
  const quote = bannerQuotes[index];
  if (!quote) return null;
  return <aside className={'cv-quote-banner' + (paused ? ' is-paused' : '')} aria-label="Quotes">
    <span className="cv-quote-mascot cv-quote-mascot--sid" aria-hidden="true" />
    <span className="cv-quote-mascot cv-quote-mascot--diego" aria-hidden="true" />
    <span className="cv-quote-mark" aria-hidden="true">“</span>
    <div className="cv-quote-window">
      <div className="cv-quote-track" key={index} style={{ animationDuration: 90 / speed + 's' }}>
        {[false, true].map((clone) => <span className="cv-quote-copy" key={String(clone)} aria-hidden={clone || undefined}>
          <span>{quote.text}</span>{quote.author && <span className="cv-quote-author">— {quote.author}</span>}
        </span>)}
      </div>
    </div>
  </aside>;
}
