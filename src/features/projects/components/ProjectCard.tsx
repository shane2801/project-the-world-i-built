import type { Project } from '../../../domain/career/types';
import { projectPath } from '../paths';

export function ProjectCard({ project, phaseTitle, headingLevel: Heading = 'h2' }: {
  project: Project; phaseTitle: string; headingLevel?: 'h2' | 'h3';
}) {
  return <article className={'project-card project-kind-' + project.presentationKind}>
    <div className="project-emblem" aria-hidden="true"><span /><span /><span /></div>
    <div className="project-card-content">
      <p className="eyebrow">{phaseTitle}</p>
      <Heading><a href={projectPath(project.id)}>{project.title}<span aria-hidden="true"> ↗</span></a></Heading>
      <p>{project.description}</p>
      {project.tags.length > 0 && <ul className="tag-list" aria-label="Project tags">
        {project.tags.map((tag, index) => <li key={`${tag}-${index}`}>{tag}</li>)}
      </ul>}
    </div>
  </article>;
}
