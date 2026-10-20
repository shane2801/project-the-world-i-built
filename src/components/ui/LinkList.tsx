import { ContactIcon } from './ContactIcon';
import type { Link } from '../../domain/career/types';

export function LinkList({ links, label, showIcons = false }: { links: readonly Link[]; label: string; showIcons?: boolean }) {
  if (links.length === 0) return null;
  return (
    <ul className="link-list" aria-label={label}>
      {links.map((link, index) => <li key={`${link.href}-${index}`}><a href={link.href}>{showIcons && <ContactIcon href={link.href} />}{link.label}</a></li>)}
    </ul>
  );
}
