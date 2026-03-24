'use client';

import { useRef, useState, useCallback } from 'react';

/**
 * 1つの音声を排他再生する汎用フック。
 * FavoritesList / MyPostsList / AgencyContent で共通利用。
 */
export function useAudioPlayer() {
  const currentAudioRef           = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  /** 指定IDの音声を再生/停止トグルする */
  const togglePlay = useCallback((id: string, url: string) => {
    if (playingId === id) {
      currentAudioRef.current?.pause();
      setPlayingId(null);
      return;
    }
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    const audio = new Audio(url);
    audio.preload = 'none';
    audio.addEventListener('ended', () => setPlayingId(null));
    audio.play().catch(() => {});
    currentAudioRef.current = audio;
    setPlayingId(id);
  }, [playingId]);

  /** 削除など、特定IDの再生を強制停止する */
  const stopId = useCallback((id: string) => {
    if (playingId !== id) return;
    currentAudioRef.current?.pause();
    currentAudioRef.current = null;
    setPlayingId(null);
  }, [playingId]);

  return { playingId, togglePlay, stopId };
}
