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
 * Human-shaped RPG character.
 * The VLiver's image is shown as a circular "head" at the top,
 * below which is a stylized body + arms + legs built from CSS divs.
 * World coordinate (x, y) is anchored at the character's feet.
 */
export default function NPCSprite({ npc, isNear, isActive, isSeen }: Props) {
  const { vliver, x, y } = npc;
  const bodyColor = vliver.color || '#5a3a7a';

  return (
    // Anchor at feet (translate -50% X, -100% Y)
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -100%)',
        zIndex: 5,
        opacity: isSeen ? 0.25 : 1,
        pointerEvents: isSeen ? 'none' : 'auto',
      }}
    >
      <motion.div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* ── HEAD + speech bubble ── */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Speech bubble anchored above this container */}
          <SpeechBubble text={vliver.catchphrase} visible={isNear && !isSeen} />

          {/* Active pulse ring */}
          {isActive && !isSeen && (
            <div
              style={{
                position: 'absolute',
                width: 62,
                height: 62,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                border: `2px solid ${BRAND}`,
                boxShadow: `0 0 12px ${BRAND}90, 0 0 24px ${BRAND}40`,
                pointerEvents: 'none',
                animation: 'pulse-ring 1.6s ease-out infinite',
              }}
            />
          )}

          {/* Circular avatar — the "head" */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              overflow: 'hidden',
              border: isActive && !isSeen
                ? `3px solid ${BRAND}`
                : `2px solid ${bodyColor}`,
              boxShadow: isActive && !isSeen
                ? `0 0 16px ${BRAND}70, 0 3px 10px rgba(0,0,0,0.7)`
                : `0 3px 10px rgba(0,0,0,0.7)`,
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
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                {vliver.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* ── NECK ── */}
        <div
          style={{
            width: 10,
            height: 7,
            background: bodyColor,
            marginTop: -2,
            borderRadius: '0 0 3px 3px',
          }}
        />

        {/* ── TORSO + ARMS ── */}
        <div
          style={{
            position: 'relative',
            width: 36,
            height: 30,
            background: bodyColor,
            borderRadius: '5px 5px 3px 3px',
            marginTop: -1,
          }}
        >
          {/* Left arm */}
          <div
            style={{
              position: 'absolute',
              left: -10,
              top: 4,
              width: 10,
              height: 22,
              background: bodyColor,
              borderRadius: '4px 0 6px 6px',
            }}
          />
          {/* Right arm */}
          <div
            style={{
              position: 'absolute',
              right: -10,
              top: 4,
              width: 10,
              height: 22,
              background: bodyColor,
              borderRadius: '0 4px 6px 6px',
            }}
          />
        </div>

        {/* ── LEGS ── */}
        <div style={{ display: 'flex', gap: 3, marginTop: 1 }}>
          <div
            style={{
              width: 15,
              height: 20,
              background: '#1a1a3a',
              borderRadius: '2px 2px 5px 5px',
            }}
          />
          <div
            style={{
              width: 15,
              height: 20,
              background: '#1a1a3a',
              borderRadius: '2px 2px 5px 5px',
            }}
          />
        </div>

        {/* ── NAME LABEL ── */}
        {(isNear || isActive) && !isSeen && (
          <span
            style={{
              marginTop: 4,
              fontSize: 9,
              fontWeight: 700,
              color: '#fff',
              background: 'rgba(0,0,0,0.65)',
              padding: '2px 6px',
              borderRadius: 4,
              whiteSpace: 'nowrap',
              lineHeight: 1,
            }}
          >
            {vliver.name}
          </span>
        )}
      </motion.div>
    </div>
  );
}
