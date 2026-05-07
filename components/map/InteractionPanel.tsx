'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Play, Pause, X } from 'lucide-react';
import type { MapNPC } from '@/types/map';
import { useFavorites } from '@/hooks/useFavorites';
import { usePreferences } from '@/hooks/usePreferences';
import { useCFScores } from '@/hooks/useCFScores';
import { useLog } from '@/context/ActionLoggerContext';

const BRAND = '#E8344F';

interface Props {
  activeNPC: MapNPC | null;
  playingId: string | null;
  onTogglePlay: (id: string, url: string) => void;
  onSkip: (id: string) => void;
}

export default function InteractionPanel({ activeNPC, playingId, onTogglePlay, onSkip }: Props) {
  const { addFavorite, likedIds } = useFavorites();
  const { recordLike, recordPass } = usePreferences();
  const { saveAction } = useCFScores();
  const log = useLog();

  const isPlaying = activeNPC ? playingId === activeNPC.vliver.id : false;
  const isLiked   = activeNPC ? likedIds.has(activeNPC.vliver.id) : false;

  const handleLike = () => {
    if (!activeNPC) return;
    const { vliver } = activeNPC;
    addFavorite(vliver.id);
    recordLike(vliver.tags);
    saveAction(vliver.id, 'like');
    log('favorite_add', { postId: vliver.id });
    onSkip(vliver.id);
  };

  const handleSkip = () => {
    if (!activeNPC) return;
    const { vliver } = activeNPC;
    recordPass(vliver.tags);
    saveAction(vliver.id, 'pass');
    onSkip(vliver.id);
  };

  const handleTogglePlay = () => {
    if (!activeNPC) return;
    onTogglePlay(activeNPC.vliver.id, activeNPC.vliver.voiceUrl);
  };

  return (
    <AnimatePresence>
      {activeNPC && (
        <motion.div
          key={activeNPC.vliver.id}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div
            className="mx-auto max-w-[430px] rounded-t-2xl px-5 pt-4 pb-5"
            style={{
              background: 'rgba(12,12,28,0.97)',
              borderTop: '1px solid rgba(255,255,255,0.12)',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              borderRight: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* VLiver info row */}
            <div className="flex items-center gap-3 mb-4">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: `2px solid ${BRAND}`,
                  flexShrink: 0,
                }}
              >
                {activeNPC.vliver.imageUrl ? (
                  <img
                    src={activeNPC.vliver.imageUrl}
                    alt={activeNPC.vliver.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-xl font-bold"
                    style={{ background: activeNPC.vliver.color, color: '#fff' }}
                  >
                    {activeNPC.vliver.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm leading-tight text-white">
                  {activeNPC.vliver.name}
                </p>
                <p
                  className="text-xs leading-tight mt-0.5 truncate"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {activeNPC.vliver.catchphrase}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              {/* Play / Pause */}
              <button
                onClick={handleTogglePlay}
                disabled={!activeNPC.vliver.voiceUrl}
                className="flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 disabled:opacity-40"
                style={{
                  width: 48,
                  height: 48,
                  background: BRAND,
                  boxShadow: `0 0 14px ${BRAND}80`,
                  flexShrink: 0,
                }}
                aria-label={isPlaying ? '停止' : '再生'}
              >
                {isPlaying
                  ? <Pause className="w-5 h-5 text-white" />
                  : <Play  className="w-5 h-5 text-white" style={{ marginLeft: 2 }} />
                }
              </button>

              {/* 🤟 推す */}
              <button
                onClick={handleLike}
                disabled={isLiked}
                className="flex-1 flex items-center justify-center gap-2 rounded-full py-3 font-bold text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                style={{
                  background: isLiked ? 'rgba(232,52,79,0.25)' : BRAND,
                  color: '#fff',
                  border: isLiked ? `1px solid ${BRAND}` : 'none',
                }}
                aria-label="推す"
              >
                <span className="text-lg leading-none">🤟</span>
                <span>{isLiked ? '推し済み' : '推す'}</span>
              </button>

              {/* ✕ Skip */}
              <button
                onClick={handleSkip}
                className="flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
                style={{
                  width: 48,
                  height: 48,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  flexShrink: 0,
                }}
                aria-label="スキップ"
              >
                <X className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.6)' }} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
