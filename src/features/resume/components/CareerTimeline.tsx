import type { Portfolio } from '../../../domain/career/types';
import { getOrderedPhases, getPhaseContent } from '../../../domain/career/queries';
import { LinkList } from '../../../components/ui/LinkList';

export function CareerTimeline({ portfolio }: { portfolio: Portfolio }) {
  return (
    <ol className="career-timeline">
      {getOrderedPhases(portfolio).map((phase) => {
        const content = getPhaseContent(portfolio, phase.id);
        return <li key={phase.id}>
          <section id={`phase-${phase.id}`}>
            <p className="eyebrow">{phase.location} · {phase.period}</p>
            <h3>{phase.title}{portfolio.currentPhaseId === phase.id && <span className="status-label">Current</span>}</h3>
            <p>{phase.description}</p>
            {content?.experiences.map((experience) => <article className="experience" key={experience.id}>
              <h4>{experience.role} · {experience.organization}</h4>
              <p className="muted">{experience.period}</p>
              <ul>{experience.responsibilities.map((text, index) => <li key={index}>{text}</li>)}</ul>
            </article>)}
            {content && content.achievements.length > 0 && <ul>
              {content.achievements.map((achievement) => <li key={achievement.id}>
                <strong>{achievement.title}</strong> — {achievement.description}
                <LinkList links={achievement.links} label={`Evidence for ${achievement.title}`} />
              </li>)}
            </ul>}
            {content && content.skills.length > 0 && <p className="muted">
              Skills: {content.skills.map((skill) => skill.name).join(', ')}
            </p>}
          </section>
        </li>;
      })}
    </ol>
  );
}
