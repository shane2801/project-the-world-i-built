import type { Portfolio } from '../../../domain/career/types';
import { getPhaseContent } from '../../../domain/career/queries';
import { projectPath } from '../../projects/paths';

interface Props { portfolio: Portfolio; phaseId: string; onSelect: (id: string) => void; interactive: boolean }
export function ChapterContent({ portfolio, phaseId, onSelect, interactive }: Props) {
  const content = getPhaseContent(portfolio, phaseId);
  if (!content) return null;
  return <section className="explore-chapter" aria-labelledby="active-chapter-title">
    <p className="eyebrow">{content.phase.period}</p>
    <h2 id="active-chapter-title">{content.phase.title}</h2>
    <p>{content.phase.description}</p>
    {content.experiences.map((experience) => <p key={experience.id}>
      <strong>{experience.role}</strong> · {experience.organization}
    </p>)}
    <h3>Projects in this chapter</h3>
    {content.projects.length === 0 ? <p>No projects supplied for this chapter yet.</p> :
      <ul className="explore-project-list">{content.projects.map((project) => <li key={project.id}>
        <a href={projectPath(project.id)}>{project.title}</a>
        <button type="button" disabled={!interactive} onClick={() => onSelect(project.id)}>Inspect project</button>
      </li>)}</ul>}
    <a href={`/resume/#${encodeURIComponent('phase-' + phaseId)}`}>Read the career chapter →</a>
  </section>;
}
