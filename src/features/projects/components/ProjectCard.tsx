import type { Project } from '../../../domain/career/types';
import { projectPath } from '../paths';

export function ProjectCard({ project, phaseTitle, headingLevel: Heading = 'h2' }: {
  project: Project; phaseTitle: string; headingLevel?: 'h2' | 'h3';
}) {
  return <article className="project-card">
    <p className="eyebrow">{phaseTitle}</p>
    <Heading><a href={projectPath(project.id)}>{project.title}</a></Heading>
    <p>{project.description}</p>
    {project.tags.length > 0 && <ul className="tag-list" aria-label="Project tags">
      {project.tags.map((tag, index) => <li key={`${tag}-${index}`}>{tag}</li>)}
    </ul>}
  </article>;
}
