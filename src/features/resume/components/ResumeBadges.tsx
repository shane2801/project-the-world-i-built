import { useState } from 'react';
import type { Portfolio } from '../../../domain/career/types';

interface Badge {
  id: string;
  label: string;
  image: string;
  detail: string;
}

function ProfileBadge({ badge }: { badge: Badge }) {
  const [dismissed, setDismissed] = useState(false);
  const previewId = 'badge-preview-' + badge.id;
  return <li className={'cv-profile-badge' + (dismissed ? ' is-dismissed' : '')}
    onMouseLeave={() => setDismissed(false)}>
    <span className="cv-logo-badge" tabIndex={0} aria-describedby={previewId}
      onFocus={() => setDismissed(false)}
      onKeyDown={(event) => { if (event.key === 'Escape') setDismissed(true); }}>
      <img src={badge.image} alt={badge.label} width={badge.id === 'accenture' ? 28 : 104} height={34} />
    </span>
    <span className="cv-badge-preview" id={previewId} role="tooltip">
      <strong>{badge.label}</strong><span>{badge.detail}</span>
    </span>
  </li>;
}

export function ResumeBadges({ portfolio }: { portfolio: Portfolio }) {
  const accenture = portfolio.experiences.find((item) => item.id === 'accenture-architect');
  const degree = portfolio.achievements.find((item) => item.id === 'first-class-degree');
  const badges: Badge[] = [];
  // Display only these two affiliations; their details stay owned by career content.
  if (accenture) badges.push({
    id: 'accenture', label: 'Accenture', image: '/images/badges/accenture.svg',
    detail: accenture.role + ' · ' + accenture.period,
  });
  if (degree) badges.push({
    id: 'birmingham', label: 'University of Birmingham', image: '/images/badges/birmingham.svg',
    detail: degree.title + '\n' + degree.description.split('\n\n')[0],
  });
  return <ul className="cv-profile-badges" aria-label="Professional and university affiliations">
    {badges.map((badge) => <ProfileBadge key={badge.id} badge={badge} />)}
  </ul>;
}
