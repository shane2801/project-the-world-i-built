import type { Portfolio } from '../domain/career/types.ts';
import { validatePortfolio } from '../domain/career/validate.ts';

// Missing content is an explicit empty state, never a synthetic biography.
export function loadPortfolio(input: unknown): Portfolio | null {
  if (input === null) return null;
  const result = validatePortfolio(input, { forPublication: true });
  if (!result.ok) {
    throw new Error(result.issues.map((issue) => `${issue.path}: ${issue.message}`).join('\n'));
  }
  return result.value;
}
