import type { Phase, Project } from '../../../domain/career/types';
import { LinkList } from '../../../components/ui/LinkList';
import { ProjectMedia } from '../components/ProjectMedia';
import '../projects.css';

export function ProjectPage({ project, phase }: { project: Project; phase: Phase }) {
  const details = [
    ['Problem', project.problem], ['Solution', project.solution],
    ['Architecture', project.architecture], ['My contribution', project.contribution],
    ['Impact', project.impact],
  ];
  return <>
    <p><a href="/projects/">← All projects</a></p>
    <header className="page-heading">
      <p className="eyebrow">{phase.title}</p>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <ul className="tag-list" aria-label="Project tags">
        {project.tags.map((tag, index) => <li key={`${tag}-${index}`}>{tag}</li>)}
      </ul>
    </header>
    {details.map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}
    {project.technologies.length > 0 && <section><h2>Technologies</h2>
      <ul className="tag-list">{project.technologies.map((technology, index) => <li key={index}>{technology}</li>)}</ul>
    </section>}
    <ProjectMedia media={project.media} />
    <LinkList links={project.links} label="Project links" />
    <p><a href={`/resume/#${encodeURIComponent(`phase-${phase.id}`)}`}>View this career chapter →</a></p>
  </>;
}
