import type { VLiver } from '@/components/SwipeCard';

// ── map_scramble.png: full 1536×1024 image, no cropping needed ─────────────
export const MAP_SRC_X = 0;
export const MAP_SRC_Y = 0;
export const MAP_SRC_W = 1536;
export const MAP_SRC_H = 1024;

// ── Game world dimensions (MAP_SRC * 2 scale) ─────────────────────────────
export const MAP_SCALE          = 2;
export const WORLD_W            = MAP_SRC_W * MAP_SCALE; // 3072
export const WORLD_H            = MAP_SRC_H * MAP_SCALE; // 2048

export const TILE               = 32;
export const PLAYER_SPEED       = 4;        // px per frame
export const SPEECH_RADIUS      = 150;
export const INTERACT_RADIUS    = 80;

// Collision: pixels darker than this luminance are treated as walls/buildings
export const COLLISION_LUM_MAX  = 70;
// Collision: saturation above this on non-road pixels = building sign/facade
export const COLLISION_SAT_MAX  = 130;

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
