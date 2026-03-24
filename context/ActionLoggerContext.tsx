'use client';

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { createClient } from '@/lib/supabase/client';
import { logAction, type ActionType } from '@/lib/logAction';

type LogFn = (action: ActionType, extras?: { postId?: string; pagePath?: string }) => void;

const ActionLoggerContext = createContext<LogFn>(() => {});

/**
 * アクションログを全体で1つの Supabase クライアント・auth サブスクリプションで管理するプロバイダー。
 * onAuthStateChange は INITIAL_SESSION をネットワーク呼び出しなしで即座に発火するため、
 * auth.getUser() を別途呼ばないようにしている。
 */
export function ActionLoggerProvider({ children }: { children: ReactNode }) {
  const userIdRef   = useRef<string | null>(null);
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabaseRef.current = supabase;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      userIdRef.current = session?.user?.id ?? null;
    });

    return () => subscription.unsubscribe();
  }, []);

  const log = useCallback(
    (action: ActionType, extras?: { postId?: string; pagePath?: string }) => {
      const supabase = supabaseRef.current;
      if (!supabase) return;
      logAction(supabase, userIdRef.current, action, extras);
    },
    [],
  );

  return (
    <ActionLoggerContext.Provider value={log}>
      {children}
    </ActionLoggerContext.Provider>
  );
}

export function useLog() {
  return useContext(ActionLoggerContext);
}
