import type { Portfolio } from '../../../domain/career/types';
import { ProjectCard } from '../../projects/components/ProjectCard';
import '../../projects/projects.css';

export function SelectedWork({ portfolio }: { portfolio: Portfolio }) {
  const projects = portfolio.projects.slice(0, 2);
  if (projects.length === 0) return null;
  return <section className="home-selected-work" aria-labelledby="selected-work-title">
    <div className="home-section-heading">
      <div><p className="eyebrow">Things built along the way</p><h2 id="selected-work-title">The work behind the world.</h2></div>
      <a className="quiet-link" href="/projects/">Browse projects <span aria-hidden="true">↗</span></a>
    </div>
    <div className="project-grid">{projects.map((project) => <ProjectCard key={project.id}
      project={project} headingLevel="h3"
      phaseTitle={portfolio.phases.find((phase) => phase.id === project.phaseId)?.title ?? ''} />)}</div>
  </section>;
}
