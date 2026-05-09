'use client';

import { useRef, useEffect, useCallback } from 'react';
import {
  WORLD_W, WORLD_H,
  MAP_SRC_X, MAP_SRC_Y, MAP_SRC_W, MAP_SRC_H,
  COLLISION_LUM_MAX, COLLISION_SAT_MAX,
} from '@/types/map';

// How many world-pixels to sample around the player center for collision
const HALF = 8;

/**
 * Loads map_scramble.png onto an off-screen canvas and provides a fast
 * walkability lookup by reading pixel luminance / saturation.
 *
 * Classification:
 *   lum < COLLISION_LUM_MAX           → dark outline / wall → blocked
 *   sat > COLLISION_SAT_MAX           → vivid building sign / facade → blocked
 *   green-dominant & saturated         → tree / plant → blocked
 *   everything else                    → walkable (road, sidewalk, crosswalk)
 *
 * The check uses four corner points of the player's bounding box so the
 * player can't clip through thin walls.
 */
export function useCollision() {
  const pixelData = useRef<Uint8ClampedArray | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/map_scramble.png';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = MAP_SRC_W;
      canvas.height = MAP_SRC_H;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(
        img,
        MAP_SRC_X, MAP_SRC_Y, MAP_SRC_W, MAP_SRC_H,
        0,         0,         MAP_SRC_W,  MAP_SRC_H,
      );
      pixelData.current = ctx.getImageData(0, 0, MAP_SRC_W, MAP_SRC_H).data;
    };
  }, []);

  /** Return true if (wx, wy) in world-space is a walkable tile. */
  const isWalkablePoint = useCallback((wx: number, wy: number): boolean => {
    const data = pixelData.current;
    if (!data) return true; // still loading → allow movement

    const mx = Math.max(0, Math.min(MAP_SRC_W - 1, Math.round(wx * MAP_SRC_W / WORLD_W)));
    const my = Math.max(0, Math.min(MAP_SRC_H - 1, Math.round(wy * MAP_SRC_H / WORLD_H)));
    const idx = (my * MAP_SRC_W + mx) * 4;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    const lum = (r + g + b) / 3;
    const sat = Math.max(r, g, b) - Math.min(r, g, b);

    if (lum < COLLISION_LUM_MAX) return false;           // dark outline / wall
    if (sat > COLLISION_SAT_MAX) return false;           // vivid sign or building facade
    if (g > r + 10 && g > b + 35 && sat > 50) return false; // tree / plant (green)

    return true;
  }, []);

  /**
   * Check walkability for the player's bounding box (four corners + center).
   * Sliding: if the full move is blocked, try axis-separated movement.
   * Returns the resolved { x, y } position.
   */
  const resolveMovement = useCallback(
    (
      prevX: number, prevY: number,
      nextX: number, nextY: number,
    ): { x: number; y: number } => {
      const clear = (cx: number, cy: number) => {
        return (
          isWalkablePoint(cx,        cy) &&
          isWalkablePoint(cx - HALF, cy - HALF) &&
          isWalkablePoint(cx + HALF, cy - HALF) &&
          isWalkablePoint(cx - HALF, cy + HALF) &&
          isWalkablePoint(cx + HALF, cy + HALF)
        );
      };

      if (clear(nextX, nextY)) return { x: nextX, y: nextY }; // full move OK
      if (clear(nextX, prevY)) return { x: nextX, y: prevY }; // slide X
      if (clear(prevX, nextY)) return { x: prevX, y: nextY }; // slide Y
      return { x: prevX, y: prevY };                           // fully blocked
    },
    [isWalkablePoint],
  );

  return { resolveMovement };
}
