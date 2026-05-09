'use client';

import { useState, useRef, useEffect } from 'react';
import type { PlayerState } from '@/types/map';
import { WORLD_W, WORLD_H, PLAYER_SPEED } from '@/types/map';

type Dir = 'up' | 'down' | 'left' | 'right';

const DIR_KEY: Record<Dir, string> = {
  up:    'ArrowUp',
  down:  'ArrowDown',
  left:  'ArrowLeft',
  right: 'ArrowRight',
};

const ARROW_KEYS = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

type ResolveFn = (px: number, py: number, nx: number, ny: number) => { x: number; y: number };

/**
 * Manages player position via keyboard + D-pad.
 * Accepts a `resolveMovement` function from useCollision to apply wall collisions.
 */
export function usePlayerMovement(
  resolveMovement: ResolveFn = (_px, _py, nx, ny) => ({ x: nx, y: ny }),
) {
  const [playerPos, setPlayerPos] = useState<PlayerState>({
    x: WORLD_W / 2,
    y: WORLD_H / 2,
  });

  const keysRef          = useRef<Set<string>>(new Set());
  const rafRef           = useRef<number>(0);
  const resolveRef       = useRef<ResolveFn>(resolveMovement);

  // Keep resolveRef current without restarting the rAF loop
  useEffect(() => { resolveRef.current = resolveMovement; }, [resolveMovement]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (ARROW_KEYS.has(e.key)) { e.preventDefault(); keysRef.current.add(e.key); }
    };
    const onKeyUp = (e: KeyboardEvent) => { keysRef.current.delete(e.key); };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const loop = () => {
      const keys = keysRef.current;
      if (keys.size > 0) {
        setPlayerPos((prev) => {
          let nx = prev.x, ny = prev.y;
          if (keys.has('ArrowUp'))    ny -= PLAYER_SPEED;
          if (keys.has('ArrowDown'))  ny += PLAYER_SPEED;
          if (keys.has('ArrowLeft'))  nx -= PLAYER_SPEED;
          if (keys.has('ArrowRight')) nx += PLAYER_SPEED;

          // World boundary clamp
          nx = Math.max(0, Math.min(WORLD_W, nx));
          ny = Math.max(0, Math.min(WORLD_H, ny));

          // Wall collision with sliding
          const resolved = resolveRef.current(prev.x, prev.y, nx, ny);
          if (resolved.x === prev.x && resolved.y === prev.y) return prev;
          return resolved;
        });
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []); // intentionally empty — resolveRef keeps it current

  const pressDPad   = (dir: Dir) => keysRef.current.add(DIR_KEY[dir]);
  const releaseDPad = (dir: Dir) => keysRef.current.delete(DIR_KEY[dir]);

  return { playerPos, pressDPad, releaseDPad };
}
