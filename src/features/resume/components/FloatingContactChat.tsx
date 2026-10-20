import type { Link } from '../../../domain/career/types';
import { useEffect, useRef } from 'react';
import { ContactChat } from './ContactChat';

interface FloatingContactChatProps {
  name: string;
  contacts: readonly Link[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FloatingContactChat({ name, contacts, open, onOpenChange }: FloatingContactChatProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    panelRef.current?.querySelector('textarea')?.focus({ preventScroll: true });
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') { event.preventDefault(); onOpenChange(false); }
    }
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      opener?.focus({ preventScroll: true });
    };
  }, [open, onOpenChange]);

  return <div className="cv-floating-contact">
    {/* Keep the preview mounted when closed so drafts and local messages survive reopening. */}
    <div className="cv-floating-panel" id="floating-contact-chat" ref={panelRef}
      role="dialog" aria-labelledby="floating-contact-title" hidden={!open}>
      <div className="cv-floating-toolbar">
        <h2 id="floating-contact-title">Message Shane</h2>
        <button type="button" aria-label="Close contact chat" onClick={() => onOpenChange(false)}>
          <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
            <path d="m6 6 12 12M6 18 18 6" />
          </svg>
        </button>
      </div>
      <ContactChat name={name} contacts={contacts} />
    </div>
    <button className="cv-chat-launcher" type="button" aria-expanded={open}
      aria-controls="floating-contact-chat" aria-haspopup="dialog"
      aria-label={open ? 'Close contact chat' : 'Open contact chat preview'}
      onClick={() => onOpenChange(!open)}>
      <img src="/images/profile/shane.jpg" alt="" width={44} height={44} />
      <svg className="cv-launcher-symbol" viewBox="0 0 24 24" width={22} height={22}
        fill="currentColor" aria-hidden="true">
        <path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-9l-6 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M7 8h10M7 12h7" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" />
      </svg>
      {!open && <span className="cv-chat-launcher-label" aria-hidden="true">Let’s talk</span>}
    </button>
  </div>;
}
