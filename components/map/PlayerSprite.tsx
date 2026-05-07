'use client';

import type { PlayerState } from '@/types/map';

export default function PlayerSprite({ pos }: { pos: PlayerState }) {
  return (
    <div
      className="absolute flex flex-col items-center gap-0.5 pointer-events-none"
      style={{
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
      }}
    >
      <div
        style={{
          fontSize: 22,
          filter: 'drop-shadow(0 0 8px rgba(232,52,79,0.9))',
          color: '#E8344F',
          lineHeight: 1,
        }}
      >
        ▲
      </div>
      <span
        className="font-bold leading-none"
        style={{ fontSize: 9, color: 'rgba(255,255,255,0.75)' }}
      >
        YOU
      </span>
    </div>
  );
}
