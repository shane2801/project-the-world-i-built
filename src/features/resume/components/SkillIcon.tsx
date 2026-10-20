const logos: Readonly<Record<string, string>> = {
  java: 'java', 'java-ee': 'java', python: 'python', javascript: 'javascript', typescript: 'typescript',
  spring: 'spring', 'spring-boot': 'spring', node: 'nodejs', flask: 'flask', django: 'django',
  react: 'react', nextjs: 'nextjs', wordpress: 'wordpress', angular: 'angular', oracle: 'oracle',
  mysql: 'mysql', postgresql: 'postgresql', mongodb: 'mongodb', aws: 'amazonwebservices',
  docker: 'docker', kubernetes: 'kubernetes', git: 'git', tensorflow: 'tensorflow',
  pytorch: 'pytorch', 'scikit-learn': 'scikitlearn', pandas: 'pandas',
};

// Concepts use descriptive symbols rather than invented product logos.
const symbols: Readonly<Record<string, { path: string; color: string }>> = {
  sql: { path: 'M20 6c0 2-16 2-16 0s16-2 16 0ZM4 6v12c0 4 16 4 16 0V6M4 12c0 4 16 4 16 0', color: '#547b96' },
  rest: { path: 'M8 5 2 12l6 7M16 5l6 7-6 7M14 4l-4 16', color: '#5e8172' },
  oidc: { path: 'M6 10h12v11H6ZM8 10V7a4 4 0 0 1 8 0v3M12 14v3', color: '#8a6b9c' },
  cicd: { path: 'M4 8a8 8 0 0 1 14-2l3 3M21 4v5h-5M20 16A8 8 0 0 1 6 18l-3-3M3 20v-5h5', color: '#608c7e' },
  opf: { path: 'M3 5h18v14H3ZM3 9h18M7 15h3M15 14l2 2 3-3', color: '#8c7854' },
  nlp: { path: 'M3 4h18v13H9l-5 4v-4H3ZM7 8h10M7 12h7', color: '#7775a0' },
  'topic-modelling': { path: 'M8 4h8v6H8ZM2 16h7v6H2ZM15 16h7v6h-7ZM12 10v3M5 16v-3h14v3', color: '#7083a0' },
  tableau: { path: 'M12 3v6M9 6h6M5 10v8M1 14h8M19 10v8M15 14h8M12 17v6M9 20h6M12 10v4M10 12h4', color: '#4a7998' },
  'power-bi': { path: 'M4 14h4v7H4ZM10 8h4v13h-4ZM16 3h4v18h-4Z', color: '#ad8b27' },
};
function Logo({ name }: { name: string }) {
  return <img src={'/images/skills/' + name + '.svg'} alt="" width={18} height={18} loading="lazy" decoding="async" />;
}
export function SkillIcon({ skillId }: { skillId: string }) {
  const logo = logos[skillId];
  if (logo) return <span className="cv-skill-icon" aria-hidden="true"><Logo name={logo} /></span>;
  if (skillId === 'html-css') return <span className="cv-skill-icon cv-skill-icon--pair" aria-hidden="true">
    <Logo name="html5" /><Logo name="css3" />
  </span>;
  const symbol = symbols[skillId] ?? symbols.rest;
  return <svg className="cv-skill-icon" viewBox="0 0 24 24" width={18} height={18}
    fill="none" stroke={symbol.color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={symbol.path} />
  </svg>;
}
