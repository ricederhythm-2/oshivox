import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import SwipeFeed from '@/components/SwipeFeed';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

interface Props {
  params: Promise<{ postId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postId } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from('voice_posts')
    .select('catch_copy, vliver_profiles(name, image_path)')
    .eq('id', postId)
    .eq('is_published', true)
    .single();

  if (!data) {
    return { title: 'OshiVox — 運命の声に出会う場所' };
  }

  const profile = data.vliver_profiles as unknown as { name: string; image_path: string | null } | null;
  const name     = profile?.name ?? '';
  const title    = `「${data.catch_copy}」- ${name} | OshiVox`;
  const description = `${name}のボイスをOshiVoxで聴いてみよう`;
  const imageUrl = profile?.image_path
    ? `${SUPABASE_URL}/storage/v1/object/public/vlivers-images/${profile.image_path}`
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(imageUrl && { images: [{ url: imageUrl, width: 800, height: 600 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function VoiceSharePage({ params }: Props) {
  const { postId } = await params;
  return <SwipeFeed priorityPostId={postId} />;
}
