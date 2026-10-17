import type { ValidationIssue } from '../types.ts';

export function readRecord(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
  keys: readonly string[],
): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    issues.push({ path, code: 'invalid-type', message: 'Expected an object.' });
    return {};
  }

  for (const key of Object.keys(value)) {
    if (!keys.includes(key)) {
      issues.push({ path: `${path}.${key}`, code: 'unknown-field', message: 'Unrecognized field; check its spelling.' });
    }
  }
  return value as Record<string, unknown>;
}

export function readText(value: unknown, path: string, issues: ValidationIssue[]): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    issues.push({ path, code: 'invalid-type', message: 'Expected a nonempty string.' });
    return '';
  }
  return value;
}

export function readId(value: unknown, path: string, issues: ValidationIssue[]): string {
  const id = readText(value, path, issues);
  if (id !== id.trim()) {
    issues.push({ path, code: 'invalid-value', message: 'Identifiers cannot have surrounding whitespace.' });
  }
  return id;
}

export function readArray<T>(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
  parse: (entry: unknown, path: string, issues: ValidationIssue[]) => T,
): T[] {
  if (!Array.isArray(value)) {
    issues.push({ path, code: 'invalid-type', message: 'Expected an array.' });
    return [];
  }
  // Array.from visits sparse slots too, so holes cannot bypass validation.
  return Array.from(value, (entry, index) => parse(entry, `${path}[${index}]`, issues));
}

export function readIds(value: unknown, path: string, issues: ValidationIssue[]): string[] {
  const ids = readArray(value, path, issues, readId);
  const seen = new Set<string>();
  ids.forEach((id, index) => {
    if (seen.has(id)) {
      issues.push({ path: `${path}[${index}]`, code: 'duplicate-reference', message: `Repeated reference: ${id}.` });
    }
    seen.add(id);
  });
  return ids;
}

export function readChoice<const T extends readonly [string, ...string[]]>(
  value: unknown,
  choices: T,
  path: string,
  issues: ValidationIssue[],
): T[number] {
  const choice = readText(value, path, issues);
  const match = choices.find((allowed) => allowed === choice);
  if (match !== undefined) return match;
  issues.push({ path, code: 'invalid-value', message: `Expected one of: ${choices.join(', ')}.` });
  // Intermediate fallbacks collect diagnostics; any issue blocks valid output.
  return choices[0];
}

export function readOrder(value: unknown, path: string, issues: ValidationIssue[]): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) {
    issues.push({ path, code: 'invalid-value', message: 'Expected a nonnegative safe integer.' });
    return 0;
  }
  return value;
}

export function readUrl(
  value: unknown,
  path: string,
  issues: ValidationIssue[],
  allowMail = false,
): string {
  const href = readText(value, path, issues);
  const local = href.startsWith('/') && !href.startsWith('//');
  let allowed = false;

  // Browsers rewrite backslashes and control characters; reject them as authored.
  const unsafeCharacters = href.includes('\\')
    || [...href].some((character) => character.charCodeAt(0) <= 0x20 || character.charCodeAt(0) === 0x7f);
  if (href && href === href.trim() && !unsafeCharacters) {
    if (local) {
      allowed = true;
    } else {
      try {
        const url = new URL(href);
        allowed = ['https:', 'http:'].includes(url.protocol)
          || (allowMail && url.protocol === 'mailto:' && url.pathname.length > 0);
      } catch {
        // Invalid or relative URLs must not be silently rewritten against a host.
      }
    }
  }
  if (!allowed) {
    issues.push({ path, code: 'invalid-value', message: 'Use an HTTP(S) URL, safe root-relative path, or permitted contact link.' });
  }
  return href;
}
