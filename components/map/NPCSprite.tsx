'use client';

import { motion } from 'framer-motion';
import type { MapNPC } from '@/types/map';
import SpeechBubble from './SpeechBubble';

const BRAND = '#E8344F';

// ── Sprite-sheet constants (measured from character.png 1536×1024) ──────────
// 10 cols × 5 rows; we use only rows 0-3 (front-facing, 40 characters)
const COLS = 10;
const FRONT_ROWS = 4;

// Left-edge X of each column (original pixels)
const COL_X = [68, 215, 358, 504, 655, 807, 948, 1089, 1236, 1376] as const;
// Top-edge Y of each front-facing row (original pixels)
const ROW_Y = [56, 233, 410, 594] as const;

// Render scale and display size
const SCALE   = 0.45;
const DISP_W  = 44;   // px — wide enough for any column
const DISP_H  = 74;   // px — tall enough for tallest row (163 × 0.45 ≈ 73)
const BG_W    = Math.round(1536 * SCALE); // 691
const BG_H    = Math.round(1024 * SCALE); // 461

/** Derive a numeric seed from vliver.id */
function idSeed(id: string): number {
  return id.split('').reduce((acc, ch) => (acc + ch.charCodeAt(0)) | 0, 0);
}

/** Return CSS background-* properties that show one character from the sheet */
function spriteStyle(vliverId: string): React.CSSProperties {
  const idx = Math.abs(idSeed(vliverId)) % (COLS * FRONT_ROWS);
  const col  = idx % COLS;
  const row  = Math.floor(idx / COLS);
  return {
    width:              DISP_W,
    height:             DISP_H,
    backgroundImage:    'url(/character.png)',
    backgroundSize:     `${BG_W}px ${BG_H}px`,
    backgroundRepeat:   'no-repeat',
    backgroundPosition: `${-Math.round(COL_X[col] * SCALE)}px ${-Math.round(ROW_Y[row] * SCALE)}px`,
  };
}

// ── Component ────────────────────────────────────────────────────────────────

interface Props {
  npc: MapNPC;
  isNear: boolean;
  isActive: boolean;
  isSeen: boolean;
}

/**
 * RPG NPC sprite.
 *
 * Appearance (top → bottom):
 *   [speech bubble]
 *   [○ VLiver icon badge ○]   ← circular avatar, floating "name tag"
 *       thin connector line
 *   [ sprite from sheet  ]    ← character.png chibi character
 *   [name label]
 *
 * World coordinate (x, y) is anchored at the character's feet.
 */
export default function NPCSprite({ npc, isNear, isActive, isSeen }: Props) {
  const { vliver, x, y } = npc;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -100%)',
        zIndex: 5,
        opacity: isSeen ? 0.22 : 1,
        pointerEvents: isSeen ? 'none' : 'auto',
      }}
    >
      <motion.div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >

        {/* ── FLOATING ICON BADGE ──────────────────────── */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Speech bubble */}
          <SpeechBubble text={vliver.catchphrase} visible={isNear && !isSeen} />

          {/* Active pulse ring */}
          {isActive && !isSeen && (
            <div
              style={{
                position: 'absolute',
                width: 38, height: 38,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                border: `2px solid ${BRAND}`,
                boxShadow: `0 0 10px ${BRAND}80`,
                animation: 'pulse-ring 1.6s ease-out infinite',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Circular VLiver icon */}
          <div
            style={{
              width: 28, height: 28,
              borderRadius: '50%',
              overflow: 'hidden',
              border: isActive && !isSeen
                ? `2px solid ${BRAND}`
                : '2px solid rgba(255,255,255,0.6)',
              boxShadow: isActive && !isSeen
                ? `0 0 10px ${BRAND}70, 0 1px 6px rgba(0,0,0,0.8)`
                : '0 1px 6px rgba(0,0,0,0.8)',
              background: vliver.color || '#333',
              flexShrink: 0,
            }}
          >
            {vliver.imageUrl ? (
              <img
                src={vliver.imageUrl}
                alt={vliver.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            ) : (
              <div
                style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 12, color: '#fff',
                }}
              >
                {vliver.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Connector: badge → character head */}
        <div
          style={{ width: 1, height: 6, background: 'rgba(255,255,255,0.25)', marginTop: 1 }}
        />

        {/* ── CHARACTER SPRITE ──────────────────────────── */}
        <div style={spriteStyle(vliver.id)} />

        {/* Name label */}
        {(isNear || isActive) && !isSeen && (
          <span
            style={{
              marginTop: 3,
              fontSize: 9, fontWeight: 700, color: '#fff',
              background: 'rgba(0,0,0,0.65)',
              padding: '2px 5px', borderRadius: 3,
              whiteSpace: 'nowrap', lineHeight: 1,
            }}
          >
            {vliver.name}
          </span>
        )}

      </motion.div>
    </div>
  );
}
