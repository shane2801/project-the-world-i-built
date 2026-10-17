import { SiteLayout } from '../components/layout/SiteLayout';
import { HomePage } from '../features/home/pages/HomePage';

export default function App() {
  return (
    <SiteLayout mainClassName="introduction">
      <HomePage />
    </SiteLayout>
  );
}
