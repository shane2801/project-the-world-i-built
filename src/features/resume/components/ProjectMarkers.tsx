import { useState } from 'react';
import type { Project } from '../../../domain/career/types';
import { projectPath } from '../../projects/paths';

function ProjectMarker({ project, chapterId, inline }: { project: Project; chapterId: string; inline: boolean }) {
  const [dismissed, setDismissed] = useState(false);
  const previewId = 'project-preview-' + chapterId + '-' + project.id;
  const Item = inline ? 'span' : 'li';
  return <Item className={'project-marker' + (dismissed ? ' is-dismissed' : '')}
    role={inline ? 'listitem' : undefined} onMouseLeave={() => setDismissed(false)}>
    <a href={projectPath(project.id)} aria-label={'View project: ' + project.title}
      aria-describedby={previewId} onFocus={() => setDismissed(false)}
      onKeyDown={(event) => { if (event.key === 'Escape') setDismissed(true); }}>
      <span aria-hidden="true">✦</span>
    </a>
    <span className="project-preview" id={previewId} role="tooltip">
      <strong>{project.title}</strong><span>{project.description}</span>
      <span className="project-preview-action">Open project details ↗</span>
    </span>
  </Item>;
}

export function ProjectMarkers({ projects, chapterId, chapterTitle, inline = false }: {
  projects: readonly Project[]; chapterId: string; chapterTitle: string; inline?: boolean;
}) {
  if (projects.length === 0) return null;
  // Inline phrasing markup keeps the role summary valid HTML; anchors navigate independently.
  const Group = inline ? 'span' : 'ul';
  return <Group className={'chapter-projects' + (inline ? ' is-inline' : '')}
    role={inline ? 'list' : undefined} aria-label={'Projects from ' + chapterTitle}>
    {projects.map((project) => <ProjectMarker key={project.id} project={project}
      chapterId={chapterId} inline={inline} />)}
  </Group>;
}
