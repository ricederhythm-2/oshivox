import type { VLiver } from '@/components/SwipeCard';

// ─────────────────────────────────────────────────────────────
// ダミーデータ（page.tsx / favorites で共有）
//
// 本番では API や DB から取得するデータ。
// is_boosted: Stripe 決済後にサーバーで true にセット → 優先表示
// ─────────────────────────────────────────────────────────────
export const VLIVERS: VLiver[] = [
  {
    id: 'akari',
    profileId: 'akari',
    name: '星咲 あかり',
    handle: '@akari_hoshizaki',
    catchphrase: '今日も一緒に輝こうね⭐',
    description:
      'ゲーム実況とお歌が得意な天然系VTuber。毎日夜10時から配信中！初見さん大歓迎。',
    imageUrl: 'https://picsum.photos/seed/akari/400/700',
    voiceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    tags: ['歌', 'ゲーム', '天然'],
    color: '#FF6B9D',
    is_boosted: true,
    twitterHandle: 'akari_hoshizaki',
    platformLinks: { youtube: 'https://youtube.com/@akari_hoshizaki', twitcasting: 'https://twitcasting.tv/akari_hoshizaki' },
  },
  {
    id: 'rei',
    profileId: 'rei',
    name: '蒼天 レイ',
    handle: '@rei_souten',
    catchphrase: '深淵を覗く者よ、ようこそ。',
    description:
      'ホラー・ミステリー系クールVライバー。低音ボイスで朗読・考察配信も担当。',
    imageUrl: 'https://picsum.photos/seed/rei/400/700',
    voiceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    tags: ['ホラー', '朗読', 'クール'],
    color: '#4A90D9',
    is_boosted: false,
    twitterHandle: 'rei_souten',
    platformLinks: { youtube: 'https://youtube.com/@rei_souten', twitch: 'https://twitch.tv/rei_souten' },
  },
  {
    id: 'midori',
    profileId: 'midori',
    name: '翠葉 みどり',
    handle: '@midori_suiha',
    catchphrase: 'ゆっくりまったり、一緒にいよう🌿',
    description:
      '癒し系のんびりVライバー。料理配信・雑談・ASMR。日常の隙間に寄り添います。',
    imageUrl: 'https://picsum.photos/seed/midori/400/700',
    voiceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    tags: ['癒し', 'ASMR', '雑談'],
    color: '#52C788',
    is_boosted: false,
    twitterHandle: 'midori_suiha',
    platformLinks: { youtube: 'https://youtube.com/@midori_suiha', niconico: 'https://nicovideo.jp/user/midori_suiha' },
  },
];

/** ID からデータを O(1) で引くためのマップ */
export const VLIVER_MAP = new Map(VLIVERS.map((v) => [v.id, v]));
