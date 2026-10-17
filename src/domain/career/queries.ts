import type { Phase, Portfolio } from './types.ts';

export function getOrderedPhases(portfolio: Portfolio): readonly Phase[] {
  return [...portfolio.phases].sort((left, right) => left.order - right.order);
}

export function getCurrentPhase(portfolio: Portfolio): Phase | undefined {
  return portfolio.phases.find((phase) => phase.id === portfolio.currentPhaseId);
}

export function getProjectById(portfolio: Portfolio, projectId: string) {
  return portfolio.projects.find((project) => project.id === projectId);
}

export function getProjectsForPhase(portfolio: Portfolio, phaseId: string) {
  return portfolio.projects.filter((project) => project.phaseId === phaseId);
}

export function getProjectsByTag(portfolio: Portfolio, tag: string) {
  // Exact authored tags are independent of the project's visual presentation.
  return portfolio.projects.filter((project) => project.tags.includes(tag));
}

export function getPhaseContent(portfolio: Portfolio, phaseId: string) {
  const phase = portfolio.phases.find((candidate) => candidate.id === phaseId);
  if (!phase) return undefined;

  const experiences = portfolio.experiences.filter((experience) => experience.phaseId === phaseId);
  const projects = getProjectsForPhase(portfolio, phaseId);
  const achievements = portfolio.achievements.filter((achievement) => achievement.phaseId === phaseId);
  const skillIds = new Set([
    ...phase.skillIds,
    ...experiences.flatMap((experience) => experience.skillIds),
    ...projects.flatMap((project) => project.skillIds),
  ]);

  return {
    phase,
    experiences,
    projects,
    achievements,
    skills: portfolio.skills.filter((skill) => skillIds.has(skill.id)),
  };
}

export function getAdjacentPhases(portfolio: Portfolio, phaseId: string) {
  const phases = getOrderedPhases(portfolio);
  const index = phases.findIndex((phase) => phase.id === phaseId);
  if (index < 0) return undefined;
  return { previous: phases[index - 1], next: phases[index + 1] };
}
