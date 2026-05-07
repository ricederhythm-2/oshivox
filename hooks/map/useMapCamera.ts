'use client';

import { useState, useEffect } from 'react';
import type { PlayerState, CameraState } from '@/types/map';
import { WORLD_W, WORLD_H } from '@/types/map';

/**
 * Computes camera offset so the player is centered in the viewport.
 * Clamps the offset so the camera never shows outside the world.
 */
export function useMapCamera(playerPos: PlayerState): CameraState {
  const [viewport, setViewport] = useState({ w: 375, h: 667 });

  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const x = Math.max(0, Math.min(WORLD_W - viewport.w, playerPos.x - viewport.w / 2));
  const y = Math.max(0, Math.min(WORLD_H - viewport.h, playerPos.y - viewport.h / 2));

  return { x, y };
}
