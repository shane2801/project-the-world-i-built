import type { ReactNode } from 'react';
import './SiteLayout.css';

interface SiteLayoutProps {
  children: ReactNode;
  mainClassName?: string;
}

// Own the single main landmark and its skip-link target across feature pages.
export function SiteLayout({ children, mainClassName }: SiteLayoutProps) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="masthead">
        <span className="wordmark">The World I Built<span aria-hidden="true">.</span></span>
        <span className="masthead-note">A living portfolio</span>
      </header>
      <main className={mainClassName} id="main" tabIndex={-1}>
        {children}
      </main>
    </>
  );
}
