'use client';

import { useMemo } from 'react';
import type { VLiver } from '@/components/SwipeCard';
import type { MapNPC } from '@/types/map';
import { WORLD_W, WORLD_H, TILE } from '@/types/map';

const MARGIN = 120; // px from world edges

/** Mulberry32 pseudo-random number generator (deterministic) */
function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Derive a numeric seed from a vliver id string */
function idToSeed(id: string): number {
  return id.split('').reduce((acc, ch) => (acc + ch.charCodeAt(0)) | 0, 0);
}

/**
 * Maps vlivers to deterministic world positions.
 * Position is derived from vliver.id so it stays stable across renders.
 */
export function useNPCLayout(vlivers: VLiver[]): MapNPC[] {
  return useMemo(() => {
    return vlivers.map((vliver) => {
      const rand = mulberry32(idToSeed(vliver.id));
      const x = MARGIN + rand() * (WORLD_W - MARGIN * 2);
      const y = MARGIN + rand() * (WORLD_H - MARGIN * 2);
      return {
        vliver,
        x: Math.round(x / TILE) * TILE,
        y: Math.round(y / TILE) * TILE,
      };
    });
  }, [vlivers]);
}
