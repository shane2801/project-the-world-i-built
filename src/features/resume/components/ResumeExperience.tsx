import type { Experience, Phase, Portfolio } from '../../../domain/career/types';
import { getOrderedPhases, getPhaseContent } from '../../../domain/career/queries';
import { ProjectMarkers } from './ProjectMarkers';

function Position({ experience, phase, portfolio, first }: {
  experience: Experience; phase: Phase; portfolio: Portfolio; first: boolean;
}) {
  const consulting = phase.id === 'freelance';
  const current = phase.id === portfolio.currentPhaseId;
  const projects = portfolio.projects.filter((project) => project.phaseId === phase.id &&
    (!project.experienceId || project.experienceId === experience.id));
  const highlights = portfolio.achievements.filter((achievement) => achievement.phaseId === phase.id &&
    achievement.id !== 'first-class-degree' && (!achievement.experienceId || achievement.experienceId === experience.id));
  return <li className="cv-position">
    <details id={first ? 'phase-' + phase.id : 'experience-' + experience.id} open={current && !consulting}>
      <summary>
        <span className="cv-position-heading">
          <span className="cv-role-line"><strong>{experience.role}</strong>
            <ProjectMarkers inline projects={projects} chapterId={experience.id} chapterTitle={experience.organization} />
          </span>
          <span className="cv-employer">{experience.organization}
            {consulting ? <span className="cv-badge">Ongoing · alongside other roles</span> :
              current && <span className="cv-badge">Current</span>}
          </span>
        </span>
        <span className="cv-position-meta"><span>{experience.period}</span><span className="cv-chevron" aria-hidden="true" /></span>
      </summary>
      <div className="cv-position-content">
        {experience.responsibilities.length > 0 && <ul className="cv-bullets">
          {experience.responsibilities.slice(0, 2).map((text, index) => <li key={index}>{text}</li>)}
        </ul>}
        {experience.responsibilities.length > 2 && <details className="cv-more">
          <summary>More responsibilities <span>+{experience.responsibilities.length - 2}</span></summary>
          <ul className="cv-bullets">{experience.responsibilities.slice(2).map((text, index) => <li key={index}>{text}</li>)}</ul>
        </details>}
        {highlights.map((highlight) => <p className="cv-highlight" key={highlight.id}>
          <strong>{highlight.title}</strong> · {highlight.description}
        </p>)}
      </div>
    </details>
  </li>;
}

export function ResumeExperience({ portfolio }: { portfolio: Portfolio }) {
  const phases = [...getOrderedPhases(portfolio)].reverse();
  return <ol className="cv-experience-list">
    {phases.flatMap((phase) => {
      const content = getPhaseContent(portfolio, phase.id);
      // Education-only periods are linked from the education section, not listed as jobs.
      if (!content?.experiences.length) return [];
      return content.experiences.map((experience, index) => <Position key={experience.id}
        experience={experience} phase={phase} portfolio={portfolio} first={index === 0} />);
    })}
  </ol>;
}
