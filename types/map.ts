import type { VLiver } from '@/components/SwipeCard';

export const WORLD_W         = 1800;
export const WORLD_H         = 1200;
export const TILE            = 32;
export const PLAYER_SPEED    = 5;
export const SPEECH_RADIUS   = 150;
export const INTERACT_RADIUS = 80;

export interface MapNPC {
  vliver: VLiver;
  x: number; // world coordinate (px)
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
