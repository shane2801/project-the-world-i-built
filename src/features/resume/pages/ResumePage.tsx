import type { Portfolio } from '../../../domain/career/types';
import { EmptyState } from '../../../components/ui/EmptyState';
import { LinkList } from '../../../components/ui/LinkList';
import { CareerTimeline } from '../components/CareerTimeline';
import '../resume.css';

export function ResumePage({ portfolio }: { portfolio: Portfolio | null }) {
  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">The story behind the world</p>
        <h1>Résumé</h1>
        {portfolio ? <><h2>{portfolio.name}</h2><p>{portfolio.headline}</p><p>{portfolio.introduction}</p></> :
          <p>A place for the career story, with facts reviewed before they appear here.</p>}
      </header>
      <section aria-labelledby="career-heading">
        <h2 id="career-heading">Career chapters</h2>
        {portfolio && portfolio.phases.length > 0 ? <CareerTimeline portfolio={portfolio} /> :
          <EmptyState title="Career details are being prepared">
            Dates, roles and contributions will appear here after review.
          </EmptyState>}
      </section>
      <section aria-labelledby="skills-heading">
        <h2 id="skills-heading">Skills</h2>
        {portfolio && portfolio.skills.length > 0 ?
          <ul className="tag-list">{portfolio.skills.map((skill) => <li key={skill.id}>{skill.name}</li>)}</ul> :
          <p className="muted">Verified skills have not been supplied yet.</p>}
      </section>
      <section id="contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Contact</h2>
        {portfolio && portfolio.contacts.length > 0 ? <LinkList links={portfolio.contacts} label="Contact links" /> :
          <p className="muted">Approved contact details will be added here.</p>}
      </section>
      <p><a href="/projects/">Browse projects →</a></p>
    </>
  );
}
