import type { ReactNode } from 'react';
import './SiteLayout.css';

interface SiteLayoutProps {
  children: ReactNode;
  mainClassName?: string;
  activePage?: 'home' | 'resume' | 'projects' | 'explore' | 'observatory' | 'project' | 'not-found';
  draft?: boolean;
  hasContent?: boolean;
}

const navigation = [
  { href: '/', label: 'Résumé', page: 'resume' },
  { href: '/projects/', label: 'Projects', page: 'projects' },
  { href: '/observatory/', label: 'Observatory', page: 'observatory' },
  { href: '/explore/', label: 'Explore', page: 'explore' },
] as const;

// Ordinary links preserve navigation, reloads and browser history without JS.
export function SiteLayout({ children, mainClassName, activePage }: SiteLayoutProps) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="masthead">
        <a className="wordmark" href="/" aria-current={activePage === 'home' ? 'page' : undefined}>
          The World I Built<span aria-hidden="true">.</span>
        </a>
        <nav aria-label="Primary"><ul className="site-navigation">
          {navigation.map((item) => (
            <li key={item.page}><a href={item.href} aria-current={
              activePage === item.page || (item.page === 'projects' && activePage === 'project') ? 'page' : undefined
            }>{item.label}</a></li>
          ))}
          <li><a href="/resume/#contact">Contact</a></li>
        </ul></nav>
      </header>
      <main className={mainClassName} id="main" tabIndex={-1}>{children}</main>
      <footer className="site-footer">
        <p>Read the story at your own pace.</p>
        <a href="/resume/">View résumé</a>
      </footer>
    </>
  );
}
