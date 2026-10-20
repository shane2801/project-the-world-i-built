import { useEffect } from 'react';

// Reveal enclosing native disclosures for existing /resume/#phase-* and contact links.
export function useResumeFragment() {
  useEffect(() => {
    let frame = 0;
    const reveal = () => {
      window.cancelAnimationFrame(frame);
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      for (let element: HTMLElement | null = target; element; element = element.parentElement) {
        if (element instanceof HTMLDetailsElement) element.open = true;
      }
      frame = window.requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    };
    reveal();
    window.addEventListener('hashchange', reveal);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('hashchange', reveal); };
  }, []);
}
