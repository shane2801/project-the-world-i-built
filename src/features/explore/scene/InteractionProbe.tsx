import { useRef } from 'react';
import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Chapter, Point, World } from '../world/types';
import { interactionAt } from '../world/interaction';
import type { Interaction } from '../world/interaction';

export function InteractionProbe({ position, chapter, world, onChange }: {
  position: RefObject<Point>; chapter: Chapter; world: World; onChange: (value: Interaction | null) => void;
}) {
  const previous = useRef<string | null>(null);
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    elapsed.current += delta;
    if (previous.current !== null && elapsed.current < .15) return;
    elapsed.current = 0;
    const value = interactionAt(position.current, chapter, world);
    const key = value ? value.kind + value.id : '';
    if (key !== previous.current) { previous.current = key; onChange(value); }
  });
  return null;
}
