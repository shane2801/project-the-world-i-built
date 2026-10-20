import type { Portfolio } from '../../../domain/career/types';
import { ProjectPreview } from './ProjectPreview';
import { projectPath } from '../../projects/paths';

const presentationLabels = { software: 'Software', ai: 'AI & research', client: 'Client work', 'open-source': 'Open source' };
const presentationMarks = { software: '</>', ai: 'AI', client: '↗', 'open-source': '{ }' };

export function ResumeProjects({ portfolio }: { portfolio: Portfolio }) {
  if (portfolio.projects.length === 0) return <p className="cv-muted">Project details have not been supplied yet.</p>;
  return <ul className="cv-project-list">
    {portfolio.projects.map((project) => <li key={project.id}>
      <a href={projectPath(project.id)} className="cv-project-link">
        <span className="cv-project-card-top">
          <span className="cv-project-mark" aria-hidden="true">{presentationMarks[project.presentationKind]}</span>
          <span className="cv-project-kind">{presentationLabels[project.presentationKind]}</span>
          <span className="cv-project-arrow" aria-hidden="true">↗</span>
        </span>
        <ProjectPreview project={project} />
        <strong>{project.title}</strong>
        <span className="cv-project-description">{project.description}</span>
        {project.tags.length > 0 && <ul className="cv-project-tags" aria-label="Project tags">
          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>}
        <span className="cv-project-action">Explore project <span aria-hidden="true">→</span></span>
      </a>
    </li>)}
  </ul>;
}
