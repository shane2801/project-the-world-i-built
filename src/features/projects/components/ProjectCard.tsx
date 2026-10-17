import type { Project } from '../../../domain/career/types';
import { projectPath } from '../paths';

export function ProjectCard({ project, phaseTitle }: { project: Project; phaseTitle: string }) {
  return <article className="project-card">
    <p className="eyebrow">{phaseTitle}</p>
    <h2><a href={projectPath(project.id)}>{project.title}</a></h2>
    <p>{project.description}</p>
    {project.tags.length > 0 && <ul className="tag-list" aria-label="Project tags">
      {project.tags.map((tag, index) => <li key={`${tag}-${index}`}>{tag}</li>)}
    </ul>}
  </article>;
}
