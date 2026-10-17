import { useEffect, useRef } from 'react';
import type { Project } from '../../../domain/career/types';
import { projectPath } from '../../projects/paths';

interface Props { project: Project; onClose: () => void }
export function ProjectPanel({ project, onClose }: Props) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const previous = document.activeElement;
    heading.current?.focus();
    return () => {
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
    };
  }, [project.id]);
  return <section className="explore-project-panel" aria-labelledby="selected-project-title"
    onKeyDown={(event) => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } }}>
    <h2 id="selected-project-title" tabIndex={-1} ref={heading}>{project.title}</h2>
    <p>{project.description}</p>
    <p><strong>Contribution:</strong> {project.contribution}</p>
    <p><strong>Impact:</strong> {project.impact}</p>
    <div className="explore-actions">
      <a href={projectPath(project.id)}>Read full project details →</a>
      <button type="button" onClick={onClose}>Close project</button>
    </div>
  </section>;
}
