export function ProfessionalTags({ headline }: { headline: string }) {
  return <ul className="cv-title-tags" aria-label="Professional focus">
    {headline.split('|').map((title) => <li key={title.trim()}>{title.trim()}</li>)}
  </ul>;
}
