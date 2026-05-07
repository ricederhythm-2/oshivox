'use client';

import { motion } from 'framer-motion';
import type { MapNPC } from '@/types/map';
import SpeechBubble from './SpeechBubble';

const BRAND = '#E8344F';

interface Props {
  npc: MapNPC;
  isNear: boolean;
  isActive: boolean;
  isSeen: boolean;
}

/**
 * RPG-style chibi character.
 *
 * Layout (top → bottom, anchor at feet):
 *   [speech bubble]
 *   [○ avatar badge ○]   ← circular VLiver icon floating above
 *       thin line
 *   ●                    ← character head (generic)
 *   ┃ torso ┃            ← body in vliver.color
 *  arms   arms
 *   ▌ ▐                  ← legs
 */
export default function NPCSprite({ npc, isNear, isActive, isSeen }: Props) {
  const { vliver, x, y } = npc;
  const bodyColor = vliver.color || '#5a3a7a';

  return (
    // Anchor: feet at world coordinate (x, y)
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

        {/* ── FLOATING AVATAR BADGE ──────────────────── */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Speech bubble anchored above badge */}
          <SpeechBubble text={vliver.catchphrase} visible={isNear && !isSeen} />

          {/* Active pulse ring */}
          {isActive && !isSeen && (
            <div
              style={{
                position: 'absolute',
                width: 48, height: 48,
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

          {/* Circular avatar */}
          <div
            style={{
              width: 36, height: 36,
              borderRadius: '50%',
              overflow: 'hidden',
              border: isActive && !isSeen
                ? `2px solid ${BRAND}`
                : '2px solid rgba(255,255,255,0.55)',
              boxShadow: isActive && !isSeen
                ? `0 0 14px ${BRAND}70, 0 2px 8px rgba(0,0,0,0.8)`
                : '0 2px 8px rgba(0,0,0,0.8)',
              background: bodyColor,
              flexShrink: 0,
            }}
          >
            {vliver.imageUrl ? (
              <img
                src={vliver.imageUrl}
                alt={vliver.name}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div
                style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 15, color: '#fff',
                }}
              >
                {vliver.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Connector line badge → head */}
        <div
          style={{ width: 1, height: 8, background: 'rgba(255,255,255,0.22)', marginTop: 1 }}
        />

        {/* ── CHARACTER BODY ─────────────────────────── */}

        {/* Head */}
        <div
          style={{
            width: 14, height: 14,
            borderRadius: '50%',
            background: '#f0c090',
            border: '1px solid rgba(0,0,0,0.35)',
            marginTop: 0,
            flexShrink: 0,
          }}
        />

        {/* Torso + arms */}
        <div
          style={{
            position: 'relative',
            width: 20, height: 20,
            background: bodyColor,
            borderRadius: '4px 4px 2px 2px',
            marginTop: 1,
            flexShrink: 0,
          }}
        >
          {/* Left arm */}
          <div style={{ position: 'absolute', left: -7, top: 3, width: 7, height: 13, background: bodyColor, borderRadius: '3px 0 5px 5px' }} />
          {/* Right arm */}
          <div style={{ position: 'absolute', right: -7, top: 3, width: 7, height: 13, background: bodyColor, borderRadius: '0 3px 5px 5px' }} />
        </div>

        {/* Legs */}
        <div style={{ display: 'flex', gap: 2, marginTop: 1 }}>
          <div style={{ width: 8, height: 14, background: '#1a193a', borderRadius: '2px 2px 4px 4px' }} />
          <div style={{ width: 8, height: 14, background: '#1a193a', borderRadius: '2px 2px 4px 4px' }} />
        </div>

        {/* Name label */}
        {(isNear || isActive) && !isSeen && (
          <span
            style={{
              marginTop: 4,
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
