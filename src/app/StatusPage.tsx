export function StatusPage({ kind }: { kind: 'explore' | 'not-found' }) {
  const exploring = kind === 'explore';
  return <>
    <header className="page-heading">
      <p className="eyebrow">{exploring ? 'A world in progress' : 'Find your way back'}</p>
      <h1>{exploring ? 'Exploration is taking shape' : 'Page not found'}</h1>
      <p>{exploring ?
        'The interactive world is planned for a later phase. The résumé and projects remain available independently.' :
        'This page or project is unavailable. It may not have been added yet.'}</p>
    </header>
    <p><a href="/resume/">View résumé</a> · <a href="/projects/">Browse projects</a> · <a href="/">Return home</a></p>
  </>;
}
