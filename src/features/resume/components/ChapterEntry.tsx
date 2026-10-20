import type { Phase, Portfolio } from '../../../domain/career/types';
import { getPhaseContent } from '../../../domain/career/queries';
import { LinkList } from '../../../components/ui/LinkList';
import { ProjectMarkers } from './ProjectMarkers';

export function ChapterEntry({ phase, portfolio }: { phase: Phase; portfolio: Portfolio }) {
  const content = getPhaseContent(portfolio, phase.id);
  if (!content) return null;
  const consulting = phase.id === 'freelance';
  const current = portfolio.currentPhaseId === phase.id;
  return <li className="timeline-entry">
    {/* Links stay outside summary so selecting a project never toggles its chapter. */}
    <details className="timeline-chapter" id={'phase-' + phase.id} open={current && !consulting}>
      <summary><h3>
        <span className="chapter-period">{phase.period}</span>
        <span className="chapter-heading">{phase.title}
          {consulting ? <span className="status-label">Ongoing · alongside other roles</span> :
            current && <span className="status-label">Current chapter</span>}
        </span>
        <span className="disclosure-chevron" aria-hidden="true" />
      </h3></summary>
      <div className="chapter-body">
        <p>{phase.description}</p>
        {content.experiences.map((experience) => <article className="experience" key={experience.id}>
          <h4>{experience.role} · {experience.organization}</h4>
          {experience.period !== phase.period && <p className="muted">{experience.period}</p>}
          {experience.responsibilities.length > 0 && <details className="chapter-more">
            <summary>Responsibilities <span>{experience.responsibilities.length}</span></summary>
            <ul>{experience.responsibilities.map((text, index) => <li key={index}>{text}</li>)}</ul>
          </details>}
        </article>)}
        {content.achievements.length > 0 && <details className="chapter-more">
          <summary>Education &amp; achievements <span>{content.achievements.length}</span></summary>
          <ul>{content.achievements.map((achievement) => <li key={achievement.id}>
            <strong>{achievement.title}</strong> — {achievement.description}
            <LinkList links={achievement.links} label={'Evidence for ' + achievement.title} />
          </li>)}</ul>
        </details>}
        {content.skills.length > 0 && <details className="chapter-more">
          <summary>Chapter skills <span>{content.skills.length}</span></summary>
          <p className="muted">{content.skills.map((skill) => skill.name).join(', ')}</p>
        </details>}
      </div>
    </details>
    <ProjectMarkers projects={content.projects} chapterId={phase.id} chapterTitle={phase.title} />
  </li>;
}
