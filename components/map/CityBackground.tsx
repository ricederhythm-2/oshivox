'use client';

import { useMemo } from 'react';
import { WORLD_W, WORLD_H } from '@/types/map';

const ROAD_SPACING = 300; // px between road centers
const ROAD_W       = 80;  // road width (px)

/** Mulberry32 PRNG */
function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Building {
  x: number; y: number; w: number; h: number; hue: number;
}

function generateBuildings(): Building[] {
  const rand = mulberry32(12345);
  const result: Building[] = [];
  for (let i = 0; i < 60; i++) {
    const w = 50 + Math.floor(rand() * 110);
    const h = 70 + Math.floor(rand() * 210);
    const x = Math.floor(rand() * (WORLD_W - w - 40)) + 20;
    const y = Math.floor(rand() * (WORLD_H - h - 40)) + 20;
    const HUES = [210, 270, 190, 300, 180, 240];
    const hue = HUES[i % HUES.length];
    result.push({ x, y, w, h, hue });
  }
  return result;
}

export default function CityBackground() {
  const buildings = useMemo(generateBuildings, []);

  const hRoads: number[] = [];
  for (let y = ROAD_SPACING; y < WORLD_H; y += ROAD_SPACING) hRoads.push(y);

  const vRoads: number[] = [];
  for (let x = ROAD_SPACING; x < WORLD_W; x += ROAD_SPACING) vRoads.push(x);

  return (
    <div
      className="absolute inset-0"
      style={{ width: WORLD_W, height: WORLD_H, background: '#0a0a1a' }}
    >
      {/* Buildings — windows rendered via CSS gradient pattern */}
      {buildings.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: b.x,
            top: b.y,
            width: b.w,
            height: b.h,
            backgroundColor: `hsl(${b.hue} 38% 11%)`,
            border: `1px solid hsl(${b.hue} 55% 22%)`,
            backgroundImage: [
              // horizontal floor divisions
              `repeating-linear-gradient(
                transparent 0px, transparent 14px,
                rgba(0,0,0,0.75) 14px, rgba(0,0,0,0.75) 15px
              )`,
              // vertical column divisions
              `repeating-linear-gradient(
                90deg,
                transparent 0px, transparent 10px,
                rgba(0,0,0,0.75) 10px, rgba(0,0,0,0.75) 11px
              )`,
            ].join(', '),
            boxShadow: `0 0 6px hsl(${b.hue} 80% 40%) inset`,
          }}
        />
      ))}

      {/* Horizontal roads */}
      {hRoads.map((ry) => (
        <div
          key={`h${ry}`}
          className="absolute"
          style={{
            left: 0,
            top: ry - ROAD_W / 2,
            width: WORLD_W,
            height: ROAD_W,
            background: '#131328',
            borderTop: '2px solid #252545',
            borderBottom: '2px solid #252545',
          }}
        />
      ))}

      {/* Vertical roads */}
      {vRoads.map((rx) => (
        <div
          key={`v${rx}`}
          className="absolute"
          style={{
            left: rx - ROAD_W / 2,
            top: 0,
            width: ROAD_W,
            height: WORLD_H,
            background: '#131328',
            borderLeft: '2px solid #252545',
            borderRight: '2px solid #252545',
          }}
        />
      ))}

      {/* Road intersections */}
      {hRoads.map((ry) =>
        vRoads.map((rx) => (
          <div
            key={`i${rx}-${ry}`}
            className="absolute"
            style={{
              left: rx - ROAD_W / 2,
              top: ry - ROAD_W / 2,
              width: ROAD_W,
              height: ROAD_W,
              background: '#0e0e22',
            }}
          />
        )),
      )}

      {/* Ambient neon glow strips along roads */}
      {hRoads.map((ry) => (
        <div
          key={`gl-h${ry}`}
          className="absolute pointer-events-none"
          style={{
            left: 0,
            top: ry - ROAD_W / 2 - 2,
            width: WORLD_W,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #3030ff44, #ff30aa44, transparent)',
          }}
        />
      ))}
    </div>
  );
}
