import type { Portfolio } from '../../../domain/career/types';
import { EmptyState } from '../../../components/ui/EmptyState';
import { ProjectCard } from '../components/ProjectCard';
import '../projects.css';

export function ProjectsPage({ portfolio }: { portfolio: Portfolio | null }) {
  return <>
    <header className="page-heading">
      <p className="eyebrow">Ideas made tangible</p>
      <h1>Projects</h1>
      <p>Problems, contributions and outcomes, connected to the chapters that shaped them.</p>
    </header>
    {portfolio && portfolio.projects.length > 0 ?
      <div className="project-grid">{portfolio.projects.map((project) => <ProjectCard
        key={project.id} project={project}
        phaseTitle={portfolio.phases.find((phase) => phase.id === project.phaseId)?.title ?? ''}
      />)}</div> :
      <EmptyState title="Projects are being prepared">
        Project descriptions and evidence will appear after their facts and publication permissions are reviewed.
      </EmptyState>}
    <p><a href="/resume/">Read the résumé →</a></p>
  </>;
}
