import type { VLiver } from '@/components/SwipeCard';

// ── Source region of maps.png that contains the full overview map ──────────
export const MAP_SRC_X = 0;
export const MAP_SRC_Y = 41;  // below the section title bar
export const MAP_SRC_W = 310;
export const MAP_SRC_H = 323;

// ── Game world dimensions (MAP_SRC * 5 scale) ─────────────────────────────
export const MAP_SCALE          = 5;
export const WORLD_W            = MAP_SRC_W * MAP_SCALE; // 1550
export const WORLD_H            = MAP_SRC_H * MAP_SCALE; // 1615

export const TILE               = 32;
export const PLAYER_SPEED       = 4;        // px per frame
export const SPEECH_RADIUS      = 150;
export const INTERACT_RADIUS    = 80;

// Collision: pixels darker than this luminance are treated as walls/buildings
export const COLLISION_LUM_MAX  = 88;

export interface MapNPC {
  vliver: VLiver;
  x: number;
  y: number;
}

export interface PlayerState {
  x: number;
  y: number;
}

export interface CameraState {
  x: number;
  y: number;
}
