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

/**
 * Manages player position via keyboard arrow keys and D-pad events.
 * Uses requestAnimationFrame for smooth movement.
 * Only updates state when keys are actually held down.
 */
export function usePlayerMovement() {
  const [playerPos, setPlayerPos] = useState<PlayerState>({
    x: WORLD_W / 2,
    y: WORLD_H / 2,
  });
  const keysRef = useRef<Set<string>>(new Set());
  const rafRef  = useRef<number>(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (ARROW_KEYS.has(e.key)) {
        e.preventDefault();
        keysRef.current.add(e.key);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const loop = () => {
      const keys = keysRef.current;
      if (keys.size > 0) {
        setPlayerPos((prev) => {
          let { x, y } = prev;
          if (keys.has('ArrowUp'))    y -= PLAYER_SPEED;
          if (keys.has('ArrowDown'))  y += PLAYER_SPEED;
          if (keys.has('ArrowLeft'))  x -= PLAYER_SPEED;
          if (keys.has('ArrowRight')) x += PLAYER_SPEED;
          x = Math.max(0, Math.min(WORLD_W, x));
          y = Math.max(0, Math.min(WORLD_H, y));
          if (x === prev.x && y === prev.y) return prev; // no-op
          return { x, y };
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
  }, []);

  const pressDPad = (dir: Dir) => {
    keysRef.current.add(DIR_KEY[dir]);
  };

  const releaseDPad = (dir: Dir) => {
    keysRef.current.delete(DIR_KEY[dir]);
  };

  return { playerPos, pressDPad, releaseDPad };
}
