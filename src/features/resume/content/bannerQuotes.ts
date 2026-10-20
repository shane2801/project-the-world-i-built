import rawQuotes from '../../../content/quotes.json';

export interface BannerQuote {
  readonly text: string;
  readonly author?: string;
}

// Ignore empty or malformed entries so an unfinished JSON edit cannot break the resume.
const entries: unknown = rawQuotes;
export const bannerQuotes: readonly BannerQuote[] = Array.isArray(entries) ? entries.flatMap((item: unknown) => {
  if (!item || typeof item !== 'object') return [];
  const entry = item as Record<string, unknown>;
  if (typeof entry.text !== 'string' || !entry.text.trim()) return [];
  return [{ text: entry.text.trim(), author: typeof entry.author === 'string' ? entry.author.trim() : undefined }];
}) : [];
