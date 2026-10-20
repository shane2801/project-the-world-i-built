import { useState } from 'react';
import type { Skill } from '../../../domain/career/types';
import { SkillMarquee } from './SkillMarquee';
import { SkillIcon } from './SkillIcon';
import { skillCategories } from './skillCategories';

export function ResumeSkills({ skills, motionBlocked, speed }: { skills: readonly Skill[]; motionBlocked: boolean; speed: number }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const selected = skillCategories.find((category) => category.id === activeCategory);
  const visible = selected ? skills.filter((skill) => selected.skillIds.includes(skill.id)) : skills;
  // Search remains paused. Restore its state and control together if requested.
  // const [query, setQuery] = useState('');
  // const searched = visible.filter((skill) => skill.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  return <div className="cv-skills">
    {skills.length > 0 && <>
      <div className="cv-skill-filters" role="group" aria-label="Filter skills by category">
        <button type="button" aria-pressed={activeCategory === 'all'} aria-controls="resume-skills-results"
          onClick={() => setActiveCategory('all')}>All <span>{skills.length}</span></button>
        {skillCategories.map((category) => {
          const count = skills.filter((skill) => category.skillIds.includes(skill.id)).length;
          return count > 0 && <button type="button" key={category.id}
            aria-pressed={activeCategory === category.id} aria-controls="resume-skills-results"
            onClick={() => setActiveCategory(category.id)}>
            {category.label} <span>{count}</span>
          </button>;
        })}
      </div>
      <p className="cv-skill-results-count" role="status">
        {visible.length} {visible.length === 1 ? 'skill' : 'skills'} · {selected?.label ?? 'All categories'}
      </p>
    </>}
    {/* Search temporarily disabled.
    <div className="cv-skills-tools">
      <label htmlFor="resume-skill-search">Find a skill</label>
      <input id="resume-skill-search" type="search" value={query}
        placeholder="Search skills..." onChange={(event) => setQuery(event.target.value)} />
    </div>
    */}
    <div id="resume-skills-results">
      {visible.length ? activeCategory === 'all' ? <SkillMarquee skills={visible} motionBlocked={motionBlocked} speed={speed} /> :
        <ul className="cv-skill-list">{visible.map((skill) => <li key={skill.id}>
          <SkillIcon skillId={skill.id} /><span>{skill.name}</span>
        </li>)}</ul> : <p className="cv-muted">{skills.length ? 'No skills in this category.' : 'Skills have not been supplied yet.'}</p>}
    </div>
  </div>;
}
