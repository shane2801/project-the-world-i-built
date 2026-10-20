import type { Project } from '../../../domain/career/types';

const draftPreviews: Readonly<Record<string, string>> = {
  'ev-charger-management': '/images/project-previews/ev-charger-management-draft.svg',
  'accommodation-management': '/images/project-previews/accommodation-management-draft.svg',
  'ai-healthcare-analytics': '/images/project-previews/ai-healthcare-analytics-draft.svg',
  'java-multiplayer-game': '/images/project-previews/java-multiplayer-game-draft.svg',
};

export function ProjectPreview({ project }: { project: Project }) {
  // A supplied screenshot automatically replaces the illustrative draft without changing the card.
  const screenshot = project.media.find((item) => item.kind === 'image');
  const src = screenshot?.src ?? draftPreviews[project.id];
  if (!src) return null;
  return <span className="cv-project-preview">
    <img src={src} alt={screenshot?.alt ?? 'Illustrative mockup for ' + project.title + '; not an actual screenshot'}
      width={480} height={240} loading="lazy" decoding="async" />
    {!screenshot && <span className="cv-project-preview-label">Draft preview</span>}
  </span>;
}
