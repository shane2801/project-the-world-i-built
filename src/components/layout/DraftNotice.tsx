export function DraftNotice({ hasContent }: { hasContent: boolean }) {
  return (
    <aside className="draft-notice" aria-label="Content status">
      <strong>Draft portfolio.</strong> {hasContent ?
        'Content supplied by the owner. Some project details and chapter placements are still under review.' :
        'Career details and publication permissions are pending. These pages contain no verified résumé or project claims.'}
    </aside>
  );
}
