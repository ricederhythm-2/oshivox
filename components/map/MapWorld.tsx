'use client';

import type { CameraState } from '@/types/map';
import { WORLD_W, WORLD_H } from '@/types/map';

interface Props {
  cameraOffset: CameraState;
  children: React.ReactNode;
}

/**
 * World container.
 * Applies camera offset as a CSS translate so the player stays centered
 * while the world scrolls underneath.
 */
export default function MapWorld({ cameraOffset, children }: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        style={{
          position: 'absolute',
          width: WORLD_W,
          height: WORLD_H,
          transform: `translate(${-cameraOffset.x}px, ${-cameraOffset.y}px)`,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
