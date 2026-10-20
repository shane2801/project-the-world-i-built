interface SkillCategory {
  readonly id: string;
  readonly label: string;
  readonly skillIds: readonly string[];
}

// Presentation groups can overlap: Python belongs to Programming and AI & Data, for example.
export const skillCategories: readonly SkillCategory[] = [
  { id: 'programming', label: 'Programming', skillIds: ['java', 'python', 'javascript', 'typescript', 'sql', 'html-css'] },
  { id: 'ai-data', label: 'AI & Data', skillIds: ['python', 'nlp', 'topic-modelling', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'tableau', 'power-bi'] },
  { id: 'frontend', label: 'Frontend', skillIds: ['html-css', 'javascript', 'typescript', 'react', 'nextjs', 'angular', 'wordpress'] },
  { id: 'backend', label: 'Backend', skillIds: ['java', 'python', 'java-ee', 'spring', 'spring-boot', 'node', 'flask', 'django', 'rest'] },
  { id: 'databases', label: 'Databases', skillIds: ['sql', 'oracle', 'mysql', 'postgresql', 'mongodb'] },
  { id: 'cloud-devops', label: 'Cloud & DevOps', skillIds: ['aws', 'docker', 'kubernetes', 'git', 'cicd'] },
  { id: 'security-payments', label: 'Security & Payments', skillIds: ['oidc', 'opf'] },
];
