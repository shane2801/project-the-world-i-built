import { useEffect, useRef, useState } from 'react';

export interface ChatMessage {
  readonly id: string;
  readonly text: string;
  readonly time: string;
  readonly direction: 'incoming' | 'outgoing';
  readonly sample: boolean;
  readonly receipt?: 'sent' | 'read';
}

const sampleMessages: readonly ChatMessage[] = [
  { id: 'sample-1', text: "Hi Shane, I'd like to discuss a software project.", time: '09:41', direction: 'outgoing', sample: true, receipt: 'read' },
  { id: 'sample-2', text: 'Hi! Happy to connect. Tell me a little about what you have in mind.', time: '09:43', direction: 'incoming', sample: true },
  { id: 'sample-3', text: "Great, I'll put together a short overview.", time: '09:44', direction: 'outgoing', sample: true, receipt: 'read' },
];

export function useContactChatPreview() {
  const [messages, setMessages] = useState<readonly ChatMessage[]>(sampleMessages);
  const nextId = useRef(1);
  const pendingIds = messages.filter((message) => message.receipt === 'sent').map((message) => message.id).join(',');

  useEffect(() => {
    if (!pendingIds) return;
    const pending = new Set(pendingIds.split(','));
    // These receipts are a local UI simulation, never evidence of delivery or a human reading.
    const timer = window.setTimeout(() => {
      setMessages((previous) => previous.map((message) =>
        pending.has(message.id) ? { ...message, receipt: 'read' } : message));
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [pendingIds]);

  function addMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return false;
    const message: ChatMessage = {
      id: 'local-' + nextId.current++,
      text: trimmed.slice(0, 1000),
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      direction: 'outgoing', sample: false, receipt: 'sent',
    };
    // Assign identity before the updater so repeated React evaluation stays side-effect free.
    setMessages((previous) => [...previous, message]);
    return true;
  }
  return { messages, addMessage };
}
