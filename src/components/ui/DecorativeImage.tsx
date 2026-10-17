import { useEffect, useRef } from 'react';
import type { ImgHTMLAttributes } from 'react';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'onError' | 'children'>;

// A static-page image may fail before hydration can attach its error handler.
export function DecorativeImage({ src, ...props }: Props) {
  const image = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (image.current?.complete && image.current.naturalWidth === 0) image.current.hidden = true;
  }, [src]);
  return <img {...props} src={src} ref={image} alt=""
    onError={(event) => { event.currentTarget.hidden = true; }} />;
}
