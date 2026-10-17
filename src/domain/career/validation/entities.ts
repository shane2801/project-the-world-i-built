import type { Achievement, Experience, Link, Media, Phase, Project, Skill, ValidationIssue } from '../types.ts';
import { readArray, readChoice, readId, readIds, readOrder, readRecord, readText, readUrl } from './fields.ts';

export function readLink(value: unknown, path: string, issues: ValidationIssue[]): Link {
  const item = readRecord(value, path, issues, ['label', 'href']);
  return {
    label: readText(item.label, `${path}.label`, issues),
    href: readUrl(item.href, `${path}.href`, issues, true),
  };
}

function readMedia(value: unknown, path: string, issues: ValidationIssue[]): Media {
  const item = readRecord(value, path, issues, ['kind', 'src', 'alt']);
  return {
    kind: readChoice(item.kind, ['image', 'video', 'diagram'], `${path}.kind`, issues),
    src: readUrl(item.src, `${path}.src`, issues),
    alt: readText(item.alt, `${path}.alt`, issues),
  };
}

export function readPhase(value: unknown, path: string, issues: ValidationIssue[]): Phase {
  const item = readRecord(value, path, issues,
    ['id', 'title', 'location', 'period', 'order', 'description', 'themeId', 'characterStateId', 'skillIds']);
  return {
    id: readId(item.id, `${path}.id`, issues),
    title: readText(item.title, `${path}.title`, issues),
    location: readText(item.location, `${path}.location`, issues),
    period: readText(item.period, `${path}.period`, issues),
    order: readOrder(item.order, `${path}.order`, issues),
    description: readText(item.description, `${path}.description`, issues),
    themeId: readId(item.themeId, `${path}.themeId`, issues),
    characterStateId: readId(item.characterStateId, `${path}.characterStateId`, issues),
    skillIds: readIds(item.skillIds, `${path}.skillIds`, issues),
  };
}

export function readExperience(value: unknown, path: string, issues: ValidationIssue[]): Experience {
  const item = readRecord(value, path, issues,
    ['id', 'phaseId', 'role', 'organization', 'period', 'responsibilities', 'skillIds']);
  return {
    id: readId(item.id, `${path}.id`, issues),
    phaseId: readId(item.phaseId, `${path}.phaseId`, issues),
    role: readText(item.role, `${path}.role`, issues),
    organization: readText(item.organization, `${path}.organization`, issues),
    period: readText(item.period, `${path}.period`, issues),
    responsibilities: readArray(item.responsibilities, `${path}.responsibilities`, issues, readText),
    skillIds: readIds(item.skillIds, `${path}.skillIds`, issues),
  };
}

export function readProject(value: unknown, path: string, issues: ValidationIssue[]): Project {
  const item = readRecord(value, path, issues, [
    'id', 'phaseId', 'experienceId', 'title', 'description', 'tags', 'presentationKind', 'importance',
    'problem', 'solution', 'architecture', 'contribution', 'technologies', 'impact', 'media', 'links', 'skillIds',
  ]);
  return {
    id: readId(item.id, `${path}.id`, issues),
    phaseId: readId(item.phaseId, `${path}.phaseId`, issues),
    experienceId: item.experienceId === undefined ? undefined : readId(item.experienceId, `${path}.experienceId`, issues),
    title: readText(item.title, `${path}.title`, issues),
    description: readText(item.description, `${path}.description`, issues),
    tags: readArray(item.tags, `${path}.tags`, issues, readText),
    presentationKind: readChoice(item.presentationKind, ['software', 'ai', 'client', 'open-source'], `${path}.presentationKind`, issues),
    importance: readChoice(item.importance, ['small', 'medium', 'major'], `${path}.importance`, issues),
    problem: readText(item.problem, `${path}.problem`, issues),
    solution: readText(item.solution, `${path}.solution`, issues),
    architecture: readText(item.architecture, `${path}.architecture`, issues),
    contribution: readText(item.contribution, `${path}.contribution`, issues),
    technologies: readArray(item.technologies, `${path}.technologies`, issues, readText),
    impact: readText(item.impact, `${path}.impact`, issues),
    media: readArray(item.media, `${path}.media`, issues, readMedia),
    links: readArray(item.links, `${path}.links`, issues, readLink),
    skillIds: readIds(item.skillIds, `${path}.skillIds`, issues),
  };
}

export function readSkill(value: unknown, path: string, issues: ValidationIssue[]): Skill {
  const item = readRecord(value, path, issues, ['id', 'name']);
  return {
    id: readId(item.id, `${path}.id`, issues),
    name: readText(item.name, `${path}.name`, issues),
  };
}

export function readAchievement(value: unknown, path: string, issues: ValidationIssue[]): Achievement {
  const item = readRecord(value, path, issues, ['id', 'phaseId', 'experienceId', 'title', 'description', 'links']);
  return {
    id: readId(item.id, `${path}.id`, issues),
    phaseId: readId(item.phaseId, `${path}.phaseId`, issues),
    experienceId: item.experienceId === undefined ? undefined : readId(item.experienceId, `${path}.experienceId`, issues),
    title: readText(item.title, `${path}.title`, issues),
    description: readText(item.description, `${path}.description`, issues),
    links: readArray(item.links, `${path}.links`, issues, readLink),
  };
}
