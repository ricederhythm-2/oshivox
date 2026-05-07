'use client';

import { useMemo } from 'react';
import { WORLD_W, WORLD_H } from '@/types/map';

// ── Layout constants ──────────────────────────────────────────
const ROAD_SPACING = 300; // distance between road centers (px)
const ROAD_W       = 80;  // road width (px)
const ROAD_HALF    = ROAD_W / 2;
const SIDEWALK_IN  = 8;   // sidewalk inset from block edge
const BLDG_GAP     = 4;   // gap between buildings in a block

// ── Palette (night city) ──────────────────────────────────────
const C = {
  ground:        '#13122a',  // base ground (dark navy)
  sidewalk:      '#1b1932',  // city block floor
  road:          '#08081a',  // asphalt (high contrast vs ground)
  roadEdge:      '#28264a',  // road edge stripe
  centerLine:    'rgba(255,235,0,0.28)',  // dashed center line
  crosswalk:     'rgba(255,255,255,0.12)',
  park:          '#0c1e0e',
  parkBorder:    '#1e3e22',
  parkTree:      '#1a401e',
  streetLight:   'rgba(255,225,160,0.95)',
  streetGlow:    'rgba(255,210,120,0.35)',
};

// ── PRNG ─────────────────────────────────────────────────────
function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Block boundary computation ────────────────────────────────
function getBlockRanges(worldMax: number): [number, number][] {
  const edges = [0];
  for (let r = ROAD_SPACING; r < worldMax; r += ROAD_SPACING) {
    edges.push(r - ROAD_HALF);
    edges.push(r + ROAD_HALF);
  }
  edges.push(worldMax);
  // Even-indexed pairs are city blocks, odd-indexed pairs are roads
  const blocks: [number, number][] = [];
  for (let i = 0; i < edges.length - 1; i += 2) {
    blocks.push([edges[i], edges[i + 1]]);
  }
  return blocks;
}

// Road center positions
function getRoadCenters(worldMax: number): number[] {
  const out: number[] = [];
  for (let r = ROAD_SPACING; r < worldMax; r += ROAD_SPACING) out.push(r);
  return out;
}

// ── Building generation per block ────────────────────────────
interface Building {
  x: number; y: number; w: number; h: number; hue: number;
}

function buildingsForBlock(
  x1: number, y1: number, x2: number, y2: number,
  blockIdx: number,
): Building[] {
  const rand = mulberry32(blockIdx * 997 + 1);
  const bx1 = x1 + SIDEWALK_IN, bx2 = x2 - SIDEWALK_IN;
  const by1 = y1 + SIDEWALK_IN, by2 = y2 - SIDEWALK_IN;
  const bw = bx2 - bx1, bh = by2 - by1;
  if (bw < 24 || bh < 24) return [];

  const cols = 1 + Math.floor(rand() * 3);
  const rows = 1 + Math.floor(rand() * 2);
  const cellW = (bw - BLDG_GAP * (cols - 1)) / cols;
  const cellH = (bh - BLDG_GAP * (rows - 1)) / rows;
  const HUES = [215, 265, 190, 295, 175, 245, 260, 200];
  const buildings: Building[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const inset = 2 + Math.floor(rand() * 5);
      const x = bx1 + c * (cellW + BLDG_GAP) + inset;
      const y = by1 + r * (cellH + BLDG_GAP) + inset;
      const w = cellW - inset * 2;
      const h = cellH - inset * 2;
      if (w < 12 || h < 12) continue;
      const hue = HUES[Math.floor(rand() * HUES.length)];
      buildings.push({ x, y, w, h, hue });
    }
  }
  return buildings;
}

// Which block index (in the flat grid) is the park
const PARK_BLOCK_IDX = 8;

// ── Component ────────────────────────────────────────────────
export default function CityBackground() {
  const xBlocks  = useMemo(() => getBlockRanges(WORLD_W), []);
  const yBlocks  = useMemo(() => getBlockRanges(WORLD_H), []);
  const vRoads   = useMemo(() => getRoadCenters(WORLD_W), []);
  const hRoads   = useMemo(() => getRoadCenters(WORLD_H), []);

  // All blocks with their buildings
  const blocks = useMemo(() => {
    let idx = 0;
    return yBlocks.flatMap(([y1, y2]) =>
      xBlocks.map(([x1, x2]) => {
        const i = idx++;
        const isPark = i === PARK_BLOCK_IDX;
        return { x1, y1, x2, y2, isPark, buildings: isPark ? [] : buildingsForBlock(x1, y1, x2, y2, i) };
      }),
    );
  }, [xBlocks, yBlocks]);

  // Park trees (deterministic)
  const parkBlock = blocks[PARK_BLOCK_IDX];
  const trees = useMemo(() => {
    if (!parkBlock) return [];
    const rand = mulberry32(7777);
    const { x1, y1, x2, y2 } = parkBlock;
    return Array.from({ length: 10 }, (_, t) => ({
      x: x1 + 10 + rand() * (x2 - x1 - 20),
      y: y1 + 10 + rand() * (y2 - y1 - 20),
      r: 7 + rand() * 6,
    }));
  }, [parkBlock]);

  // Street-light positions: one per block side along H roads
  const streetLights = useMemo(() => {
    const lights: { x: number; y: number }[] = [];
    for (const ry of hRoads) {
      for (const [x1, x2] of xBlocks) {
        const mx = (x1 + x2) / 2;
        lights.push({ x: mx, y: ry - ROAD_HALF - 4 });
        lights.push({ x: mx, y: ry + ROAD_HALF + 1 });
      }
    }
    for (const rx of vRoads) {
      for (const [y1, y2] of yBlocks) {
        const my = (y1 + y2) / 2;
        lights.push({ x: rx - ROAD_HALF - 4, y: my });
        lights.push({ x: rx + ROAD_HALF + 1, y: my });
      }
    }
    return lights;
  }, [xBlocks, yBlocks, vRoads, hRoads]);

  return (
    <div
      className="absolute inset-0"
      style={{ width: WORLD_W, height: WORLD_H, background: C.ground }}
    >

      {/* ── CITY BLOCKS ────────────────────────────── */}
      {blocks.map((blk, i) => (
        <div key={`blk${i}`}>
          {/* Block floor (sidewalk or park) */}
          <div
            style={{
              position: 'absolute',
              left: blk.x1, top: blk.y1,
              width: blk.x2 - blk.x1,
              height: blk.y2 - blk.y1,
              background: blk.isPark ? C.park : C.sidewalk,
              border: blk.isPark ? `1px solid ${C.parkBorder}` : 'none',
            }}
          />
          {/* Buildings */}
          {blk.buildings.map((b, bi) => (
            <div
              key={`b${i}-${bi}`}
              style={{
                position: 'absolute',
                left: b.x, top: b.y, width: b.w, height: b.h,
                backgroundColor: `hsl(${b.hue} 32% 10%)`,
                border: `1px solid hsl(${b.hue} 48% 19%)`,
                // Window grid via repeating gradient
                backgroundImage: [
                  `repeating-linear-gradient(transparent 0, transparent 13px, rgba(0,0,0,0.72) 13px, rgba(0,0,0,0.72) 14px)`,
                  `repeating-linear-gradient(90deg, transparent 0, transparent 9px, rgba(0,0,0,0.72) 9px, rgba(0,0,0,0.72) 10px)`,
                ].join(', '),
                boxShadow: `0 0 6px hsl(${b.hue} 65% 30%) inset`,
              }}
            />
          ))}
        </div>
      ))}

      {/* Park trees */}
      {trees.map((t, i) => (
        <div
          key={`tree${i}`}
          style={{
            position: 'absolute',
            left: t.x - t.r, top: t.y - t.r,
            width: t.r * 2, height: t.r * 2,
            borderRadius: '50%',
            background: C.parkTree,
            boxShadow: `0 0 6px #2a5030`,
          }}
        />
      ))}

      {/* ── HORIZONTAL ROADS ───────────────────────── */}
      {hRoads.map((ry) => (
        <div
          key={`hr${ry}`}
          style={{
            position: 'absolute',
            left: 0, top: ry - ROAD_HALF,
            width: WORLD_W, height: ROAD_W,
            background: C.road,
            borderTop: `2px solid ${C.roadEdge}`,
            borderBottom: `2px solid ${C.roadEdge}`,
          }}
        >
          {/* Dashed center line */}
          <div style={{
            position: 'absolute', top: ROAD_HALF - 1,
            left: 0, right: 0, height: 2,
            backgroundImage: `repeating-linear-gradient(90deg, ${C.centerLine} 0,${C.centerLine} 18px,transparent 18px,transparent 30px)`,
          }} />
        </div>
      ))}

      {/* ── VERTICAL ROADS ─────────────────────────── */}
      {vRoads.map((rx) => (
        <div
          key={`vr${rx}`}
          style={{
            position: 'absolute',
            left: rx - ROAD_HALF, top: 0,
            width: ROAD_W, height: WORLD_H,
            background: C.road,
            borderLeft: `2px solid ${C.roadEdge}`,
            borderRight: `2px solid ${C.roadEdge}`,
          }}
        >
          {/* Dashed center line */}
          <div style={{
            position: 'absolute', left: ROAD_HALF - 1,
            top: 0, bottom: 0, width: 2,
            backgroundImage: `repeating-linear-gradient(${C.centerLine} 0,${C.centerLine} 18px,transparent 18px,transparent 30px)`,
          }} />
        </div>
      ))}

      {/* ── INTERSECTIONS + CROSSWALKS ─────────────── */}
      {hRoads.map((ry) =>
        vRoads.map((rx) => (
          <div
            key={`int${rx}-${ry}`}
            style={{
              position: 'absolute',
              left: rx - ROAD_HALF, top: ry - ROAD_HALF,
              width: ROAD_W, height: ROAD_W,
              background: C.road,
            }}
          >
            {/* Crosswalk — bottom edge */}
            <div style={{
              position: 'absolute', bottom: 0, left: 6, right: 6, height: 10,
              backgroundImage: `repeating-linear-gradient(90deg,${C.crosswalk} 0,${C.crosswalk} 5px,transparent 5px,transparent 9px)`,
            }} />
            {/* Crosswalk — right edge */}
            <div style={{
              position: 'absolute', right: 0, top: 6, bottom: 6, width: 10,
              backgroundImage: `repeating-linear-gradient(${C.crosswalk} 0,${C.crosswalk} 5px,transparent 5px,transparent 9px)`,
            }} />
          </div>
        )),
      )}

      {/* ── STREET LIGHTS ──────────────────────────── */}
      {streetLights.map((lt, i) => (
        <div
          key={`sl${i}`}
          style={{
            position: 'absolute',
            left: lt.x - 3, top: lt.y - 3,
            width: 6, height: 6,
            borderRadius: '50%',
            background: C.streetLight,
            boxShadow: `0 0 8px ${C.streetGlow}, 0 0 20px ${C.streetGlow}`,
            pointerEvents: 'none',
          }}
        />
      ))}

    </div>
  );
}
