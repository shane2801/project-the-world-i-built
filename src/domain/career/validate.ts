import type { Portfolio, ValidationIssue, ValidationResult } from './types.ts';
import { readAchievement, readExperience, readLink, readPhase, readProject, readSkill } from './validation/entities.ts';
import { readArray, readChoice, readId, readRecord, readText } from './validation/fields.ts';
import { validateReferences } from './validation/references.ts';

export interface ValidationOptions {
  readonly forPublication?: boolean;
}

export function validatePortfolio(input: unknown, options: ValidationOptions = {}): ValidationResult {
  const issues: ValidationIssue[] = [];
  const item = readRecord(input, 'portfolio', issues, [
    'reviewStatus', 'name', 'headline', 'introduction', 'currentPhaseId', 'contacts',
    'phases', 'experiences', 'projects', 'skills', 'achievements',
  ]);
  if (issues.length > 0 && (typeof input !== 'object' || input === null || Array.isArray(input))) {
    return { ok: false, issues };
  }

  const portfolio: Portfolio = {
    reviewStatus: readChoice(item.reviewStatus, ['draft', 'approved'], 'portfolio.reviewStatus', issues),
    name: readText(item.name, 'portfolio.name', issues),
    headline: readText(item.headline, 'portfolio.headline', issues),
    introduction: readText(item.introduction, 'portfolio.introduction', issues),
    currentPhaseId: readId(item.currentPhaseId, 'portfolio.currentPhaseId', issues),
    contacts: readArray(item.contacts, 'portfolio.contacts', issues, readLink),
    phases: readArray(item.phases, 'portfolio.phases', issues, readPhase),
    experiences: readArray(item.experiences, 'portfolio.experiences', issues, readExperience),
    projects: readArray(item.projects, 'portfolio.projects', issues, readProject),
    skills: readArray(item.skills, 'portfolio.skills', issues, readSkill),
    achievements: readArray(item.achievements, 'portfolio.achievements', issues, readAchievement),
  };

  if (issues.length === 0) {
    validateReferences(portfolio, issues);
    if (options.forPublication && portfolio.reviewStatus !== 'approved') {
      issues.push({
        path: 'portfolio.reviewStatus',
        code: 'unapproved-content',
        message: 'Draft or example content requires human approval before publication.',
      });
    }
  }

  // Return a newly parsed value only after shape and relationship checks succeed.
  return issues.length > 0 ? { ok: false, issues } : { ok: true, value: portfolio };
}
