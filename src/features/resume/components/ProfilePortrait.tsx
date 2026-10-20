import { useState } from 'react';

const originalPortrait = '/images/profile/shane-pixel-dissolve.png';
const alternatePortrait = '/images/profile/shane-pixel-bald-smile.png';

export function ProfilePortrait() {
  const [alternate, setAlternate] = useState(false);
  return <>
    <link rel="preload" as="image" href={alternatePortrait} />
    <button className="cv-profile-portrait" type="button" aria-pressed={alternate}
      aria-label={alternate ? 'Restore original pixel portrait' : 'Show bald, smiling pixel portrait'}
      title="Click to switch portraits" onClick={() => setAlternate((previous) => !previous)}>
      <img className="cv-profile-photo" src={alternate ? alternatePortrait : originalPortrait}
        alt="" width={128} height={128} decoding="async" />
      <svg className="cv-portrait-hint" viewBox="0 0 104 48" width={104} height={48} aria-hidden="true">
        <text x="3" y="12" transform="rotate(-5 3 12)">click me</text>
        <path d="M24 19Q26 30 44 39M37 37l7 2-2-7" fill="none"
          stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  </>;
}
