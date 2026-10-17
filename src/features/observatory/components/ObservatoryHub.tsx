import type { Portfolio } from '../../../domain/career/types';
import { CareerTimeline } from '../../resume/components/CareerTimeline';
import { ProjectCard } from '../../projects/components/ProjectCard';
import { SkillConstellation } from './SkillConstellation';
import { observatoryRooms } from '../rooms';
import '../../projects/projects.css';
import '../../resume/resume.css';
import '../observatory.css';

export function ObservatoryHub({ portfolio }: { portfolio: Portfolio }) {
  return <div className="observatory-hub">
    <p className="eyebrow">The Observatory · Past, present and what comes next</p>
    <nav aria-label="Observatory rooms"><ul className="observatory-room-links">
      {observatoryRooms.map((room) => <li key={room.id}><a href={`#observatory-${room.id}`}>{room.title}</a></li>)}
    </ul></nav>
    <section aria-labelledby="observatory-timeline">
      <h2 id="observatory-timeline" tabIndex={-1}>Timeline Room</h2>
      <p>The chapters follow their authored display order; their periods may overlap.</p>
      <CareerTimeline portfolio={portfolio} />
    </section>
    <section aria-labelledby="observatory-projects">
      <h2 id="observatory-projects" tabIndex={-1}>Project Gallery</h2>
      {portfolio.projects.length === 0 ? <p>No approved projects have been supplied yet.</p> :
        <div className="project-grid">{portfolio.projects.map((project) => <ProjectCard key={project.id}
          project={project} headingLevel="h3" phaseTitle={portfolio.phases.find((phase) => phase.id === project.phaseId)?.title ?? ''} />)}</div>}
    </section>
    <section aria-labelledby="observatory-skills">
      <h2 id="observatory-skills" tabIndex={-1}>Skill Constellation</h2>
      <p>Connections show authored skill references, without inferred proficiency or career claims.</p>
      {portfolio.skills.length > 0 ? <SkillConstellation portfolio={portfolio} /> : <p>No approved skills have been supplied yet.</p>}
    </section>
    <section aria-labelledby="observatory-future">
      <h2 id="observatory-future" tabIndex={-1}>Future Room</h2>
      <p>This space is aspirational. Future chapters and goals have not been supplied; no future employer or role is claimed.</p>
      <a href="/resume/#contact">Discuss what comes next →</a>
    </section>
  </div>;
}
