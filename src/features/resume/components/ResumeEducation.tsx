import type { Achievement } from '../../../domain/career/types';
import { LinkList } from '../../../components/ui/LinkList';

const educationLogos: Record<string, { src: string; alt: string }> = {
  'first-class-degree': { src: '/images/badges/birmingham.svg', alt: 'University of Birmingham' },
  // Modern SVG redrawn from the owner-supplied rcclogo.jpg; original JPG retained.
  'royal-college-education': { src: '/images/badges/royal-college-curepipe.svg', alt: 'Royal College Curepipe: modern redrawing of the crest with Latin motto and centenary inscription' },
};

export function ResumeEducation({ records }: { records: readonly Achievement[] }) {
  if (records.length === 0) return <p className="cv-muted">Education details have not been supplied yet.</p>;
  return <div className="cv-education-list">{records.map((item) => {
    const [overview = '', ...additional] = item.description.split(/\n\s*\n/);
    const [institution = '', ...grades] = overview.split('\n');
    const logo = educationLogos[item.id];
    return <article className="cv-education" key={item.id}>
      <div className="cv-education-heading">
        <div className="cv-education-overview">
          <h3>{item.title}</h3>
          <p className="cv-education-institution">{institution}</p>
          {grades.length > 0 && <p className="cv-education-meta">{grades.join('\n')}</p>}
        </div>
        {logo && <img className={'cv-education-logo' + (item.id === 'royal-college-education' ? ' cv-education-logo--rcc' : '')} src={logo.src} alt={logo.alt}
          width={item.id === 'first-class-degree' ? 116 : 82} height={item.id === 'first-class-degree' ? 64 : 85} loading="lazy" />}
      </div>
      {additional.length > 0 && <details className="cv-more">
        <summary>Study details &amp; activities</summary>
        {additional.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </details>}
      <LinkList links={item.links} label={'Evidence for ' + item.title} />
    </article>;
  })}</div>;
}
