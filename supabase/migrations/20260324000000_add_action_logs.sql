-- ================================================================
-- action_logs テーブル
-- スワイプ、音声再生、ページ閲覧、お気に入り操作を記録する
-- ================================================================

create table if not exists public.action_logs (
  id         bigserial primary key,
  user_id    uuid references auth.users(id) on delete set null,
  session_id text not null default '',
  action     text not null,
  post_id    uuid,       -- voice_posts.id（削除後もログを残すため FK なし）
  page_path  text,
  created_at timestamptz not null default now()
);

comment on table  public.action_logs           is 'ユーザーアクション全ログ（分析用）';
comment on column public.action_logs.action    is 'swipe_like | swipe_pass | voice_play | page_view | favorite_add | favorite_remove';
comment on column public.action_logs.session_id is 'localStorage に保存した匿名セッション UUID';

-- RLS
alter table public.action_logs enable row level security;

-- 誰でも挿入可（未ログインユーザーも記録）
create policy "アクションログは誰でも書き込み可"
  on public.action_logs for insert with check (true);

-- 自分のログのみ閲覧可（管理者はサービスロールで全件取得）
create policy "自分のアクションログのみ閲覧可"
  on public.action_logs for select using (auth.uid() = user_id);

-- インデックス
create index if not exists idx_action_logs_created_at on public.action_logs(created_at desc);
create index if not exists idx_action_logs_action     on public.action_logs(action);
create index if not exists idx_action_logs_user_id   on public.action_logs(user_id);
create index if not exists idx_action_logs_post_id   on public.action_logs(post_id);
