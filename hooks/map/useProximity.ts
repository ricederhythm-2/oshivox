'use client';

import { useMemo } from 'react';
import type { MapNPC, PlayerState } from '@/types/map';
import { SPEECH_RADIUS, INTERACT_RADIUS } from '@/types/map';

function dist(ax: number, ay: number, bx: number, by: number): number {
  return Math.hypot(ax - bx, ay - by);
}

/**
 * Returns the nearest non-seen NPC within each radius.
 * nearNPC   → within SPEECH_RADIUS  (shows speech bubble)
 * activeNPC → within INTERACT_RADIUS (shows interaction panel, auto-plays voice)
 */
export function useProximity(
  playerPos: PlayerState,
  npcs: MapNPC[],
  seenIds: Set<string>,
): { nearNPC: MapNPC | null; activeNPC: MapNPC | null } {
  return useMemo(() => {
    let nearNPC: MapNPC | null = null;
    let activeNPC: MapNPC | null = null;
    let nearDist = Infinity;

    for (const npc of npcs) {
      if (seenIds.has(npc.vliver.id)) continue;
      const d = dist(playerPos.x, playerPos.y, npc.x, npc.y);
      if (d < nearDist) {
        nearDist = d;
        nearNPC   = d < SPEECH_RADIUS   ? npc : null;
        activeNPC = d < INTERACT_RADIUS ? npc : null;
      }
    }

    return { nearNPC, activeNPC };
  }, [playerPos, npcs, seenIds]);
}
