'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface VliverProfile {
  id: string;
  owner_id: string;
  name: string;
  handle: string;
  image_path: string | null;
  color: string;
  tags: string[];
  description: string;
  twitter_handle: string;
  platform_links: Record<string, string>;
}

interface ProfileContextValue {
  profile: VliverProfile | null;
  loading: boolean;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<VliverProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user ?? null;
      if (!user) { setLoading(false); return; }
      supabase
        .from('vliver_profiles')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .then(({ data, error }) => {
          if (error) console.error('ProfileContext:', error);
          setProfile(data?.[0] ?? null);
          setLoading(false);
        });
    });
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useMyProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useMyProfile must be used within ProfileProvider');
  return ctx;
}
