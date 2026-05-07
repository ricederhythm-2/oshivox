'use client';

import { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import { useVlivers } from '@/hooks/useVlivers';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useNPCLayout } from '@/hooks/map/useNPCLayout';
import { usePlayerMovement } from '@/hooks/map/usePlayerMovement';
import { useMapCamera } from '@/hooks/map/useMapCamera';
import { useProximity } from '@/hooks/map/useProximity';
import MapWorld from './MapWorld';
import CityBackground from './CityBackground';
import PlayerSprite from './PlayerSprite';
import NPCSprite from './NPCSprite';
import InteractionPanel from './InteractionPanel';
import DPad from './DPad';

export default function RPGMapScreen() {
  const { vlivers }                               = useVlivers();
  const npcs                                      = useNPCLayout(vlivers);
  const { playerPos, pressDPad, releaseDPad }     = usePlayerMovement();
  const cameraOffset                              = useMapCamera(playerPos);
  const [seenIds, setSeenIds]                     = useState<Set<string>>(new Set());
  const { playingId, togglePlay }                 = useAudioPlayer();
  const { nearNPC, activeNPC }                    = useProximity(playerPos, npcs, seenIds);

  const handleSkip = (id: string) => {
    setSeenIds((prev) => new Set([...prev, id]));
  };

  const handleReset = () => {
    setSeenIds(new Set());
  };

  return (
    <div
      className="h-dvh overflow-hidden relative"
      style={{ background: '#0a0a1a' }}
    >
      {/* Header sits on top of the map (z-40) */}
      <AppHeader />

      {/* World */}
      <MapWorld cameraOffset={cameraOffset}>
        <CityBackground />
        {npcs.map((npc) => (
          <NPCSprite
            key={npc.vliver.id}
            npc={npc}
            isNear={nearNPC?.vliver.id === npc.vliver.id}
            isActive={activeNPC?.vliver.id === npc.vliver.id}
            isSeen={seenIds.has(npc.vliver.id)}
          />
        ))}
        <PlayerSprite pos={playerPos} />
      </MapWorld>

      {/* Interaction panel (position: fixed) */}
      <InteractionPanel
        activeNPC={activeNPC}
        playingId={playingId}
        onTogglePlay={togglePlay}
        onSkip={handleSkip}
      />

      {/* D-pad for mobile (position: fixed) */}
      <DPad onPress={pressDPad} onRelease={releaseDPad} />

      {/* Debug reset button */}
      <button
        onClick={handleReset}
        className="fixed z-50 rounded-full text-xs font-bold"
        style={{
          top: 'calc(env(safe-area-inset-top) + 68px)',
          right: 16,
          padding: '6px 12px',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.75)',
        }}
      >
        リセット
      </button>
    </div>
  );
}
