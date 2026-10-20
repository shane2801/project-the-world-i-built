import { MotionOptions, type MotionSettings } from './MotionOptions';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import '../resume-background.css';

interface ResumeBackgroundProps {
  motion: MotionSettings;
  onMotionChange: (next: MotionSettings) => void;
}

export function ResumeBackground({ motion, onMotionChange }: ResumeBackgroundProps) {
  const [intensity, setIntensity] = useState(28);
  const backgroundRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    function paint() {
      if (!background) return;
      x += (targetX - x) * .16;
      y += (targetY - y) * .16;
      background.style.setProperty('--spot-x', x + 'px');
      background.style.setProperty('--spot-y', y + 'px');
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .5) frame = requestAnimationFrame(paint);
      else frame = 0;
    }
    function move(event: PointerEvent) {
      if (!background || event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;
      background.dataset.active = 'true';
      if (reducedMotion.matches) {
        x = targetX; y = targetY;
        background.style.setProperty('--spot-x', x + 'px');
        background.style.setProperty('--spot-y', y + 'px');
      } else if (!frame) frame = requestAnimationFrame(paint);
    }
    function hide() { if (background) background.dataset.active = 'false'; }
    function leave(event: PointerEvent) { if (!event.relatedTarget) hide(); }
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerout', leave);
    window.addEventListener('blur', hide);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerout', leave);
      window.removeEventListener('blur', hide);
      cancelAnimationFrame(frame);
    };
  }, []);
  const style = {
    '--pattern-base': intensity / 100 * .055,
    '--pattern-reveal': intensity / 100 * .28,
  } as CSSProperties;
  return <>
    <div className="cv-pattern-backdrop" ref={backgroundRef} style={style} aria-hidden="true">
      <div className="cv-pattern-base"><div className="cv-pattern-fill" /></div>
      <div className="cv-pattern-spot"><div className="cv-pattern-fill" /></div>
    </div>
    <div className="cv-pattern-settings">
      <button className="cv-pattern-settings-launcher" type="button" popoverTarget="resume-background-settings"
        aria-label="Page settings">
        <svg viewBox="0 0 24 24" width={23} height={23} fill="none" stroke="currentColor"
          strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m9 3-1 3-3 1-2 3 2 2-1 3 2 3 3-1 2 3h3l1-3 3-1 2-3-2-2 1-3-2-3-3 1-2-3Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
      <div className="cv-pattern-settings-panel" id="resume-background-settings" popover="auto"
        role="dialog" aria-labelledby="resume-background-settings-title">
        <h2 id="resume-background-settings-title">Options</h2>
        <p>Set the pattern intensity.</p>
        <div className="cv-pattern-control">
          <label htmlFor="resume-pattern-intensity">Intensity</label>
          <input id="resume-pattern-intensity" type="range" min={0} max={100} value={intensity}
            onChange={(event) => setIntensity(Number(event.target.value))} />
          <output htmlFor="resume-pattern-intensity">{intensity}%</output>
        </div>
        <MotionOptions value={motion} onChange={onMotionChange} />
        <ul className="cv-pattern-notes">
          <li><strong>Why Arsenal?</strong> Best club in the world.</li>
          <li><strong>Emirates?</strong> Something to do with a certain flight attendant.</li>
          <li><strong>Red Bull?</strong> I love it. It gives me wings.</li>
        </ul>
      </div>
    </div>
  </>;
}
