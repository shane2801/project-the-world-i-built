import type { Portfolio } from '../types.ts';

// Synthetic test data only. Never import fixtures into application/build entries.
export function createPortfolioFixture(overrides: Partial<Portfolio> = {}): Portfolio {
  const ids = ['mauritius', 'birmingham', 'freelance', 'abu-dhabi', 'france'];
  return {
    reviewStatus: 'draft',
    name: 'Synthetic test owner',
    headline: 'Illustrative role, not verified biography',
    introduction: 'Fictional test content; not approved for publication.',
    currentPhaseId: 'france',
    contacts: [{ label: 'Example contact', href: 'mailto:example@example.invalid' }],
    phases: ids.map((id, index) => ({
      id, title: `Illustrative chapter ${index + 1}`, location: 'Example location',
      period: '2000–2005 (fictional and overlapping)', order: index,
      description: 'Synthetic chapter description.',
      themeId: `theme-${id}`, characterStateId: `character-${id}`,
      skillIds: index === 4 ? ['systems'] : [],
    })),
    experiences: [{
      id: 'example-role', phaseId: 'france', role: 'Synthetic role',
      organization: 'Example organization', period: '2001–2004 (fictional)',
      responsibilities: ['Illustrative responsibility.'], skillIds: ['software'],
    }],
    projects: [{
      id: 'example-project', phaseId: 'france', experienceId: 'example-role',
      title: 'Synthetic project', description: 'Test-only engineering example.',
      tags: ['AI', 'client work', 'open source'], presentationKind: 'software', importance: 'major',
      problem: 'Example problem.', solution: 'Example solution.',
      architecture: 'Example architecture.', contribution: 'Example contribution.',
      technologies: ['Example technology'], impact: 'Illustrative outcome; no real metric.',
      media: [{ kind: 'diagram', src: '/assets/example.svg', alt: 'Fictional architecture diagram' }],
      links: [{ label: 'Example source', href: 'https://example.invalid/project' }],
      skillIds: ['software'],
    }],
    skills: [{ id: 'systems', name: 'Systems' }, { id: 'software', name: 'Software' }],
    achievements: [{
      id: 'example-achievement', phaseId: 'france', experienceId: 'example-role',
      title: 'Synthetic achievement', description: 'Test-only achievement.', links: [],
    }],
    ...overrides,
  };
}
