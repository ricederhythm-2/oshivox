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

export default function NPCSprite({ npc, isNear, isActive, isSeen }: Props) {
  const { vliver, x, y } = npc;

  return (
    // Outer div handles absolute world positioning + centering
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        zIndex: 5,
        opacity: isSeen ? 0.3 : 1,
        pointerEvents: isSeen ? 'none' : 'auto',
      }}
    >
      {/* Inner motion.div provides floating animation */}
      <motion.div
        className="flex flex-col items-center"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Relative container for speech bubble absolute positioning */}
        <div className="relative flex flex-col items-center">
          <SpeechBubble text={vliver.catchphrase} visible={isNear && !isSeen} />

          {/* Glowing ring for active NPC */}
          {isActive && !isSeen && (
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 76,
                height: 92,
                top: -6,
                left: '50%',
                transform: 'translateX(-50%)',
                border: `2px solid ${BRAND}`,
                boxShadow: `0 0 14px ${BRAND}80, 0 0 28px ${BRAND}40`,
              }}
            />
          )}

          {/* Character image */}
          <div
            style={{
              width: 64,
              height: 80,
              borderRadius: 8,
              overflow: 'hidden',
              border: isActive && !isSeen
                ? `2px solid ${BRAND}`
                : '2px solid rgba(255,255,255,0.18)',
              boxShadow: isActive
                ? `0 0 18px ${BRAND}60`
                : '0 2px 10px rgba(0,0,0,0.6)',
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
                className="w-full h-full flex items-center justify-center text-2xl font-bold"
                style={{ background: vliver.color || '#333', color: '#fff' }}
              >
                {vliver.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Name label — shown when near or active */}
        {(isNear || isActive) && !isSeen && (
          <span
            className="mt-1 font-bold leading-none px-1.5 py-0.5 rounded"
            style={{
              fontSize: 9,
              color: '#fff',
              background: 'rgba(0,0,0,0.65)',
              whiteSpace: 'nowrap',
            }}
          >
            {vliver.name}
          </span>
        )}
      </motion.div>
    </div>
  );
}
