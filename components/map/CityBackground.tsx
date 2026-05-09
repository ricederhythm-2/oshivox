'use client';

import {
  WORLD_W, WORLD_H,
  MAP_SRC_X, MAP_SRC_Y, MAP_SRC_W, MAP_SRC_H, MAP_SCALE,
} from '@/types/map';

// Full-image dimensions of maps.png
const IMG_W = 1536;
const IMG_H = 1024;

// Background-size needed so the full-map section fills WORLD_W × WORLD_H exactly
const BG_W = IMG_W * MAP_SCALE; // 7680
const BG_H = IMG_H * MAP_SCALE; // 5120

// How far to shift the image so the section's top-left aligns with (0,0)
const BG_OX = -(MAP_SRC_X * MAP_SCALE); // 0
const BG_OY = -(MAP_SRC_Y * MAP_SCALE); // -205

export default function CityBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: WORLD_W,
        height: WORLD_H,
        backgroundImage: 'url(/maps.png)',
        backgroundSize: `${BG_W}px ${BG_H}px`,
        backgroundPosition: `${BG_OX}px ${BG_OY}px`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
      }}
    />
  );
}
