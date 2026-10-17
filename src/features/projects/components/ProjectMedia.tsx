import type { Media } from '../../../domain/career/types';

export function ProjectMedia({ media }: { media: readonly Media[] }) {
  if (media.length === 0) return null;
  return <section aria-labelledby="media-heading">
    <h2 id="media-heading">Project evidence</h2>
    {media.map((item, index) => <figure key={`${item.src}-${index}`}>
      {item.kind === 'video' ?
        <video controls preload="metadata" aria-label={item.alt}><source src={item.src} /></video> :
        <img src={item.src} alt={item.alt} loading="lazy" />}
      <figcaption>{item.alt}</figcaption>
    </figure>)}
  </section>;
}
