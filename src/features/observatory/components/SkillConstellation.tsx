import type { Portfolio } from '../../../domain/career/types';
import { getOrderedPhases, getPhaseContent } from '../../../domain/career/queries';

export function SkillConstellation({ portfolio }: { portfolio: Portfolio }) {
  const chapters = getOrderedPhases(portfolio).map((phase) => ({
    phase, skills: new Set(getPhaseContent(portfolio, phase.id)?.skills.map((skill) => skill.id)),
  }));
  return <ul className="skill-constellation">
    {portfolio.skills.map((skill) => {
      const related = chapters.filter((chapter) => chapter.skills.has(skill.id));
      return <li key={skill.id}>
        <strong><span aria-hidden="true">✦ </span>{skill.name}</strong>
        {related.length > 0 ? <ul>{related.map(({ phase }) => <li key={phase.id}>
          <a href={`/resume/#${encodeURIComponent('phase-' + phase.id)}`}>{phase.title}</a>
        </li>)}</ul> : <p>Listed in the résumé; chapter association not supplied.</p>}
      </li>;
    })}
  </ul>;
}
