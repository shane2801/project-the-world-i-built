export type ReviewStatus = 'draft' | 'approved';
export type ProjectImportance = 'small' | 'medium' | 'major';
export type PresentationKind = 'software' | 'ai' | 'client' | 'open-source';

export interface Link {
  readonly label: string;
  readonly href: string;
}

export interface Media {
  readonly kind: 'image' | 'video' | 'diagram';
  readonly src: string;
  readonly alt: string;
}

export interface Phase {
  readonly id: string;
  readonly title: string;
  readonly location: string;
  // Authored labels preserve uncertainty and overlap; they are not sort keys.
  readonly period: string;
  readonly order: number;
  readonly description: string;
  readonly themeId: string;
  readonly characterStateId: string;
  readonly skillIds: readonly string[];
}

export interface Experience {
  readonly id: string;
  readonly phaseId: string;
  readonly role: string;
  readonly organization: string;
  readonly period: string;
  readonly responsibilities: readonly string[];
  readonly skillIds: readonly string[];
}

export interface Project {
  readonly id: string;
  readonly phaseId: string;
  readonly experienceId?: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly presentationKind: PresentationKind;
  readonly importance: ProjectImportance;
  readonly problem: string;
  readonly solution: string;
  readonly architecture: string;
  readonly contribution: string;
  readonly technologies: readonly string[];
  readonly impact: string;
  readonly media: readonly Media[];
  readonly links: readonly Link[];
  readonly skillIds: readonly string[];
}

export interface Skill {
  readonly id: string;
  readonly name: string;
}

export interface Achievement {
  readonly id: string;
  readonly phaseId: string;
  readonly experienceId?: string;
  readonly title: string;
  readonly description: string;
  readonly links: readonly Link[];
}

export interface Portfolio {
  // Approval records human review; structural validation cannot verify biography.
  readonly reviewStatus: ReviewStatus;
  readonly name: string;
  readonly headline: string;
  readonly introduction: string;
  readonly currentPhaseId: string;
  readonly contacts: readonly Link[];
  readonly phases: readonly Phase[];
  readonly experiences: readonly Experience[];
  readonly projects: readonly Project[];
  readonly skills: readonly Skill[];
  readonly achievements: readonly Achievement[];
}

export type ValidationCode =
  | 'invalid-type'
  | 'invalid-value'
  | 'unknown-field'
  | 'duplicate-id'
  | 'duplicate-order'
  | 'duplicate-reference'
  | 'unknown-reference'
  | 'inconsistent-reference'
  | 'unapproved-content';

export interface ValidationIssue {
  readonly path: string;
  readonly code: ValidationCode;
  readonly message: string;
}

export type ValidationResult =
  | { readonly ok: true; readonly value: Portfolio }
  | { readonly ok: false; readonly issues: readonly ValidationIssue[] };
