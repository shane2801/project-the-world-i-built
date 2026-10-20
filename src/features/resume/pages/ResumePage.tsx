import { useState } from 'react';
import type { Portfolio } from '../../../domain/career/types';
import { LinkList } from '../../../components/ui/LinkList';
import { ResumeNavigation } from '../components/ResumeNavigation';
import { ResumeExperience } from '../components/ResumeExperience';
import { ResumeProjects } from '../components/ResumeProjects';
import { ResumeSkills } from '../components/ResumeSkills';
import { WorkedAcross } from '../components/WorkedAcross';
import { ResumeBackground } from '../components/ResumeBackground';
import { TypewriterName } from '../components/TypewriterName';
import { ProfessionalTags } from '../components/ProfessionalTags';
import { ProfilePortrait } from '../components/ProfilePortrait';
import { ResumeBadges } from '../components/ResumeBadges';
import { defaultMotionSettings } from '../components/MotionOptions';
import { MandalaRail } from '../components/MandalaRail';
import { MoviePosterRail } from '../components/MoviePosterRail';
import { QuoteBanner } from '../components/QuoteBanner';
import { ResumeAbout } from '../components/ResumeAbout';
import { FloatingContactChat } from '../components/FloatingContactChat';
import { ResumeEducation } from '../components/ResumeEducation';
import { useResumeFragment } from '../hooks/useResumeFragment';
import '../interactive-resume.css';

export function ResumePage({ portfolio }: { portfolio: Portfolio | null }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [motionSettings, setMotionSettings] = useState(defaultMotionSettings);
  useResumeFragment();
  // Education has a source-backed stable ID; do not infer qualifications from prose.
  const education = portfolio?.achievements.filter((item) => ['first-class-degree', 'royal-college-education'].includes(item.id)) ?? [];
  return <div className="cv-document">
    <MandalaRail opacity={motionSettings.mandalaOpacity} eyeVisible={motionSettings.eyeVisible} eyeOpacity={motionSettings.eyeOpacity} />
    <MoviePosterRail shuffleToken={motionSettings.posterShuffleToken} opacity={motionSettings.posterOpacity} />
    <QuoteBanner paused={motionSettings.quotePaused} speed={motionSettings.quoteSpeed} />
    <header className="cv-intro" id="overview">
      <div className="cv-name-row">
        <div className="cv-identity">
          {portfolio && <ProfilePortrait />}
          <div className="cv-name-copy">
            {portfolio ? <TypewriterName name={portfolio.name.split(' ')[0]} paused={motionSettings.greetingMotionBlocked} resetToken={motionSettings.greetingResetToken} /> : <h1>Resume</h1>}
            {portfolio && <WorkedAcross />}
          </div>
        </div>
        {portfolio && <ResumeBadges portfolio={portfolio} />}
      </div>
      {portfolio ? <><ProfessionalTags headline={portfolio.headline} />
        <ResumeAbout biography={portfolio.introduction} />
        <div className="cv-quick-contact" id="contact"><LinkList showIcons links={portfolio.contacts.filter((link) => link.href !== 'https://shane.codes')} label="Quick contact" /></div></> :
        <p className="cv-muted">Career details will appear here after review.</p>}
      <ResumeBackground motion={motionSettings} onMotionChange={setMotionSettings} />
    </header>
    <div className="cv-layout">
      <ResumeNavigation />
      <div className="cv-content">
        <details className="cv-section" id="career" open>
          <summary><h2>Experience</h2><span className="cv-count">{portfolio?.experiences.length ?? 0} roles</span>
            <span className="cv-chevron" aria-hidden="true" /></summary>
          {portfolio ? <ResumeExperience portfolio={portfolio} /> : <p className="cv-muted">Career details are being prepared.</p>}
        </details>
        <details className="cv-section" id="resume-projects" open>
          <summary><h2>Projects</h2><span className="cv-count">{portfolio?.projects.length ?? 0}</span>
            <span className="cv-chevron" aria-hidden="true" /></summary>
          {portfolio ? <ResumeProjects portfolio={portfolio} /> : <p className="cv-muted">Project details have not been supplied yet.</p>}
        </details>
        <details className="cv-section" id="skills" open>
          <summary><h2>Skills</h2><span className="cv-chevron" aria-hidden="true" /></summary>
          <ResumeSkills skills={portfolio?.skills ?? []} motionBlocked={motionSettings.skillMotionBlocked} speed={motionSettings.skillSpeed} />
        </details>
        <details className="cv-section" id="education" open>
          <summary><h2>Education</h2><span className="cv-chevron" aria-hidden="true" /></summary>
          {portfolio?.phases.filter((phase) => !portfolio.experiences.some((item) => item.phaseId === phase.id))
            .map((phase) => <span className="cv-fragment-anchor" id={'phase-' + phase.id} key={phase.id} />)}
          <ResumeEducation records={education} />
        </details>
      </div>
    </div>
    {portfolio && <FloatingContactChat contacts={portfolio.contacts} name={portfolio.name} open={chatOpen} onOpenChange={setChatOpen} />}
  </div>;
}
