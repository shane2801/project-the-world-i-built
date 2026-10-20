import { useEffect, useId, useRef, useState } from 'react';
import { greetingPrefixes, formatGreeting } from '../content/greetings';

interface TypewriterNameProps {
  name: string;
  paused: boolean;
  resetToken: number;
}

export function TypewriterName({ name, paused, resetToken }: TypewriterNameProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const phaseRef = useRef(0);
  const previousReset = useRef(resetToken);
  const [hintDismissed, setHintDismissed] = useState(false);
  const hintId = useId();
  const initial = formatGreeting(greetingPrefixes[0], name);
  const longest = greetingPrefixes.map((greeting) => formatGreeting(greeting, name))
    .reduce((result, greeting) => greeting.length > result.length ? greeting : result, '');

  useEffect(() => {
    const node = textRef.current;
    if (!node) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer = 0;
    if (previousReset.current !== resetToken) {
      phaseRef.current = 0;
      previousReset.current = resetToken;
    }
    const phrases = greetingPrefixes.map((greeting) =>
      Array.from(new Intl.Segmenter(greeting.language, { granularity: 'grapheme' })
        .segment(formatGreeting(greeting, name)), (part) => part.segment));
    function render(letters?: number) {
      if (!node) return;
      const greeting = greetingPrefixes[phaseRef.current];
      node.lang = greeting.language;
      node.dir = greeting.direction ?? 'ltr';
      node.textContent = phrases[phaseRef.current].slice(0, letters).join('');
      if (labelRef.current) labelRef.current.textContent = greeting.label;
    }
    function start() {
      window.clearTimeout(timer);
      // Pause completes the current greeting instead of resetting it or leaving half a word.
      if (paused || reducedMotion.matches) { render(); return; }
      let letters = 0;
      let deleting = false;
      function tick() {
        render(letters);
        const characters = phrases[phaseRef.current];
        let delay = deleting ? 32 : 70;
        if (!deleting && letters === characters.length) {
          deleting = true; delay = 2400;
        } else if (deleting && letters === 0) {
          deleting = false;
          phaseRef.current = (phaseRef.current + 1) % greetingPrefixes.length;
          delay = 350;
        } else letters += deleting ? -1 : 1;
        timer = window.setTimeout(tick, delay);
      }
      tick();
    }
    start();
    reducedMotion.addEventListener('change', start);
    return () => {
      window.clearTimeout(timer);
      reducedMotion.removeEventListener('change', start);
    };
  }, [name, paused, resetToken]);

  return <div className={'cv-greeting' + (hintDismissed ? ' is-hint-dismissed' : '')}
    tabIndex={0} aria-label="Greeting language" aria-describedby={hintId}
    onMouseLeave={() => setHintDismissed(false)} onFocus={() => setHintDismissed(false)}
    onKeyDown={(event) => { if (event.key === 'Escape') setHintDismissed(true); }}>
    <h1 className="cv-typewriter-name" data-static={paused || undefined}>
      <span className="cv-greeting-accessible">{name}</span>
      <span className="cv-greeting-reserve" aria-hidden="true">{longest}</span>
      <span className="cv-greeting-visible" dir="ltr" ref={textRef} aria-hidden="true" lang="en">{initial}</span>
    </h1>
    <span className="cv-greeting-language-hint" id={hintId} ref={labelRef} role="tooltip">{greetingPrefixes[0].label}</span>
  </div>;
}
