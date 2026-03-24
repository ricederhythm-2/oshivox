-- 既存の「桜咲あかね」に2本目のボイスを追加するサンプル
-- Supabase SQL Editor で実行してください

INSERT INTO public.voice_posts (vliver_id, owner_id, catch_copy, voice_path, is_boosted, is_published)
SELECT
  id        AS vliver_id,
  owner_id,
  '朝のおはよう配信、今日も元気にいきましょ☀️' AS catch_copy,
  'sample/02.mp3'                              AS voice_path,
  false                                        AS is_boosted,
  true                                         AS is_published
FROM public.vliver_profiles
WHERE handle = 'akane_v'
LIMIT 1;
