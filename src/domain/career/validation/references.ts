import type { Portfolio, ValidationIssue } from '../types.ts';

export function validateReferences(portfolio: Portfolio, issues: ValidationIssue[]): void {
  const collections = ['phases', 'experiences', 'projects', 'skills', 'achievements'] as const;

  for (const collection of collections) {
    const seen = new Set<string>();
    portfolio[collection].forEach((item, index) => {
      if (seen.has(item.id)) {
        issues.push({ path: `portfolio.${collection}[${index}].id`, code: 'duplicate-id', message: `Repeated identifier: ${item.id}.` });
      }
      seen.add(item.id);
    });
  }

  const phaseIds = new Set(portfolio.phases.map((phase) => phase.id));
  const skillIds = new Set(portfolio.skills.map((skill) => skill.id));
  const experiences = new Map(portfolio.experiences.map((experience) => [experience.id, experience]));
  const orders = new Set<number>();

  function reference(id: string, known: ReadonlySet<string>, path: string) {
    if (!known.has(id)) {
      issues.push({ path, code: 'unknown-reference', message: `Unknown identifier: ${id}.` });
    }
  }

  reference(portfolio.currentPhaseId, phaseIds, 'portfolio.currentPhaseId');
  portfolio.phases.forEach((phase, index) => {
    if (orders.has(phase.order)) {
      issues.push({ path: `portfolio.phases[${index}].order`, code: 'duplicate-order', message: `Repeated phase order: ${phase.order}.` });
    }
    orders.add(phase.order);
  });

  for (const collection of ['phases', 'experiences', 'projects'] as const) {
    portfolio[collection].forEach((item, index) => {
      item.skillIds.forEach((id, skillIndex) => {
        reference(id, skillIds, `portfolio.${collection}[${index}].skillIds[${skillIndex}]`);
      });
    });
  }

  for (const collection of ['experiences', 'projects', 'achievements'] as const) {
    portfolio[collection].forEach((item, index) => {
      reference(item.phaseId, phaseIds, `portfolio.${collection}[${index}].phaseId`);
    });
  }

  for (const collection of ['projects', 'achievements'] as const) {
    portfolio[collection].forEach((item, index) => {
      if (item.experienceId === undefined) return;
      const experience = experiences.get(item.experienceId);
      const path = `portfolio.${collection}[${index}].experienceId`;
      if (!experience) {
        issues.push({ path, code: 'unknown-reference', message: `Unknown experience: ${item.experienceId}.` });
      } else if (experience.phaseId !== item.phaseId) {
        issues.push({ path, code: 'inconsistent-reference', message: 'The experience and its content must belong to the same phase.' });
      }
    });
  }
}
