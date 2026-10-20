import type { CSSProperties } from 'react';
import type { Skill } from '../../../domain/career/types';
import { SkillIcon } from './SkillIcon';
import '../skill-marquee.css';

function SkillRow({ skills, index, speed }: { skills: readonly Skill[]; index: number; speed: number }) {
  // Repeat short categories enough to fill a wide screen; only original chips are announced.
  const repeats = Math.max(1, Math.ceil(12 / skills.length));
  const chips = Array.from({ length: repeats }, (_, repeat) => skills.map((skill) => ({ skill, repeat }))).flat();
  const style = { '--skill-loop-duration': Math.max(36, chips.length * 4) / speed + 's' } as CSSProperties;
  return <div className="cv-skill-marquee-row">
    <div className="cv-skill-marquee-track" style={style}>
      {[false, true].map((clone) => <ul className="cv-skill-list cv-skill-marquee-group"
        key={String(clone)} aria-label={clone ? undefined : 'Skills row ' + (index + 1)}
        aria-hidden={clone || undefined}>
        {chips.map(({ skill, repeat }) => <li key={skill.id + '-' + repeat}
          aria-hidden={repeat > 0 || undefined} data-repeat={repeat > 0 || undefined}>
          <SkillIcon skillId={skill.id} /><span>{skill.name}</span>
        </li>)}
      </ul>)}
    </div>
  </div>;
}

export function SkillMarquee({ skills, motionBlocked, speed }: { skills: readonly Skill[]; motionBlocked: boolean; speed: number }) {
  const rows = Array.from({ length: Math.min(3, skills.length) }, (_, index) =>
    skills.filter((_, skillIndex) => skillIndex % Math.min(3, skills.length) === index));
  return <div className="cv-skill-marquee">
    {motionBlocked ? <ul className="cv-skill-list">{skills.map((skill) => <li key={skill.id}>
      <SkillIcon skillId={skill.id} /><span>{skill.name}</span>
    </li>)}</ul> : <div className="cv-skill-marquee-viewport" role="region" aria-label="Scrolling skills" tabIndex={0}>
      {rows.map((row, index) => <SkillRow skills={row} index={index} speed={speed} key={index} />)}
    </div>}
  </div>;
}
