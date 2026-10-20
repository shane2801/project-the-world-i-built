import { useEffect, useState } from 'react';

const sections = [
  { id: 'overview', label: 'Overview', icon: 'M4 10 12 3l8 7v10h-6v-6h-4v6H4Z' },
  { id: 'career', label: 'Experience', icon: 'M4 7h16v13H4ZM8 7V4h8v3M4 12c5 3 11 3 16 0M10 13h4' },
  { id: 'resume-projects', label: 'Projects', icon: 'M3 5h7l2 3h9v12H3ZM8 12l-3 3 3 3M16 12l3 3-3 3' },
  { id: 'skills', label: 'Skills', icon: 'm9 5-6 7 6 7M15 5l6 7-6 7M14 3l-4 18' },
  { id: 'education', label: 'Education', icon: 'm2 8 10-5 10 5-10 5ZM6 10v7c4 3 8 3 12 0v-7M22 8v8' },
] as const;

export function ResumeNavigation() {
  const [active, setActive] = useState<string>('overview');
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-5% 0px -70% 0px', threshold: 0 });
    for (const { id } of sections) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);
  return <nav className="cv-bottom-dock" aria-label="Résumé sections">
    <ul>{sections.map(({ id, label, icon }) => <li key={id}>
      <a href={'#' + id} aria-current={active === id ? 'location' : undefined}
        onClick={() => {
          const section = document.getElementById(id);
          if (section instanceof HTMLDetailsElement) section.open = true;
          setActive(id);
        }}>
        <svg viewBox="0 0 24 24" width={21} height={21} fill="none" stroke="currentColor"
          strokeWidth={1.55} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={icon} />
        </svg>
        <span>{label}</span>
      </a>
    </li>)}</ul>
  </nav>;
}
