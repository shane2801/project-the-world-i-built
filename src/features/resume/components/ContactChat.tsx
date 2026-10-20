import type { Link } from '../../../domain/career/types';
import { useEffect, useRef, useState } from 'react';
import { useContactChatPreview, type ChatMessage } from '../hooks/useContactChatPreview';
import '../contact-chat.css';

function ReadReceipt({ read }: { read: boolean }) {
  return <span className={'cv-chat-receipt' + (read ? ' is-read' : '')}
    aria-label={read ? 'Simulated read receipt' : 'Added locally'}>
    <svg viewBox="0 0 22 14" width={20} height={13} fill="none" stroke="currentColor"
      strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m1 7 4 4L15 1" />{read && <path d="m9 8 3 3L22 1" />}
    </svg>
  </span>;
}

function MessageBubble({ message }: { message: ChatMessage }) {
  return <div className={'cv-chat-message cv-chat-message--' + message.direction}>
    <span className="cv-chat-sender">{message.direction === 'incoming' ? 'Shane' : 'You'}{message.sample ? ' · sample' : ''}</span>
    <p>{message.text}</p>
    <span className="cv-chat-message-meta">
      <span>{message.time}</span>
      {message.direction === 'outgoing' && <ReadReceipt read={message.receipt === 'read'} />}
    </span>
  </div>;
}

export function ContactChat({ name, contacts }: { name: string; contacts: readonly Link[] }) {
  const directContacts = contacts.filter((contact) => contact.href.startsWith('mailto:') || contact.href.startsWith('https://wa.me/') || contact.href.startsWith('tel:'));
  const { messages, addMessage } = useContactChatPreview();
  const [draft, setDraft] = useState('');
  const historyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const localMessages = messages.filter((message) => !message.sample);

  useEffect(() => {
    const history = historyRef.current;
    if (history && messages.some((message) => !message.sample)) history.scrollTop = history.scrollHeight;
  }, [messages]);

  function submitMessage() {
    if (!addMessage(draft)) return;
    setDraft('');
    inputRef.current?.focus();
  }
  return <section className="cv-chat" aria-label="Contact conversation preview">
    <header className="cv-chat-header">
      <img src="/images/profile/shane.jpg" width={52} height={52} alt="" />
      <div><h3>{name}</h3><p>Software, AI &amp; thoughtful collaboration</p></div>
      <span className="cv-chat-preview-badge">Interactive preview</span>
    </header>
    <div className="cv-chat-history" ref={historyRef} role="log" aria-label="Conversation preview"
      aria-live="polite" aria-relevant="additions" tabIndex={0}>
      <p className="cv-chat-divider"><span>Example conversation</span></p>
      {messages.filter((message) => message.sample).map((message) => <MessageBubble key={message.id} message={message} />)}
      {localMessages.length > 0 && <p className="cv-chat-divider"><span>Your messages · this session</span></p>}
      {localMessages.map((message) => <MessageBubble key={message.id} message={message} />)}
    </div>
    <form className="cv-chat-composer" onSubmit={(event) => { event.preventDefault(); submitMessage(); }}>
      <label htmlFor="contact-chat-message">Try a message (not sent)</label>
      <div className="cv-chat-input-row">
        <textarea id="contact-chat-message" ref={inputRef} value={draft} rows={2} maxLength={1000}
          placeholder="Tell me what you'd like to build…" aria-describedby="contact-chat-direct"
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault(); submitMessage();
            }
          }} />
        <button type="submit" disabled={!draft.trim()} aria-label="Add message to conversation preview">
          <svg viewBox="0 0 24 24" width={21} height={21} fill="none" stroke="currentColor"
            strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m3 3 19 9-19 9 4-9-4-9ZM7 12h15" />
          </svg>
        </button>
      </div>
      <div className="cv-chat-composer-meta"><span>Enter to add · Shift + Enter for a new line</span><span>{draft.length}/1000</span></div>
    </form>
    <div className="cv-chat-direct" id="contact-chat-direct" aria-label="Direct contact">
      {directContacts.map((contact) => <a key={contact.href} href={contact.href}>
        {contact.href.startsWith('mailto:') ? contact.href.slice(7) : contact.label.replace(/^WhatsApp:\s*/, '')}
      </a>)}
    </div>
  </section>;
}
