import { useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import '../mandala-rail.css';

const eyes = [
  { color: 'brown', next: 'green' },
  { color: 'green', next: 'blue' },
  { color: 'blue', next: 'brown' },
] as const;

interface MandalaRailProps {
  opacity: number;
  eyeVisible: boolean;
  eyeOpacity: number;
}

export function MandalaRail({ opacity, eyeVisible, eyeOpacity }: MandalaRailProps) {
  const [eyeIndex, setEyeIndex] = useState(0);
  const eye = eyes[eyeIndex];

  function followPointer(event: PointerEvent<HTMLElement>) {
    const target = event.target;
    const overEye = target instanceof Element && target.closest('.cv-mandala-eye');
    event.currentTarget.dataset.tileActive = overEye ? 'false' : 'true';
    if (overEye) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    // Keep the previous 64px reveal size and snap movement to the small pixel grid.
    event.currentTarget.style.setProperty('--tile-x', Math.floor((event.clientX - bounds.left - 32) / 8) * 8 + 'px');
    event.currentTarget.style.setProperty('--tile-y', Math.floor((event.clientY - bounds.top - 32) / 8) * 8 + 'px');
  }

  return <aside className="cv-mandala-rail" aria-label="Interactive mandala artwork"
    style={{ '--mandala-opacity': opacity / 100, '--eye-opacity': eyeOpacity / 100, '--eye-paper': eyeOpacity > 0 ? '#fff' : 'transparent' } as CSSProperties}
    onPointerMove={followPointer}
    onPointerLeave={(event) => { event.currentTarget.dataset.tileActive = 'false'; }}>
    <div className="cv-mandala-pattern" aria-hidden="true" />
    <div className="cv-mandala-reveal" aria-hidden="true" />
    {eyeVisible && <button className="cv-mandala-eye" type="button"
      aria-label={eye.color + ' tattoo eye. Switch to ' + eye.next + ' eye.'}
      title="Click the eye to change its colour"
      onPointerEnter={(event) => {
        if (event.currentTarget.parentElement) event.currentTarget.parentElement.dataset.tileActive = 'false';
      }}
      onClick={() => setEyeIndex((index) => (index + 1) % eyes.length)}>
      <img src={'/images/mandala/eye-' + eye.color + '.png'} alt=""
        width={724} height={2172} />
    </button>}
  </aside>;
}
