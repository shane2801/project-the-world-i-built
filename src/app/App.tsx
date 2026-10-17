import type { Portfolio } from '../domain/career/types';
import { portfolio as authoredPortfolio, contentIsDraft } from '../content/portfolio';
import { getProjectById } from '../domain/career/queries';
import { SiteLayout } from '../components/layout/SiteLayout';
import { HomePage } from '../features/home/pages/HomePage';
import { ResumePage } from '../features/resume/pages/ResumePage';
import { ProjectsPage } from '../features/projects/pages/ProjectsPage';
import { ProjectPage } from '../features/projects/pages/ProjectPage';
import { resolveRoute } from './routes';
import { ExplorePage } from '../features/explore/pages/ExplorePage';
import { StatusPage } from './StatusPage';

interface AppProps {
  pathname: string;
  portfolio?: Portfolio | null;
  draft?: boolean;
}

export default function App({ pathname, portfolio = authoredPortfolio, draft = contentIsDraft }: AppProps) {
  const route = resolveRoute(pathname, portfolio);
  let page;
  switch (route.kind) {
    case 'home': page = <HomePage portfolio={portfolio} />; break;
    case 'resume': page = <ResumePage portfolio={portfolio} />; break;
    case 'explore': page = <ExplorePage portfolio={portfolio} />; break;
    case 'projects': page = <ProjectsPage portfolio={portfolio} />; break;
    case 'project': {
      const project = portfolio && getProjectById(portfolio, route.projectId);
      const phase = portfolio?.phases.find((candidate) => candidate.id === project?.phaseId);
      page = project && phase ? <ProjectPage project={project} phase={phase} /> : <StatusPage kind="not-found" />;
      break;
    }
    default: page = <StatusPage kind={route.kind} />;
  }
  return <SiteLayout mainClassName={route.kind === 'home' ? 'introduction' : 'content-page'}
    activePage={route.kind} draft={draft} hasContent={portfolio !== null}>
    {page}
  </SiteLayout>;
}
